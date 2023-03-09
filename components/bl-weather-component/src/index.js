import { useEffect, useState } from 'react';

import ReactWeather, { useOpenWeather } from './lib/reactWeather';

const { cn } = BackendlessUI.CSSUtils;
const UNITS = {
  standard: { temperature: 'K', windSpeed: 'm/s' },
  metric: { temperature: '°C', windSpeed: 'm/s' },
  imperial: { temperature: '°F', windSpeed: 'mph' },
};

export default function WeatherComponent({ component, elRef, settings }) {
  const { classList, style, display, currentLocation, city, coords, forecast, unit, theme, lang } = component;
  const { API_KEY } = settings;

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [weatherCity, setWeatherCity] = useState(null);

  useEffect(() => {
    if (currentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      })
    } else if (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
          setLat(data.coord.lat);
          setLon(data.coord.lon);
          setWeatherCity(data.name);
        })
    } else if (coords && coords.lat && coords.lng) {
      setLat(coords.lat);
      setLon(coords.lng);
    }
  }, [currentLocation, city, coords, API_KEY]);

  useEffect(() => {
    if (lat && lon && !weatherCity) {
      fetchWeatherCity(lat, lon);
    }
  }, [lat, lon]);

  const fetchWeatherCity = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        setWeatherCity(data.name);
      })
  };

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-openWeather', classList) } style={ style }>
      { lat && lon && (
        <Weather
          settings={ settings }
          lat={ lat }
          lon={ lon }
          weatherCity={ weatherCity }
          showForecast={ forecast }
          unit={ unit }
          theme={ theme }
          lang={ lang }
        />
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
