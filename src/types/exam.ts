export type Certificate = {
  id: number;
  name: string;
  agency: string;
  exam_trend: string | null;
  acq_method: string | null;
  precautions: string | null;
  category_id: number;
  created_at: string;
};

export type Schedule = {
  scheduleId: number;
  certificateName: string;
  examName: string;
  examType: string; //실기, 필기
  eventType: string; //지원일, 시험일, 결과일
  startDate: string;
  endDate: string;
};

export type CalendarEventType = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean; 
  extendedProps: {
    scheduleId: number;
    certificateName: string;
    examType: string;
    eventType: string;
    startDate: string;
    endDate: string;
  };
};