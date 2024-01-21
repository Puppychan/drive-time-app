import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { CollectionName } from "../common/collection-name.enum";
import { db } from "../firebase/firebase";
import { SOS } from "../models/sos.model";
import { getUserById } from "./account.service"

export async function getSOSByUserId(userId: string){
  try {
    let sos = null
    const user = await getUserById(userId);
    if (user) {
      sos = user.sos
    }
    return sos ?? null
  }
  catch (e) {
    throw e
  }
  
}

export async function saveSOS(userId: string, sos: SOS){
  try {
    console.log(sos)
    const user = await updateDoc(doc(db, CollectionName.ACCOUNTS, userId), {
      sos: sos,
      updatedDate: Timestamp.fromDate(new Date())
    });
    console.log(user)
  }
  catch (e) {
    console.log(e)
    throw e
  }
  
}