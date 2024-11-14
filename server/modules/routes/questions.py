from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session,joinedload
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from typing import List
from modules.core.utils.translate import translate_es_en_pt
from modules.core.const import Messages

app = APIRouter(
    prefix="/api/questions",
    tags=["Questions"],
)

class QuestionDTO(BaseModel): 
    question: str

@app.get('/')
async def get_questions(db: Session = Depends(get_db)):
    query = db.query(models.Question).options(
        joinedload(models.Question.question)
    )
    questions= query.all()
    if not questions:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": questions}

@app.post('/')
async def create_question(question: QuestionDTO, db: Session = Depends(get_db)):
    result_question = translate_es_en_pt(question.question)

    question_translate = models.Translate(es=result_question["valEs"], en=result_question["valEn"], pt=result_question["valPt"])
    db.add(question_translate)
    db.commit()
    db.refresh(question_translate)

    db_question = models.Question(
        question_id=question_translate.id,
        active=True
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return {"status": 201, "message": Messages.DATA_CREATED, "val": db_question}

@app.delete('/{question_id}')
async def delete_question(question_id: int, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    question.active= not question.active
    db.commit()
    db.refresh(question)
    return {"status": 200, "message": Messages.DATA_DELETED, "val": question}

@app.put('/{question_id}')
async def update_question(question_id: int, updated_question: QuestionDTO, db: Session = Depends(get_db)):
    try:
        question = db.query(models.Question).filter(models.Question.id == question_id).first()
        if question is None:
            return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
        
        result_question = translate_es_en_pt(updated_question.question)
        question.question.es = result_question["valEs"]
        question.question.en = result_question["valEn"]
        question.question.pt = result_question["valPt"]
        question.active = True
        
        db.commit()
        db.refresh(question)
        return {"status": 200, "message": Messages.DATA_UPDATED, "val": question}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}