# Stopwatch

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows using stopwatch.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                   | Type                                                 | Default Value      | Logic             | Data Binding | UI Setting | Description                                                                                                  |
|----------------------------|------------------------------------------------------|--------------------|-------------------|--------------|------------|--------------------------------------------------------------------------------------------------------------|
| Time Format: `timeFormat`  | Select [SS: `ss`, MM:SS: `mmss`, HH:MM:SS: `hhmmss`] | HH:MM:SS: `hhmmss` | Time Format Logic | YES          | YES        | Allows to determine time format of stopwatch.                                                                |
| Decimal Places: `tickRate` | Select [0: `0`, 1: `1`, 2: `2`, 3: `3`]              | 3: `3`             |                   | NO           | YES        | Allows you to determine how precisely to display the seconds (the count of numbers after the decimal point). |

## Actions

| Action                  | Inputs | Returns                                                                                                                                                                              |
|-------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Start Stopwatch         |        |                                                                                                                                                                                      |
| Stop Stopwatch          |        |                                                                                                                                                                                      |
| Reset Stopwatch         |        |                                                                                                                                                                                      |
| Get Time from Stopwatch |        | Object: `{ elapsedTime: Number, seconds: Number, minutes: Number, hours: Number }`. `elapsedTIme`: total elapsed time in milliseconds, `seconds`/`minutes`/`hours`: times like in UI |

## Styles

```
@bl-customComponent-stopwatch-font-size: 16px;
@bl-customComponent-stopwatch-text-color: @appTextColor;
@bl-customComponent-stopwatch-font-family: "Lucida Console", monospace;
```

> **_NOTE:_** If you notice that the stopwatch twitches (this is especially noticeable when the component is centered horizontally), you may need to specify a font from the monospace family
