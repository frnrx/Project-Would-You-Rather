import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './Login'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

	handleLogout = (e) => {
		e.preventDefault()
		this.props.dispatch(setAuthedUser(null))
	}
	render() {
		const { user } = this.props

		return (
			<div>
				{this.props.authedUser === null
					? <Login />
					: <div className='nav'>
						<nav className='nav-list'>
							<div className='nav-item'>
								<NavLink to='/' exact activeClassName='active'>
									Home
							</NavLink>
							</div>
							<div className='nav-item'>
								<NavLink to='/add' activeClassName='active'>
									New Question
							   </NavLink>
							</div>
							<div className='nav-item'>
								<NavLink to='/leaderboard' activeClassName='active'>
									Leaderboard
							</NavLink>
							</div>
						</nav>
						<div className='user'>
							<img src={user.avatarURL} alt='' className='user-avatar' />
							<p className='user-name'>{user.name}</p>
						</div>
						<button onClick={(e) => this.handleLogout(e)}>LOGOUT</button>
					</div>
				}
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users }) {

	return {
		user: users[authedUser]
	}
}

export default connect(mapStateToProps)(Nav);