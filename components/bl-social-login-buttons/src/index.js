import { Button } from './button';

const { cn } = BackendlessUI.CSSUtils

const providersList = ['googleplus', 'facebook', 'twitter', 'linkedin', 'github'];

export default function SocialLoginButtonsComponent({ component, eventHandlers }) {
  const {
    display, classList, disabled, redirectToPage, extraQueryParams, callbackUrlDomain, iconsVisibility
  } = component;
  const { onLogin, onLoginFail } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div className={ cn('bl-customComponent-socialLoginButtons', classList, { disabled }) }>
      { providersList.map(providerCode => (
        component[providerCode] &&
          <Button
            providerCode={ providerCode }
            buttonLabel={ `Connect with ${ providerCode }` }
            iconsVisibility={ iconsVisibility }
            redirectToPage={ redirectToPage }
            extraQueryParams={ extraQueryParams }
            callbackUrlDomain={ callbackUrlDomain }
            onLogin={ onLogin }
            onLoginFail={ onLoginFail }
          />
      )) }
    </div>
  );
}
