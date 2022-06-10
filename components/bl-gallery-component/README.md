# Gallery

Gallery is a component of Backendless UI-Builder designer.The gallery is a component of the Backendless UI-Builder designer. It allows you to conveniently view images and stay on the page. 

The component based on external [lightbox2](https://lokeshdhakar.com/projects/lightbox2/) library post by [Lokesh Dhakar](https://github.com/lokesh).

## Usage

 Add component on your page and add codeless logic which loading images.
    Use ImagesUrl handler to load images in component.    
    ImagesUrl type is an array of objects, where every object should have field "URL" with image URL and optionally field 'title' with text for every image.
    
    ImagesUrl:[{url:'http..', title:'Picture..' },..]

### Options

<dl>
<dt>Gap</dt>

    Default: 0
<dd>This option sets the distance between each image.</dd>
<dt>Image Height</dt>

    Default: 200px
<dd>This option sets the height of images on page.</dd>
<dt>Image Border Radius</dt>

    Default: 5px
<dd>This option sets the radius of image border on page.</dd>
<dt>Wrap Around</dt>

    Default: false
<dd>This checkbox toggling possibility to make the gallery infinite.
If checked, when a user reaches the last image in a set, the right navigation arrow will appear and they will be to continue moving forward which will take them back to the first image in the set.</dd>
<dt>Nav On Mobile</dt>

    Default: false
<dd>This checkbox toggles the visibility of navigation on touchscreen devices.
If true, the left and right navigation arrows which appear on mouse hover when viewing image sets will always be visible on devices which support touch.</dd>
<dt>Disable Scrolling</dt>

    Default: false
<dd>This checkbox toggles scroll possibility.
If true, prevent the page from scrolling while Lightbox is open. This works by settings overflow hidden on the body.</dd>
<dt>Show Image Number Label</dt>

    Default: false
<dd>This checkbox toggling indicator visibility of the number of images
If unchecked, the text indicating the current image number and the total number of images in set (Ex. "image 2 of 4") will be hidden.</dd>
<dt>Image Label</dt>

    Default: 'Image'
<dd>This option is to set the text in indicator of images.
It works if "Show Image Number Label" is true.</dd>
<dt>Separator</dt>

    Default: 'of'
<dd>This option is to set separator in indicator of images.
It works if "Show Image Number Label" is true.</dd>
<dt>Fade Duration</dt>
    
    Default: 600ms
<dd>This option is to set the time of fade duration.
The time it takes for the Lightbox container and overlay to fade in and out, in milliseconds.</dd>
<dt>Image Fade Duration</dt>

    Default: 600ms
<dd>This option is to set the time of image fade duration.
The time it takes for the image to fade in once loaded, in milliseconds.</dd>
<dt>Resize Duration</dt>

    Default: 700ms
<dd>This option is to set the time it takes for the Lightbox container to animate its width and height when transition between different size images, in milliseconds.</dd>
<dt>Position From Top</dt>

    Default: 50px
<dd>This option is to set the distance from top of viewport that the Lightbox container will appear, in pixels.</dd>
</dl>
