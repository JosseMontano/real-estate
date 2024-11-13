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

@app.get('/')
async def get_favorites(user_id: int = Query(..., description="ID of the user to filter favorites by"), db: Session = Depends(get_db)):
    query = db.query(models.FavoriteRealEstate).options(joinedload(models.FavoriteRealEstate.real_estate))
    if user_id:
        query = query.filter(models.FavoriteRealEstate.user_id == user_id)
    
    favorites = query.all()
    
    if not favorites:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    return {"status": 200, "message": Messages.DATA_FOUND, "val": favorites}

@app.post('/')
async def create_favorite(favorite: FavoriteRealEstateDTO, db: Session = Depends(get_db)):
    db_favorite = models.FavoriteRealEstate(**favorite.dict())
    db.add(db_favorite)
    db.commit()
    db.refresh(db_favorite)
    return {"status": 201, "message": Messages.DATA_CREATED, "val": db_favorite}

@app.delete('/' + '{favorite_id}')
async def delete_favorite(favorite_id: int, db: Session = Depends(get_db)):
    favorite = db.query(models.FavoriteRealEstate).filter(models.FavoriteRealEstate.id == favorite_id).first()
    if favorite is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    db.delete(favorite)
    db.commit()
    return {"status": 200, "message": Messages.DATA_DELETED, "val": favorite}
