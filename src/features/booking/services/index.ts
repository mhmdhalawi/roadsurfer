import api from "@/lib/axios";
import type { Station } from "../types";

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

async function fetchStationById(id: string): Promise<Station> {
  try {
    const response = await api.get(`/stations/${id}`);
    console.log("Station fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch station");
  }
}

export { fetchStations, fetchStationById };
