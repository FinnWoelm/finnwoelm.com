import { forwardRef } from "react";

const ExternalLink = forwardRef(({ children, href, ...otherProps }, ref) => (
  <a
    href={href}
    ref={ref}
    target="_blank"
    rel="noopener noreferrer"
    {...otherProps}
  >
    {children}
  </a>
));

export default ExternalLink;
