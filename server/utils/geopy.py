from geopy.geocoders import Nominatim

def convertToAddres(ubication) :
    geoLocation = Nominatim(user_agent="GetLoc")
    locName = geoLocation.reverse(ubication)
    return locName.address