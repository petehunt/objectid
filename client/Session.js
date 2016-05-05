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
        AsyncStorage.setItem('credentials', JSON.stringify([username, password]));
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

let singleton = new Session();

AsyncStorage.getItem('credentials', (err, json) => {
  if (err || !json) {
    return;
  }
  const credentials = JSON.parse(json);

  singleton.login(credentials[0], credentials[1]);
});


export default singleton;
