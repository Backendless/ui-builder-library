export const usePopupOptions = (component) => {
  const {
    noYetPermissionPopupTitle,
    noYetPermissionPopupDescription,
    noPermissionPopupTitle,
    noPermissionPopupDescription
  } = component;

  const noYetPermissionOptions = {
    title      : noYetPermissionPopupTitle,
    description: noYetPermissionPopupDescription
  };

  const noPermissionOptions = {
    title      : noPermissionPopupTitle,
    description: noPermissionPopupDescription,
    link       : 'https://support.google.com/chrome/answer/2693767'
  };

  return {
    noYetPermissionOptions,
    noPermissionOptions
  };
};
