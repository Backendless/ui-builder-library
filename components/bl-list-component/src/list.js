export function List({ options, items, type }) {
  const ListElement = type || options.type;

  return (
    <ListElement className="list">
      { items.map((item, i) => {
        const { content, children, type } = item;

        return <Item key={ i } content={ content } children={ children } type={ type } options={ options } />;
      }) }
    </ListElement>
  );
}

function Item(props) {
  const { options, key, content, children, type } = props;
  const { style, onClickHandler } = options;

  return (
    <li key={ key } className="list__item" style={ style } onClick={ (e) => onClickHandler(e, content, children) }>
      { content }
      { children && <List items={ children } type={ type } options={ options } /> }
    </li>
  );
}
