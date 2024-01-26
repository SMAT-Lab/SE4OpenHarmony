
///<reference path="./types/index.d.ts" />

import { connect as raw_connect } from './lib/connect';
import { ChannelModel } from './lib/channel_model';
import { promisify } from './lib/compat/node/util';
import * as credentials from './lib/credentials';
import { IllegalOperationError } from './lib/error';

function connect(url, connOptions) {
  return promisify(function(cb) {
    return raw_connect(url, connOptions, cb);
  })()
  .then(function(conn) {
    return new ChannelModel(conn);
  });
};

export { connect, credentials, IllegalOperationError }