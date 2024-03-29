# Double Calendar
Double Calendar is a component of Backendless UI-Builder designer. The component is designed to select a start date and an end date. And you can also choose `Specific date range` mode to select a specific date. Also, if you wish, you can view the documentation of the used library here at [the link.](https://reactdatepicker.com/)

<p align="center">
  <img alt="main thumbnail" height="480" src="./thumbnail.png" width="780"/>
</p>

## Demo

View an example of how to install this component and how it works in your UI [here](https://app.arcade.software/share/lUqLdFKIbWMyhICAnTm6).

## Properties

| Property                                                | Type     | Default Value | Logic                           | Data Binding | UI Setting | Description                                                                                                           |
|---------------------------------------------------------|----------|---------------|---------------------------------|--------------|------------|-----------------------------------------------------------------------------------------------------------------------|
| Disabled<br/>`disabled`                                 | Checkbox | `false`       | Disabled Logic                  | YES          | YES        | This handler allows you to disable a component.                                                                       |
| Specific Date Range<br/>`specificDateRange`             | Checkbox | `false`       | Specific Date Range Logic       | YES          | YES        | This handler allows you to select the date selection mode in a range.                                                 |
| Start Date Of Range<br/>`startDateOfRange`              | Text     | ""            | Start Date Of Range Logic       | YES          | NO         | This handler allows you to specify the start date of the selection range.                                             |
| Selection Range<br/>`selectionRange`                    | Nubmer   | 7             | Selection Range Logic           | YES          | YES        | This handler allows you to specify a date selection range. This will work if you select a `Specific Date Range` mode. |
| Selected Date<br/>`selectedDate`                        | Text     | ""            | Selected Date Logic             | YES          | NO         | This handler allows you to specify the default selected date.                                                         |
| Header Visibility<br/>`headerVisibility`                | Checkbox | `true`        | Header Visibility Logic         | YES          | YES        | This handler allows you to control the display of the header.                                                         |
| Days Amount Visibility<br/>`daysAmountVisibility`       | Checkbox | `true`        | Days Amount Visibility Logic    | NO           | YES        | This handler allows you to display the amount days in the header.                                                     |
| Month Dropdown Visibility<br/>`monthDropdownVisibility` | Checkbox | `true`        | Month Dropdown Visibility Logic | NO           | YES        | This handler allows you to add a month dropdown to the component.                                                     |
| Year Dropdown Visibility<br/>`yearDropdownVisibility`   | Checkbox | `true`        | Year Dropdown Visibility Logic  | NO           | YES        | This handler allows you to add a year dropdown to the component.                                                      |
| From Date<br/>`fromDate`                                | Text     | ""            | From Date Logic                 | YES          | NO         | This handler allows you to specify a start date.                                                                      |
| To Date<br/>`toDate`                                    | Text     | ""            | To Date Logic                   | YES          | NO         | This handler allows you to specify an end date.                                                                       |

## Events

| Name                 | Triggers                                           | Context Blocks                              |
|----------------------|----------------------------------------------------|---------------------------------------------|
| On Start Date Change | when the user selects a start date                 | Start Date: `String`, Days Amount: `Number` |
| On End Date Change   | when the user selects an end date                  | End Date: `String`, Days Amount: `Number`   |
| On Date Select       | when the user selects a specific date in the range | Selected Date: `String`                     |
| On Date Reset        | when the user clicks the reset button              |                                             |

## Actions

| Action                                   | Inputs                                 | Returns                                          |
|------------------------------------------|----------------------------------------|--------------------------------------------------|
| Get From Date Of Double Calendar         |                                        | `String`: current From Date                      |
| Set From Date For Double Calendar        | From Date: `String`                    |                                                  |
| Get To Date Of Double Calendar           |                                        | `String`: current To Date                        |
| Set To Date For Double Calendar          | To Date: `String`                      |                                                  |
| Get From And To Date Of Double Calendar  |                                        | `Object`: {fromDate: `String`, toDate: `String`} |
| Set From And To Date For Double Calendar | From Date: `String`, To Date: `String` |                                                  |
| Get Days Amount Of Double Calendar       |                                        | `Number`: the calculated number of days          |
| Reset Date Of Double Calendar            |                                        |                                                  |

## Styles

**Dimensions**
````
@bl-customComponent-doubleCalendar-info-width: 100%;
````

**Colors**
````
@bl-customComponent-doubleCalendar-info-color: #000000;
@bl-customComponent-doubleCalendar-info-backgroundColor: #FFFFFF;
@bl-customComponent-doubleCalendar-info-borderColor: #aeaeae;
````

**Typography**
```
@bl-customComponent-doubleCalendar-disabled-opacity: 0.38;
@bl-customComponent-doubleCalendar-disabled-cursor: default;
```
