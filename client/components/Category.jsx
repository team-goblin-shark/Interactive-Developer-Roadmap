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
    }
    render (){
        return (
            <button>JavaScript</button>
        )
    }
}