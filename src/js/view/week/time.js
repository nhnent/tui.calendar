/**
 * @fileoverview View of time.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var View = require('../view');
var timeTmpl = require('../template/week/time.hbs');

var forEachArr = util.forEachArray;
var SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * @constructor
 * @extends {View}
 * @param {object} options Options
 * @param {number} options.index Date index in week view.
 * @param {number} options.width Date element width (percent)
 * @param {string} options.ymd YYYMMDD string for this view
 * @param {boolean} options.isToday when set true then assign today design class to container.
 * @param {number} options.hourStart Can limit of render hour start.
 * @param {number} options.hourEnd Can limit of render hour end.
 * @param {HTMLElement} container Element to use container for this view.
 * @param {Theme} theme - theme instance
 * @param {duplicateScheduleLayout} duplicateScheduleLayout - use duplicate schedule layout
 */
function Time(options, container, theme, duplicateScheduleLayout) {
    View.call(this, container);

    this.options = util.extend({
        index: 0,
        width: 0,
        ymd: '',
        isToday: false,
        pending: false,
        hourStart: 0,
        hourEnd: 24,
        defaultMarginBottom: 2,
        minHeight: 18.5,
        isReadOnly: false
    }, options);

    this.timeTmpl = timeTmpl;

    /**
     * @type {Theme}
     */
    this.theme = theme;

    /**
     * @type {duplicateScheduleLayout}
     */
    this.duplicateScheduleLayout = duplicateScheduleLayout;

    container.style.width = options.width + '%';
    container.style.left = options.left + '%';

    if (this.options.isToday) {
        domutil.addClass(this.container, config.classname('today'));
    }

    this.applyTheme();
}

util.inherit(Time, View);

/**
 * Convert YYYYMMDD formatted string date to Date.
 * @param {string} str formatted string.
 * @returns {Date} start of date.
 */
Time.prototype._parseDateGroup = function(str) {
    var y = parseInt(str.substr(0, 4), 10),
        m = parseInt(str.substr(4, 2), 10),
        d = parseInt(str.substr(6, 2), 10);
    var date = datetime.start();

    date.setFullYear(y, m - 1, d);

    return datetime.start(date);
};

/**
 * calculate left and width
 * @param {ScheduleViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating schedule element's bound.
 * @returns {object} - left and width
 */
Time.prototype._getScheduleViewBoundX = function(viewModel, options) {
    var width = options.baseWidth * (viewModel.extraSpace + 1);

    // set width auto when has no collisions.
    if (!viewModel.hasCollide) {
        width = null;
    }

    return {
        left: options.baseLeft[options.columnIndex],
        width: width
    };
};

/**
 * calculate top, height, croppedStart and croppedEnd
 * @param {ScheduleViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating schedule element's bound.
 * @returns {object} - left and width
 */
Time.prototype._getScheduleViewBoundY = function(viewModel, options) {
    var baseMS = options.baseMS;
    var baseHeight = options.baseHeight;
    var croppedStart = false;
    var croppedEnd = false;
    var goingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().goingDuration);
    var comingDuration = datetime.millisecondsFrom('minutes', viewModel.valueOf().comingDuration);
    var offsetStart = viewModel.valueOf().start - goingDuration - options.todayStart;
    // containerHeight : milliseconds in day = x : schedule's milliseconds
    var top = (baseHeight * offsetStart) / baseMS;
    var modelDuration = viewModel.duration();
    var height;
    var duration;
    var goingDurationHeight;
    var modelDurationHeight;
    var comingDurationHeight;

    modelDuration = modelDuration > SCHEDULE_MIN_DURATION ? modelDuration : SCHEDULE_MIN_DURATION;
    duration = modelDuration + goingDuration + comingDuration;
    height = (baseHeight * duration) / baseMS;

    goingDurationHeight = (baseHeight * goingDuration) / baseMS; // common.ratio(duration, goingDuration, 100);
    modelDurationHeight = (baseHeight * modelDuration) / baseMS; // common.ratio(duration, modelDuration, 100);
    comingDurationHeight = (baseHeight * comingDuration) / baseMS; // common.ratio(duration, comingDuration, 100);

    if (offsetStart < 0) {
        top = 0;
        height += ((baseHeight * offsetStart) / baseMS);
        croppedStart = true;
    }

    if (height + top > baseHeight) {
        height = baseHeight - top;
        croppedEnd = true;
    }

    return {
        top: top,
        height: Math.max(height, this.options.minHeight) - this.options.defaultMarginBottom,
        modelDurationHeight: modelDurationHeight,
        goingDurationHeight: goingDurationHeight,
        comingDurationHeight: comingDurationHeight,
        hasGoingDuration: goingDuration > 0,
        hasComingDuration: comingDuration > 0,
        croppedStart: croppedStart,
        croppedEnd: croppedEnd
    };
};

/**
 * @param {ScheduleViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating schedule element's bound.
 * @param {Date} options.todayStart - date object represent schedule date's start (00:00:00)
 * @param {number} options.baseMS - the number of milliseconds to render schedule blocks.
 * @param {number} options.baseHeight - pixel value related with baseMS options.
 * @param {number[]} options.baseLeft - left position percents for each columns.
 * @param {number} options.baseWidth - the unit of schedule blocks width percent.
 * @param {number} options.columnIndex - the number index of schedule blocks.
 * it represent rendering index from left sides in view.
 * @returns {object} bound object for supplied view model.
 */
Time.prototype.getScheduleViewBound = function(viewModel, options) {
    var boundX = this._getScheduleViewBoundX(viewModel, options);
    var boundY = this._getScheduleViewBoundY(viewModel, options);
    var schedule = viewModel.model;
    var isReadOnly = util.pick(schedule, 'isReadOnly') || false;
    var travelBorderColor = schedule.isFocused ? '#ffffff' : schedule.borderColor;
    if (travelBorderColor === schedule.bgColor) {
        travelBorderColor = null; // follow text color
    }

    return util.extend({
        isReadOnly: isReadOnly,
        travelBorderColor: travelBorderColor
    }, boundX, boundY);
};

/**
 * Set viewmodels for rendering.
 * @param {string} ymd The date of schedules. YYYYMMDD format.
 * @param {array} matrices The matrices for schedule placing.
 * @param {number} containerHeight - container's height
 */
Time.prototype._getBaseViewModel = function(ymd, matrices, containerHeight) {
    var self = this,
        options = this.options,
        hourStart = options.hourStart,
        hourEnd = options.hourEnd,
        isReadOnly = options.isReadOnly,
        todayStart,
        baseMS;

    /**
     * Calculate each schedule element bounds relative with rendered hour milliseconds and
     * wrap each schedule model to viewmodels.
     */
    containerHeight = containerHeight || this.getViewBound().height;
    todayStart = this._parseDateGroup(ymd);
    todayStart.setHours(hourStart);
    baseMS = datetime.millisecondsFrom('hour', (hourEnd - hourStart));

    forEachArr(matrices, function(matrix) {
        var maxRowLength,
            widthPercent,
            leftPercents,
            i;

        maxRowLength = Math.max.apply(null, util.map(matrix, function(row) {
            return row.length;
        }));

        widthPercent = 100 / maxRowLength;

        leftPercents = [];
        for (i = 0; i < maxRowLength; i += 1) {
            leftPercents[i] = widthPercent * i;
        }

        forEachArr(matrix, function(row) {
            forEachArr(row, function(viewModel, col) {
                var viewBound;

                if (!viewModel) {
                    return;
                }

                viewBound = self.getScheduleViewBound(viewModel, {
                    todayStart: todayStart,
                    baseMS: baseMS,
                    baseLeft: leftPercents,
                    baseWidth: widthPercent,
                    baseHeight: containerHeight,
                    columnIndex: col,
                    isReadOnly: isReadOnly
                });

                util.extend(viewModel, viewBound);

                self._setDuplicateSchedulesWithCustomlayout(
                    viewModel,
                    viewModel.left,
                    viewModel.width ? viewModel.width : widthPercent,
                    row,
                    {
                        todayStart: todayStart,
                        baseMS: baseMS,
                        baseHeight: containerHeight
                    }
                );
            });
        });
    });
};

/**
 * Set duplicate schedules with using custom layout.
 * @param {ViewModel} viewModel - The Schedule View Model Instance
 * @param {number} initLeft - The left value of major schedule viewmodel (percent value)
 * @param {number} initWidth - The width value of major schedule viewmodel (percent value)
 * @param {array<ScheduleViewModel>} matirixRow - The shedule view models in the current matrix row
 * @param {object} options - The options for bounding Y
 */
Time.prototype._setDuplicateSchedulesWithCustomlayout = function(viewModel, initLeft, initWidth, matirixRow, options) {
    var self = this,
        customDuplicateScheduleLayoutHandler = util.pick(self.duplicateScheduleLayout, 'layoutHandler') || false,
        subModels = viewModel.subModels,
        todayStart,
        baseMS,
        baseHeight,
        layoutInfos,
        viewModelBound,
        subModelBounds;

    if (!subModels ||
        !customDuplicateScheduleLayoutHandler ||
        typeof customDuplicateScheduleLayoutHandler !== 'function') {
        return;
    }

    layoutInfos = customDuplicateScheduleLayoutHandler(initLeft, initWidth, subModels);
    viewModelBound = layoutInfos.mainScheduleBound;
    subModelBounds = layoutInfos.subScheduleBounds;
    todayStart = options.todayStart;
    baseMS = options.baseMS;
    baseHeight = options.baseHeight;

    util.extend(viewModel, viewModelBound);

    forEachArr(subModelBounds, function(boundX, subIdx) {
        var subModel = subModels[subIdx],
            boundY = self._getScheduleViewBoundY(subModel, {
                todayStart: todayStart,
                baseMS: baseMS,
                baseHeight: baseHeight
            });

        util.extend(subModel, boundX, boundY);

        matirixRow.push(subModel);
    });
};

/**
 * @returns {Date} - Date of this view.
 */
Time.prototype.getDate = function() {
    return this._parseDateGroup(this.options.ymd);
};

/**
 * @override
 * @param {string} ymd The date of schedules. YYYYMMDD format
 * @param {array} matrices Matrices for placing schedules
 * @param {number} containerHeight - container's height
 */
Time.prototype.render = function(ymd, matrices, containerHeight) {
    this._getBaseViewModel(ymd, matrices, containerHeight);
    this.container.innerHTML = this.timeTmpl({
        matrices: matrices,
        styles: this._getStyles(this.theme)
    });
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
Time.prototype._getStyles = function(theme) {
    var styles = {};
    var options = this.options;

    if (theme) {
        styles.borderRight = theme.week.timegrid.borderRight || theme.common.border;
        styles.marginRight = theme.week.timegrid.paddingRight;
        styles.borderRadius = theme.week.timegridSchedule.borderRadius;
        styles.paddingLeft = theme.week.timegridSchedule.paddingLeft;
        styles.backgroundColor = options.isToday ? theme.week.today.backgroundColor : 'inherit';
    }

    return styles;
};

Time.prototype.applyTheme = function() {
    var style = this.container.style;
    var styles = this._getStyles(this.theme);

    style.borderRight = styles.borderRight;
    style.backgroundColor = styles.backgroundColor;
};

module.exports = Time;
