import React from 'react'
import { NavLink } from 'react-router-dom'


export default function NavQuestions() {

    return (
        <div className='nav-bar'>
            <h1 className='title' style={{margin:'0 0 1em 0'}}>WOULD YOU RATHER</h1>
            <NavLink to='/answered' activeClassName='active'>
                Answered
					</NavLink>
            <NavLink to='/unanswered' activeClassName='active'>
                Unanswered
				</NavLink>
        </div>
    )
}

