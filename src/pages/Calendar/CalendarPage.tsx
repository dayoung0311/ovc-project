import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import type { Schedule } from "../../types/exam";
import { getSchedules } from "../../api/schedule";
import { mapSchedulesToEvents } from "../../utils/calendar";
import './calendar.css'

function CalendarPage() {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSchedules() {
            try {
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth() + 1;
                const data = await getSchedules(year, month);
                setSchedules(data);
            } catch (err) {
                console.error("일정 불러오기 에러:", err);
                setError("일정 데이터를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        }
        fetchSchedules();
    }, []);

    const events = mapSchedulesToEvents(schedules);

    console.log("schedules:", schedules);
    console.log("events:", events);

    if (loading) return <div>로딩중...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="flex">
            {/* 좌측 - 캘린더  */}
            <div className="flex-1 p-[40px]">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="auto"
                    headerToolbar={{
                        left: "",
                        center: "prev title next",
                        right: "today"
                    }}
                />
            </div>
            {/* 우측 - 자격증 상세정보 */}
            <div className="w-[400px] h-screen bg-green-100">
                <p>상세정보를 표시하는 영역입니다.</p>
            </div>
        </div>
    )
}

export default CalendarPage