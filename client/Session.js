import {AsyncStorage} from 'react-native';

import Constants from './Constants';
import EventEmitter from 'eventemitter3';
import Frisbee from 'frisbee';

class Session extends EventEmitter {
  constructor() {
    super();
    this.loggingIn = false;
    this.frisbee = null;
  }

  login(username, password) {
    const frisbee = new Frisbee({
      baseURI: Constants.ENDPOINT,
      auth: [username, password],
    });

    this.loggingIn = true;
    this.emit('change');
    frisbee.get('/objects/', (err, res) => {
      if (!err) {
        this.frisbee = frisbee;
      }
      this.loggingIn = false;
      this.emit('change');
    });
  }

  isLoggingIn() {
    return this.loggingIn;
  }

  isLoggedIn() {
    return !!this.frisbee;
  }
}

export default new Session();
