from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from modules.core.database import get_db  # Import the get_db dependency
import modules.core.models as models
from modules.core.schemas import QuestionBase, QuestionResponse, Reponse

app = APIRouter(
    prefix="/questions",
    tags=["Questions"],  # This tag will group routes under "Questions" in Swagger
)

@app.get('/questions/', response_model=Reponse)
async def get_question(db: Session = Depends(get_db)):
    questions = db.query(models.Question).all()
    if not questions:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"status": "success", "message": "Question found", "val": questions}

@app.post('/questions/')
async def create_question(question: QuestionBase, db: Session = Depends(get_db)):
    db_question = models.Question(question=question.question)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@app.delete('/questions/{question_id}', response_model=dict)
async def delete_question(question_id: int, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(question)
    db.commit()
    return {"message": "Question deleted successfully"}

@app.put('/questions/{question_id}', response_model=QuestionResponse)
async def update_question(question_id: int, updated_question: QuestionBase, db: Session = Depends(get_db)):
    question = db.query(models.Question).filter(models.Question.id == question_id).first()
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    
    # Update question fields
    question.question = updated_question.question
    db.commit()
    db.refresh(question)
    return question