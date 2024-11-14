from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from pydantic import BaseModel
from modules.core.database import get_db 
import modules.core.models as models
from geopy.geocoders import Nominatim
import requests
import os
from dotenv import load_dotenv
from pathlib import Path
from modules.core.utils.translate import translate_es_en_pt
from modules.core.const import TranslateResponse

app = APIRouter(
    prefix="/api/real-estates/real_estates",
    tags=["Real Estates"],
)

BASEDIR = Path(__file__).resolve().parent.parent.parent  # Adjust this based on your structure
load_dotenv(BASEDIR / '.env')
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')


class RealEstateResponse(BaseModel):
    id: int
    address: str
    amount_bathroom: int
    amount_bedroom: int
    available: bool
    description: TranslateResponse  # Changed to include Translate relationship
    image: str
    lat_long: str
    price: float
    square_meter: float
    title: TranslateResponse  # Changed to include Translate relationship
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

class NearbyPlacesRequest(BaseModel):
    location: str


@app.get('/')
async def get_real_estates(db: Session = Depends(get_db)):
    query = db.query(models.RealEstate).options(
        joinedload(models.RealEstate.photos),
        joinedload(models.RealEstate.title),
        joinedload(models.RealEstate.description)
    )
    real_estates = query.all()
    return {"status": "200", "message": "Real estates retrieved successfully", "val": real_estates}

@app.post('/')
async def create_real_estate(real_estate: RealEstateDTO, db: Session = Depends(get_db)):
    # Get address from coordinates
    geo_location = Nominatim(user_agent="GetLoc")
    loc_name = geo_location.reverse(real_estate.lat_long)
    address = loc_name.address if loc_name else "Not Found"

    # Generate translations for title and description
    result_title = translate_es_en_pt(real_estate.title)
    result_description = translate_es_en_pt(real_estate.description)

    # Create Translate records for title and description
    title_translate = models.Translate(es=result_title["valEs"], en=result_title["valEn"], pt=result_title["valPt"])
    description_translate = models.Translate(es=result_description["valEs"], en=result_description["valEn"], pt=result_description["valPt"])

    # Add these to the session
    db.add(title_translate)
    db.add(description_translate)
    db.commit()  # Commit to assign IDs

    # Create RealEstate entry
    real_estate_data = real_estate.dict(exclude={"title", "description"})
    db_real_estate = models.RealEstate(**real_estate_data, address=address, title_id=title_translate.id, description_id=description_translate.id)

    # Save RealEstate entry
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

    # Update fields and translations if provided
    if updated_real_estate.title:
        result_title = translate_es_en_pt(updated_real_estate.title)
        real_estate.title.es = result_title["valEs"]
        real_estate.title.en = result_title["valEn"]
        real_estate.title.pt = result_title["valPt"]

    if updated_real_estate.description:
        result_description = translate_es_en_pt(updated_real_estate.description)
        real_estate.description.es = result_description["valEs"]
        real_estate.description.en = result_description["valEn"]
        real_estate.description.pt = result_description["valPt"]

    # Update other fields
    for key, value in updated_real_estate.dict(exclude={"title", "description"}).items():
        setattr(real_estate, key, value)

    db.commit()
    db.refresh(real_estate)
    return {"status": "200", "message": "Real estate updated successfully", "val": real_estate}

@app.post('/fetch_nearby_places')
def fetch_nearby_places(request: NearbyPlacesRequest):
    location = request.location
    if not location:
        raise HTTPException(status_code=400, detail="Location parameter is required")

    url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius=1000&key={GOOGLE_MAPS_API_KEY}'
    print(GOOGLE_MAPS_API_KEY)
    response = requests.get(url, headers={"Content-Type": "application/json"})
    response.raise_for_status()
    
    data = response.json()
    results = data.get('results', [])

    formatted_results = [
        {
            "name": place.get("name"),
            "location": place["geometry"]["location"],
            "types": place.get("types")
        }
        for place in results
    ]
    
    return {"val": formatted_results}
