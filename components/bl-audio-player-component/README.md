# Audio Player

Audio Player is a component of Backendless UI-Builder designer. You will have a styled player with the set of your tracks. It supports one or multiple audio sources and has all functions you can think of.

While the player can be configured with multiple settings it is easy in use and provides users with smooth experience.

## Usage

### Styles and Settings

<dl>
<dt>Multiple Audio Player</dt>
<dd>Checkbox for determining whether Audio Player should play multiple tracks from Audio Data Logic or just one from Audio Url. If the handler returns 'true' Audio Player will play tracks from Audio Data Logic. Unchecked by default.</dd>
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
<dt>Repeat One</dt>
<dd>Checkbox for determining whether the player will repeat one track over and over again. Unchecked by default.</dd>
<dt>Player Width</dt>
<dd>Value from this field will be used as the width of Audio Player. Defaults to 100%.</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Audio Url</dt>
<dd>Value from this field will be used as the audio url of Single Track Audio Player. Can be determined by Audio Url Logic.</dd>
<dt>Audio Title</dt>
<dd>Value from this field will be used as the audio title of Single Track Audio Player. Can be determined by Audio Title Logic.</dd>
<dt>Audio Data</dt>
<dd>Array of objects returned by Audio Data Logic will be used as the playlist for Multiple Audio Player. Each object should include 'url' and 'title' of the track.</dd>
</dl>
