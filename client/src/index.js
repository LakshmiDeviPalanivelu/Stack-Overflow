import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers';
import 'semantic-ui-css/semantic.min.css'


const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducer)}>
	   <App />
	</Provider>
	, document.getElementById('root')
);
