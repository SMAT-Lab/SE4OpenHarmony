'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Serializer = undefined;


function validateAOM(aom) {
  if (aom === null) throw new Error('ASN.1 object model must not be null');
  if (aom === undefined) throw new Error('ASN.1 object model must not be undefined');
  if (typeof aom !== 'object') throw new Error('ASN.1 object model must be an object');
  if (Array.isArray(aom) && aom.length < 1) throw new Error('ASN.1 object model is empty');
}

class Serializer {
  constructor() {
    return this.serialize.bind(this);
  }

  serialize(aom, params) {
    validateAOM(aom);
    return this.serializationImpl(aom, params);
  }
}
exports.Serializer = Serializer;