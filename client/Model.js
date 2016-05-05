'use strict';

import EventEmitter from 'eventemitter3';
import {Image} from 'react-native';
import Session from './Session';

const FETCH_NEXT_LIMIT = 5;

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
    this.nextUrl = '/objects/';
    this.fetching = false;
    this.started = false;
    Session.addListener('change', this.handleSessionChange.bind(this));
  }

  handleSessionChange() {
    if (Session.isLoggedIn() && !this.started) {
      this.started = true;
      this.fetchNext();
    }
  }

  fetchNext() {
    if (this.fetching) {
      return;
    }
    if (!this.nextUrl) {
      return;
    }

    this.fetching = true;

    Session.frisbee.get(this.nextUrl, (err, res, body) => {
      this.fetching = false;

      if (err) {
        // TODO: better error handling
        this.nextUrl = null;
        return;
      }

      let parsed = JSON.parse(body);
      this.nextUrl = parsed.next;
      this.allItems = this.allItems.concat(
        parsed.results.map(result => {
          return new Photo(this, result.id, result.url, result.question);
        })
      );
    });
  }

  atEnd() {
    return this.allItems.length === 0 && !this.nextUrl;
  }

  getCurrent() {
    return this.allItems[0];
  }

  getNext() {
    return this.allItems[1];
  }

  moveNext(marking) {
    /*
    Session.frisbee.post(
      '/votes/' + Date.now() + '/',
      {body: JSON.stringify({body: marking ? 'yes' : 'no'})}
    );
     */
    this.allItems = this.allItems.slice(1);

    if (this.allItems.length < FETCH_NEXT_LIMIT) {
      this.fetchNext();
    }

    // TODO: do something with the marking
    this.emit('change');
  }
}

export default new Model();
