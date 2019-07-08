// import React, { useState } from 'react'

// const Resource = (props) => {
//   const [upvote, setUpvote] = useState(Number(props.sumupvote));
//   const [downvote, setDownvote] = useState(Number(props.sumdownvote));
//   const [currentVote, setCurrentVote] = useState(null);

//   const handleClick = (e) => {
//     const choice = e.target.innerText;
//     let futureChange = currentVote === choice ? null : choice;
//     // if currently null, then we are at original and increment future changes
//     if (currentVote === null) {
//       if (futureChange === '++') {
//         setUpvote(upvote + 1);
//         setDownvote(downvote);
//       } else if (futureChange === '--') {
//         setDownvote(downvote - 1);
//         setUpvote(upvote);
//       }
//     }
//     else {
//       // if future turns null, we clicked same vote twice
//       if (futureChange === null) {
//         if (currentVote === '--') {
//           setDownvote(downvote + 1);
//           setUpvote(upvote)
//         }
//         else if (currentVote === '++') {
//           setUpvote(upvote - 1);
//           setDownvote(downvote)
//         }
//         // if future isnt null, we clicked different things
//       } else {
//         if (futureChange === '--') {
//           setDownvote(downvote - 1);
//           setUpvote(upvote - 1);
//         } else if (futureChange === '++') {
//           setDownvote(downvote + 1);
//           setUpvote(upvote + 1);
//         }
//       }
//     }


//     setCurrentVote(futureChange);

//     console.log('after', currentVote, futureChange, downvote, upvote);


//     // console.log('after', currentVote, downvote, upvote);
//   }
//   // const newUpvote = currentVote === '++' ? upvote + 1 : upvote;
//   // const newDownvote = currentVote === '--' ? downvote - 1 : downvote;
//   // console.log('after', newUpvote, newDownvote);
//   return (
//     <div>
//       {props.link}
//       <a href='#' onClick={handleClick} > ++ </a> {currentVote === '++' ? upvote + 1 : upvote}
//       <a href='#' onClick={handleClick} > -- </a> {currentVote === '--' ? downvote - 1 : downvote}
//     </div>
//   )
// }
// export default Resource;

//////////



import React, { Component } from 'react';

export default class Resource extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.state = { upvoted: false, downvoted: false }
  }

  handleClick(e) {
    if (e.target.innerText === '++') {
      this.setState({ upvoted: !this.state.upvoted, downvoted: false })
    }
    if (e.target.innerText === '--') {
      this.setState({ downvoted: !this.state.downvoted, upvoted: false })
    }
  }


  render() {
    return (
      <div>
        {this.props.link}
        <a href='#' onClick={this.handleClick} >++</a> {Number(this.props.sumupvote) + Number(this.state.upvoted)}
        <a href='#' onClick={this.handleClick} >--</a> {Number(this.props.sumdownvote) + Number(this.state.downvoted)}
      </div>
    )
  }
}
