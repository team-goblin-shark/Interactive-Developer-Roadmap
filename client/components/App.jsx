import React, { Component } from 'react';
//no parens needed around directory
import Category from './Category';
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello eric</h1>
        <Category />
      </div>
    )
  }
}