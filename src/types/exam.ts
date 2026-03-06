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
  certificateName: number;
  examName: string;
  examType: string; //실기, 필기
  eventType: string; //지원일, 시험일, 결과일
  startDate: string;
  endDate: string;
};

export type CalendarEventType = {
  id: string;
  title: string;
  date: string;
  extendedProps: {
    scheduleId: number;
    certId: number;
    examType: string;
    applyStartAt: string;
    applyEndAt: string;
    // resultAt: string;
  };
};