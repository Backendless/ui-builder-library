# Mention

Mention is a component of Backendless UI-Builder designer. This allows referring someone or something.

The component is based on external [Mention](https://www.primefaces.org/primereact/mention/).

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="780"/>
</p>

## Properties

| Property       | Type       | Default Value               | Logic             | Data Binding | UI Setting | Description                                                                                                                                                                                       |
|----------------|------------|-----------------------------|-------------------|--------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Trigger        | *Text*     | '@'                         | Trigger Logic     | YES          | YES        | It is a handler to set trigger keywords.                                                                                                                                                          |
| Suggestions    | *JSON*     |                             | Suggestions Logic | YES          | YES        | It is a handler to set an array of suggestion objects to display. Watch [Codeless Examples](#codeless-examples). Signature of suggestion object: `{trigger, suggestions: [name, nickname, img]}`. |
| Field          | *Text*     | "nickname"                  | Field Logic       | YES          | YES        | It is a handler to sets a field of a suggested object to resolve and display.                                                                                                                     |
| Scroll Height  | *Text*     | '200px'                     |                   | NO           | YES        | It is a handler to set the maximum height of the suggestions panel.                                                                                                                               |
| Auto Highlight | *Checkbox* | `true`                      |                   | NO           | YES        | It is a handler to set auto-highlighting. When enabled, it highlights the first item in the list by default.                                                                                      |
| Placeholder    | *Text*     | 'Please enter @ to mention' |                   | NO           | YES        | It is a handler to set a placeholder of the component.                                                                                                                                            |
| Delay          | *Number*   | 0                           |                   | NO           | YES        | It is a handler to sets a delay between keystrokes to wait before sending a query.                                                                                                                |
| Autoresize     | *Checkbox* | `false`                     |                   | NO           | YES        | It is a handler to allow autoresizing.                                                                                                                                                            |
| Rows           | *Number*   | 5                           |                   | NO           | YES        | It is a handler to set a number of rows of the component.                                                                                                                                         |
| Cols           | *Number*   | 40                          |                   | NO           | YES        | It is a handler to set a number of columns of the component.                                                                                                                                      |
| Hide Filed     | *Text*     |                             | Hide Field Logic  | YES          | YES        | It is a handler to determine which fields will not show in suggestions.                                                                                                                           |

## Events

| Name            | Triggers                               | Context Blocks                     |
|-----------------|----------------------------------------|------------------------------------|
| On Change Event | When the value changes                 | Value: `String`                    |
| On Focus Event  | When the element receives focus        |                                    |
| On Blur Event   | When the element loses focus           |                                    |
| On Show Event   | When the overlay panel becomes visible | Suggestions: `[{suggestion}, ...]` |
| On Hide Event   | When the overlay panel becomes hidden  |                                    |
| On Search Event | When started suggestions search        | Search Value: `String`             |

## Styles

**Theme**
````
@bl-customComponent-Mention-color: @appTextColor;
@bl-customComponent-Mention-background: @appBackgroundColor;
@bl-customComponent-Mention-border: 1px solid @themePrimary;
@bl-customComponent-Mention-inputText-enabled-hover-borderColor: fadeout(@themePrimary, 50%);
@bl-customComponent-Mention-inputText-enabled-focus-boxShadow: 0 0 0 0.2rem lighten(@themePrimary, 35%);
@bl-customComponent-Mention-inputText-enabled-focus-borderColor: fadeout(@themePrimary, 50%);
@bl-customComponent-Mention-inputText-borderColor: @themePrimary;
@bl-customComponent-Mention-panel-background: @appBackgroundColor;
@bl-customComponent-Mention-panel-color: @appTextColor;
@bl-customComponent-Mention-item-color: @appTextColor;
@bl-customComponent-Mention-item-color-hover: #appTextColor;
@bl-customComponent-Mention-item-background-hover: average(@appBackgroundColor, @themePrimary);
@bl-customComponent-Mention-item-highlight-color: #appTextColor;
@bl-customComponent-Mention-item-highlight-background: darken(average(@appBackgroundColor, @themePrimary), 40%);
````

**Dimensions**
````
@bl-customComponent-Mention-borderRadius: 6px;
@bl-customComponent-Mention-panel-border: 0 none;
@bl-customComponent-Mention-panel-borderRadius: 6px;
@bl-customComponent-Mention-panel-boxShadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
@bl-customComponent-Mention-item-border: 0 none;
@bl-customComponent-Mention-item-img-width: 32px;
````

**Color**
````
@bl-customComponent-Mention-item-background: transparent;
````

## Codeless Examples

Adding suggestions:

![suggestions example](./example-images/mention-example.png)

<details><summary>Try yourself</summary>

````javascript
<block xmlns="http://www.w3.org/1999/xhtml" type="lists_create_with" id="wb+rwP@SP7S%t1|;93ZI" x="196.73333740234375" y="110"><mutation items="2"></mutation><value name="ADD0"><block type="create_object" id="BPwxnc^A$Fv+s(cGx*=H"><mutation><properties><item id="property" prop-name="trigger"></item><item id="property" prop-name="suggestions"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="uaZH:w25Z0-M[b`Zp9(4"><field name="TEXT">@</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="lists_create_with" id="(2;HPr1QP5{]@F(`ve~Y"><mutation items="3"></mutation><value name="ADD0"><block type="create_object" id="`gC(2|4A2zt:rcJCxrqJ"><mutation><properties><item id="property" prop-name="nickname"></item><item id="property" prop-name="name"></item><item id="property" prop-name="img"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="1U2_eDtk6iv,lFHE*@6_"><field name="TEXT">jamesButt</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="text" id="]0smtJY(a!K@*rE79fOL"><field name="TEXT">James Butt</field></block></value><value name="create_object_mutator_container_properties_stack_property2"><block type="text" id="f@AhW~mECeIDh3raEB/Q"><field name="TEXT">https://i.pravatar.cc/50?img=3</field></block></value></block></value><value name="ADD1"><block type="create_object" id="$vcva;63={Z}qPl}WXE0"><mutation><properties><item id="property" prop-name="nickname"></item><item id="property" prop-name="name"></item><item id="property" prop-name="img"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="o2_;fZuMSPWN]%GN9#NA"><field name="TEXT">krisMarrier</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="text" id=".-H}];KoZ.zSxEi1El|P"><field name="TEXT">Kris Marrier</field></block></value><value name="create_object_mutator_container_properties_stack_property2"><block type="text" id="]pC6Ttq-,d,U[3Z9bT[m"><field name="TEXT">https://i.pravatar.cc/50?img=2</field></block></value></block></value><value name="ADD2"><block type="create_object" id="q%xT]3UAjpfwS4SRyMA]"><mutation><properties><item id="property" prop-name="nickname"></item><item id="property" prop-name="name"></item><item id="property" prop-name="img"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="Kl(b1;qi~*@kl*ikS/q2"><field name="TEXT">josephineDarakjy</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="text" id="O:-UV3`*1f~v:rOwwHL`"><field name="TEXT">Josephine Darakjy</field></block></value><value name="create_object_mutator_container_properties_stack_property2"><block type="text" id="37Sl:yOLw)TpnTopHmr]"><field name="TEXT">https://i.pravatar.cc/50?img=1</field></block></value></block></value></block></value></block></value><value name="ADD1"><block type="create_object" id="b~7{n-:#ay=B;}Cg5{cC"><mutation><properties><item id="property" prop-name="trigger"></item><item id="property" prop-name="suggestions"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="Cj_hR#r`_KO5[%HtLg@i"><field name="TEXT">#</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="lists_create_with" id="8#,G+mn9F)y$.nJ`V3hJ"><mutation items="3"></mutation><value name="ADD0"><block type="create_object" id="F|Q-^+C#apJmznn0pEFz"><mutation><properties><item id="property" prop-name="field"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="K%qX6^8*)WRuMsSO8u!Z"><field name="TEXT">primereact</field></block></value></block></value><value name="ADD1"><block type="create_object" id="z^Tk!LY%v^x1P$*u4fzf"><mutation><properties><item id="property" prop-name="field"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="57w97MI(lJFUjJDU%~Pv"><field name="TEXT">primefaces</field></block></value></block></value><value name="ADD2"><block type="create_object" id="(Y)e,qCc=#[%ApW=o5P%"><mutation><properties><item id="property" prop-name="field"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="91-A~*z67Mw8/b(--a`z"><field name="TEXT">primeng</field></block></value></block></value></block></value></block></value></block>
````
</details>

Optimized load of suggestions:

![onSearch example](./example-images/mention-example-on-search.png)

<details><summary>Try yourself</summary>

````javascript
<block xmlns="http://www.w3.org/1999/xhtml" type="lists_create_with" id="|Bf$+b~)[I!#Pp@Nqvx7" x="230.39999999999986" y="40.31999999999998"><mutation items="1"></mutation><value name="ADD0"><block type="create_object" id="neurkePyHAZ0E)s`)]*e"><mutation><properties><item id="property" prop-name="trigger"></item><item id="property" prop-name="suggestions"></item></properties></mutation><value name="create_object_mutator_container_properties_stack_property0"><block type="text" id="5+A{W_8C@IkKCuWP|yvT"><field name="TEXT">@</field></block></value><value name="create_object_mutator_container_properties_stack_property1"><block type="get_table_objects" id="6M`UtJ^;:zdWFw(o!^68"><value name="table_name"><shadow type="text" id="ac:H1@TVqm6s+|7rFZ^4"><field name="TEXT">Table</field></shadow></value><value name="having_clause"><block type="text_join" id="?qqm;|lsbj/I]8OkdI%`"><mutation items="3"></mutation><value name="ADD0"><block type="text" id="*jcMoQPo12b2|d0K`9e/"><field name="TEXT">field LIKE '%</field></block></value><value name="ADD1"><block type="root_block_ui_builder_c_9caa572d06d9006e2afa63415a71193c_onSearch_handler_context_blocks_searchValue" id=")OjP_`##P72)#_2vE%?T" bl_meta="{&quot;label&quot;:&quot;Search Value&quot;}"></block></value><value name="ADD2"><block type="text" id="c=[pzKL~/UGrUlSk|qjt"><field name="TEXT">%'</field></block></value></block></value><value name="page_size"><shadow type="math_number" id="}{e#th:f(,.h`Gv^CFDM"><field name="NUM">10</field></shadow></value></block></value></block></value></block>
````
</details>
