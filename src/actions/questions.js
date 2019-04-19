import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const NEW_QUESTION = 'NEW_QUESTION'

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

function newQuestion(question) {
	debugger
	return {
		type: NEW_QUESTION,
		question
	}
}

export function handleNewQuestion(question) {
	const { optionOneText, optionTwoText, authedUser } = question
	return (dispatch) => {

		dispatch(showLoading())

		return saveQuestion({
			optionOneText: optionOneText,
			optionTwoText: optionTwoText,
			author: authedUser
		})
			.then((question) => dispatch(newQuestion(question)))
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