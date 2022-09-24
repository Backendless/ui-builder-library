# Calendar Heatmap

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [React Calendar Heatmap](https://github.com/kevinsqi/react-calendar-heatmap) library.

The component allows you to add calendar heatmaps to your UI-Builder application.

## Properties

| Property          | Type    | Default value                                     | Logic                           | Data Binding | UI Setting | Description                                                                                                                                              |
|-------------------|---------|---------------------------------------------------|---------------------------------|--------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| calendarData      | Object  | `[ { "date": "", "count": 0 } ]`                  | Calendar Data Logic             | NO           | YES        | Specifies an array of date and count for calendar. Watch [Codeless Examples](#Examples). Signature of Calendar Data: `{"data": string, "count": number}` |
| showMonthLabels   | Boolean | `true`                                            | Month Labels Visibility Logic   | NO           | YES        | Enables chose show or not show month labels                                                                                                              |
| monthLabels       | String  | "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec" | Month Labels Logic              | YES          | YES        | Enables write month labels                                                                                                                               |
| showWeekdayLabels | Boolean | `true`                                            | Weekday Labels Visibility Logic | NO           | YES        | Enables chose show or not show month labels                                                                                                              |
| weekdayLabels     | String  | "Sun,Mon,Tues,Wed,Thurs,Fri,Sat"                  | Weekday Labels Logic            | YES          | YES        | Enables write Weekday labels                                                                                                                             |
| color             | String  |                                                   | Color Logic                     | YES          | YES        | Allows selected color                                                                                                                                    |
| legend            | String  |                                                   | Legend Logic                    | Yes          | YES        | Enables write legend                                                                                                                                     |

## Events

| Name     | Triggers                  | Context Blocks  |
|----------|---------------------------|-----------------|
| On Click | when user clicks on cell  | Value: `Number` |

## Styles

**Theme**
````
@bl-customComponent-calendarHeatmap-themeColor: @themePrimary;
````

**Color**
````
@bl-customComponent-calendarHeatmap-textColor: #aaa;
````

## <a name="Examples"></a> Codeless Examples

Addition  calendar data:

![](example-images/calendarData-example.png)
