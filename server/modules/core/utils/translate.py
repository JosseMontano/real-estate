from googletrans import Translator

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