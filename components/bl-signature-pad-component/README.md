# Signature Pad

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [signature_pad](https://github.com/szimek/signature_pad) library post by [Szymon Nowak](https://github.com/szimek).

The component allows to draw smooth signatures and save them for later usage. A user can pick up any color for a drawing pen. Also, the component has features for exporting signatures as images in different formats. The action buttons are configurable, and thus you can adjust their visibility and labels.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="420"/>
</p>

## Properties

| Property                         | Type       | Default value  | Logic                                  | Data Binding | UI Setting | Description                                         |
|----------------------------------|------------|----------------|----------------------------------------|--------------|------------|-----------------------------------------------------|
| Pen Color                        | *Color*    |                | Pen Color Logic                        | YES          | YES        | controls the color used to draw the lines           |
| Description                      | *Text*     | Sign Above     | Description Logic                      | YES          | YES        | controls the description for the signature pad      |
| Change Color Button Visibility   | *Checkbox* | true           |                                        | NO           | YES        | enables the visibility of the Change Color button   |
| Save PNG Button Visibility       | *Checkbox* | true           | Save PNG Button Visibility Logic       | YES          | YES        | enables the visibility of the Save PNG button       |
| Save JPG Button Visibility       | *Checkbox* | true           | Save JPG Button Visibility Logic       | YES          | YES        | enables the visibility of the Save JPG button       |
| Save SVG Button Visibility       | *Checkbox* | true           | Save SVG Button Visibility Logic       | YES          | YES        | enables the visibility of the Save SVG button       |
| Save Signature Button Visibility | *Checkbox* | false          | Save Signature Button Visibility Logic | YES          | YES        | enables the visibility of the Save Signature button |
| Clear Button Label               | *Text*     | Clear          |                                        | NO           | YES        | controls the label of the Clear button              |
| Change Color Button Label        | *Text*     | Change Color   |                                        | NO           | YES        | controls the label of the Change Color button       |
| Undo Button Label                | *Text*     | Undo           |                                        | NO           | YES        | controls the label of the Undo button               |
| Save PNG Button Label            | *Text*     | Save as PNG    |                                        | NO           | YES        | controls the label of the Save PNG button           |
| Save JPG Button Label            | *Text*     | Save as JPG    |                                        | NO           | YES        | controls the label of the Save JPG button           |
| Save SVG Button Label            | *Text*     | Save as SVG    |                                        | NO           | YES        | controls the label of the Save SVG button           |
| Save Signature Button Label      | *Text*     | Save Signature |                                        | NO           | YES        | controls the label of the Save Signature button     |

## Events

| Name                          | Triggers                                                       | Context Blocks |
|-------------------------------|----------------------------------------------------------------|----------------|
| On Clear Click Event          | when a user click on the Clear button                          |                |
| On Undo Click Event           | when a user click on the Undo button                           |                |
| On Change Color Event         | when a user change the pen color                               | Color          |
| On Save Click Event           | when a user click on the Save PNG, Save JPG or Save SVG button |                |
| On Save Signature Click Event | when a user click on the Save Signature button                 | Signature Blob |
| On Mouse Over Event           | when the mouse pointer hovers over the drawing area            |                |
| On Mouse Out Event            | when the mouse pointer leaves the drawing area boundaries      |                |

## Styles

**Theme**

````
@bl-customComponent-signaturePad-themeColor: @themePrimary;
@bl-customComponent-signaturePad-backgroundColor: @appBackgroundColor;
@bl-customComponent-signaturePad-textColor: @appTextColor;
@bl-customComponent-signaturePad-disabledColor: @disabledColor;
@bl-customComponent-signaturePad-blockBorder: @appBlockBorder;
@bl-customComponent-signaturePad-borderRadius: @appComponentBorderRadius;
@bl-customComponent-signaturePad-borderWidth: @appComponentBorderWidth/2;
````

**General**

````
@bl-customComponent-signaturePad-button-color: contrast(@bl-customComponent-signaturePad-button-background);
@bl-customComponent-signaturePad-button-disabledColor: contrast(@bl-customComponent-signaturePad-button-disabledBackground);
@bl-customComponent-signaturePad-button-clearButton-color: @bl-customComponent-signaturePad-button-color;
@bl-customComponent-signaturePad-button-clearButton-disabledColor: @bl-customComponent-signaturePad-button-disabledColor;
@bl-customComponent-signaturePad-button-changeColorButton-color: @bl-customComponent-signaturePad-button-color;
@bl-customComponent-signaturePad-button-changeColorButton-disabledColor: @bl-customComponent-signaturePad-button-disabledColor;
@bl-customComponent-signaturePad-button-undoButton-color: @bl-customComponent-signaturePad-button-color;
@bl-customComponent-signaturePad-button-undoButton-disabledColor: @bl-customComponent-signaturePad-button-disabledColor;
@bl-customComponent-signaturePad-button-saveJpgButton-color: @bl-customComponent-signaturePad-button-color;
@bl-customComponent-signaturePad-button-saveJpgButton-disabledColor: @bl-customComponent-signaturePad-button-disabledColor;
@bl-customComponent-signaturePad-button-savePngButton-color: @bl-customComponent-signaturePad-button-color;
@bl-customComponent-signaturePad-button-savePngButton-disabledColor: @bl-customComponent-signaturePad-button-disabledColor;
@bl-customComponent-signaturePad-button-saveSvgButton-color: @bl-customComponent-signaturePad-button-color;
@bl-customComponent-signaturePad-button-saveSvgButton-disabledColor: @bl-customComponent-signaturePad-button-disabledColor;
@bl-customComponent-signaturePad-button-saveSignatureButton-color: @bl-customComponent-signaturePad-button-color;
@bl-customComponent-signaturePad-button-saveSignatureButton-disabledColor: @bl-customComponent-signaturePad-button-disabledColor;
````

**Background**

````
@bl-customComponent-signaturePad-button-background: @bl-customComponent-signaturePad-themeColor;
@bl-customComponent-signaturePad-button-disabledBackground: @bl-customComponent-signaturePad-disabledColor;
@bl-customComponent-signaturePad-button-clearButton-background: @bl-customComponent-signaturePad-button-background;
@bl-customComponent-signaturePad-button-clearButton-disabledBackground: @bl-customComponent-signaturePad-button-disabledBackground;
@bl-customComponent-signaturePad-button-changeColorButton-background: @bl-customComponent-signaturePad-button-background;
@bl-customComponent-signaturePad-button-changeColorButton-disabledBackground: @bl-customComponent-signaturePad-button-disabledBackground;
@bl-customComponent-signaturePad-button-undoButton-background: @bl-customComponent-signaturePad-button-background;
@bl-customComponent-signaturePad-button-undoButton-disabledBackground: @bl-customComponent-signaturePad-button-disabledBackground;
@bl-customComponent-signaturePad-button-saveJpgButton-background: @bl-customComponent-signaturePad-button-background;
@bl-customComponent-signaturePad-button-saveJpgButton-disabledBackground: @bl-customComponent-signaturePad-button-disabledBackground;
@bl-customComponent-signaturePad-button-savePngButton-background: @bl-customComponent-signaturePad-button-background;
@bl-customComponent-signaturePad-button-savePngButton-disabledBackground: @bl-customComponent-signaturePad-button-disabledBackground;
@bl-customComponent-signaturePad-button-saveSvgButton-background: @bl-customComponent-signaturePad-button-background;
@bl-customComponent-signaturePad-button-saveSvgButton-disabledBackground: @bl-customComponent-signaturePad-button-disabledBackground;
@bl-customComponent-signaturePad-button-saveSignatureButton-background: @bl-customComponent-signaturePad-button-background;
@bl-customComponent-signaturePad-button-saveSignatureButton-disabledBackground: @bl-customComponent-signaturePad-button-disabledBackground;
````

**Dimensions**

````
@bl-customComponent-signaturePad-width: 100%;
@bl-customComponent-signaturePad-height: 100%;
@bl-customComponent-signaturePad-canvas-width: 100%;
@bl-customComponent-signaturePad-canvas-height: 100%;
@bl-customComponent-signaturePad-description-margin: 8px 0;
@bl-customComponent-signaturePad-button-margin: 2px;
@bl-customComponent-signaturePad-button-padding: 6px 16px;
````

**Typography**

````
@bl-customComponent-signaturePad-fontSize: 12px;
````

**Decoration**

````
@bl-customComponent-signaturePad-borderType: solid;
@bl-customComponent-signaturePad-borderColor: contrast(@bl-customComponent-signaturePad-backgroundColor);
@bl-customComponent-signaturePad-button-shadowColor: @appComponentShadowColor;
@bl-customComponent-signaturePad-button-shadowHover: 0px 2px 4px -1px fade(@bl-customComponent-signaturePad-button-shadowColor, 20%), 0px 4px 5px 0px fade(@bl-customComponent-signaturePad-button-shadowColor, 14%), 0px 1px 10px 0px fade(@bl-customComponent-signaturePad-button-shadowColor, 12%);
@bl-customComponent-signaturePad-button-shadowDisabled: none;
@bl-customComponent-signaturePad-button-clearButton-shadowHover: @bl-customComponent-signaturePad-button-shadowHover;
@bl-customComponent-signaturePad-button-changeColorButton-shadowHover: @bl-customComponent-signaturePad-button-shadowHover;
@bl-customComponent-signaturePad-button-undoButton-shadowHover: @bl-customComponent-signaturePad-button-shadowHover;
@bl-customComponent-signaturePad-button-saveJpgButton-shadowHover: @bl-customComponent-signaturePad-button-shadowHover;
@bl-customComponent-signaturePad-button-savePngButton-shadowHover: @bl-customComponent-signaturePad-button-shadowHover;
@bl-customComponent-signaturePad-button-saveSvgButton-shadowHover: @bl-customComponent-signaturePad-button-shadowHover;
@bl-customComponent-signaturePad-button-saveSignatureButton-shadowHover: @bl-customComponent-signaturePad-button-shadowHover;
````
