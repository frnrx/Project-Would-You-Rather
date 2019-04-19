import { RECEIVE_QUESTIONS, SAVE_ANSWER, NEW_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions
			}

		case NEW_QUESTION:
		debugger
			return {
				...state,
				...action.question
			}

		case SAVE_ANSWER:
			let secondOption

			action.answer === 'optionOne' ? secondOption = 'optionTwo' : secondOption = 'optionOne'

			if (!state[action.qid][action.answer].votes.includes(action.authedUser)) {
				if (state[action.qid][secondOption].votes.includes(action.authedUser)) {
					return {
						...state,
						[action.qid]: {
							...state[action.qid],
							[secondOption]: {
								...state[action.qid][action.answer],
								votes: state[action.qid][secondOption].votes.filter(user => user !== action.authedUser)
							},
							[action.answer]: {
								...state[action.qid][action.answer],
								votes: state[action.qid][action.answer].votes.concat(action.authedUser)
							}
						}
					}
				}
				else {
					return {
						...state,
						[action.qid]: {
							...state[action.qid],
							[action.answer]: {
								...state[action.qid][action.answer],
								votes: state[action.qid][action.answer].votes.concat(action.authedUser)
							}
						}
					}
				}
			}
			else {
				return state;
			}
		default:
			return state
	}
}