'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JSONSerializer = undefined;

var Buffer = require('buffer/').Buffer
var _serializer = require('./serializer');
var _encodings = require('./encodings');
var _types = require('./types');

function jsonify(content) {
  const contentType = typeof content;
  switch (contentType) {
    case 'string':case 'number':case 'boolean':
      return content;
    case 'object':
      {
        if (Array.isArray(content)) return content.map(item => jsonify(item));
        if (Buffer.isBuffer(content)) return content.toString('base64');
        if (typeof content.toString === 'function' && !(content instanceof _types.Type)) {
          return content.toString();
        }
        throw new Error(`No mechanism to serialize content object: "${content}"`);
      }
    default:
      throw new Error(`Illegal ASN.1 object model content type "${contentType}"`);
  }
}

class JSONSerializer extends _serializer.Serializer {
  serializationImpl(aom) {
    if (Array.isArray(aom)) return aom.map(item => this.serializationImpl(item));

    const {
      tagClass,
      type,
      encoding,
      content
    } = aom;
    const { type: tagClassName } = tagClass;
    const { type: encodingName } = encoding;

    const serialized = {
      tagClass: tagClassName,
      type,
      encoding: encodingName
    };

    if (content != null) {
      serialized.content = encoding.type === _encodings.Constructed.type ? this.serializationImpl(content) : jsonify(content);
    }

    return serialized;
  }
}
exports.JSONSerializer = JSONSerializer;
