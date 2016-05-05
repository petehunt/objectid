/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
// Later copied from https://github.com/meteor-factory/react-native-tinder-swipe-cards

'use strict';

import React, { StyleSheet, Text, View, Animated, Component, PanResponder, Image} from 'react-native';
import clamp from 'clamp';

var SWIPE_THRESHOLD = 120;

class SwipeCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
    };
  }

  skipGestureIfDisabled(cb) {
    return (...args) => {
      if (!this.props.gesturesEnabled) {
        return;
      }

      return cb(...args);
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: this.skipGestureIfDisabled((e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      }),

      onPanResponderMove: this.skipGestureIfDisabled(Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ])),

      onPanResponderRelease: this.skipGestureIfDisabled((e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
          let cb = this.state.pan.x._value > 0
            ? this.props.onYup.bind(null, this.props.card)
            : this.props.onNope.bind(null, this.props.card);

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(cb);
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start();
        }
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.card !== nextProps.card) {
      this.state.pan.setValue({x: 0, y: 0});
    }
  }

  render() {
    let { pan, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let undercardScale = pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [1.0, 0.95, 1.0],
      extrapolate: 'clamp',
    });

    let animatedCardstyles = {transform: [{translateX}, {translateY}, {rotate}]};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});

    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.inner} key={this.props.nextCard && this.props.nextCard.id || 'back'}>
          <Animated.View style={{transform: [{scale: undercardScale}]}}>
            {this.props.nextCard && this.props.renderCard(this.props.nextCard, 1, 0, 0)}
          </Animated.View>
        </View>
        <View style={styles.inner} key={this.props.card && this.props.card.id || 'front'}>
          <Animated.View style={[styles.card, animatedCardstyles]} {...this._panResponder.panHandlers}>
            {this.props.renderCard(this.props.card, opacity, yupOpacity, nopeOpacity)}
          </Animated.View>
        </View>
      </View>
    );
  }
}

SwipeCards.propTypes = {
  cards: React.PropTypes.array,
  renderCards: React.PropTypes.func,
  onYup: React.PropTypes.func,
  onNope: React.PropTypes.func
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
});

export default SwipeCards
