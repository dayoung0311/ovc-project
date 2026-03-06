import type { Schedule } from "../types/exam";

type OkResponse<T> = {
  success: boolean;
  data: T;
  path: string;
};

const BASE_URL = "http://localhost:8080";

export async function getSchedules(year: number, month: number): Promise<Schedule[]> {
  const res = await fetch(`${BASE_URL}/api/calendar?year=${year}&month=${month}`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("에러 응답:", errorText);
    throw new Error("일정 데이터를 불러오지 못했습니다.");
  }

  const result: OkResponse<Schedule[]> = await res.json();
  return result.data;
}