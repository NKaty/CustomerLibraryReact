import { Link, NavLink } from 'react-router-dom';
import { Component } from 'react';

class Header extends Component {
  state = {
    isOpen: false,
  };

  onToggleMenu = event => {
    event.preventDefault();
    this.setState(prevSate => ({ isOpen: !prevSate.isOpen }));
  };

  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/customers" className="navbar-brand">
            Customer Library
          </Link>
          <button
            className="navbar-toggler"
            onClick={this.onToggleMenu}
            type="button"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={
              'navbar-collapse' + (!this.state.isOpen ? ' collapse' : '')
            }
            id="navbarNav"
          >
            <div className="navbar-nav">
              <NavLink
                exact
                to="/customers"
                className="nav-link"
                activeClassName="active"
              >
                Customers
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
