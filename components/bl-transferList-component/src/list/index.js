import { ListHeader } from './list-header';
import { ListItem } from './list-item';

export const List = props => {
  const { title, iconColor, enableSelectAll, items, selected, allSelected, setAllSelected } = props;

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
          iconColor={ iconColor }
          setAllSelected={ setAllSelected }
        />
      }
      <div className="list__items">
        { items.map(item => {
          const isChecked = allSelected.some(({ objectId }) => item.objectId === objectId);

          return (
            <ListItem
              key={ item.objectId }
              id={ item.objectId }
              value={ item.value }
              label={ item.label }
              iconColor={ iconColor }
              isChecked={ isChecked }
              onChange={ handleToggleItem }
            />
          );
        }) }
      </div>
    </div>
  );
};
