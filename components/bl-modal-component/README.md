# Modal
Modal is a component of Backendless UI-Builder designer. This component allows you to add content by dragging components to this component, and it is displayed in the center.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780" />
</p>

## Properties

| Property         | Type           | Default value | Logic                  | Data Binding | UI Setting | Description                                                      |
|------------------|----------------|---------------|------------------------|--------------|------------|------------------------------------------------------------------|
| Disabled         | *Checkbox*     | false         | Disabled Logic         | YES          | YES        | This handler allows you to disable the component.                |
| Modal Visibility | *Checkbox*     | false         | Modal Visibility Logic | YES          | YES        | This handler allows you to control the display of the component. |

## Events

| Name              | Triggers                                                             | Context Blocks                                                                 |
|-------------------|----------------------------------------------------------------------|--------------------------------------------------------------------------------|
| On Close Event    | triggered when the user clicks on the backdrop or Escape button      | Modal Visibility: `false`                                                      |

## Styles

**Theme**
````
@bl-customComponent-modal-backdrop-color: rgba(0, 0, 0, 0.5);
````

**Dimensions**
````
@bl-customComponent-modal-width: 100%;
@bl-customComponent-modal-height: 100%;
````
