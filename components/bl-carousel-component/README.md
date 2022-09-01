# Carousel

Carousel is a component of Backendless UI-Builder designer. This allows you to add some image and switch between them.

The component based on external [carousel](https://getbootstrap.com/docs/5.2/components/carousel/).

## Properties

| Property          | Type     | Default Value                                | Logic                        | Data Binding | UI Setting | Description                                                                                                                                                |
|-------------------|----------|----------------------------------------------|------------------------------|--------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Images Data       | JSON     | `[{ "url": "", "title": "", "content": ""}]` | Image Data Logic             | NO           | YES        | Allows determinate data for carousel. This property must accept an array of objects with signature: `{url: <string>, title: <string>, content: <string> }` |
| heightImage       | Number   | `300`                                        | height Image Logic           | YES          | YES        | Allows determinate height in px for images                                                                                                                 |
| autoplayDelay     | Number   | `5000`                                       | Autoplay Delay               | YES          | YES        | Allows determinate delay(ms) for autoplay.                                                                                                                 |
| animationType     | Select   | `slide`                                      |                              | NO           | YES        | Allows select type of animation (slide, smooth).                                                                                                           |
| animationDuration | Number   | `600`                                        | Animation Duration Logic     | YES          | YES        | Allows determinate duration for animation.                                                                                                                 |                                                                                                                                                            |
| withControls      | Checkbox | `false`                                      | Controls Visibility Logic    | NO           | YES        | Allows determine if the control buttons should be visible.                                                                                                 |                                                                                                                                                            |
| withIndicators    | Checkbox | `false`                                      | Indicators Visibility Logic  | NO           | YES        | Allows determine if the indicators should be visible.                                                                                                      |

## Events

| Name               | Triggers                            | Context Blocks |
|--------------------|-------------------------------------|----------------|
| On Next Button     | when user click on next button      |                |
| On Previous Button | when user click on previous button  |                |
| On Mouse Enter     | when the mouse enters the component |                |
| On Mouse Leave     | when the mouse leaves the component |                |

## Action

| Action               | Inputs              | Returns |
|----------------------|---------------------|---------|
| Go to Next Image     |                     |         |
| Go to Previous Image |                     |         |
| Go to Image          | Index               |         |
| Autoplay             | Boolean             |         |
| Set Images Data      | List of Images Data |         |

## Style
