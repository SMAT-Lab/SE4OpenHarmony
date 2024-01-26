

// The river sweeps through
// Silt and twigs, gravel and leaves
// Driving the wheel on

'use strict';

import * as defs from './defs';
import { parse_int, write_int } from './compat/thirdparty/bitsyntax';
import { buffer } from '@ohos/node-polyfill';

var constants = defs.constants;
var decode = defs.decode;

var Buffer = buffer.Buffer;

export const PROTOCOL_HEADER = "AMQP" + String.fromCharCode(0, 0, 9, 1);

/*
  Frame format:

  0      1         3             7                size+7 size+8
  +------+---------+-------------+ +------------+ +-----------+
  | type | channel | size        | | payload    | | frame-end |
  +------+---------+-------------+ +------------+ +-----------+
  octet   short     long            size octets    octet

  In general I want to know those first three things straight away, so I
  can discard frames early.

*/

// framing constants
var FRAME_METHOD = constants.FRAME_METHOD,
FRAME_HEARTBEAT = constants.FRAME_HEARTBEAT,
FRAME_HEADER = constants.FRAME_HEADER,
FRAME_BODY = constants.FRAME_BODY,
FRAME_END = constants.FRAME_END;

var bodyCons = function (bindings) {
  'use strict';
  var buffersize = 8;
  buffersize += (bindings['size'] * 8) / 8;
  var buf = Buffer.alloc(buffersize);
  var offset = 0;
  var val, size;
  // {"value":3,"type":"integer","bigendian":true,"unit":1,"size":8}
  val = 3
  size = 1;
  write_int(buf, val, offset, size, true);
  offset += size;
  // {"name":"channel","type":"integer","bigendian":true,"unit":1,"size":16}
  val = bindings['channel'];
  size = 2;
  write_int(buf, val, offset, size, true);
  offset += size;
  // {"name":"size","type":"integer","bigendian":true,"unit":1,"size":32}
  val = bindings['size'];
  size = 4;
  write_int(buf, val, offset, size, true);
  offset += size;
  // {"name":"payload","type":"binary","unit":8,"size":"size"}
  val = bindings['payload'];
  size = (bindings['size'] * 8) / 8;
  val.copy(buf, offset, 0, size);
  offset += size;
  // {"value":206,"type":"integer","bigendian":true,"unit":1,"size":8}
  val = 206
  size = 1;
  write_int(buf, val, offset, size, true);
  offset += size;
  return buf;
}

// %%% TESTME possibly better to cons the first bit and write the
// second directly, in the absence of IO lists
export const makeBodyFrame = function(channel, payload) {
  return bodyCons({channel: channel, size: payload.length, payload: payload});
};

var frameHeaderPattern = function (binary, env) {
  'use strict';
  var bin = binary, env = env || {};
  var offset = 0, binsize = bin.length * 8;
  var bits, result, byteoffset;
  var var_type = env['type'];
  var var_channel = env['channel'];
  var var_size = env['size'];
  var var_rest = env['rest'];
  // {"name":"type","type":"integer","bigendian":true,"unit":1,"size":8}
  bits = 8;

  byteoffset = offset / 8; offset += bits
  if (offset > binsize) { return false; }
  else { result = parse_int(bin, byteoffset, bits / 8, true, undefined); }
  if (result === false) return false;
  else if (var_type !== undefined) {
    if (var_type != result) return false;
  }
  else var_type = result;
  // {"name":"channel","type":"integer","bigendian":true,"unit":1,"size":16}
  bits = 16;

  byteoffset = offset / 8; offset += bits
  if (offset > binsize) { return false; }
  else { result = parse_int(bin, byteoffset, bits / 8, true, undefined); }
  if (result === false) return false;
  else if (var_channel !== undefined) {
    if (var_channel != result) return false;
  }
  else var_channel = result;
  // {"name":"size","type":"integer","bigendian":true,"unit":1,"size":32}
  bits = 32;

  byteoffset = offset / 8; offset += bits
  if (offset > binsize) { return false; }
  else { result = parse_int(bin, byteoffset, bits / 8, true, undefined); }
  if (result === false) return false;
  else if (var_size !== undefined) {
    if (var_size != result) return false;
  }
  else var_size = result;
  // {"name":"rest","type":"binary","unit":8,"size":true}
  byteoffset = offset / 8;
  offset = binsize;
  result = bin.slice(byteoffset);
  if (result === false) return false;
  else if (var_rest !== undefined) {
    if (var_rest != result) return false;
  }
  else var_rest = result;
  if (offset == binsize) {
    return {
      type: var_type,
      channel: var_channel,
      size: var_size,
      rest: var_rest,
    };
  }
  else return false;
}

export function parseFrame(bin, max) {
  var fh = frameHeaderPattern(bin);
  if (fh) {
    var size = fh.size, rest = fh.rest;
    if (size > max) {
      throw new Error('Frame size exceeds frame max');
    }
    else if (rest.length > size) {
      if (rest[size] !== FRAME_END)
        throw new Error('Invalid frame');

      return {
        type: fh.type,
        channel: fh.channel,
        size: size,
        payload: rest.slice(0, size),
        rest: rest.slice(size + 1)
      };
    }
  }
  return false;
}


var headerPattern = function (binary, env) {
  'use strict';
  var bin = binary, env = env || {};
  var offset = 0, binsize = bin.length * 8;
  var bits, result, byteoffset;
  var var_class = env['class'];
  var var__weight = env['_weight'];
  var var_size = env['size'];
  var var_flagsAndfields = env['flagsAndfields'];
  // {"name":"class","type":"integer","bigendian":true,"unit":1,"size":16}
  bits = 16;

  byteoffset = offset / 8; offset += bits
  if (offset > binsize) { return false; }
  else { result = parse_int(bin, byteoffset, bits / 8, true, undefined); }
  if (result === false) return false;
  else if (var_class !== undefined) {
    if (var_class != result) return false;
  }
  else var_class = result;
  // {"name":"_weight","type":"integer","bigendian":true,"unit":1,"size":16}
  bits = 16;

  byteoffset = offset / 8; offset += bits
  if (offset > binsize) { return false; }
  else { result = parse_int(bin, byteoffset, bits / 8, true, undefined); }
  if (result === false) return false;
  else if (var__weight !== undefined) {
    if (var__weight != result) return false;
  }
  else var__weight = result;
  // {"name":"size","type":"integer","bigendian":true,"unit":1,"size":64}
  bits = 64;

  byteoffset = offset / 8; offset += bits
  if (offset > binsize) { return false; }
  else { result = parse_int(bin, byteoffset, bits / 8, true, undefined); }
  if (result === false) return false;
  else if (var_size !== undefined) {
    if (var_size != result) return false;
  }
  else var_size = result;
  // {"name":"flagsAndfields","type":"binary","unit":8,"size":true}
  byteoffset = offset / 8;
  offset = binsize;
  result = bin.slice(byteoffset);
  if (result === false) return false;
  else if (var_flagsAndfields !== undefined) {
    if (var_flagsAndfields != result) return false;
  }
  else var_flagsAndfields = result;
  if (offset == binsize) {
    return {
      class: var_class,
      _weight: var__weight,
      size: var_size,
      flagsAndfields: var_flagsAndfields,
    };
  }
  else return false;
}

var methodPattern = function (binary, env) {
  'use strict';
  var bin = binary, env = env || {};
  var offset = 0, binsize = bin.length * 8;
  var bits, result, byteoffset;
  var var_id = env['id'];
  var var_args = env['args'];
  // {"name":"id","type":"integer","bigendian":true,"unit":1,"size":32}
  bits = 32;

  byteoffset = offset / 8; offset += bits
  if (offset > binsize) { return false; }
  else { result = parse_int(bin, byteoffset, bits / 8, true, undefined); }
  if (result === false) return false;
  else if (var_id !== undefined) {
    if (var_id != result) return false;
  }
  else var_id = result;
  // {"name":"args","type":"binary","unit":8,"size":true}
  byteoffset = offset / 8;
  offset = binsize;
  result = bin.slice(byteoffset);
  if (result === false) return false;
  else if (var_args !== undefined) {
    if (var_args != result) return false;
  }
  else var_args = result;
  if (offset == binsize) {
    return {
      id: var_id,
      args: var_args,
    };
  }
  else return false;
}

export var HEARTBEAT = {channel: 0};

export const decodeFrame = function(frame) {
  var payload = frame.payload;
  switch (frame.type) {
  case FRAME_METHOD:
    var idAndArgs = methodPattern(payload);
    var id = idAndArgs.id;
    var fields = decode(id, idAndArgs.args);
    return {id: id, channel: frame.channel, fields: fields};
  case FRAME_HEADER:
    var parts = headerPattern(payload);
    var id = parts['class'];
    var fields = decode(id, parts.flagsAndfields);
    return {id: id, channel: frame.channel,
            size: parts.size, fields: fields};
  case FRAME_BODY:
    return {channel: frame.channel, content: frame.payload};
  case FRAME_HEARTBEAT:
    return HEARTBEAT;
  default:
    throw new Error('Unknown frame type ' + frame.type);
  }
}

// encoded heartbeat
export const HEARTBEAT_BUF = Buffer.from([constants.FRAME_HEARTBEAT,
                                           0, 0, 0, 0, // size = 0
                                           0, 0, // channel = 0
                                           constants.FRAME_END]);


