from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from typing import List
from modules.core.utils.translate import translate_es_en_pt
from modules.core.const import Messages

app = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)

endpoint="/api/questions/"

class QuestionResponse(BaseModel):
    id: int
    questionEs: str
    questionEn: str
    questionPt: str
    class Config:
        orm_mode = True

class QuestionDTO(BaseModel): 
    question: str


@app.get(endpoint)
async def get_questions(db: Session = Depends(get_db)):
    questions: List[QuestionResponse] = db.query(models.Question).all()
    if not questions:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    return {"status": 200, "message": Messages.DATA_FOUND, "val": questions}

@app.post(endpoint)
async def create_question(question: QuestionDTO, db: Session = Depends(get_db)):
    result = translate_es_en_pt(question.question)

    db_question = models.Question(questionEs=result["valEs"], questionEn=result["valEn"], questionPt=result["valPt"])
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return {"status": 201, "message": Messages.DATA_CREATED, "val": db_question}

@app.delete(endpoint+'{question_id}')
async def delete_question(question_id: int, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    db.delete(question)
    db.commit()
    return {"status": 200, "message": Messages.DATA_DELETED, "val": question}

@app.put(endpoint+'{question_id}')
async def update_question(question_id: int, updated_question: QuestionDTO, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        return {"status": 404, "message": Messages.DATA_NOT_FOUND, "val": []}
    
    # Update question fields
    question.question = updated_question.question
    db.commit()
    db.refresh(question)
    return {"status": 200, "message": Messages.DATA_UPDATED, "val": question}
    