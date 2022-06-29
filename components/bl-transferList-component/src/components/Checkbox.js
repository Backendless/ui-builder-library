import { Icon, Input } from './';

export const Checkbox = ({ icon, iconColor, ...inputProps }) => (
  <div className="checkbox__container">
    <Input props={inputProps} />
    <Icon icon={icon} color={iconColor} />
  </div>
);
