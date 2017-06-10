import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import PopMessage from '../components/PopMessage';
// forms
import InputText from '../components/forms/InputText';
import InputButton from '../components/forms/InputButton';

// actions
import { clearPopMessage } from '../actions/popMessageActions';
import * as actions from '../actions/signInActions';

class SignIn extends Component {
  componentWillMount() {
    document.title = 'Sign in now and start securing your travel.';
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="sign-in">
        {this.props.popMessage.pop?
          <PopMessage
            title={this.props.popMessage.title}
            message={this.props.popMessage.message}
            onClick={() => this.props.clearPopMessage()}
          />
        : null}

        <Topbar />

        <div className="sign-form">
          <h1>Sign in now and start securing your travel.</h1>

          <ul>
            <li>
              <p>Don't have an account yet? <Link to="/sign-up" className="link-default">Create an account now!</Link></p>
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
              placeholder="Your password"
              errors={this.props.form.password.errors}
              onChange={value => this.props.changePassword(value)}
              password={true}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputButton
              disabled={this.props.form.request.sending || !this.props.form.request.allow_submit}
              onClick={() => this.props.send()}
              sending={this.props.form.request.sending}
              value="Sign in" />
            </li>
          </ul>
        </div>

        <Footer />
      </div>
    );
  }
}

export default connect(store => ({
  popMessage: {...store.popMessage},
  form: {...store.signInForm}
}), {
  clearPopMessage,
  changeEmail: actions.changeEmail,
  changePassword: actions.changePassword,
  clearRequestError: actions.clearRequestError,
  send: actions.send
})(SignIn);