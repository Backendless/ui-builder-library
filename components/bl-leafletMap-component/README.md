# Leaflet Map

Leaflet Map is a component of Backendless UI-Builder designer. It is an interactive map. The component is configurable,
you can start point, default zoom and map type.

The component based on external [Leaflet](https://github.com/Leaflet/Leaflet) library.

## Usage

### Styles and Settings

<dl>
<dt>Map Visibility</dt>
<dd>Used to determine the visibility of a component.</dd>
<dt>Center</dt>
<dd>Specifies the default visible area. Defaults to "40.74, -73.96".</dd>
<dt>Zoom</dt>
<dd>Specifies the default zoom. Defaults to "10".</dd>
<dt>Map Type</dt>
<dd>Specifies the type of map. Defaults to "Open Street"</dd>
<dt>Zoom Control</dt>
<dd>Specifies whether the zoom is allowed. Defaults to "true".</dd>
<dt>Dragging Control</dt>
<dd>Specifies whether the dragging is allowed. Defaults to "true".</dd>
<dt>Map Type Control</dt>
<dd>Specifies whether the map type control is allowed. Defaults to "true".</dd>
<dt>Geoposition Control</dt>
<dd>Specifies whether the geoposition control is allowed. Defaults to "true".</dd>
<dt>Fullscreen Control</dt>
<dd>Specifies whether the fullscreen control is allowed. Defaults to "true".</dd>
<dt>Fullscreen</dt>
<dd>Specifies whether your map will be fullscreen. Defaults to "false".</dd>
</dl>

### Event Handlers and Bindable Properties

<dl>
<dt>Map Visibility Logic</dt>
<dd>Used to control component visibility in Backendless Logic.</dd>
<dt>Center Logic</dt>
<dd>Used to specifies center on map in Backendless Logic.</dd>
<dt>Zoom Logic</dt>
<dd>Used to specifies zoom on map in Backendless Logic.</dd>
<dt>Markers Logic</dt>
<dd>Specifies an array of markers to display on the map in Backendless Logic. Signature of marker: {description, point}.</dd>
<dt>Circles Logic</dt>
<dd>Specifies an array of circles to display on the map in Backendless Logic. Signature of circle: {description, point, radius}.</dd>
<dt>Polygons Logic</dt>
<dd>Specifies an array of polygons to display on the map. Signature of polygon: {description, [points]}.</dd>
<dt>Map Type Logic</dt>
<dd>Used to specifies a map type in Backendless Logic.</dd>
<dt>Zoom Control Logic</dt>
<dd>Used to enable or disable zoom control in Backendless Logic.</dd>
<dt>Dragging Control Logic</dt>
<dd>Used to enable or disable dragging control in Backendless Logic.</dd>
<dt>Map Type Control Logic</dt>
<dd>Used to enable or disable map type control in Backendless Logic.</dd>
<dt>Geoposition Control Logic</dt>
<dd>Used to enable or disable geoposition control in Backendless Logic.</dd>
<dt>Fullscreen Control Logic</dt>
<dd>Used to enable or disable fullscreen control in Backendless Logic.</dd>
<dt>Fullscreen Logic</dt>
<dd>Used to specifies fullscreen value in Backendless Logic.</dd>
<dt>On Click Event</dt>
<dd>Triggered when the user click on the map.</dd>
<dt>On Marker Click Event</dt>
<dd>This event triggered when the user click on marker.</dd>
<dt>On Circle Click Event</dt>
<dd>This event triggered when the user click on circle.</dd>
<dt>On Polygon Click Event</dt>
<dd>This event triggered when the user click on polygon.</dd>
<dt>On Map Type Change Event</dt>
<dd>This event triggered when the user changed map type.</dd>
<dt>On Determining Geoposition Event</dt>
<dd>This event triggered when user determining geoposition.</dd>
<dt>On Fullscreen Button Click Event</dt>
<dd>This event triggered when the user click on fullscreen button.</dd>
</dl>

### Actions

<dl>
<dt>Set map center</dt>
<dd>Allows you to set the center on the map by coordinates in Backendless Logic.</dd>
<dt>Set zoom</dt>
<dd>Allows you to set the zoom on the map in Backendless Logic.</dd>
<dt>Get map center</dt>
<dd>Allows you to get the center coordinates on the map in Backendless Logic.</dd>
<dt>Get map zoom</dt>
<dd>Allows you to get the zoom on the map in Backendless Logic.</dd>
<dt>Get all markers</dt>
<dd>Allows you to get the all markers on the map in Backendless Logic.</dd>
<dt>Get all circles</dt>
<dd>Allows you to get the all circles on the map in Backendless Logic.</dd>
<dt>Get all polygons</dt>
<dd>Allows you to get the all polygons on the map in Backendless Logic.</dd>
</dl>
