import React, { useState } from 'react'

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
