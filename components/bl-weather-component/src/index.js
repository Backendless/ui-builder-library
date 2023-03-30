import { useEffect, useState } from 'react';

import ReactWeather, { useOpenWeather } from './lib/weather';

const { cn } = BackendlessUI.CSSUtils;

const UNITS = {
  standard: { temperature: 'K', windSpeed: 'm/s' },
  metric  : { temperature: '°C', windSpeed: 'm/s' },
  imperial: { temperature: '°F', windSpeed: 'mph' },
};
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export default function WeatherComponent({ component, elRef, settings }) {
  const { classList, style, display, currentLocation, city, coords, forecast, unit, theme, lang } = component;
  const { API_KEY } = settings;

  const { location, weatherCity, hasGeoAccess } = useOptions(currentLocation, city, coords, API_KEY);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-weather', ...classList) } style={ style }>
      { hasGeoAccess && location?.lat && location.lng && (
        <Weather
          settings={ settings }
          lat={ location.lat }
          lon={ location.lng }
          weatherCity={ weatherCity }
          showForecast={ forecast }
          unit={ unit }
          theme={ theme }
          lang={ lang }
        />
      ) }
      { !hasGeoAccess && (
        <p className="warn">To obtain weather data, you must allow access to your location.</p>
      ) }
    </div>
  );
}

function Weather({ settings, lat, lon, weatherCity, showForecast, theme, unit, lang }) {
  const key = settings.API_KEY;
  const unitsLabels = UNITS[unit];
  const { data, isLoading, errorMessage } = useOpenWeather({ key, lat, lon, lang, unit });

  return (
    <ReactWeather
      isLoading={ isLoading }
      errorMessage={ errorMessage }
      data={ data }
      lang={ lang }
      locationLabel={ weatherCity }
      unitsLabels={ unitsLabels }
      showForecast={ showForecast }
      theme={ theme }
    />
  );
}

function useOptions(currentLocation, city, coords, API_KEY) {
  const [location, setLocation] = useState(null);
  const [weatherCity, setWeatherCity] = useState(null);
  const [hasGeoAccess, setHasGeoAccess] = useState(true);

  useEffect(() => {
    if (currentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude }),
        error => {
          console.error(error);
          setHasGeoAccess(false);
        }
      );
    } else if (city) {
      fetch(`${ BASE_URL }/weather?q=${ city }&appid=${ API_KEY }`)
        .then(response => response.json())
        .then(data => {
          setLocation({
            lat: data.coord.lat,
            lng: data.coord.lon });
          setWeatherCity(data.name);
        });
    } else if (coords?.lat && coords.lng) {
      setLocation({
        lat: coords.lat,
        lng: coords.lng });
    }
  }, [currentLocation, city, coords, API_KEY]);

  useEffect(() => {
    if (location?.lat && location.lng && !weatherCity) {
      setCityByLocation(location);
    }
  }, [location, weatherCity]);

  const setCityByLocation = (location) => {
    fetch(`${ BASE_URL }/weather?lat=${ location.lat }&lon=${ location.lng }&appid=${ API_KEY }`)
      .then(response => response.json())
      .then(data => setWeatherCity(data.name));
  };

  return { location, weatherCity, hasGeoAccess };
}
