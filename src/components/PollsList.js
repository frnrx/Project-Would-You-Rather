import React, { Component } from 'react';
import { connect } from 'react-redux'
import Question from './Question'

class PollsList extends Component {
  state = {
    answersId: []
  }

  componentWillMount() {
    this.answeredQuestions()
  }

  answeredQuestions = () => {
    let answersIdArray = []
    let unansweredIdArray = []
    for (let index = 0; index < this.props.questionsIds.length; index++) {
      let id = this.props.questionsIds[index]
      this.props.user.answers[id] === ("optionOne") 
      ? answersIdArray.push(id)
      : (this.props.user.answers[id] === ("optionTwo") ? answersIdArray.push(id) 
      : unansweredIdArray.push(id))
    }
    this.setState({ 
      answersId: this.state.answersId.concat([answersIdArray])
    })
  }

  render() {

    const { user, questionsIds } = this.props

    console.log(this.state)
    return (
      <div className="PollsList">
        <div className='answered'>
          <ul className='polls-list'>
            {this.props.questionsIds.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
        <div className='unanswered'>     
          <ul className='polls-list'>
            {this.props.questionsIds.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
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
