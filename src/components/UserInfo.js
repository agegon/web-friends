import React, { Component } from 'react';

import './UserInfo.scss';

export default class UserInfo extends Component {

  clickBack = () => {
    this.props.back();
  }

  render() {
    const { firstName, lastName, country } = this.props.user;
    const { style } = this.props;
    return (
      <div className="wrap">
        <div className="user-wrap">
          <div className="logo">
            <img src="img/user.png" alt="User Avatar"/>
          </div>
          <div className="info">
            <h2>{firstName} {lastName}</h2>
            <span>{country}</span>
          </div>
          <button style={style} onClick={this.clickBack}>Back</button>
        </div>
      </div>
    );
  }
}