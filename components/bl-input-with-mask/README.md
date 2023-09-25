# Input with Mask

Input with Mask is a component of Backendless UI-Builder designer. This allows you to add input with mask.

This component is based on an external library [imask.js](https://github.com/uNmAnNeR/imaskjs)

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                                   | Type                                                                                                      | Default Value        | Logic                      | Data Binding | UI Setting | Description                                                                                                                                                                                                                                               |
|--------------------------------------------|-----------------------------------------------------------------------------------------------------------|----------------------|----------------------------|--------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Value: `initValue`                         | Text                                                                                                      |                      | Value Logic                | YES          | YES        | Allows to determine the initial value of the input field.                                                                                                                                                                                                 |
| Mask Type: `maskType`                      | Select [Number: `Number`, String: `String`, RegExp: `RegExp`, Enum: `Enum`, Range: `Range`, Date: `Date`] | Number: `Number`     | Mask Type Logic            | NO           | YES        | Allows select type of mask(Number, String, RegExp).                                                                                                                                                                                                       |
| Mask: `mask`                               | Text                                                                                                      |                      |                            | YES          | YES        | Allows to specify the mask. 0 - any digit; a - any letter; * - any char. Or you can write RegExp.                                                                                                                                                         |
| Enum: `maskEnum`                           | Text                                                                                                      |                      | Enum Logic                 | YES          | YES        | Allows to determine the list of strings that are enabled to write in the input field.                                                                                                                                                                     |
| Date Format: `dateFormat`                  | Text                                                                                                      | "DD/MM/YYYY"         | Date Format Logic          | YES          | YES        | Allows to determine the format of date when the Mask Type is Date.                                                                                                                                                                                        |
| Dynamic Mask: `dynamicMask`                | Json                                                                                                      |                      | Dynamic Mask Logic         | YES          | YES        | Allows to determine the array of masks. Dynamic mask automatically selects the appropriate mask from a provided array of masks. The mask with the largest number of fitting characters is selected considering the provided mask order.                   |
| Blocks: `blocks`                           | Json                                                                                                      |                      | Blocks Logic               | YES          | YES        | Allows to determine the nested masks.                                                                                                                                                                                                                     |
| Definitions: `definitions`                 | JSON                                                                                                      |                      | Definitions Logic          | YES          | YES        | Allows to provide custom mask definitions such as default "0", "a", and "*". Signature of data where X is any single char: `{ X: { mask: string, displayChar: string, placeholderChar: string } }`                                                        |
| Display Char: `displayChar`                | Text                                                                                                      |                      | Display Char Logic         | YES          | YES        | Allows to determine the character that will be displayed instead of the entered character.                                                                                                                                                                |
| Placeholder Char: `placeholderChar`        | Text                                                                                                      | "_"                  | Placeholder Char Logic     | YES          | YES        | Allows to specify placeholder char. If it is left empty, the default value will be `_`.                                                                                                                                                                   |
| Placeholder: `placeholder`                 | Text                                                                                                      |                      |                            | YES          | YES        | Allows to specify placeholder.                                                                                                                                                                                                                            |
| Min: `min`                                 | Text                                                                                                      |                      | Min Logic                  | YES          | YES        | Allows to determine the min number that can be input                                                                                                                                                                                                      |
| Max: `max`                                 | Text                                                                                                      |                      | Max Logic                  | YES          | YES        | Allows to determine the max number that can be input.                                                                                                                                                                                                     |
| From: `from`                               | Number                                                                                                    |                      | From Logic                 | YES          | YES        | Allows to determine the number from which you can input in the field when MaskType has a value of Range.                                                                                                                                                  |
| To: `to`                                   | Number                                                                                                    |                      | To Logic                   | YES          | YES        | Allows to determine the number to which you can enter in the field when MaskType has a value of Range.                                                                                                                                                    |
| Thousands Separator: `thousandsSeparator`  | Text                                                                                                      |                      | Thousands Separator Logic  | YES          | YES        | Allows to determine the thousands separator.                                                                                                                                                                                                              |
| Normalize Zeros: `normalizeZeros`          | Checkbox                                                                                                  | `true`               | Normalize Zeros Logic      | YES          | YES        | Allows to determine if the redundant zeros should be removed at the ends.                                                                                                                                                                                 |
| Scale of Number: `scaleNumber`             | Number                                                                                                    | 2                    | Scale of Number Logic      | YES          | YES        | Allows to determine the count of numbers after the comma.                                                                                                                                                                                                 |
| Radix: `radix`                             | Text                                                                                                      | ","                  | Radix Logic                | YES          | YES        | Allows to determine the separator of a float number.                                                                                                                                                                                                      |
| Map to Radix: `mapToRadix`                 | Text                                                                                                      |                      | Map to Radix Logic         | YES          | YES        | Allows to determine the symbols to process as radix.                                                                                                                                                                                                      |
| Pad Fractional Zeros: `padFractionalZeros` | Checkbox                                                                                                  | `false`              | Pad Fractional Zeros Logic | YES          | YES        | Allows to determine if the fractional zeros should be added.                                                                                                                                                                                              |
| Lazy: `lazy`                               | Checkbox                                                                                                  | `false`              |                            | NO           | YES        | Allows to specify lazy or not lazy. Lazy it's when the input doesn't display the template of the mask. For example, Mask: `000 000 000`, Placeholder Char: `_`, Lazy: `checked` input will be empty, but if Lazy: `unchecked` input will be `___ ___ ___` |
| Overwrite: `overwrite`                     | Select [No: `no`, Yes: `yes`, Shift: `shift`]                                                             | No: `no`             | Overwrite Logic            | YES          | YES        | Allows to determine whether to enable or disable character overwriting (replacement or offset) instead of insertion.                                                                                                                                      |
| Eager: `eager`                             | Select [No: `no`, Yes: `yes`, Append: `append`, Remove: `remove`]                                         | No: `no`             | Eager Logic                | NO           | YES        | Allows to determine how to behave around undefined mask characters.                                                                                                                                                                                       |
| Autofix: `autofix`                         | Select [No: `no`, Yes: `yes`, Pad: `pad`]                                                                 | No: `no`             | Autofix Logic              | YES          | YES        | Allows to determine if the auto-fix should be.                                                                                                                                                                                                            |
| Skip Invalid: `skipInvalid`                | Checkbox                                                                                                  | `false`              | Skip Invalid Logic         | YES          | YES        | Allows to determine if the invalid value should be skipped.                                                                                                                                                                                               |
| Variant: `variant`                         | Select [Standard: `standard`, Filled: `filled`, Outline: `outline`]                                       | Standard: `standard` | Variant Logic              | YES          | YES        | Allows to choose one of three style variants - outlined, standard, or filled.                                                                                                                                                                             |

## Events

| Name                | Triggers                                                                                                                     | Context Blocks  | Return   |
|---------------------|------------------------------------------------------------------------------------------------------------------------------|-----------------|----------|
| On Change Value     | when the component's state (value) changes.                                                                                  | `value: string` |          |
| On Validate         | before the component value changes. Using this event we can additionally ourself check and modify each symbol that we input. | `value: string` | `string` |
| On Complete         | when the value is completely filled. This makes sense only for custom masks.                                                 | `value: string` |          |
| On Focus Event      | when the component receives the focus for data entry or by pressing the TAB key.                                             | `event`         |          |
| On Lost Focus Event | when the component loses focus.                                                                                              | `event`         |          |
| On Mouse Enter      | when the Mouse Enters the component.                                                                                         | `event`         |          |
| On Mouse Leave      | when the mouse leaves the component.                                                                                         | `event`         |          |

## Mask Example

`0` - any digit
`a` - any letter
`*` - any char

`[]` - make input optional

If definition character should be treated as fixed it should be escaped by ` \ `

| Mask                    | Input                                     |
|-------------------------|-------------------------------------------|
| `+1 (000) 000-0000`     | `+1 (555) 555-1234`                       |
| `000-aaa-000-aaa`       | `254-jle-634-lji`                         |
| `****/****/****`        | `jie./kao4/1f?.`                          |
| `aaaa aaaa aaaa [aaaa]` | `JLKI HUER LAGI` or `JLKI HUER LAGI OIUK` |
| `+38\0 (00) 000 0000`   | `+380 (85) 547 8653`                      |

## Usage guide

1. Add component Input with Mask to page:

    <img src="./example-images/add-on-page.jpg" alt="add on page" />

2. Now you can see result in the preview. You can input only Number:

    <img src="./example-images/first-result.jpg" alt="first result" />

3. In the "On Validate" event, we can further validate each character before changing the value of the component. Just
   return a valid value or null. For example, if we enter "i" or "I" they will not be written to the input value, other
   values will be written in upper case:

    <img src="./example-images/on-validate-ui-settings.jpg" alt="onValidate logic" />
    <img src="./example-images/on-validate-logic.jpg" alt="onValidate logic" />

    <details>
    <summary>Try yourself</summary>

    ```
    <block xmlns="http://www.w3.org/1999/xhtml" type="controls_if" id="?)?aPQEB,7Ee]yox$:A;" x="122" y="253"><value name="IF0"><block type="list_contains" id="SHZu0mC9rAnu:2iy628~"><value name="list"><block type="lists_create_with" id="B,RSxW49Rdh%pr-U_M#k"><mutation items="2"></mutation><value name="ADD0"><block type="text" id="vB9v0nd^(#auwN.~Bzdk"><field name="TEXT">i</field></block></value><value name="ADD1"><block type="text" id="Q:fF;W(}/|jnOCigz?fo"><field name="TEXT">I</field></block></value></block></value><value name="item"><block type="root_block_ui_builder_c_7b75bce61a728dc952497ba8409da7b1_onValidate_handler_context_blocks_value" id="(F8de,7NDhzBG#-/VwEf" bl_meta="{&quot;label&quot;:&quot;Value&quot;}"></block></value></block></value><statement name="DO0"><block type="immediate_return" id="TvZyLsOZaGSCCi%n=/;y"><value name="value"><block type="logic_null" id="ezE,YMxp.2e]CCFeYfuE"></block></value></block></statement></block>
    ```

   return:
    ```
    <block xmlns="http://www.w3.org/1999/xhtml" type="text_changeCase" id="1*-3ZF!c%gq6*mnU=$4_" x="205.55555725097656" y="355"><field name="CASE">UPPERCASE</field><value name="TEXT"><shadow type="text" id="t=_6?b1`ukO5vEab:L[;"><field name="TEXT">abc</field></shadow><block type="root_block_ui_builder_c_7b75bce61a728dc952497ba8409da7b1_onValidate_handler_context_blocks_value" id="ER]yx.}GWfC53i,8}m$s" bl_meta="{&quot;label&quot;:&quot;Value&quot;}"></block></value></block>
    ```
    </details>

    <img src="example-images/on-validate-result.jpg" alt="onValidate logic" />


4. Also, you can add a custom mask to the UI Setting property Mask:

    <img src="./example-images/phone-number-mask.jpg" alt="phone number mask" />
    <img src="./example-images/phone-number-mask-result.jpg" alt="phone number mask result" />

5. And you can create custom definitions of mask with UI Setting property Definitions:

    <img src="./example-images/mask-with-definitions.jpg" alt="mask with definitions" />
    <img src="./example-images/definitions.jpg" alt="definitions" />

   <details>
   <summary>Try yourself</summary>

    ```
    {
      "#": {
        "mask": "0",
        "displayChar": "#",
        "placeholderChar": "_"
      }
    }
    ```

    </details>

    <img src="./example-images/definitions-result.jpg" alt="definitions result" />

6. And you can create a mask with RegExp:

   <img src="./example-images/regexp-mask.jpg" alt="regExp mask" />
   <img src="./example-images/regexp-mask-result.jpg" alt="regExp mask result" />
