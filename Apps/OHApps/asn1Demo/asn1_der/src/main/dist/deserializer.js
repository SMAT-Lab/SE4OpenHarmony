"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class Deserializer {
  constructor() {
    return this.deserialize.bind(this);
  }

  deserialize(object) {
    return this.deserializationImpl(object);
  }
}
exports.Deserializer = Deserializer;
