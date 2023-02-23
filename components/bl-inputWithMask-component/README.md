# Input with Mask

Input with Mask is a component of Backendless UI-Builder designer. This allows you to add input with mask.

## Properties

| Property                            | Type                                  | Default Value | Logic                  | Data Binding | UI Setting | Description                                                                                                                                                                                                                                               |
| ----------------------------------- | ------------------------------------- | ------------- | ---------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mask Type: `maskType`               | Select [`Number`, `String`, `RegExp`] | "Number"      | Mask Type Logic        | NO           | YES        | Allows select type of mask(Number, String, RegExp).                                                                                                                                                                                                       |
| Mask: `mask`                        | Text                                  |               | Mask Logic             | YES          | YES        | Allows to specify mask. 0 - any digit; a - any letter; * - any char. Or you can write RegExp.                                                                                                                                                             |
| Placeholder: `placeholder`          | Text                                  |               | Placeholder Logic      | YES          | YES        | Allows to specify placeholder.                                                                                                                                                                                                                            |
| Placeholder Char: `placeholderChar` | Text                                  | "_"           | Placeholder Char Logic | YES          | YES        | Allows to specify placeholder char.                                                                                                                                                                                                                       |
| Lazy: `lazy`                        | Checkbox                              | `false`       | Lazy Logic             | NO           | YES        | Allows to specify lazy or not lazy. Lazy it's when the input doesn't display the template of the mask. For example, Mask: `000 000 000`, Placeholder Char: `_`, Lazy: `checked` input will be empty, but if Lazy: `unchecked` input will be `___ ___ ___` |

## Events

| Name            | Triggers                                                                                                                     | Context Blocks  | Return   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------- | -------- |
| On Change Value | when the component's state (value) changes.                                                                                  | `value: string` |          |
| On Validate     | before the component value changes. Using this event we can additionally ourself check and modify each symbol that we input. | `value: string` | `string` |

## Styles

**Theme**
````
@bl-customComponent-inputWithMask-themeColor: @themePrimary;
@bl-customComponent-inputWithMask-backgroundColor: @appBackgroundColor;
@bl-customComponent-inputWithMask-textColor: @appTextColor;
````
