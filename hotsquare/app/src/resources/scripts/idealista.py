import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

zones = [
    {'locationName': 'Porto, Porto', 'locationId': '0-EU-PT-13-12', 'numPages': 17},
    {'locationName': 'Matosinhos e Leça da Palmeira, Porto','locationId': '0-EU-PT-13-08-012-12','numPages': 4},
    {'locationName': 'São Mamede de Infesta e Senhora da Hora, Porto', 'locationId': '0-EU-PT-13-08-014-14', 'numPages': 3},
    {'locationName': 'Custóias - Leça do Balio - Guifões, Porto', 'locationId': '0-EU-PT-13-08-011-11', 'numPages': 3},
    {'locationName': 'Pedrouços, Porto', 'locationId': '0-EU-PT-13-06-017-17', 'numPages': 3},
    {'locationName': 'Rio Tinto, Porto', 'locationId': '0-EU-PT-13-04-008-08', 'numPages': 3},
    {'locationName': 'Santa Marinha e São Pedro da Afurada, Porto', 'locationId': '0-EU-PT-13-17-030-30', 'numPages': 3},
    {'locationName': 'Oliveira do Douro, Porto', 'locationId': '0-EU-PT-13-17-012-12', 'numPages': 3}]


listings = []
codes = []

headers = {
	"X-RapidAPI-Key": os.getenv('RapidAPI'),
	"X-RapidAPI-Host": "idealista2.p.rapidapi.com"
}

url = "https://idealista2.p.rapidapi.com/properties/list"

querystring = {
    "locationId": "null",
    "locationName": "null",
    "operation":"rent",
    "numPage":"1",
    "maxItems":"50",
    "sort":"asc",
    "locale":"en",
    "country":"pt"
}

for zone in zones:
    # change zone
    querystring["locationId"] = zone["locationId"]
    querystring["locationName"] = zone["locationName"]

    for page in range(1, zone["numPages"]):
        # change page
        querystring["numPage"] = page

        # make the request
        response = requests.request("GET", url, headers=headers, params=querystring)
        data = response.json()

        for listing in data['elementList']:
            if listing["propertyCode"] not in codes:
                listings.append(listing)
                codes.append(listing["propertyCode"])


with open("idealista_listings.json", "w") as f:
    json.dump(listings, f)