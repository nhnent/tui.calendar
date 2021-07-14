import { FunctionComponent, h } from 'preact';

import { addTimeGridPrefix } from '@src/components/timegrid';
import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';

const classNames = {
  line: addTimeGridPrefix('current-time-line'),
  left: addTimeGridPrefix('current-time-line-left'),
  marker: addTimeGridPrefix('current-time-line-marker'),
  today: addTimeGridPrefix('current-time-line-today'),
  right: addTimeGridPrefix('current-time-line-right'),
};

interface Props {
  top: number;
  columnWidth: number;
  columnCount: number;
  columnIndex: number;
}

export const CurrentTimeLine: FunctionComponent<Props> = ({
  top,
  columnWidth,
  columnCount,
  columnIndex,
}) => {
  const leftLine = {
    left: toPercent(columnWidth * columnIndex),
    width: toPercent(columnWidth * columnIndex),
  };
  const rightLine = {
    left: toPercent(columnWidth * (columnIndex + 1)),
    width: toPercent(columnWidth * (columnCount - columnIndex + 1)),
  };
  const currentTimeLeftBorderTop = '1px dashed #515ce6';
  const currentTimeBulletBackgroundColor = '#515ce6';
  const currentTimeTodayBorderTop = '1px solid #515ce6';
  const currentTimeRightBorderTop = 'none';

  return (
    <div className={cls(classNames.line)} style={{ top: toPercent(top) }}>
      <div
        className={cls(classNames.left)}
        style={{ width: leftLine.width, borderTop: currentTimeLeftBorderTop }}
      />
      <div
        className={cls(classNames.marker)}
        style={{ left: leftLine.left, backgroundColor: currentTimeBulletBackgroundColor }}
      />
      <div
        className={cls(classNames.today)}
        style={{
          left: leftLine.left,
          width: toPercent(columnWidth),
          borderTop: currentTimeTodayBorderTop,
        }}
      />
      <div
        className={cls(classNames.right)}
        style={{
          left: rightLine.left,
          borderTop: currentTimeRightBorderTop,
        }}
      />
    </div>
  );
};
