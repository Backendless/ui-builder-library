# Clock

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows display time, use stopwatch and timer.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property       | Type                                   | Default Value | Logic            | Data Binding | UI Setting | Description                                                                                                       |
|----------------|----------------------------------------|---------------|------------------|--------------|------------|-------------------------------------------------------------------------------------------------------------------|
| Type           | Select [`clock`, `stopwatch`, `timer`] | `clock`       |                  | NO           | YES        | Allows to determine the function of the component                                                                 |
| timeVariant    | Select [`hhmmss`, `hhmm`, `hh`]        | `hhmmss`      |                  | NO           | YES        | Allows to determine variant of displaying time                                                                    |
| stopwatchScale | Number                                 | 3             |                  | NO           | NO         | Allows to determine the scale of  stopwatch seconds                                                               |
| timerDate      | Text                                   |               | Timer Data Logic | YES          | YES        | Allows you to specify the date, time, and time zone when the timer will expire. Signature `MM.DD.YY HH:MM:SS UTC` |

## Events

| Name         | Triggers            | Context Blocks |
|--------------|---------------------|----------------|
| On Timer End | when the timer ends |                |

## Actions

| Action          | Inputs | Returns |
|-----------------|--------|---------|
| Start Stopwatch |        |         |
| Stop Stopwatch  |        |         |
| Reset Stopwatch |        |         |

## Styles

**Dimensions**
```
@bl-customComponent-clock-font-size: 16px;
```
**Color**
```
@bl-customComponent-clock-text-color: @appTextColor;
```
