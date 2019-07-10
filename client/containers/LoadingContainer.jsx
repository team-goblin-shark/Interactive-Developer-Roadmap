import React, { Component } from 'react';
import Loading from '../components/Loading'
import App from '../components/App'

export default class LoadingContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
          component: <Loading />
        };
      }

      componentDidMount() {
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(() => {
          // Add your logic for the transition
          this.setState({ component: <App /> });
        }, 4000);
      }
    
      componentWillUnmount() {
        clearTimeout(this.timeoutHandle);
      }
    
      render() {
        return this.state.component;
      }
}
