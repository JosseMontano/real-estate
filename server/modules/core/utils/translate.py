from googletrans import Translator
import time

def translate_es_en_pt(text: str) -> dict:
    """
    Translates the given text from Spanish to English and Portuguese.

    :param text: The text to be translated.
    :return: A dictionary with the original text, English translation, and Portuguese translation.
    """
    translator = Translator()
    
    # Translate from Spanish to English
    translation_en = translator.translate(text, src="es", dest="en")
    value_en = translation_en.text

    # Translate from English to Portuguese
    translation_pt = translator.translate(value_en, src="en", dest="pt")
    value_pt = translation_pt.text

    return {
        "valEs": text,
        "valEn": value_en,
        "valPt": value_pt
    }
    

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