# Calendar Heatmap

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [React Calendar Heatmap](https://github.com/kevinsqi/react-calendar-heatmap) library.

The component allows you to add calendar heatmaps to your UI-Builder application.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                                          | Type     | Default Value | Logic                          | Data Binding | UI Setting | Description                                                                                                                                                                                                                                           |
|---------------------------------------------------|----------|---------------|--------------------------------|--------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Source Data URL: `sourceDataUrl`                  | Text     |               | Source Data URL Logic          | YES          | YES        | Allows to determine the URL for fetching data from a remote source.                                                                                                                                                                                   |
| Data Type: `dataType`                             | Select   | "json"        | Data Type Logic                | YES          | YES        | Allows to determine the type of data(JSON, CSV, TSV, TXT).                                                                                                                                                                                            |
| Data: `data`                                      | Json     |               | Data Logic                     | YES          | YES        | Allows to to determine data used to populate the calendar.                                                                                                                                                                                            |
| Date Property Name: `datePropName`                | Text     | "date"        | Date Property Name Logic       | YES          | YES        | Allows to determine the property name of the date. Instruct the calendar how to extract the date property from your data.                                                                                                                             |
| Value Property Name: `valuePropName`              | Text     | "value"       | Value Property Name Logic      | YES          | YES        | Allows to determine the property name of the value. Instruct the calendar how to extract the value property from your data.                                                                                                                           |
| Default Data Value: `defaultDataValue`            | Text     |               |                                | YES          | YES        | Allows to determine the default value when your dataset does not have a value for a date.                                                                                                                                                             |
| Start Date: `startDate`                           | Text     |               | Start Date Logic               | YES          | YES        | Allows to determine the start date of the calendar.                                                                                                                                                                                                   |
| Min Date: `minDate`                               | Text     |               | Min Date Logic                 | YES          | YES        | Allows to determine the minimum allowed date. Used on navigation, to set a lower bound when navigating backward.                                                                                                                                      |
| Max Date: `maxDate`                               | Text     |               | Max Date Logic                 | YES          | YES        | Allows to determine the maximum allowed date. Used on navigation, to set an upper bound when navigating forward.                                                                                                                                      |
| Highlight Date: `highlightDate`                   | Text     |               | Highlight Date Logic           | YES          | YES        | Allows to determine the array of dates to highlight. Highlighted subDomain cells are given a special class to make them stand out.                                                                                                                    |
| Range: `range`                                    | Range    | 12            | Range Logic                    | YES          | YES        | Allows to determine the number of domains to show.                                                                                                                                                                                                    |
| Type: `type`                                      | Select   | "year"        | Type Logic                     | YES          | YES        | Allows to determine the domain's type, representing a time unit(year, month, week, day, hour).                                                                                                                                                        |
| Sub Type: `subType`                               | Select   | "month"       | Sub Type Logic                 | YES          | YES        | Allows to determine the SubDomain's type, representing a time unit. This is the time unit represented by each cell in the calendar. The subDomain should always be smaller than the domain type.                                                      |
| Sort: `sort`                                      | Select   | "asc"         | Sort Logic                     | YES          | YES        | Allows to determine the sort order of the domains.                                                                                                                                                                                                    |
| Sub Sort: `subSort`                               | Select   | "asc"         | Sub Sort Logic                 | YES          | YES        | Allows to determine the sort order of the subDomains.                                                                                                                                                                                                 |
| Group: `groupY`                                   | Select   | "sum"         |                                | YES          | YES        | Allows to determine how to group all values from the same subDomain.                                                                                                                                                                                  |
| Scale Type: `scaleType`                           | Select   | "linear"      | Scale Type Logic               | NO           | YES        | Allows to determine the scale type used to encode colors                                                                                                                                                                                              |
| Scale Domain: `scaleDomain`                       | Text     |               | Scale Domain Logic             | YES          | YES        | Allows to determine an array of at least 2 values, specifying the minimum and maximum value of your dataset. By default min and max values of the specified dataset. When using the threshold's type, domain should be a list of different threshold. |
| Scale Opacity Base Color: `scaleOpacityBaseColor` | Color    | "#000000"     | Scale Opacity Base Color Logic | YES          | YES        | Allows to determine the base color.                                                                                                                                                                                                                   |
| Scale Color Scheme: `scaleColorScheme`            | Text     |               | Scale Color Scheme Logic       | YES          | YES        | Allows to to determine the color scheme name from d3-scale-chromatic.                                                                                                                                                                                 |
| Scale Color Range: `scaleColorRange`              | Text     |               | Scale Color Range Logic        | YES          | YES        | Allows to determine the array of colors. Expects a minimum of 2 colors.                                                                                                                                                                               |
| Gutter: `gutter`                                  | Text     |               | Gutter Logic                   | YES          | YES        | Allows to determine the space between each domain, in pixel.                                                                                                                                                                                          |
| Sub Gutter: `subGutter`                           | Number   | 2             | Sub Gutter Logic               | YES          | YES        | Allows to determine the space between each subDomain, in pixel.                                                                                                                                                                                       |
| Vertical Orientation: `verticalOrientation`       | Checkbox |               | Vertical Orientation Logic     | YES          | YES        | Allows to determine whether the domains should be arranged on top of each other, or side by side.                                                                                                                                                     |
| Dynamic Dimension: `dynamicDimension`             | Checkbox |               | Dynamic Dimension Logic        | YES          | YES        | Allows to determine whether the domain's should be resized to fit its content.                                                                                                                                                                        |
| Legend: `legend`                                  | Select   | "none"        | Legend Logic                   | YES          | YES        | Allows to select the legend that will be displayed.                                                                                                                                                                                                   |
| Calendar Label: `calendarLabel`                   | Json     |               | Calendar Label Logic           | YES          | YES        | Allows to determine the calendar label.                                                                                                                                                                                                               |
| Cell Height: `cellHeight`                         | Number   | 20            | Cell Height Logic              | YES          | YES        | Allows to determine the height of each subDomain cell, in pixel.                                                                                                                                                                                      |
| Cell Width: `cellWidth`                           | Number   | 20            | Cell Width Logic               | YES          | YES        | Allows to determine the width of each subDomain cell, in pixel.                                                                                                                                                                                       |
| Cell Radius: `cellRadius`                         | Number   | 4             | Cell Radius Logic              | YES          | YES        | Allows to determine the border radius of each subDomain cell, in pixel.                                                                                                                                                                               |
| Label: `label`                                    | Text     | "MMMM"        |                                | NO           | YES        | Allows to determine the label's content. For detail watch in documentation.                                                                                                                                                                           |
| Label Position: `labelPosition`                   | Select   | "bottom"      | Label Position Logic           | YES          | YES        | Allows to determine the position of the label, relative to its domain.                                                                                                                                                                                |
| Label Height: `labelHeight`                       | Number   | 20            | Label Height                   | YES          | YES        | Allows to determine the height of the label, in pixel.                                                                                                                                                                                                |
| Label Width: `labelWidth`                         | Number   | 20            | Label Width Logic              | YES          | YES        | Allows to determine the width of the label, in pixel.                                                                                                                                                                                                 |
| Label Rotation: `labelRotation`                   | Select   |               | Label Rotation Logic           | YES          | YES        | Allows to determine the rotation to obtain a vertical label.                                                                                                                                                                                          |
| Text Align: `textAlign`                           | Select   | "middle"      | Text Align Logic               | YES          | YES        | Allows to determine the horizontal alignment of the label.                                                                                                                                                                                            |
| Label Offset X: `labelOffsetX`                    | Number   | 0             | Label Offset X Logic           | YES          | YES        | Allows to determine the label placement along its x-axis.                                                                                                                                                                                             |
| Label Offset Y: `labelOffsetY`                    | Number   | 0             | Label Offset Y Logic           | YES          | YES        | Allows to determine the label placement along its y-axis.                                                                                                                                                                                             |
| Sub Label: `subLabel`                             | Text     | "DD"          |                                | YES          | YES        | Allows to determine the label of the subDomain. For detail watch documentation.                                                                                                                                                                       |
| Sub Color Label: `subColorLabel`                  | Color    |               |                                | YES          | YES        | Allows to determine the color of the subDomain's label.                                                                                                                                                                                               |
| Animation Duration: `animationDuration`           | Number   | 200           | Animation Duration Logic       | YES          | YES        | Allows to determine the duration of the various animations. Animation is used each time there is a change in the calendar UI, such as navigation, resize, etc...                                                                                      |
| Theme: `theme`                                    | Select   | "light"       | Theme Logic                    | YES          | YES        | Allows to toggle between light and dark mode.                                                                                                                                                                                                         |                                       |          |                                                        |                                 |              |            |                                                                                                                                                                      |

## Events

| Name                  | Triggers                                                                                        | Context Blocks                                             |
|-----------------------|-------------------------------------------------------------------------------------------------|------------------------------------------------------------|
| On Cell Click Event   | when on a subDomain cell click.                                                                 | event: `Object` timestamp: `String` value: `Any`           |
| Mouse Over Event      | when the mouse enter a subDomain cell.                                                          |                                                            |
| Mouse Out             | when the mouse exit a subDomain cell.                                                           |                                                            |
| Min Date Reached      | after a navigation event, and when the calendar has reached the min date, if set.               |                                                            |
| Max Date Reached      | after a navigation event, and when the calendar has reached the max date, if set.               |                                                            |
| Sub Color Label Logic | This is an event for logic to determine the color of the subDomain's label.                     | timestamp: `String` value: `Any` backgroundColor: `String` |
| Sub Label Logic       | This is an event for the logic to determine the label of the subDomain.                         | element: `Object` timestamp: `String` value: `Any`         |
| Group Logic           | This is an event for the logic to determine how to group all values from the same subDomain.    | value: `Any`                                               |
| Label Logic           | This is an event for logic to determine the label's content. For detail watch in documentation. | element: `Object` timestamp: `String`                      |

## Actions

| Action      | Inputs                        | Returns |
|-------------|-------------------------------|---------|
| Go Next     | Steps: `Number`               |         |
| Go Previous | Steps: `Number`               |         |
| Jump To     | Date: `Date` Reset: `Boolean` |         |

## Styles

**Domain**
````
@bl-customComponent-calendar-heatmap-domain-bg: transparent;
@bl-customComponent-calendar-heatmap-domain-text: currentColor;
@bl-customComponent-calendar-heatmap-domain-text-size: 10px;
````

**Subdomain**
````
@bl-customComponent-calendar-heatmap-subdomain-bg: #ededed;
@bl-customComponent-calendar-heatmap-subdomain-bg-stroke-hover: #000;
@bl-customComponent-calendar-heatmap-subdomain-bg-stroke-width-hover: 1px;
@bl-customComponent-calendar-heatmap-subdomain-bg-stroke-highlight: #444;
@bl-customComponent-calendar-heatmap-subdomain-bg-stroke-width-highlight: 1px;
@bl-customComponent-calendar-heatmap-subdomain-text-size: 8px;
@bl-customComponent-calendar-heatmap-subdomain-text-pointer-events: none;
````

**Dark Subdomain**
```
@bl-customComponent-calendar-heatmap-dark-subdomain-bg: #2d333b;
@bl-customComponent-calendar-heatmap-dark-subdomain-bg-stroke-hover: #636e7b;
@bl-customComponent-calendar-heatmap-dark-subdomain-bg-stroke-highlight: #768390;
```

**Legends**
```
@bl-customComponent-calendar-heatmap-legends-background: transparent;
@bl-customComponent-calendar-heatmap-legends-color: currentColor;
```

**Tooltip**
```
@bl-customComponent-calendar-heatmap-tooltip-background: #222;
@bl-customComponent-calendar-heatmap-tooltip-color: #bbb;
@bl-customComponent-calendar-heatmap-tooltip-font-size: 12px;
@bl-customComponent-calendar-heatmap-tooltip-line-height: 1.4;
@bl-customComponent-calendar-heatmap-tooltip-padding: 5px 10px;
@bl-customComponent-calendar-heatmap-tooltip-text-align: center;
@bl-customComponent-calendar-heatmap-tooltip-border-radius: 2px;
@bl-customComponent-calendar-heatmap-tooltip-box-shadow: 2px 2px 2px rgba(0, 0, 0, .2);
@bl-customComponent-calendar-heatmap-tooltip-arrow-background: inherit;
@bl-customComponent-calendar-heatmap-tooltip-arrow-height: 8px;
@bl-customComponent-calendar-heatmap-tooltip-arrow-width: 8px;
@bl-customComponent-calendar-heatmap-tooltip-arrow-before-transform-rotate: rotate(45deg);
```

**Dark Tooltip**
```
@bl-customComponent-calendar-heatmap-tooltip-dark-background: #636e7b;
@bl-customComponent-calendar-heatmap-tooltip-dark-color: #cdd9e5;
```

## <a id="examples"></a> Codeless Examples

Addition  calendar data:

![](example-images/calendarData-example.png)
