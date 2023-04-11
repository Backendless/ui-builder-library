import { useEffect, useState } from 'react';

import ReactWeather, { useOpenWeather } from './lib/weather';

const { cn } = BackendlessUI.CSSUtils;

const UNITS = {
  standard: { temperature: 'K', windSpeed: 'm/s' },
  metric: { temperature: '°C', windSpeed: 'm/s' },
  imperial: { temperature: '°F', windSpeed: 'mph' }
};

export default function WeatherComponent({ component, elRef, settings }) {
  const { classList, style, display, currentLocation, location, label, forecast, unit, theme, lang, } = component;
  const { API_KEY } = settings;

  const [options, setOptions] = useState({ key: API_KEY, lat: null, lon: null, lang, unit });

  useEffect(async () => {
    const usedLocation = currentLocation ? await BackendlessUI.Navigator.getCurrentGeolocation() : location;

    if(usedLocation?.lat && usedLocation.lng) {
     setOptions({ ...options, lat: usedLocation.lat, lon: usedLocation.lng });
   } else {
    console.error('Location data not provided or provided incorrectly');
   }
  }, [currentLocation, location]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-weather', classList) } style={ style }>
      { options?.lat && options.lon && (
        <Weather options={ options } locationLabel={ label } showForecast={ forecast } theme={ theme } lang={ lang } />
      ) }
    </div>
  );
}

function Weather({ options, locationLabel, showForecast, theme, lang }) {
  const unitsLabels = UNITS[options.unit];
  const { data, isLoading, errorMessage } = useOpenWeather(options);

  return (
    <ReactWeather
      isLoading={ isLoading }
      errorMessage={ errorMessage }
      data={ data }
      lang={ lang }
      locationLabel={ locationLabel }
      unitsLabels={ unitsLabels }
      showForecast={ showForecast }
      theme={ theme }
    />
  );
}
