import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class QuestionsList extends Component {

	render() {

		return (
			<div className='questions-list'>
				{this.props.idsList.map((id) => (
					<div key={id}>
						<Question id={id} />
					</div>
				))}
			</div>
		);
	}
}

export default connect()(QuestionsList);