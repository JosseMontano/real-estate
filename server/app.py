from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
import uvicorn
import requests
import os
from pydantic import BaseModel
from modules.core.database import engine
import modules.core.models as models
from modules.routes import questions
from modules.routes import typeRE
from modules.routes import realEstates


# Create FastAPI instance
app = FastAPI()
models.Base.metadata.create_all(bind=engine)
app.include_router(questions.app)
app.include_router(typeRE.app)
app.include_router(realEstates.app)

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
