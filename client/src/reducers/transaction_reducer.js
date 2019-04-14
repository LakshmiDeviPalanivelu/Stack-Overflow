export default function(state={}, action) {
	switch(action.type) {
		case 'TRANSACTION_LIST':
			return {...state, transactions: action.payload}
		case 'DATA_LIST':
		  return {...state, data: action.payload}
		default:
		  return state;
	}
}
