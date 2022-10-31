# Mapbox

This is a component for Backendless [UI-Builder](https://backendless.com/developers/#ui-builder) designer based on the [Mapbox](https://www.mapbox.com/) library.

The component covers basic features of the library and allows you in a couple click render an interactive map in your UI-Builder application.

<p align="center">
  <img src="./thumbnail.png" alt="main thumbnail" width="600"/>
</p>

## Properties

| Property            | Type                                                                                                                            | Default value                        | Logic          | Data Binding | UI Setting | Description                                                                                                                                                                                    |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|----------------|--------------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| markers             | *JSON*                                                                                                                          |                                      | Markers Logic  | YES          | YES        | Specifies an array of markers to display on the map. Watch [Codeless Examples](#Examples). Signature of marker: `{color, description, coordinates: {lat, lng}}`.                               |
| polygons            | *JSON*                                                                                                                          |                                      | Polygons Logic | YES          | YES        | Specifies an array of polygons to display on the map. Watch [Codeless Examples](#Examples). Signature of polygon: `{color, description, opacity, polygon: {boundary: points: [ {lat, lng}]}}`. |
| center              | *JSON*                                                                                                                          | { "lat: 0, <br>"lng": 0 }            | Center Logic   | YES          | YES        | Used to set center on the map.                                                                                                                                                                 |
| zoom                | *Number*                                                                                                                        | 10                                   |                | NO           | YES        | Controls the map zoom.                                                                                                                                                                         |
| directions          | *Checkbox*                                                                                                                      | `false`                              |                | NO           | YES        | Adds directions to the map.                                                                                                                                                                    |
| fullScreen          | *Checkbox*                                                                                                                      | `false`                              |                | NO           | YES        | Adds fullscreen button to the map.                                                                                                                                                             |
| navigation          | *Checkbox*                                                                                                                      | `true`                               |                | NO           | YES        | Adds navigation button to the map.                                                                                                                                                             |
| searchBar           | *Checkbox*                                                                                                                      | `false`                              |                | NO           | YES        | Adds search bar to the map.                                                                                                                                                                    |
| geolocation         | *Checkbox*                                                                                                                      | `false`                              |                | NO           | YES        | Adds geolocation button to the map.                                                                                                                                                            |
| accessToken         | *Text*                                                                                                                          |                                      |                | NO           | YES        | Required token to load map.                                                                                                                                                                    |
| projection          | *Select* <br/>[`mercator`, `globe`, `equalEarth`, `naturalEarth`, `winkelTripel`, `lambertConformalConic`, `equirectangular`]   | 'mercator'                           |                | NO           | YES        | Controls the map type.                                                                                                                                                                         |
| lowerAtmosphere     | *Color*                                                                                                                         | '#BAD2EB'                            |                | NO           | YES        | Sets lower atmosphere color.                                                                                                                                                                   |
| upperAtmosphere     | *Color*                                                                                                                         | '#245CDF'                            |                | NO           | YES        | Sets upper atmosphere color.                                                                                                                                                                   |
| atmosphereThickness | *Number*                                                                                                                        | 0,2                                  |                | NO           | YES        | Sets atmosphere thickness.                                                                                                                                                                     |
| spaceColor          | *Color*                                                                                                                         | '#0B0B19'                            |                | NO           | YES        | Sets space color.                                                                                                                                                                              |
| starIntensity       | *Number*                                                                                                                        | 0,2                                  |                | NO           | YES        | Sets star intensity.                                                                                                                                                                           |
| mapStyle            | *Text*                                                                                                                          | 'mapbox://styles/mapbox/streets-v11' |                | NO           | YES        | Sets map style.                                                                                                                                                                                |

## Events

| Name                       | Triggers                               | Context Blocks                                                                                                                                                                     |
|----------------------------|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| On Click                   | when a user click on map               | Coordinates: `{lat: Number, lng: Number}`                                                                                                                                          |
| On Marker Click            | when a user click on a marker          | Coordinates: `{lat: Number, lng: Number}` <br/> Description: `String`                                                                                                              |
| On Polygon Click           | when a user click on a polygon         | Coordinates: `{lat: Number, lng: Number}` <br/> Description: `String`                                                                                                              |
| On Determining Geoposition | when a user determining geoposition    | Coordinates: `[lat: Number, lng: Number]`                                                                                                                                          |

## Actions

| Action      | Inputs                                                                      | Returns                                |
|-------------|-----------------------------------------------------------------------------|----------------------------------------|
| Is Moving   |                                                                             | `Boolean`: map is moving               |
| Is Zooming  |                                                                             | `Boolean`: map is zooming              |
| Is Rotating |                                                                             | `Boolean`: map is rotating             |
| Set Style   | Style: `Object`, `String` or `Null ` <br/> Options: `Object`                |                                        |
| Get Style   |                                                                             | `Object`: the map's style JSON object  |
| Set Fog     | Fog: `Object`                                                               |                                        |
| Get Fog     |                                                                             | `Object`: Fog object                   |
| Loaded      |                                                                             | `Boolean`: map is loaded               |
| Get Center  |                                                                             | `Object`: `{lng: Number, lat: Number}` |
| Set Center  | Center: `Object` <br/> Event Data: `Object`                                 |                                        |
| Pan By      | Offset: `Point`, `Array` <br/> Options: `Object` <br/> Event Data: `Object` |                                        |
| Pan To      | LngLat: `Object` <br/> Options: `Object` <br/> Event Data: `Object`         |                                        |
| Get Zoom    |                                                                             | `Number`: current map zoom             |
| Set Zoom    | Zoom: `Number` <br/> Event Data: `Object`                                   |                                        |
| Fly To      | Options: `Object` <br/> Event Data: `Object`                                |                                        |

## Styles

**Dimensions**
````
@bl-customComponent-mapbox-height: 400px;
@bl-customComponent-mapbox-width: 600px;
````
## <a name="Examples"></a> Codeless Examples

Addition of markers on map:

![markers example](./example-images/mapbox-markers.png)

Addition of polygons on map:

![polygons example](./example-images/mapbox-polygons.png)
