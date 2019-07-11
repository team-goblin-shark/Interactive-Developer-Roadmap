import React, { Component } from 'react';
import Loading from '../components/Loading.jsx';
import App from '../components/App.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <div>
        <h5>Login Page</h5>
        <a
          className="login"
          href="https://github.com/login/oauth/authorize?client_id=13defefbd00cf6ce9fbf&scope=user:email"
        >
          <i className="fa fa-github fa-3x" />
        </a>
        <br />
        <a
          className="login"
          href="https://accounts.google.com/o/oauth2/v2/auth?access_type=online&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=628831693771-dk92gnuo75s6o381ad3bl84m6ll357lb.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2FgoogleAuth"
          // onClick={() => {
          //   fetch('/api/googleRedirect', {
          //     mode: 'no-cors', // no-cors, cors, *same-origin
          //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          //     // credentials: 'same-origin', // include, *same-origin, omit
          //   });
          // }}
        >
          <i className="fa fa-google fa-3x" />
        </a>
      </div>
    );
  }
}

export default MainContainer;
