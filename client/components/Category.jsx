import React, {Component} from 'react';

//What are we creating?
    //A component that has a button element
    //When that button is clicked, it will reveal resources associated with that category
export default class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            resources: ['www.youtube.com'],
            buttonClicked: false
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    //create a method to handle button click
    //it will modify 'buttonClicked' property in our state component
    //event handler takes in event object produced by browser
    clickHandler (event){
        //we use the .setState to update a piece of state
        //we use the 'bang' operator to on the buttonClicked property value to toggle
        this.setState({buttonClicked: !this.state.buttonClicked})

        //make a fetch request to our API
        fetch(`/api/resources/${this.props.id}`)
            .then(response => response.json())
            //we will update our resources value stored in this.state
            .then(data => this.setState({resources: data}))
            .catch(err => console.log(err));
    }

    render (){
        //destructured state and pulled out buttonClicked and resources properties
        const {buttonClicked, resources} = this.state;
        //mapped over resources array and returned an array of paragraph tags with the resources inside of them
        const updatedResources = resources.map(resource => {
            return <p key={`${resource.resourceid}${this.props.id}`}>{resource.resource}</p>;
        });

        //Make sure that there is a parent element to return children elements
        //here we use conditional rendering to dynamically display resources
        return (
            <div>
                <button onClick={this.clickHandler}>{this.props.categoryName}</button>
                {buttonClicked ?  updatedResources : ''}
            </div>
        )
    }
}