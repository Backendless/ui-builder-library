# Color Picker

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the 
[iro.js](https://github.com/jaames/iro.js) library.

It allows to specify a color, either by using a visual color picker interface or by entering the color into a text field 
in hexadecimal format. A user can change any character of rgb or hsl format. The picker also allows to use an alpha 
channel, which could be modified by the slider visual interface or by the input field.

Customizations include adjustments of color picker type, stacking direction, default color value, visibility of separate
elements and the picker as a whole.

## Properties

| Property                  | Type       | Default value | Logic                | Data Binding | UI Setting | Description                                                  |
|---------------------------|------------|---------------|----------------------|--------------|------------|--------------------------------------------------------------|
| Picker Trigger Visibility | *Checkbox* | `true`        |                      | NO           | YES        | enables toggling visibility of the color picker by a button  |
| Circle Color Picker       | *Checkbox* | `false`       |                      | NO           | YES        | enables wheel layout for the color picker                    |
| Vertical Color Picker     | *Checkbox* | `false`       |                      | NO           | YES        | enables vertical direction of the color picker ui components |
| Opacity Slider Visibility | *Checkbox* | `true`        |                      | NO           | YES        | enables opacity slider in the color picker                   |
| Opacity Input Visibility  | *Checkbox* | `true`        |                      | NO           | YES        | enables opacity input in the color picker                    |
| RGB Format Visibility     | *Checkbox* | `true`        |                      | NO           | YES        | enables RGB color format in the color picker                 |
| HSL Format Visibility     | *Checkbox* | `true`        |                      | NO           | YES        | enables HSL color format in the color picker                 |
| Selected Color            | *Color*    | "#ff0000"     | Selected Color Logic | YES          | YES        | controls selected color in the color picker                  |

## Events

| Name                  | Triggers                                                     | Context Blocks           |
|-----------------------|--------------------------------------------------------------|--------------------------|
| On Change Color Event | when the user changes the selected color in the color picker | `Selected Color: string` |

## Actions

| Action       | Inputs | Returns |
|--------------|--------|---------|
| Open Picker  |        |         |
| Close Picker |        |         |

## Styles

**Theme**

````
@bl-customComponent-colorPicker-themeColor: @themePrimary;
@bl-customComponent-colorPicker-backgroundColor: @appBackgroundColor;
@bl-customComponent-colorPicker-textColor: @appTextColor;
@bl-customComponent-colorPicker-shadowColor: @appComponentShadowColor;
````

**Dimensions**

````
@bl-customComponent-colorPicker-trigger-width: 50px;
@bl-customComponent-colorPicker-trigger-height: 27px;
@bl-customComponent-colorPicker-trigger-margin: 3px;
@bl-customComponent-colorPicker-trigger-padding: 5px;
@bl-customComponent-colorPicker-container-margin: 10px;
@bl-customComponent-colorPicker-currentColor-width: 19px;
@bl-customComponent-colorPicker-currentColor-height: 19px;
@bl-customComponent-colorPicker-currentColor-margin: 0 2px;
@bl-customComponent-colorPicker-hexInput-width: 58px;
@bl-customComponent-colorPicker-input-width: 50px;
@bl-customComponent-colorPicker-input-marginLeft: 5px;
````

**Typography**

````
@bl-customComponent-colorPicker-fontSize: 12px;
@bl-customComponent-colorPicker-copyButton-fontSize: 20px;
````

**Decoration**

````
@bl-customComponent-colorPicker-shadowHover: 0px 2px 4px -1px fade(@bl-customComponent-colorPicker-shadowColor, 20%), 0px 4px 5px 0px fade(@bl-customComponent-colorPicker-shadowColor, 14%), 0px 1px 10px 0px fade(@bl-customComponent-colorPicker-shadowColor, 12%);
@bl-customComponent-colorPicker-trigger-borderRadius: 4px;
@bl-customComponent-colorPicker-trigger-border: 1px solid contrast(@bl-customComponent-colorPicker-backgroundColor);
@bl-customComponent-colorPicker-container-border: 1px solid @bl-customComponent-colorPicker-themeColor;
@bl-customComponent-colorPicker-container-borderRadius: 15px;
@bl-customComponent-colorPicker-currentColor-border: 1px solid lighten(@bl-customComponent-colorPicker-themeColor, 30%);
@bl-customComponent-colorPicker-currentColor-borderRadius: 2px;
@bl-customComponent-colorPicker-input-border: 1px solid lighten(@bl-customComponent-colorPicker-themeColor, 30%);
@bl-customComponent-colorPicker-input-borderRadius: 2px;
@bl-customComponent-colorPicker-input-focus-borderColor: lighten(@bl-customComponent-colorPicker-themeColor, 10%);
````
