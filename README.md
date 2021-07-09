# ![TOAST UI Calendar](https://user-images.githubusercontent.com/26706716/39230183-7f8ff186-48a0-11e8-8d9c-9699d2d0e471.png)

> A JavaScript schedule calendar that is full featured. Now your service just got the customizable calendar.

[![GitHub release](https://img.shields.io/github/release/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/releases/latest)
[![npm](https://img.shields.io/npm/v/tui-calendar.svg)](https://www.npmjs.com/package/tui-calendar)
[![GitHub license](https://img.shields.io/github/license/nhn/tui.calendar.svg)](https://github.com/nhn/tui.calendar/blob/master/LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/nhn/tui.project-name/labels/help%20wanted)
[![code with hearth by NHN](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-NHN-ff1414.svg)](https://github.com/nhn)

![tui-calendar-demo-nhn-corp](https://user-images.githubusercontent.com/43128697/55609612-0c19db00-57bc-11e9-849b-f42a9bd8c591.gif)

## 🚩 Table of Contents

* [Collect statistics on the use of open source](#Collect-statistics-on-the-use-of-open-source)
* [Documents](#-documents)
* [How Cool: Monthly, Weekly, Daily and Various View Types.](#how-cool-monthly-weekly-daily-and-various-view-types)
* [Easy to Use: Dragging and Resizing a Schedule](#easy-to-use-dragging-and-resizing-a-schedule)
* [Ready to Use: Default Popups](#ready-to-use-default-popups)
* [Features](#-features)
* [Examples](#-examples)
* [Install](#-install)
* [Wrappers](#-wrappers)
* [Usage](#-usage)
* [Browser Support](#-browser-support)
* [Pull Request Steps](#-pull-request-steps)
* [Contributing](#-contributing)
* [Dependency](#-dependency)
* [TOAST UI Family](#-toast-ui-family)
* [Used By](#-used-by)
* [License](#-license)

## Collect statistics on the use of open source

TOAST UI Calendar applies Google Analytics (GA) to collect statistics on the use of open source, in order to identify how widely TOAST UI Calendar is used throughout the world. It also serves as important index to determine the future course of projects. location.hostname (e.g. > “ui.toast.com") is to be collected and the sole purpose is nothing but to measure statistics on the usage.

To disable GA use the [options](https://nhn.github.io/tui.calendar/latest/global.html#Options):

```js
var calendar = new Calendar('#calendar', {
  usageStatistics: false
});
```

## 📙 Documents

* [Getting Started](https://github.com/nhn/tui.calendar/blob/master/docs/getting-started.md)
* [Tutorials](https://github.com/nhn/tui.calendar/tree/master/docs)
* [APIs](https://nhn.github.io/tui.calendar/latest/Calendar)

You can also see the older versions of API page on the [releases page](https://github.com/nhn/tui.calendar/releases).

## ✨ How Cool: Monthly, Weekly, Daily and Various View Types.

| Monthly | Weekly |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230396-4d79a592-48a1-11e8-9849-08e80f1bedf6.png) | ![image](https://user-images.githubusercontent.com/26706716/39230459-83beac38-48a1-11e8-8cd4-11b97817f1f8.png) |

| Daily | 2 Weeks |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230685-60a2a1d6-48a2-11e8-9d46-ce5693277a64.png) | ![image](https://user-images.githubusercontent.com/26706716/39230638-281d5266-48a2-11e8-84d8-ab289f372051.png) |

## Easy to Use: Dragging and Resizing a Schedule

| Dragging | Resizing |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230930-591031f8-48a3-11e8-8f62-e12e6c19920c.gif) | ![image](https://user-images.githubusercontent.com/26706716/39231671-c926d0da-48a5-11e8-959d-35fd32f2c522.gif) |


## Ready to Use: Default Popups

| Creation Popup | Detail Popup |
| --- | --- |
| ![image](https://user-images.githubusercontent.com/26706716/39230798-d151a9ae-48a2-11e8-842d-b19b40432f48.png) | ![image](https://user-images.githubusercontent.com/26706716/39230820-e73fa11c-48a2-11e8-9348-8e3d81979a78.png) |

## 🎨 Features

* Supports various view types: daily, weekly, monthly(6 weeks, 2 weeks, 3 weeks)
* Supports efficient management of milestone and task schedules
* Supports the narrow width of weekend
* Supports changing start day of week
* Supports customizing the date and schedule information UI(including a header and a footer of grid cell)
* Supports adjusting a schedule by mouse dragging
* Supports customizing UI by theme

## 🐾 Examples

* [Basic](https://nhn.github.io/tui.calendar/latest/tutorial-example00-basic) : Example of using default options.

## 💾 Install

TOAST UI products can be used by using the package manager or downloading the source directly.
However, we highly recommend using the package manager.

### Via Package Manager

TOAST UI products are registered in two package managers, [npm](https://www.npmjs.com/) and [bower](https://bower.io/).
You can conveniently install it using the commands provided by each package manager.
When using npm, be sure to use it in the environment [Node.js](https://nodejs.org) is installed.

#### npm

``` sh
$ npm install --save tui-calendar # Latest version
$ npm install --save tui-calendar@<version> # Specific version
```

#### bower

``` sh
$ bower install tui-calendar # Latest version
$ bower install tui-calendar#<tag> # Specific version
```

### Via Contents Delivery Network (CDN)
TOAST UI products are available over the CDN powered by [TOAST Cloud](https://www.toast.com).

You can use the CDN as below.

Insert style sheet files
```html
<link rel="stylesheet" type="text/css" href="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.css" />

<!-- If you use the default popups, use this. -->
<link rel="stylesheet" type="text/css" href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css" />
<link rel="stylesheet" type="text/css" href="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css" />
```

Insert JavaScript file
```html
<script src="https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js"></script>
<script src="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js"></script>
<script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js"></script>
<script src="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js"></script>
```

If you want to use a specific version, use the tag name instead of `latest` in the url's path.

The CDN directory has the following structure.

```
tui-calendar/
├─ latest/
│  ├─ tui-calendar.js
│  └─ tui-calendar.min.js
│  └─ tui-calendar.css
│  └─ tui-calendar.min.css
├─ v1.0.0/
│  ├─ ...
```

### Download Source Files

* [Download bundle files](https://github.com/nhn/tui.calendar/tree/master/dist)
* [Download all sources for each version](https://github.com/nhn/tui.calendar/releases)

## 🛍 Wrappers

* [toast-ui.vue-calendar](https://github.com/nhn/toast-ui.vue-calendar) **Vue** wrapper component is implemented by [NHN](https://github.com/nhn).
* [toast-ui.react-calendar](https://github.com/nhn/toast-ui.react-calendar) **React** wrapper component is powered by [NHN](https://github.com/nhn).
* [ngx-tui-dev](https://github.com/brnrds/ngx-tui-dev): **TypeScript** and **Angular 5** wrapper component is being implemented(ref [#82](https://github.com/nhn/tui.calendar/issues/82)) by [@amanvishnani](https://github.com/amanvishnani) and [@brnrds](https://github.com/brnrds). Thanks for their effort.
* [vue-tui-calendar](https://github.com/lkmadushan/vue-tuicalendar): **Vue** wrapper component is being implemented(ref [#81](https://github.com/nhn/tui.calendar/issues/81)) by [@lkmadushan](https://github.com/lkmadushan). Thanks for their effort.
* [tui-calendar-react](https://github.com/IniZio/react-tui-calendar): **React** wrapper component is provided(ref #[134](https://github.com/nhn/tui.calendar/issues/134)) by [@IniZio](https://github.com/IniZio). Thanks for his effort.
* [toast_ui.blazor_calendar](https://github.com/gismofx/toast_ui.blazor_calendar): **C#/Blazor** JSInterop wrapper component is provided(ref #[781](https://github.com/nhn/tui.calendar/issues/781)) by [@gismofx](https://github.com/gismofx) Thanks for his effort.

## 🔨 Usage

### HTML

Place a `<div></div>` where you want TOAST UI Calendar rendered.

```html
<body>
...
<div id="calendar" style="height: 800px;"></div>
...
</body>
```

### JavaScript

#### Using namespace in browser environment

```javascript
var Calendar = tui.Calendar;
```

#### Using module format in node environment

```javascript
var Calendar = require('tui-calendar'); /* CommonJS */
require("tui-calendar/dist/tui-calendar.css");

// If you use the default popups, use this.
require("tui-date-picker/dist/tui-date-picker.css");
require("tui-time-picker/dist/tui-time-picker.css");
```

```javascript
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
```

Then you can create a calendar instance with [options](https://nhn.github.io/tui.calendar/latest/Options) to set configuration.

```javascript
var calendar = new Calendar('#calendar', {
  defaultView: 'month',
  taskView: true,
  template: {
    monthDayname: function(dayname) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    }
    ...
  }
});
```

Or you can use jquery plugin. You must include jquery before using this jquery plugin.

```js
// jquery wrapper
var $calEl = $('#calendar').tuiCalendar({
  defaultView: 'month',
  taskView: true,
  template: {
    monthDayname: function(dayname) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    }
    ...
  }
});

// You can get calendar instance
var calendarInstance = $calEl.data('tuiCalendar');

calendarInstance.createSchedules([...]);
```

## 🌏 Browser Support
| <img src="https://user-images.githubusercontent.com/1215767/34348387-a2e64588-ea4d-11e7-8267-a43365103afe.png" alt="Chrome" width="16px" height="16px" /> Chrome | <img src="https://user-images.githubusercontent.com/1215767/34348590-250b3ca2-ea4f-11e7-9efb-da953359321f.png" alt="IE" width="16px" height="16px" /> Internet Explorer | <img src="https://user-images.githubusercontent.com/1215767/34348380-93e77ae8-ea4d-11e7-8696-9a989ddbbbf5.png" alt="Edge" width="16px" height="16px" /> Edge | <img src="https://user-images.githubusercontent.com/1215767/34348394-a981f892-ea4d-11e7-9156-d128d58386b9.png" alt="Safari" width="16px" height="16px" /> Safari | <img src="https://user-images.githubusercontent.com/1215767/34348383-9e7ed492-ea4d-11e7-910c-03b39d52f496.png" alt="Firefox" width="16px" height="16px" /> Firefox |
| :---------: | :---------: | :---------: | :---------: | :---------: |
| Latest | +9 | Latest | Latest | Latest |

## 🔧 Pull Request Steps

TOAST UI products are open source, so you can create a pull request(PR) after you fix issues.
Run npm scripts and develop yourself with the following process.

### Setup

Fork `develop` branch into your personal repository.
Clone it to local computer. Install node modules.
Before starting development, you should check to haveany errors.

``` sh
$ git clone https://github.com/{owner}/tui.calendar.git
$ cd tui.calendar
$ npm install
$ npm run test
```

### Develop

Let's start development!
You can see your code is reflected as soon as you saving the codes by running a server.
Don't miss adding test cases and then make green rights.

#### Run webpack-dev-server

``` sh
$ npm run serve
```

#### Run karma test

``` sh
$ npm run test
```

### Pull Request

Before PR, check to test lastly and then check any errors.
If it has no error, commit and then push it!

For more information on PR's step, please see links of Contributing section.

## 💬 Contributing

* [Code of Conduct](https://github.com/nhn/tui.calendar/blob/master/CODE_OF_CONDUCT.md)
* [Contributing guideline](https://github.com/nhn/tui.calendar/blob/master/CONTRIBUTING.md)
* [Issue guideline](https://github.com/nhn/tui.calendar/blob/master/docs/ISSUE_TEMPLATE.md)
* [Commit convention](https://github.com/nhn/tui.calendar/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md)

## 🔩 Dependency

* [tui-code-snippet](https://github.com/nhn/tui.code-snippet) >= 1.5.0
* [tui-date-picker](https://github.com/nhn/tui.date-picker) >= 4.0.2 is optional.
* [tui-time-picker](https://github.com/nhn/tui.time-picker) >= 2.0.1 is optional.

## 🍞 TOAST UI Family
* [TOAST UI Grid](https://github.com/nhn/tui.grid)
* [TOAST UI Chart](https://github.com/nhn/tui.chart)
* [TOAST UI Editor](https://github.com/nhn/tui.editor)
* [TOAST UI Image-Editor](https://github.com/nhn/tui.image-editor)
* [TOAST UI Components](https://github.com/nhn?q=tui)

## 🚀 Used By
* [TOAST Dooray! - Collaboration Service (Project, Messenger, Mail, Calendar, Drive, Wiki, Contacts)](https://dooray.com)
* [NCP - Commerce Platform](https://www.e-ncp.com/)
* [shopby](https://www.godo.co.kr/shopby/main.gd)
* [payco-shopping](https://shopping.payco.com/)
* [iamTeacher](https://teacher.iamservice.net)
* [linder](https://www.linder.kr)

## 📜 License

This software is licensed under the [MIT](https://github.com/nhn/tui.calendar/blob/master/LICENSE) © [NHN](https://github.com/nhn).

## Sponsor
![Scheduling API](https://user-images.githubusercontent.com/9488406/125080407-0dd25780-e0c5-11eb-9f70-ef958968674a.png)

This repo is sponsored by [**Spurwing**](https://www.spurwing.io/), where their API Makes Adding Scheduling Quick, Reliable and Scalable.
Use Spurwing to build and integrate Scheduling, Booking & Calendar features in your project. Read more about Spurwing [**Scheduling API on GitHub**](https://github.com/Spurwing/Appointment-Scheduling-API).

