# Badge

Badge is a component of Backendless UI-Builder designer. It generates a small badge to the corner of its child(ren). Any text, custom image or Material icon can be as a content of the component. It is also possible to combine them.

Customizations include adjustments of position, size, form, visibility, background color, label color and font size.

## Usage

After adding the component to the page, specify the label of the badge. This can be done in UI-Builder designer or using codeless logic.

Then it is necessary to determine the contents of the component. Go to UI-Builder designer and specify one of the content field or combine them if you need. The component will be displayed with default properties. If you need even more flexibility, make other changes to its appearance in UI-Builder designer or by codeless logic.

### Options

<dl>
<dt>Badge Label</dt>
<dd>Value from this field will be used as the badge label. Can be defined by Badge Label Logic.</dd>
<dt>Badge Label Color</dt>
<dd>Color used for badge label. Default depends on the selected theme.</dd>
<dt>Badge Background Color</dt>
<dd>Color used as the background of the badge. Default depends on the selected theme.</dd>
<dt>Badge Font Size</dt>
<dd>Value from this field will be used as the font size for the badge's label.</dd>
<dt>Badge Alignment</dt>
<dd>Value from this field will be used as the position of the badge. Defaults to top-right corner. Available values: top-right, top-left, bottom-left, bottom-right.</dd>
<dt>Badge Visibility</dt>
<dd>Checkbox for determining whether the badge is visible to the user or not. Can be defined by Badge Visibility Logic. Checked by default.</dd>
<dt>Badge Width</dt>
<dd>Value from this field will be used as the width of the badge. Default depends on the size of the badge label.</dd>
<dt>Badge Height</dt>
<dd>Value from this field will be used as the height of the badge. Default depends on the size of the badge label.</dd>
<dt>Badge Form</dt>
<dd>Value from this field will be used as the form of the badge. Defaults to rounded rectangle. Available values: rounded rectangle, circle, rectangle.</dd> 
<dt>Icon</dt>
<dd>Icon from the Material library specified in this field will be used as the content of the component.</dd>
<dt>Text</dt>
<dd>Value from this field will be used as the content of the component.</dd>
<dt>Content Font Size</dt>
<dd>Value from this field will be used as the font size for the text content and Material icon.</dd>
<dt>Image Url</dt>
<dd>Custom image from the URL in this field will be used as the content of the component.</dd>
<dt>Image Width</dt>
<dd>Width of the custom image used as the content of the component.</dd>
<dt>Padding</dt>
<dd>Value from this field will be used as the distance from the badge to the component content.</dd>
</dl>

### Events

<dl>
<dt>On Badge Click Event</dt>
<dd>Triggered when the user clicks the mouse or taps the badge.</dd>
<dt>On Badge Mouse Over Event</dt>
<dd>Triggered when the mouse pointer hovers over the badge.</dd>
<dt>On Badge Mouse Out Event</dt>
<dd>Triggered when the mouse pointer leaves the badge boundaries.</dd>
<dt>On Content Click Event</dt>
<dd>Triggered when the user clicks the mouse or taps the component content.</dd>
<dt>On Content Mouse Over Event</dt>
<dd>Triggered when the mouse pointer hovers over the component content.</dd>
<dt>On Content Mouse Out Event</dt>
<dd>Triggered when the mouse pointer leaves the component content boundaries.</dd>
</dl>
