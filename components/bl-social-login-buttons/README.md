# Social Login Buttons

Social Login Buttons is a component of Backendless UI-Builder designer. The component is designed for quick login. For the correct work of the component, you need to configure the social network provider, you can do this by going to Backend => Users => Login Providers. Also, if you want to watch the tutorial, you can [follow the link,](https://www.youtube.com/watch?v=PVmXcQn-FxA&t=842s&ab_channel=Backendless) or go to [the documentation.](https://backendless.com/docs/js/users_oauth2.html)

<p align="center">
  <img alt="main thumbnail" src="./thumbnail.png" width="720"/>
</p>

## Demo

View an example of how to install this component and how it works in your UI [here](https://app.arcade.software/share/FJvBka18CzU1CzIBn5V8).

## Properties

| Property                                    | Type     | Default value | Logic                             | Data Binding | UI Setting | Description                                                                              |
|---------------------------------------------|----------|---------------|-----------------------------------|--------------|------------|------------------------------------------------------------------------------------------|
| Disabled<br/>`disabled`                     | Checkbox | `false`       | Disabled logic                    | YES          | YES        | This handler allows you to disable the component.                                        |
| Redirect To Page<br/>`redirectToPage`       | Text     |               | Redirect To Page Logic            | YES          | YES        | This handler allows you to specify which page to go to after login.                      |
| Extra Query Params<br/>`extraQueryParams`   | Text     |               | Extra Query Params Logic          | YES          | YES        | This handler allows you to add extra query params that will be added to the URL address. |
| Callback URL Domain<br/>`callbackUrlDomain` | Text     |               | Callback URL Domain Logic         | NO           | YES        | This handler allows you to add a callback URL Domain.                                    |
| Icons Visibility<br/>`iconsVisibility`      | Checkbox | `true`        | Icons Visibility Visibility Logic | YES          | YES        | This handler allows you to select the mode for a button with an icon or without.         |
| Google Visibility<br/>`googleplus`          | Checkbox | `true`        | Google Visibility Logic           | YES          | YES        | This handler allows you to choose whether to show the Google button or not.              |
| Facebook Visibility<br/>`facebook`          | Checkbox | `true`        | Facebook Visibility Logic         | YES          | YES        | This handler allows you to choose whether to show the Facebook button or not.            |
| Twitter Visibility<br/>`twitter`            | Checkbox | `true`        | Twitter Visibility Logic          | YES          | YES        | This handler allows you to choose whether to show the Twitter button or not.             |
| Linkedin Visibility<br/>`linkedin`          | Checkbox | `true`        | Linkedin Visibility Logic         | YES          | YES        | This handler allows you to choose whether to show the Linkedin button or not.            |
| Github Visibility<br/>`github`              | Checkbox | `true`        | Github Visibility Logic           | YES          | YES        | This handler allows you to choose whether to show the Github button or not.              |

## Events

| Name                 | Triggers                                           | Context Blocks                        |
|----------------------|----------------------------------------------------|---------------------------------------|
| On Login Event       | when the user clicks the Social Login Button       | Login Type: `String`                  |
| On Login Fail        | when a login request returns an error              | Error: `String`                       |

## Styles

**Size**
````
@bl-customComponent-socialLoginButtons-maxWidth: 375px;
@bl-customComponent-socialLoginButtons-minWidth: 300px;
@bl-customComponent-socialLoginButtons-button-width: 100%;
@bl-customComponent-socialLoginButtons-button-height: 50px;
@bl-customComponent-socialLoginButtons-button-borderRadius: 3px;
@bl-customComponent-socialLoginButtons-button-marginBottom: 10px;
````

**Colors**
````
@bl-customComponent-socialLoginButtons-colorOnHover: #FFFFFF;
@bl-customComponent-socialLoginButtons-button-backgroundColor: #FFFFFF;
@bl-customComponent-socialLoginButtons-iconGoogle-colorPrimary: #DC4A3D;
@bl-customComponent-socialLoginButtons-iconFacebook-colorPrimary: #3C5A9A;
@bl-customComponent-socialLoginButtons-iconTwitter-colorPrimary: #55ACEE;
@bl-customComponent-socialLoginButtons-iconLinkedin-colorPrimary: #0A66C2;
@bl-customComponent-socialLoginButtons-iconGithub-colorPrimary: #000000;
````

## <a name="usage-guide"></a> Usage Guide

Add a component to the page and select the social media buttons you want:

<img alt="tabs" src="./example-images/add-component-to-page.png" width="720" />

Go to the Login Providers tab:

<img alt="tab content id" src="./example-images/go-to-login-providers.png" width="720" />

For all the providers you selected, do the following:
  1. Turn on the toggle.
  2. Fill in the App ID and App Secret fields.
  3. Click the `SAVE` button.

<img alt="tab content" src="./example-images/fill-in-required-fields.png" width="720" />
