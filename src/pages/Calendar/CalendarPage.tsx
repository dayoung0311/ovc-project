import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";

const mockEvents = [
  {
    id: "1",
    title: "SQLD 제58회",
    date: "2026-04-20",
  },
  {
    id: "2",
    title: "토익 시험",
    date: "2026-04-25",
  },
];

function CalendarPage() {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={mockEvents}
                height="auto"
            />
        </div>
    )
}

export default CalendarPage