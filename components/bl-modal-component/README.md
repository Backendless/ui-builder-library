# Modal
Modal is a component of Backendless UI-Builder designer. This component allows you to add content by dragging components to this component, and it is displayed in the center.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780" />
</p>

## Properties

| Property | Type       | Default value | Logic            | Data Binding | UI Setting | Description                                                      |
|----------|------------|---------------|------------------|--------------|------------|------------------------------------------------------------------|
| Disabled | *Checkbox* | false         | Disabled Logic   | YES          | YES        | This handler allows you to disable the component.                |
| Display  | *Checkbox* | false         | Visibility Logic | YES          | YES        | This handler allows you to control the display of the component. |

## Events

| Name              | Triggers                                                             | Context Blocks                                               |
|-------------------|----------------------------------------------------------------------|--------------------------------------------------------------|
| On Close Event    | triggered when the user clicks on the backdrop or Escape button      | Visibility: `false`                                          |

## Actions

| Action         | Inputs        | Returns        |
|----------------|---------------|----------------|
| Open Modal     |               |                |
| Close Modal    |               |                |

## Styles

**Dimensions**
````
@bl-customComponent-modal-width: 100%;
@bl-customComponent-modal-height: 100%;
@bl-customComponent-modal-backdrop-z-index: 1;
@bl-customComponent-modal-content-z-index: 2;
@bl-customComponent-modal-component-z-index: 100;
````

**Colors**
````
@bl-customComponent-modal-backdrop-color: rgba(0, 0, 0, 0.5);
````
