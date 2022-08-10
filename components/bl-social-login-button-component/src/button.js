import { SocialIcon } from './social-icon';

const { cn } = BackendlessUI.CSSUtils;

export function Button({ socialNet }) {
  const handleClick = async () => {
    async function socialLogin(providerCode, fieldsMappings, scope, options, redirectToPage, callbackUrlDomain) {
      if (BackendlessUI.DeviceAPI.isMobile()) {
        const user = await BackendlessUI.DeviceAPI
          .socialLogin(providerCode, fieldsMappings, scope, options, callbackUrlDomain)
    
        Backendless.UserService.setCurrentUser(user, true)
    
        if (redirectToPage) {
          BackendlessUI.Navigator.goToPage(redirectToPage)
        }
      } else {
        const redirectAfterLoginUrl = redirectToPage
          ? window.location.href.split('?')[0] + `?page=${ redirectToPage }`
          : window.location.href
    
        window.location = await Backendless.UserService
          .getAuthorizationUrlLink(providerCode, fieldsMappings, scope, false, redirectAfterLoginUrl, callbackUrlDomain)
      }
    }
  
    await socialLogin(socialNet, null, null, null, null, null)
  };

  return (
    <button onClick={ handleClick } className={ cn("social-button", `social-button__${ socialNet }`) }>
      <div className="social-button__icon-container">
        <SocialIcon socialNet={ socialNet } />
      </div>
      <div className="social-button__text-container">
        <span className="social-button__text">{ `Connect with ${ socialNet }` }</span>
      </div>
    </button>
  );
}
