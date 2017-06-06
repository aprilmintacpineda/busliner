import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
// forms
import InputText from '../components/forms/InputText';
import InputButton from '../components/forms/InputButton';

// actions
import * as actions from '../actions/signUpActions';

class SignUp extends Component {
  componentWillMount() {
    document.title = 'Create your account and reserve a seat now.';
  }

  render() {
    return (
      <div className="sign-up">
        <Topbar />

        <div className="sign-form">
          <h1>Create your account and start booking now.</h1>

          <ul>
            <li>
              <InputText
              disabled={this.props.form.request.sending}
              value={this.props.form.first_name.value}
              placeholder="Your first name"
              errors={this.props.form.first_name.errors}
              onChange={value => this.props.changeName(value)}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputText
              disabled={this.props.form.request.sending}
              value={this.props.form.middle_name.value}
              placeholder="Your middle name"
              errors={this.props.form.middle_name.errors}
              onChange={value => this.props.changeMiddleName(value)}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputText
              disabled={this.props.form.request.sending}
              value={this.props.form.surname.value}
              placeholder="Your surname"
              errors={this.props.form.surname.errors}
              onChange={value => this.props.changeSurname(value)}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputText
              disabled={this.props.form.request.sending}
              value={this.props.form.email.value}
              placeholder="Your email"
              errors={this.props.form.email.errors}
              onChange={value => this.props.changeEmail(value)}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputText
              disabled={this.props.form.request.sending}
              value={this.props.form.password.value}
              placeholder="Your desired password"
              errors={this.props.form.password.errors}
              onChange={value => this.props.changePassword(value)}
              password={true}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputText
              disabled={this.props.form.request.sending}
              value={this.props.form.password_again.value}
              placeholder="Your desired password again"
              errors={this.props.form.password_again.errors}
              onChange={value => this.props.changePasswordAgain(value)}
              password={true}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputButton
              disabled={this.props.form.request.sending || !this.props.form.request.allow_submit}
              onClick={() => console.log('submit')}
              sending={false}
              value="Create my account" />
            </li>
          </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  form: {...store.signUpForm}
}), {
  changeName: actions.changeName,
  changeMiddleName: actions.changeMiddleName,
  changeSurname: actions.changeSurname,
  changeEmail: actions.changeEmail,
  changePassword: actions.changePassword,
  changePasswordAgain: actions.changePasswordAgain
})(SignUp);