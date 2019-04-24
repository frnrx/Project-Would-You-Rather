import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'

class QuestionPage extends Component {

	state = {
		answer: '',
		submitBtn: 'disable-btn'
	}

	componentDidMount() {
		this.props.isAnswered && (
			this.showAnswer(this.props.answer)
		)
	}

	showAnswer = (answer) => {
		const { qid, questions } = this.props
		document.getElementById(`${questions[qid].qid}${answer}`).classList.add("voted-card")
	}

	handleVote = (event) => {
		const { qid, questions } = this.props

		if (!this.props.isAnswered) {
			if (event.target.classList.length === 2) {
				event.target.classList.remove("voted-card")
				this.setState({
					answer: '',
					submitBtn: 'disable-btn'
				})

			}
			else {
				event.target.classList.add("voted-card")
				if (event.target.id === `${questions[qid].qid}optionOne`) {
					document.getElementById(`${questions[qid].qid}optionTwo`).classList.remove("voted-card")
				}
				else {
					document.getElementById(`${questions[qid].qid}optionOne`).classList.remove("voted-card")
				}
				this.setState({
					answer: event.target.value,
					submitBtn: ''
				})
			}
		}
	}

	showNumberOfVotes = (qid, option) => {
		let number
		if (option === 'one') {
			number = this.props.questions[qid].optionOne.votes.push()
		}
		else {
			number = this.props.questions[qid].optionTwo.votes.push()
		}

		if (number > 1 || number === 0) {
			return (`${number} votes`)
		}
		else {
			return ('1 vote')
		}
	}

	showPercentageOfVotes = (qid, option) => {
		let number1 = this.props.questions[qid].optionOne.votes.push()
		let number2 = this.props.questions[qid].optionTwo.votes.push()
		let total = number1 + number2
		let percentage

		if (option === 'one') {
			percentage = number1 / total * 100
		}
		else {
			percentage = number2 / total * 100
		}

		return (`${percentage.toFixed(0)}%`)
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
		const { qid, questions, users, isAnswered } = this.props
		const { submitBtn } = this.state

		return (
			<div className='question-page'>
				{questions[qid]
					? (<div style={{display: 'flex', flexDirection: 'column'}}>
						<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-around'}}>
							<h1 style={{margin: '0'}}>Would You Rather</h1>
							<p>Created By: <img src={`https://robohash.org/${questions[qid].author}`} alt="" className="user-avatar"></img> {users[questions[qid].author].name}</p>
						</div>
						<div className='question'>
							<button className='question-card' id={`${questions[qid].qid}optionOne`} value='optionOne' onClick={(event) => this.handleVote(event)}>
								{questions[qid].optionOne.text}
							</button>
							<h5 className='alternator'>OR</h5>
							<button className='question-card' id={`${questions[qid].qid}optionTwo`} value='optionTwo' onClick={(event) => this.handleVote(event)}>
								{questions[qid].optionTwo.text}
							</button>
						</div>
							<button className={`login-form-item ${submitBtn}`} style={{alignSelf: 'center'}} onClick={(event) => this.handleSubmit(event)}>SUBMIT</button>
						{isAnswered &&
							(<div className='results'>
								<div>
									<p>{this.showNumberOfVotes(qid, 'one')}</p>
									<p>{this.showPercentageOfVotes(qid, 'one')}</p>
								</div>
								<div>
									<p>{this.showNumberOfVotes(qid, 'two')}</p>
									<p>{this.showPercentageOfVotes(qid, 'two')}</p>
								</div>
							</div>)
						}
					</div>)
					: (
						null
					)
				}
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props.match.params

	let isAnswered = Object.keys(users[authedUser].answers).includes(id)
	let answer = ''

	isAnswered && (answer = users[authedUser].answers[id])

	return {
		questions: questions,
		qid: id,
		users: users,
		authedUser: authedUser,
		isAnswered: isAnswered,
		answer: answer
	}
}

export default connect(mapStateToProps)(QuestionPage)
