import React, { Component, useState, useEffect } from 'react';
//no parens needed around directory
import Category from './Category';
import AddResource from './AddResource';

const App = () => {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setLogin] = useState(false);
  
  useEffect(() => {
    fetch('/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err))
    fetch('/api/checkToken')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  });
  //we will map over the categories array in the state object
  //we will create a react component for each element in the categories array

  const categoryComponents = categories.map(category => {
    return <Category key={`catid_${category.categoryid}`} categoryName={category.category} id={category.categoryid} />
  })

  // const categoryIDs = [];
  // const categoryLabels = [];
  const submitResource = (
    <div id='addResource'>
      <h2>Submit Resources Here</h2>
      <AddResource categories={categories} />
    </div>
  );

  return (
    <div>
        <div id='navbar'>
          <img id= 'logo' src='https://whatsthatanimal.files.wordpress.com/2014/03/goblin-shark.png' />
          <h1>Goblin Sharks!!!</h1>
          <a className='login' href='https://github.com/login/oauth/authorize?client_id=13defefbd00cf6ce9fbf&scope=user:email'>
            <i className="fa fa-github fa-3x"></i>
          </a>
        </div> 
        <div className='categoryParent'>
          {categoryComponents}
        </div>
        {isLoggedIn ?  submitResource : ''}
      </div>
  )
};
  
export default App;

  // export default class App extends Component {
  //   constructor(props){
  //     super(props),

  //     this.state = {categories: []}
  //   }
  //use componentDidMount life cycle method
  //use a fetch request to the '/api' route
  //take that data and update the state to include it
//   componentDidMount(){
//     fetch('/api/category')
//       .then(response => response.json())
//       .then(data => this.setState({categories: data}))
//       .catch(err => console.log(err))

//   }


//   render() {
//     //we will map over the categories array in the state object
//     //we will create a react component for each element in the categories array
//     const {categories} = this.state;
//     const categoryComponents = categories.map(category => {

//       return <Category key={`catid_${category.categoryid}`} categoryName={category.category} id={category.categoryid}/>
//     })
//     return (
//       <div>
//         <h1>Goblin Sharks!!!</h1>
//         {categoryComponents}
//       </div>
//     )
//   }
// }

