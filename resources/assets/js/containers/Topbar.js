import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Topbar extends Component {
  render() {
    let links = this.props.user.logged_in?
      <ul className="links">
        <li className="dropdown-menu">
          Profile
          <ul>
            <li><Link to={'/user/' + this.props.user.id}>Dashboard</Link></li>
            <li><Link to={'/user/' + this.props.user.id + '/settings'}>Settings</Link></li>
            <li><span className="separator" /></li>
            <li><a href={'/user/' + this.props.user.id + '/logout'}>Log out</a></li>
          </ul>
        </li>
        <li><Link to="/travel-lines/">Make reservation</Link></li>
        <li><Link to="/contact-us">Contact us</Link></li>
      </ul>
    : <ul className="links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/sign-in">Sign in</Link></li>
      <li><Link to="/sign-up">Sign up</Link></li>
      <li><Link to="/travel-lines/">Make reservation</Link></li>
      <li><Link to="/contact-us">Contact us</Link></li>
    </ul>;

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

            {links}
          </div>
        </header>
        <div className="space-holder" />
      </div>
    );
  }
}

export default connect(store => ({
  user: {...store.user}
}))(Topbar);