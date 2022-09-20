# Popover

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [Popover](https://react-bootstrap.github.io/components/overlays/#popovers) library.

The component allows you to render a popup window in your UI-Builder application.

## Properties

| Property    | Type                                    | Default Value | Logic              | Data Binding | UI Setting | Description                                                            |
|-------------|-----------------------------------------|---------------|--------------------|--------------|------------|------------------------------------------------------------------------|
| title       | String                                  |               | Title Logic        | YES          | YES        | Allows to determine the title of popover                               |
| text        | String                                  |               | Text Logic         | YES          | YES        | Allows to determine the text of popover                                |
| buttonLabel | String                                  |               | Button Label Logic | YES          | YES        | Allows to determine the label of button                                |
| position    | Select ["Top", "Right","Bottom","Left"] | "Top"         | Position Logic     | NO           | YES        | Allows to determine the position of the popover relative to the button |
| disabled    | Boolean                                 | `false`       | Disabled Logic     | NO           | YES        | Allows determining whether a button is disabled or not                 |

## Events

| Name     | Triggers                   | Context Blocks     |
|----------|----------------------------|--------------------|
| On Click | when user clicks on button | `Is Open: boolean` |

## Actions

| Action      | Inputs             | Returns |
|-------------|--------------------|---------|
| Set Is Open | `boolean: boolean` |         |

## Styles

**Dimensions**
```
@bl-customComponent-popover-border-width: 1px;
@bl-customComponent-popover-max-width: 276px;
@bl-customComponent-popover-arrow-size: 10px;
```

**Colors**
```
@bl-customComponent-popover-title-background-color: #f0f0f0;
@bl-customComponent-popover-text-background-color: #fff;
```

**Others**
```
@bl-customComponent-popover-border: @bl-customComponent-popover-border-width solid rgba(0, 0, 0, 0.175);
```
