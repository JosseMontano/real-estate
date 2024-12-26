from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from modules.core.const import Messages
from modules.core.utils.translate import translate_es_en_pt

app = APIRouter(
    prefix="/api/responses",
    tags=["Responses"],
)

# Pydantic DTO for Response
class ResponseDTO(BaseModel):
    response_text: str
    question_id: int
    real_estate_id: int


@app.get('/')
async def get_responses(db: Session = Depends(get_db)):
    query = db.query(models.Response).options(
        joinedload(models.Response.response),
        joinedload(models.Response.question),
        joinedload(models.Response.real_estate)
    )
    responses = query.all()
    if not responses:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": responses}

@app.get('/statistics/general')
async def get_response_statistics(db: Session = Depends(get_db)):
    responses = db.query(models.Response).all()

    val = {
        "total": len(responses),
        "active": len([response for response in responses if response.active]),
        "inactive": len([response for response in responses if not response.active])
    }
    
    if not responses:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": val}
        
    return {"status": 200, "message": Messages.DATA_FOUND, "val": val}


@app.get('/{real_estate_id}')
async def get_all_responses(real_estate_id: int, db: Session = Depends(get_db)):
    responses_query = db.query(models.Response).filter(
        models.Response.real_estate_id == real_estate_id,
        models.Response.active == True  
    ).options(
        joinedload(models.Response.question).options(joinedload(models.Question.question)), 
        joinedload(models.Response.response),
    )

    responses = responses_query.all()

    if not responses:
        return {
            "status": 404,
            "message": Messages.DATA_NOT_FOUND.dict(),
            "val": []
        }

    return {
        "status": 200,
       "message": Messages.DATA_FOUND.dict(),
        "val": responses
    }


@app.post('/')
async def create_response(response: ResponseDTO, db: Session = Depends(get_db)):
    try:
        result_response = translate_es_en_pt(response.response_text)
        translated_response = models.Translate(es=result_response["valEs"], en=result_response["valEn"], pt=result_response["valPt"]) 
        db.add(translated_response)
        db.commit()
        db.refresh(translated_response)

        new_response = models.Response(
            question_id=response.question_id,
            real_estate_id=response.real_estate_id,
            response_id=translated_response.id,
            active=True
        )
        db.add(new_response)
        db.commit()
        db.refresh(new_response)
        return {"status": 201, "message": Messages.NEW_RESPONSE.dict(), "val": new_response}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}


@app.put('/{response_id}')
async def update_response(response_id: int, updated_response: ResponseDTO, db: Session = Depends(get_db)):
    try:
        response = db.query(models.Response).filter(models.Response.id == response_id).first()
        if not response:
            return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
        
        result_response = translate_es_en_pt(updated_response.response_text)
        
        response.response.es = result_response["valEs"]
        response.response.en = result_response["valEn"]
        response.response.pt = result_response["valPt"]
        response.active = True

        response.question_id = updated_response.question_id
        response.real_estate_id = updated_response.real_estate_id
        db.commit()
        db.refresh(response)
        return {"status": 200, "message": Messages.DATA_UPDATED, "val": response}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}


@app.delete('/{response_id}')
async def delete_response(response_id: int, db: Session = Depends(get_db)):
    response = db.query(models.Response).filter(models.Response.id == response_id).first()
    if not response:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    response.active = not response.active
    db.commit()
    db.refresh(response)
    return {"status": 200, "message": Messages.DATA_DELETED, "val": response}
