# Stopwatch

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows using stopwatch.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                  | Type                                                 | Default Value | Logic             | Data Binding | UI Setting | Description                                                                                           |
|---------------------------|------------------------------------------------------|---------------|-------------------|--------------|------------|-------------------------------------------------------------------------------------------------------|
| Time Format: `timeFormat` | Select [SS: `ss`, MM:SS: `mmss`, HH:MM:SS: `hhmmss`] | SS: `ss`      | Time Format Logic | YES          | YES        | Allows to determine time format of stopwatch.                                                         |
| Tick Rate: `tickRate`     | Number                                               | 3             |                   | NO           | YES        | Allows you to determine how precisely to display the seconds (the count of numbers after the period). |

## Actions

| Action          | Inputs | Returns |
|-----------------|--------|---------|
| Start Stopwatch |        |         |
| Stop Stopwatch  |        |         |
| Reset Stopwatch |        |         |

## Styles

**Dimensions**

```
@bl-customComponent-stopwatch-font-size: 16px;
```

**Color**

```
@bl-customComponent-stopwatch-text-color: @appTextColor;
```
