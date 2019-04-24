import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

	state = {
		userId: ''
	}

	handlePick = (e) => {
		e.preventDefault()

		this.setState({
			userId: e.target.id
		})

		console.log(e.target.id);
	}

	handleLogin = (e) => {
		e.preventDefault()

		const { userId } = this.state
		const { dispatch } = this.props
		dispatch(setAuthedUser(userId))
	}

	render() {
		return (
			<div className='login'>
				<h5 style={{ letterSpacing: '5px' }}>LOGIN</h5>
				<form className='login-form'>
					<button className='login-form-item' id='johndoe' onClick={(e) => this.handlePick(e)}>John Doe</button>
					<button className='login-form-item' id='tylemcginnis' onClick={(e) => this.handlePick(e)}>Tyler McGinnis</button>
					<button className='login-form-item' id='sarahedo' onClick={(e) => this.handlePick(e)}>Sarah Edo</button>
					<button className='login-form-item' onClick={(e) => this.handleLogin(e)}>Login</button>
				</form>
			</div>
		)
	}
}

export default connect()(Login)