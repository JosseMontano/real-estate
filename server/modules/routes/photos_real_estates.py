from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from modules.core.database import get_db
import modules.core.models as models
from modules.core.const import Messages

app = APIRouter(
    prefix="/photos_real_estates",
    tags=["Photos Real Estates"],
)

endpoint = "/api/photos_real_estates/"

class PhotosRealEstateResponse(BaseModel):
    id: int
    image: str
    real_estate_id: int

    class Config:
        orm_mode = True

class PhotosRealEstateDTO(BaseModel):
    image: str
    real_estate_id: int

@app.get(endpoint, response_model=List[PhotosRealEstateResponse])
async def get_photos(db: Session = Depends(get_db)):
    photos = db.query(models.PhotosRealEstate).all()
    if not photos:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": photos}

@app.post(endpoint)
async def create_photo(photo: PhotosRealEstateDTO, db: Session = Depends(get_db)):
    db_photo = models.PhotosRealEstate(**photo.dict())
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    return {"status": 201, "message": Messages.DATA_CREATED, "val": db_photo}

@app.delete(endpoint + '{photo_id}')
async def delete_photo(photo_id: int, db: Session = Depends(get_db)):
    photo = db.query(models.PhotosRealEstate).filter(models.PhotosRealEstate.id == photo_id).first()
    if photo is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    db.delete(photo)
    db.commit()
    return {"status": 200, "message": Messages.DATA_DELETED, "val": photo}
