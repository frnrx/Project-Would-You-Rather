import React, { Component } from 'react'
import { connect } from 'react-redux'

class Answered extends Component {

	state = {
		numberShowing: '',
		percentShowing: ''
	}

	componentDidMount() {
		this.props.idsList.map((id) => (
			setTimeout(this.applyVotes(id), 3000)
		))
	}

	applyVotes = (id) => {
		const { users, authedUser, questions } = this.props
		console.log('');
		(users[authedUser].answers[id] === "optionOne"
			? document.getElementById(`${questions[id].id}-option-one`).classList.add("voted-card")
			: document.getElementById(`${questions[id].id}-option-two`).classList.add("voted-card")
		)
	}

	showNumberOfVotes = (id, option) => {
		let number
		if (option === 'one') {
			number = this.props.questions[id].optionOne.votes.push()
		}
		else {
			number = this.props.questions[id].optionTwo.votes.push()
		}

		if (number > 1 || number === 0) {
			return (`${number} votes`)
		}
		else {
			return ('1 vote')
		}
	}

	showPercentageOfVotes = (id, option) => {
		let number1 = this.props.questions[id].optionOne.votes.push()
		let number2 = this.props.questions[id].optionTwo.votes.push()
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

	render() {

		const { questions, users, authedUser } = this.props

		return (
			<div className='question-list'>
				{this.props.idsList.map((id) => {
					return (
						<div className='question' key={questions[id].id}>
							<button className='question-card' value='optionOne' id={`${questions[id].id}-option-one`}>
								{questions[id].optionOne.text}
								<p>{this.showNumberOfVotes(id, 'one')}</p>
								<p>{this.showPercentageOfVotes(id, 'one')}</p>
							</button>
							<h5 className='alternator'>OR</h5>
							<button className='question-card' value='optionTwo' id={`${questions[id].id}-option-two`}>
								{questions[id].optionTwo.text}
								<p>{this.showNumberOfVotes(id, 'two')}</p>
								<p>{this.showPercentageOfVotes(id, 'two')}</p>
							</button>
						</div>
					)
				})}
			</div>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }) {

	return {
		questions: questions,
		users: users,
		authedUser: authedUser
	}
}
export default connect(mapStateToProps)(Answered);