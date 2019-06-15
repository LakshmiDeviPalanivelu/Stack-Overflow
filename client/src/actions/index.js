import axios from 'axios';

export function transactionList() {
    return function (dispatch){
            return axios.get('/api/transactions')
                        .then(response => {   
                            dispatch({
                              type: 'TRANSACTION_LIST',
                              payload: response.data
                            })
                        })
    }
}

export function sendData(title, question) {
  return function (dispatch){
          return axios.post('/api/get_tags', {title, question})
                      .then(response => {   
                          dispatch({
                            type: 'DATA_LIST',
                            payload: response.data
                          })
                      })
  }
}




