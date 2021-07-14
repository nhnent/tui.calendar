import { FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { useTheme } from '@src/components/hooks/theme';
import Template from '@src/components/template';
import { addTimeGridPrefix, timeFormats } from '@src/components/timegrid';
import { TimeUnit } from '@src/model';
import TZDate from '@src/time/date';
import { cls } from '@src/util/cssHelper';
import { getSize } from '@src/util/dom';
import { toPercent } from '@src/util/units';

const classNames = {
  currentTime: addTimeGridPrefix('current-time'),
};

interface Props {
  unit: TimeUnit;
  top: number;
  time?: TZDate;
  dateDifference?: number;
}

export const CurrentTimeLabel: FunctionComponent<Props> = ({
  unit,
  dateDifference = 0,
  top,
  time = new TZDate(),
}) => {
  const { week } = useTheme();
  const defaultTop = toPercent(top);
  const [topValue, setTop] = useState(defaultTop);
  const ref = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);

  const adjustTopForCentering = () => {
    if (ref.current) {
      const { height } = getSize(ref.current);
      let half = Math.ceil(height / 2);

      if (signRef.current) {
        const { height: signHeight } = getSize(signRef.current);
        half += signHeight;
      }

      setTop(`calc(${defaultTop} - ${half}px)`);
    }
  };

  useEffect(adjustTopForCentering, [defaultTop]);

  const model = {
    unit,
    time,
    format: timeFormats[unit],
  };

  const style = {
    top: topValue,
    color: week.currentTime.color,
  };

  return (
    <div className={cls(classNames.currentTime)} style={style}>
      {dateDifference ? <div ref={signRef}>{`[${dateDifference}]`}</div> : null}
      <div ref={ref}>
        <Template template="timegridCurrentTime" model={model} />
      </div>
    </div>
  );
};
