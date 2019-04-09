import React, { Component } from 'react'
import { connect } from 'react-redux'
import Answered from './Answered'
import Unanswered from './Unanswered'

class Dashboard extends Component {
	state = {
		answeredId: [],
		unansweredId: [],
		nav: "unanswered"
	}

	componentWillMount() {
		this.questionsType()
	}

	questionsType = () => { // this function defines if the question has been answered or not
		let answeredIdArray = Object.keys(this.props.user.answers)
		let unansweredIdArray = []
		for (let index = 0; index < this.props.questionsIds.length; index++) {
			let id = this.props.questionsIds[index]
			if (this.props.user.answers[id] !== ("optionOne")) {
				if (this.props.user.answers[id] !== ("optionTwo")) {
					unansweredIdArray.push(id)
				}
			}
		}
		this.setState({
			answeredId: answeredIdArray
		})
		this.setState({
			unansweredId: unansweredIdArray
		})
	}

	changeNav = (e) => {
		this.setState({
			nav: e.target.value
		})
	}

	render() {

		const { answeredId, unansweredId, nav } = this.state

		return (
			<div className='dashboard'>
				<div className='nav-bar'>
				<h1 className='title'>WOULD YOU RATHER</h1>
					<button value="unanswered" onClick={(e) => this.changeNav(e)}>Unanswered</button>
					<button value="answered" onClick={(e) => this.changeNav(e)}>Answered</button>
				</div>
				<div>
					<div className='list-option'>
						{nav === "unanswered" && (
							<div>
								<h3 className='title'>UNANSWERED</h3>
								<Unanswered idsList={unansweredId} />
							</div>
						)}
						{nav === "answered" && (
							<div>
								<h3 className='title'>ANSWERED</h3>
								<Answered idsList={answeredId} />
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions, users, authedUser }) {
	return {
		user: users[authedUser],
		questionsIds: Object.keys(questions)
			.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	}
}

export default connect(mapStateToProps)(Dashboard);
