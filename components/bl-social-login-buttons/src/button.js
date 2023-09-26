import { iconsMap } from './icons-map';

const { cn } = BackendlessUI.CSSUtils;

export function Button(props) {
  const {
    providerCode, buttonLabel, iconsVisibility, redirectToPage,
    extraQueryParams, callbackUrlDomain, onLogin, onLoginFail
  } = props;

  const handleClick = async () => {
    try {
      async function socialLogin(providerCode, fieldsMappings, scope, options, redirectToPage, callbackUrlDomain) {
        if (BackendlessUI.DeviceAPI.isMobile()) {
          const user = await BackendlessUI.DeviceAPI
            .socialLogin(providerCode, fieldsMappings, scope, options, callbackUrlDomain);

          Backendless.UserService.setCurrentUser(user, true)

          if (redirectToPage) {
            BackendlessUI.Navigator.goToPage(redirectToPage);
          }
        } else {
          const redirectAfterLoginUrl = redirectToPage
            ? window.location.href.split('?')[0] + `?page=${ redirectToPage }`
            : window.location.href;

          if (extraQueryParams) {
            redirectAfterLoginUrl += `&${ extraQueryParams }`;
          }

          window.location = await Backendless.UserService
            .getAuthorizationUrlLink(
              providerCode, fieldsMappings, scope, false, redirectAfterLoginUrl, callbackUrlDomain
            );
        }
      }

      await socialLogin(providerCode, null, null, null, redirectToPage, callbackUrlDomain);

      onLogin({ loginType: providerCode });
    } catch (error) {
      onLoginFail({ error });
    }
  };

  return (
    <button
      onClick={ handleClick }
      className={ cn("social-button", `social-button__${ providerCode }`, { ["with-icon"]: iconsVisibility }) }>
      { iconsVisibility &&
        <div className="social-button__icon-container">{ iconsMap[providerCode] }</div>
      }
      <div className="social-button__text-container">
        <span className="social-button__text">{ buttonLabel }</span>
      </div>
    </button>
  );
}
