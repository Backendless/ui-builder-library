export const Icon = ({ icon, color }) => (
  <svg
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill={color}
    className="icon">
    <path d={icon} />
  </svg>
);
