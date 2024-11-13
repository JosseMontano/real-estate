from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload
from typing import List
from pydantic import BaseModel
from modules.core.database import get_db
import modules.core.models as models
from modules.core.utils.translate import translate_es_en_pt
from modules.core.const import Messages

app = APIRouter(
    prefix="/responses",
    tags=["Responses"],
)


class ResponseModel(BaseModel):
    id: int
    responseEs: str
    responseEn: str
    responsePt: str
    question_id: int
    real_estate_id: int

    class Config:
        orm_mode = True

class ResponseDTO(BaseModel):
    response: str
    question_id: int
    real_estate_id: int

@app.get('/')
async def get_responses(
    real_estate_id:int= Query(..., description="ID of the real estate to filter responses by"),
    db: Session = Depends(get_db)):
    
    query = db.query(models.Response).options(joinedload(models.Response.question)) 
    
    if real_estate_id:
        query = query.filter(models.Response.real_estate_id == real_estate_id)
    
    responses = query.all()
    if not responses:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": responses}

@app.post('/')
async def create_response(response_data: ResponseDTO, db: Session = Depends(get_db)):
    result = translate_es_en_pt(response_data.response)
    db_response = models.Response(
        responseEs=result["valEs"],
        responseEn=result["valEn"],
        responsePt=result["valPt"],
        question_id=response_data.question_id,
        real_estate_id=response_data.real_estate_id
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return {"status": 201, "message": Messages.DATA_CREATED, "val": db_response}

@app.delete('/{response_id}')
async def delete_response(response_id: int, db: Session = Depends(get_db)):
    response = db.query(models.Response).filter(models.Response.id == response_id).first()
    if response is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    db.delete(response)
    db.commit()
    return {"status": 200, "message": Messages.DATA_DELETED, "val": response}
