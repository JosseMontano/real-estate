from fastapi import FastAPI, HTTPException, Response  # Added Response import
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator
from geopy.geocoders import Nominatim
from pydantic import BaseModel
from email.message import EmailMessage
import requests
import os
from dotenv import load_dotenv
import time
import ssl
import smtplib
# Load environment variables from .env file
BASEDIR = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(BASEDIR, '.env'))

# Create FastAPI instance
app = FastAPI()

# Configure CORS
origins = ["http://localhost:5173", "exp://192.168.1.13:19000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the Google Maps API key from environment variables
GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')
PASSWORD_EMAIL=os.getenv('PASSWORD_EMAIL')
EMAIL_SENDER=os.getenv('EMAIL_SENDER')


class TranslateRequest(BaseModel):
    val: str


class RealEstateRequest(BaseModel):
    ubication: str


class NearbyPlacesRequest(BaseModel):
    location: str


class FetchImageRequest(BaseModel):  # Added request model for fetch_image
    url: str

class EmailRequest(BaseModel):
    email_receiver: str
    subject: str
    msg: str

@app.get('/')
def index():
    return {"Choo Choo": "Welcome to the API realEstates 🚅"}



@app.post('/api/translate')
def translate_es_en(request: TranslateRequest):
    translator = Translator()
    max_retries = 5
    delay_between_retries = 1  # seconds

    for attempt in range(max_retries):
        try:
            # Translate from Spanish to English
            translation = translator.translate(request.val, src="es", dest="en")
            value_en = translation.text if translation and translation.text else None

            # If we didn't get a translation, retry
            if not value_en:
                raise ValueError("Empty translation for Spanish to English")

            # Translate from English to Portuguese
            translation_pt = translator.translate(value_en, src="en", dest="pt")
            value_pt = translation_pt.text if translation_pt and translation_pt.text else None

            # If we didn't get a translation, retry
            if not value_pt:
                raise ValueError("Empty translation for English to Portuguese")

            # If both translations are successful, return the result
            return {
                "val": {
                    "valEs": request.val,
                    "valEn": value_en,
                    "valPt": value_pt
                }
            }
        except Exception as e:
            print(f"Attempt {attempt + 1} failed with error: {e}")
            time.sleep(delay_between_retries)  # Wait before retrying

    # If all attempts fail, raise an HTTP 500 error
    raise HTTPException(status_code=500, detail="A server error occurred during translation.")

@app.post('/api/real-estate')
def post_company_api(request: RealEstateRequest):
    ubication = request.ubication

    if ubication:
        geo_location = Nominatim(user_agent="GetLoc")
        loc_name = geo_location.reverse(ubication)
        address = loc_name.address if loc_name else "Not Found"
    else:
        address = " "

    return {"val": address}


@app.post('/api/fetch_nearby_places')
def fetch_nearby_places(request: NearbyPlacesRequest):
    location = request.location
    if not location:
        raise HTTPException(status_code=400, detail="Location parameter is required")

    url = f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location}&radius=1000&key={GOOGLE_MAPS_API_KEY}'
    
    response = requests.get(url, headers={"Content-Type": "application/json"})
    response.raise_for_status()
    
    data = response.json()
    results = data.get('results', [])

    formatted_results = [
        {
            "name": place.get("name"),
            "location": place["geometry"]["location"],
            "types": place.get("types")
        }
        for place in results
    ]
    
    return {"val": formatted_results}

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

@app.post('/api/send_email')
def send_email(request: EmailRequest):
    email_receiver = request.email_receiver
    em = EmailMessage()
    em["From"] = EMAIL_SENDER
    em["To"] = email_receiver
    em["Subject"] = request.subject
    em.set_content(request.msg)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(EMAIL_SENDER, PASSWORD_EMAIL)
        server.sendmail(EMAIL_SENDER, email_receiver, em.as_string())

    return {"val": "Email sent successfully"}

# Run the application
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000, debug=True)
