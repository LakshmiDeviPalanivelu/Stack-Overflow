import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomePage from './containers/HomePage/Home';
import StatsPage from './containers/StatsPage/Stats';
import Layout from './hoc/layout';

const Routes = () => {
	return (		
		  <BrowserRouter>
			  <Layout>
		      <Route exact path="/" component={HomePage} />
					<Route exact path="/stats" component={StatsPage} /> 
				</Layout> 
		  </BrowserRouter> 		   
		)
}

export default Routes;