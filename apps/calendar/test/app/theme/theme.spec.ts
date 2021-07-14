import pick from 'tui-code-snippet/object/pick';

import Theme from '@src/theme';
import preset from '@src/theme/preset';
import { ThemeKeyValue, ThemePropKeys } from '@src/theme/themeProps';

const doorayTheme: ThemeKeyValue = {
  'common.border': '1px solid #ddd',
  'common.backgroundColor': 'white',
  'common.holiday.color': '#f4436',
  'common.saturday.color': '#333',
  'common.dayname.color': '#333',
  'common.today.color': '#135de6',
  'common.creationGuide.backgroundColor': 'rgba(19, 93, 230, 0.1)',
  'common.creationGuide.border': '1px solid #135de6',
  'month.dayname.borderLeft': '1px solid #ddd',
  'month.dayname.backgroundColor': 'inherit',
  'month.holidayExceptThisMonth.color': '#f3acac',
  'month.dayExceptThisMonth.color': '#bbb',
  'month.weekend.backgroundColor': '#fafafa',
  'week.dayname.borderTop': '1px solid #ddd',
  'week.dayname.borderBottom': '1px solid #ddd',
  'week.dayname.borderLeft': '1px solid #ddd',
  'week.dayname.backgroundColor': 'inherit',
  'week.today.color': '#135de6',
  'week.panelResizer.border': '1px solid #ddd',
  'week.daygrid.borderRight': '1px solid #ddd',
  'week.daygridLeft.backgroundColor': '#fafafa',
  'week.today.backgroundColor': 'inherit',
  'week.weekend.backgroundColor': 'inherit',
  'week.timegridLeft.backgroundColor': '#fafafa',
  'week.timegridLeft.borderRight': '1px solid #ddd',
  'week.timegridHalfHour.borderBottom': '1px dotted #f9f9f9',
  'week.timegridHorizontalLine.borderBottom': '1px solid #eee',
  'week.timegrid.borderRight': '1px solid #ddd',
  'week.currentTime.color': '#515ce6',
  'week.currentTimeLinePast.border': '1px solid rgba(19, 93, 230, 0.3)',
  'week.currentTimeLineBullet.backgroundColor': '#135de6',
  'week.currentTimeLineToday.border': '1px solid #135de6',
  'week.currentTimeLineFuture.border': '1px solid #135de6',
  'week.creationGuide.color': '#135de6',
};

describe('Theme', () => {
  let theme: Theme;

  beforeEach(() => {
    theme = new Theme();
  });

  it('get a style by key', () => {
    const value = theme.getStyle('common.border');

    expect(value).toBe('1px solid #e5e5e5');
  });

  it('set a style by key', () => {
    const key = 'common.border';
    const value = '2px dashed #ddd';

    theme.setStyle(key, value);

    expect(theme.getStyle(key)).toBe(value);
  });

  it('set multiple styles with key, value map', () => {
    const map = {
      'common.border': '2px dashed #ddd',
      'week.today.color': '#555',
    };
    const result = theme.setStyles(map);

    expect(theme.getStyle('common.border')).toBe('2px dashed #ddd');
    expect(theme.getStyle('week.today.color')).toBe('#555');
    expect(result).toHaveLength(0);
  });

  it('no return a style with wrong key parameter', () => {
    const key = 'wrong.key';
    const value = theme.getStyle(key as ThemePropKeys);

    expect(value).toBe('');
  });

  it('no value through property path', () => {
    expect(pick(theme, 'wrong', 'border')).toBeUndefined();
  });

  it('return true to set a style by right key', () => {
    const key = 'common.border';
    const value = '2px dashed #ddd';
    const result = theme.setStyle(key, value);

    expect(result).toBe(true);
  });

  it('return false to set a style by wrong key', () => {
    const key = 'wrong.border';
    const value = '2px dashed #ddd';
    const result = theme.setStyle(key as ThemePropKeys, value);

    expect(result).toBe(false);
  });

  it('return wrong keys array when setting multiple styles including wrong key', () => {
    const styles = {
      'wrong.border': '2px dashed #ddd',
      'common.border': '2px dashed #ddd',
    };
    const result = theme.setStyles(styles);

    expect(result).toEqual(['wrong.border']);
  });

  it('can check all predefined key of the standard theme', () => {
    const keys = Object.keys(preset) as ThemePropKeys[];

    keys.forEach(function (key) {
      expect(theme.getStyle(key)).not.toBe('');
    });
  });

  it('can check  all predefined key of the given custom theme', () => {
    const customTheme = doorayTheme;
    const keys = Object.keys(customTheme) as ThemePropKeys[];

    theme = new Theme(customTheme);

    keys.forEach(function (key) {
      expect(theme.getStyle(key)).not.toBe('');
    });
  });

  it('can clear all styles and set another styles', () => {
    const customTheme = doorayTheme;
    let keys = Object.keys(preset) as ThemePropKeys[];
    theme.clear();

    keys.forEach(function (key) {
      expect(theme.getStyle(key)).toBe('');
    });

    theme.setStyles(customTheme);

    keys = Object.keys(customTheme) as ThemePropKeys[];
    keys.forEach(function (key) {
      expect(theme.getStyle(key)).not.toBe('');
    });
  });
});
