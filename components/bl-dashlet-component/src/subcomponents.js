export function ContextMenu({ contextBlock, contextBlockHandler }) {
  return (
    <div className="dashlet__context-block">
      <ul className="dashlet__context-block-list">
        { contextBlock.map(({ label, type, content }) => {
          if (type === 'link') {
            return <ContextBlockLink content={ content } label={ label }/>;
          } else if (type === 'action') {
            return (
              <ContextBlockAction
                content={ content }
                label={ label }
                contextBlockHandler={ contextBlockHandler }
              />
            );
          }
        }) }
      </ul>
    </div>
  );
}

export function ContextBlockLink({ content, label }) {
  return (
    <li>
      <a className="dashlet__context-block-item link" href={ content } target="_blank">
        <ContextBlockItemIcon/>
        { label }
      </a>
    </li>
  );
}

export function ContextBlockAction({ content, label, contextBlockHandler }) {
  return (
    <li>
      <button
        className="dashlet__context-block-item action"
        type="button"
        onClick={ () => contextBlockHandler({ content }) }>
        <ContextBlockItemIcon/>
        { label }
      </button>
    </li>
  );
}

export function ContextBlockButtonIcon() {
  return (
    <svg className="dashlet__context-block-button-icon" viewBox="0 0 24 24">
      <path
        d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/>
    </svg>
  );
}

export function CollapseButtonIcon({ isOpen }) {
  return (
    <svg
      className="collapse-icon"
      style={ { transform: isOpen ? 'rotate(180deg)' : 'rotate(90deg)' } }
      viewBox="0 0 24 24">
      <path d="M24 22h-24l12-20z"/>
    </svg>
  );
}

function ContextBlockItemIcon() {
  return (
    <svg className="dashlet__context-block-item-icon" viewBox="0 0 24 24">
      <path
        d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z"/>
    </svg>
  );
}
