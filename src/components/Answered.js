import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavQuestions from './NavQuestions'
import { Link } from 'react-router-dom'

class Answered extends Component {

	// state = {
	// 	numberShowing: '',
	// 	percentShowing: ''
	// }

	// componentDidMount() {
	// 	this.props.idsList.map((id) => (
	// 		setTimeout(this.applyVotes(id), 3000)
	// 	))
	// }

	// applyVotes = (id) => {
	// 	const { users, authedUser, questions } = this.props
	// 	console.log('');
	// 	(users[authedUser].answers[id] === "optionOne"
	// 		? document.getElementById(`${questions[id].id}-option-one`).classList.add("voted-card")
	// 		: document.getElementById(`${questions[id].id}-option-two`).classList.add("voted-card")
	// 	)
	// }

	// showNumberOfVotes = (id, option) => {
	// 	let number
	// 	if (option === 'one') {
	// 		number = this.props.questions[id].optionOne.votes.push()
	// 	}
	// 	else {
	// 		number = this.props.questions[id].optionTwo.votes.push()
	// 	}

	// 	if (number > 1 || number === 0) {
	// 		return (`${number} votes`)
	// 	}
	// 	else {
	// 		return ('1 vote')
	// 	}
	// }

	// showPercentageOfVotes = (id, option) => {
	// 	let number1 = this.props.questions[id].optionOne.votes.push()
	// 	let number2 = this.props.questions[id].optionTwo.votes.push()
	// 	let total = number1 + number2
	// 	let percentage

	// 	if (option === 'one') {
	// 		percentage = number1 / total * 100
	// 	}
	// 	else {
	// 		percentage = number2 / total * 100
	// 	}

	// 	return (`${percentage.toFixed(0)}%`)
	// }

	render() {

		const { questions } = this.props

		return (
			<div className='dashboard'>
				<NavQuestions />
				<div className='questions-list'>
					{this.props.idsList.map((id) => {
						return (
							<div className='question-link'>
								<Link to={`/question/${id}`} type='answered'>
									<h5 style={{ margin: '0' }}>{questions[id].optionOne.text} OR {questions[id].optionTwo.text}</h5>
								</Link>
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
					})}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }) {

	const { answers } = users[authedUser]
	let idsList = Object.keys(answers)
		.sort((a, b) => answers[b].timestamp - answers[a].timestamp)

	console.log(idsList)
	return {
		questions: questions,
		users: users,
		authedUser: authedUser,
		idsList: idsList
	}
}

export default connect(mapStateToProps)(Answered);