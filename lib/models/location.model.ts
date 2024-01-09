import { Timestamp } from "firebase/firestore"

export interface Location {
    locationId: string
    longitude: string
    latitude: string
    createdAt?: Timestamp
    updatedAt?: Timestamp
}