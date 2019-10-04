import React from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import MainContainer from './containers/MainContainer'
import LoadingContainer from './containers/LoadingContainer'
import LoginContainer from './containers/LoginContainer'
//import style

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={MainContainer}/>
      <Route  path="/main" component={LoadingContainer}/>
      <Route  path="/login" component={LoginContainer}/>
    </div>
  </Router>
)
render(
  routing,
  document.getElementById('root')
)