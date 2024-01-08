from bs4 import BeautifulSoup
import pandas as pd
import requests
import re
import json
import time

## Title ##
def get_title(json):
    return json["props"]["pageProps"]["ad"]["title"]


## Price attributes ##
def get_price(json):
    for i in json["props"]["pageProps"]["ad"]["characteristics"]:
        if i["key"] == "price":
            return i["value"]
    return ""

def get_price_by_area(json):
    for i in json["props"]["pageProps"]["ad"]["characteristics"]:
        if i["key"] == "price_per_m":
            return i["value"]
    return ""

## Location attributes ##
def get_address(json): #Rua
    return json["props"]["pageProps"]["ad"]["location"]["address"]["street"]

def get_municipality(json): #Sao mamede de Infesta
    return json["props"]["pageProps"]["ad"]["location"]["address"]["city"]["name"]

def get_province(json): #Porto, Braga...
    return json["props"]["pageProps"]["ad"]["location"]["address"]["province"]["name"]

def get_district(json): #Matosinhos, Gaia...
    return json["props"]["pageProps"]["ad"]["location"]["address"]["county"]["name"]

def get_latitude(json):
    return json["props"]["pageProps"]["ad"]["location"]["coordinates"]["latitude"]

def get_longitude(json):
    return json["props"]["pageProps"]["ad"]["location"]["coordinates"]["longitude"]


## Size ##
def get_size(json):
    for i in json["props"]["pageProps"]["ad"]["characteristics"]:
        if i["key"] == "m":
            return i["value"]

## Rooms ##
def get_rooms(json):
    for i in json["props"]["pageProps"]["ad"]["characteristics"]:
        if i["key"] == "rooms_num":
            return i["value"]

## Bathrooms ##
def get_bathrooms(json):
    for i in json["props"]["pageProps"]["ad"]["characteristics"]:
        if i["key"] == "bathrooms_num":
            return i["value"]

## Description
def get_description(json):
    return json["props"]["pageProps"]["ad"]["description"]

## Images
def get_thumbnail_image(json):
    if get_num_pictures(json) == 0:
        return ""
    return json["props"]["pageProps"]["ad"]["images"][0]["thumbnail"]

def get_num_pictures(json):
    return len(json["props"]["pageProps"]["ad"]["images"])

def get_all_pictures(json):
    list = []
    for i in json["props"]["pageProps"]["ad"]["images"]:
        dict = {}
        dict["url"] = i["thumbnail"]
        list.append(dict)
    return list

## ID ##
def get_id(json):
    return "IM" + str(json["props"]["pageProps"]["ad"]["id"])


## Contact info ##
def get_contact_info(json):
    dict = {}
    dict["contactName"] = json["props"]["pageProps"]["ad"]["contactDetails"]["name"]
    dict_phone = {}
    if not len(json["props"]["pageProps"]["ad"]["contactDetails"]["phones"]) == 0:
        formated_phone = json["props"]["pageProps"]["ad"]["contactDetails"]["phones"][0]
        dict_phone["phoneNumberForMobileDialing"] = formated_phone
        dict_phone["phoneNumber"] = formated_phone[4:]
        dict["phone1"] = dict_phone
    dict["userType"] = json["props"]["pageProps"]["ad"]["contactDetails"]["type"]

    return dict

## One page info ##
def get_page_info(id, house):
    dict = {}
    page = requests.get(house)
    soup = BeautifulSoup(page.content, "html.parser")

    results = soup.find_all(id="__NEXT_DATA__")
    sub_string = str(results[0])[76:-10]
    json_string = "{" + sub_string + "}"
    json_obj = json.loads(json_string)

    title = get_title(json_obj)


    if len(title) != 0:
        #ID
        dict["propertyCode"] = id

        #Title
        dict["externalReference"] = title

        #URL
        dict["url"] = house

        #Prices
        dict["price"] = get_price(json_obj)
        dict["priceByArea"] = get_price_by_area(json_obj)

        #Location
        dict["address"] = get_address(json_obj)
        dict["municipality"] = get_municipality(json_obj)
        dict["province"] = get_province(json_obj)
        dict["district"] = get_district(json_obj)
        dict["country"] = "pt"
        dict["latitude"] = get_latitude(json_obj)
        dict["longitude"] = get_longitude(json_obj)


        #Property Info
        dict["rooms"] = get_rooms(json_obj)
        dict["size"] = get_size(json_obj)
        dict["bathrooms"] = get_bathrooms(json_obj)

        #Descricao
        dict["description"] = get_description(json_obj)

        #Images
        dict["thumbnail"] = get_thumbnail_image(json_obj)
        dict["numPhotos"] = get_num_pictures(json_obj)
        dict1 = {}
        dict1["images"] = get_all_pictures(json_obj)
        dict["multimedia"] = dict1


        #Contact Info
        dict["contactInfo"] = get_contact_info(json_obj)

    return dict

link = "https://www.imovirtual.com/arrendar/apartamento/?locations%5B0%5D%5Bregion_id%5D=13&locations%5B0%5D%5Bsubregion_id%5D=190&locations%5B1%5D%5Bregion_id%5D=13&locations%5B1%5D%5Bsubregion_id%5D=186&locations%5B1%5D%5Bcity_id%5D=13639694&locations%5B2%5D%5Bregion_id%5D=13&locations%5B2%5D%5Bsubregion_id%5D=186&locations%5B2%5D%5Bcity_id%5D=13639691&locations%5B3%5D%5Bregion_id%5D=13&locations%5B3%5D%5Bsubregion_id%5D=184&locations%5B3%5D%5Bcity_id%5D=13637649&locations%5B4%5D%5Bregion_id%5D=13&locations%5B4%5D%5Bsubregion_id%5D=182&locations%5B4%5D%5Bcity_id%5D=13635592&locations%5B5%5D%5Bregion_id%5D=13&locations%5B5%5D%5Bsubregion_id%5D=195&locations%5B5%5D%5Bcity_id%5D=13648926&locations%5B6%5D%5Bregion_id%5D=13&locations%5B6%5D%5Bsubregion_id%5D=195&locations%5B6%5D%5Bcity_id%5D=13648908"
page = requests.get(link)

soup = BeautifulSoup(page.content, "html.parser")

results = soup.find_all("ul" , class_="pager")
a = []
for r in results:
    for l in r.find_all("li"):
        a.append(l.text)
lastSearchIndex = int(a[-2])

allPages = []
houseSet = set()

for i in range(lastSearchIndex):
    allPages.append(link + "&page=" + str(i+1))
for page in allPages:
    matpage = requests.get(page)
    soup = BeautifulSoup(matpage.content, "html.parser")
    results = soup.find_all("header" , class_="offer-item-header")
    for r in results:
        for l in r.find_all("a"):
            if l["href"] != '#':
                houseSet.add(l["href"])

repeated = {}

for house in houseSet:
    page = requests.get(house)
    soup = BeautifulSoup(page.content, "html.parser")

    results = soup.find_all(id="__NEXT_DATA__")
    if not len(results) == 0:

        sub_string = str(results[0])[76:-10]
        json_string = "{" + sub_string + "}"
        json_obj = json.loads(json_string)

        title = get_title(json_obj)
        if len(title) != 0:
            repeated[get_id(json_obj)] = house

python_to_json = []
for id in repeated:
    python_to_json.append(get_page_info(id, repeated[id]))


with open("imovirtual_listings.json", "w") as outfile:
    json.dump(python_to_json, outfile)