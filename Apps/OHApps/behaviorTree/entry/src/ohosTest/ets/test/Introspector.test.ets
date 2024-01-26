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

import { RUNNING, SUCCESS, FAILURE,Sequence,Selector,Task,Random,Decorator,Introspector,BehaviorTree,
  Blackboard,
  RunResult
} from 'behaviortree'
import InvertDecorator from 'behaviortree/lib/decorators/InvertDecorator'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { diff, Utils,BlackboardChangesIntrospector } from '../utils/Utils'
const BASE_COUNT: number = 2000;

class result {
  name: string = ''
  result:Boolean  = true
}

export default function IntrospectorTest() {

  let bTree:BehaviorTree
  let introspector:Introspector

  BehaviorTree.register(
    'simpleTask',
    new Task({
      name: 'The Task',
      start:  (blackboard:Blackboard)=> {
        ++blackboard.start
      },
      run:  (blackboard:Blackboard):RunResult=> {
        ++blackboard.run
        return blackboard.result
      },
      end: (blackboard:Blackboard)=> {
        ++blackboard.end
      }
    })
  )
  BehaviorTree.register(
    'failingTask',
    new Task({
      name: 'Bumm',
      run: (blackboard:Blackboard):boolean => {
        return FAILURE
      }
    })
  )
  BehaviorTree.register(
    'runningTask',
    new Task({
      name: 'Forest',
      run: (blackboard:Blackboard):RunResult=> {
        return RUNNING
      }
    })
  )

  let blackboard = Utils.IntBlackboard

  introspector = new Introspector()
  // 通过
  describe('IntrospectorTestOne', ()=> {
    beforeEach(() => {
      blackboard = Utils.IntBlackboard

      introspector = new Introspector()
    })
    it('is_empty_initially',0, () => {
      expect(introspector.lastResult).assertEqual(null)

      expect(introspector.results.length).assertEqual(0)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        introspector.lastResult
      }
      endTime(startTime, 'is_empty_initially');
    })
  })

  // 通过
  describe('with_the_simplest_tree_possible', ()=> {
    beforeEach(() => {

      bTree = new BehaviorTree({ tree: 'simpleTask', blackboard })
    })

    it('puts_in_the_result_of_the_last_run',0, () => {
      console.log(`dudu-------开始测试`)

      bTree.step({ introspector })

      const resultFirstRun  = Utils.resultRun(SUCCESS)

      expect(JSON.stringify(introspector.lastResult)).assertEqual(JSON.stringify(resultFirstRun))
      console.log(`dudu-------开始测试1`)

      expect(JSON.stringify(introspector.results)).assertEqual(JSON.stringify([resultFirstRun]))
      console.log(`dudu-------开始测试2`)

      blackboard.result = FAILURE

      bTree.step({ introspector })

      const resultSecondRun = Utils.resultRun(FAILURE)

      expect(JSON.stringify(introspector.lastResult)).assertEqual(JSON.stringify(resultSecondRun))
      console.log(`dudu-------开始测试3`)
      expect(JSON.stringify(introspector.results)).assertEqual(JSON.stringify([resultFirstRun, resultSecondRun]))
      console.log(`dudu-------开始测试4`)

      Utils.setIntBlackboard(RUNNING)

      bTree.step({ introspector })

      const resultThirdRun = Utils.resultRun(RUNNING)

      expect(JSON.stringify(introspector.lastResult)).assertEqual(JSON.stringify(resultThirdRun)   )

      expect(JSON.stringify(introspector.results)).assertEqual(JSON.stringify([resultFirstRun, resultSecondRun, resultThirdRun]))
      Utils.setIntBlackboard(SUCCESS)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.resultRun(RUNNING)
      }
      endTime(startTime, 'puts_in_the_result_of_the_last_run');
    })
  })

  // 通过
  describe('with_nameless_tasks', ()=> {
    beforeEach(() => {
      blackboard = Utils.IntBlackboard

      bTree = new BehaviorTree({ tree: new Task({ run: () => RUNNING }), blackboard })
      introspector = new Introspector()
    })

    it('does_not_print_a_name', 0,() => {
      bTree.step({ introspector })

      const resultFirstRun = Utils.ResultFirstRun

      expect(diff(introspector.lastResult,resultFirstRun)).assertEqual(true)
      expect(diff(introspector.results,[resultFirstRun])).assertEqual(true)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.ResultFirstRun
      }
      endTime(startTime, 'does_not_print_a_name');
    })
  })

  // 通过
  describe('with_nameless_branching_nodes', ()=> {
    beforeEach(() => {
      blackboard = Utils.IntBlackboard

      bTree = new BehaviorTree({ tree: new Sequence({ nodes: ['simpleTask'] }), blackboard })
      introspector = new Introspector()
    })

    it('does_not_print_a_name', 0, () => {
      bTree.step({ introspector })

      const resultFirstRun = Utils.resultChildren

      expect(diff(introspector.lastResult,resultFirstRun)).assertEqual(true)
      expect(diff(introspector.results,[resultFirstRun])).assertEqual(true)

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.resultChildren
      }
      endTime(startTime, 'with_nameless_branching_nodes');
    })
  })

  // 通过
  describe('with_a_decorator', ()=> {
    beforeEach(() => {
      blackboard = Utils.IntBlackboard

      const tree:InvertDecorator = Utils.InvertDecorator({ name: 'inverter', node: 'simpleTask' })
      bTree = new BehaviorTree({ tree, blackboard })
      introspector = new Introspector()
    })

    it('shows_Task_and_Decorator', 0, () => {
      bTree.step({ introspector })

      const result = Utils.result2('inverter',FAILURE,'The Task',SUCCESS)

      expect(diff(introspector.lastResult,result)).assertEqual(true)
      expect(diff(introspector.results,[result])).assertEqual(true)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.result2('inverter',FAILURE,'The Task',SUCCESS)
      }
      endTime(startTime, 'shows_Task_and_Decorator');
    })
  })

  // 通过
  describe('with_a_selector', ()=> {
    beforeEach(() => {
      blackboard = Utils.IntBlackboard
      introspector = new Introspector()
    })

    it('does_not_show_task_that_did_not_run',0, () => {
      const tree = new Selector({ name: 'select', nodes: ['simpleTask', 'failingTask'] })
      bTree = new BehaviorTree({ tree, blackboard })

      bTree.step({ introspector })

      const result =Utils.result2('select',SUCCESS,'The Task',SUCCESS)

      expect(diff(introspector.lastResult,result)).assertEqual(true)

      expect(diff(introspector.results,[result])).assertEqual(true)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.result2('select',SUCCESS,'The Task',SUCCESS)
      }
      endTime(startTime, 'does_not_show_task_that_did_not_run');
    })

    it('show_all_tasks_if_all_did_run', 0,() => {
      const tree = new Selector({ name: 'select', nodes: ['failingTask', 'simpleTask'] })
      bTree = new BehaviorTree({ tree, blackboard })

      bTree.step({ introspector })

      const result = Utils.result('select',SUCCESS,'Bumm',FAILURE,{
            name: 'The Task',
            result: SUCCESS
          })

      // console.log(`dudu1 -------- ${JSON.stringify(introspector.lastResult) === JSON.stringify(result)}  ${JSON.stringify(result)}`)
      console.log(`dudu1 -------- ${JSON.stringify(introspector.results,null,"\t")}  ${JSON.stringify([result],null,"\t")}`)


      console.log(`dudu1 ------ ${diff(introspector.results,[result])}`)

      expect(diff(introspector.lastResult,result)).assertEqual(true)

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.result('select',SUCCESS,'Bumm',FAILURE,{
          name: 'The Task',
          result: SUCCESS
        })
      }
      endTime(startTime, 'show_all_tasks_if_all_did_run');
    })

    it('does_not_show_more_then_was_running', 0,() => {
      const tree = new Selector({ name: 'select', nodes: ['runningTask', 'simpleTask'] })
      bTree = new BehaviorTree({ tree, blackboard })
      bTree.step({ introspector })
      const result =Utils.result2('select',RUNNING,'Forest',RUNNING)
      expect(diff(introspector.lastResult,result)).assertEqual(true)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.result2('select',RUNNING,'Forest',RUNNING)
      }
      endTime(startTime, 'does_not_show_more_then_was_running');
    })
  })

  // 通过
  describe('a_full_scale_tree', ()=> {
    beforeEach(() => {
      blackboard = Utils.IntBlackboard
      introspector = new Introspector()
    })

    it('shows_all_that_did_run', 0, () => {
      const invertedSimple:InvertDecorator = Utils.InvertDecorator({ node: 'simpleTask' })
      const selector1:Selector = new Selector({ name: 'select1', nodes: ['failingTask', 'simpleTask'] })
      const selector2:Selector = new Selector({ name: 'select2', nodes: [invertedSimple, 'simpleTask', 'failingTask'] })

      const tree = new Sequence({ name: 'sequence', nodes: [selector1, selector2] })
      bTree = new BehaviorTree({ tree, blackboard })

      bTree.step({ introspector })

      const result = Utils.WithResult

      expect(diff(introspector.lastResult,result)).assertEqual(true)
      expect(diff(introspector.results,[result])).assertEqual(true)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        Utils.WithResult
      }
      endTime(startTime, 'shows_all_that_did_run');
    })
  })

  // 通过
  describe('with_a_Random_node', ()=> {
    beforeEach(() => {
      blackboard = Utils.IntBlackboard
      bTree = new BehaviorTree({ tree: new Random({ nodes: ['simpleTask', 'failingTask'] }), blackboard })
      introspector = new Introspector()
    })

    it('cleans_the_results', 0,() => {
      for (let i = 10; i--; ) {
        bTree.step({ introspector })
      }
      expect(introspector.results.length).assertEqual(10)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        bTree.step({ introspector })
      }
      endTime(startTime, 'cleans_the_results');
    })
  })

  // 通过
  describe('reset_method', ()=> {
    it('cleans_the_results', 0,() => {
      bTree = new BehaviorTree({ tree: 'simpleTask', blackboard: {} })
      bTree.step({ introspector })

      introspector.reset()

      expect(diff(introspector.lastResult,null)).assertEqual(true)
      expect(diff(introspector.results,[])).assertEqual(true)
      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        introspector.reset()
      }
      endTime(startTime, 'reset_method');
    })
  })

  // 通过
  describe('having_a_custom_introspector_module', ()=> {
    beforeEach(() => {
      introspector = new BlackboardChangesIntrospector()
    })
     let also= 'also has the blackboard available'
    it('also_has_the_blackboard_available', 0,() => {
      bTree = new BehaviorTree({ tree: new Sequence({ nodes: ['simpleTask', 'failingTask'] }), blackboard })
      bTree.step({ introspector })
      // expect(diff(Utils.getInt(introspector),[true, false])).assertEqual(true)

      let startTime = new Date().getTime()
      for (let index = 0; index < BASE_COUNT; index++) {
        bTree.step({ introspector })
      }
      endTime(startTime, 'also_has_the_blackboard_available');
    })
  })
}
function endTime(startTime: number, tag: string) {
  console.log(tag + ":startTime:" + startTime)
  let endTime: number = new Date().getTime();
  let averageTime = ((endTime - startTime) * 1000 / BASE_COUNT)
  console.log(tag + ":endTime:" + endTime)
  console.log(tag + ":averageTime:" + averageTime + "μs");
}