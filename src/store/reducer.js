import * as types from './actionTypes';
import State, { User } from './state';

const users = [
  new User('Lex', 'Lutor', 'Russia', 333),
  new User('Klark', 'Kent', 'Russia', 444),
  new User('Luis', 'Lane', 'Russia', 777)
];

const initialState = new State(users);

export default function(state = initialState, action) {
  const newState = new State(
    state.users,
    state.settings.getSettings()
  );

  switch (action.type) {
    case types.ADD_USER:
      newState.addUser(
        new User(action.fname, action.lname, action.country)
      );
      break;
    case types.EDIT_USER:
      newState.editUser(
        action.id, 
        new User(action.fname, action.lname, action.country, action.id)
      );
      break;
    case types.DUPLICATE_USER:
      newState.duplicateUser(action.id);
      break;
    case types.DELETE_USERS:
      newState.deleteUsers(action.idArr);
      break;
    case types.CHANGE_COLOR:
      newState.settings.setColor(action.rgb);
      break;
    case types.CHANGE_FONT: 
      newState.settings.setFont(action.font);
      break;
    case types.CHANGE_TITLE: 
      newState.settings.setTitle(action.title);
      break;
    default:
      return state;
    };

  return newState;  
};