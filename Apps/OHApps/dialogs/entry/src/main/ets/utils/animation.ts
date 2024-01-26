/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import curves from '@ohos.curves';


let obj = {
  'translateFromCenter': {x:0,y:0},
  'translateFromTop': {x:0,y:-350},
  'translateFromBottom': {x:0,y:350},
  'translateFromLeft': {x:-200,y:0},
  'translateFromRight': {x:200,y:0},
  'translateFromLeftTop': {x:-200,y:-350},
  'translateFromLeftBottom': {x:-200,y:350},
  'translateRightTop': {x:200,y:-350},
  'translateFromRightBottom': {x:200,y:350},
}
export  function animation(val) {

  let effect: TransitionEffect =
  TransitionEffect.OPACITY
    .animation({ duration: 2000, curve: Curve.Ease })
    // .combine(TransitionEffect.translate(obj[val]))
    .combine(TransitionEffect.translate(obj[val]).animation({ curve: curves.springMotion() }))
    // .combine(  TransitionEffect.asymmetric(TransitionEffect.move(obj[val]), TransitionEffect.move(TransitionEdge.START)))
    // .combine(TransitionEffect.move(TransitionEdge.START))
  return effect
}


