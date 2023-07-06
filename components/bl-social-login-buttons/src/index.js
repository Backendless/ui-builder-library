import { Button } from './button';

const { cn } = BackendlessUI.CSSUtils

const providersList = ['google', 'facebook', 'twitter', 'linkedin', 'github'];

export default function SocialLoginButtonsComponent({ component, eventHandlers }) {
  const { display, classList, disabled, redirectToPage, extraQueryParams, iconsVisibility } = component;
  const { onLogin, onLoginFail } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-socialLoginButtons', classList, { disabled }) }>
      { providersList.map(provider => (
        component[provider] &&
          <Button
            provider={ provider }
            iconsVisibility={ iconsVisibility }
            buttonLabel={ `Connect with ${ provider }` }
            redirectToPage={ redirectToPage }
            extraQueryParams={ extraQueryParams }
            onLogin={ onLogin }
            onLoginFail={ onLoginFail }
          />
      )) }
    </div>
  );
}
