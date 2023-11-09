import { useMemo } from 'react';

import { ListHeader } from './list-header';
import { ListItem } from './list-item';

export function List(props) {
  const { enableSelectAll, items, title, selected, allSelected, setAllSelected } = props;

  const componentId = useMemo(() => BackendlessUI.UUID.short(), []);

  const handleToggleItem = ({ target: { value, checked } }) => {
    const item = items.find(item => item.value === value);

    if (checked) {
      setAllSelected(prevState => [...prevState, item]);
    } else {
      const newAllSelected = allSelected.filter(({ objectId }) => item.objectId !== objectId);

      setAllSelected(newAllSelected);
    }
  };

  return (
    <div className="list">
      { enableSelectAll &&
        <ListHeader
          items={ items }
          title={ title }
          selected={ selected }
          setAllSelected={ setAllSelected }
        />
      }
      <div className="list__items">
        { items.map(item => {
          const isChecked = allSelected.some(({ objectId }) => item.objectId === objectId);

          return (
            <ListItem
              key={ item.objectId }
              id={ `${ item.objectId }-transfer-list-item-${ componentId }` }
              value={ item.value }
              label={ item.label }
              isChecked={ isChecked }
              onChange={ handleToggleItem }
            />
          );
        }) }
      </div>
    </div>
  );
}
