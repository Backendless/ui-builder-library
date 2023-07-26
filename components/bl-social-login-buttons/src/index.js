import { Button } from './button';

const { cn } = BackendlessUI.CSSUtils;

const ProvidersMap = {
  GOOGLEPLUS: 'googleplus',
  FACEBOOK  : 'facebook',
  TWITTER   : 'twitter',
  LINKEDIN  : 'linkedin',
  GITHUB    : 'github'
};

const ProvidersList = Object.values(ProvidersMap);

const ProviderLabels = {
  [ProvidersMap.GOOGLEPLUS]: 'google',
  [ProvidersMap.FACEBOOK]  : 'facebook',
  [ProvidersMap.TWITTER]   : 'twitter',
  [ProvidersMap.LINKEDIN]  : 'linkedin',
  [ProvidersMap.GITHUB]    : 'github'
};

export default function SocialLoginButtonsComponent({ component, eventHandlers, elRef }) {
  const {
    display, classList, disabled, redirectToPage, extraQueryParams, callbackUrlDomain, iconsVisibility
  } = component;
  const { onLogin, onLoginFail } = eventHandlers;

  if (!display) {
    return null;
  }

  return (
    <div ref={ elRef } className={ cn('bl-customComponent-socialLoginButtons', classList, { disabled }) }>
      { ProvidersList.map(providerCode => (
        component[providerCode] &&
          <Button
            providerCode={ providerCode }
            buttonLabel={ `Connect with ${ ProviderLabels[providerCode] }` }
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
