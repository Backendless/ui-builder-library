import { Button } from './button';

const { cn } = BackendlessUI.CSSUtils

export default function SocialLoginButtonComponent({ component, eventHandlers }) {
  const { display, classList, disable, showButtonIcon, googleplus, facebook, twitter, linkedin, github } = component;
  const { onClick } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-socialLoginButton', classList, { disable }) }>
      { googleplus && <Button socialNet={ "googleplus" } showButtonIcon={ showButtonIcon } onClick={ onClick } /> }
      { facebook && <Button socialNet={ "facebook" } showButtonIcon={ showButtonIcon } onClick={ onClick } /> }
      { twitter && <Button socialNet={ "twitter" } showButtonIcon={ showButtonIcon } onClick={ onClick } /> }
      { linkedin && <Button socialNet={ "linkedin" } showButtonIcon={ showButtonIcon } onClick={ onClick } /> }
      { github && <Button socialNet={ "github" } showButtonIcon={ showButtonIcon } onClick={ onClick } /> }
    </div>
  );
}
