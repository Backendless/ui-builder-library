# Lottie Animation

Lottie Animation is a component of Backendless UI-Builder designer. This allows you to upload and add animation in your page.

The component based on external [Lottie Animation](https://github.com/airbnb/lottie-web).

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property  | Type                             | Default Value | Logic         | Data Binding | UI Setting | Description                                                                                                                                                                                                                                                          |
|-----------|----------------------------------|---------------|---------------|--------------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data      | JSON                             |               | Data Logic    | YES          | YES        | Allows writing JSON for animation. You can get JSON with animation by creating animation in After Effects with the plugin [Lottie](https://airbnb.io/lottie/#/after-effects)  or you can get completed animation in [Lottie Files](https://lottiefiles.com/featured) |
| type      | Select [`svg`, `canvas`, `html`] | svg           | Type logic    | NO           | YES        | Allows select type of animation (svg, canvas, html)                                                                                                                                                                                                                  |
| isLoop    | Checkbox                         | `false`       | Loop Logic    | NO           | YES        | Allows to specify looping or non-looping animation                                                                                                                                                                                                                   |
| isStopped | Checkbox                         | `false`       | Stopped Logic | NO           | YES        | Allows to specify stopped or not stopped animation                                                                                                                                                                                                                   |

## Events

| Name       | Triggered                                              | Context Block |
|------------|--------------------------------------------------------|---------------|
| On Hover   | when the user hovers on the animation                  |               |
| On Unhover | when the user moves the cursor away from the animation |               |
| On Click   | when the user clicks on the animation                  |               |

## Action

| Action         | Inputs                                                  | Return |
|----------------|---------------------------------------------------------|--------|
| Stop Animation |                                                         |        |
| Play Animation |                                                         |        |
| Set Animation  | Data: `Object` Is Stopped: `Boolean` Is Loop: `Boolean` |        |

## Usage
If you want to create a custom animation, you can do it following this [instruction](https://airbnb.io/lottie/#/after-effects?id=advanced-illustrator-to-lottie-workflow) and after add json to component.

If you want to find a ready-made solution, you can find it on the [Lottie Files](https://lottiefiles.com/featured).

You need:
1. Sign up account.

2. Choose animation.
   ![choose animation example](./example-images/choose_animation.jpg)


3. You can copy Lottie Animation URL and in Lottie Animation Data Logic do https request.
   ![copy URL Animation example](./example-images/get_url_animation.jpg)
   ![Data Logic example](./example-images/data_logic.jpg)


   Another way is to download a JSON file, copy the file content, and paste it into the Data property in the Lottie Animation component.
   ![download animation example](./example-images/download_animation.jpg)
   ![copy json animation example](./example-images/copy_json_animation.jpg)
   ![past json animation example](./example-images/past_json_in_data.jpg)
