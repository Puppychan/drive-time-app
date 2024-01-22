import { Account, AccountRole } from '@/lib/models/account.model';
import { collection, getDocs, query, where, updateDoc, doc, Timestamp, GeoPoint } from "firebase/firestore";
import { Transport, TransportColor, TransportType } from "../models/transport.model";
import { db } from "../firebase/firebase";
import { CollectionName } from "../common/collection-name.enum";
import { faker } from '@faker-js/faker';

// District 1
const minLatitudeD1 = 10.762622;
const maxLatitudeD1 = 10.795813;
const minLongitudeD1 = 106.660172;
const maxLongitudeD1 = 106.709373;

// District 7
const minLatitudeD7 = 10.734034;
const maxLatitudeD7 = 10.773194;
const minLongitudeD7 = 106.677721;
const maxLongitudeD7 = 106.749810;

// District 4
const minLatitudeD4 = 10.757100;
const maxLatitudeD4 = 10.773031;
const minLongitudeD4 = 106.694349;
const maxLongitudeD4 = 106.709046;

const generateLocation = () => {
      // Generate a random district
  const district = faker.helpers.arrayElement([1, 4, 7]);

  let latitude, longitude;
  switch (district) {
    case 1:
      latitude = faker.location.latitude({ min: minLatitudeD1, max: maxLatitudeD1 });
      longitude = faker.location.longitude({ min: minLongitudeD1, max: maxLongitudeD1 });
      break;
    case 4:
      latitude = faker.location.latitude({ min: minLatitudeD4, max: maxLatitudeD4 });
      longitude = faker.location.longitude({ min: minLongitudeD4, max: maxLongitudeD4 });
      break;
    case 7:
    default:
      latitude = faker.location.latitude({ min: minLatitudeD7, max: maxLatitudeD7 });
      longitude = faker.location.longitude({ min: minLongitudeD7, max: maxLongitudeD7 });
      break;
  }
  return {latitude, longitude}
}

const generateRandomTransportData = () => {
    const transportId = faker.string.uuid();
    const type = faker.helpers.enumValue(TransportType)
    const name = faker.vehicle.vehicle();
    const color = faker.helpers.enumValue(TransportColor);
    const licensePlate = faker.vehicle.vin();
  
    const transport = {
      transportId,
      name,
      type,
      color,
      licensePlate,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    } as Transport;
    return transport
  };
  

export const updateAllDriverAccountsTransport = async () => {
  try {
    const q = query(collection(db, CollectionName.ACCOUNTS), where("role", "==", AccountRole.Driver));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((driverDoc) => {
        if (!driverDoc.data().transport) {
            const driverRef = doc(db, CollectionName.ACCOUNTS, driverDoc.id);
            console.log("Driver id", driverRef.id);
            const driverLocation = generateLocation()
            
            updateDoc(driverRef, {
                transport: generateRandomTransportData(),
                location: new GeoPoint(driverLocation.latitude, driverLocation.longitude),
                updatedAt: Timestamp.now()
            });
        }
    });
    
  } catch(err) {
    console.log("Error updating driver transportion", err);
  }
};
export const updateAllDriverAccountsToBeTrueRandomly = async () => {
  try {
    const q = query(collection(db, CollectionName.ACCOUNTS), where("role", "==", AccountRole.Driver));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((driverDoc) => {
      const driverRef = doc(db, CollectionName.ACCOUNTS, driverDoc.id);
      console.log("Driver id", driverRef.id);
      
      updateDoc(driverRef, {
        // isAvailable: faker.datatype.boolean(),
        isAvailable: true,
        updatedAt: Timestamp.now()
      });
    });
    
  } catch(err) {
    console.log("Error updating driver isAvailable status", err);
  }
};