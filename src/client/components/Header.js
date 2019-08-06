import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {

  render() {

    const logoutButton = (
      <li>
        <a onClick={this.props.onLogout}>
          <i className="material-icons">logouttttttttttttttttttttttttttttttttttttttt</i>
        </a>
      </li>
    );

    const side_bar = (
      <div className="sidebar">
        <div className="scrollbar-inner sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item">
              <a href="/settings">
                <i className="la la-hand-o-up"></i>
                <p>My Settings</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/personalpage">
                <i className="la la-bookmark-o">
                </i>
                <p>Scrapped Recipe</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/personalgraph">
                <i className="la la-check-circle-o">
                </i>
                <p>Nutritional Status</p>
              </a>
            </li>
            <li className="nav-item update-pro">
              <a href="/login">
                <button data-toggle="modal" data-target="#modalUpdate">
                  <i className="la la-reply">
                  </i>
                  <p>Logout</p>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );

    return (
      <div>
        {side_bar}
        <div className="right">
          <ul>
            {this.props.isLoggedIn ? logoutButton : <div> <h3> lolololognotnontonto </h3> </div>}
          </ul>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => {console.error("logout function not defined")}
};

export default Header;