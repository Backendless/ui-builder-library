# List

List is the component that can be used in Backendless [UI-Builder](https://backendless.com/developers/#ui-builder). It allows you to add a standard list to your application. Select the type of list (ordered/unordered) and specify the data that will be displayed inside the list.
More information about list you can find [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li).

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property   | Type                       | Default value | Logic           | Data Binding | UI Setting | Description                                                                                                                                                                                                             |
|------------|----------------------------|---------------|-----------------|--------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Type       | *Select* <br> [`ul`, `ol`] | `ul`          | Type Logic      | NO           | YES        | Controls the type of list(ul/ol).                                                                                                                                                                                       |
| Items List | *JSON*                     | `[]`          | ListItems Logic | YES          | NO         | Specifies a JSON array containing data of the list items. Watch [Codeless Examples] (#Examples). Signature of items list: [ <Item> ]. Signature of item: { content: String, children: [ <Item> ], typeOfList: String }. |
| Background | *Color*                    |               |                 | NO           | YES        | Controls the background color of the main block.                                                                                                                                                                        |
| Width      | *Text*                     |               |                 | NO           | YES        | Controls the width of the main block.                                                                                                                                                                                   |
| Color      | *Color*                    |               |                 | NO           | YES        | Controls the color of the list items.                                                                                                                                                                                   |
| Font Size  | *Text*                     |               |                 | NO           | YES        | Controls the font size of the list items.                                                                                                                                                                               |
| Padding    | *Text*                     |               |                 | NO           | YES        | Controls the padding of the list items.                                                                                                                                                                                 |

## Events

| Name                      | Triggers                                               | Context Blocks |
|---------------------------|--------------------------------------------------------|----------------|
| On Click List Item        | when the user click any item of the list               | `List Item`    |

## Styles

**Theme**
````
@bl-customComponent-list-theme: @themePrimary;
@bl-customComponent-list-themeTextColor: @appTextColor;
````

**Dimensions**
```
@bl-customComponent-list-item-fontSize: 1rem;
```

## Examples

Below is a Codeless Example highlighting how to use the List component:

![list data example](example-images/list-data-example.png)
![list data example view](example-images/list-data-example-view.png)

<details>
<summary>Try yourself</summary>

```
<block xmlns="http://www.w3.org/1999/xhtml" type="lists_create_with" id="}*;|,#0_Z[tOJ?@cKV9H" x="150.875" y="100"><mutation items="3"></mutation><value name="ADD0"><block type="create_object" id="/zK*8nmzV+?ML[Tf-27e"><mutation><properties><item id="property" prop-name="content"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="F[+@LEq=j2.Q/(hM$]iK"><field name="TEXT">Coffee</field></block></value></block></value><value name="ADD1"><block type="create_object" id="hm~b/suf0wkub39.WNAH"><mutation><properties><item id="property" prop-name="content"></item><item id="property" prop-name="children"></item><item id="property" prop-name="typeOfList"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="6yE6YRpt;FXa8Nrjnol*"><field name="TEXT">Tea</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="lists_create_with" id="8I82hc[apoLNykUEIw,h"><mutation items="3"></mutation><value name="ADD0"><block type="create_object" id="]jaCGrMskWME[wAX%$er"><mutation><properties><item id="property" prop-name="content"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="uLpUcuq1e3ZYRZ:3Jb:P"><field name="TEXT">green</field></block></value></block></value><value name="ADD1"><block type="create_object" id="#FCIb-n,511~i0H|jCON"><mutation><properties><item id="property" prop-name="content"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="^!YpVwfuX4~WCFPMg/kw"><field name="TEXT">white with flowers and citrus fruits</field></block></value></block></value><value name="ADD2"><block type="create_object" id="If]S8iA=k-6^n[o?yZQt"><mutation><properties><item id="property" prop-name="content"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="2m~*7$x!YS:j?]o9M(n^"><field name="TEXT">black "Earl Grey"</field></block></value></block></value></block></value><value name="create_object_mutator_container_properties_stack_property2"><block type="text" id="@?f/H.1UXaJ9Iv2]Tca)"><field name="TEXT">ol</field></block></value></block></value><value name="ADD2"><block type="create_object" id="p`|+xw_7~#/j@V0.q=Am"><mutation><properties><item id="property" prop-name="content"></item><item id="property" prop-name="children"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="1o2ekqY5Lzy,#D@m/a40"><field name="TEXT">Water</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="lists_create_with" id="$3*T{vpO**.|X(*f)z8+"><mutation items="2"></mutation><value name="ADD0"><block type="create_object" id="fN()3a.HVD0aEW](2|C="><mutation><properties><item id="property" prop-name="content"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="wJtGxK.,KCl9:E/Q/PsI"><field name="TEXT">carbonated</field></block></value></block></value><value name="ADD1"><block type="create_object" id="=03i|]_:7^jYn3GUHe,("><mutation><properties><item id="property" prop-name="content"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="k9-.:a{Ip,9`q)`D4Qx5"><field name="TEXT">non-carbonated</field></block></value></block></value></block></value></block></value></block>
```
</details>
