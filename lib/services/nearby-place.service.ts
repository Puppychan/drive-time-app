import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";

const API_KEY = "AIzaSyADa2562hFV2teFIzhpf3krc5TJIuW-Pl4";

const headers = {
  "Content-Type": "application/json",
  "X-Goog-Api-Key": "AIzaSyADa2562hFV2teFIzhpf3krc5TJIuW-Pl4",
  "X-Goog-FieldMask": ['places.displayName', 'places.formattedAddress', 'places.photos', 'places.iconMaskBaseUri', 'places.rating', 'places.priceLevel', 'places.currentOpeningHours','places.types','places.userRatingCount']
}

const nearByPlace = () => axios.post(BASE_URL, {
  "includedTypes": ["convenience_store"],
  "maxResultCount": 20,
  "locationRestriction": {
    "circle": {
      "center": {
        "latitude": 10.7292001,
        "longitude": 106.6228775
      },
      "radius": 5000.0
    }
  }
}, { headers })

export default {
  nearByPlace,
  API_KEY
};
