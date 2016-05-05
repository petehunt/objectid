'use strict';

import EventEmitter from 'eventemitter3';
import {Image} from 'react-native';

class Photo {
  constructor(model, id, url, caption) {
    this.id = id;
    this.url = url;
    this.caption = caption;
    this.width = null;
    this.height = null;
    Image.getSize(this.url, (width, height) => {
      this.width = width;
      this.height = height;
      model.emit('change');
    });
  }
}

class Model extends EventEmitter {
  constructor() {
    super();
    this.allItems = [];

    // Create sample data
    for (let i = 0; i < 10; i++) {
      this.allItems.push(new Photo(this, i, 'http://lorempixel.com/300/300/sports/' + i + '/', i % 2 === 0 ? null :'foo foo bar bar baz baz ' + i));
    }
  }

  atEnd() {
    return this.allItems.length === 0;
  }

  getCurrent() {
    return this.allItems[0];
  }

  getNext() {
    return this.allItems[1];
  }

  moveNext(marking) {
    this.allItems = this.allItems.slice(1);
    // TODO: do something with the marking
    // TODO: preload additional items
    this.emit('change');
  }
}

export default new Model();
