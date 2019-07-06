import React, { Component } from 'react';
//no parens needed around directory
import Category from './Category';
export default class App extends Component {
  constructor(props){
    super(props),
    this.state = {
      categories: ['HTML', 'CSS', 'JavaScript']
    }
  }

  
  render() {
    //we will map over the categories array in the state object
    //we will create a react component for each element in the categories array
    const {categories} = this.state;
    const categoryComponents = categories.map(category => {
      return <Category categoryName={category} />
    })
    return (
      <div>
        <h1>Goblin Sharks!!!</h1>
        {categoryComponents}
      </div>
    )
  }
}