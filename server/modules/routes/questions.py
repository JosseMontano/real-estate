from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from typing import List
from modules.core.utils.translate import translate_es_en_pt
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
async def get_question(db: Session = Depends(get_db)):
    questions: List[QuestionResponse] = db.query(models.Question).all()
    if not questions:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"status": "200", "message": "Question found", "val": questions}

@app.post(endpoint)
async def create_question(question: QuestionDTO, db: Session = Depends(get_db)):
    result = translate_es_en_pt(question.question)

    db_question = models.Question(questionEs=result["valEs"], questionEn=result["valEn"], questionPt=result["valPt"])
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return {"status": "201", "message": "Se creo la pregunta con exito", "val": db_question}

@app.delete(endpoint+'{question_id}')
async def delete_question(question_id: int, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(question)
    db.commit()
    return {"status": "200", "message": "Question deleted successfully", "val": question}

@app.put(endpoint+'{question_id}')
async def update_question(question_id: int, updated_question: QuestionDTO, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Update question fields
    question.question = updated_question.question
    db.commit()
    db.refresh(question)
    return {"status": "200", "message": "Question updated successfully", "val": question}
    