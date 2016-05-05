'use strict';

import React, {Animated, Dimensions, StyleSheet, Text, View, Image} from 'react-native';

import Lightbox from 'react-native-lightbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import SwipeCards from './thirdparty/SwipeCards';

const CARD_MARGIN = 5;
const WIDTH = Dimensions.get('window').width;

let EndCard = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.endText}>You are at the end!</Text>
      </View>
    );
  },
});

let Card = React.createClass({
  renderIcon(iconName, iconColor, opacity) {
    return (
      <View style={styles.checkContainer} pointerEvents="none">
        <Animated.View style={{opacity: opacity}}>
          <Icon name={iconName} size={90} color={iconColor} style={styles.yupNopeIcon} />
        </Animated.View>
      </View>
    );
  },

  renderImage() {
    const aspectRatio = this.props.data.height / this.props.data.width;
    const width = WIDTH - 2 * CARD_MARGIN;
    const height = aspectRatio * width;

    return (
      <Image
        source={{uri: this.props.data.url}}
        style={{width: width, height: height}}
      />
    );
  },

  render() {
    if (!this.props.data.width) {
      return <View style={styles.card}><Text>Loading...</Text></View>;
    }

    let caption = null;
    if (this.props.data.caption) {
      caption = (
        <View style={styles.imageCaptionContainer} pointerEvents="none">
          <Text style={styles.imageCaptionText}>{this.props.data.caption}</Text>
        </View>
      );
    }

    return (
      <View style={styles.card}>
        <Animated.View style={{opacity: this.props.opacity}}>
          <View style={styles.cardBorder}>
            <Lightbox renderContent={this.renderImage}>
              <View style={styles.lightboxContainer}>
                {this.renderImage()}
                {caption}
              </View>
            </Lightbox>
          </View>
        </Animated.View>
        {this.renderIcon('check', 'green', this.props.yupOpacity)}
        {this.renderIcon('question', 'orange', this.props.nopeOpacity)}
      </View>
    );
  }
});

export default React.createClass({
  handleYup(card) {
    this.props.onYup();
  },

  handleNope(card) {
    this.props.onNope();
  },

  renderCard(cardData, opacity, yupOpacity, nopeOpacity) {
    if (!cardData) {
      return <EndCard />;
    }
    return <Card data={cardData} opacity={opacity} yupOpacity={yupOpacity} nopeOpacity={nopeOpacity} />;
  },

  render() {
    return (
      <SwipeCards
        style={styles.container}
        card={this.props.card}
        renderCard={this.renderCard}
        onYup={this.props.onYup}
        onNope={this.props.onNope}
        gesturesEnabled={!!this.props.card && this.props.card.width}
        nextCard={this.props.nextCard}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 340,
    height: 340,
    position: 'relative'
  },
  yupNopeIcon: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  checkContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  cardBorder: {
    flex: 1,
    padding: CARD_MARGIN,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: 'rgba(204,204,204,0.5)',
    shadowColor: '#ccc',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  endText: {
    backgroundColor: '#eee',
  },
  lightboxContainer: {
    position: 'relative',
  },
  imageCaptionText: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(25,25,25,0.4)',
    padding: 5,
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(25,25,25,0.5)',
    fontSize: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowRadius: 5,
    textShadowOffset: {width: 0, height: 1},
  },
});
