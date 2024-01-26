
///<reference path="./types/callback_api.d.ts" />

import { connect as raw_connect } from './lib/connect' ;
import { CallbackModel } from './lib/callback_model' ;
import { IllegalOperationError } from './lib/error' ;
import * as credentials from './lib/credentials' ;

function connect(url, options, cb) {
  if (typeof url === 'function')
    cb = url, url = false, options = false;
  else if (typeof options === 'function')
    cb = options, options = false;

  raw_connect(url, options, function(err, c) {
    if (err === null) cb(null, new CallbackModel(c));
    else cb(err);
  });
};

export  { connect, credentials, IllegalOperationError }
