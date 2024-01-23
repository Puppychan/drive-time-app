import { Timestamp } from 'firebase/firestore';

// Function to format Firestore Timestamp to readable time
export const formatTimestampToReadableTime = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
    return date.toLocaleString(); // or use any other format you prefer
};

// Function to convert a Date to Firestore Timestamp
export const convertDateToTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromDate(date);
};