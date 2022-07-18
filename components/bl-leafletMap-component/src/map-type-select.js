import { useCallback, useState, useEffect, useMemo } from 'react';
import { MapProviders } from './maps';

export function MapTypeSelect({ selected, eventHandlers }) {
  const { onMapTypeChange } = eventHandlers;

  const [currentSelected, setCurrentSelected] = useState(null);

  const mapsList = useMemo(() => {
    return Object.keys(MapProviders).map(item => ({ label: MapProviders[item].label, value: item }));
  }, []);

  useEffect(() => {
    if (selected) {
      setCurrentSelected(selected);
    }
  }, [selected]);

  const handleChange = useCallback((event) => {
    onMapTypeChange({
      previousType: selected,
      currentType : event.target.value
    });
  }, [selected]);

  return (
    <select className="control map-type-select" onChange={ handleChange }>
      { mapsList.map(item =>
        <option value={ item.value } selected={ item.value === currentSelected }>{ item.label }</option>
      ) }
    </select>
  );
}
