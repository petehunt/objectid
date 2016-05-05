import React, {Component, AppRegistry} from 'react-native';

import Session from './Session';
import Feed from './Feed';
import Login from './Login';

class objectid extends Component {
  constructor(props) {
    super(props);
    Session.addListener('change', this.forceUpdate.bind(this));
  }

  render() {
    if (!Session.isLoggedIn()) {
      return <Login />;
    }
    return <Feed />;
  }
}

AppRegistry.registerComponent('objectid', () => objectid);
