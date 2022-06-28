import { Icon, Input } from './';

export const Checkbox = ({ icon, ...inputProps }) => (
  <div className="checkbox__container">
    <Input props={inputProps} />
    <Icon icon={icon} />
  </div>
);
