

// Stringifying various things

'use strict';

import * as defs from './defs';
import { format, inherits } from './compat/node/util';
import { HEARTBEAT } from './frame';

let closeMessage = function(close) {
  var code = close.fields.replyCode;
  return format('%d (%s) with message "%s"',
                code, defs.constant_strs[code],
                close.fields.replyText);
}

let methodName = function(id) {
  return defs.info(id).name;
};

let inspect = function(frame, showFields) {
  if (frame === HEARTBEAT) {
    return '<Heartbeat>';
  }
  else if (!frame.id) {
    return format('<Content channel:%d size:%d>',
                  frame.channel, frame.size);
  }
  else {
    var info = defs.info(frame.id);
    return format('<%s channel:%d%s>', info.name, frame.channel,
                  (showFields)
                  ? ' ' + JSON.stringify(frame.fields, undefined, 2)
                  : '');
  }
}

export { closeMessage, methodName, inspect }