import React, { Component } from 'react'
import { connect } from 'react-redux'

class Answered extends Component {

	componentDidMount() {
		this.props.idsList.map((id) => (
			setTimeout(this.applyVotes(id), 3000)
		))
	}

	applyVotes = (id) => {		
		const { users, authedUser, questions } = this.props
		console.log(users[authedUser]);
			(users[authedUser].answers[id] === "optionOne"
				? document.getElementById(`${questions[id].id}-option-one`).classList.add("voted-card")
				: document.getElementById(`${questions[id].id}-option-two`).classList.add("voted-card")
			)
	}

	render() {

		const { questions, users, authedUser } = this.props

		return (
			<div className='question-list'>
				{this.props.idsList.map((id) => {
					return (
						<div className='question' key={questions[id].id}>
							<button className='question-card' id={`${questions[id].id}-option-one`}>
								{questions[id].optionOne.text}
							</button>
							<h5 className='alternator'>OR</h5>
							<button className='question-card' id={`${questions[id].id}-option-two`}>
								{questions[id].optionTwo.text}
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