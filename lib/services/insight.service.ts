import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { CollectionName } from "../common/collection-name.enum";
import { db } from "../firebase/firebase";
import { AccountRole } from "../models/account.model";

export const insightRolePartition = async () => {
  const col = collection(db, CollectionName.ACCOUNTS);
  const qCustomer = query(col, where("role", "==", AccountRole.Customer));
  const qDriver = query(col, where("role", "==", AccountRole.Driver));
  const qAdmin = query(col, where("role", "==", AccountRole.Admin));
  
  const snapCustomer = await getCountFromServer(qCustomer);
  const snapDriver = await getCountFromServer(qDriver);
  const snapAdmin = await getCountFromServer(qAdmin);

  const countAdmin = snapAdmin.data().count;
  const countDriver = snapDriver.data().count;
  const countCustomer = snapCustomer.data().count;
  const sum = countAdmin + countDriver + countCustomer
  const driver = Math.floor((countDriver*100)/sum)
  const customer =  Math.floor((countCustomer*100)/sum)
  const admin = 100 - driver - customer


  const  chartData = [
    {value: admin, color: '#177AD5', text: `${admin}%`},
    {value: driver, color: '#79D2DE', text: `${driver}%`},
    {value: customer, color: '#ED6665', text: `${customer}%`}
  ]

  const legends = [
    {
      text: AccountRole.Customer,
      color: '#ED6665' 
    },
    {
      text: AccountRole.Driver,
      color: '#79D2DE' 
    },
    {
      text: AccountRole.Admin,
      color: '#177AD5' 
    }
  ]

  const data = {
    totalUser: sum,
    legends: legends,
    chartData: chartData
  }
  return data

}