import React, { Component } from 'react';
import { connect } from 'react-redux';

import './AdminPanel.scss';

class AdminPanel extends Component {
  render() {
    const { style } = this.props;
    return (
      <div className="wrap">
        <div className="workplace">
          <div className="panel" style={style}>
            <h2>AdminPanel</h2>
          </div>
          <div className="admin">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { style: state.settings.getColorStyle() }
}

export default connect(mapStateToProps)(AdminPanel);