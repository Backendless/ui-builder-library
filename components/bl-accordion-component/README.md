# Accordion

Accordion is a component of Backendless UI-Builder designer. It allows the user to show and hide sections of related content on a page. The component supports basic and controlled type of accordion.

Customizations include adjustments of font size, color, background color and padding for both title and content.

## Usage

After adding the component to the page, specify the accordion data. This can be done in UI-Builder designer or using codeless logic.

### Styles and Settings

<dl>
<dt>Accordion Data</dt>
<dd>Array of objects that define the title and content of the accordion sections. Can be determined by Accordion Data Logic.</dd>
<dt>Controlled Accordion</dt>
<dd>Checkbox for determining whether multiple accordion sections can be expanded at the same time. If property returns true, only one section content can be visible at a time. Unchecked by default.</dd>
<dt>Title Font Size</dt>
<dd>Value from this field will be used as the font size of the accordion section title.</dd>
<dt>Title Color</dt>
<dd>Color used for the accordion section title. Default depends on the selected theme.</dd>
<dt>Title Background Color</dt>
<dd>Color used as the background of the accordion section title. Default depends on the selected theme.</dd>
<dt>Title Padding</dt>
<dd>Value from this field will be used as the padding for the accordion section title.</dd>
<dt>Content Font Size</dt>
<dd>Value from this field will be used as the font size of the accordion section content.</dd>
<dt>Content Color</dt>
<dd>Color used for the accordion section content. Default depends on the selected theme.</dd>
<dt>Content Background Color</dt>
<dd>Color used as the background of the accordion section content. Default depends on the selected theme.</dd>
<dt>Content Padding</dt>
<dd>Value from this field will be used as the padding for the accordion section content.</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Accordion Data Logic</dt>
<dd>This is the handler for the logic to determine the title and content of the accordion sections. Array of objects returned by the handler will define the data for the accordion.</dd>
<dt>On Click Event</dt>
<dd>Triggered when the user clicks the mouse or taps the title of the accordion section.</dd>
<dt>On Mouse Over Event</dt>
<dd>Triggered when the mouse pointer hovers over the accordion.</dd>
<dt>On Mouse Out Event</dt>
<dd>Triggered when the mouse pointer leaves the accordion boundaries.</dd>
</dl>

### Actions

<dl>
<dt>Open All</dt>
<dd>Action which show content of all accordion sections.</dd>
<dt>Close All</dt>
<dd>Action which hide content of all accordion sections.</dd>
<dt>Toggle All</dt>
<dd>Action which toggle the content visibility of each accordion section.</dd>
</dl>
