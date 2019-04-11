import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavQuestions from './NavQuestions'
import { Link } from 'react-router-dom'

class Unaswered extends Component {

	state = {
		voted: ''
	}

	handleVote = (question, event) => {


		if (this.state.voted !== '') {

			if (event.target.classList.length === 2) {
				event.target.classList.remove("voted-card")
				this.setState({
					voted: ''
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
					voted: event.target.id
				})
			}
		}
		else {
			event.target.classList.add("voted-card")
			this.setState({
				voted: event.target.id
			})
		}
	}

	render() {

		const { questions } = this.props

		return (
			<div className='dashboard'>
				<NavQuestions />
				<div className='questions-list'>
					{this.props.idsList.map((id) => (
						<div className='question-link'>
							<Link to={`/question/${id}`}>
								<h5 style={{margin: '0'}}>{questions[id].optionOne.text} OR {questions[id].optionTwo.text}</h5>
							</Link>
						</div>
					))}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }) {

	const { answers } = users[authedUser]
	let questionsId = Object.keys(questions)
	let answersId = Object.keys(answers)
	let idsList = []
	questionsId.map((question) => {
		answersId.find((answer) => answer === question) === undefined && idsList.push(question)
	})
	// .sort((a, b) => answers[b].timestamp - answers[a].timestamp)

	return {
		questions: questions,
		users: users,
		authedUser: authedUser,
		idsList: idsList
	}
}

export default connect(mapStateToProps)(Unaswered);