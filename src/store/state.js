export default class State {
  constructor(users, settings) {
    this.users = users || [];
    this.settings = new Settings(settings);
  }

  addUser(user) {
    this.users = [ ...this.users, user ];
  }
  
  editUser(id, newUser) {
    const users = [ ...this.users ];
    users.forEach((user, i) => {
      if (user.id === id) {
        users[i] = newUser;
      }
    });
    this.users = users;
  }
  
  duplicateUser(id) {
    let users = [];
    this.users.forEach(user => {
      users = [ ...users, user ];
      if (user.id === id) {
        const newUser = user.duplicate();
        users = [ ...users, newUser ];
      }
    });
    this.users = users;
  }
  
  deleteUsers(idArr) {
    let users = [ ...this.users ];
    if (!Array.isArray(idArr))
      idArr = [ idArr ];
    idArr.forEach( id => {
      users = users.filter( user => user.id !== id);
    });
    this.users = users;
  }

  getUsers() {
    return this.users.map(user => user.getUser());
  }

}

export class Settings {
  constructor(settings = {}) {
    this.setColor(settings.color);
    this.setTitle(settings.title);
    this.setFont(settings.font);
  }

  setColor(color = {}) {
    color.r = color.r || 94;
    color.g = color.g || 196;
    color.b = color.b || 226;
    color.a = color.a || 1;
    this.color = color;
  }

  setTitle(title) {
    this.title = title || '';
  }

  setFont(font) {
    this.font = font || 'Raleway';
  }

  getSettings() {
    return { ...this };
  }

  getFontStyle() {
    return {
      fontFamily: `${this.font}, sans-serif`
    };
  }

  getColorStyle() {
    const { r, g, b, a } = this.color;
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`
    };
  }
}

export class User {
  constructor(fname, lname, country, id) {
    this.id = id || this.generateId();
    this.firstName = fname || '';
    this.lastName = lname || '';
    this.country = country || '';
  }

  updateId() {
    this.id = this.generateId();
  }

  generateId() {
    return Math.round( (Date.now() - (30 * 365 * 24 * 3600 * 1000)) / 100);
  }

  duplicate() {
    return new User(this.firstName, this.lastName, this.country);
  }

  getUser() {
    return { ...this };
  }
}