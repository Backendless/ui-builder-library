# Simple Modal

Simple Modal is a designer component of Backendless UI-Builder. This allows you to add a modal dialog box. You can add "Alert" to notify you about certain information. You can add "Prompt" to get information from the user. You can add "Confirm" to get confirmation at user for some actions.

The component based on external [Simple Modal](https://mui.com/material-ui/react-dialog/).

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property          | Type                                  | Default Value | Logic               | Data Binding | UI Setting | Description                                                             |
|-------------------|---------------------------------------|---------------|---------------------|--------------|------------|-------------------------------------------------------------------------|
| title             | Text                                  |               | Title Logic         | YES          | YES        | Allows write title for Simple Modal.                                    |
| content           | Text                                  |               | Content Logic       | YES          | YES        | Allows write content for Simple Modal.                                  |
| closeButtonLabel  | Text                                  | "Close"       | Close Button Label  | YES          | YES        | Allows to write label for close button. Default value "Close".          |
| submitButtonLabel | Text                                  | "Submit"      | Submit Button Label | YES          | YES        | Allows to write label for Submit Button. Default value "Submit".        |
| type              | Select ["alert", "prompt", "confirm"] | "alert"       |                     | NO           | YES        | Allows select type of Simple Modal ("alert", "prompt", "confirm").      |
| placeholder       | Text                                  |               | Placeholder Logic   | YES          | YES        | Allows to write text for input placeholder.                             |
| closingDuration   | Number                                | 100           |                     | NO           | YES        | Allows to specify speed animation opening and closing for Simple Modal. |

## Events

| Name                  | Triggers                             | Context Blocks        |
|-----------------------|--------------------------------------|-----------------------|
| On Close              | when the user click on close button  |                       |
| On Submit             | when the user click on submit button | Input Value: `String` |
| On Input Value Change | when the input value change          | Input Value: `String` |

## Actions

| Action | Inputs | Returns |
|--------|--------|---------|
| Open   |        |         |
| Close  |        |         |

## Styles

**Theme**
```
@bl-customComponent-simple-modal-themeColor: @themePrimary;
@bl-customComponent-simple-modal-backgroundColor: @appBackgroundColor;
@bl-customComponent-simple-modal-textColor: @appTextColor;
```

**Dimensions**
```
@bl-customComponent-simple-modal-max-width: 600px;
@bl-customComponent-simple-modal-min-width: 300px;
@bl-customComponent-simple-modal-button-borderRadius: 4px;
```

**Colors**
```
@bl-customComponent-simple-modal-buttonColor: @bl-customComponent-simple-modal-themeColor;
@bl-customComponent-simple-modal-button-backgroundColor: transparent;
@bl-customComponent-simple-modal-button-backgroundColorHover: fade(@bl-customComponent-simple-modal-themeColor, 4%);
```
