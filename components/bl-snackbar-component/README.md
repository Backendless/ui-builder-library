# Snackbar

Snackbars provide brief notifications. Snackbars inform users of a process that an app has performed or will perform.
They appear temporarily, towards the edge or corner of the screen. They shouldn't interrupt the user experience, and
they don't require user input to disappear.

## Usage

Add component on your page and add codeless logic. Use Visibility Action to show snackbar.

### Styles and settings

<dl>
<dt>Distance</dt>
<dd>The value of the distance from the edges of the page. Defaults to 15px.

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

| Name                    | Default value   | Description                                                                                                                                                                                |
|-------------------------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Show Close Button       | true            | This checkbox toggles the visibility of close button. If checked close button is visible. Value: Boolean (true, false).                                                                    |
| Show Action Button      | false           | This checkbox toggles the visibility of action button. If checked action button is visible. Value: Boolean (true, false).                                                                  |
| Auto Hide               | false           | This checkbox toggles the auto hiding of component. If checked snackbar will hide after time from `Auto Hide Duraiton`, if unchecked snackbar will not hide. Value: Boolean (true, false). |
| Auto Hide Duration      | 5000            | This option is to set the time when the snackbar will disappear. Value: Number from 0.                                                                                                     |
| Vertical Position       | Top             | This option is to set the vertical position where snackbar will appear. Available 3 positions: `Top`, `Bottom` and `Center`. Value: String ('Top', 'Bottom', 'Center').                    |
| Horizontal Position     | Right           | This option is to set the horizontal position where snackbar will appear. Available 3 positions: `Left`, `Center` and `Right`. Value: String ('Left', 'Center', 'Right').                  |
| Snackbar Content        | "Snackbar info" | This option is to set the snackbar text. Value: String                                                                                                                                     |
| Action Button Content   | "Action"        | This option is to set the action button text. Works only if "Show Action Button" is `true`. Value: String                                                                                  |
| Type                    | Default         | This option is to set the type of snackbar. Available 5 types: `Info`, `Success`, `Warning`, `Error` and `Default`. Value: String ('info', 'success', 'warning', 'error' or '').           |
| Max Snacks on Page      | 3               | This option is to set the number of maximum visible snackbars. Value: Number from 0.                                                                                                       |

### Event Handlers and Bindable Properties

<dl>
<dt>onClose Click</dt>
<dd>This event triggering when user clicks on close button.</dd>

<dt>onAction Click</dt>
<dd>This event triggering when user clicks on action button.</dd>
</dl>

### Actions

<dl>
<dt>Create</dt>

<dd>This action is to call Snackbar with different properties.

Action has inputs to set all properties:  `Show Close Button`, `Show Action Button`, `Snackbar Content`, `Action Button Content`, `Type`. All inputs are
optional, empty inputs will get data from properties or default. After calling the action, Snackbar will appear with the
set parameters.
</dd>
</dl>
