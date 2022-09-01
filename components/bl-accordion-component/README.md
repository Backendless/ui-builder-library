# Accordion

This is a component of Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer. It allows the user to show and hide sections of related content on a page. The component supports basic and controlled type of accordion.

Customizations include adjustments of font size, color, background color and padding for both title and content.

<img src="./thumbnail.png" alt="main thumbnail" width="643"/>

## Configuration

After adding the component to the page, specify the accordion data. This can be done in UI-Builder designer or using codeless logic.

## Properties

| Property                 | Type       | Default value                                                                                                    | Logic                 | Data Binding | UI Setting | Description                                                                                             |
|--------------------------|------------|------------------------------------------------------------------------------------------------------------------|-----------------------|--------------|------------|---------------------------------------------------------------------------------------------------------|
| Accordion Data           | *JSON*     | `[{"title": "Collapsible Group Item #1","content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}]` | Accordion Data Logic  | NO           | YES        | Specifies an array of accordion sections. Signature of section: `{title: <string>, content: <string>}`. |
| Controlled Accordion     | *Checkbox* | false                                                                                                            |                       | NO           | YES        | enables expand only one section at the same time                                                        |
| Title Font Size          | *Text*     |                                                                                                                  |                       | NO           | YES        | controls the font size of the accordion section title                                                   |
| Title Color              | *Color*    |                                                                                                                  |                       | NO           | YES        | controls the color of the accordion section title                                                       |
| Title Background Color   | *Color*    |                                                                                                                  |                       | NO           | YES        | controls the background color of the accordion section title                                            |
| Title Padding            | *Text*     |                                                                                                                  |                       | NO           | YES        | controls the padding of the accordion section title                                                     |
| Content Font Size        | *Text*     |                                                                                                                  |                       | NO           | YES        | controls the font size of the accordion section content                                                 |
| Content Color            | *Color*    |                                                                                                                  |                       | NO           | YES        | controls the color of the accordion section content                                                     |
| Content Background Color | *Color*    |                                                                                                                  |                       | NO           | YES        | controls the background color of the accordion section content                                          |
| Content Padding          | *Text*     |                                                                                                                  |                       | NO           | YES        | controls the padding of the accordion section content                                                   |

## Events

| Name                      | Triggers                                               | Context Blocks |
|---------------------------|--------------------------------------------------------|----------------|
| On Open Item Event        | when the user opens the accordion section              | `Item`         |
| On Close Item Event       | when the user closes the accordion section             | `Item`         |
| On Mouse Over Event       | when the mouse pointer hovers over the accordion       |                |
| On Mouse Out Event        | when the mouse pointer leaves the accordion boundaries |                |

## Actions

| Action     | Inputs | Returns |
|------------|--------|---------|
| Open All   |        |         |
| Close All  |        |         |
| Toggle All |        |         |

## Styles

**Theme**

````
@bl-customComponent-accordion-themeColor: @themePrimary;
@bl-customComponent-accordion-backgroundColor: @appBackgroundColor;
@bl-customComponent-accordion-textColor: @appTextColor;
````

**Background**

````
@bl-customComponent-accordion-content-backgroundColor: @bl-customComponent-accordion-backgroundColor;
````

**Dimensions**

````
@bl-customComponent-accordion-width: 100%;
@bl-customComponent-accordion-title-padding: 12px 16px 12px 10px;
@bl-customComponent-accordion-title-width: 100%;
@bl-customComponent-accordion-content-padding: 16px;
@bl-customComponent-accordion-content-width: 100%;
````

**Typography**

````
@bl-customComponent-accordion-fontSize: 16px;
@bl-customComponent-accordion-lineHeight: 1.5;
@bl-customComponent-accordion-title-icon-fontSize: 26px;

````

**Decoration**

````
@bl-customComponent-accordion-borderRadius: 4px;
@bl-customComponent-accordion-border: 1px solid @bl-customComponent-accordion-themeColor;
@bl-customComponent-accordion-item-firstChild-borderRadius: 4px 4px 0 0;
@bl-customComponent-accordion-item-lastChild-borderRadius: 0 0 4px 4px;
@bl-customComponent-accordion-title-icon-transition: all 0.2s ease-in-out;
@bl-customComponent-accordion-title-icon-transform: rotateZ(90deg);
@bl-customComponent-accordion-content-transition: height ease 0.2s;
@bl-customComponent-accordion-content-shadow: 0px 1px 6px 1px fade(@bl-customComponent-accordion-textColor, 30%) inset;
````
