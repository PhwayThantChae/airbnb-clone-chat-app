# owner => owner1
# title => name 
# address => host_location
# photos => [picture_url]
# description => description
# perks => ["wifi", "pool", "parking", "restaurant", "heat"
#           , "tv", "ac", "pets", "beddings", "patio", "kitchen",
#           "entrance"]
# extraInfo => neighborhood_overview + amenities

import requests
import json
import ast
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime


mongo_client = MongoClient('mongodb+srv://phwethantchay:swD9lGHRCB1X6rib@cluster0.8bkxk4k.mongodb.net/?retryWrites=true&w=majority')
db = mongo_client['test']
place_collection = db['places']
ids = set()

# Delete data from place collection
result = place_collection.delete_many({})

current_timestamp = datetime.utcnow()

# Read and process the JSON data
with open('formatted_data/listings.json') as json_file:
    data = json.load(json_file)

    for d in data[:50]:
        amenities = d["amenities"]
        amenities_list = ast.literal_eval(amenities)
        amenities_list_str = ', '.join(amenities_list)

        neighborhood_overview = d["neighborhood_overview"] if d["neighborhood_overview"] is not None else ""

        ids.add(d["id"])

        processed_data = {
            "owner": ObjectId("64f595f54446d6f805373449"),
            "title": d["name"],
            "address": d["host_location"],
            "photos": [d["picture_url"], "https://airbnb-s3.s3.amazonaws.com/1693166296558.jpg", "https://airbnb-s3.s3.amazonaws.com/1693166319052.jpg",
                       "https://airbnb-s3.s3.amazonaws.com/1693166327905.jpg", "https://airbnb-s3.s3.amazonaws.com/1693166335709.jpg", "https://airbnb-s3.s3.amazonaws.com/1693166347547.jpg"],
            "description": d["description"],
            "perks": ["wifi", "pool", "parking", "restaurant", "heat", "tv", "ac", "pets", "beddings", "patio", "kitchen", "entrance"],
            "extraInfo": neighborhood_overview + ", " + amenities_list_str,
            "checkIn": 2,
            "checkOut": 11,
            "maxGuests": 4,
            "price": float(d["price"].replace('$', '').replace(',', '')),
            "scrapedListingId": d["id"],
            "createdAt": current_timestamp,
            "updatedAt": current_timestamp
        }

        place_collection.insert_one(processed_data)



print(ids)