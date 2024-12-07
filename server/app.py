from fastapi import FastAPI, HTTPException, Response, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
import uvicorn
import requests

from pydantic import BaseModel
from modules.core.database import engine
import modules.core.models as models
from modules.core.seed import seed_users, seed_types_real_estates, seed_questions, seed_real_estates
from modules.routes import questions
from modules.routes import typeRE
from modules.routes import realEstates
from modules.routes import comments
from modules.routes import favorite_real_estates
from modules.routes import responses
from modules.routes import users
from sqlalchemy.orm import Session
from modules.core.database import get_db 

import os
import httpx
from urllib.parse import urlencode

# Create FastAPI instance
app = FastAPI()
models.Base.metadata.create_all(bind=engine)
app.include_router(questions.app)
app.include_router(typeRE.app)
app.include_router(realEstates.app)
app.include_router(comments.app)
app.include_router(favorite_real_estates.app)
app.include_router(responses.app)
app.include_router(users.app)

# Configure CORS
origins = ["http://localhost:5173", "exp://192.168.1.13:19000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslateRequest(BaseModel):
    val: str

class RealEstateRequest(BaseModel):
    ubication: str

class FetchImageRequest(BaseModel):  # Added request model for fetch_image
    url: str
    


@app.get('/')
def index():
    return {"Choo Choo": "Welcome to the API realEstates 🚅"}


def get_params_str(params: dict) -> str:
    filtered_params = {k: v for k, v in params.items() if v}
    return "?" + urlencode(filtered_params)

@app.get('/google')
async def google(code: str = Query(...), state: str = Query(...)):
    if not code:
        raise HTTPException(status_code=400, detail="Código inválido")
    
    #! ENVIRONMENT 
    CLIENT_ID = os.getenv("CLIENT_ID")
    CLIENT_SECRET = os.getenv("CLIENT_SECRET")
    BACKEND_URL = os.getenv("BACKEND_URL")
    if not CLIENT_ID or not CLIENT_SECRET or not BACKEND_URL:
        raise HTTPException(status_code=500, detail="Environment not configured.")

    #! VARS
    app_url = state
    base_url = "https://oauth2.googleapis.com/token"
    params = {
        "code": code,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "redirect_uri": f"{BACKEND_URL}google",
        "state": "1234_purpleGoogle",
        "prompt": "consent",
        "grant_type": "authorization_code",
    }

    try:
        async with httpx.AsyncClient() as client:
            url_with_params = base_url + get_params_str(params)
            response = await client.post(url_with_params, headers={"Content-Type": "application/json"})
            if  response.status_code != 200:
                raise HTTPException(status_code=400, detail="Error obtaining the token.")

            data = response.json()
            verify_url = f"https://oauth2.googleapis.com/tokeninfo?id_token={data['id_token']}"
            verify_response = await client.get(verify_url)
            if verify_response.status_code != 200:
                raise HTTPException(status_code=400, detail="Error verifying the user token.")
            
            user_data = verify_response.json()
            #? user_data has properties like sub (id), name, email, picture...
            #? here you will need to verify if the user already exists in the database or you will need to create a new one with the data
            #? once verified send params to do login in the frontend
            sendParams = {
                "id": user_data['sub'],
                "name": user_data['name']
            }
            redirect_url = app_url + get_params_str(sendParams)
            return f"<script>window.location.replace("{redirect_url}")</script>
            """
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get('/api/seed')
async def seed(db: Session = Depends(get_db)):
    try:
        await seed_users(db)
        await seed_types_real_estates(db)
        await seed_questions(db)
        await seed_real_estates(db)
        return {"status": 200, "message": "Seed successful"}
    except Exception as e:
        return {"status": 500, "message": str(e)}

@app.post('/api/translate')
def translate_es_en(request: TranslateRequest):
    translator = Translator()
    translation = translator.translate(request.val, src="es", dest="en")
    value_en = translation.text

    translation_pt = translator.translate(value_en, src="en", dest="pt")
    value_pt = translation_pt.text

    return {
        "val": {
            "valEs": request.val,
            "valEn": value_en,
            "valPt": value_pt
        }
    }

@app.post('/api/fetch_image')
def fetch_image(request: FetchImageRequest):  # Changed to use request body
    try:
        # Realiza la solicitud a la URL proporcionada
        response = requests.get(request.url)  # Access URL from request body
        response.raise_for_status()

        # Obtiene el tipo de contenido de la respuesta
        content_type = response.headers.get("Content-Type")

        # Retorna la imagen con el tipo de contenido correcto
        return Response(content=response.content, media_type=content_type)

    except requests.exceptions.RequestException as e:
        # Maneja errores si la solicitud falla
        raise HTTPException(status_code=400, detail=str(e))
    
# Run the application
if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=5000, debug=True)
