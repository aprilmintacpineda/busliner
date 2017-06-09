import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PopMessage from '../components/PopMessage';
// forms
import InputText from '../components/forms/InputText';
import InputButton from '../components/forms/InputButton';

// actions
import * as actions from '../actions/signUpActions';

class SignUp extends Component {
  componentWillMount() {
    document.title = 'Create your account and reserve a seat now.';
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="sign-up">
        {this.props.form.request.error?
          <PopMessage
            title="Opsss... We got an error."
            message={this.props.form.request.error}
            onClick={this.props.clearRequestError} />
        : this.props.form.request.status == 'successful'?
          <PopMessage
            title="Yay! Thank you!"
            message="You have successfully created your account. We have sent a verification code to your email. Please check your email to verify your account."
            onClick={this.props.clearRequestError} />
        : null}

        <Topbar />

        <div className="sign-form">
          <h1>Create your account and start booking now.</h1>

          <ul>
            <li>
              <InputText
              disabled={this.props.form.request.sending}
              maxlength={75}
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
              maxlength={75}
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
              maxlength={75}
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
              maxlength={75}
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
              maxlength={75}
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
              maxlength={75}
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
              onClick={() => this.props.send()}
              sending={this.props.form.request.sending}
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
  changePasswordAgain: actions.changePasswordAgain,
  send: actions.send,
  clearRequestError: actions.clearRequestError
})(SignUp);