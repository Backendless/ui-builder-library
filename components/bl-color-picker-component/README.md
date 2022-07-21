# Color Picker

Color Picker is a component of Backendless UI-Builder designer. It allows to specify a color, either by using a visual
color picker interface or by entering the color into a text field in hexadecimal format. A user can change any character
of rgb or hsl format. The picker also allows to use an alpha channel, which could be modified by the slider visual
interface or by the input field.

Customizations include adjustments of color picker type, stacking direction, default color value, visibility of separate
elements and the picker as a whole.

The component based on external [iro.js](https://github.com/jaames/iro.js) library post
by [James](https://github.com/jaames).

## Usage

### Styles and Settings

<dl>
<dt>Picker Trigger Visibility</dt>
<dd>Checkbox for determining whether the color picker is constantly visible to the user or triggered by a button. Checked by default.</dd>
<dt>Circle Color Picker</dt>
<dd>Checkbox for determining whether the color picker use Wheel layout or Box layout with hue slider. Unchecked by default, which specifies a Box type.</dd>
<dt>Vertical Color Picker</dt>
<dd>Checkbox for determining whether the stacking direction of ui components is vertical or horizontal. Unchecked by default.</dd>
<dt>Opacity Slider Visibility</dt>
<dd>Checkbox for determining whether the opacity slider is visible to the user or not. Checked by default.</dd>
<dt>Opacity Input Visibility</dt>
<dd>Checkbox for determining whether the opacity input is visible to the user or not. Checked by default.</dd>
<dt>RGB Format Visibility</dt>
<dd>Checkbox for determining whether the RGB color format is visible to the user or not. Checked by default.</dd>
<dt>HSL Format Visibility</dt>
<dd>Checkbox for determining whether the HSL color format is visible to the user or not. Checked by default.</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Selected Color</dt>
<dd>Color used as the selected color of the picker. Can be determined by Selected Color Logic. Defaults to "#FF0000".</dd>
<dt>On Change Color Event</dt>
<dd>Triggered when the user changes the selected color in the picker.</dd>
</dl>

### Actions

<dl>
<dt>Open Picker</dt>
<dd>Action which open the color picker.</dd>
<dt>Close Picker</dt>
<dd>Action which close the color picker.</dd>
</dl>
