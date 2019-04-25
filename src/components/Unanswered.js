import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavQuestions from './NavQuestions'
import { Link } from 'react-router-dom'

class Unaswered extends Component {

	render() {

		const { questions } = this.props

		return (
			<div className='dashboard'>
				<NavQuestions />
				<div className='questions-list'>
					{this.props.idsList.map((id) => {
						if (questions[id]) {
							return (
								<div className='question-link' key={id}>
									<Link to={`/question/${id}`} className='question-a'>
										<h5 style={{ margin: '0' }}>{questions[id].optionOne.text} OR {questions[id].optionTwo.text}</h5>
									</Link>
								</div>
							)
						}
						else{
							return null
						}
					})}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }) {
	const { answers } = users[authedUser]
	let questionsId = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	let answersId = Object.keys(answers)
	let idsList = []
	questionsId.forEach((question) => {
		answersId.find((answer) => answer === question) === undefined && idsList.push(question)
	})

	return {
		questions: questions,
		users: users,
		authedUser: authedUser,
		idsList: idsList
	}
}

export default connect(mapStateToProps)(Unaswered);