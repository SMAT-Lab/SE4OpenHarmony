'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Private = exports.ContextSpecific = exports.Application = exports.Universal = exports.Type = undefined;
exports.findTagClass = findTagClass;
exports.findType = findType;

 var _encodings = require('./encodings');

var BigInteger = require('./BigInteger');


class Type {}

exports.Type = Type; /* eslint-disable max-len */

const TypeClassFactory = (tagClass, type, validEncodings, defaultValue, defaultContent, contentProcessor) => class extends Type {
  constructor(content, { encoding = validEncodings[0], value = null } = {}) {
    super();
    this.encoding = encoding;
    if (value != null) this._value = value;
    if (content != null || defaultContent != null) this.content = content != null ? content : defaultContent;
    if (contentProcessor && this.content != null) this.content = contentProcessor(this.content);
  }
  get tagClass() {
    return tagClass;
  }
  get type() {
    return type || this._value;
  }
  get value() {
    return this._value || defaultValue;
  }
};

const TagClassFactory = (type, defaultValue) => class {
    //
  constructor(value, content, encoding, { validEncodings = [_encodings.Constructed] } = {}) {
    const NewType = class extends TypeClassFactory(this.constructor, null, validEncodings) {};
    return new NewType(content, { encoding, value });
  }
  static get type() {
    return type;
  }
  static get value() {
    return defaultValue;
  }
};

class Universal extends TagClassFactory('universal', 0x00) {}
class Application extends TagClassFactory('application', 0x40) {}
class ContextSpecific extends TagClassFactory('contextSpecific', 0x80) {}
class Private extends TagClassFactory('private', 0xC0) {}

function importInteger(content) {
  const contentType = typeof content;
  if (contentType === 'number') return content;
  if (contentType === 'string') {
    // big integer import
    const radix = content.startsWith('0x') ? 16 : 10;
    const intStr = radix === 16 ? content.slice(2) : content;

      return BigInteger.fromString(intStr, radix);
      // return '';

  }
  if (contentType === 'object') {
    if (content.constructor.name === 'BigInteger') return content;
    throw new Error('integer objects must be instance of BigInteger');
  }
  throw new Error(`cannot import an integer from "${contentType}"`);
}


Universal.EOC = class EOC extends TypeClassFactory(Universal, 'endOfContent', [_encodings.Primitive], 0) {};
Universal.Bool = class Bool extends TypeClassFactory(Universal, 'boolean', [_encodings.Primitive], 1) {};
Universal.Integer = class Integer extends TypeClassFactory(Universal, 'integer', [_encodings.Primitive], 2, null, importInteger) {};
Universal.BitString = class BitString extends TypeClassFactory(Universal, 'bitString', [_encodings.Primitive, _encodings.Constructed], 3) {};
Universal.OctetString = class OctetString extends TypeClassFactory(Universal, 'octetString', [_encodings.Primitive, _encodings.Constructed], 4) {};
Universal.Null = class Null extends TypeClassFactory(Universal, 'null', [_encodings.Primitive], 5) {};
Universal.OID = class OID extends TypeClassFactory(Universal, 'oid', [_encodings.Primitive], 6) {};
Universal.ODesc = class ODesc extends TypeClassFactory(Universal, 'odesc', [_encodings.Primitive, _encodings.Constructed], 7) {};
Universal.External = class External extends TypeClassFactory(Universal, 'external', [_encodings.Constructed], 8) {};
Universal.Real = class Real extends TypeClassFactory(Universal, 'float', [_encodings.Primitive], 9) {};
Universal.Enumerated = class Enumerated extends TypeClassFactory(Universal, 'enumerated', [_encodings.Primitive], 10) {};
Universal.EnumeratedPDV = class EnumeratedPDV extends TypeClassFactory(Universal, 'embeddedPDV', [_encodings.Constructed], 11) {};
Universal.UTF8String = class UTF8String extends TypeClassFactory(Universal, 'utf8String', [_encodings.Primitive, _encodings.Constructed], 12) {};
Universal.ROID = class ROID extends TypeClassFactory(Universal, 'roid', [_encodings.Primitive], 13) {};
Universal.Sequence = class Sequence extends TypeClassFactory(Universal, 'sequence', [_encodings.Constructed], 16, []) {};
Universal.Set = class Set extends TypeClassFactory(Universal, 'set', [_encodings.Constructed], 17, []) {};
Universal.NumericString = class NumericString extends TypeClassFactory(Universal, 'numericString', [_encodings.Primitive, _encodings.Constructed], 18) {};
Universal.PrintableString = class PrintableString extends TypeClassFactory(Universal, 'printableString', [_encodings.Primitive, _encodings.Constructed], 19) {};
Universal.T61String = class T61String extends TypeClassFactory(Universal, 't61String', [_encodings.Primitive, _encodings.Constructed], 20) {};
Universal.VideoetxString = class VideoetxString extends TypeClassFactory(Universal, 'videotexString', [_encodings.Primitive, _encodings.Constructed], 21) {};
Universal.IA5String = class IA5String extends TypeClassFactory(Universal, 'ia5String', [_encodings.Primitive, _encodings.Constructed], 22) {};
Universal.UTCTime = class UTCTime extends TypeClassFactory(Universal, 'utcTime', [_encodings.Primitive, _encodings.Constructed], 23) {};
Universal.GeneralizedTime = class GeneralizedTime extends TypeClassFactory(Universal, 'generalizedTime', [_encodings.Primitive, _encodings.Constructed], 24) {};
Universal.GraphicString = class GraphicString extends TypeClassFactory(Universal, 'graphicString', [_encodings.Primitive, _encodings.Constructed], 25) {};
Universal.VisibleString = class VisibleString extends TypeClassFactory(Universal, 'visibleString', [_encodings.Primitive, _encodings.Constructed], 26) {};
Universal.GeneralString = class GeneralString extends TypeClassFactory(Universal, 'generalString', [_encodings.Primitive, _encodings.Constructed], 27) {};
Universal.UniversalString = class UniversalString extends TypeClassFactory(Universal, 'universalString', [_encodings.Primitive, _encodings.Constructed], 28) {};
Universal.CharString = class CharString extends TypeClassFactory(Universal, 'characterString', [_encodings.Primitive, _encodings.Constructed], 29) {};
Universal.BMPString = class BMPString extends TypeClassFactory(Universal, 'bmpString', [_encodings.Primitive, _encodings.Constructed], 30) {};

const Types = Object.keys(Universal).map(key => Universal[key].constructor ? Universal[key] : null).filter(Boolean);

exports.Universal = Universal;
exports.Application = Application;
exports.ContextSpecific = ContextSpecific;
exports.Private = Private;


const TagClasses = [Universal, Application, ContextSpecific, Private];

function findTagClass(value) {
  const valueType = typeof value;
  switch (valueType) {
    case 'string':
      return TagClasses.find(tagClass => tagClass.type === value);
    case 'number':
      return TagClasses.find(tagClass => tagClass.value === value);
    default:
      throw new Error(`Must use string or number to lookup tag class, not "${valueType}"`);
  }
}

function findType(value) {
  const valueType = typeof value;
  switch (valueType) {
    case 'string':
      return Types.find(AType => new AType().type === value);
    case 'number':
      return Types.find(AType => new AType().value === value);
    default:
      throw new Error(`Must use string or number to lookup type, not "${valueType}"`);
  }
}

