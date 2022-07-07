import { useCallback, useState, useEffect, useMemo } from 'react';

export function MapTypeSelect({ maps, selected, eventHandlers }) {
  const { onMapTypeChange } = eventHandlers;

  const [currentSelected, setCurrentSelected] = useState(null);

  const mapsArray = useMemo(() => {
    return Object.keys(maps).map(item => ({ ...maps[item], value: item }));
  }, [maps]);

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
  }, [maps, selected, event]);

  return (
    <select
      className="control map-type-select"
      onChange={ handleChange }>
      { mapsArray.map(item => (
        <option
          value={ item.value }
          selected={ item.value === currentSelected }>
          { item.label }
        </option>)) }
    </select>
  );
}
