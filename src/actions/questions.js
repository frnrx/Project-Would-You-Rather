import { saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}
}

function saveAnswer(tweet) {
	return {
	  type: SAVE_ANSWER,
	  tweet,
	}
  }

export function handleSaveAnswer(qi, vote) {
	return (dispatch, getState) => {
	  const { authedUser } = getState()
  
	  dispatch(showLoading())
  
	  return saveAnswer({
		author: authedUser,
		qi,
		vote
	  })
		.then((answer) => dispatch(saveQuestionAnswer(answer)))
		.then(() => dispatch(hideLoading()))
	}
  }