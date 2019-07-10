import React, { Component, useState, useEffect } from 'react';
//no parens needed around directory
import Category from './Category';
import AddResource from './AddResource';

const App = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err))
  },[]);
  //we will map over the categories array in the state object
  //we will create a react component for each element in the categories array

  const categoryComponents = categories.map(category => {
    return <Category key={`catid_${category.categoryid}`} categoryName={category.category} id={category.categoryid} />
  })

  // const categoryIDs = [];
  // const categoryLabels = [];


  return (
    <div>
        <div id='navbar'>
          <img id= 'logo' src='https://whatsthatanimal.files.wordpress.com/2014/03/goblin-shark.png' />
          <h5>Goblin Sharks!!!</h5>
          <a className='login' href='https://github.com/login/oauth/authorize?client_id=13defefbd00cf6ce9fbf&scope=user:email'>
            <i className="fa fa-github fa-3x"></i>
          </a>
        </div> 
        <div className='categoryParent'>
          {categoryComponents}
        </div>
        <div id='addResource'>
          <h2>Submit Resources Here</h2>
          <AddResource categories={categories} />
        </div>
      </div>
  )
};
  
export default App;
