# Input with Mask

Input with Mask is a component of Backendless UI-Builder designer. This allows you to add input with mask.

## Usage

### Styles and Settings

<dl>
<dt>Mask Type</dt>
<dd>Allows select type of mask(Number, String, RegExp). Default value "Number".</dd>
<dt>Mask</dt>
<dd>Allows to specify mask. 0 - any digit; a - any letter; * - any char. Or you can write RegExp.</dd>
Example:
<dd>mask: 0000-0000-0000, input: 1234-5678-9012</dd>
<dd>mask: 38\0 00 000 0000, input: 380 45 345 5435</dd>
<dd>mask: ^[1-6]\d{0,5}$, input: 234533</dd>
<dt>placeholder</dt>
<dd>Allows to specify placeholder.</dd>
<dt>Placeholder Char</dt>
<dd>Allows to specify placeholder char. Default value "_"</dd>
<dt>Lazy</dt>
<dd>Allows to specify lazy or not lazy. Default value "unchecked"</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Mask Type Logic</dt>
<dd>Allows to specify mask type in Backendless logic</dd>
<dt>Mask Logic</dt>
<dd>Allows to specify mask logic for in Backendless logic</dt>
<dt>Placeholder Logic</dt>
<dd>Allows to specify placeholder in Backendless logic</dd>
<dt>Placeholder Char Logic</dt>
<dd>Allows to specify placeholder char in Backendless logic</dd>
<dt>Lazy Logic</dt>
<dd>Allows to specify lazy or not lazy in Backendless logic</dd>
<dt>On Change Value</dt>
<dd>Triggered when input value change.</dd>
<dt>On Validate</dt>
<dd>Triggered when value changes but before set in value. Returns boolean. True — sets value, False — don't set value.</dd>
</dl>
