import {AsyncStorage} from 'react-native';

import EventEmitter from 'eventemitter3';

class Session extends EventEmitter {
  constructor() {
    super();
    this.sessionId = null;
  }

  login(username, password) {
    this.sessionId = 'foo';
    this.emit('change');
  }

  isLoggedIn() {
    return !!this.sessionId;
  }
}

export default new Session();
