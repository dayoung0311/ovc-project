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
  id: number;
  cert_id: number;
  exam_name: string;
  exam_type: string;
  apply_start_at: string;
  apply_end_at: string;
  exam_at: string;
  result_at: string;
  created_at: string;
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
    resultAt: string;
  };
};