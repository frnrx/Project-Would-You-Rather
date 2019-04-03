import React, { Component } from 'react';
import { connect } from 'react-redux'
import Question from './Question'

class PollsList extends Component {
  render() {

    const { user, questionsIds } = this.props

    console.log(questionsIds)

    const answeredQuestions = () => {
      let answersId = []
      for (let index = 0; index < questionsIds.length; index++) {
        let id = `${questionsIds[index]}`
        user.answers.id && answersId.push(id)

      }
      console.log(answersId)
    }

    answeredQuestions()

    console.log(user)
    return (
      <div className="App">
        {/* <Question id={id} /> */}
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    user: users[authedUser],
    questionsIds: Object.keys(questions)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(PollsList);
