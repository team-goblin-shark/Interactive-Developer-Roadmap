import React, { useState } from 'react'
//--------------------------------------------------------------------------------------------------
/*  Iterate over props passed form App state
  - for each category render an option 
  -The click handler below is  responsible for inserting what is entered in to the input fields into the elephant DB
*/ 
//--------------------------------------------------------------------------------------------------
export default function AddResource(props) {
  const options = props.categories.map(x => { return <option value={x.categoryid}>{x.category}</option> })
  const [categoryID, setCategoryID] = useState(1);
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');

  const clickHandler = (e) => {
    e.preventDefault()
    console.log(author, link, categoryID)


    fetch('/api/resource', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryid: categoryID, link, author }),
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error);


  }

  const authorChange = (e) => {
    setAuthor(e.target.value)
  }

  const linkChange = (e) => {
    setLink(e.target.value)
  }

  const categoryChange = (e) => {
    setCategoryID(e.target.value)
  }
//--------------------------------------------------------------------------------------------------
/*  each category that was passed and iterated over at the top of this fie is then passed into the select tag for a dropdown menu */ 
//--------------------------------------------------------------------------------------------------

  return (
    <div id='submitResourceDiv'>
      <select id='selecting' onChange={categoryChange}>
        {options}
      </select>
      <input type="text" placeholder="Link" onChange={linkChange} />
      <input type="text" placeholder="Author" onChange={authorChange} />
      <button id='submitBtn' onClick={clickHandler}> Submit! </button>
    </div>
  )
}
