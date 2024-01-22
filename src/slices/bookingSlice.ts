import { Booking, BookingStatus } from '@/lib/models/booking.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

interface BookingState extends Booking {
    // Add any additional state properties if needed
}

const initialState: BookingState = {
    // Initialize with default values
    bookingId: '',
    customerIdList: [],
    driverId: '',
    preScheduleTime: null,
    price: 0,
    discountPrice: 0,
    voucherId: null,
    departure: '',
    destinationList: [],
    status: BookingStatus.Finding,
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setCustomerIdList: (state, action: PayloadAction<string[]>) => {
            state.customerIdList = action.payload;
        },
        setDriverId: (state, action: PayloadAction<string>) => {
            state.driverId = action.payload;
        },
        // setPreScheduleTime: (state, action: PayloadAction<Timestamp | null>) => {
        //   state.preScheduleTime = action.payload;
        // },
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        },
        setDiscountPrice: (state, action: PayloadAction<number>) => {
            state.discountPrice = action.payload;
        },
        setVoucherId: (state, action: PayloadAction<string | null>) => {
            state.voucherId = action.payload;
        },
        setDeparture: (state, action: PayloadAction<string>) => {
            state.departure = action.payload;
        },
        setDestinationList: (state, action: PayloadAction<string[]>) => {
            state.destinationList = action.payload;
        },
        setStatus: (state, action: PayloadAction<BookingStatus>) => {
            state.status = action.payload;
        },
    },
});

export const selectBookingId = (state: { booking: BookingState }) => state.booking.bookingId;
export const selectCustomerIdList = (state: { booking: BookingState }) => state.booking.customerIdList;
export const selectDriverId = (state: { booking: BookingState }) => state.booking.driverId;
export const selectPreScheduleTime = (state: { booking: BookingState }) => state.booking.preScheduleTime;
export const selectPrice = (state: { booking: BookingState }) => state.booking.price;
export const selectDiscountPrice = (state: { booking: BookingState }) => state.booking.discountPrice;
export const selectVoucherId = (state: { booking: BookingState }) => state.booking.voucherId;
export const selectDeparture = (state: { booking: BookingState }) => state.booking.departure;
export const selectDestinationList = (state: { booking: BookingState }) => state.booking.destinationList;
export const selectStatus = (state: { booking: BookingState }) => state.booking.status;

export const {
    // setBookingId,
    setCustomerIdList,
    setDriverId,
    // setPreScheduleTime,
    setPrice,
    setDiscountPrice,
    setVoucherId,
    setDeparture,
    setDestinationList,
    setStatus,
} = bookingSlice.actions;

export default bookingSlice.reducer;