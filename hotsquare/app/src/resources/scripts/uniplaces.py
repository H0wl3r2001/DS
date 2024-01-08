import requests
import json
pages = []
for i in range(1, 23):
    resp = requests.get(
        url='https://www.uniplaces.com/api/search/offers',
        params={
            "city": 'PT-porto',
            "limit": '50',
            "page": str(i),
        })
    body = resp.json()
    pages.append(body)
base_url = 'https://www.uniplaces.com/accommodation/porto'


all_data = []
for body in pages:
    data = [ 
        {
            "id": t['id'],
            "url":base_url + '/' + t['id'],
            "title":t['attributes']['accommodation_offer']['title'],
            "price":t['attributes']['accommodation_offer']['price']['amount']/100,
            "available_date":t['attributes']['accommodation_offer']['available_from'],
            "all_bills_included":t['attributes']['accommodation_offer']['all_bills_included'],
            "max_people":t['attributes']['accommodation_offer']['max_guests'],
            "place":t['attributes']['property']['neighbourhood']['name'],
            "number_of_rooms":t['attributes']['property']['number_of_rooms'],
            "number_of_bathrooms":t['attributes']['property']['number_of_bathrooms'],
            "has_resident_landlord":t['attributes']['property']['has_resident_landlord'],
            "type":t['attributes']['property']['type'],
            "accommodation_type":t['attributes']['property']['accommodation_type'],
            "location":(t['attributes']['property']['coordinates'][0], t['attributes']['property']['coordinates'][1])
        }
       for t in body['data'] if not (t.get('attributes').get('property').get('neighbourhood')) is None
    ]
    for page in data:
        all_data.append(page)

python_obj = json.dumps(all_data)
with open("uniplaces_listings.json", "w") as outfile:
    outfile.write(python_obj)
