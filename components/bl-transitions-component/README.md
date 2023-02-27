# Transitions

Transitions is a component of the Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). This component allows you to add a smooth component mounting animation.

The component based on external [Transitions](https://mui.com/material-ui/transitions/).

## Properties

| Property | Type                                                                  | Default Value  | Logic | Data Binding | UI Setting | Description                                     |
|----------|-----------------------------------------------------------------------|----------------|-------|--------------|------------|-------------------------------------------------|
| Variants | Select <br/>["collapse-top", "collapse-left", "fade", "grow", "zoom"] | "collapse-top" |       | NO           | YES        | Allows to determine variant of transition       |
| Duration | Number                                                                | 300            |       | NO           | YES        | Allows to determine duration of transition (ms) |

## Events

| Name             | Triggers                                                | Context Blocks |
|------------------|---------------------------------------------------------|----------------|
| On Mounted       | after the component is mounted and appeared on the page |                |
| On Unmounted     | before the component is unmounted and destroyed         |                |
| On End Animation | after the animation finishes                            |                |
