let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
export { default as DanmakuView } from './src/main/ets/components/common/master/flame/danmaku/ui/widget/DanmakuView';
export { IDanmakus, ST_BY_YPOS_DESC } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/IDanmakus';
export { DanmakuContext } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/ohos/DanmakuContext';
export { Proxy } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/ohos/BaseCacheStuffer';
export { BaseDanmaku } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/BaseDanmaku';
export { BaseDanmakuParser } from './src/main/ets/components/common/master/flame/danmaku/danmaku/parser/BaseDanmakuParser';
export { DANMAKU_STYLE_STROKEN } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/IDisplayer';
export { SimpleTextCacheStuffer } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/ohos/SimpleTextCacheStuffer';
export { SpannedCacheStuffer } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/ohos/SpannedCacheStuffer';
export { Callback } from './src/main/ets/components/common/master/flame/danmaku/controller/DrawHandler';
export { DanmakuTimer } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/DanmakuTimer';
export { OnDanmakuClickListener } from './src/main/ets/components/common/master/flame/danmaku/controller/IDanmakuView';
export { IDanmakuView } from './src/main/ets/components/common/master/flame/danmaku/controller/IDanmakuView';
export { default as SystemClock } from './src/main/ets/components/common/master/flame/danmaku/danmaku/util/SystemClock';
export { AlphaValue } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/AlphaValue';
export { Duration } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/Duration';
export { IDisplayer } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/IDisplayer';
export { SpecialDanmaku } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/SpecialDanmaku';
export { Danmakus } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/ohos/Danmakus';
export { DanmakuFactory } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/ohos/DanmakuFactory';
export { DanmakuUtils } from './src/main/ets/components/common/master/flame/danmaku/danmaku/util/DanmakuUtils';
export { ST_BY_TIME } from './src/main/ets/components/common/master/flame/danmaku/danmaku/model/IDanmakus';
export { OhosFileSource } from './src/main/ets/components/common/master/flame/danmaku/danmaku/parser/ohos/OhosFileSource';
export { JSONSource } from './src/main/ets/components/common/master/flame/danmaku/danmaku/parser/ohos/JSONSource';
export { GlobalContext } from './src/main/ets/components/GlobalContext';
