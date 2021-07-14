import { Component, Fragment, h } from 'preact';
import { createPortal } from 'preact/compat';

import { addTimeGridPrefix } from '@src/components/timegrid';
import { CollapseButton } from '@src/components/timegrid/collapseButton';
import { TimeProps, Times } from '@src/components/timegrid/times';
import { TimezoneLabel } from '@src/components/timegrid/timezoneLabel';
import { TimezoneConfig } from '@src/model';
import TZDate from '@src/time/date';
import {
  addHours,
  addMinutes,
  clone,
  getDateDifference,
  getTimezoneDifference,
  isSameDate,
  toFormat,
  toStartOfDay,
} from '@src/time/datetime';
import { noop } from '@src/util';
import { cls } from '@src/util/cssHelper';
import { isNumber, range } from '@src/util/utils';

interface Props {
  currentTime: TZDate;
  width: string;
  timezones?: TimezoneConfig[];
  showTimezoneLabel?: boolean;
  stickyContainer?: HTMLElement | null;
  onChangeCollapsed?: (collapsed: boolean) => void;
}

function makeHours(now: TZDate, timezoneOffset?: number): TimeProps[] {
  return range(0, 25).map((hour) => {
    let date = addHours(now, hour);

    if (isNumber(timezoneOffset)) {
      date = addMinutes(date, getTimezoneDifference(date, timezoneOffset));
    }

    return {
      date,
      display: toFormat(date, 'HH:mm tt'),
    };
  });
}

export class MultipleTimezones extends Component<Props> {
  static displayName = 'MultipleTimezones';

  static defaultProps = {
    currentTime: new TZDate(),
    width: '72px',
  };

  state = {
    collapsed: false,
  };

  makeTimezones() {
    const { currentTime } = this.props;
    let { timezones = [] } = this.props;
    const startOfToday = toStartOfDay(currentTime);

    if (!timezones.length) {
      timezones = [{}];
    }

    return timezones.map((timezone, index) => {
      const { timezoneOffset } = timezone;
      const isPrimaryTimezone = index === 0;

      return {
        times: makeHours(startOfToday, timezoneOffset),
        currentTime: isPrimaryTimezone
          ? clone(currentTime)
          : addMinutes(currentTime, getTimezoneDifference(currentTime, timezoneOffset)),
        timezone,
      };
    });
  }

  onClickCollapseButton(value: boolean) {
    const { onChangeCollapsed = noop } = this.props;
    const collapsed = !value;

    onChangeCollapsed(collapsed);

    this.setState({ collapsed });
  }

  render() {
    const { collapsed } = this.state;
    const { showTimezoneLabel, width, stickyContainer } = this.props;

    const timezones = this.makeTimezones();
    const [primaryTimes, ...subTimes] = timezones.map((timezone) => timezone.times);
    const [primaryCurrentTime, ...subCurrentTimes] = timezones.map(
      (timezone) => timezone.currentTime
    );
    const reverseTimes = collapsed ? [] : subTimes.reverse();
    const reverseCurrentTimes = collapsed ? [] : subCurrentTimes.reverse();
    const now = new TZDate();
    const showCurrentTime = isSameDate(primaryCurrentTime, now);

    let timezoneLabels = null;
    if (showTimezoneLabel) {
      timezoneLabels = this.renderTimezoneLabels(
        timezones.map(({ timezone }) => timezone),
        width
      );
    }

    return (
      <Fragment>
        {reverseTimes.map((times, index) => (
          <Times
            key={index}
            width={width}
            times={times}
            showCurrentTime={showCurrentTime}
            currentTime={reverseCurrentTimes[index]}
            dateDifference={getDateDifference(reverseCurrentTimes[index], primaryCurrentTime)}
            timeTemplate="timegridDisplayTime"
          />
        ))}
        <Times
          width={width}
          times={primaryTimes}
          showCurrentTime={showCurrentTime}
          currentTime={primaryCurrentTime}
          timeTemplate="timegridDisplayPrimaryTime"
        />

        {stickyContainer && timezoneLabels
          ? createPortal(timezoneLabels, stickyContainer)
          : timezoneLabels}
      </Fragment>
    );
  }

  renderTimezoneLabels(timezones: TimezoneConfig[], width: string) {
    const [primaryTimezone, ...subTimezones] = timezones;
    const reverseTimezones = subTimezones.reverse();
    if (!reverseTimezones.length) {
      return null;
    }

    return (
      <div className={cls(addTimeGridPrefix('sticky'))}>
        {!this.state.collapsed
          ? reverseTimezones.map((timezone, index) => (
              <TimezoneLabel key={index} timezone={timezone} width={width} />
            ))
          : null}
        <TimezoneLabel
          timezone={primaryTimezone}
          width={width}
          renderCollapseButton={() => this.renderCollapseButton()}
        />
      </div>
    );
  }

  renderCollapseButton() {
    const { collapsed } = this.state;

    return (
      <CollapseButton
        onClick={(value: boolean) => this.onClickCollapseButton(value)}
        collapsed={collapsed}
      />
    );
  }
}
