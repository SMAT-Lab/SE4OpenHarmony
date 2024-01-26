'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constructed = exports.Primitive = undefined;
exports.findEncoding = findEncoding;

// var _ = require('.');
// var errors = require('./errors');

const Encoding = (type, value) => class {
  static get type() {
    return type;
  }
  static get value() {
    return value;
  }
};

class Primitive extends Encoding('primitive', 0x00) {}
exports.Primitive = Primitive;
class Constructed extends Encoding('constructed', 0x20) {}

exports.Constructed = Constructed;
const Encodings = [Primitive, Constructed];

function findEncoding(value) {
  const valueType = typeof value;
  switch (valueType) {
    case 'string':
      return Encodings.find(encoding => encoding.type === value);
    case 'number':
      return Encodings.find(encoding => encoding.value === value);
    default:
      throw new Error(`Must use string or number to lookup encoding, not "${valueType}"`);
  }
}
