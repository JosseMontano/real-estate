from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from pydantic import BaseModel
from typing import List

app = APIRouter(
    prefix="/questions",
    tags=["Questions"],
)

class QuestionResponse(BaseModel):
    id: int
    question: str

    class Config:
        orm_mode = True

class QuestionDTO(BaseModel): 
    question: str


@app.get('/questions/')
async def get_question(db: Session = Depends(get_db)):
    questions: List[QuestionResponse] = db.query(models.Question).all()
    if not questions:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"status": "200", "message": "Question found", "val": questions}

@app.post('/questions/')
async def create_question(question: QuestionDTO, db: Session = Depends(get_db)):
    db_question = models.Question(question=question.question)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return {"status": "201", "message": "Question created successfully", "val": db_question}

@app.delete('/questions/{question_id}')
async def delete_question(question_id: int, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(question)
    db.commit()
    return {"status": "200", "message": "Question deleted successfully", "val": question}

@app.put('/questions/{question_id}')
async def update_question(question_id: int, updated_question: QuestionDTO, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Update question fields
    question.question = updated_question.question
    db.commit()
    db.refresh(question)
    return {"status": "200", "message": "Question updated successfully", "val": question}
    