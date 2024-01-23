import { Timestamp } from 'firebase/firestore'

export enum TransportType {
  Car4 = 'Car4',
  Car4_VIP = 'Car4 VIP',
  Car7 = 'Car7'
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

export const transportTypeList = [TransportType.Car4, TransportType.Car4_VIP, TransportType.Car7]
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
