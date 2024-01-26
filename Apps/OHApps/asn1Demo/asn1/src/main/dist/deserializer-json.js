'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONDeserializer = undefined;


var _deserializer = require('./deserializer');
var _types = require('./types');
var _encodings = require('./encodings');


function validateJSON(json, root = true) {
  if (json === null) throw new Error('ASN.1 abstract JSON must not be null');
  if (json === undefined) throw new Error('ASN.1 abstract JSON must not be undefined');
  if (typeof json !== 'object') throw new Error('ASN.1 abstract JSON must be an object');
  if (!Array.isArray(json) && Object.keys(json).length < 1) {
    throw new Error('ASN.1 abstract JSON must not be empty object');
  }
  if (root && Array.isArray(json) && json.length < 1) {
    throw new Error('ASN.1 abstract JSON root must not be empty array');
  }
  // TODO schema validation
}

class JSONDeserializer extends _deserializer.Deserializer {
  deserializationImpl(json, root = true) {
    validateJSON(json, root);
    if (Array.isArray(json)) return json.map(item => this.deserializationImpl(item, false));
    const {
      tagClass: tagClassValue,
      encoding: encodingValue,
      type: typeValue,
      content: contentValue
    } = json;
    const tagClass = (0, _types.findTagClass)(tagClassValue);
    const encoding = (0, _encodings.findEncoding)(encodingValue);
    const content = encoding.type === _encodings.Primitive.type ? contentValue : this.deserializationImpl(contentValue, false);
    if (typeof typeValue === 'string') {
      const Type = (0, _types.findType)(typeValue);
      return new Type(content);
    }
    return new tagClass(typeValue, content, encoding); // eslint-disable-line new-cap
  }
}
exports.JSONDeserializer = JSONDeserializer;
