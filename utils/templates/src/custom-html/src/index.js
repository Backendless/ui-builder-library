import { useEffect, useRef } from 'react';

const customHTML = (`
    <input type="text" class="my-custom-input" placeholder="input anny text and click on the button"/>
    <button class="my-custom-button">My Custom Button</button>
`);

export default function CustomHTMLComponent({ component }) {
  const elRef = useRef(null);

  useEffect(() => {
    const $el = elRef.current;

    $el.innerHTML = customHTML;

    const $input = $el.querySelector('input');
    const $button = $el.querySelector('button');

    $button.addEventListener('click', () => {
      alert('Alert from a custom component: ' + $input.value);
    });
  }, []);

  return (
    <div ref={ elRef } className={ `my-custom-component-container ${ component.classList.join(' ') }` }/>
  );
}
