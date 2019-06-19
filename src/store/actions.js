import * as types from './actionTypes';

export const addUser = (fname, lname, country) => ({
  type: types.ADD_USER,
  fname,
  lname,
  country
});

export const editUser = (id, fname, lname, country) => ({
  type: types.EDIT_USER,
  id,
  fname,
  lname,
  country
});

export const duplicateUser = id => (
  {
    type: types.DUPLICATE_USER,
    id
  }
);

export const deleteUsers = idArr => (
  {
    type: types.DELETE_USERS,
    idArr
  }
);

export const changeColor = rgb => (
  {
    type: types.CHANGE_COLOR,
    rgb
  }
);
export const changeFont = font => (
  {
    type: types.CHANGE_FONT,
    font
  }
);
export const changeTitle = title => (
  {
    type: types.CHANGE_TITLE,
    title
  }
);