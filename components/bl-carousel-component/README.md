# Carousel

Carousel is a component of Backendless UI-Builder designer. This allows you to add some image and switch between them.

The component based on external [Carousel](https://getbootstrap.com/docs/5.2/components/carousel/).

## Properties

| Property          | Type    | Default Value                                | Logic                       | Data Binding | UI Setting | Description                                                                                                                                              |
|-------------------|---------|----------------------------------------------|-----------------------------|--------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| imagesData        | Object  | `[{ "url": "", "title": "", "content": ""}]` | Image Data Logic            | NO           | YES        | Allows determinate data for carousel. Watch [Codeless Examples](#Examples). Signature of polygon: `{"url": string, "title": string, "content": string }` |
| height            | String  | "400px"                                      | Height Logic                | YES          | YES        | Allows determinate height for images.                                                                                                                    |
| width             | String  | "700px"                                      | Width Logic                 | YES          | YES        | Allows determinate width for images.                                                                                                                     |
| autoplayDelay     | Number  | 5000                                         | Autoplay Delay              | YES          | YES        | Allows determinate delay(ms) for autoplay.                                                                                                               |
| animationType     | Select  | ["slide", "smooth"]                          |                             | NO           | YES        | Allows select type of animation (slide, smooth).                                                                                                         |
| animationDuration | Number  | 600                                          | Animation Duration Logic    | YES          | YES        | Allows determinate duration for animation.                                                                                                               |
| withControls      | Boolean | `false`                                      | Controls Visibility Logic   | NO           | YES        | Allows determine if the control buttons should be visible.                                                                                               |
| withIndicators    | Boolean | `false`                                      | Indicators Visibility Logic | NO           | YES        | Allows determine if the indicators should be visible.                                                                                                    |

## Events

| Name               | Triggers                            | Context Blocks |
|--------------------|-------------------------------------|----------------|
| On Next Button     | when user click on next button      |                |
| On Previous Button | when user click on previous button  |                |
| On Mouse Enter     | when the mouse enters the component |                |
| On Mouse Leave     | when the mouse leaves the component |                |

## Action

| Action                           | Inputs                                | Returns |
|----------------------------------|---------------------------------------|---------|
| Go to Next Image in Carousel     |                                       |         |
| Go to Previous Image in Carousel |                                       |         |
| Go to Image in Carousel          | `Index: number`                       |         |
| Autoplay Carousel                | `Boolean: boolean`                    |         |
| Set Images Data for Carousel     | `List of Images Data: array[objects]` |         |

## <a name="Examples"></a> Codeless Examples

Addition of Images Data

![](example-images/imagesData-example.png)
