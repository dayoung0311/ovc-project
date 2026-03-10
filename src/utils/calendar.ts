import type { Schedule } from "../types/exam";
import type { CalendarEventType } from "../types/exam";

export function mapSchedulesToEvents(
  schedules: Schedule[]
): CalendarEventType[] {
  return schedules.map((schedule) => ({
    id: String(schedule.scheduleId),

    title: `${schedule.certificateName} ${schedule.eventType}`,

    start: schedule.startDate,
    end: schedule.endDate,

    extendedProps: {
      scheduleId: schedule.scheduleId,
      certificateName: schedule.certificateName,
      examType: schedule.examType,
      eventType: schedule.eventType,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
    },
  }));
}