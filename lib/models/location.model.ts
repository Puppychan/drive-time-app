import { GeoPoint, Timestamp } from 'firebase/firestore'

export interface Location {
  locationId: string
  geoLocation: GeoPoint
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
