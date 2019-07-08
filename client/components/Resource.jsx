import React, { useState } from 'react'

const Resource = (props) => {
  const {sumupvote,sumdownvote} = props;
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  // const [currentVote, setCurrentVote] = useState(null);

  const handleClick = (e) => {
    const choice = e.target.innerText;
    // let futureChange = currentVote === choice ? 'og' : choice;
    
    if(choice==='++'){
      setUpvote(!upvote);
      setDownvote(false);
    } else if(choice==='--'){
      setDownvote(!downvote);
      setUpvote(false);
    }


    // setCurrentVote(futureChange);
    // console.log('after', currentVote, downvote, upvote);
  }
  // const newUpvote = currentVote === '++' ? upvote + 1 : upvote;
  // const newDownvote = currentVote === '--' ? downvote - 1 : downvote;
  // console.log('after', newUpvote, newDownvote);
  return (
    <div>
      {props.link}
      <a href='#' onClick={handleClick} > ++ </a> { Number(sumupvote) + Number(upvote)}
      <a href='#' onClick={handleClick} > -- </a> { Number(sumdownvote) - Number(downvote)}
    </div>
  )
}
export default Resource;

//////////



// import React, { Component } from 'react';

// export default class Resource extends Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this)
//     this.state = { voted: null }
//   }

//   handleClick(e) {
//     if (this.state.voted === e.target.innerText) {
//       this.setState({ voted: null })
//     } else {
//       this.setState({ voted: e.target.innerText })
//     }
//   }


//   render() {

//     return (
//       <div>
//         {this.props.link}
//         <a href='#' onClick={this.handleClick} > ++ </a> {this.state.voted === '++' ? Number(this.props.sumupvote) + 1 : Number(this.props.sumupvote)}
//         <a href='#' onClick={this.handleClick} > -- </a> {this.state.voted === '--' ? Number(this.props.sumupvote) + 1 : Number(this.props.sumdownvote)}
//       </div>
//     )
//   }
// } 
