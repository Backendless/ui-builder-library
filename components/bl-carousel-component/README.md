# Carousel

Carousel is a component of Backendless UI-Builder designer. This allows you to add some image and switch between them

The component based on external [carousel](https://getbootstrap.com/docs/5.2/components/carousel/).
## Usage

### Styles and Settings

<dl>
<dt>Images Data</dt>
<dd>Allows determinate data for carousel. This property must accept an array of objects in which URL is a mandatory field and title and content are optional or a JSON file.</dd>
<dt>Height Image</dt>
<dd>Allows determinate height for images</dd>
<dt>Autoplay Delay (ms)</dt>
<dd>Allows determinate delay for autoplay. Default value '5000'.</dd>
<dt>Type Animation</dt>
<dd>Allows select type of animation (slide, smooth). Default value 'slide'.</dd>
<dt>Animation Duration (ms)</dt>
<dd>Allows determinate duration for animation. Default value '600'.</dd>
<dt>Control Buttons Visible</dt>
<dd>Allows determinate control buttons visible or not visible. Default value 'unchecked'.</dd>
<dt>Indicators Visible</dt>
<dd>Allows determinate indicators visible or not visible. Default value 'unchecked'.</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Images Data Logic</dt>
<dd>Allows to specify data for carousel in Backendless logic.</dd>
<dt>Height Image Logic</dt>
<dd>Allows to specify height for images in Backendless logic.</dd>
<dt>Has Autoplay Logic</dt>
<dd>Allows to specify carousel autoplay or not autoplay in Backendless logic.</dd>
<dt>Autoplay Delay Logic</dt>
<dd>Allows to specify delay for autoplay in Backendless logic.</dd>
<dt>Animation Duration Logic</dt>
<dd>Allows to specify duration for animation in Backendless logic.</dd>
<dt>Controls Visibility Logic</dt>
<dd>Allows to specify control buttons visible or not visible in Backendless logic.</dd>
<dt>Indicators Visibility Logic</dt>
<dd>Allows to specify indicators visible or not visible in Backendless logic.</dd>
<dt>On Next Button</dt>
<dd>This event is triggered when the user clicks on the next button.</dd>
<dt>On Previous Button</dt>
<dd>This event is triggered when the user clicks on the previous button.</dt>
<dt>On Mouse Enter</dt>
<dd>This event is triggered when the Mouse Enters the component.</dd>
<dt>On Mouse Leave</dt>
<dd>This event is triggered when the mouse leaves the component.</dd>
</dl>

### Action
<dl>
<dt>Go to Next Image</dt>
<dd>An action that allows go to next image</dd>
<dt>Go to Previous Image</dt>
<dd>An action that allows go to previous image</dd>
<dt>Go to Image</dt>
<dd>An action that allows going to image any image. Action takes image index.</dd>
<dt>Stop Autoplay</dt>
<dd>An action that allows stopped autoplay.</dd>
<dt>Start Autoplay</dt>
<dd>An action that allows started autoplay.</dd>
<dt>Set Images Data</dt>
<dd>An action that allows set images data. Action takes a list of objects in which URL is a mandatory field and title and content are optional.</dd>
</dl>
