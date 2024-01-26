/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// msg-int64.js

import {Uint64BE,Int64BE} from "../msg/int64-buffer";

export {MsgUInt64,MsgInt64}


inherits(MsgUInt64, Uint64BE, 0xcf);
inherits(MsgInt64, Int64BE, 0xd3);

MsgUInt64.isUint64BE = Uint64BE.isUint64BE;
MsgInt64.isInt64BE = Int64BE.isInt64BE;

function MsgUInt64() {
  var that = (this instanceof MsgUInt64) ? this : new MsgUInt64();
  Uint64BE.apply(that, arguments);
  return that;
}

function MsgInt64() {
  var that = (this instanceof MsgInt64) ? this : new MsgInt64();
  Int64BE.apply(that, arguments);
  return that;
}

function inherits(child, _super, token) {
  var P = child.prototype = Object.create(_super.prototype);

  P.msgpackLength = 9;

  P.writeMsgpackTo = function(buffer, offset) {
    offset |= 0;
    buffer[offset] = token;
    this.toBuffer().copy(buffer, offset + 1);
    return 9;
  };
}
