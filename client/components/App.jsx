import React, { Component, useState, useEffect } from 'react';
//Using React Hooks
//no parens needed around directory
import Category from './Category';
import AddResource from './AddResource';
import Newsletter from './Newsletter';
//--------------------------------------------------------------------------------------------------
/*This App constant is using React Hooks 
-Initializing state with first two constants
-The point of conditional use of hasFetched in useEffect is to make sure the fetch only occurs once.
-useEffect has the same functionality as componentDidMount
*/
//--------------------------------------------------------------------------------------------------
const App = () => {
  const [categories, setCategories] = useState([]);
  const [hasFetched, changeFetch] = useState(false)
  useEffect(() => {
    if(!hasFetched){
      fetch('/api/category')
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(err => console.log(err))
        changeFetch(true)
    }
  });



  
  //--------------------------------------------------------------------------------------------------
/*-This fetch request is fetching from an endpoint that exists in our server.js file
  - That endpoint is a get request that runs a method called "getCategory" located in the db controller
*/
  //--------------------------------------------------------------------------------------------------
  //we will map over the categories array in the state object
  //we will create a react component for each element in the categories array

  const categoryComponents = categories.map(category => {
    return <Category key={`catid_${category.categoryid}`} categoryName={category.category} id={category.categoryid} />
  })
//--------------------------------------------------------------------------------------------------
/* we pull out keys (categoryid  and category) from each category in the array and pass them as props to each newly made Category component 
*/ 
//--------------------------------------------------------------------------------------------------
  // const categoryIDs = [];
  // const categoryLabels = [];


  return (
    <div>
        <div id='navbar'>
      
          <h1>Resource Stack</h1>
          <Newsletter/>
          <a className='login' href='https://github.com/login/oauth/authorize?client_id=65531e05edf45df5b914&scope=user:email'>
            <i className="fa fa-github fa-3x"></i>
          </a>
        </div> 
        <div id='addResource'>
          <h2>Submit Resources Here</h2>
          <AddResource categories={categories} />
        </div>
        <div className='categoryParent'>
        {/* //insert our array of Category components here */}
          {categoryComponents}
        </div>
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

