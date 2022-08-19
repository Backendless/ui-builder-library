# Social Login Button

Social Login Button is a component of Backendless UI-Builder designer. The component is designed for quick login.

## Usage

Add the component to your page and specify the social network in the component properties. Also, for the correct work of the component, you need to configure the social network provider, you can do this by going to Backend => Users => Login Providers. Also, if you want to watch the tutorial, you can [follow the link,](https://www.youtube.com/watch?v=PVmXcQn-FxA&t=842s&ab_channel=Backendless) or go to [the documentation.](https://backendless.com/docs/js/users_oauth2.html)

### Component Elements

<dl>
<dt>Button</dt>
<dd>The component consists of a button and an icon with text that is the content of the button.</dd>
<dt>Icon</dt>
<dd>The icon is located to the left of the button text, also using the `Show button icon` property you can choose whether the icon will be displayed or not.</dd>
</dl>

### Component Properties

  Name             | Type     | Default value  | Description
 ------------------|----------|----------------|----------------------------------------------------------------
  Show button icon | boolean  | true           | This property allows you to select the mode for a button with an icon or without.
  Google plus      | boolean  | true           | With this property you can choose whether to show the Google plus button or not.
  Facebook         | boolean  | true           | With this property you can choose whether to show the Facebook button or not.
  Twitter          | boolean  | true           | With this property you can choose whether to show the Twitter button or not.
  Linkedin         | boolean  | true           | With this property you can choose whether to show the Linkedin button or not.
  Github           | boolean  | true           | With this property you can choose whether to show the Github button or not.

### Events

<dl>
<dt>On Click</dt>
<dd>Triggers when the user clicks the Social Login Button</dd>
</dl>
