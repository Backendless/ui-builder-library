# Ace Code Editor

Ace Code Editor is a component of Backendless UI-Builder designer. The Ace Code Editor component is the high-performance code editor for the web. This component is created using the [react-ace](https://www.npmjs.com/package/react-ace) library.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property                                            | Type                                                                                                                                                                                                               | Default Value   | Logic                         | Data Binding | UI Setting | Description                                                                    |
|-----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|-------------------------------|--------------|------------|--------------------------------------------------------------------------------|
| Read Only<br/>`readOnly`                            | Checkbox                                                                                                                                                                                                           | `false`         | Read Only Logic               | YES          | YES        | This handler allows you to disable editing of the component value.             |
| Value<br/>`value`                                   | Text                                                                                                                                                                                                               | ""              | Value Logic                   | YES          | NO         | This handler allows you to add value to the component. Watch [Usage Guide](#usage-guide). |
| Mode<br/>`mode`                                     | Select [Java:`java`<br/>JavaScript:`javascript`<br/>TypeScript:`typescript`<br/>Python:`python`<br/>JSON:`json`<br/>PHP:`php`</br>C and C++:`c_cpp`<br/>C#:`csharp`<br/>Ruby:`ruby`<br/>HTML:`html`<br/>CSS:`css`] | Java:`java`     | Mode Logic                    | YES          | YES        | This handler allows you to select the mode of a component.                     |
| Theme<br/>`theme`                                   | Select [GitHub:`github`<br/>Chrome:`chrome`<br/>Monokai:`monokai`<br/>Nord Dark:`nord_dark`<br/>Twilight:`twilight`<br/>idle Fingers:`idle_fingers`]                                                               | GitHub:`github` | Theme Logic                   | YES          | YES        | This handler allows you to select the theme of a component.                    |
| Fold Style<br/>`foldStyle`                          | Select [Manual:`manual`<br/>Mark begin:`markbegin`<br/>Mark begin and end:`markbeginend`]                                                                                                                          | Manual:`manual` | Fold Style Logic              | NO           | YES        | This handler allows you to select the fold style.                              |
| Placeholder<br/>`placeholder`                       | Text                                                                                                                                                                                                               | "Placeholder"   | Placeholder Logic             | NO           | YES        | This handler allows you to specify the placeholder for a component.            |
| Width<br/>`width`                                   | Text                                                                                                                                                                                                               | "750px"         | Width Logic                   | YES          | YES        | This handler allows you to specify the width of a component.                   |
| Height<br/>`height`                                 | Text                                                                                                                                                                                                               | "500px"         | Height Logic                  | YES          | YES        | This handler allows you to specify the height of a component.                  |
| Font Size<br/>`fontSize`                            | Number                                                                                                                                                                                                             | 16              | Font Size Logic               | YES          | YES        | This handler allows you to specify the font size for the value of a component. |
| Tab Size<br/>`tabSize`                              | Number                                                                                                                                                                                                             | 4               | Tab Size Logic                | NO           | YES        | This handler allows you to specify the tab size.                               |
| Print Margin Column<br/>`printMarginColumn`         | Number                                                                                                                                                                                                             | 80              | Print Margin Column Logic     | NO           | YES        | This handler allows you to specify the print margin column.                    |
| Print Margin Visibility<br/>`printMarginVisibility` | Checkbox                                                                                                                                                                                                           | `true`          | Print Margin Visibility Logic | NO           | YES        | This handler allows you to control the visibility of the print margin.         |
| Gutter Visibility<br/>`gutterVisibility`            | Checkbox                                                                                                                                                                                                           | `true`          | Gutter Visibility Logic       | NO           | YES        | This handler allows you to control the visibility of the gutter.               |
| Autocompletion<br/>`autocompletion`                 | Checkbox                                                                                                                                                                                                           | `false`         | Autocompletion Logic          | NO           | YES        | This handler allows you to add auto-completion capability for a component.     |
| Highlight Active Line<br/>`highlightActiveLine`     | Checkbox                                                                                                                                                                                                           | `true`          | Highlight Active Line Logic   | NO           | YES        | This handler allows you to add a highlight for the active line.                |
| Highlight Selected Word<br/>`highlightSelectedWord` | Checkbox                                                                                                                                                                                                           | `false`         | Highlight Selected Word Logic | NO           | YES        | This handler allows you to add the ability to highlight the selected word.     |
| Show Invisibles<br/>`showInvisibles`                | Checkbox                                                                                                                                                                                                           | `false`         | Show Invisibles Logic         | NO           | YES        | This handler allows you to add the ability to highlight empty spaces.          |
## Events

| Name            | Triggers                                | Context Blocks          |
|-----------------|-----------------------------------------|-------------------------|
| On Change Event | when the value of the component changes | Value: `String`         |

## Actions

| Action          | Inputs                                  | Returns                 |
|-----------------|-----------------------------------------|-------------------------|
| Set Value       | Value: `String`                         |                         |
| Get Value       |                                         | `String`: current value |

## <a id="usage-guide"></a> Usage Guide

> **To paste code using `Value` property:**

1. Select the `Custom Code` block:

![usage-guide](./example-images/select-custom-code-block.png)

2. Open the editor:

![usage-guide](./example-images/open-editor.png)

3. Paste the code and select `Return result` checkbox:

![usage-guide](./example-images/paste-code.png)

4. Paste the `Custom Code` block into the `Value` block return:

![usage-guide](./example-images/return-custom-code-block.png)
