# Snackbar

Snackbars provide brief notifications. Snackbars inform users of a process that an app has performed or will perform.
They appear temporarily, towards the corner of the screen. They shouldn't interrupt the user experience, and they don't
require user input to disappear.

## Usage

Add component on your page and add codeless logic which will show snackbar. Use Show Logic handler to load to show
snackbar.    
Show Logic handler getting boolean value. If true component will appear.

### Options

<dl>
<dt>Snackbar content</dt>

    Default: "Snackbar Info"

<dd>This handler is to set the snackbar text. 
To set the value you can write in settings or use Snackbar Content Logic.
If Snackbar Content Logic is used, settings value will not work.</dd>

<dt>Type</dt>

    Default: "Info"

<dd>This handler is to set the snackbar type.
To set the value you can write in settings or use Type Logic.
If Type Logic is used, settings value will not work.

Available 4 types of snackbar: `"Info"`, `"Success"`, `"Warning"`, `"Error"`.
</dd>
<dt>Action Content</dt>

    Default: "Action"

<dd>This handler is to set the snackbar action button content.
To set the value you can write in settings or use Action Content Logic.
If Action Content Logic is used, settings value will not work.</dd>
<dt>onClose Click</dt>
<dd>This event triggering when user clicks on close button.</dd>
<dt>onAction Click</dt>
<dd>This event triggering when user clicks on action button.</dd>
</dl>

| Name                    | Default value   | Description                                                                                                                                                                     |
|-------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Show Close Button       | true            | This checkbox toggles the visibility of close button. If true close button is visible.                                                                                          |
| Show Action Button      | false           | This checkbox toggles the visibility of action button. If true action button is visible.                                                                                        |
| Auto Hide Duration      | 0               | This option is to set the time when the snackbar will disappear. If `0` snack bar will not disappear else user can set the time in milliseconds when snackbar should be hidden. |
| Vertical Position       | "Top"           | This option is to set the vertical position where snackbar will appear. Available 3 positions: `Top`, `Bottom` and `Center`.                                                    |
| Horizontal Position     | "Right"         | This option is to set the horizontal position where snackbar will appear. Available 3 positions: `Left`, `Center` and `Right`.                                                  |
| Snackbar Content        | "Snackbar info" | This option is to set the snackbar text.                                                                                                                                        |
| Action Button Content   | "Action"        | This option is to set the action button text.                                                                                                                                   |
| Type                    | "Info"          | This option is to set the type of snackbar. Available 4 types: `Info`, `Success`, `Warning` and `Error`.                                                                        |

### Styling

Snackbar supports themes. It is also possible to change.
<dl>
<dt>Distance</dt>

    Default: 15px

<dd>The value of the distance from the edges of the page.

    @bl-customComponent-distance: 15px;

</dd>
<dt>Default Snackbar</dt>
<dd>Using colors from app theme.

    @bl-customComponent-snackBar-background-color
    @bl-customComponent-snackBar-text-color

</dd>
<dt>Success Snackbar</dt>
<dd>

    Default background color: #4e9a51 

    @bl-customComponent-snackBar-success-background-color
    @bl-customComponent-snackBar-success-color-text

</dd>

<dt>Info Snackbar</dt>
<dd>

    Default background color: #1e95d6

    @bl-customComponent-snackBar-info-background-color
    @bl-customComponent-snackBar-info-color-text

</dd>
<dt>Warning Snackbar</dt>
<dd>

    Default background color: #f68a1c

    @bl-customComponent-snackBar-warning-background-color
    @bl-customComponent-snackBar-warning-color-text

</dd>
<dt>Error Snackbar</dt>
<dd>

    Default background color: #d84646

    @bl-customComponent-snackBar-error-background-color
    @bl-customComponent-snackBar-error-color-text

</dd>

</dl>