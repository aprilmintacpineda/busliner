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
              disabled={false}
              maxlength={75}
              value={''}
              placeholder="Your email"
              errors={[]}
              onChange={value => console.log(value)}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputText
              disabled={false}
              maxlength={75}
              value={''}
              placeholder="Your password"
              errors={[]}
              onChange={value => console.log(value)}
              password={true}>
                <span className="decor" />
              </InputText>
            </li>
            <li>
              <InputButton
              disabled={false}
              onClick={() => console.log('submit')}
              sending={false}
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
  popMessage: {...store.popMessage}
}), {
  clearPopMessage
})(SignIn);