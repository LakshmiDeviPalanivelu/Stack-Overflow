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

export function sendData(data) {
  return function (dispatch){
          return axios.post('/api/data', {data})
                      .then(response => {   
                          dispatch({
                            type: 'DATA_LIST',
                            payload: response.data
                          })
                      })
  }
}




