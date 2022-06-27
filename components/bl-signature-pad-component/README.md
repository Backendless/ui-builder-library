# Signature Pad

Signature Pad is a component of Backendless UI-Builder designer. It allows to draw smooth signatures and save them for later usage. A user can pick up any color for a drawing pen. Also, the component has features for exporting signatures as images in different formats. The action buttons are configurable, and thus you can adjust their visibility and labels.

The component based on external [signature_pad](https://github.com/szimek/signature_pad) library post by [Szymon Nowak](https://github.com/szimek).

## Usage

### Styles and Settings

<dl>
<dt>Clear Button Label</dt>
<dd>Label on the Clear button. Defaults to "Clear".</dd>
<dt>Change Color Button Label</dt>
<dd>Label on the Change Color button. Defaults to "Change Color".</dd>
<dt>Undo Button Label</dt>
<dd>Label on the Undo button. Defaults to "Undo".</dd>
<dt>Save PNG Button Label</dt>
<dd>Label on the Save PNG button. Defaults to "Save as PNG".</dd>
<dt>Save JPG Button Label</dt>
<dd>Label on the Save JPG button. Defaults to "Save as JPG".</dd>
<dt>Save SVG Button Label</dt>
<dd>Label on the Save SVG button. Defaults to "Save as SVG".</dd>
<dt>Save Signature Button Label</dt>
<dd>Label on the Save Signature button. Defaults to "Save Signature".</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Pen Color</dt>
<dd>Color used to draw the lines. If this field has any value, the Change Color button isn't displayed in the component. Can be determined by Pen Color Logic.</dd>
<dt>Description</dt>
<dd>Value from this field will be used as the description. Can be determined by Description Logic. Defaults to "Sign Above".</dd>
<dt>Save PNG Button Visibility</dt>
<dd>Checkbox for determining whether the button is visible to the user or not. Can be defined by Save PNG Button Visibility Logic. Checked by default.</dd>
<dt>Save JPG Button Visibility</dt>
<dd>Checkbox for determining whether the button is visible to the user or not. Can be defined by Save JPG Button Visibility Logic. Checked by default.</dd>
<dt>Save SVG Button Visibility</dt>
<dd>Checkbox for determining whether the button is visible to the user or not. Can be defined by Save SVG Button Visibility Logic. Checked by default.</dd>
<dt>Save Signature Button Visibility</dt>
<dd>Checkbox for determining whether the button is visible to the user or not. Can be defined by Save Signature Button Visibility Logic. Unchecked by default.</dd>
<dt>On Clear Click Event</dt>
<dd>Triggered when the user clicks the mouse or taps the Clear button.</dd>
<dt>On Undo Click Event</dt>
<dd>Triggered when the user clicks the mouse or taps the Undo button.</dd>
<dt>On Change Color Event</dt>
<dd>Triggered when the user changes the pen color.</dd>
<dt>On Save Click Event</dt>
<dd>Triggered when the user clicks the mouse or taps "Save as PNG", "Save as JPG" or "Save as SVG" button.</dd>
<dt>On Save Signature Click Event</dt>
<dd>Triggered when the user clicks the mouse or taps Save Signature button.</dd>
<dt>On Mouse Over Event</dt>
<dd>Triggered when the mouse pointer hovers over the drawing area.</dd>
<dt>On Mouse Out Event</dt>
<dd>Triggered when the mouse pointer leaves the drawing area boundaries.</dd>
</dl>
