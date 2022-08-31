# Audio Player

Audio Player is a component of Backendless UI-Builder designer. You will have a styled player with the set of your tracks. It supports one or multiple audio sources and has all functions you can think of.

While the player can be configured with multiple settings it is easy in use and provides users with smooth experience.

## Usage

### Styles and Settings

<dl>
<dt>Audio Url</dt>
<dd>Value from this field will be used as the audio url of the player. Can be determined by Audio Url Logic as an array of urls or as a single url.</dd>
<dt>Audio Title</dt>
<dd>Value from this field will be used as the audio title of the player. Can be determined by Audio Title Logic as an array of titles or as a single title.</dd>
<dt>Player Visibility</dt>
<dd>Checkbox for determining whether the Audio Player is visible to the user or not. Checked by default.</dd>
<dt>Track Navigation Visibility</dt>
<dd>Checkbox for determining whether the track navigation is visible to the user or not. Checked by default.</dd>
<dt>Title Visibility</dt>
<dd>Checkbox for determining whether the title of the track is visible to the user or not. Checked by default.</dd>
<dt>Default Volume</dt>
<dd>Value from this field will be used as the default volume of Audio Player. Can be defined from 0 to 100. Defaults to 50.</dd>
<dt>Auto Play</dt>
<dd>Checkbox for determining whether the player will play automatically after loading the page. Unchecked by default.</dd>
<dt>Repeat</dt>
<dd>Checkbox for determining whether the player will repeat one track over and over again. Unchecked by default.</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Audio Url Logic</dt>
<dd>This is the handler for the logic to determine the audio url or the list of urls. Array of values returned by the handler will be used as the component playlist.</dd>
<dt>Audio Title Logic</dt>
<dd>This is the handler for the logic to determine the track title or the list of titles. Values from the array returned by the handler will be used as track titles of the playlist.</dd>
</dl>

### Actions

<dl>
<dt>Play Audio</dt>
<dd>Action which starts playing the audio.</dd>
<dt>Stop Audio</dt>
<dd>Action which stops playing the audio.</dd>
<dt>Replace Audio</dt>
<dd>Action which replaces the audio. Values of the Audio Url and Audio Title properties from the action block will be used as the current track of Audio Player.</dd>
</dl>
