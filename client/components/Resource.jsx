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
