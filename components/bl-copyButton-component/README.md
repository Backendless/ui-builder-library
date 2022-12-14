# Copy Button

Copy Button is a component of Backendless UI-Builder designer. This allows you click on button and copied content.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property            | Type    | Default Value | Logic                | Data Binding | UI Setting | Description                                   |
|---------------------|---------|---------------|----------------------|--------------|------------|-----------------------------------------------|
| disabled            | Boolean | `false`       | Disabled Logic       | NO           | YES        | Allows disabled or not disabled copy button.  |
| content             | String  |               | Content Logic        | YES          | YES        | Allows write content that be copied.          |
| copyLabel           | String  | 'Copy'        | Copy Label Logic     | YES          | YES        | Allows writing label for the copy button.     |
| copiedLabel         | String  | 'Copied'      | Copied Label Logic   | YES          | YES        | Allows writing label for the copied button.   |
| isCopyIconVisible   | Boolean | `true`        | Is Copy Icon Logic   | NO           | YES        | Allows display or not display copy icon.      |
| isCopiedIconVisible | Boolean | `true`        | Is Copied Icon Logic | NO           | YES        | Allows display or not display copied icon.    |
| copiedDuration      | Number  | 1000          |                      | NO           | YES        | Allows to specify duration(ms) copied button. |

## Events

| Name          | Triggers                           | Context Blocks |
|---------------|------------------------------------|----------------|
| On Copy Event | when the user click on copy button |                |

## Action

| Action | Inputs | Returns |
|--------|--------|---------|
| Copy   |        |         |
