import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
	render() {

		const { usersArranged } = this.props

		return (
			<div>
				<div className='leaderboard'>
					<h1 style={{letterSpacing: '5px'}}>Leaderboard</h1>
					{usersArranged.map((user) => (
						<div className='user-leaderboard' key={user.id}>
							<img src={user.avatarURL} alt='' className='user-avatar' />
							<p>{`${user.name} has answered ${user.answers} polls and ansked ${user.questions}`}</p>
						</div>
					))}
				</div>
			</div>
		)
	}
}

function mapStateToProps({ users }) {

	let usersList = Object.keys(users)
	let usersArranged = []
	let user = {}

	usersList.forEach((id) => {
		let numAnswers = Object.keys(users[id].answers).length
		let numQuestions = Object.keys(users[id].questions).length
		let numTotal = numAnswers + numQuestions
		user = {
			...users[id],
			answers: numAnswers,
			questions: numQuestions,
			total: numTotal
		}
		usersArranged.push(user)
	})	

	usersArranged = usersArranged.sort((a, b) => b.total - a.total)

	return {
		usersArranged: usersArranged
	}
}

export default connect(mapStateToProps)(Leaderboard)