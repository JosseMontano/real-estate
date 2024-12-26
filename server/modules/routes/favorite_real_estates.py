from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload
from typing import List
from pydantic import BaseModel
from modules.core.database import get_db
import modules.core.models as models
from modules.core.const import Messages

app = APIRouter(
    prefix="/api/favorite_real_estates",
    tags=["Favorite Real Estates"],
)

class FavoriteRealEstateResponse(BaseModel):
    id: int
    real_estate_id: int
    user_id: int

    class Config:
        orm_mode = True

class FavoriteRealEstateDTO(BaseModel):
    real_estate_id: int
    user_id: int
    
    

@app.get("/")
async def get_favorites(
    user_id: int = Query(..., description="ID of the user to filter favorites by"),
    db: Session = Depends(get_db),
):
    query = (
        db.query(models.FavoriteRealEstate)
        .options(
            joinedload(models.FavoriteRealEstate.real_estate).joinedload(models.RealEstate.photos),
            joinedload(models.FavoriteRealEstate.real_estate).joinedload(models.RealEstate.title),
            joinedload(models.FavoriteRealEstate.real_estate).joinedload(models.RealEstate.description),
        )
    )
    if user_id:
        query = query.filter(models.FavoriteRealEstate.user_id == user_id)

    favorites = query.all()

    if not favorites:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}

    return {"status": 200, "message": Messages.DATA_FOUND, "val": favorites}

@app.post('/')
async def create_favorite(favorite: FavoriteRealEstateDTO, db: Session = Depends(get_db)):
    try:
        # Create the favorite record
        db_favorite = models.FavoriteRealEstate(**favorite.dict())
        db.add(db_favorite)
        db.commit()
        db.refresh(db_favorite)

        # Fetch the related real estate details
        real_estate = (
            db.query(models.RealEstate)
            .filter(models.RealEstate.id == favorite.real_estate_id)
            .first()
        )

        # Ensure real_estate exists
        if not real_estate:
            return {"status": 404, "message": "Real estate not found"}

        # Return the response
        response = {
            "id": db_favorite.id,
            "real_estate": {
                "id": real_estate.id,
                "address": real_estate.address,
                "price": real_estate.price,
                "available": real_estate.available,
            },
        }

        return {"status": 201, "message": Messages.ADD_FAV.dict(), "val": response}

    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}

@app.delete('/' + '{real_estate_id}'+ '/{user_id}')
async def delete_favorite(real_estate_id: int, user_id: int, db: Session = Depends(get_db)):
    # Query for the favorite entry
    favorite = (
        db.query(models.FavoriteRealEstate)
        .filter(
            models.FavoriteRealEstate.real_estate_id == real_estate_id,
            models.FavoriteRealEstate.user_id == user_id,
        )
        .first()
    )
    # If no favorite is found, return a 404 response
    if favorite is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    # Delete the favorite entry
    db.delete(favorite)
    db.commit()
    
    return {"status": 200, "message": Messages.DATA_DELETED, "val": {"id": favorite.id}}