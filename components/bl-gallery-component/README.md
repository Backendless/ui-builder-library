# Gallery

Gallery is a component of Backendless UI-Builder designer. It allows you to conveniently view images and stay on the page. 

The component based on external [lightbox2](https://lokeshdhakar.com/projects/lightbox2/) library post by [Lokesh Dhakar](https://github.com/lokesh).

## Usage

 Add component on your page and add codeless logic which loading images.
 Use ImagesUrl handler to load images in component.    
 ImagesUrl type is an array of objects, where every object should have field "URL" with image URL and optionally field 'title' with text for every image.
 All images have the same height and stretch according to the sides, but it is possible to set the height of each image separately. To do this, add the 'height' value to the object.
 Value must contain px, %, etc...   

    ImagesUrl:[{url:'http..', title:'Picture..', height: '200px' },..]
Also, you can avoid any logic by writing in settings 'Images Data' links with separating comma ','. 

    htttp://image1, http://image2
But if you already have logic, this method will not work.

### Options

| Name                    | Default value | Description                                                                                                                                                                                                                                                                |
|-------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Wrap Around             | false         | This checkbox toggling possibility to make the gallery infinite. If checked, when a user reaches the last image in a set, the right navigation arrow will appear and they will be to continue moving forward which will take them back to the first image in the set.</dd> |
| Nav On Mobile           | false         | This checkbox toggles the visibility of navigation on touchscreen devices. If true, the left and right navigation arrows which appear on mouse hover when viewing image sets will always be visible on devices which support touch.                                        |
| Disable Scrolling       | false         | This checkbox toggles scroll possibility. If true, prevent the page from scrolling while Lightbox is open. This works by settings overflow hidden on the body.                                                                                                             |
| Show Image Number Label | false         | This checkbox toggling indicator visibility of the number of images If unchecked, the text indicating the current image number and the total number of images in set (Ex. "image 2 of 4") will be hidden.                                                                  |
| Image Label             | Image         | This option is to set the text in indicator of images. It works if "Show Image Number Label" is true.                                                                                                                                                                      |
| Separator               | of            | This option is to set separator in indicator of images. It works if "Show Image Number Label" is true.                                                                                                                                                                     |
| Fade Duration           | 600ms         | This option is to set the time of fade duration. The time it takes for the Lightbox container and overlay to fade in and out, in milliseconds.                                                                                                                             |
| Image Fade Duration     | 600ms         | This option is to set the time of image fade duration. The time it takes for the image to fade in once loaded, in milliseconds.                                                                                                                                            |
| Resize Duration         | 700ms         | This option is to set the time it takes for the Lightbox container to animate its width and height when transition between different size images, in milliseconds.                                                                                                         |
| Position From Top       | 50px          | This option is to set the distance from top of viewport that the Lightbox container will appear, in pixels.                                                                                                                                                                |

###Styling

<dl>
<dt>Gap</dt>

    Default: 5px
<dd>If you want to change distance between images add theme extension with new gap variable.

    @bl-customComponent-gallery-gap: 5px;
</dd>
<dt>Image Height</dt>

    Default: 200px
<dd>If you want to set image height for all images add theme extension with new imageHeight variable.

    @bl-customComponent-gallery-image-height: 200px;
</dd>
<dt>Image Border Radius</dt>

    Default: 4px
<dd>If you want to change border radius of image add theme extension with new border radius variable.

    @bl-customComponent-gallery-image-border-radius: 4px;
</dd>

<dt>Gallery Buttons</dt>
<dd>If you want to change gallery buttons add theme extension variable with link. 
    
    Icon-close: @bl-customComponent-gallery-icon-close: 'https://img..';
    Icon-loading: @bl-customComponent-gallery-icon-loading: 'https://loading.gif';
    Icon-next: @bl-customComponent-gallery-icon-next: 'https://img..';
    Icon-prev: @bl-customComponent-gallery-icon-prev: 'https://img..';
</dd>
</dl>