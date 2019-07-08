// import React, { useState } from 'react'

// const Resource = (props) => {
//   const {sumupvote,sumdownvote} = props;
//   const [upvote, setUpvote] = useState(false);
//   const [downvote, setDownvote] = useState(false);
//   // const [currentVote, setCurrentVote] = useState(null);

//   const handleClick = (e) => {
//     const choice = e.target.innerText;
//     // let futureChange = currentVote === choice ? 'og' : choice;
    
//     if(choice==='++'){
//       setUpvote(!upvote);
//       setDownvote(false);
//     } else if(choice==='--'){
//       setDownvote(!downvote);
//       setUpvote(false);
//     }


//     // setCurrentVote(futureChange);
//     // console.log('after', currentVote, downvote, upvote);
//   }
//   // const newUpvote = currentVote === '++' ? upvote + 1 : upvote;
//   // const newDownvote = currentVote === '--' ? downvote - 1 : downvote;
//   // console.log('after', newUpvote, newDownvote);
//   return (
//     <div>
//       {props.link}
//       <a href='#' onClick={handleClick} > ++ </a> { Number(sumupvote) + Number(upvote)}
//       <a href='#' onClick={handleClick} > -- </a> { Number(sumdownvote) - Number(downvote)}
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
    this.state = { upvoted: false, downvoted: false, lameEmail: 'lameEmail@gmail.com' }
  }

  handleClick(e) {

    if (e.target.innerText === '++') {
      this.setState({ upvoted: !this.state.upvoted, downvoted: false })
      const tempVal = !this.state.upvoted;
      let bool = tempVal ? tempVal : null;
      fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceid: this.props.id, useremail: this.state.lameEmail, upvote: bool }),
      }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => error);
    }
    if (e.target.innerText === '--') {
      this.setState({ downvoted: !this.state.downvoted, upvoted: false })
      const tempVal = !this.state.downvoted;
      let bool = tempVal ? !tempVal : null;
      fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceid: this.props.id, useremail: this.state.lameEmail, upvote: bool }),
      }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => error);
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
