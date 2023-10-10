import { useCallback, useEffect, useState } from 'react';

import { MapProviders } from './maps';

const MapProvidersOptions = Object.keys(MapProviders).map(item => ({ label: MapProviders[item].label, value: item }));

export function MapTypeSelect({ selected, eventHandlers, component }) {
  const { onMapTypeChange } = eventHandlers;

  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      setCurrentSelected(selected);
    }
  }, [selected]);

  const handleChange = useCallback(event => {
    const value = event.target.value;
    component.mapType = value;

    onMapTypeChange({
      previousType: selected,
      currentType : value,
    });
  }, [selected]);

  return (
    <select className="control map-type-select" onChange={ handleChange }>
      { MapProvidersOptions.map(({ label, value }) =>
        <option key={ value } value={ value } selected={ value === currentSelected }>{ label }</option>
      ) }
    </select>
  );
}
