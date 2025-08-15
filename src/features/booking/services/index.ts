import api from "@/lib/axios";
import type { Booking, BookingDetailsRequest, Station } from "../types";

async function fetchStations(search?: string): Promise<Station[]> {
  try {
    const response = await api.get("/stations", {
      params: {
        search,
      },
    });
    return response.data.slice(0, 6);
  } catch (error) {
    throw new Error("Failed to fetch stations");
  }
}

async function fetchStationById(stationId: string): Promise<Station> {
  try {
    const response = await api.get(`/stations/${stationId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch station");
  }
}

async function fetchBookingById(request: BookingDetailsRequest): Promise<Booking> {
  try {
    const response = await api.get(`/stations/${request.stationId}/bookings/${request.bookingId}`);
    console.log("Booking fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch booking");
  }
}

export { fetchStations, fetchStationById, fetchBookingById };
