# Avatar

Avatar is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It provides
a graphical representation used to identify users or entities within an application's interface.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                             | Type                                                | Default value                       | Logic           | Data Binding  | UI Setting | Description                                                   |
|--------------------------------------|-----------------------------------------------------|-------------------------------------|-----------------|---------------|------------|---------------------------------------------------------------|
| Image URL <br> `imageUrl`            | *Text*                                              |                                     | Image URL Logic | YES           | YES        | Specifies the source URL for the avatar image.                |
| Shape <br> `shape`                   | *Select* <br/> "Default" \| "Circle" \| "Square"    | "Default"                           |                 | NO            | YES        | Defines the shape of the avatar container.                    |
| Width <br> `width`                   | *Number*                                            | 150                                 |                 | NO            | YES        | Controls the width of the avatar container.                   |
| Height <br> `height`                 | *Number*                                            | 150                                 |                 | NO            | YES        | Controls the height of the avatar container.                  |
| Smart Image Fit <br> `smartImageFit` | *Select* <br/> "Unset" \| "Center" \| "Orientation" | "Center"                            |                 | NO            | YES        | Displays the image according to its height and width.         |
| Empty Label <br> `emptyLabel`        | *Text*                                              | "You can choose an image..."        |                 | NO            | YES        | Specifies the label content when the source is not set.       |
| Change Label <br> `changeLabel`      | *Text*                                              | "Do you want to change this image?" |                 | NO            | YES        | Specifies the label content when there is a valid source set. |
| Alt <br> `alt`                       | *Text*                                              | "Avatar"                            |                 | NO            | YES        | Specifies an alternative text description of the image.       |
| Read Only <br> `readOnly`            | *Checkbox*                                          | `false`                             | Read Only Logic | NO            | YES        | Enables read-only image in the avatar.                        |

## Events

| Name            | Triggers                                    | Context Blocks         |
|-----------------|---------------------------------------------|------------------------|
| On Change Event | when an avatar image is changed             | Image Source: `String` |
| On Upload Event | when an image file is selected for upload   | Selected File: `Blob`  |
| On Error Event  | when an error occurred on loading the image |                        |

## Actions

| Action                   | Inputs | Returns |
|--------------------------|--------|---------|
| Remove Image from Avatar |        |         |
| Upload Image to Avatar   |        |         |


## Styles

**General**

````
@bl-customComponent-avatar-backgroundColor: rgba(128, 128, 128, 0.486);
@bl-customComponent-avatar-label-color: #FFFFFF;
@bl-customComponent-avatar-label-backgroundColor: rgba(128, 128, 128, 0.486);
@bl-customComponent-avatar-label-hover-backgroundColor: rgba(71, 71, 71, 0.74);
@bl-customComponent-avatar-label-userSelect: none;
````

**Dimensions**

````
@bl-customComponent-avatar-label-margin: 0;
@bl-customComponent-avatar-label-width: 100%;
@bl-customComponent-avatar-label-height: 100%;
````

**Decoration**

````
@bl-customComponent-avatar-borderRadius: 10px;
@bl-customComponent-avatar-circle-borderRadius: 50%;
@bl-customComponent-avatar-square-borderRadius: 0;
````
