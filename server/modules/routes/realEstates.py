from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from typing import List, Optional
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
from modules.core.const import Messages


app = APIRouter(
    prefix="/api/real_estates",
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
    amountBathroom: int
    amountBedroom: int
    description: str
    latLong: str
    price: float
    squareMeter: float
    title: str
    typeRealEstateId: int
    userId: int
    images: List[str] = []

class NearbyPlacesRequest(BaseModel):
    location: str


@app.get('/')
async def get_real_estates(db: Session = Depends(get_db)):
    query = db.query(models.RealEstate).options(
        joinedload(models.RealEstate.photos),
        joinedload(models.RealEstate.title),
        joinedload(models.RealEstate.description),
        joinedload(models.RealEstate.zone)
    )
    real_estates = query.all()
    
    if not real_estates:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    return {"status": 200, "message": Messages.DATA_FOUND, "val": real_estates}


@app.get('/intelligent-filter')
async def intelligent_filter(user_id: int, db: Session = Depends(get_db)):
    # Obtener los inmuebles favoritos del usuario
    favorite_properties = db.query(models.FavoriteRealEstate).filter(
        models.FavoriteRealEstate.user_id == user_id
    ).all()
    
    if not favorite_properties:
        return {"status": 404, "message": "No se encontraron inmuebles favoritos.", "val": []}

    # Extraer IDs de inmuebles favoritos
    favorite_property_ids = [fav.real_estate_id for fav in favorite_properties]

    # Obtener detalles de las propiedades favoritas
    favorite_real_estates = db.query(models.RealEstate).filter(
        models.RealEstate.id.in_(favorite_property_ids)
    ).all()

    if not favorite_real_estates:
        return {"status": 404, "message": "No se encontraron detalles de los inmuebles favoritos.", "val": []}
    
    # Construir condiciones para buscar similitudes
    conditions = []
    for favorite in favorite_real_estates:
        conditions.append(or_(
            models.RealEstate.price.between(favorite.price * 0.9, favorite.price * 1.1),
            models.RealEstate.zone_id == favorite.zone_id,
            models.RealEstate.type_real_estate_id == favorite.type_real_estate_id,
            models.RealEstate.amount_bathroom == favorite.amount_bathroom,
            models.RealEstate.amount_bedroom == favorite.amount_bedroom,
        ))

    # Filtrar propiedades similares
    similar_properties = db.query(models.RealEstate).filter(
        or_(*conditions),  # Al menos una condición debe cumplirse
        ~models.RealEstate.id.in_(favorite_property_ids),  # Excluir favoritos actuales
    ).options(
        joinedload(models.RealEstate.photos),
        joinedload(models.RealEstate.title),
        joinedload(models.RealEstate.description),
        joinedload(models.RealEstate.zone),
    ).all()

    if not similar_properties:
        return {"status": 404, "message": "No se encontraron inmuebles similares.", "val": []}

    # Calcular similitud y ordenar
    def calculate_similarity_score(property_, favorites):
        score = 0
        for favorite in favorites:
            if property_.price and favorite.price and favorite.price * 0.9 <= property_.price <= favorite.price * 1.1:
                score += 1
            if property_.zone_id == favorite.zone_id:
                score += 1
            if property_.type_real_estate_id == favorite.type_real_estate_id:
                score += 1
            if property_.amount_bathroom == favorite.amount_bathroom:
                score += 1
            if property_.amount_bedroom == favorite.amount_bedroom:
                score += 1
        return score

    # Añadir puntaje de similitud a las propiedades
    properties_with_score = [
        {"property": prop, "similarity_score": calculate_similarity_score(prop, favorite_real_estates)}
        for prop in similar_properties
    ]

    # Ordenar por puntaje de similitud de mayor a menor
    properties_with_score.sort(key=lambda x: x["similarity_score"], reverse=True)

    # Convertir la respuesta a un formato deseado
    result = [
        {"property": prop["property"], "similarity_score": prop["similarity_score"]}
        for prop in properties_with_score
    ]

    return {"status": 200, "message": "Inmuebles similares encontrados.", "val": result}

@app.get('/statistics')
async def get_statistics(db: Session = Depends(get_db)):
    real_estates = db.query(models.RealEstate).all()
    
    val={
        "total": len(real_estates),
        "active": len([val for val in real_estates if val.active]),
        "inactive": len([val for val in real_estates if not val.active])
    }
    
    if not real_estates:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": {
            "total": 0,
            "active": 0,
            "inactive": 0
        }}
        
    return {"status": 200, "message": Messages.DATA_FOUND, "val": val }

@app.get('/zones')
async def get_zones(db: Session = Depends(get_db)):
    zones = db.query(models.Zone).all()
    
    if not zones:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    return {"status": 200, "message": Messages.DATA_FOUND, "val": zones}

@app.get('/{user_id}')
async def get_real_estates_by_user(user_id:int ,db: Session = Depends(get_db)):
    query = db.query(models.RealEstate).options(
        joinedload(models.RealEstate.photos),
        joinedload(models.RealEstate.title),
        joinedload(models.RealEstate.description)
    ).filter(models.RealEstate.user_id == user_id)
    real_estates = query.all()
    
    if not real_estates:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    return {"status": 200, "message": Messages.DATA_FOUND, "val": real_estates}


@app.post("/filter-real-estates")
async def filter_real_estates(
    filters: List[dict],  # Filters like [{id: 2, name: "Apartamento", type: "type"}, ...]
    db: Session = Depends(get_db)
):
    try:
        # Initialize query
        query = db.query(models.RealEstate).options(
            joinedload(models.RealEstate.photos),
            joinedload(models.RealEstate.title),
            joinedload(models.RealEstate.description),
            joinedload(models.RealEstate.zone)
        )
        # Process filters
        for filter_obj in filters:
            filter_type = filter_obj.get("type")
            filter_id = filter_obj.get("id")
            filter_name = filter_obj.get("name")

            if filter_type == "type" and filter_id:  # Filter by type_real_estate_id
                query = query.filter(models.RealEstate.type_real_estate_id == filter_id)

            elif filter_type == "zone" and filter_id:  # Filter by zone_id
                query = query.filter(models.RealEstate.zone_id == filter_id)

            elif filter_type == "price" and filter_name:  # Filter by price range
                if "-" in filter_name:  # Ensure it's a valid range
                    try:
                        # Parse min and max price from the range
                        min_price, max_price = map(float, filter_name.split("-"))
                        query = query.filter(models.RealEstate.price >= min_price, models.RealEstate.price <= max_price)
                    except ValueError:
                        raise HTTPException(
                            status_code=400,
                            detail=TranslateResponse(
                                es=f"Rango de precios inválido: {filter_name}",
                                en=f"Invalid price range: {filter_name}",
                                pt=f"Intervalo de preços inválido: {filter_name}"
                            ).dict()
                        )

        # Fetch results
        real_estates = query.all()

        if not real_estates:
            return {
                "status":404,
                "message":TranslateResponse(
                    es="No se encontraron bienes raíces con los filtros dados, se mostraran los resultados sin filtros",
                    en="No real estates found with the given filters provided, results will be shown without filters",
                    pt="Nenhum imóvel encontrado com os filtros fornecidos dados, os resultados serão exibidos sem filtros"
                ).dict(),
                "val": real_estates
            }

        return {
            "status": 200,
            "message": TranslateResponse(
                es="Bienes raíces encontrados",
                en="Real estates found",
                pt="Imóveis encontrados"
            ).dict(),
            "val": real_estates
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        return {
            "status": 500,
            "message": Messages.SERVER_ERROR.dict(),
            "val": []
        }



@app.get('/{type_real_estate_id}')
async def get_real_estates_by_type(type_real_estate_id:int ,db: Session = Depends(get_db)):
    query = db.query(models.RealEstate).options(
        joinedload(models.RealEstate.photos),
        joinedload(models.RealEstate.title),
        joinedload(models.RealEstate.description)
    ).filter(models.RealEstate.type_real_estate_id == type_real_estate_id)
    real_estates = query.all()
    
    if not real_estates:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    return {"status": 200, "message": Messages.DATA_FOUND, "val": real_estates}
@app.post('/')
async def create_real_estate(real_estate: RealEstateDTO, db: Session = Depends(get_db)):
    try:
        # Get address from coordinates
        geo_location = Nominatim(user_agent="GetLoc")
        loc_name = geo_location.reverse(real_estate.latLong)

        if loc_name:
            address = loc_name.address

            raw_data = loc_name.raw.get("address", {})
            city = raw_data.get("city", "Not Found") 
            state = raw_data.get("state", "Not Found")  
            suburb = raw_data.get("suburb", "Not Found") 
            zone = raw_data.get("neighbourhood", "Not Found") 
            
            found_zone = db.query(models.Zone).filter(models.Zone.name == zone).first()
            if not found_zone:
                zone = models.Zone(name=zone)
                db.add(zone)
                db.commit()
            
        else:
            print("No se encontró información de la ubicación")

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
        real_estate_data = real_estate.dict(exclude={"title", "description", "images"})
        """         db_real_estate = models.RealEstate(**real_estate_data, address=address, title_id=title_translate.id, description_id=description_translate.id) """
        db_real_estate = models.RealEstate(
            amount_bathroom=real_estate_data["amountBathroom"],
            amount_bedroom=real_estate_data["amountBedroom"],
            active=True,
            address=address,
            description_id=description_translate.id,
            lat_long=real_estate_data["latLong"],
            price=real_estate_data["price"],
            square_meter=real_estate_data["squareMeter"],
            title_id=title_translate.id,
            type_real_estate_id=real_estate_data["typeRealEstateId"],
            user_id=real_estate_data["userId"],
            zone_id=zone.id
        )

        # Save RealEstate entry
        db.add(db_real_estate)
        db.commit()
        db.refresh(db_real_estate)

        # Save image URLs to PhotosRealEstate
        for image_url in real_estate.images:
            photo = models.PhotosRealEstate(
                image=image_url, 
                real_estate_id=db_real_estate.id
            )
            db.add(photo)

        db.commit()
        
        result = db.query(models.RealEstate).options(
            joinedload(models.RealEstate.title), 
            joinedload(models.RealEstate.description),
            joinedload(models.RealEstate.photos),
            joinedload(models.RealEstate.zone)
        ).filter(models.RealEstate.id == db_real_estate.id).first()

        return {"status": 201, "message": Messages.DATA_CREATED, "val": result}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}

@app.delete('/{real_estate_id}')
async def delete_real_estate(real_estate_id: int, db: Session = Depends(get_db)):
    real_estate = db.query(models.RealEstate).filter(models.RealEstate.id == real_estate_id).first()
    if real_estate is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    real_estate.active = not real_estate.active
    db.commit()
    db.refresh(real_estate)
    
    return {"status": "200", "message": Messages.DATA_DELETED, "val": real_estate}

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
    return {"status": 200, "message": Messages.DATA_UPDATED,"val": real_estate}

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
    return {"status": 200, "message": Messages.DATA_FOUND, "val": formatted_results}
