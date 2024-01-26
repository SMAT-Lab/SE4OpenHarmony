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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import * as box2d from '@ohos/box2d'
import { b2Body, b2BodyType,
  b2CircleContact,
  b2ContactEdge,
  b2IJointDef,
  b2Joint,
  b2JointEdge,
  b2MotorJoint,
  b2MotorJointDef,
  b2Vec2, XY } from '@ohos/box2d'

export default function bodyTest3() {
  describe('body_test3', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })

    it('test_029_1', 0, () => {
      // GetLinearVelocityFromLocalPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let localPoint: XY = {x:10, y:20};
      let out = new box2d.b2Vec2();
      let p = ground.GetLinearVelocityFromLocalPoint(localPoint, out)
      expect(JSON.stringify(p)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_029_2', 0, () => {
      // GetLinearVelocityFromLocalPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let localPoint: XY = {x:-10, y:-20};
      let out = new box2d.b2Vec2();

      ground.m_linearVelocity.Copy(new b2Vec2(1,1));
      ground.m_angularVelocity = 2;
      ground.m_sweep.c.Copy(new b2Vec2(-2,-3));

      let p = ground.GetLinearVelocityFromLocalPoint(localPoint, out)
      expect(JSON.stringify(p)).assertEqual('{"data":{"0":35,"1":-15}}')
    })
    it('test_029_3', 0, () => {
      // GetLinearVelocityFromLocalPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let localPoint: XY = {x:10, y:20};
      let out = new box2d.b2Vec2();

      ground.m_linearVelocity.Copy(new b2Vec2(-1,-1));
      ground.m_angularVelocity = -2;
      ground.m_sweep.c.Copy(new b2Vec2(2,3));

      let p = ground.GetLinearVelocityFromLocalPoint(localPoint, out)
      expect(JSON.stringify(p)).assertEqual('{"data":{"0":33,"1":-17}}')
    })
    it('test_029_4', 0, () => {
      // GetLinearVelocityFromLocalPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let localPoint: XY = {x:1, y:2};
      let out = new box2d.b2Vec2();

      ground.m_linearVelocity.Copy(new b2Vec2(1,1));
      ground.m_angularVelocity = 2;
      ground.m_sweep.c.Copy(new b2Vec2(-2,-3));

      let p = ground.GetLinearVelocityFromLocalPoint(localPoint, out)
      expect(JSON.stringify(p)).assertEqual('{"data":{"0":-9,"1":7}}')
    })

    it('test_030_1', 0, () => {
      // GetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let damping = ground.GetLinearDamping();
      expect(damping).assertEqual(0)
    })
    it('test_030_2', 0, () => {
      // GetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_linearDamping = 1;
      let damping = ground.GetLinearDamping();
      expect(damping).assertEqual(1)
    })
    it('test_030_3', 0, () => {
      // GetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_linearDamping = -1;
      let damping = ground.GetLinearDamping();
      expect(damping).assertEqual(-1)
    })
    it('test_030_4', 0, () => {
      // GetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_linearDamping = 2;
      let damping = ground.GetLinearDamping();
      expect(damping).assertEqual(2)
    })
    it('test_030_5', 0, () => {
      // GetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_linearDamping = -2;
      let damping = ground.GetLinearDamping();
      expect(damping).assertEqual(-2)
    })

    it('test_031_1', 0, () => {
      // SetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let linearDamping: number = 3;
      ground.SetLinearDamping(linearDamping)
      expect(ground.m_linearDamping).assertEqual(3)
    })
    it('test_031_2', 0, () => {
      // SetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let linearDamping: number = 0;
      ground.SetLinearDamping(linearDamping)
      expect(ground.m_linearDamping).assertEqual(0)
    })
    it('test_031_3', 0, () => {
      // SetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let linearDamping: number = -3;
      ground.SetLinearDamping(linearDamping)
      expect(ground.m_linearDamping).assertEqual(-3)
    })
    it('test_031_4', 0, () => {
      // SetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let linearDamping: number = 2;
      ground.SetLinearDamping(linearDamping)
      expect(ground.m_linearDamping).assertEqual(2)
    })
    it('test_031_5', 0, () => {
      // SetLinearDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let linearDamping: number = -2;
      ground.SetLinearDamping(linearDamping)
      expect(ground.m_linearDamping).assertEqual(-2)
    })

    it('test_032_1', 0, () => {
      // GetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let angularDamping = ground.GetAngularDamping();
      expect(angularDamping).assertEqual(0)
      // m_angularDamping
    })
    it('test_032_2', 0, () => {
      // GetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularDamping = -1;
      let angularDamping = ground.GetAngularDamping();
      expect(angularDamping).assertEqual(-1)
    })
    it('test_032_3', 0, () => {
      // GetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularDamping = 1;
      let angularDamping = ground.GetAngularDamping();
      expect(angularDamping).assertEqual(1)
    })
    it('test_032_4', 0, () => {
      // GetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularDamping = -1.5;
      let angularDamping = ground.GetAngularDamping();
      expect(angularDamping).assertEqual(-1.5)
    })
    it('test_032_5', 0, () => {
      // GetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularDamping = 1.5;
      let angularDamping = ground.GetAngularDamping();
      expect(angularDamping).assertEqual(1.5)
    })

    it('test_033_1', 0, () => {
      // SetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let angularDamping: number = 3;
      ground.SetAngularDamping(angularDamping);
      expect(ground.m_angularDamping).assertEqual(3)
    })
    it('test_033_2', 0, () => {
      // SetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let angularDamping: number = -3;
      ground.SetAngularDamping(angularDamping);
      expect(ground.m_angularDamping).assertEqual(-3)
    })
    it('test_033_3', 0, () => {
      // SetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let angularDamping: number = -1;
      ground.SetAngularDamping(angularDamping);
      expect(ground.m_angularDamping).assertEqual(-1)
    })
    it('test_033_4', 0, () => {
      // SetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let angularDamping: number = 0;
      ground.SetAngularDamping(angularDamping);
      expect(ground.m_angularDamping).assertEqual(0)
    })
    it('test_033_5', 0, () => {
      // SetAngularDamping
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let angularDamping: number = 2;
      ground.SetAngularDamping(angularDamping);
      expect(ground.m_angularDamping).assertEqual(2)
    })

    it('test_034_1', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let type = ground.GetType();
      expect(type).assertEqual(b2BodyType.b2_staticBody)
    })
    it('test_034_2', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = b2BodyType.b2_unknown;
      let type = ground.GetType();
      expect(type).assertEqual(b2BodyType.b2_unknown)
    })
    it('test_034_3', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = b2BodyType.b2_kinematicBody;
      let type = ground.GetType();
      expect(type).assertEqual(b2BodyType.b2_kinematicBody)
    })
    it('test_034_4', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = b2BodyType.b2_dynamicBody;
      let type = ground.GetType();
      expect(type).assertEqual(b2BodyType.b2_dynamicBody)
    })
    it('test_034_5', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let type = ground.GetType();
      expect(type).not().assertEqual(b2BodyType.b2_dynamicBody)
    })

    it('test_035_1', 0, () => {
      // SetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetType(b2BodyType.b2_staticBody)
      expect(ground.m_type).assertEqual(b2BodyType.b2_staticBody)
    })
    it('test_035_2', 0, () => {
      // SetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetType(b2BodyType.b2_unknown)
      expect(ground.m_type).assertEqual(b2BodyType.b2_unknown)
    })
    it('test_035_3', 0, () => {
      // SetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetType(b2BodyType.b2_kinematicBody)
      expect(ground.m_type).assertEqual(b2BodyType.b2_kinematicBody)
    })
    it('test_035_4', 0, () => {
      // SetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetType(b2BodyType.b2_dynamicBody)
      expect(ground.m_type).assertEqual(b2BodyType.b2_dynamicBody)
    })
    it('test_035_5', 0, () => {
      // SetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetType(b2BodyType.b2_dynamicBody)
      expect(ground.m_type).not().assertEqual(b2BodyType.b2_staticBody)
    })

    it('test_036_1', 0, () => {
      // IsBullet
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let flag = ground.IsBullet()
      expect(flag).assertFalse()
    })
    it('test_036_2', 0, () => {
      // IsBullet
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_bulletFlag = true
      let flag = ground.IsBullet()
      expect(flag).assertTrue()
    })
    it('test_036_3', 0, () => {
      // IsBullet
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_bulletFlag = false
      let flag = ground.IsBullet()
      expect(flag).assertFalse()
    })

    it('test_037_1', 0, () => {
      // SetBullet
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetBullet(false);
      expect(ground.m_bulletFlag).assertFalse()
    })
    it('test_037_2', 0, () => {
      // SetBullet
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetBullet(true);
      expect(ground.m_bulletFlag).assertTrue()
    })

    it('test_038_1', 0, () => {
      // SetSleepingAllowed
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetSleepingAllowed(false);
      expect(ground.m_autoSleepFlag).assertEqual(false)
    })
    it('test_038_2', 0, () => {
      // SetSleepingAllowed
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetSleepingAllowed(true);
      expect(ground.m_autoSleepFlag).assertEqual(true)
    })
    it('test_038_3', 0, () => {
      // SetSleepingAllowed
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_sleepTime = 1;
      ground.m_angularVelocity = 1;
      ground.m_torque = 1;
      ground.SetSleepingAllowed(false);
      expect(ground.m_autoSleepFlag).assertEqual(false)
      expect(ground.m_sleepTime).assertEqual(0)
    })
    it('test_038_4', 0, () => {
      // SetSleepingAllowed
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_sleepTime = 1;
      ground.m_angularVelocity = 1;
      ground.m_torque = 1;
      ground.SetSleepingAllowed(true);
      expect(ground.m_autoSleepFlag).assertEqual(true)
      expect(ground.m_sleepTime).assertEqual(1)
    })

    it('test_039_1', 0, () => {
      // IsSleepingAllowed
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let flag = ground.IsSleepingAllowed()
      expect(flag).assertEqual(true)
    })
    it('test_039_2', 0, () => {
      // IsSleepingAllowed
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_autoSleepFlag = true;
      let flag = ground.IsSleepingAllowed()
      expect(flag).assertEqual(true)
    })
    it('test_039_3', 0, () => {
      // IsSleepingAllowed
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_autoSleepFlag = false;
      let flag = ground.IsSleepingAllowed()
      expect(flag).assertEqual(false)
    })

    it('test_040_1', 0, () => {
      // SetAwake
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularVelocity = 1;
      ground.SetAwake(false)
      expect(ground.m_awakeFlag).assertEqual(false)
      expect(ground.m_sleepTime).assertEqual(0)
      expect(ground.m_angularVelocity).assertEqual(0)
    })
    it('test_040_2', 0, () => {
      // SetAwake
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularVelocity = 1;
      ground.SetAwake(true)
      expect(ground.m_awakeFlag).assertEqual(true)
      expect(ground.m_sleepTime).assertEqual(0)
      expect(ground.m_angularVelocity).assertEqual(1)
    })

    it('test_041_1', 0, () => {
      // IsAwake
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let awake = ground.IsAwake()
      expect(awake).assertEqual(true);
    })
    it('test_041_2', 0, () => {
      // IsAwake
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_awakeFlag = false;
      let awake = ground.IsAwake()
      expect(awake).assertEqual(false);
    })
    it('test_041_3', 0, () => {
      // IsAwake
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_awakeFlag = true;
      let awake = ground.IsAwake()
      expect(awake).assertEqual(true);
    })

    it('test_042_1', 0, () => {
      // SetActive
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetActive(false)
      expect(ground.IsActive()).assertEqual(false)
    })
    it('test_042_2', 0, () => {
      // SetActive
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetActive(true)
      expect(ground.IsActive()).assertEqual(true)
    })

    it('test_043_1', 0, () => {
      // IsActive
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let active = ground.IsActive()
      expect(active).assertEqual(true)
    })
    it('test_043_2', 0, () => {
      // IsActive
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_activeFlag = true;
      let active = ground.IsActive()
      expect(active).assertEqual(true)
    })
    it('test_043_3', 0, () => {
      // IsActive
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_activeFlag = false;
      let active = ground.IsActive()
      expect(active).assertEqual(false)
    })

    it('test_044_1', 0, () => {
      // SetFixedRotation
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetFixedRotation(false);
      expect(ground.m_fixedRotationFlag).assertEqual(false)
      expect(ground.m_mass).assertEqual(0)
      expect(ground.m_invMass).assertEqual(0)
      expect(ground.m_I).assertEqual(0)
      expect(ground.m_invI).assertEqual(0)
    })
    it('test_044_2', 0, () => {
      // SetFixedRotation
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularVelocity = 1;
      ground.m_mass = 1;
      ground.m_invMass = 1;
      ground.m_I = 1;
      ground.m_invI = 1;
      ground.SetFixedRotation(false);
      expect(ground.m_fixedRotationFlag).assertEqual(false)

      expect(ground.m_angularVelocity).assertEqual(1)
      expect(ground.m_mass).assertEqual(1)
      expect(ground.m_invMass).assertEqual(1)
      expect(ground.m_I).assertEqual(1)
      expect(ground.m_invI).assertEqual(1)
    })
    it('test_044_3', 0, () => {
      // SetFixedRotation
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_angularVelocity = 1;
      ground.m_mass = 1;
      ground.m_invMass = 1;
      ground.m_I = 1;
      ground.m_invI = 1;
      ground.SetFixedRotation(true);
      expect(ground.m_fixedRotationFlag).assertEqual(true)

      expect(ground.m_angularVelocity).assertEqual(0)
      expect(ground.m_mass).assertEqual(0)
      expect(ground.m_invMass).assertEqual(0)
      expect(ground.m_I).assertEqual(0)
      expect(ground.m_invI).assertEqual(0)
    })

    it('test_045_1', 0, () => {
      // IsFixedRotation
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let flag = ground.IsFixedRotation()
      expect(flag).assertEqual(false)
    })
    it('test_045_2', 0, () => {
      // IsFixedRotation
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_fixedRotationFlag = false
      let flag = ground.IsFixedRotation()
      expect(flag).assertEqual(false)
    })
    it('test_045_3', 0, () => {
      // IsFixedRotation
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_fixedRotationFlag = true
      let flag = ground.IsFixedRotation()
      expect(flag).assertEqual(true)
    })

    it('test_046_1', 0, () => {
      // GetFixtureList
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let fixture = ground.GetFixtureList();
      expect(fixture).assertNull();
    })
    it('test_046_2', 0, () => {
      // GetFixtureList
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      const shape = new box2d.b2PolygonShape();
      const vertices = [
        new box2d.b2Vec2(-4, -2),
        new box2d.b2Vec2(4, -2),
        new box2d.b2Vec2(4, 0),
        new box2d.b2Vec2(-4, 0),
      ];
      shape.Set(vertices, 4);
      ground.m_fixtureList = ground.CreateFixture(shape, 0.0);
      let fixture = ground.GetFixtureList();
      expect(fixture).not().assertNull();
    })

    it('test_047_1', 0, () => {
      // GetJointList
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let jointList = ground.GetJointList()
      expect(jointList).assertNull();
    })
    it('test_047_2', 0, () => {
      // GetJointList
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let def: b2IJointDef = new b2MotorJointDef();
      let joint: b2Joint = new b2MotorJoint(def);
      ground.m_jointList = new b2JointEdge(joint);
      let jointList = ground.GetJointList()
      expect(jointList).not().assertNull();
    })

    it('test_048_1', 0, () => {
      // GetContactList
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let contactList = ground.GetContactList()
      expect(contactList).assertNull();
    })
    it('test_048_2', 0, () => {
      // GetContactList
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let contact = b2CircleContact.Create();
      ground.m_contactList = new b2ContactEdge(contact);
      let contactList = ground.GetContactList()
      expect(contactList).not().assertNull();
    })

    it('test_049_1', 0, () => {
      // GetNext
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let body = ground.GetNext();
      expect(body).assertNull();
    })
    it('test_049_2', 0, () => {
      // GetNext
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);

      const bd1 = new box2d.b2BodyDef();
      const next = m_world.CreateBody(bd1);
      ground.m_next = next;
      let body = ground.GetNext();
      expect(body).not().assertNull();
    })

    it('test_050_1', 0, () => {
      // GetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let userData: number = ground.GetUserData()
      expect(userData).assertNull()
    })
    it('test_050_2', 0, () => {
      // GetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_userData = 1
      let userData: number = ground.GetUserData()
      expect(userData).assertEqual(1)
    })

    it('test_051_1', 0, () => {
      // SetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetUserData(0)
      expect(ground.m_userData).assertEqual(0)
    })
    it('test_051_2', 0, () => {
      // SetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetUserData(1)
      expect(ground.m_userData).assertEqual(1)
    })
    it('test_051_3', 0, () => {
      // SetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetUserData(-1)
      expect(ground.m_userData).assertEqual(-1)
    })

    it('test_052_1', 0, () => {
      // GetWorld
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let world = ground.GetWorld()
      expect(world).not().assertNull()
      expect(JSON.stringify(world.m_gravity)).assertEqual('{"data":{"0":0,"1":-10}}')
    })
    it('test_052_2', 0, () => {
      // GetWorld
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);

      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(1, 1);
      let m_world1 = new box2d.b2World(gravity1);
      ground.m_world = m_world1;
      let world = ground.GetWorld()
      expect(world).not().assertNull()
      expect(JSON.stringify(world.m_gravity)).assertEqual('{"data":{"0":1,"1":1}}')
    })
    it('test_052_3', 0, () => {
      // GetWorld
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);

      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(-1, -1);
      let m_world1 = new box2d.b2World(gravity1);
      ground.m_world = m_world1;
      let world = ground.GetWorld()
      expect(world).not().assertNull()
      expect(JSON.stringify(world.m_gravity)).assertEqual('{"data":{"0":-1,"1":-1}}')
    })

    it('test_053_1', 0, () => {
      // SynchronizeTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SynchronizeTransform()
      expect(JSON.stringify(ground.m_xf.q)).assertEqual('{"s":0,"c":1}')
    })
    it('test_053_2', 0, () => {
      // SynchronizeTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_sweep.a = 0.8;
      ground.SynchronizeTransform()
      expect(JSON.stringify(ground.m_xf.q)).assertEqual('{"s":0.7173560908995228,"c":0.6967067093471654}')
    })
    it('test_053_3', 0, () => {
      // SynchronizeTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_sweep.a = 0.5;
      ground.SynchronizeTransform()
      expect(JSON.stringify(ground.m_xf.q)).assertEqual('{"s":0.479425538604203,"c":0.8775825618903728}')
    })

    it('test_054_1', 0, () => {
      // ShouldCollide
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let other: b2Body = new b2Body(bd, m_world)
      let flag = ground.ShouldCollide(other)
      expect(flag).assertEqual(false)
    })
    it('test_054_2', 0, () => {
      // ShouldCollide
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let other: b2Body = new b2Body(bd, m_world)
      other.m_type = b2BodyType.b2_unknown;
      let flag = ground.ShouldCollide(other)
      expect(flag).assertEqual(true)
    })
    it('test_054_3', 0, () => {
      // ShouldCollide
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let other: b2Body = new b2Body(bd, m_world)
      other.m_type = b2BodyType.b2_staticBody;
      let flag = ground.ShouldCollide(other)
      expect(flag).assertEqual(false)
    })
    it('test_054_4', 0, () => {
      // ShouldCollide
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let other: b2Body = new b2Body(bd, m_world)
      other.m_type = b2BodyType.b2_kinematicBody;
      let flag = ground.ShouldCollide(other)
      expect(flag).assertEqual(true)
    })
    it('test_054_5', 0, () => {
      // ShouldCollide
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let other: b2Body = new b2Body(bd, m_world)
      other.m_type = b2BodyType.b2_dynamicBody;
      let flag = ground.ShouldCollide(other)
      expect(flag).assertEqual(true)
    })

    it('test_055_1', 0, () => {
      // Advance
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let alpha: number = 2;
      ground.Advance(alpha);
      expect(ground.m_sweep.alpha0).assertEqual(2)
    })
    it('test_055_2', 0, () => {
      // Advance
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let alpha: number = -2;
      ground.Advance(alpha);
      expect(ground.m_sweep.alpha0).assertEqual(-2)
    })
    it('test_055_3', 0, () => {
      // Advance
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let alpha: number = 0;
      ground.Advance(alpha);
      expect(ground.m_sweep.alpha0).assertEqual(0)
    })
  })
}