# Rich Editor

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the
[Quill](https://quilljs.com/) library.

The component allows rich text editing and presents the user with a WYSIWYG editing area in your application.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property            | Type                                                                                                                 | Default value        | Logic           | Data Binding | UI Setting | Description                                 |
|---------------------|----------------------------------------------------------------------------------------------------------------------|----------------------|-----------------|--------------|------------|---------------------------------------------|
| Content             | *Text*                                                                                                               |                      | Content Logic   | YES          | YES        | controls the content of the editor          |
| Placeholder         | *Text*                                                                                                               | "Compose an epic..." |                 | NO           | YES        | controls the placeholder of the editor      |
| Toolbar Position    | *Select*  <br/> "top" \| "bottom"                                                                                    | "top"                |                 | NO           | YES        | controls the position of the editor toolbar |
| Fixed Toolbar       | *Checkbox*                                                                                                           | `true`               |                 | NO           | YES        | enables fixing the toolbar                  |
| Show Tooltips       | *Checkbox*                                                                                                           | `true`               |                 | NO           | YES        | enables tooltips on the toolbar buttons     |
| Link Insert Button  | *Checkbox*                                                                                                           | `true`               |                 | NO           | YES        | enables inserting a link in the editor      |
| Image Insert Button | *Checkbox*                                                                                                           | `true`               |                 | NO           | YES        | enables inserting an image in the editor    |
| Video Insert Button | *Checkbox*                                                                                                           | `true`               |                 | NO           | YES        | enables inserting a video in the editor     |
| Read Only           | *Checkbox*                                                                                                           | `false`              | Read Only Logic | NO           | YES        | enables read-only content in the editor     |
| Editor Height       | *Text*                                                                                                               |                      |                 | NO           | YES        | controls the height of the editor           |
| Editor Min Height   | *Text*                                                                                                               |                      |                 | NO           | YES        | controls the minimal height of the editor   |
| Border Width        | *Text*                                                                                                               | "1px"                |                 | NO           | YES        | controls the width of the editor border     |
| Border Style        | *Select* <br/> "none" \| "solid" \| "dotted" \| "dashed" \| "double" \| "groove" \| "ridge" \| "inset" \| "outset"   | "solid"              |                 | NO           | YES        | controls the style of the editor border     |
| Border Color        | *Color*                                                                                                              |                      |                 | NO           | YES        | controls the color of the editor border     |

## Events

| Name                | Triggers                                         | Context Blocks                             |
|---------------------|--------------------------------------------------|--------------------------------------------|
| On Focus Event      | when the editor receives the focus               |                                            |
| On Blur Event       | when the editor loses the focus                  |                                            |
| On Text Change      | when the user changes the contents of the editor |                                            |

## Actions

| Action                               | Inputs                            | Returns                               | Description                                                             |
|--------------------------------------|-----------------------------------|---------------------------------------|-------------------------------------------------------------------------|
| Get Text from Rich Editor            | Index: `Number`, Length: `Number` | `String`                              | retrieves the string contents of the editor                             |
| Set Text for Rich Editor             | Text: `String`                    |                                       | sets the contents of an editor with the given text                      |
| Get HTML from Rich Editor            |                                   | `String`                              | retrieves the full HTML contents of the editor                          |
| Set HTML for Rich Editor             | Content: `String`                 |                                       | inserts content represented by HTML snippet                             |
| Get Selection Range from Rich Editor |                                   | { Index: `Number`, Length: `Number` } | returns the current selection range, or null if the editor is unfocused |
| Set Selection Range in Rich Editor   | Index: `Number`, Length: `Number` |                                       | sets the user selection to the given range                              |
| Get Length Property from Rich Editor |                                   | `Number`                              | retrieves the length of the editor contents                             |
| Delete Text from Rich Editor         | Index: `Number`, Length: `Number` |                                       | deletes text from the editor                                            |
| Format Rich Editor                   | Property: `String`, Value: any    |                                       | format text in the user’s current selection                             |
| Blur Rich Editor                     |                                   |                                       | removes focus from the editor                                           |
| Focus Rich Editor                    |                                   |                                       | focuses the editor and restores its last range                          |

## Styles

**Theme**

````
@bl-customComponent-richEditor-themeColor: @themePrimary;
@bl-customComponent-richEditor-backgroundColor: @appBackgroundColor;
@bl-customComponent-richEditor-textColor: @appTextColor;
@bl-customComponent-richEditor-disabledColor: @disabledColor;
````

**General**

````
@bl-customComponent-richEditor-button-color: @bl-customComponent-richEditor-themeColor;
@bl-customComponent-richEditor-editor-placeholder-color: fade(@bl-customComponent-richEditor-textColor, 60%);
@bl-customComponent-richEditor-toolbar-tooltip-backgroundColor: #000000;
@bl-customComponent-richEditor-toolbar-tooltip-textColor: #ffffff;
@bl-customComponent-richEditor-toolbar-tooltip-position-bottom: -120%;
@bl-customComponent-richEditor-toolbar-tooltip-position-left: -5px;
@bl-customComponent-richEditor-toolbar-tooltip-zIndex: 9999;
````

**Dimensions**

````
@bl-customComponent-richEditor-editor-image-width: auto;
@bl-customComponent-richEditor-editor-image-height: auto;
@bl-customComponent-richEditor-editor-video-width: auto;
@bl-customComponent-richEditor-editor-video-height: auto;
@bl-customComponent-richEditor-editor-height: auto;
@bl-customComponent-richEditor-toolbar-fontPicker-label-paddingRight: 18px;
@bl-customComponent-richEditor-toolbar-tooltip-padding: 0.5em;
````

**Typography**

````
@bl-customComponent-richEditor-editor-fontSize: 14px;
@bl-customComponent-richEditor-editor-fontFamily: Arial, sans-serif;
@bl-customComponent-richEditor-toolbar-tooltip-fontSize: 12px;
````

**Decoration**

````
@bl-customComponent-richEditor-editor-borderWidth: 0px;
@bl-customComponent-richEditor-toolbar-borderWidth: 0px;
@bl-customComponent-richEditor-borderWidth: 0px;
@bl-customComponent-richEditor-borderStyle: solid;
@bl-customComponent-richEditor-borderColor: #ccc;
@bl-customComponent-richEditor-border: @bl-customComponent-richEditor-borderWidth @bl-customComponent-richEditor-borderStyle @bl-customComponent-richEditor-borderColor;
@bl-customComponent-richEditor-toolbar-defaultContent-fontSize: "14px";
@bl-customComponent-richEditor-toolbar-defaultContent-font: "Arial";
@bl-customComponent-richEditor-toolbar-tooltip-borderRadius: 0.4em;
````

**Tooltips**

````
@bl-customComponent-richEditor-toolbar-tooltip-bold: "Bold";
@bl-customComponent-richEditor-toolbar-tooltip-italic: "Italic";
@bl-customComponent-richEditor-toolbar-tooltip-underline: "Underline";
@bl-customComponent-richEditor-toolbar-tooltip-strike: "Strikethrough";
@bl-customComponent-richEditor-toolbar-tooltip-redo: "Redo";
@bl-customComponent-richEditor-toolbar-tooltip-undo: "Undo";
@bl-customComponent-richEditor-toolbar-tooltip-font: "Font";
@bl-customComponent-richEditor-toolbar-tooltip-size: "Font size";
@bl-customComponent-richEditor-toolbar-tooltip-color: "Text color";
@bl-customComponent-richEditor-toolbar-tooltip-background: "Background color";
@bl-customComponent-richEditor-toolbar-tooltip-left: "Left align";
@bl-customComponent-richEditor-toolbar-tooltip-center: "Center align";
@bl-customComponent-richEditor-toolbar-tooltip-right: "Right align";
@bl-customComponent-richEditor-toolbar-tooltip-justify: "Justify";
@bl-customComponent-richEditor-toolbar-tooltip-link: "Insert link";
@bl-customComponent-richEditor-toolbar-tooltip-image: "Insert image";
@bl-customComponent-richEditor-toolbar-tooltip-video: "Insert video";
@bl-customComponent-richEditor-toolbar-tooltip-list-ordered: "Numbered list";
@bl-customComponent-richEditor-toolbar-tooltip-list-bullet: "Bulleted list";
@bl-customComponent-richEditor-toolbar-tooltip-heading-1: "Heading 1";
@bl-customComponent-richEditor-toolbar-tooltip-heading-2: "Heading 2";
@bl-customComponent-richEditor-toolbar-tooltip-blockquote: "Quote";
@bl-customComponent-richEditor-toolbar-tooltip-code-block: "Code";
@bl-customComponent-richEditor-toolbar-tooltip-script-sub: "Subscript";
@bl-customComponent-richEditor-toolbar-tooltip-script-super: "Superscript";
@bl-customComponent-richEditor-toolbar-tooltip-direction: "Text direction";
@bl-customComponent-richEditor-toolbar-tooltip-clean: "Clear formatting";
````
