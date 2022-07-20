# Stepper

Stepper is a component of Backendless UI-Builder designer. This allows you to show the steps of a process. Go to the next step, return to the previous step and reset all steps.

The component based on external [stepper](https://mui.com/material-ui/react-stepper/).
## Usage

### Styles and Settings

<dl>
<dt>Type Stepper Style selector</dt>
<dd>Selector for choose kind Stepper. Defaults to "root"</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Step List</dt>
<dd>User can input list of title steps. Can be determined by Step List Logic.</dd>
<dt>Count Steps</dt>
<dd>It allows for user input count steps without step title. If Step List is inputted, Count Step will not be working. Can be determined by Count Step Logic. Defaults to 2.</dd>
<dt>On Step Change</dt>
<dd>Triggered when current step change</dd>
</dl>

### Action
<dl>
<dt>Go Next Step</dt>
<dd>An action that moves to the next step</dd>
<dt>Go Previous Step</dt>
<dd>An action that moves to the Previous step</dd>
<dt>Reset Step</dt>
<dd>An action that reset steps and return to first step</dd>
<dt>Set step</dt>
<dd>An action that sets the number of steps. Has an input "Step number"</dd>
</dl>
