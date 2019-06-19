import React, { Component } from 'react';
import { connect } from 'react-redux';

import Users from './Users';
import AdminPanel from './AdminPanel';
import './_fonts.scss';
import './App.scss';

const status = {
  USERS: 'Users',
  ADMIN_PANEL: 'Admin Panel'
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: status.USERS,
    }
  }

  changeStatus = s => {
    this.setState({
      status: s
    });
  }

  renderButton = s => {
    return (
      <div 
        className={'btn' + (this.state.status === s ? ' active' : '')} 
        onClick={() => {this.changeStatus(s)}}
      >
        {s}
      </div>
    )
  }

  render() {
    const { style } = this.props;
    return (
      <div className="App" style={style}>
        <header>
          <div className="logo">
            <img src="img/logo.png" alt="Logo"/>
          </div>
          <div className="buttons-wrap">
            {this.renderButton(status.USERS)}
            {this.renderButton(status.ADMIN_PANEL)}
          </div>
        </header>
        <main>
          {this.state.status === status.USERS && <Users />}
          {this.state.status === status.ADMIN_PANEL && <AdminPanel />}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { style: state.settings.getFontStyle() }
}

export default connect(mapStateToProps)(App);
