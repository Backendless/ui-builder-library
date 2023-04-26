# Audio Recorder

Audio Recorder is a component of Backendless UI-Builder designer. This allows recording audio from the user's microphone and using the recorded file.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property          | Type                                                | Default Value    | Logic               | Data Binding | UI Setting | Description                                                   |
|-------------------|-----------------------------------------------------|------------------|---------------------|--------------|------------|---------------------------------------------------------------|
| Show Player       | *Checkbox*                                          | `true`           | Show PLayer Logic   | YES          | YES        | This is a handler to control audio player visibility.         |
| Show Controls     | *Checkbox*                                          | `true`           | Show Controls Logic | YES          | YES        | This handler allows to show or hide control buttons.          |
| Noise Suppression | *Checkbox*                                          | `true`           |                     | NO           | YES        | This is a handler to control Noise Suppression property.      |
| File Name         | *Text*                                              | 'Recorded Audio' | File Name Logic     | YES          | YES        | This is a handler to control the name of the downloaded file. |
| File Type         | *Select* <br/>[`webm`, `wav`, `mpeg`, `mp4`, `ogg`] | 'webm'           |                     | NO           | YES        | This is a handler to control the type of the downloaded file. |
| Width             | *Text*                                              | '380px'          |                     | NO           | YES        | This is a handler to control the width of the component.      |

## Events

| Name               | Triggers                                  | Context Blocks                                                                                     |
|--------------------|-------------------------------------------|----------------------------------------------------------------------------------------------------|
| On Start Recording | When the recording is started             |                                                                                                    |
| On Stop Recording  | When the recording is stopped             |                                                                                                    |
| On Download File   | When the recorded file starts downloading | [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) File: `{size: Number, type: String}` |
| On State           | When the recorder state is changed.       | State: `String`                                                                                    |

## Actions

| Action                                   | Inputs                     | Returns               |
|------------------------------------------|----------------------------|-----------------------|
| Start record of Audio Recorder           |                            |                       |
| Stop record of Audio Recorder            |                            |                       |
| Download recorded file of Audio Recorder |                            |                       |
| Get Blob of Audio Recorder               |                            | `Blob`: recorded blob |

## Styles

**Theme**
````
@bl-customComponent-audioRecorder-button-backgroundColor: @themePrimary;
@bl-customComponent-audioRecorder-button-disabled: @disabledColor;
@bl-customComponent-audioRecorder-button-borderRadius: @appComponentBorderRadius;
@bl-customComponent-audioRecorder-button-color: @appTextColor;
@bl-customComponent-audioRecorder-button-shadowColor: @appComponentShadowColor;
@bl-customComponent-audioRecorder-button-shadowHover: 0px 2px 4px -1px fade(@bl-customComponent-audioRecorder-button-shadowColor, 20%), 0px 4px 5px 0px fade(@bl-customComponent-audioRecorder-button-shadowColor, 14%), 0px 1px 10px 0px fade(@bl-customComponent-audioRecorder-button-shadowColor, 12%);
@bl-customComponent-audioRecorder-button-shadow: 0px 3px 1px -2px fade(@bl-customComponent-audioRecorder-button-shadowColor, 20%), 0px 2px 2px 0px fade(@bl-customComponent-audioRecorder-button-shadowColor, 14%), 0px 1px 5px 0px fade(@bl-customComponent-audioRecorder-button-shadowColor, 12%);
@bl-customComponent-audioRecorder-button-disaled-background: @bl-customComponent-audioRecorder-button-disabled;
@bl-customComponent-audioRecorder-button-disabled-color: contrast(@bl-customComponent-audioRecorder-button-disaled-background);
````

**Other**
````
@bl-customComponent-audioRecorder-button-fontSize: 0.875rem;
@bl-customComponent-audioRecorder-button-borderStyle: solid;
@bl-customComponent-audioRecorder-button-borderWidth: 0px;
````
