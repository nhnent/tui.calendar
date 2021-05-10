import { h, FunctionComponent } from 'preact';
import { cls } from '@src/util/cssHelper';
import React from 'preact/compat';
import { getGridLeftAndWidth, isWeekend } from '@src/time/datetime';
import { toPercent, toPx } from '@src/util/units';
import { getDayName } from '@src/util/dayName';
import { CalendarMonthOption } from '@t/store';
import { isNumber } from '@src/util/utils';

interface DayNameProps {
  dayname: string;
  dayIndex: number;
  style: Pick<
    DayNameTheme,
    'fontSize' | 'fontWeight' | 'textAlign' | 'paddingLeft' | 'paddingRight'
  > & {
    lineHeight: string;
    width: number | string;
    left: number | string;
  };
}

export type DayNameItem = {
  name: string;
  dayIndex: number;
};

export interface DayNamesProps {
  dayNames: DayNameItem[];
  theme?: DayNameTheme;
  options?: CalendarMonthOption;
}

const defaultDayNameTheme = {
  height: 31,
  borderLeft: 'none',
  paddingLeft: 10,
  paddingRight: 0,
  backgroundColor: 'inherit',
  fontSize: 12,
  fontWeight: 'normal',
  textAlign: 'left',
};

const defaultDayNameOption = {
  narrowWeekend: false,
  startDayOfWeek: 0,
  workweek: false,
};

const DayName: FunctionComponent<DayNameProps> = (props) => {
  const { dayname, dayIndex, style } = props;

  return (
    <div className={cls('dayname-item')} style={style}>
      <span className={isWeekend(dayIndex) ? cls(`holiday-${getDayName(dayIndex)}`) : ''}>
        {dayname}
      </span>
    </div>
  );
};

const MonthDayNames: FunctionComponent<DayNamesProps> = (props) => {
  const { dayNames = [], theme = defaultDayNameTheme, options = defaultDayNameOption } = props;
  const { narrowWeekend, startDayOfWeek, workweek } = options;

  const {
    height,
    borderLeft,
    paddingLeft,
    paddingRight,
    backgroundColor,
    fontSize,
    fontWeight,
    textAlign,
  } = theme;

  const style = {
    height,
    borderLeft,
    backgroundColor,
  };

  const dayNameStyle = {
    fontSize,
    fontWeight,
    textAlign,
    paddingLeft,
    paddingRight,
    lineHeight: isNumber(height) ? toPx(height) : height,
  };

  const grids = getGridLeftAndWidth(dayNames.length, narrowWeekend, startDayOfWeek, workweek);

  return (
    <div className={cls('month-dayname')} style={style}>
      {dayNames.map(({ name, dayIndex }, index) => (
        <DayName
          dayname={name}
          dayIndex={dayIndex}
          key={dayIndex}
          style={{
            ...dayNameStyle,
            width: toPercent(grids[index].width),
            left: toPercent(grids[index].left),
          }}
        />
      ))}
    </div>
  );
};

export default MonthDayNames;
