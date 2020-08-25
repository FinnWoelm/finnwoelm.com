const ExternalLink = ({ children, href }) => (
  <a href={href} target="_blank">
    {children}
  </a>
)

export default ExternalLink
