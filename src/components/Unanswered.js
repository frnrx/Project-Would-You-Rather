import React, { Component } from 'react'
import { connect } from 'react-redux'

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
			<div className='question-list'>
				{this.props.idsList.map((id) => (
					<div className='question' key={questions[id].id}>
						<button className='question-card' id={`${questions[id].id}-option-one`} onClick={(event) => this.handleVote(questions[id], event)}>
							{questions[id].optionOne.text}
						</button>
						<h5 className='alternator'>OR</h5>
						<button className='question-card' id={`${questions[id].id}-option-two`} onClick={(event) => this.handleVote(questions[id], event)}>
							{questions[id].optionTwo.text}
						</button>
					</div>
				))}
			</div>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }) {

	return { questions: questions }
}

export default connect(mapStateToProps)(Unaswered);