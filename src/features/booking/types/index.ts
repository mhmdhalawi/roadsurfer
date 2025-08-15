export type Station = {
  id: string;
  name: string;
  bookings: Booking[];
};

export type Booking = {
  id: string;
  customerName: string;
  endDate: string;
  pickupReturnStationId: string;
  startDate: string;
};
