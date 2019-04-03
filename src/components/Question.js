import React, { Component } from 'react';
import { connect } from 'react-redux'

class Question extends Component {

  render() {
    const { question } = this.props
    const { optionOne, optionTwo } = question

    // console.log(question);
    

    return (
      <div>
        <h4>Would you rather: </h4>
        <p>{optionOne.text} or {optionTwo.text}</p>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {  
  const question = questions[id]  

  return {
    question: question
  }
}

export default connect(mapStateToProps)(Question);


// function mapStateToProps({ authedUser, users, tweets }, { id }) {
//   const tweet = tweets[id]
//   const parentTweet = tweet ? tweets[tweet.replyingTo] : null

//   return {
//     authedUser,
//     tweet: tweet
//       ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
//       : null
//   }
// }

