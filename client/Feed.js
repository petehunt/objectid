import React, {
  AlertIOS,
  Animated,
  Component,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Cards from './Cards';
import Constants from './Constants';
import Model from './Model';

import Icon from 'react-native-vector-icons/FontAwesome';

function bounce(animatedValue) {
  animatedValue.setValue(1.3);
  Animated.spring(
    animatedValue,
    {
      toValue: 1.0,
      friction: 3,
    }
  ).start();
}

const HAMBURGER_ENABLED = false;
const FORWARD_ENABLED = false;

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yupScale: new Animated.Value(1),
      nopeScale: new Animated.Value(1),
      current: Model.getCurrent(),
      next: Model.getNext(),
    };

    Model.addListener('change', this.handleChange.bind(this));
  }

  handleChange() {
    this.setState({
      current: Model.getCurrent(),
      next: Model.getNext(),
    });
  }

  handleYup() {
    if (Model.atEnd()) {
      return;
    }
    if (this.state.current.caption) {
      AlertIOS.prompt(this.state.current.caption);
    }
    Model.moveNext(true);
    bounce(this.state.yupScale);
  }

  handleNope() {
    if (Model.atEnd()) {
      return;
    }

    Model.moveNext(false);
    bounce(this.state.nopeScale);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.navBar}>
          <View style={styles.navBarIcon}>
            {HAMBURGER_ENABLED && <Icon name="bars" size={30} color="white" />}
          </View>
          <Text style={styles.navBarText}>{Constants.TITLE}</Text>
          <View style={styles.navBarForwardIcon}>
            {FORWARD_ENABLED && <Icon name="share" size={30} color="white" />}
          </View>
        </View>
        <Cards
          style={styles.cards}
          onYup={this.handleYup.bind(this)}
          onNope={this.handleNope.bind(this)}
          card={this.state.current}
          nextCard={this.state.next}
        />
        <View style={styles.actionBar}>
          <Animated.View style={{transform: [{scale: this.state.nopeScale}]}}>
            <TouchableHighlight onPress={this.handleNope.bind(this)} underlayColor="#eee">
              <Icon name="question-circle" size={70} color="orange" style={styles.actionBarIcon} />
            </TouchableHighlight>
          </Animated.View>
          <View style={styles.actionBarSpacer} />
          <Animated.View style={{transform: [{scale: this.state.yupScale}]}}>
            <TouchableHighlight onPress={this.handleYup.bind(this)} underlayColor="#eee">
              <Icon name="check-circle" size={70} color="green" style={styles.actionBarIcon} />
            </TouchableHighlight>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  cards: {
    flex: 1,
  },
  navBar: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#333',
    flexDirection: 'row',
    height: Constants.TOPBAR_HEIGHT,
  },
  navBarText: {
    color: 'white',
    fontSize: 25,
    flex: 1,
    textAlign: 'center',
  },
  navBarIcon: {
    marginLeft: 15,
    flex: 0,
  },
  navBarForwardIcon: {
    marginRight: 15,
    flex: 0,
  },
  actionBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: Constants.BOTTOMBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  actionBarSpacer: {
    width: 75,
  },
  actionBarIcon: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default Feed;
