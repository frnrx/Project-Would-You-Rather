import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavQuestions from './NavQuestions'
import { Link } from 'react-router-dom'

class Answered extends Component {

	render() {

		const { questions } = this.props

		return (
			<div className='dashboard'>
				<NavQuestions />
				<div className='questions-list'>
					{this.props.idsList.map((id) => {
						return (
							<div className='question-link' key={id}>
								<Link to={`/question/${id}`} type='answered'>
									<h5 style={{ margin: '0' }}>{questions[id].optionOne.text} OR {questions[id].optionTwo.text}</h5>
								</Link>
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