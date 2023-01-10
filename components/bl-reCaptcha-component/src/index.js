import { useRef, useState } from 'react';
import { ReCaptcha } from './re-captcha';

const { cn } = BackendlessUI.CSSUtils;

const SizeCaptcha = {
  compact  : CaptchaComponent,
  normal   : CaptchaComponent,
  invisible: InvisibleCaptcha
};

export default function Captcha({ component, settings }) {
  const { display, style, classList, size } = component;
  const { siteKey } = settings;

  const Captcha = SizeCaptcha[size];

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-reCaptcha', classList) } style={ style }>
      <Captcha component={ component } siteKey={ siteKey }/>
    </div>
  );
}

function CaptchaComponent({ component, siteKey }) {
  const { theme, type, size } = component;

  const [isPassed, setIsPassed] = useState(false);
  const [token, setToken] = useState(null);

  const onChange = (value) => {
    setIsPassed(true);
    setToken(value);
  };

  const onExpired = () => setIsPassed(false);

  component.getIsPassed = () => isPassed;
  component.getToken = () => {
    setIsPassed(false);

    return token;
  };

  return (
    <ReCaptcha
      sitekey={ siteKey }
      onChange={ onChange }
      onExpired={ onExpired }
      type={ type }
      size={ size }
      theme={ theme }
    />
  );
}

function InvisibleCaptcha({ component, siteKey }) {
  const { theme, type, size, badge } = component;

  const captchaRef = useRef();

  component.getIsPassed = () => true;
  component.getToken = async () => await captchaRef.current.executeAsync();

  return (
    <ReCaptcha
      ref={ captchaRef }
      sitekey={ siteKey }
      type={ type }
      size={ size }
      badge={ badge }
      theme={ theme }
    />
  );
}
