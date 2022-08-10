import { Button } from './button';

const { cn } = BackendlessUI.CSSUtils

export default function SocialLoginButtonComponent({ component }) {
  const { display, classList, disable, buttonOption } = component;

  if (!display) {
    return null;
  }
  
  return (
    <div className={ cn('bl-customComponent-socialLoginButton', classList, { disable }) }>
      <Button socialNet={ buttonOption } />
    </div>
  );
}
