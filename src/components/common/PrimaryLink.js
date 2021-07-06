import { Link } from 'react-router-dom';

const PrimaryLink = ({ children, ...props }) => (
  <Link className="text-primary" {...props}>
    {children}
  </Link>
);

export default PrimaryLink;
