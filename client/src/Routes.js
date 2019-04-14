import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomePage from './containers/HomePage/Home';
import StatsPage from './containers/StatsPage/Stats';

const Routes = () => {
	return (		
		  <BrowserRouter>
			  <div>
			    
		      <Route exact path="/" component={HomePage} />
					<Route exact path="/stats" component={StatsPage} /> 
			  </div>
		  </BrowserRouter> 		   
		)
}

export default Routes;