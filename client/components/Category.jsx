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
    }

    render (){
        const {buttonClicked, resources} = this.state;
        //Make sure that there is a parent element to return children elements
        //here we use conditional rendering to dynamically display resources
        return (
            <div>
                <button onClick={this.clickHandler}>{this.props.categoryName}</button>
                {buttonClicked ?  resources : ''}
            </div>
        )
    }
}