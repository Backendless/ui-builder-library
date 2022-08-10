# Social Login Button

Social Login Button is a component of Backendless UI-Builder designer. The component is designed for quick login.

## Usage

Add the component to your page and specify the social network in the component properties. Also, for the correct work of the component, you need to configure the social network provider, you can do this by going to Backend => Users => Login Providers. Also, if you want to watch the tutorial, you can [follow the link,](https://www.youtube.com/watch?v=PVmXcQn-FxA&t=842s&ab_channel=Backendless) or go to [the documentation.](https://backendless.com/docs/js/users_oauth2.html)

### Component Elements

<dl>
<dt>Button</dt>
<dd>The component consists of a button and an icon with text that is the content of the button. When you change the `Button option` property, the content of the button will change to the one you specify.</dd>
</dl>

### Component Properties

  Name          | Type                                                      | Default value   | Description
 ---------------|-----------------------------------------------------------|-----------------|----------------------------------------------------------------
  Button option | 'googleplus', 'facebook', 'twitter', 'linkedin', 'github' | 'googleplus'    | This property allows you to select a social network for login button.

### Events

<dl>
<dt>On Social Login Button Click</dt>
<dd>Triggers when the user clicks the Social Login Button</dd>
</dl>
