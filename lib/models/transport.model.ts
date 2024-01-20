import { Timestamp } from 'firebase/firestore'

export enum TransportType {
  Car = 'Car',
  Bike = 'Bike',
  XLCar = 'XLCar'
}

export enum TransportColor {
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Blue = 'Blue',
  Indigo = 'Indigo',
  Violet = 'Violet'
}

export const transportTypeList = [TransportType.Car, TransportType.Bike, TransportType.XLCar]
export const transportColorList = [
  TransportColor.Red,
  TransportColor.Orange,
  TransportColor.Yellow,
  TransportColor.Green,
  TransportColor.Blue,
  TransportColor.Indigo,
  TransportColor.Violet
]

export interface Transport {
  transportId: string
  name: string
  type: TransportType
  color: TransportColor
  createdAt?: Timestamp
  updatedAt?: Timestamp
  licensePlate: string
}
