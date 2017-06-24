import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Topbar extends Component {
  render() {
    let links = this.props.user.logged_in?
      <ul className="links">
        <li className="dropdown-menu">
          <i className="fa fa-user icon-left" aria-hidden="true"></i>
            Profile
          <i className="fa fa-caret-down icon-right" aria-hidden="true"></i>
          <span className="pointer" />
          <ul>
            <li>
              <Link to={'/user/' + this.props.user.id}>
                <i className="fa fa-tasks icon-left" aria-hidden="true"></i>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={'/user/' + this.props.user.id + '/settings/general'}>
                <i className="fa fa-cogs icon-left" aria-hidden="true"></i>
                Settings
              </Link>
            </li>
            <li><span className="separator" /></li>
            <li>
              <a href={'/user/' + this.props.user.id + '/logout'}>
                <i className="fa fa-sign-out icon-left" aria-hidden="true"></i>
                Log out
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/travel-lines/">
            <i className="fa fa-file icon-left" aria-hidden="true"></i>
            Make reservation
          </Link>
        </li>
        <li>
          <Link to="/contact-us">
            <i className="fa fa-envelope icon-left" aria-hidden="true"></i>
            Contact us
          </Link>
        </li>
      </ul>
    : <ul className="links">
      <li>
        <Link to="/">
          <i className="fa fa-home icon-left" aria-hidden="true"></i>
          Home
        </Link>
      </li>
      <li>
        <Link to="/sign-in">
          <i className="fa fa-sign-in icon-left" aria-hidden="true"></i>
          Sign in
        </Link>
      </li>
      <li>
        <Link to="/sign-up">
          <i className="fa fa-user-plus icon-left" aria-hidden="true"></i>
          Sign up
        </Link>
      </li>
      <li>
        <Link to="/travel-lines/">
          <i className="fa fa-file icon-left" aria-hidden="true"></i>
          Make reservation
        </Link>
      </li>
      <li>
        <Link to="/contact-us">
          <i className="fa fa-envelope icon-left" aria-hidden="true"></i>
          Contact us
        </Link>
      </li>
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