# Clock

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows you to display a timer and trigger an event when it completes.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                                     | Type   | Default Value | Logic                    | Data Binding | UI Setting | Description                                                                                                       |
|----------------------------------------------|--------|---------------|--------------------------|--------------|------------|-------------------------------------------------------------------------------------------------------------------|
| Timer Date: `timerDate`                      | Text   |               | Timer Date Logic         | YES          | YES        | Allows you to specify the date, time, and time zone when the timer will expire. Signature `MM.DD.YY HH:MM:SS UTC` |
| Animation Duration (ms): `animationDuration` | Number | 400           | Animation Duration Logic | YES          | YES        | Allows to determine the duration of the animation to change the time.                                             |

## Actions

| Name         | Triggers                                | Context Blocks |
|--------------|-----------------------------------------|----------------|
| On Timer End | This event triggers when the timer ends |                |

## Styles

**Dimensions**

```
@bl-customComponent-clock-font-size: 16px;
```

**Color**

```
@bl-customComponent-clock-text-color: @appTextColor;
```
