# Dashlet

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer.

The component allows you to add a dashlet to your UI-Builder application.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                                    | Type                                                    | Default Value      | Logic                       | Data Binding | UI Setting | Description                                                                                                                                                                                                  |
|---------------------------------------------|---------------------------------------------------------|--------------------|-----------------------------|--------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Title: `title`                              | Text                                                    |                    | Title Logic                 | YES          | YES        | Allows to determine the title for the dashlet.                                                                                                                                                               |
| Style Variant: `styleVariant`               | Select [Default: `default`, Alternative: `alternative`] | Default: `default` |                             | NO           | YES        | Allows to determine the variety of styles for dashlet.                                                                                                                                                       |
| Height: `height`                            | Number                                                  | 400                | Height Logic                | YES          | YES        | Allows to determine the height.                                                                                                                                                                              |
| Width: `width`                              | Number                                                  | 600                | Width Logic                 | YES          | YES        | Allows to determine the width.                                                                                                                                                                               |
| Local Storage Enabled `localStorageEnabled` | Checkbox                                                | `false`            | Local Storage Enabled Logic | YES          | YES        | Allows to determine whether the state (size, position, closed or open) of a dashlet is allowed to be stored in [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or not. |
| Resizing: `resizing`                        | Checkbox                                                | `false`            | Resizing Logic              | YES          | YES        | Allows to determine whether resizing is allowed or not.                                                                                                                                                      |
| Dragging: `dragging`                        | Checkbox                                                | `false`            | Dragging Logic              | YES          | YES        | Allows to determine whether dragging is allowed or not.                                                                                                                                                      |
| Context Blocks: `contextBlocks`             | JSON                                                    | `[]`               | Context Block Logic         | YES          | YES        | Allows to determine context block. [Codeless Examples](#examples). Signature of context block: `{type, label, content}`.                                                                                     |
| Min Width: `minWidth`                       | Number                                                  | 300                | Min Width Logic             | YES          | YES        | Allows to determine the min-width.                                                                                                                                                                           |
| Max Width: `maxWidth`                       | Number                                                  | 900                | Max Width Logic             | YES          | YES        | Allows to determine the max-width.                                                                                                                                                                           |
| Min Height: `minHeight`                     | Number                                                  | 300                | Min Height Logic            | YES          | YES        | Allows to determine the min-height.                                                                                                                                                                          |
| Max Height: `maxHeight`                     | Number                                                  | 900                | Max Height Logic            | YES          | YES        | Allows to determine the max-height.                                                                                                                                                                          |

## Events

| Name                  | Triggers                                                 | Context Blocks   |
|-----------------------|----------------------------------------------------------|------------------|
| Context Block Handler | when the user clicks on some action in the context block | action: `String` |

## Actions

| Action       | Inputs                                    | Return                                |
|--------------|-------------------------------------------|---------------------------------------|
| Get Position |                                           | { x: `Number`, y: `Number`}           |
| Get Size     |                                           | { height: `Number`, width: `Number` } |
| Get Is Open  |                                           | `Bollean`                             |
| Set Position | Position: `{ x: Number y: Number}`        |                                       |
| Set Size     | Size: `{ height: Number, width: Number }` |                                       |
| Set Is Open  | Is Open: `Bollean`                        |                                       |

## Styles

**Default**

```
@bl-customComponent-dashlet-background-color: @appBackgroundColor;

@bl-customComponent-dashlet-text-color: @appTextColor;
@bl-customComponent-dashlet-context-block-icon-size: 15px;
@bl-customComponent-dashlet-context-block-item-icon-size: 12px;
@bl-customComponent-dashlet-context-block-item-background-hover: @themePrimary;

@bl-customComponent-dashlet-border-padding: 5px;
@bl-customComponent-dashlet-border-radius: 4px;
@bl-customComponent-dashlet-close-border-radius: 5px;
@bl-customComponent-dashlet-border-color: if((@isLightTheme), rgba(0, 0, 0, 0.12), rgba(255, 255, 255, 0.12));
@bl-customComponent-dashlet-border: 1px solid @bl-customComponent-dashlet-border-color;

@bl-customComponent-dashlet-body-background-color: if((@isLightTheme), darken(@bl-customComponent-dashlet-background-color, 7%), lighten(@bl-customComponent-dashlet-background-color, 7%));
@bl-customComponent-dashlet-body-border-top-left-radius: 0;
@bl-customComponent-dashlet-body-border-top-right-radius: 0;
@bl-customComponent-dashlet-body-overflow: auto;

@bl-customComponent-dashlet-resize-icon-size: 20px;
@bl-customComponent-dashlet-collapse-icon-size: 20px;

@bl-customComponent-dashlet-header-height: 25px;
@bl-customComponent-dashlet-header-dragging-cursor: move;

@bl-customComponent-dashlet-title-margin: 0 0 0 5px;
```

**Alternative**

```
@bl-customComponent-dashlet-alternative-padding: 0;

@bl-customComponent-dashlet-header-alternative-height: 35px;
@bl-customComponent-dashlet-header-alternative-background-color: @themePrimary;
@bl-customComponent-dashlet-header-alternative-padding: 0 10px;

@bl-customComponent-dashlet-title-alternative-text-color: contrast(@themePrimary);
```

## <a id="examples"></a> Codeless Examples

Addition of context block in UI Setting:

![context block example](./example-images/context-block-json.jpg)

<details>
<summary>Try yourself</summary>

```
[
  {
    "type": "action",
    "label": "Fixed",
    "content": "fixed"
  },
  {
    "type": "action",
    "label": "Delete",
    "content": "delete"
  },
  {
    "type": "link",
    "label": "Some Link",
    "content": "someLink"
  }
]
```

</details>

Use context block actions in event Context Block Handler:

![context block actions example](example-images/context-block-handler-logic.jpg)

<details>
<summary>Try yourself</summary>

```
<block xmlns="http://www.w3.org/1999/xhtml" type="controls_if" id="MfysFcoD)zFID2+f08c6" x="289" y="161"><value name="IF0"><block type="logic_compare" id="}cx1l/;Txf=2K0H;q,K$"><field name="OP">EQ</field><value name="A"><block type="text" id="xE/kr1mqy1r`+^xv976c"><field name="TEXT">fixed</field></block></value><value name="B"><block type="root_block_ui_builder_c_34e78b2552953123061c9cf949366d5b_contextBlocksHandler_handler_context_blocks_action" id="BT3W*Q~)?f^;IpI+fe)]" bl_meta="{&quot;label&quot;:&quot;action&quot;}"></block></value></block></value><statement name="DO0"><block type="set_object_property" id="OY^G;uZRH(o5)iKu3W1~"><value name="object"><block type="root_block_ui_builder_common__context_blocks_pageData" id="+M14Zh`|;lo#.uy?tby+" bl_meta="{&quot;label&quot;:&quot;Page Data&quot;}"></block></value><value name="propName"><shadow type="text" id="f%GB_a8W$pCCLqQvA$-,"><field name="TEXT">isDashletFixed</field></shadow></value><value name="propValue"><block type="logic_boolean" id="@7mr.#nt+8f?Z]f$`%bu"><field name="BOOL">TRUE</field></block></value></block></statement></block>
```

```
<block xmlns="http://www.w3.org/1999/xhtml" type="controls_if" id="-TsC!npk=K8C77{%XQz%" x="289" y="288"><value name="IF0"><block type="logic_compare" id="4]a+dML=ik~OQ;YywceW"><field name="OP">EQ</field><value name="A"><block type="text" id="VV8EFgxbEW!z}fU%~^|l"><field name="TEXT">delete</field></block></value><value name="B"><block type="root_block_ui_builder_c_34e78b2552953123061c9cf949366d5b_contextBlocksHandler_handler_context_blocks_action" id="vmW:mf:GN=j0Tu(@1YKi" bl_meta="{&quot;label&quot;:&quot;action&quot;}"></block></value></block></value><statement name="DO0"><block type="ui_common_blocks__toggle_component_visibility" id="J0Il}xZ{NaNCVS$b%1[z" bl_meta="{&quot;label&quot;:&quot;Toggle component visibility&quot;}"><field name="componentUid">'5fbe6578603550475a51195800a15938'</field><value name="visible"><block type="logic_boolean" id=".fAZ6(R=*T$Bd@Me6y,l"><field name="BOOL">FALSE</field></block></value></block></statement></block>
```

</details>
