import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class Header extends Component {

  state = {
    visible: false,
    inputDir: ''
  }

  hide = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleChange = (e) => {
    this.setState({ inputDir: e.target.value });
  };

  handleSubmit = () => {
    this.props.insertDirlist(this.state.inputDir);
  }

  render() {
    const logoutButton = (
      <li>
        <a onClick={this.props.onLogout}>
          <i className="material-icons">lock_open</i>
        </a>
      </li>
    );

    return (
      <div>
          <nav>
              <div className="nav-wrapper blue darken-1">
                  <Link to ="/MainPage" className="brand-logo center">WEB</Link>
 
                  <div className="right">
                      <ul>
                          { logoutButton }
                      </ul>
                  </div>
              </div>
          </nav>
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