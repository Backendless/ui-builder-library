# Dashlet

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer.

The component allows you to add dashlet to your UI-Builder application.

## Properties

| Property     | Type                              | Default Value | Logic               | Data Binding | UI Setting | Description                                                                                                             |
|--------------|-----------------------------------|---------------|---------------------|--------------|------------|-------------------------------------------------------------------------------------------------------------------------|
| title        | Text                              |               | Title Logic         | YES          | YES        | Allows to determine the title for dashlet                                                                               |
| styleVariant | Select ["default", "alternative"] | "default"     |                     | NO           | YES        | Allows to determine the variant of style for dashlet                                                                    |
| height       | Number                            | 400           | Height Logic        | YES          | YES        | Allows to determine the height                                                                                          |
| width        | Number                            | 600           | Width Logic         | YES          | YES        | Allows to determine the width                                                                                           |
| resizing     | Checkbox                          | `false`       | Resizing Logic      | YES          | YES        | Allows to determine can resize or can't                                                                                 |
| dragging     | Checkbox                          | `false`       | Dragging Logic      | YES          | YES        | Allows to determine can drag or can't                                                                                   |
| contextBlock | JSON                              | `[]`          | Context Block Logic | YES          | YES        | Allows to determine context block. [Codeless Examples](#examples). Signature of context block: `{type, label, content}` |
| minWidth     | Number                            | 300           | Min Width Logic     | YES          | YES        | Allows to determine min-width                                                                                           |
| maxWidth     | Number                            | 900           | Max Width Logic     | YES          | YES        | Allows to determine max-width                                                                                           |
| minHeight    | Number                            | 300           | Min Height Logic    | YES          | YES        | Allows to determine min-height                                                                                          |
| maxHeight    | Number                            | 900           | Max Height Logic    | YES          | YES        | Allows to determine max-height                                                                                          |

## Events

| Name                  | Triggers                                         | Context Blocks   |
|-----------------------|--------------------------------------------------|------------------|
| Context Block Handler | when user clicks on some action in context block | action: `string` |

## Actions

| Action       | Inputs                                    | Return                                |
|--------------|-------------------------------------------|---------------------------------------|
| Get Position |                                           | { top: `Number`, left: `number`}      |
| Get Size     |                                           | { height: `Number`, width: `Number` } |
| Get Is Open  |                                           | `Bollean`                             |
| Set Position | Position: `{ top: Number left: Number}`   |                                       |
| Set Size     | Size: `{ height: Number, width: Number }` |                                       |
| Set Is Open  | Is Open: `Bollean`                        |                                       |

## Styles


## <a id="examples"></a> Codeless Examples

Addition of context block in UI Setting:

![context block example](example-images/context-block-json.png)

Use context block actions in event Context Block Handler:

![context block actions example](example-images/context-block-handler-logic.png)
