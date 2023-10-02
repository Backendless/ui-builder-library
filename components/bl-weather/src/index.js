import { useEffect, useMemo, useState } from 'react';

import ReactWeather, { useOpenWeather } from './lib/weather';

const { cn } = BackendlessUI.CSSUtils;

const UNITS = {
  standard: { temperature: 'K', windSpeed: 'm/s' },
  metric: { temperature: '°C', windSpeed: 'm/s' },
  imperial: { temperature: '°F', windSpeed: 'mph' }
};

export default function WeatherComponent({ component, elRef, settings }) {
  const {
    classList, style, display, currentLocation, location, label, weatherInfo, date,
    temperature, desc, wind, humidity, weatherIcon, forecast, unit, theme, lang,
  } = component;
  const { API_KEY } = settings;

  const [options, setOptions] = useState({ key: API_KEY, lat: null, lon: null, lang, unit });

  const styles = useStyles(style, weatherInfo, date, temperature, desc, wind, humidity, weatherIcon);

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
    <div ref={ elRef } className={ cn('bl-customComponent-weather', classList) } style={ styles }>
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

function useStyles(style, weatherInfo, date, temperature, desc, wind, humidity, weatherIcon) {
  return useMemo(() => ({
    ...style,
    '--weather-info-width'       : weatherInfo && !weatherIcon ? '100%' : '60%',
    '--weather-icon-width'       : weatherIcon && !weatherInfo ? '100%' : '40%',
    '--weather-info-display'     : weatherInfo ? 'block' : 'none',
    '--weather-icon-display'     : weatherIcon ? 'flex' : 'none',
    '--today-date-display'       : date ? 'block' : 'none',
    '--today-hr-first-display'   : temperature || desc ? 'block' : 'none',
    '--today-temperature-display': temperature ? 'block' : 'none',
    '--today-desc-display'       : desc ? 'block' : 'none',
    '--today-hr-last-display'    : wind || humidity ? 'block' : 'none',
    '--today-wind-display'       : wind ? 'block' : 'none',
    '--today-humidity-display'   : humidity ? 'block' : 'none',
  }), [style, weatherInfo, date, temperature, desc, wind, humidity, weatherIcon]);
}
