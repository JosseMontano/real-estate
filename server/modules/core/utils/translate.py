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
    
    :param text: El texto a traducir (en inglés).
    :param max_retries: El número máximo de intentos en caso de fallo.
    :param delay: El tiempo (en segundos) que espera antes de reintentar.
    :return: Un diccionario con las traducciones al español y portugués.
             Si falla, devuelve el texto original en todos los campos.
    """
    result = {
        "valEs": text,  # Texto original si la traducción falla
        "valEn": text,  # Texto original en inglés
        "valPt": text,  # Texto original si la traducción falla
    }

    # Intentar traducir hasta max_retries veces
    for attempt in range(max_retries):
        try:
            # Traducir de inglés a español
            translation_es = client.translate(text, target_language="es")
            result["valEs"] = translation_es["translatedText"]

            # Traducir de inglés a portugués
            translation_pt = client.translate(text, target_language="pt")
            result["valPt"] = translation_pt["translatedText"]

            logger.info(f"Translation successful: {result}")
            return result

        except Exception as e:
            logger.error(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(delay)
            else:
                logger.error(f"Failed to translate after {max_retries} attempts: {text}")
                return result  # Devuelve el texto original si falla después de los reintentos

    return result  # Devuelve el texto original si falla