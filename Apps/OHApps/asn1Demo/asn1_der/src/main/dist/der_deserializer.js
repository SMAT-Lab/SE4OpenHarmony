'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PEMDeserializer = exports.DERDeserializer = undefined;


var _asn = require('./index');

var BigInteger = require('./BigInteger');
var Buffer = require('buffer/').Buffer
const FLAG_CONSTRUCTED = 0b00100000;
const FLAG_LONG = 0b10000000;

const MASK_TAG_CLASS = 0b11000000;
const MASK_TAG_ENCODING = 0b00100000;
const MASK_TAG_TYPE = 0b00011111;
const MASK_LENGTH = 0b01111111;

const PATTERN_PEM = /-----BEGIN ([a-zA-Z0-9 ]+)-----\r?\n(([a-zA-Z0-9/+]{1,64}\r?\n)*([a-zA-Z0-9/+]+=*){1,64})\r?\n-----END ([a-zA-Z0-9 ]+)-----/;

function validateDER(der) {
  if (der === null) throw new Error('DER must not be null');
  if (der === undefined) throw new Error('DER must not be undefined');
  if (typeof der !== 'object' || !Buffer.isBuffer(der)) throw new Error('DER must be a buffer');
  if (der.length < 1) throw new Error('DER buffer is empty');
}

function validatePEM(pem) {
  if (pem === null) throw new Error('PEM must not be null');
  if (pem === undefined) throw new Error('PEM must not be undefined');
  const pemType = typeof pem;
  if (pemType !== 'string') throw new Error(`Cannot deserialize PEM from "${pemType}", must be a string`);
  if (pem.length < 27) throw new Error('Improperly formatted PEM content, too short');
  if (!PATTERN_PEM.test(pem)) throw new Error('Improperly formatted PEM content');
}

function derFromPEM(pem) {
  const b64String = PATTERN_PEM.exec(pem)[2].replace(/\s+/g, '');
  return Buffer.from(b64String, 'base64');
}

/** Parse TLV triplet for long form content byte boundaries */
function longContentBytes(buffer, tlvFirstByte) {
  const lengthOctetsBytePosition = tlvFirstByte + 1;
  console.info("complycloud:asn1:der:deserialize:binary deserializing long form content length from byte "+lengthOctetsBytePosition)
  const lengthOctetsByte = buffer[lengthOctetsBytePosition];
  console.info("complycloud:asn1:der:deserialize:binary deserializing long form content length octet  "+lengthOctetsByte)
  const lengthOctets = lengthOctetsByte & MASK_LENGTH;
  console.info("complycloud:asn1:der:deserialize:binary isolated long form content length "+lengthOctets)
  if (lengthOctets > 6) {
    throw new Error('content length exceeds maximum supported of 2^32 bytes');
  }
  const lengthStartByte = lengthOctetsBytePosition + 1;
  const lengthEndByte = lengthStartByte + (lengthOctets - 1);
  console.info("complycloud:asn1:der:deserialize:binary processing %d bytes (bytes %d thru %d) to identify content length", lengthOctets, lengthStartByte, lengthEndByte)
  const length = buffer.readUIntBE(lengthStartByte, lengthOctets);
  console.info("complycloud:asn1:der:deserialize:binary deserialized content length of %d bytes", length)
  const startByte = lengthEndByte + 1;
  const endByte = startByte + (length - 1);
  return { startByte, endByte };
}

/** Parse TLV triplet for short form content byte boundaries */
function shortContentBytes(buffer, tlvFirstByte) {
  const lengthBytePosition = tlvFirstByte + 1;
  console.info('complycloud:asn1:der:deserialize:binary deserializing short form content length from byte %d', lengthBytePosition)
  const lengthByte = buffer[lengthBytePosition];
  console.info('complycloud:asn1:der:deserialize:binary  deserializing short form content length octet %b', lengthByte);
  const length = lengthByte & MASK_LENGTH;
  console.info('complycloud:asn1:der:deserialize:binary isolated short form content length %b', length);
  console.info('complycloud:asn1:der:deserialize:binary deserialized content length of %d bytes', length);
  let startByte = null;
  let endByte = null;
  if (length !== 0) {
    startByte = lengthBytePosition + 1;
    endByte = startByte + (length - 1);
  }
  return { startByte, endByte };
}

/** Parse TLV triplet for content byte boundaries */
function contentBytes(buffer, tlvFirstByte) {
  const lengthByte = tlvFirstByte + 1;
  const octet = buffer[lengthByte];
  if (octet == null) {
    throw new Error(`no length byte at pos ${lengthByte}, only ${buffer.length} bytes avaliable`);
  }
  if (octet & FLAG_LONG) {
    return longContentBytes(buffer, tlvFirstByte);
  }
  return shortContentBytes(buffer, tlvFirstByte);
}

/** Parse TLV triplet for the metadata and content buffer */
function tlv(buffer, firstByte) {
  const byte = firstByte;
  console.info('complycloud:asn1:der:deserialize:binary deserializing TLV triplet from byte %d', byte);
  const tagOctet = buffer[byte];
  if (!tagOctet) {
    throw new Error(`no type byte at pos ${byte}, only ${buffer.length} bytes avaliable`);
  }
  const tagClass = tagOctet & MASK_TAG_CLASS;
  console.info('complycloud:asn1:der:deserialize deserialized tag class %d', tagClass)
  const encoding = tagOctet & MASK_TAG_ENCODING;
  console.info('complycloud:asn1:der:deserializedeserialized tag encoding %d', encoding);
  const type = tagOctet & MASK_TAG_TYPE; // TODO: support long form tag types (non-universal)
  console.info('complycloud:asn1:der:deserializedeserialized tag type %d', type);
  const { startByte: contentStart, endByte: contentEnd } = contentBytes(buffer, byte);
  let content = null;
  let lastByte = byte + 1; // null content type indicator in DER encoding is always 2 bytes (0x05 0x00)
  if (contentStart != null && contentEnd != null) {
    // if content is not null, change the aforementioned defaults
    console.info('complycloud:asn1:der:deserialize:binary isolating content from bytes %d through %d', contentStart, contentEnd);
    if (contentEnd > buffer.length) {
      throw new Error(`too few bytes to read ${contentEnd - contentStart} bytes of ASN.1 content from ` + `byte ${contentStart}, only ${buffer.length} bytes avaliable`);
    }
    content = buffer.slice(contentStart, contentEnd + 1);
    lastByte = contentEnd;
  }
  return {
    tagClass,
    encoding,
    type,
    content,
    lastByte
  };
}

function decodeOID(buffer) {
  console.info('complycloud:asn1:der:deserialize:decode decoding OID from %d bytes', buffer.length);
  let b = buffer[0];
  let oid = `${Math.floor(b / 40)}.${b % 40}`; // stupid first byte = first 2 OID node encoding bullshit
  // other bytes are each value in base 128 with 8th bit set except for the last byte for each value
  let value = 0;
  let i = 1;
  while (i < buffer.length) {
    b = buffer[i];
    value <<= 7;
    if (b & FLAG_LONG) {
      // not the last byte for the value
      value += b & ~FLAG_LONG;
    } else {
      // last byte
      oid += `.${value + b}`;
      value = 0;
    }
    i += 1;
  }
  console.info('complycloud:asn1:der:deserialize:decode decoded OID %s', oid);
  return oid;
}

function decodeString(buffer) {
  console.info('complycloud:asn1:der:deserialize:decode decoding string from %d bytes', buffer.length);
  const str = buffer.toString('utf8');
  console.info('complycloud:asn1:der:deserialize:decode decoded string "%s"', str);
  return str;
}

function decodeInteger(buffer) {
  console.info('complycloud:asn1:der:deserialize:decode decoding integer from %d bytes', buffer.length);
  const int = buffer.length > 8 ? BigInteger.fromBuffer(1, buffer) : buffer.readUIntBE(0, buffer.length);
  // const int = buffer.readUIntBE(0, buffer.length);
  console.info('complycloud:asn1:der:deserialize:decode decoded integer %s', int);
  return int;
}

function decode(obj) {
  if (obj == null) {
    console.info('complycloud:asn1:der:deserialize:decode skipping decode of null/undefined content');
    return null;
  }
  if (Array.isArray(obj)) {
    console.info('complycloud:asn1:der:deserialize:decode decoding collection of %d content items', obj.length);
    return obj.map(item => decode(item));
  }
  const TagClass = (0, _asn.findTagClass)(obj.tagClass);
  const Encoding = (0, _asn.findEncoding)(obj.encoding);
  const Type = TagClass.name === _asn.Universal.name ? (0, _asn.findType)(obj.type) : null;
  console.info('complycloud:asn1:der:deserialize:decode decoding %s:%s:%s', TagClass ? TagClass.name : 'unknown', Encoding ? Encoding.name : 'unknown', Type ? Type.name : 'unknown');
  let content = Encoding.name === _asn.Constructed.name ? decode(obj.children) : obj.content;
  if (Type) {
    switch (Type.name) {
      case 'OID':
      case 'ROID':
        content = decodeOID(content);
        break;
      case 'PrintableString':
      case 'IA5String':
      case 'UTF8String':
        content = decodeString(content);
        break;
      case 'Integer':
        content = decodeInteger(content);
        break;
      default:
        console.info('complycloud:asn1:der:deserialize:decode no decoding supported for %s', Type.name);
    }
    return new Type(content, { encoding: Encoding });
  }
  return new TagClass(obj.type, content, Encoding);

}

function derDeserialize(buffer, level = 1) {
  if (buffer == null) return null;
  console.info('complycloud:asn1:der:deserialize: deserializing %d bytes of DER', buffer.length);
  let byte = 0;
  const values = [];
  do {
    const {
      tagClass,
      encoding,
      type,
      content,
      lastByte
    } = tlv(buffer, byte);
    const value = {
      tagClass,
      encoding,
      type,
      content
    };
    if (encoding & FLAG_CONSTRUCTED && type !== _asn.Universal.EOC.value) {
      delete value.content;
      value.children = derDeserialize(content, level + 1);
    }
    values.push(value);
    byte = lastByte + 1;
  } while (byte < buffer.length);
  console.info('complycloud:asn1:der:deserialize: done deserializing DER, found %d entries', values.length);
  return values.length === 1 && level === 1 ? values[0] : values;
}

class DERDeserializer extends _asn.Deserializer {
  // constructor() {
  //   super()
  //   return this.deserialize.bind(this);
  // }
  deserializationImpl(der) {
    // eslint-disable-line class-methods-use-this
    validateDER(der);
    const aom = decode(derDeserialize(der));
    return aom;
  }
}

exports.DERDeserializer = DERDeserializer;
class PEMDeserializer extends _asn.Deserializer {
  // constructor() {
  //   return this.deserialize.bind(this);
  // }
  deserializationImpl(pem) {
    // eslint-disable-line class-methods-use-this
    validatePEM(pem);
    const der = derFromPEM(pem);
    const aom = decode(derDeserialize(der));
    return aom;
  }
}


exports.PEMDeserializer = PEMDeserializer;
