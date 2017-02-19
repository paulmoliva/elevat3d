import React, { Component, PropTypes } from 'react';
import routeConfig from '../common/routeConfig';
import Navbar from '../components/Navbar';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.node,
    };

    state = {
        currentUser: window.currentUser
    }
    
    constructor(props){
        super(props);
    }


  render() {
    let style = (this.props.routes[0].path === '/' && ! this.state.currentUser) ? {backgroundColor: '#6CB2DD'} : {backgroundColor: '#fbfbfc'};
    return (
      <div className="app" style={style}>
        <Navbar routes={routeConfig} currentUser={this.state.currentUser}/>
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
