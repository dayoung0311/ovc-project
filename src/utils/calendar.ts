// DB 데이터 배열을 FullCalendar 이벤트 배열로 바꾸는 함수에 대한 파일
import type { Schedule, CalendarEventType } from "../types/exam";

export function mapSchedulesToEvents(
  schedules: Schedule[]
): CalendarEventType[] {
  return schedules.map((schedule) => ({
    id: String(schedule.id),
    title: schedule.exam_name,
    date: schedule.exam_at,
    extendedProps: {
      scheduleId: schedule.id,
      certId: schedule.cert_id,
      examType: schedule.exam_type,
      applyStartAt: schedule.apply_start_at,
      applyEndAt: schedule.apply_end_at,
      resultAt: schedule.result_at,
    },
  }));
}