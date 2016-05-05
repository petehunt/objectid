import React, {
  Component,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Session from './Session';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChangeUsername(username) {
    this.setState({username});
  }

  handleChangePassword(password) {
    this.setState({password});
  }

  handleFocusPassword() {
    this.refs.password.focus();
  }

  handleSubmit() {
    Session.login(this.state.username, this.state.password);
    // TODO: loading state...
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Object ID</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.handleChangeUsername.bind(this)}
            value={this.state.username}
            style={styles.text}
            placeholder="name@email.com"
            onSubmitEditing={this.handleFocusPassword.bind(this)}
          />
          <TextInput
            onChangeText={this.handleChangePassword.bind(this)}
            value={this.state.password}
            style={styles.text}
            placeholder="password"
            secureTextEntry
            onSubmitEditing={this.handleSubmit.bind(this)}
            ref="password"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 40
  },
  text: {
    flex: 1,
    fontSize: 20,
    height: 24,
    width: 200,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
  },
});

export default Login;
