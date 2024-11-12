from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from geopy.geocoders import Nominatim
import requests
import os
from dotenv import load_dotenv
from pathlib import Path
from modules.core.utils.translate import translate_es_en_pt

app = APIRouter(
    prefix="/real_estates",
    tags=["Real Estates"],
)

BASEDIR = Path(__file__).resolve().parent.parent.parent  # Adjust this based on your structure
load_dotenv(BASEDIR / '.env')
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')

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

class NearbyPlacesRequest(BaseModel):
    location: str
endpoint="/api/real-estates/"

@app.get(endpoint, response_model=List[RealEstateResponse])
async def get_real_estates(db: Session = Depends(get_db)):
    real_estates = db.query(models.RealEstate).all()
    if not real_estates:
        raise HTTPException(status_code=404, detail="No real estates found")
    return {"status": "200", "message": "Real estates retrieved successfully", "val": real_estates}

@app.post(endpoint)
async def create_real_estate(real_estate: RealEstateDTO, db: Session = Depends(get_db)):
    # Obtener la dirección a partir de las coordenadas
    geo_location = Nominatim(user_agent="GetLoc")
    loc_name = geo_location.reverse(real_estate.lat_long)
    address = loc_name.address if loc_name else "Not Found"

    # Obtener traducciones para título y descripción
    resultTitle = translate_es_en_pt(real_estate.title)
    resultDescription = translate_es_en_pt(real_estate.description)

    # Crear diccionario de datos a partir del DTO y limpiar campos innecesarios
    real_estate_data = real_estate.dict()
    real_estate_data.pop("title", None)  # Elimina "title" si no está en el modelo
    real_estate_data.pop("description", None)  # Elimina "description" si no está en el modelo

    # Crear instancia de RealEstate solo con los campos válidos
    db_real_estate = models.RealEstate(**{k: v for k, v in real_estate_data.items() if hasattr(models.RealEstate, k)})

    # Asignar valores adicionales manualmente
    db_real_estate.address = address
    db_real_estate.titleEs = resultTitle["valEs"]
    db_real_estate.titleEn = resultTitle["valEn"]
    db_real_estate.titlePt = resultTitle["valPt"]
    db_real_estate.descriptionEs = resultDescription["valEs"]
    db_real_estate.descriptionEn = resultDescription["valEn"]
    db_real_estate.descriptionPt = resultDescription["valPt"]

    # Guardar en la base de datos
    db.add(db_real_estate)
    db.commit()
    db.refresh(db_real_estate)
    return {"status": "201", "message": "Real estate created successfully", "val": db_real_estate}

@app.delete(endpoint+'{real_estate_id}')
async def delete_real_estate(real_estate_id: int, db: Session = Depends(get_db)):
    real_estate = db.query(models.RealEstate).filter(models.RealEstate.id == real_estate_id).first()
    if real_estate is None:
        raise HTTPException(status_code=404, detail="Real estate not found")
    db.delete(real_estate)
    db.commit()
    return {"status": "200", "message": "Real estate deleted successfully", "val": real_estate}

@app.put(endpoint+'{real_estate_id}')
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

@app.post(endpoint+'fetch_nearby_places')
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
