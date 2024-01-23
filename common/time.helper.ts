import { Timestamp } from 'firebase/firestore';

// Function to format Firestore Timestamp to readable time
export const formatTimestampToReadableTime = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
};

// Function to convert a Date to Firestore Timestamp
export const convertDateToTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromDate(date);
};