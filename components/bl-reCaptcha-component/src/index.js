import { useRef, useState, useCallback, useEffect } from 'react';
import { ReCaptcha } from './re-captcha';

const { cn } = BackendlessUI.CSSUtils;

const TypeCaptcha = {
  compact  : CaptchaComponent,
  normal   : CaptchaComponent,
  invisible: InvisibleCaptcha
};

export default function Captcha({ component, eventHandlers, settings }) {
  const { display, style, classList, type } = component;
  const { onErrored } = eventHandlers;
  const { siteKey } = settings;

  const reCaptchaRef = useRef();

  const Captcha = TypeCaptcha[type];

  useEffect(() => {
    if (type !== 'invisible') {
      component.el = reCaptchaRef.current;
    }
  }, [reCaptchaRef]);

  if (!display) {
    return null;
  }

  return (
    <div ref={ reCaptchaRef } className={ cn('bl-customComponent-reCaptcha', classList) } style={ style }>
      <Captcha component={ component } siteKey={ siteKey } onErrored={ onErrored }/>
    </div>
  );
}

function CaptchaComponent({ component, onErrored, siteKey }) {
  const { theme, verificationType, type } = component;

  const [isPassed, setIsPassed] = useState(false);
  const [token, setToken] = useState(null);

  const onChange = (value) => {
    setIsPassed(true);
    setToken(value);
  };

  const onExpired = () => useCallback(() => setIsPassed(false), []);

  component.onPassed = () => isPassed;
  component.onTokenSent = () => {
    setIsPassed(false);

    return token;
  };

  return (
    <ReCaptcha
      sitekey={ siteKey }
      onChange={ onChange }
      onExpired={ onExpired }
      onErrored={ () => onErrored() }
      type={ verificationType }
      size={ type }
      theme={ theme }
    />
  );
}

function InvisibleCaptcha({ component, siteKey, onErrored }) {
  const { theme, verificationType, type, badge } = component;

  const captchaRef = useRef();

  component.getIsPassed = () => true;
  component.getToken = async () => await captchaRef.current.executeAsync();

  return (
    <ReCaptcha
      ref={ captchaRef }
      sitekey={ siteKey }
      type={ verificationType }
      onErrored={ () => onErrored() }
      size={ type }
      badge={ badge }
      theme={ theme }
    />
  );
}
