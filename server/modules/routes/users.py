from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from modules.core.database import get_db 
import modules.core.models as models
import base64

from modules.core.const import AuthMsg
import bcrypt

app = APIRouter(
    prefix="/api/auth",
    tags=["Auth"],
)

# Request model for creating and updating RealEstate
class signUpDTO(BaseModel):
    email: str
    password: str
    confirmPassword: str

class NearbyPlacesRequest(BaseModel):
    location: str

@app.post('/signup')
async def sign_up(user: signUpDTO, db: Session = Depends(get_db)):
    try:
        if user.password != user.confirmPassword:
            return {"status": 400, "message": AuthMsg.PASSWORD_NOT_MATCH, "val": []}
   
        found_user = db.query(models.User).filter(models.User.email == user.email).first()
            
        if found_user:      
            if not bcrypt.checkpw(user.password.encode('utf-8'), found_user.password.encode('utf-8')):
                return {"status": 400, "message": AuthMsg.PASSWORD_WRONG, "val": []}
        
            return {"status": 200, "message": AuthMsg.USER_EXIST, "val": found_user}
   
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

        
        db_user = models.User(
            email=user.email,
            password=hashed_password.decode('utf-8'),
            available=True,
            cellphone=0,
            code_recuperation="",
            qualification=0,
            role=2,
            username="1234"
        )
        # Save RealEstate entry
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return {"status": 201, "message": AuthMsg.USER_CREATED, "val": db_user}
    except Exception as e:
        db.rollback()
        return {"status": 500, "message": str(e), "val": []}
