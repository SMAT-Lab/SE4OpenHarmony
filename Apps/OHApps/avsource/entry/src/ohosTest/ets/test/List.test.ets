/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import videoDeCoderNdkTest from './VideoDeCoderNdk.test';
import videoEnCoderNdkTest from './VideoEnCoderNdk.test';
import multimediaCore from './MultimediaCore.test';
import mediaCodecBaseXdlNdkTest from './MediaCodecBaseXdlNdk.test';
import nativeNdkTest from './NativeNdk.test';
import nativeavdemuxerNdkTest from './NativeAvdemuxerNdk.test';
import nativeavmuxerNdkTest from './NativeAvmuxerNdk.test';
import audioDeCoderNdkTest from './AudioDeCoderNdk.test';
import audioEnCoderNdkTest from './AudioEnCoderNdk.test';
import mediaAvSourceNdkTest from './MediaAvSourceNdk.test';

export default function testsuite() {
  videoEnCoderNdkTest();
  videoDeCoderNdkTest();
  multimediaCore();
  mediaCodecBaseXdlNdkTest();
  nativeNdkTest();
  nativeavdemuxerNdkTest();
  nativeavmuxerNdkTest();
  audioEnCoderNdkTest();
  audioDeCoderNdkTest();
  mediaAvSourceNdkTest();
}
