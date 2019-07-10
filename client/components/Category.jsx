import React, { Component, useState, useEffect } from 'react';
import Resource from './Resource.jsx';


//What are we creating?
//A component that has a button element
//When that button is clicked, it will reveal resources associated with that category
//--------------------------------------------------------------------------------------------------
/*
    -Initialize state 
    -setButtonClicked is used to change the state of buttonClicked. (In this case it changed it from false to true on click)
*/ 
//--------------------------------------------------------------------------------------------------

const Category = (props) => {
    const [resources, setResources] = useState(['www.youtube.com']);
    const [buttonClicked, setButtonClicked] = useState(false);
    const clickHandler = (event) => {
        event.preventDefault();
        //we use the .setState to update a piece of state
        //we use the 'bang' operator to on the buttonClicked property value to toggle
        setButtonClicked(!buttonClicked);

        //make a fetch request to our API
        fetch(`/api/resources/${props.id}`)
            .then(response => response.json())
            //we will update our resources value stored in this.state
            .then(data => setResources(data))
            .catch(err => console.log(err));
    }; 
//--------------------------------------------------------------------------------------------------
/* The above fetch request makes a request to our endpoint in server.js (app.get('/api/resources/:id', getData)
and runs the getData function within our dbController
 */
//--------------------------------------------------------------------------------------------------


// Iterate over the resources array that was set in state and create a Resource component for each
    const updatedResources = resources.map(resource => {
        return <Resource id={resource.resourceid} link={resource.link} key={`${resource.resourceid}${props.id}`} sumdownvote={resource.sumdownvote} sumupvote={resource.sumupvote} score={resource.score} />;
    });
//--------------------------------------------------------------------------------------------------
/* Each newly made component above will be passed  an id, a link, a unique key, a sumvotes and a score (which works behind the scenes and will be used for the popularity sorting algorithm ) */
//--------------------------------------------------------------------------------------------------
    return (
        <div className='categoryDiv' >
            <button className = {`cat${props.id}`} onClick={clickHandler}>{props.categoryName}</button>
            <div className='resourcesList'>
            {/* conditionally render list of resources on based on state of buttonClicked  */}
                {buttonClicked ?  updatedResources : ''}
            </div>
        </div>
    )
}

export default Category;