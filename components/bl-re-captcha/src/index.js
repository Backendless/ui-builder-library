import { useCallback, useEffect, useRef, useState } from 'react';

import { ReCaptcha } from './lib/re-captcha';

const { cn } = BackendlessUI.CSSUtils;

const SizeType = {
  COMPACT  : 'compact',
  NORMAL   : 'normal',
  INVISIBLE: 'invisible',
};

const CaptchaComponentMap = {
  [SizeType.COMPACT]  : CaptchaComponent,
  [SizeType.NORMAL]   : CaptchaComponent,
  [SizeType.INVISIBLE]: InvisibleCaptcha,
};

export default function Captcha({ component, eventHandlers, settings }) {
  const { display, style, classList, size } = component;
  const { onErrored } = eventHandlers;
  const { siteKey } = settings;

  const reCaptchaRef = useRef();

  const Captcha = CaptchaComponentMap[size];

  useEffect(() => {
    if (size !== SizeType.INVISIBLE) {
      component.el = reCaptchaRef.current;
    }
  }, [reCaptchaRef]);

  if (!display || !siteKey) {
    return null;
  }

  return (
    <div ref={ reCaptchaRef } className={ cn('bl-customComponent-reCaptcha', classList) } style={ style }>
      <Captcha component={ component } siteKey={ siteKey } onErrored={ onErrored }/>
    </div>
  );
}

function CaptchaComponent({ component, onErrored, siteKey }) {
  const { theme, verificationType, size } = component;

  const [isPassed, setIsPassed] = useState(false);
  const [token, setToken] = useState(null);

  const onChange = value => {
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
      size={ size }
      theme={ theme }
    />
  );
}

function InvisibleCaptcha({ component, siteKey, onErrored }) {
  const { theme, verificationType, size, badge } = component;

  const captchaRef = useRef();

  component.getTokenInvisible = async () => await captchaRef.current.executeAsync();

  return (
    <ReCaptcha
      ref={ captchaRef }
      sitekey={ siteKey }
      type={ verificationType }
      onErrored={ () => onErrored() }
      size={ size }
      badge={ badge }
      theme={ theme }
    />
  );
}
