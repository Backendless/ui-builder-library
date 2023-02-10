# Input with Mask

Input with Mask is a component of Backendless UI-Builder designer. This allows you to add input with mask.

## Properties

| Property        | Type                                  | Default Value | Logic                  | Data Binding | UI Setting | Description                                                                                   |
| --------------- | ------------------------------------- | ------------- | ---------------------- | ------------ | ---------- | --------------------------------------------------------------------------------------------- |
| maskType        | Select ["Number", "String", "RegExp"] | "Number"      | Mask Type Logic        | NO           | YES        | Allows select type of mask(Number, String, RegExp).                                           |
| mask            | String                                |               | Mask Logic             | YES          | YES        | Allows to specify mask. 0 - any digit; a - any letter; * - any char. Or you can write RegExp. |
| placeholder     | String                                |               | Placeholder Logic      | YES          | YES        | Allows to specify placeholder.                                                                |
| placeholderChar | String                                | "_"           | Placeholder Char Logic | YES          | YES        | Allows to specify placeholder char.                                                           |
| lazy            | Boolean                               | `false`       | Lazy Logic             | NO           | YES        | Allows to specify lazy or not lazy.                                                           |

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
