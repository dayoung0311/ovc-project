import type { Schedule } from "../types/exam";
import { apiClient } from "./apiClient";

export async function getSchedules(year: number, month: number): Promise<Schedule[]> {
  const res = await apiClient.get('/calendar',{
    params: {
      year: year,
      month: month
    }
  });

  return res.data.data;
}