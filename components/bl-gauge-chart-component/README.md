# Gauge Chart

Gauge Chart is a component of Backendless UI-Builder designer. This is a chart whose purpose is to show the goal and the progress that has already been made.

## Usage

Add a component to your page and add goal and progress properties to the component.

### Component Elements

<dl>
<dt>Goal Line</dt>
<dd>The Goal Line is on background.</dd>
<dt>Progress Line</dt>
<dd>The Progress Line covers the Goal Line.</dd>
</dl>

### Component Properties

  Name                     | Type       | Default value        | Description
 --------------------------|------------|----------------------|-------------------------------------------------------------------------------------
  Disable                  | bool       | false                | This property allows you to disable component.
  Goal                     | number     | 100000               | The `Goal` property allows you to select a target number.
  Progress                 | number     | 50000                | The `Progress` property displays a filled row, the length of which depends on the percentage ratio of the number of this property to the number of the `Goal` property.
