type CommonTheme = {
  backgroundColor: string;
  border: string;
  creationGuide: {
    backgroundColor: string;
    border: string;
  };
  dayname: { color: string };
  holiday: { color: string };
  saturday: { color: string };
  today: { color: string };
};

type ScheduleTheme = {
  borderRadius: string;
  height: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
};

type DayNameTheme = {
  borderLeft: string;
  backgroundColor: string;
};

type WeekTheme = {
  dayname: DayNameTheme;
  dayGridSchedule: ScheduleTheme;
  currentTime: { color: string };
  pastTime: { color: string };
  futureTime: { color: string };
};

type MonthTheme = {
  dayExceptThisMonth: { color: string };
  dayname: DayNameTheme;
  holidayExceptThisMonth: { color: string };
  moreView: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
  };
  moreViewTitle: {
    backgroundColor: string;
  };
  weekend: { backgroundColor: string };
};
