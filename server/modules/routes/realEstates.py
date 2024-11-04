from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from geopy.geocoders import Nominatim

app = APIRouter(
    prefix="/real_estates",
    tags=["Real Estates"],
)

# Response model for RealEstate
class RealEstateResponse(BaseModel):
    id: int
    address: str
    amount_bathroom: int
    amount_bedroom: int
    available: bool
    description: str
    image: str
    lat_long: str
    price: float
    square_meter: float
    title: str
    type_real_estate_id: int

    class Config:
        orm_mode = True

# Request model for creating and updating RealEstate
class RealEstateDTO(BaseModel):
    amount_bathroom: int
    amount_bedroom: int
    available: bool
    description: str
    image: str
    lat_long: str
    price: float
    square_meter: float
    title: str
    type_real_estate_id: int

# CRUD endpoints for RealEstate

@app.get('/', response_model=List[RealEstateResponse])
async def get_real_estates(db: Session = Depends(get_db)):
    real_estates = db.query(models.RealEstate).all()
    if not real_estates:
        raise HTTPException(status_code=404, detail="No real estates found")
    return {"status": "200", "message": "Real estates retrieved successfully", "val": real_estates}

@app.post('/')
async def create_real_estate(real_estate: RealEstateDTO, db: Session = Depends(get_db)):

    geo_location = Nominatim(user_agent="GetLoc")
    loc_name = geo_location.reverse(real_estate.lat_long)
    address = loc_name.address if loc_name else "Not Found"
    db_real_estate = models.RealEstate(**real_estate.dict())
    db_real_estate.address = address
    db.add(db_real_estate)
    db.commit()
    db.refresh(db_real_estate)
    return {"status": "201", "message": "Real estate created successfully", "val": db_real_estate}

@app.delete('/{real_estate_id}')
async def delete_real_estate(real_estate_id: int, db: Session = Depends(get_db)):
    real_estate = db.query(models.RealEstate).filter(models.RealEstate.id == real_estate_id).first()
    if real_estate is None:
        raise HTTPException(status_code=404, detail="Real estate not found")
    db.delete(real_estate)
    db.commit()
    return {"status": "200", "message": "Real estate deleted successfully", "val": real_estate}

@app.put('/{real_estate_id}')
async def update_real_estate(real_estate_id: int, updated_real_estate: RealEstateDTO, db: Session = Depends(get_db)):
    real_estate = db.query(models.RealEstate).filter(models.RealEstate.id == real_estate_id).first()
    if real_estate is None:
        raise HTTPException(status_code=404, detail="Real estate not found")

    # Update fields
    for key, value in updated_real_estate.dict().items():
        setattr(real_estate, key, value)

    db.commit()
    db.refresh(real_estate)
    return {"status": "200", "message": "Real estate updated successfully", "val": real_estate}
