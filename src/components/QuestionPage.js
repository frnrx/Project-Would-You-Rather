import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionPage extends Component {
    render() {
        const { id } = this.props
        return (
            <div>Question Page
            {/* UNANSWERED */}
                {/* <button className='question-card' id={`${questions[id].id}-option-one`} onClick={(event) => this.handleVote(questions[id], event)}>
                {questions[id].optionOne.text}
            </button>
            <h5 className='alternator'>OR</h5>
            <button className='question-card' id={`${questions[id].id}-option-two`} onClick={(event) => this.handleVote(questions[id], event)}>
                {questions[id].optionTwo.text}
            </button> */}

                {/* ANSWERED */}
                {/* <button className='question-card' value='optionOne' id={`${questions[id].id}-option-one`}>
                    {questions[id].optionOne.text}
                    <p>{this.showNumberOfVotes(id, 'one')}</p>
                    <p>{this.showPercentageOfVotes(id, 'one')}</p>
                </button>
                <h5 className='alternator'>OR</h5>
                <button className='question-card' value='optionTwo' id={`${questions[id].id}-option-two`}>
                    {questions[id].optionTwo.text}
                    <p>{this.showNumberOfVotes(id, 'two')}</p>
                    <p>{this.showPercentageOfVotes(id, 'two')}</p>
                </button> */}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, tweets, users }, props) {
    const { id } = props.match.params

    return {
        id
    }
}

export default connect(mapStateToProps)(QuestionPage)
