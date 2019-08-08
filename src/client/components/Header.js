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

    const header = (
      <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a class="navbar-brand brand-logo mr-5" href="index.html"><img src="images/logo.svg" class="mr-2" alt="logo" /></a>
          <a class="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo-mini.svg" alt="logo" /></a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span class="ti-view-list"></span>
          </button>
          <ul class="navbar-nav mr-lg-2">
            <li class="nav-item nav-search d-none d-lg-block">
              <div class="input-group">
                <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
                  <span class="input-group-text" id="search">
                    <i class="ti-search"></i>
                  </span>
                </div>
                <input type="text" class="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search" />
              </div>
            </li>
          </ul>
          <ul class="navbar-nav navbar-nav-right">
            <li class="nav-item nav-profile dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                <img src="images/faces/face28.jpg" alt="profile" />
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                <a class="dropdown-item">
                  <i class="ti-settings text-primary"></i>
                  Settings
              </a>
                <a class="dropdown-item">
                  <i class="ti-power-off text-primary"></i>
                  Logout
              </a>
              </div>
            </li>
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="ti-view-list"></span>
          </button>
        </div>
      </nav>
    );

    return (
      <div>
        {/* {side_bar} */}
        {header}
        {/* <div className="right">
          <ul>
            {this.props.isLoggedIn ? logoutButton : <div> <h3> lolololognotnontonto </h3> </div>}
          </ul>
        </div> */}
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
  onLogout: () => { console.error("logout function not defined") }
};

export default Header;