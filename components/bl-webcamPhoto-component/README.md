# Webcam Photo

WebcamPhoto is a component of Backendless UI-Builder designer. Allows you to take a picture using a webcam on both
mobile devices and desktops.

## Usage

Once added to the page, you can customize the component in the UI-Builder designer. Each button, as well as where the
photo is saved, is configurable.

### API

<dl>
<dt>Upload button</dt>
<dd>This button is displayed on mobile devices. Allows you to take a picture using a webcam or upload from the gallery. The default value is "Upload".</dd>
<dt>Make photo button</dt>
<dd>This button is displayed on desktops. When clicked, a modal window opens for taking a snapshot using the webcam.</dd>
<dt>Make snapshot button</dt>
<dd>This button is displayed when a modal window is open. When clicked, takes a picture using the webcam.</dd>
<dt>Done button</dt>
<dd>This button is displayed when a modal window is open. When pressed, saves the current picture. You can specify save path in backendless logic.</dd>
</dl>

### Options

<dl>
<dt>Upload button label</dt>
<dd>Label on the Upload button. Defaults to "Upload".</dd>
<dt>Make photo button label</dt>
<dd>Label on the Make photo button. Defaults to "Make photo".</dd>
<dt>Make snapshot button label</dt>
<dd>Label on the Make snapshot button. Defaults to "Make snapshot".</dd>
<dt>Done button label</dt>
<dd>Label on the Done button. Defaults to "Done".</dd>
<dt>Default disabled</dt>
<dd>Indicates if the button is disabled</dd>
</dl>

### Events

<dl>
<dt>On Save Image Event</dt>
<dd>Triggered when the user clicks the "Done" button. </dd>
</dl>
