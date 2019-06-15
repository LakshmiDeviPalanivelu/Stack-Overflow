import React from 'react';

const Layout = (props) => {
  return (
  	<div>
  	    <header className="navbar-header" role="banner">
          <section id="Login" className="container" style={{"marginLeft": "70px"}}>     
            <i className="fa fa-stack-overflow" aria-hidden="true" id="icon"         float='relative'></i> &nbsp;
            <span className = 'head'>StackApplication</span>
               
          </section>
        </header>
        <div>
          {props.children}
        </div>
    </div>
    )
}

export default Layout;
