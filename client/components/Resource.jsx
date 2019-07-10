import React, { Component } from 'react';

export default class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = { upvoted: false, downvoted: false, lameEmail: 'lameEmail@gmail.com' }
    this.handleClick = this.handleClick.bind(this)
  }
//--------------------------------------------------------------------------------------------------
/* -set state without hooks 
  - The handleClick method is attatched to the upvot and down vote elements
  -when we click on the upvote button, the state of upvoted will toggle between true and false with each click(to prevent user from upvoting twice/ and also preventthem from liking and disliking the same resource)
*/
//--------------------------------------------------------------------------------------------------
  handleClick(e) {

    if (e.target.innerText === '++') {
      this.setState({ upvoted: !this.state.upvoted, downvoted: false })
      const tempVal = !this.state.upvoted;
      let bool = tempVal ? tempVal : null;//when a user logs in they can only have one vote
      fetch('/api/vote', {//  possibly related to Oauth
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
//--------------------------------------------------------------------------------------------------
/*  MThe above method makes a request to this enpoint and  verifies user with oauth. This way Users can only submit votes once */ 
//--------------------------------------------------------------------------------------------------


  render() {
    return (
      <div className='resourceDiv'>
        <div className='resourceLinks'>{this.props.link}</div>
        <div className='mathing'>
          <div className='adding'>
            <a className='things' href='#' onClick={this.handleClick} >++</a> 
            {Number(this.props.sumupvote) + Number(this.state.upvoted)}
          </div>
          <div className='subtracting'>
            <a className='things' href='#' onClick={this.handleClick} >--</a> 
            {Number(this.props.sumdownvote) + Number(this.state.downvoted)}
          </div>
        </div>
      </div>
    )
  }
}
