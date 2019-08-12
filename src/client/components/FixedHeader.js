import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
const { Header } = Layout;

class FixedHeader extends Component {

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
      <Layout>
        <Header style={{position: 'fixed', zIndex: 1, width: '100%' }}>
          <div id="navbar-primary">
            <div >
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-primary-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="navbar-primary-collapse">
              <ul class="nav navbar-nav">
                <li id="header_li" class="active"><a href="#">Link</a></li>
                <li id="header_li" ><Link to="/searchpage" id="header_a"> 피드 추가 하기 </Link></li>
                <li id="header_li" ><a id="header_a"href="#"><img id="logo-navbar-middle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/32877/logo-thing.png" width="200" alt="Logo Thing main logo" /></a></li>
                <li id="header_li" ><Link to="/mydirectory/asdf"  id="header_a"> 내 디렉터리 </Link></li>
                <li id="header_li" ><Link to="/MyFeed" id="header_a"> 오늘 피드 보기 </Link></li>
              </ul>
            </div>
          </div>
      </Header>
      </Layout>
      // <Layout>
      //   <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      //     <div className="header nav-wrapper blue darken-1">
      //       <Link to="/MainPage" className="brand-logo center">WEB</Link>
      //       <div className="right">
      //         <ul>
      //           {logoutButton}
      //           <li>
      //             <Link to="/searchpage"> 피드 추가 하기 </Link>
      //           </li>
      //           <li>
      //             <Link to="/mydirectory/asdf"> 내 디렉터리 </Link>
      //           </li>
      //           <li>
      //             <Link to="/MyFeed"> 오늘 피드 보기 </Link>
      //           </li>
      //         </ul>
      //       </div>
      //     </div>
      //   </Header>
      // </Layout>
    )
  }
}

FixedHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
};

FixedHeader.defaultProps = {
  isLoggedIn: false,
  onLogout: () => { console.error("logout function not defined") }
};

export default FixedHeader;