import React, { Component, useState} from 'react';

//TODO Hook refactor

const Resource = (props) => {
  const [upvoted, setUpvoted ] = useState(false)
  const [downvoted, setDownvoted] = useState(false)
  const [lameEmail, setLameEmail]= useState('lameEmail@gmail.com')
  console.log(`UPVOTED: ${upvoted} \n DOWNVOTED: ${downvoted}`)
  const handleUpVote = (event) => {

    setUpvoted(!upvoted)  
    setDownvoted(false)
    const tempVal = !upvoted;
    let bool = tempVal ? tempVal : null;
    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceid: props.id, useremail: lameEmail, upvote: bool }),
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error);
  }

  const handleDownVote = (event) => {
    setDownvoted(!downvoted)
    setUpvoted(false)
    const tempVal = !downvoted;
    let bool = tempVal ? tempVal : null;
    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resourceid: props.id, useremail: lameEmail, upvote: bool }),
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error);
  }

  return (
    <div className='resourceDiv'>
      <div className='resourceLinks'>{props.link}</div>
      <div className='mathing'>
        <div className='adding'>
          <a className='things' href='#' onClick={handleUpVote} >++</a> 
          {Number(props.sumupvote) + Number(upvoted)}
        </div>
        <div className='subtracting'>
          <a className='things' href='#' onClick={handleDownVote} >--</a> 
          {Number(props.sumdownvote) + Number(downvoted)}
        </div>
      </div>
    </div>
  )
}

export default Resource
