import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'

class QuestionPage extends Component {

	state = {
		answer: '',
		submitBtn: 'disable-btn'
	}

	handleVote = (question, event) => {

		if (this.state.voted !== '') {

			if (event.target.classList.length === 2) {
				event.target.classList.remove("voted-card")
				this.setState({
					answer: '',
					submitBtn: 'disable-btn'
				})

			}
			else {
				event.target.classList.add("voted-card")
				if (event.target.id === `${question.qid}-option-one`) {
					document.getElementById(`${question.qid}-option-two`).classList.remove("voted-card")
				}
				else {
					document.getElementById(`${question.qid}-option-one`).classList.remove("voted-card")
				}
				this.setState({
					answer: event.target.value,
					submitBtn: ''
				})
			}
		}
		else {
			event.target.classList.add("voted-card")
			this.setState({
				answer: event.target.value,
				submitBtn: ''
			})
		}
	}

	handleSubmit = (e) => {
		const { answer } = this.state
		const { dispatch, qid, authedUser } = this.props

		this.setState(() => ({
			answer: '',
			submitBtn: 'disable-btn'
		}))

		dispatch(handleSaveAnswer({ authedUser, qid, answer }))
	}

	render() {
		const { qid, questions, users } = this.props
		const { submitBtn } = this.state

		console.log(this.state);

		return (
			<div className='question-page'>
				<div className='question'>
					<button className='question-card' id={`${questions[qid].qid}-option-one`} value='optionOne' onClick={(event) => this.handleVote(questions[qid], event)}>
						{questions[qid].optionOne.text}
					</button>
					<h5 className='alternator'>OR</h5>
					<button className='question-card' id={`${questions[qid].qid}-option-two`} value='optionTwo' onClick={(event) => this.handleVote(questions[qid], event)}>
						{questions[qid].optionTwo.text}
					</button>
					<button style={{ borderRadius: '5%', width: '9%', height: '10%' }} className={submitBtn} onClick={(event) => this.handleSubmit(questions[qid], event)}>SUBMIT</button>
				</div>
				<p>Created By: <img src={`https://robohash.org/${questions[qid].author}`} alt="" class="user-avatar"></img> {users[questions[qid].author].name}</p>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props.match.params

	return {
		questions: questions,
		qid: id,
		users: users,
		authedUser: authedUser
	}
}

export default connect(mapStateToProps)(QuestionPage)
