import React, { Component } from 'react';
import { Link } from 'react-router';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar-wrapper">
        <header className="topbar-outer-container">
          <div className="topbar-inner-container">
            <div className="logo">
              <label><span className="fa fa-bus" aria-hidden="true"></span> Bus Liner</label>

              <div className="toggle-menu">
                <label htmlFor="menu-toggled">
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </label>
              </div>
            </div>

            <input id="menu-toggled" className="menu-toggled" type="checkbox" />

            <ul className="links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact-us">Make reservation</Link></li>
              <li><Link to="/reserve">Contact us</Link></li>
            </ul>
          </div>
        </header>
        <div className="space-holder" />
      </div>
    );
  }
}

export default Topbar;