import React, { Component } from 'react';
import { connect } from 'react-redux'
import Question from './Question'

class PollsList extends Component {
  state = {
    answersId: [],
    unansweredId: []
  }

  componentWillMount() {
    this.answeredQuestions()
    this.questionsCreated()
  }

  // questionsCreated = () => {
  //   let createdIdArray = []

  //   for (let index = 0; index < this.props.questionsIds.length; index++) {
  //     let id = this.props.questionsIds[index]
  //     // createdQuestions: Object.keys(us)
  //     // debugger
  //     // this.props.user.questions[id] === ("optionOne") 
  //     // ? answersIdArray.push(id)
  //     // : (this.props.user.answers[id] === ("optionTwo") ? answersIdArray.push(id) 
  //     // : unansweredIdArray.push(id))
  //   }
  // }

  questionsType = () => { // this function defines if the question has been answered or not
    let answersIdArray = Object.keys(this.props.user.answers)
    let unansweredIdArray = []
    for (let index = 0; index < this.props.questionsIds.length; index++) {
      let id = this.props.questionsIds[index]
      if (this.props.user.answers[id] !== ("optionOne")){
        if (this.props.user.answers[id] !== ("optionTwo")){
          unansweredIdArray.push(id)
        }
      }
      // this.props.user.answers[id] === ("optionOne") ? none : (this.props.user.answers[id] === ("optionTwo") ? none : unansweredIdArray.push(id))
    }
    this.setState({ 
      answersId: this.state.answersId.concat([answersIdArray])
    })
    this.setState({ 
      unansweredId: this.state.unansweredId.concat([unansweredIdArray])
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
