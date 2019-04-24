import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../actions/questions'

class NewQuestion extends Component {

	state = {
		optionOne: '',
		optionTwo: '',
	}

	generateUID() {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	}

	handleChange = (e) => {
		e.target.id === 'optionOne'
			? (this.setState({
				optionOne: e.target.value
			}))
			: (this.setState({
				optionTwo: e.target.value
			}))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOne, optionTwo } = this.state
		const { dispatch, authedUser } = this.props

		if(optionOne === '' || optionTwo === ''){
			alert('Please write two options.')
		
		}
		else{
			let question = {
				optionOneText: optionOne,
				optionTwoText: optionTwo,
				author: authedUser,
			}
	
			dispatch(handleNewQuestion(question)).then(() => this.props.history.push('/'))
		}
	}

	render() {
		console.log(this.state);

		return (
			<div className='new-question'>
				<h1 style={{ letterSpacing: '5px' }}>WOULD YOU RATHER</h1>
				<form className='new-question-form'>
					<textarea className='new-question-form-item' id='optionOne' onChange={(e) => this.handleChange(e)} placeholder='OPTION ONE'></textarea>
					<textarea className='new-question-form-item' id='optionTwo' onChange={(e) => this.handleChange(e)} placeholder='OPTION TWO'></textarea>
					<button className='new-question-form-submit' onClick={(e) => this.handleSubmit(e)}>SUBMIT</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps({ authedUser }) {

	return {
		authedUser: authedUser,
	}
}

export default connect(mapStateToProps)(NewQuestion)
