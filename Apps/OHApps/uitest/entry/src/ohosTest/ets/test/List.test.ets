/*
* Copyright (c) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License")
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

import basicExampleTest from './basicExampleTest/basicExample.test'
import findCommonTest from './findCommentExampleTest/Component/findCommentExample.test'
import findWindowTest from './findCommentExampleTest/window/findWindowExample.test'
import click from './operationExampleTest/ui/clickEvent.test'
import input from './operationExampleTest/ui/InputEvent.test'
import screenCap from './operationExampleTest/ui/ScreenCapEvent.test'
import mouse from './operationExampleTest/ui/MouseEvent.test'
import fling from './operationExampleTest/ui/FlingEvent.test'
import swipe from './operationExampleTest/ui/SwipeEvent.test'
import pinch from './operationExampleTest/ui/PinchEvent.test'
import pointMatrix from './operationExampleTest/ui/PontMatrixEvent.test'
import scroller from './operationExampleTest/ui/ScrollerEvent.test'
import moveWindow from './operationExampleTest/window/MoveToEvent.test'
import reSizeWindow from './operationExampleTest/window/ReSizeWindow.test'
import windowAttr from './operationExampleTest/window/WindowAttr.test'

export default function testsuite() {
  basicExampleTest();
  findCommonTest();
  findWindowTest();
  click();
  input();
  screenCap();
  mouse();
  fling();
  swipe();
  pinch();
  pointMatrix();
  scroller();
  moveWindow();
  reSizeWindow();
  windowAttr()
}