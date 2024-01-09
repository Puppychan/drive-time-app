import { Timestamp } from "firebase/firestore"

export enum FavoriteLocationType {
    Business = "Business",
    Personal = "Personal",
}

export const favoriteLocationType = [FavoriteLocationType.Business, FavoriteLocationType.Personal]

export interface FavoriteLocation {
    favoriteLocationId: string
    accountId: string
    locationId: string
    name: string
    type: FavoriteLocationType
    createdAt?: Timestamp
    updatedAt?: Timestamp
}