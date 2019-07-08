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
  });
  //we will map over the categories array in the state object
  //we will create a react component for each element in the categories array

  const categoryComponents = categories.map(category => {
    return <Category key={`catid_${category.categoryid}`} categoryName={category.category} id={category.categoryid} />
  })

  // const categoryIDs = [];
  // const categoryLabels = [];


  return (
    <div>
      <h1>Goblin Sharks!!!</h1>
      {categoryComponents}
      <a href='https://github.com/login/oauth/authorize?client_id=13defefbd00cf6ce9fbf&scope=user:email'>Will this shit work???</a>
      <AddResource categories={categories} />
    </div>
  )
};

export default App;