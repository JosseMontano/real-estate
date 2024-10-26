from flask import request
from psycopg2 import extras
from utils.geopy import convertToAddres
from googletrans import Translator

def translate_text(text, fromLanguage, to):
    translator = Translator()
    translation = translator.translate(text, src=fromLanguage, dest=to)
    return translation.text

def post_realEstate(ubication):
    # * ========= Convert lat and long to Address =========
    if ubication != "":
        address = convertToAddres(ubication)

    if ubication == "":
        address = " "

    return address
