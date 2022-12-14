# Double Calendar
Double Calendar is a component of Backendless UI-Builder designer. The component is designed to select a start date and an end date. And you can also choose `Specific date range` mode to select a specific date. Also, if you wish, you can view the documentation of the used library here at [the link.](https://reactdatepicker.com/)

<p align="center">
  <img alt="main thumbnail" height="263" src="./thumbnail.png" width="420"/>
</p>

## Properties

| Property            | Type       | Default Value | Logic                     | Data Binding | UI Setting | Description                                                                                                           |
|---------------------|------------|---------------|---------------------------|--------------|------------|-----------------------------------------------------------------------------------------------------------------------|
| Disabled            | *Checkbox* | `false`       | Disabled Logic            | YES          | YES        | This handler allows you to disable a component.                                                                       |
| Specific Date Range | *Checkbox* | `false`       | Specific Date Range Logic | YES          | YES        | This handler allows you to select the date selection mode in a range.                                                 |
| Selection Range     | *Number*   | 7             | Selection Range Logic     | YES          | YES        | This handler allows you to specify a date selection range. This will work if you select a `Specific Date Range` mode. |
| Selected Date       | *Text*     |               | Selected Date Logic       | YES          | YES        | This handler allows you to specify the default selected date. Date format to be specified `year/month/day`.           |
| Header Visibility   | *Checkbox* | `true`        | Header Visibility Logic   | YES          | YES        | This handler allows you to control the display of the header.                                                         |
| From Date           | *Text*     |               | From Date Logic           | YES          | YES        | This handler allows you to specify a start date. Date format to be specified "year/month/day".                        |
| To Date             | *Text*     |               | To Date Logic             | YES          | YES        | This handler allows you to specify an end date. Date format to be specified "year/month/day".                         |

## Events

| Name                 | Triggers                                           | Context Blocks                              |
|----------------------|----------------------------------------------------|---------------------------------------------|
| On Start Date Change | when the user selects a start date                 | Start Date: `String`, Days Amount: `Number` |
| On End Date Change   | when the user selects an end date                  | End Date: `String`, Days Amount: `Number`   |
| On Date Select       | when the user selects a specific date in the range | Selected Date: `String`                     |
| On Date Reset        | when the user clicks the reset button              |                                             |

## Styles

**Dimensions**
````
@bl-customComponent-doubleCalendar-info-width: 100%;
````

**Colors**
````
@bl-customComponent-doubleCalendar-info-color: #000000;
@bl-customComponent-doubleCalendar-info-backgroundColor: #FFFFFF;
````
