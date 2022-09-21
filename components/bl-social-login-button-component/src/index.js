import { Button } from './button';

const { cn } = BackendlessUI.CSSUtils;

const providersList = ['googleplus', 'facebook', 'twitter', 'linkedin', 'github'];

export default function SocialLoginButtonComponent({ component, eventHandlers }) {
  const { display, classList, disabled, showButtonIcon } = component;
  const { onLogin, onLoginFail } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-socialLoginButton', classList, { disabled }) }>
      { providersList.map(provider => (
        component[provider] &&
          <Button
            provider={ provider }
            showButtonIcon={ showButtonIcon }
            onLogin={ onLogin }
            onLoginFail={ onLoginFail }
          />
      )) }
    </div>
  );
}
