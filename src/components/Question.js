import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {

  render() {
    const { question } = this.props
    const { optionOne, optionTwo } = question

    // console.log(question);
    

    return (
      <div className='question'>
        <button className='question-card'>
          <span className='question-text'>{optionOne.text}</span>
        </button>
        <h5>OR</h5>
        <button className='question-card'>
          <span className='question-text'>{optionTwo.text}</span>
        </button>        
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) { 
	console.log(id);	
	 
  const question = questions[id]  

  console.log(questions);

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

