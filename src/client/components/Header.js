import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from 'antd';

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
    this.setState({inputDir: e.target.value});
  };

  handleSubmit = () => {
    this.props.insertDirlist(this.state.inputDir);
  }

  render() {
    const logoutButton = (
      <li>
        <a onClick={this.props.onLogout}>
          <i className="material-icons">logouttttttttttttttttttttttttttttttttttttttt</i>
        </a>
      </li>
    );

    let side_bar = (
      this.props.dirlists.map((result, i) => {
        return (
          <a class="nav_a" color="white"> {result.dir_name} </a> 
        )
      })
    );

    // const side_bar = (
    //   <div class="sidenav">
    //     <a href="#about">About</a>
    //     <a href="#services">Services</a>
    //     <a href="#clients">Clients</a>
    //     <a href="#contact">Contact</a>
    //     <a><Button >
    //       <p>dir 추가</p>
    //     </Button></a>

    //   </div>
    // );

    const header = (
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button class="btn btn-primary" id="menu-toggle">Toggle Menu</button>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
            </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );

    return (
      <div id="wrapper">
        <div class="sidenav" background-color="#d2d2d4">
          {side_bar}
          <a>
            <input placeholder="폴더명을 입력하세요" onChange={this.handleChange} />
          </a>
          <a>
          <Button onClick={this.handleSubmit}>
            <p>dir 추가</p>
          </Button>
         </a>
        </div>
        {/* {side_bar} */}
        {/* {header} */}
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