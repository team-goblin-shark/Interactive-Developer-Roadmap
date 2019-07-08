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
