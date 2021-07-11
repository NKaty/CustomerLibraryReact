import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrimaryLink = ({ children, ...props }) => (
  <Link className="text-primary" {...props}>
    {children}
  </Link>
);

PrimaryLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrimaryLink;
