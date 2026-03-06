import type { Schedule } from "../types/exam";

export function mapSchedulesToEvents(schedules: Schedule[]) {
  return schedules.map((schedule) => ({
    id: String(schedule.scheduleId),
    title: schedule.examName,
    date: schedule.startDate.slice(0, 10),
  }));
}