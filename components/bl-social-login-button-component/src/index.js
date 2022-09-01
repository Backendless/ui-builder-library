import { Button } from './button';

const { cn } = BackendlessUI.CSSUtils

export default function SocialLoginButtonComponent({ component, eventHandlers }) {
  const { display, classList, disable, showButtonIcon, googleplus, facebook, twitter, linkedin, github } = component;
  const { onLogin } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-socialLoginButton', classList, { disable }) }>
      { googleplus && <Button provider={ "googleplus" } showButtonIcon={ showButtonIcon } onLogin={ onLogin } /> }
      { facebook && <Button provider={ "facebook" } showButtonIcon={ showButtonIcon } onLogin={ onLogin } /> }
      { twitter && <Button provider={ "twitter" } showButtonIcon={ showButtonIcon } onLogin={ onLogin } /> }
      { linkedin && <Button provider={ "linkedin" } showButtonIcon={ showButtonIcon } onLogin={ onLogin } /> }
      { github && <Button provider={ "github" } showButtonIcon={ showButtonIcon } onLogin={ onLogin } /> }
    </div>
  );
}
