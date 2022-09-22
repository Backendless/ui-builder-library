import { Chip } from './chip';

export function ChipList({ items }) {
  return (
    <div className="chip__items">
      { items.map(({ label, objectId }) => (
        <Chip key={ objectId } label={ label } />
      )) }
    </div>
  );
}
