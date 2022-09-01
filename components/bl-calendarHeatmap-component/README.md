# Calendar Heatmap

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [React Calendar Heatmap](https://github.com/kevinsqi/react-calendar-heatmap) library.

The component allows you to add calendar heatmaps to your UI-Builder application.

## Properties

| Property          | Type           | Default value                                   | Logic                     | Data Binding | UI Setting | Description                                       |
|-------------------|----------------|-------------------------------------------------|---------------------------|--------------|------------|---------------------------------------------------|
| calendarData      | Required, JSON | [ { "date": "", "count": 0 } ]                  | Calendar Data Logic       | NO           | YES        | Specifies an array of date and count for calendar |
| showMonthLabels   | Checkbox       | `true`                                          | Show Month Labels Logic   | NO           | YES        | Enables chose show or not show month labels       |
| monthLabels       | Text           | Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec | Month Labels Logic        | YES          | YES        | Enables write month labels                        |
| showWeekdayLabels | Checkbox       | `true`                                          | Show Weekday Labels Logic | NO           | YES        | Enables chose show or not show month labels       |
| weekdayLabels     | Text           | Sun,Mon,Tues,Wed,Thurs,Fri,Sat                  | Weekday Labels Logic      | YES          | YES        | Enables write Weekday labels                      |
| color             | color          |                                                 | Color Logic               | YES          | YES        | Allows selected color                             |
| legend            | Text           |                                                 | Legend Logic              | Yes          | YES        | Enables write legend                              |

## Events

| Name     | Triggers                  | Context Blocks |
|----------|---------------------------|----------------|
| On Click | when user clicks on cell  | Value          |

## Styles

**Theme**
````
@bl-customComponent-calendarHeatmap-themeColor: @themePrimary;
````

**Dimensions**
````
@bl-customComponent-calendarHeatmap-textColor: #aaa;
````
