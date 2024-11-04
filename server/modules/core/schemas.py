from pydantic import BaseModel
from typing import List

class QuestionResponse(BaseModel):
    id: int
    question: str

    class Config:
        orm_mode = True

class Reponse(BaseModel):
    status: str
    message: str
    val:List[QuestionResponse]

    
class QuestionBase(BaseModel):  # Added request model for fetch_image
    question: str
