import React, { Component } from 'react'
import { connect } from 'react-redux'
import saveQuestionAnswer from ''

class QuestionPage extends Component {

    state = {
        vote: ''
    }

    handleVote = (question, event) => {


        if (this.state.voted !== '') {

            if (event.target.classList.length === 2) {
                event.target.classList.remove("voted-card")
                this.setState({
                    vote: ''
                })
            }
            else {
                event.target.classList.add("voted-card")
                if (event.target.id === `${question.id}-option-one`) {
                    document.getElementById(`${question.id}-option-two`).classList.remove("voted-card")
                }
                else {
                    document.getElementById(`${question.id}-option-one`).classList.remove("voted-card")
                }
                this.setState({
                    vote: event.target.value
                })
            }
        }
        else {
            event.target.classList.add("voted-card")
            this.setState({
                vote: event.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { vote } = this.state
        const { dispatch, id } = this.props

        dispatch(saveQuestionAnswer({id, vote}))

        this.setState(() => ({
            vote: '',
        }))

    }

    render() {
        const { id, questions, users } = this.props
        console.log(this.state);

        return (
            <div className='question-page'>
                <div className='question'>
                    <button className='question-card' id={`${questions[id].id}-option-one`} value='option-one' onClick={(event) => this.handleVote(questions[id], event)}>
                        {questions[id].optionOne.text}
                    </button>
                    <h5 className='alternator'>OR</h5>
                    <button className='question-card' id={`${questions[id].id}-option-two`} value='option-two' onClick={(event) => this.handleVote(questions[id], event)}>
                        {questions[id].optionTwo.text}
                    </button>
                <button style={{borderRadius: '5%', width: '9%', height: '10%'}} onClick={(event) => this.handleSubmit(questions[id], event)}>SUBMIT</button>
                </div>
                <p>Created By: <img src={`https://robohash.org/${questions[id].author}`} alt="" class="user-avatar"></img> {users[questions[id].author].name}</p>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users }, props) {
    const { id } = props.match.params

    return {
        questions: questions,
        id: id, 
        users: users,
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(QuestionPage)
