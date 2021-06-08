import { h, FunctionComponent } from 'preact';

import { useStore } from '@src/components/hooks/store';
import { cls } from '@src/util/cssHelper';
import { pick } from '@src/util/utils';
import { SeeMorePopupParam } from '@t/store';
import SeeMoreHeader from '@src/components/popup/seeMoreHeader';
import GridEvent from '@src/components/events/gridEvent';
import { EVENT_HEIGHT } from '@src/util/gridHelper';

const SeeMorePopup: FunctionComponent<SeeMorePopupParam> = (props) => {
  const { date, events = [] } = props;

  const { state } = useStore('theme');
  const style = pick(
    state.month.moreView,
    'backgroundColor',
    'border',
    'boxShadow',
    'paddingBottom'
  );
  // @TODO: 테마 적용
  const headerHeight = 56;
  const moreListStyle = {
    padding: '0 17px',
    height: `calc(100% - ${headerHeight}px)`,
  };
  const eventHeight = EVENT_HEIGHT;

  return (
    <div className={cls('see-more')} style={style}>
      <SeeMoreHeader date={date} />
      <div className={cls('month-more-list')} style={moreListStyle}>
        {events.map((viewModel) => (
          <GridEvent
            key={`see-more-event-item-${viewModel.cid()}`}
            viewModel={viewModel}
            eventHeight={eventHeight}
            headerHeight={headerHeight}
            flat={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SeeMorePopup;
