export type Station = {
  id: string;
  name: string;
  bookings: Booking[];
};

export type Booking = {
  id: string;
  customerName: string;
  startDate: string;
  endDate: string;
  pickupReturnStationId: string;
};

export type BookingDetailsRequest = {
  stationId: string;
  bookingId: string;
};
