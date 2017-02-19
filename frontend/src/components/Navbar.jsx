import React, { Component } from 'react';
import { connect } from 'react-redux';
import { router, Link } from 'react-router';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.logout = ::this.logout;
    }

    logout(){
        window.currentUser = null
        window.location.reload();
    }
  renderHeader() {
    if (this.props.currentUser) {
        return [
          <Link to="/" className="navbar-logo">
              <img src="http://res.cloudinary.com/stellar-pixels/image/upload/v1486929017/logo_abrv_lb2yb5.svg" alt="" className="img-logo-abrv"/>
          </Link>,
          <ul className="navbar-nav">
              <li className="navbar-item">
                  <p>Logged in as {this.props.currentUser.displayName}</p>
              </li>
            <li className="navbar-item">
              <Link className="navbar-link dark" to="/?out=1" onClick={this.logout}>
                <img className="icon-logout" src="/static/images/logout.svg" />
              </Link>
            </li>
          </ul>
        ];
      } else {
        return [
          <Link to="/" className="navbar-logo">
              <img src="http://res.cloudinary.com/stellar-pixels/image/upload/v1486929017/logo_l9b0p5.svg" alt="" className="img-logo"/>
          </Link>,
          <ul className="navbar-nav">
            <li className="navbar-item" key={1}>
              <Link className="navbar-link" to="/get-started">Get Started</Link>
            </li>
          </ul>
        ];
      }
  }

  render() {
    return (
        <header className="navbar">
          {this.renderHeader()}
        </header>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(Navbar);
