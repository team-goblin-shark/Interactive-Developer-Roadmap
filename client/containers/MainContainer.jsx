import React, { Component } from 'react';
import Loading from '../components/Loading.jsx';
import App from '../components/App.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
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
      </div>
    );
  }
}

export default MainContainer;
