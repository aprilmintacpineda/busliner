import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Topbar from '../../containers/Topbar';
import Footer from '../../components/Footer';

import InputButton from '../../components/forms/InputButton';
import InputText from '../../components/forms/InputText';

class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.generalSection = this.generalSection.bind(this);
    this.accountSection = this.accountSection.bind(this);
    this.securitySection = this.securitySection.bind(this);
  }

  componentWillMount() {
    if(!this.props.user.logged_in) {
      return this.props.router.push('/sign-in');
    }
  }

  generalSection() {
    return (
      <ul>
        <li>
          <InputText
          placeholder="Your first name"
          value={this.props.user.first_name}
          onChange={value => console.log(value)}
          errors={[]}
          maxlength={50}
          disabled={false}>
            <span className="decor" />
          </InputText>
        </li>
        <li>
          <InputText
          placeholder="Your middle name"
          value={this.props.user.middle_name}
          onChange={value => console.log(value)}
          errors={[]}
          maxlength={50}
          disabled={false}>
            <span className="decor" />
          </InputText>
        </li>
        <li>
          <InputText
          placeholder="Your surname"
          value={this.props.user.surname}
          onChange={value => console.log(value)}
          errors={[]}
          maxlength={50}
          disabled={false}>
            <span className="decor" />
          </InputText>
        </li>
        <li className="buttons">
          <div>
            <InputButton
            className="btn-save"
            value="Save changes"
            onClick={() => console.log('save')}
            disabled={false}
            sending={false}
            errors={[]} />
          </div>

          <div><a onClick={() => console.log('cancel')}>Cancel</a></div>
        </li>
      </ul>
    );
  }

  accountSection() {
    return (
      <div>
        account
      </div>
    );
  }

  securitySection() {
    return (
      <div>
        security
      </div>
    );
  }

  render() {
    console.log(this.props.user);

    return (
      <div className="user-settings">
        <Topbar />

        <div className="settings-wrapper">
          <div className="left">
            <ul>
              <li>
                <Link className={this.props.params.section == 'general'? 'onlink' : ''} to={'/user/' + this.props.user.id + '/settings/general'}>
                  <i className="fa fa-sliders icon-left" aria-hidden="true"></i>
                  General
                </Link>
              </li>
              <li>
                <Link className={this.props.params.section == 'account'? 'onlink' : ''} to={'/user/' + this.props.user.id + '/settings/account'}>
                  <i className="fa fa-universal-access icon-left" aria-hidden="true"></i>
                  Account
                </Link>
              </li>
              <li>
                <Link className={this.props.params.section == 'security'? 'onlink' : ''} to={'/user/' + this.props.user.id + '/settings/security'}>
                  <i className="fa fa-shield icon-left" aria-hidden="true"></i>
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div className="right">
            {this.props.params.section == 'general'?
              this.generalSection()
            : this.props.params.section == 'account'?
              this.accountSection()
            : this.securitySection()}
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  user: {...store.user}
}), {

})(UserSettings);