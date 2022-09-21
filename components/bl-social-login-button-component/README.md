# Social Login Button

Social Login Button is a component of Backendless UI-Builder designer. The component is designed for quick login. For the correct work of the component, you need to configure the social network provider, you can do this by going to Backend => Users => Login Providers. Also, if you want to watch the tutorial, you can [follow the link,](https://www.youtube.com/watch?v=PVmXcQn-FxA&t=842s&ab_channel=Backendless) or go to [the documentation.](https://backendless.com/docs/js/users_oauth2.html)

<p align="center">
  <img alt="main thumbnail" height="290" src="./thumbnail.png" width="370"/>
</p>

## Properties

| Property         | Type       | Default value | Logic                  | Data Binding | UI Setting | Description
|------------------|------------|---------------|------------------------|--------------|------------|-----------------------------------------------------------
| Disabled         | *Checkbox* | false         | Disabled logic         | YES          | YES        | This handler allows you to disable the component.
| Show Button Icon | *Checkbox* | true          | Show Button Icon Logic | YES          | YES        | This handler allows you to select the mode for a button with an icon or without.
| Google Plus      | *Checkbox* | true          | Google Plus Logic      | YES          | YES        | This handler allows you to choose whether to show the Google Plus button or not.
| Facebook         | *Checkbox* | true          | Facebook Logic         | YES          | YES        | This handler allows you to choose whether to show the Facebook button or not.
| Twitter          | *Checkbox* | true          | Twitter Logic          | YES          | YES        | This handler allows you to choose whether to show the Twitter button or not.
| Linkedin         | *Checkbox* | true          | Linkedin Logic         | YES          | YES        | This handler allows you to choose whether to show the Linkedin button or not.
| Github           | *Checkbox* | true          | Github Logic           | YES          | YES        | This handler allows you to choose whether to show the Github button or not.

## Events

| Name                 | Triggers                                           | Context Blocks                        |
|----------------------|----------------------------------------------------|---------------------------------------|
| On Click Event       | when the user clicks the Social Login Button       | `Login Type: string`                    |
| On Login Fail        | when a login request returns an error              | `Error: string`                       |

## Styles

**Colors**
````
@bl-customComponent-socialLoginButton-iconGoogle-colorPrimary: #DC4A3D;
@bl-customComponent-socialLoginButton-iconFacebook-colorPrimary: #3C5A9A;
@bl-customComponent-socialLoginButton-iconTwitter-colorPrimary: #55ACEE;
@bl-customComponent-socialLoginButton-iconLinkedin-colorPrimary: #0A66C2;
@bl-customComponent-socialLoginButton-iconGithub-colorPrimary: #000000;
````
