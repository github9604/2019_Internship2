import React, { Component } from 'react';
class Header extends Component {

  render() {

    const side_bar = (
      <div>
        <ul class="nav">
          <li>
            <i class="fa fa-home"></i>
            <div class="animated slideInLeft">Home</div>
          </li>
          <li>
            <i class="fa fa-user"></i>
            <div class="animated slideInLeft">About</div>
          </li>
          <li>
            <i class="fa fa-certificate"></i>
            <div class="animated slideInLeft">Skills</div>
          </li>
          <li>
            <i class="fa fa-desktop"></i>
            <div class="animated slideInLeft">Projects</div>
          </li>
          <li>
            <i class="fa fa-align-right"></i>
            <div class="animated slideInLeft">Articles</div>
          </li>
          <li>
            <i class="fa fa-phone"></i>
            <div class="animated slideInLeft">Contact</div>
          </li>
        </ul>

        <div class="hero">
          <h1>CSS3 Side Menu</h1>
        </div>

        <div class="credits">
          <a href="https://twitter.com/arximughal"><i class="fa fa-twitter"></i></a>
          <a href="https://facebook.com/arximughal"><i class="fa fa-facebook"></i></a>
          <a href="https://arslanaslam.me"><i class="fa fa-globe"></i></a>
        </div>
      </div>
    );

    return (
      <div>
        {side_bar}
      </div>
    )
  }
}

export default Header;