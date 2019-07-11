import React, { Component, useState, useEffect } from 'react';
import '../styles.css';
import { toast } from 'react-toastify';
import Category from './Category';
import AddResource from './AddResource';

// toast.configure({ autoClose: 2000, draggable: true });

const App = () => {
  const [imageLink, setImageLink] = useState([
    'https://whatsthatanimal.files.wordpress.com/2014/03/goblin-shark.png',
  ]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('/api/category')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch('/api/GooglePicture')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.picture.length > 0) {
          setImageLink(data.picture);
        }
      });
  }, []);
  //we will map over the categories array in the state object
  //we will create a react component for each element in the categories array

  const categoryComponents = categories.map(category => {
    return (
      <Category
        key={`catid_${category.categoryid}`}
        categoryName={category.category}
        id={category.categoryid}
      />
    );
  });

  return (
    <div>
      <div id="navbar">
        <img id="logo" src={imageLink} />
        <h5>Goblin Sharks!!!</h5>
        <a
          className="login"
          href="https://github.com/login/oauth/authorize?client_id=13defefbd00cf6ce9fbf&scope=user:email"
        >
          <i className="fa fa-github fa-3x" />
        </a>
        <a className="login">
          <i className="fa fa-google fa-3x" />
        </a>
      </div>
      <div className="categoryParent">{categoryComponents}</div>
      <div id="addResource">
        <h2>Submit Resources Here</h2>
        <AddResource categories={categories} />
      </div>
    </div>
  );
};

export default App;
