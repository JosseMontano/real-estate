from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from modules.core.const import Messages
from modules.core.utils.translate import translate_es_en_pt
from modules.core.const import TranslateResponse
app = APIRouter(
    prefix="/api/type-real-estates",
    tags=["Type Real Estates"],
)

class TypeRealEstateDTO(BaseModel):
    name: str

class TypeRealEstateResponse(BaseModel):
    id: int
    name: TranslateResponse
    active: bool

    class Config:
        orm_mode = True


@app.get('/')
async def get_types(db: Session = Depends(get_db)):
    query = db.query(models.TypeRealEstate).options(joinedload(models.TypeRealEstate.name))
    typeRE= query.all()
    if not typeRE:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND.dict(), "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND.dict(), "val":  typeRE}

@app.get('/statistics')
async def get_statistics(db: Session = Depends(get_db)):
    types = db.query(models.TypeRealEstate).all()
    
    val={
        "total": len(types),
        "active": len([typeRE for typeRE in types if typeRE.active]),
        "inactive": len([typeRE for typeRE in types if not typeRE.active])
    }
    
    if not types:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": {
            "total": 0,
            "active": 0,
            "inactive": 0
        }}
        
    return {"status": 200, "message": Messages.DATA_FOUND, "val": val }



@app.post('/')
async def create_type_real_estate(type_real_estate: TypeRealEstateDTO, db: Session = Depends(get_db)):
    # Generate translations for name
    result_name = translate_es_en_pt(type_real_estate.name)
    
    # Create Translate record for name
    name_translate = models.Translate(es=result_name["valEs"], en=result_name["valEn"], pt=result_name["valPt"])
    db.add(name_translate)
    db.commit()
    db.refresh(name_translate)
    
    # Create TypeRealEstate entry
    db_type_real_estate = models.TypeRealEstate(
        name_id=name_translate.id,
        active=True
    )
    db.add(db_type_real_estate)
    db.commit()
    db.refresh(db_type_real_estate)
    
    return {"status": "201", "message": "Type real estate created successfully", "val": db_type_real_estate}

@app.put('/{type_real_estate_id}')
async def update_type_real_estate(type_real_estate_id: int, updated_type_real_estate: TypeRealEstateDTO, db: Session = Depends(get_db)):
    type_real_estate = db.query(models.TypeRealEstate).filter(models.TypeRealEstate.id == type_real_estate_id).first()
    if type_real_estate is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}

    # Update translation for name
    result_name = translate_es_en_pt(updated_type_real_estate.name)
    type_real_estate.name.es = result_name["valEs"]
    type_real_estate.name.en = result_name["valEn"]
    type_real_estate.name.pt = result_name["valPt"]
    
    # Update active status
    type_real_estate.active = True
    
    db.commit()
    db.refresh(type_real_estate)
    return {"status": "200", "message": "Type real estate updated successfully", "val": type_real_estate}

@app.delete('/{type_real_estate_id}')
async def deactivate_type_real_estate(type_real_estate_id: int, db: Session = Depends(get_db)):
    type_real_estate = db.query(models.TypeRealEstate).filter(models.TypeRealEstate.id == type_real_estate_id).first()
    if type_real_estate is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}

    type_real_estate.active = not type_real_estate.active
    db.commit()
    db.refresh(type_real_estate)
    return {"status": "200", "message": "Type real estate deactivated successfully", "val": type_real_estate}

