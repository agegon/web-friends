import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditUser from './EditUser';
import Settings from './Settings';
import UserInfo from './UserInfo';
import { User } from '../store/state';
import { deleteUsers, duplicateUser } from '../store/actions';

import './Users.scss';

const newUser = new User('', '', '', -1);

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      showEdit: false,
      currentUser: newUser,
      filterByCountry: '',
      filterByName: '',
      showInfo: false
    };
  }

  checkUser = (e, id) => {
    if (!e.target.checked) {
      this.setState({
        checked: this.state.checked.filter(i => i !== id)
      });
    } else {
      this.setState({
        checked: [...this.state.checked, id]
      });
    }
  }

  deleteUser = (id) => {
    this.props.deleteUsers([id]);
  }

  duplicateUser = (id) => {
    this.props.duplicateUser(id);
  }

  deleteUsers = () => {
    this.props.deleteUsers([...this.state.checked]);
    this.setState({
      checked: []
    });
  }

  closeEdit = () => {
    this.setState({
      showEdit: false,
      currentUser: newUser
    });
  }

  addUser = () => {
    this.setState(
      {
        showEdit: true,
        currentUser: newUser
      }
    );
  }

  editUser = user => {
    this.setState(
      {
        showEdit: true,
        currentUser: user
      }
    );
  }

  changeFilterByCountry = e => {
    this.setState({
      filterByCountry: e.target.value
    })
  }

  changeFilterByName = e => {
    this.setState({
      filterByName: e.target.value
    })
  }

  showInfo = user => {
    this.setState({
      currentUser: user,
      showInfo: true
    });
  }

  closeInfo = () => {
    this.setState({
      showInfo: false
    });
  }

  filterUsers = users => {
    let filteredUsers = [];
    const { filterByCountry, filterByName } = this.state;
    if (filterByCountry !== '') {
      filteredUsers = users.filter(i => i.country === filterByCountry);
    } else {
      filteredUsers = users;
    };
    if (filterByName !== '') {
      filteredUsers = filteredUsers.filter(i => {
        let str = i.firstName + ' ' + i.lastName;
        str = str.toUpperCase();
        return str.includes(filterByName.toUpperCase());
      });
    };
    return filteredUsers;
  }

  createCountriesList = users => {
    let countries = [];
    users.forEach(i => {
      if (!countries.includes(i.country)) 
        countries.push(i.country);
    });
    return countries.sort((a,b) => a.localeCompare(b));
  }

  renderUser = user => {
    const checked = this.state.checked.includes(user.id);
    return (
      <div className="user" key={user.id}>
        <div className="main-user">
          <div className="checkbox">
            <label className={checked ? "active" : ""}>
              <div></div>
              <input 
                type="checkbox"
                title="Select this user" 
                checked={this.state.checked.includes(user.id)}
                onChange={(e) => {this.checkUser(e, user.id)}}/>
            </label>
          </div>
          <div className="avatar" onClick={() => {this.showInfo(user)}}>
            <img src="/img/user.png" alt="User Avatar" />
          </div>
          <div className="user-info" onClick={() => {this.showInfo(user)}}>
            <h3>{user.firstName} {user.lastName}</h3>
            <span>{user.country}</span>
          </div>
        </div>
        <div className="btn">
          <button className="duplicate" onClick={() => this.duplicateUser(user.id)}>Duplicate</button>
          <button className="edit" onClick={() => this.editUser(user)}>Edit</button>
          <button className="delete" onClick={() => this.deleteUser(user.id)}>Delete</button>
        </div>
      </div>
    );
  }

  render() {
    const { users, style, title } = this.props;
    const { filterByCountry, filterByName } = this.state;
    const filteredUsers = this.filterUsers(users);
    const countries = this.createCountriesList(users);
    if (this.state.showInfo) {
      return (
        <UserInfo user={this.state.currentUser} style={style} back={this.closeInfo}/>
      )
    } else {
      return (
          <div className="wrap">
            <div className="workplace">
              <div className="panel" style={style}>
                <h2>{title}</h2>
                <div className="users-panel"> 
                  <div className="btn-wrap">
                    <button className="add"  onClick={this.addUser}>Add User</button>
                    <button className="delete"  onClick={this.deleteUsers}>Delete Items</button>
                  </div>
                  <div className="space"></div>
                  <div className="filters">
                    <select value={filterByCountry} onChange={this.changeFilterByCountry}>
                      <option value=''>Sort by Country</option>
                      {countries.map((i, c) => (<option key={`s_${c}`} value={i}>{i}</option>))}
                    </select>
                    <input type="text" value={filterByName} onChange={this.changeFilterByName} placeholder="Search by Name"/>
                  </div>
                </div>
              </div>
              <div className="users-list">
                {filteredUsers.map(this.renderUser)}
              </div>
            </div>
            <Settings />
            {this.state.showEdit && (<EditUser close = {this.closeEdit} user={this.state.currentUser} />)}
          </div>
      );
    };
  }
}

function mapStateToProps(state) {
  const style = state.settings.getColorStyle();
  const title = state.settings.title === '' ? 'Users' : state.settings.title;
  return {users: state.getUsers(), style, title };
};

export default connect(mapStateToProps, { deleteUsers, duplicateUser })(Users);