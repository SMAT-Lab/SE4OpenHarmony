/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import abilityTest from './Ability.test'
import atRuleTest from './at-rule.test'
import commentTest from './comment.test'
import containerTest from './container.test'
import cssTest from './css-syntax-error.test'
import declarationTest from './declaration.test'
import fromJsonTest from './fromJSON.test'
import lazyResultTest from './lazy-result.test'
import list2Test from './list2.test'
import nodeTest from './node.test'
import parseTest from './parse.test'
import postCssTest from './postcss.test'
import previousMapTest from './previous-map.test'
import processorTest from './processor.test'
import resultTest from './result.test'
import rootTest from './root.test'
import ruleTest from './rule.test'
import stringifierTest from './stringifier.test'
import tokenizeTest from './tokenize.test'
import warningTest from './warning.test'

export default function testsuite() {
  abilityTest()
  atRuleTest()
  commentTest()
  containerTest()
  cssTest()
  declarationTest()
  fromJsonTest()
  lazyResultTest()
  list2Test()
  nodeTest()
  parseTest()
  postCssTest()
  previousMapTest()
  processorTest()
  resultTest()
  rootTest()
  ruleTest()
  stringifierTest()
  tokenizeTest()
  warningTest()
}