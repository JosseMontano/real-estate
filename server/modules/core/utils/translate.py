from google.cloud import translate_v2 as translate
import time
import logging
import os
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KEY_PATH = os.path.join(BASE_DIR, "gcp_key.json")
client = translate.Client.from_service_account_json(KEY_PATH)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def translate_es_en_pt(text: str) -> dict:
    result = {
        "valEs": text,
        "valEn": text,  # Default to original text if translation fails
        "valPt": text,  # Default to original text if translation fails
    }

    translation_en = client.translate(text, target_language="en")
    result["valEn"] = translation_en["translatedText"]

    translation_pt = client.translate(result["valEn"], target_language="pt")
    result["valPt"] = translation_pt["translatedText"]

    return result

def translate_en_es_pt(text: str, max_retries: int = 3, delay: int = 2) -> dict:
    """
    Traduce el texto dado a español y portugués, con reintentos en caso de fallo.
    
    :param text: El texto a traducir.
    :param max_retries: El número máximo de intentos en caso de fallo.
    :param delay: El tiempo (en segundos) que espera antes de reintentar.
    :return: Un diccionario con las traducciones al español y portugués.
    """
    translator = Translator()
    
    # Intentar traducir hasta max_retries veces
    for attempt in range(max_retries):
        try:
            # Traducir de inglés a español
            translation_es = translator.translate(text, src="en", dest="es").text
            # Traducir de inglés a portugués
            translation_pt = translator.translate(text, src="en", dest="pt").text

            return {
                "valEs": translation_es,
                "valEn": text,  # El texto original en inglés
                "valPt": translation_pt
            }
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(delay)
            else:
                print(f"Failed to translate: {text}")
                return None  # Devuelve None si no se puede traducir después de reintentos

    return None  # E