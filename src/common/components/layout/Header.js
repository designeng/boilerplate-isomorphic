import React, { Component, PropTypes } from 'react';

class Header extends Component {

  render() {
    return (
      <div className="masthead">
  			<div className="container">
  			  <h3 className="masthead-title">
  			    <a href="/" title="Home">Redux Devtools</a>
  			  </h3>
  			</div>
		  </div>
    );
  }
}

Header.propTypes = {
};

export default Header;