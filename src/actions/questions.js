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

function saveAnswer({ authedUser, qid, answer }) {
	return {
		type: SAVE_ANSWER,
		authedUser,
		qid,
		answer
	}
}

export function handleSaveAnswer(info) {
	return (dispatch) => {

		dispatch(showLoading())

		return saveQuestionAnswer(info)
			.then(() => dispatch(saveAnswer(info)))
			.then(() => dispatch(hideLoading()))
	}
}

// export function handleSaveAnswer(info) {
// 	return (dispatch) => {
// 		dispatch(saveAnswer(info));

// 		return saveQuestionAnswer(info)
// 			.catch((e) => {
// 				console.warn('Error in handleSaveAnswer: ', e);
// 				dispatch(toggleTweet(info));
// 				alert('There was an error liking the tweet. Try again.');
// 			});
// 	};
// }