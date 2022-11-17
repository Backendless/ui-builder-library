import Map from './map';

export default function Mapbox({ component, eventHandlers, settings }) {
  const { display } = component;

  if (!display) {
    return null;
  }

  return (<Map component={ component } eventHandlers={ eventHandlers } settings={ settings }/>);
}
