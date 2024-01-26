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
import { DebugDraw, DestructionListener, Settings, Test } from '../../../main/ets/Testbed/Testbed'
import { b2Body,
  b2ContactFilter, b2ContactListener,
  b2IBodyDef,
  b2Vec2,
  b2WeldJoint } from '@ohos/box2d'

export default function worldTest1() {
  describe('world_test1', () => {
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
    it('test_001_1', 0, () => {
      // SetSubStepping
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let settings: Settings = new Settings();
      m_world.SetSubStepping(settings.enableSubStepping);
      expect(m_world.m_subStepping).assertFalse()
    })
    it('test_001_2', 0, () => {
      // SetSubStepping
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let settings: Settings = new Settings();
      settings.enableSubStepping = true
      m_world.SetSubStepping(settings.enableSubStepping);
      expect(m_world.m_subStepping).assertTrue()
    })
    it('test_001_3', 0, () => {
      // SetSubStepping
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let settings: Settings = new Settings();
      settings.enableSubStepping = false
      m_world.SetSubStepping(settings.enableSubStepping);
      expect(m_world.m_subStepping).assertFalse()
    })

    it('test_002_1', 0, () => {
      // SetDestructionListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let test: Test = new Test();
      let m_destructionListener: DestructionListener = new DestructionListener(test)
      m_world.SetDestructionListener(m_destructionListener);
      expect(m_world.m_destructionListener).assertEqual(m_destructionListener)
    })
    it('test_002_2', 0, () => {
      // SetDestructionListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let test: Test = new Test();
      let m_destructionListener: DestructionListener = new DestructionListener(test)
      m_world.SetDestructionListener(m_destructionListener);
      expect(m_world.m_destructionListener).assertEqual(m_destructionListener)
    })
    it('test_002_3', 0, () => {
      // SetDestructionListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(1, 1);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let test: Test = new Test();
      let m_destructionListener: DestructionListener = new DestructionListener(test)
      m_world.SetDestructionListener(m_destructionListener);
      expect(m_world.m_destructionListener).assertEqual(m_destructionListener)
    })
    it('test_002_4', 0, () => {
      // SetDestructionListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -15);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let test: Test = new Test();
      let m_destructionListener: DestructionListener = new DestructionListener(test)
      m_world.SetDestructionListener(m_destructionListener);
      expect(m_world.m_destructionListener).assertEqual(m_destructionListener)
    })
    it('test_002_5', 0, () => {
      // SetDestructionListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(-1, 0);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let test: Test = new Test();
      let m_destructionListener: DestructionListener = new DestructionListener(test)
      m_world.SetDestructionListener(m_destructionListener);
      expect(m_world.m_destructionListener).assertEqual(m_destructionListener)
    })

    it('test_003_1', 0, () => {
      // SetContactFilter
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let filter: b2ContactFilter = new b2ContactFilter();
      m_world.SetContactFilter(filter);
      expect(m_world.m_contactManager.m_contactFilter).assertEqual(filter);
    })
    it('test_003_2', 0, () => {
      // SetContactFilter
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let filter: b2ContactFilter = new b2ContactFilter();
      m_world.SetContactFilter(filter);
      expect(m_world.m_contactManager.m_contactFilter).assertEqual(filter);
    })
    it('test_003_3', 0, () => {
      // SetContactFilter
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(1, 1);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let filter: b2ContactFilter = new b2ContactFilter();
      m_world.SetContactFilter(filter);
      expect(m_world.m_contactManager.m_contactFilter).assertEqual(filter);
    })
    it('test_003_4', 0, () => {
      // SetContactFilter
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let filter: b2ContactFilter = new b2ContactFilter();
      m_world.SetContactFilter(filter);
      expect(m_world.m_contactManager.m_contactFilter).assertEqual(filter);
    })
    it('test_003_5', 0, () => {
      // SetContactFilter
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let filter: b2ContactFilter = new b2ContactFilter();
      m_world.SetContactFilter(filter);
      expect(m_world.m_contactManager.m_contactFilter).assertEqual(filter);
    })

    it('test_004_1', 0, () => {
      // SetContactListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let listener: b2ContactListener = new b2ContactListener();
      m_world.SetContactListener(listener);
      expect(m_world.m_contactManager.m_contactListener).assertEqual(listener);
    })
    it('test_004_2', 0, () => {
      // SetContactListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let listener: b2ContactListener = new b2ContactListener();
      m_world.SetContactListener(listener);
      expect(m_world.m_contactManager.m_contactListener).assertEqual(listener);
    })
    it('test_004_3', 0, () => {
      // SetContactListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(1, -1);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let listener: b2ContactListener = new b2ContactListener();
      m_world.SetContactListener(listener);
      expect(m_world.m_contactManager.m_contactListener).assertEqual(listener);
    })
    it('test_004_4', 0, () => {
      // SetContactListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let listener: b2ContactListener = new b2ContactListener();
      m_world.SetContactListener(listener);
      expect(m_world.m_contactManager.m_contactListener).assertEqual(listener);
    })
    it('test_004_5', 0, () => {
      // SetContactListener
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(-1, 0);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let listener: b2ContactListener = new b2ContactListener();
      m_world.SetContactListener(listener);
      expect(m_world.m_contactManager.m_contactListener).assertEqual(listener);
    })

    it('test_005_1', 0, () => {
      // SetDebugDraw
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let g_debugDraw: DebugDraw = new DebugDraw()
      m_world.SetDebugDraw(g_debugDraw);
      expect(m_world.m_debugDraw).assertEqual(g_debugDraw)
    })
    it('test_005_2', 0, () => {
      // SetDebugDraw
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let g_debugDraw: DebugDraw = new DebugDraw()
      m_world.SetDebugDraw(g_debugDraw);
      expect(m_world.m_debugDraw).assertEqual(g_debugDraw)
    })
    it('test_005_3', 0, () => {
      // SetDebugDraw
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(1, -1);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let g_debugDraw: DebugDraw = new DebugDraw()
      m_world.SetDebugDraw(g_debugDraw);
      expect(m_world.m_debugDraw).assertEqual(g_debugDraw)
    })
    it('test_005_4', 0, () => {
      // SetDebugDraw
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let g_debugDraw: DebugDraw = new DebugDraw()
      m_world.SetDebugDraw(g_debugDraw);
      expect(m_world.m_debugDraw).assertEqual(g_debugDraw)
    })
    it('test_005_5', 0, () => {
      // SetDebugDraw
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let g_debugDraw: DebugDraw = new DebugDraw()
      m_world.SetDebugDraw(g_debugDraw);
      expect(m_world.m_debugDraw).assertEqual(g_debugDraw)
    })

    it('test_006_1', 0, () => {
      // CreateBody
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      expect(m_world.m_bodyList).assertNull()
      expect(m_world.m_bodyCount).assertEqual(0)
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      expect(m_world.m_bodyList).not().assertNull()
      expect(m_world.m_bodyCount).assertEqual(1)
    })
    it('test_006_2', 0, () => {
      // CreateBody
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      expect(body.m_bulletFlag).assertEqual(false);
      expect(body.m_fixedRotationFlag).assertEqual(false);
      expect(body.m_autoSleepFlag).assertEqual(true);
      expect(body.m_awakeFlag).assertEqual(true);
      expect(body.m_activeFlag).assertEqual(true);
    })
    it('test_006_3', 0, () => {
      // CreateBody
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      def.bullet = true;
      def.fixedRotation = true;
      def.allowSleep = false
      def.awake = false
      def.active = false;
      let body: b2Body = m_world.CreateBody(def);
      expect(body.m_bulletFlag).assertEqual(true);
      expect(body.m_fixedRotationFlag).assertEqual(true);
      expect(body.m_autoSleepFlag).assertEqual(false);
      expect(body.m_awakeFlag).assertEqual(false);
      expect(body.m_activeFlag).assertEqual(false);
    })
    it('test_006_4', 0, () => {
      // CreateBody
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      def.bullet = true;
      def.fixedRotation = false;
      def.allowSleep = true
      def.awake = true
      def.active = false;
      let body: b2Body = m_world.CreateBody(def);
      expect(body.m_bulletFlag).assertEqual(true);
      expect(body.m_fixedRotationFlag).assertEqual(false);
      expect(body.m_autoSleepFlag).assertEqual(true);
      expect(body.m_awakeFlag).assertEqual(true);
      expect(body.m_activeFlag).assertEqual(false);
    })

    it('test_007_1', 0, () => {
      // DestroyBody
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);

      const jd = new box2d.b2RevoluteJointDef();
      const bd1 = new box2d.b2BodyDef();
      let ground = m_world.CreateBody(bd1);
      jd.bodyA = ground;
      jd.bodyB = body;
      jd.motorSpeed = 0.07 * box2d.b2_pi;
      jd.maxMotorTorque = 1e5;
      jd.enableMotor = true;
      let m_joint = m_world.CreateJoint(jd);
      m_world.m_jointList = m_joint;
      m_world.DestroyBody(body);
      expect(m_world.m_jointList).assertNull()
    })
    it('test_007_2', 0, () => {
      // DestroyBody
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);

      const jd = new box2d.b2RevoluteJointDef();
      const bd1 = new box2d.b2BodyDef();
      let ground = m_world.CreateBody(bd1);
      jd.bodyA = ground;
      jd.bodyB = body;
      jd.localAnchorA.Set(0.0, 1.0);
      jd.localAnchorB.Set(0.0, 0.0);
      jd.referenceAngle = 2.0;
      jd.motorSpeed = 0.05 * box2d.b2_pi;
      jd.maxMotorTorque = 1e7;
      jd.enableMotor = true;
      let m_joint = m_world.CreateJoint(jd);
      m_world.m_jointList = m_joint;
      m_world.DestroyBody(body);
      expect(m_world.m_jointList).assertNull()
    })
    it('test_007_3', 0, () => {
      // DestroyBody
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);

      const jd = new box2d.b2RevoluteJointDef();
      const bd1 = new box2d.b2BodyDef();
      let ground = m_world.CreateBody(bd1);
      jd.bodyA = ground;
      jd.bodyB = body;
      jd.localAnchorA.Set(1.0, 0.1);
      jd.localAnchorB.Set(1.0, 1.0);
      jd.referenceAngle = 0.0;
      jd.motorSpeed = 0.05 * box2d.b2_pi;
      jd.maxMotorTorque = 1e7;
      jd.enableMotor = false;
      let m_joint = m_world.CreateJoint(jd);
      m_world.m_jointList = m_joint;
      m_world.DestroyBody(body);
      expect(m_world.m_jointList).assertNull()
    })

    it('test_008_1', 0, () => {
      // CreateJoint
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      const shape = new box2d.b2PolygonShape();
      shape.SetAsBox(1.0, 0.125);

      const fd = new box2d.b2FixtureDef();
      fd.shape = shape;
      fd.density = 20.0;

      const jd = new box2d.b2WeldJointDef();
      jd.frequencyHz = 5.0;
      jd.dampingRatio = 0.7;

      const bd = new box2d.b2BodyDef();
      let ground = m_world.CreateBody(bd);
      let prevBody = ground;
      for (let i = 0; i < 1; ++i) {
        const bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position.Set(-14.0 + 2.0 * i, 15.0);
        const body = m_world.CreateBody(bd);
        body.CreateFixture(fd);

        const anchor = new box2d.b2Vec2(-15.0 + 2.0 * i, 15.0);
        jd.Initialize(prevBody, body, anchor);
        let joint = m_world.CreateJoint(jd);
        let flag = joint instanceof b2WeldJoint;
        expect(flag).assertTrue()
        expect(joint).not().assertNull()
      }
    })
    it('test_008_2', 0, () => {
      // CreateJoint
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.allowSleep = false;
      bd.position.Set(0.0, 1.0);
      // let ground = m_world.CreateBody(bd);
      const body = m_world.CreateBody(bd);

      let shape = new box2d.b2PolygonShape();
      shape.SetAsBox(0.05, 1.0, new box2d.b2Vec2(2.0, 0.0), 0.0);
      body.CreateFixture(shape, 5.0);
      shape.SetAsBox(0.05, 1.0, new box2d.b2Vec2(-2.0, 0.0), 0.0);
      body.CreateFixture(shape, 5.0);
      shape.SetAsBox(2.0, 0.05, new box2d.b2Vec2(0.0, 1.0), 0.0);
      body.CreateFixture(shape, 5.0);
      shape.SetAsBox(2.0, 0.05, new box2d.b2Vec2(0.0, -1.0), 0.0);
      body.CreateFixture(shape, 5.0);

      const jd = new box2d.b2RevoluteJointDef();
      const bd1 = new box2d.b2BodyDef();
      let ground = m_world.CreateBody(bd1);
      jd.bodyA = ground;
      jd.bodyB = body;
      jd.localAnchorA.Set(0.0, 1.0);
      jd.localAnchorB.Set(0.0, 0.0);
      jd.referenceAngle = 0.0;
      jd.motorSpeed = 0.05 * box2d.b2_pi;
      jd.maxMotorTorque = 1e7;
      jd.enableMotor = true;
      let m_joint = m_world.CreateJoint(jd);
      let flag = m_joint instanceof box2d.b2RevoluteJoint;
      expect(flag).assertTrue()
      expect(m_joint).not().assertNull()
    })
    it('test_008_3', 0, () => {
      // CreateJoint
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      const shape = new box2d.b2PolygonShape();
      shape.SetAsBox(1.0, 0.125);

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.allowSleep = false;
      bd.position.Set(0.0, 1.0);
      const body = m_world.CreateBody(bd);

      const md: box2d.b2MouseJointDef = new box2d.b2MouseJointDef();
      const bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
      let m_groundBody = m_world.CreateBody(bodyDef);
      md.bodyA = m_groundBody;
      md.bodyB = body;
      md.maxForce = 1000 * body.GetMass();
      let m_mouseJoint = m_world.CreateJoint(md) as box2d.b2MouseJoint;

      let flag = m_mouseJoint instanceof box2d.b2MouseJoint;
      expect(flag).assertTrue()
      expect(m_mouseJoint).not().assertNull()
    })
    it('test_008_4', 0, () => {
      // CreateJoint
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);

      const shape = new box2d.b2PolygonShape();
      shape.SetAsBox(8.0, 1.0);

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position.Set(4.0, 20.0);
      const body = m_world.CreateBody(bd);
      body.CreateFixture(shape, 2.0);

      const bd1 = new box2d.b2BodyDef();
      bd.position.Set(0.0, 17.0);
      let ground = m_world.CreateBody(bd1);
      let prevBody = ground;

      const rjd = new box2d.b2RevoluteJointDef();
      rjd.Initialize(prevBody, body, new box2d.b2Vec2(-4.0, 20.0));
      let joint = m_world.CreateJoint(rjd);
      let flag = joint instanceof box2d.b2RevoluteJoint;
      expect(flag).assertTrue()
      expect(joint).not().assertNull()
    })

    it('test_009_1', 0, () => {
      // DestroyJoint
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.allowSleep = false;
      bd.position.Set(0.0, 1.0);
      const body = m_world.CreateBody(bd);
      body.m_awakeFlag = false;
      body.m_sleepTime = 70;

      const md: box2d.b2MouseJointDef = new box2d.b2MouseJointDef();
      const bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
      let m_groundBody = m_world.CreateBody(bodyDef);
      m_groundBody.m_awakeFlag = false;
      m_groundBody.m_sleepTime = 60;
      md.bodyA = m_groundBody;
      md.bodyB = body;
      md.maxForce = 1000 * body.GetMass();
      let m_mouseJoint = m_world.CreateJoint(md) as box2d.b2MouseJoint;
      m_world.DestroyJoint(m_mouseJoint);

      expect(md.bodyA.m_awakeFlag).assertEqual(true);
      expect(md.bodyA.m_sleepTime).assertEqual(0);
      expect(md.bodyB.m_awakeFlag).assertEqual(true);
      expect(md.bodyB.m_sleepTime).assertEqual(0);
    })
    it('test_009_2', 0, () => {
      // DestroyJoint
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.allowSleep = false;
      bd.position.Set(0.0, 1.0);
      const body = m_world.CreateBody(bd);
      body.m_awakeFlag = false;
      body.m_sleepTime = 10;

      const md: box2d.b2MouseJointDef = new box2d.b2MouseJointDef();
      const bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
      let m_groundBody = m_world.CreateBody(bodyDef);
      m_groundBody.m_awakeFlag = false;
      m_groundBody.m_sleepTime = 20;
      md.bodyA = m_groundBody;
      md.bodyB = body;
      md.maxForce = 1000 * body.GetMass();
      let m_mouseJoint = m_world.CreateJoint(md) as box2d.b2MouseJoint;
      m_world.DestroyJoint(m_mouseJoint);

      expect(md.bodyA.m_awakeFlag).assertEqual(true);
      expect(md.bodyA.m_sleepTime).assertEqual(0);
      expect(md.bodyB.m_awakeFlag).assertEqual(true);
      expect(md.bodyB.m_sleepTime).assertEqual(0);
    })
    it('test_009_3', 0, () => {
      // DestroyJoint
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.allowSleep = false;
      bd.position.Set(0.0, 1.0);
      const body = m_world.CreateBody(bd);
      body.m_awakeFlag = false;
      body.m_sleepTime = 1;

      const md: box2d.b2MouseJointDef = new box2d.b2MouseJointDef();
      const bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
      let m_groundBody = m_world.CreateBody(bodyDef);
      m_groundBody.m_awakeFlag = false;
      m_groundBody.m_sleepTime = 2;
      md.bodyA = m_groundBody;
      md.bodyB = body;
      md.maxForce = 1000 * body.GetMass();
      let m_mouseJoint = m_world.CreateJoint(md) as box2d.b2MouseJoint;
      m_world.DestroyJoint(m_mouseJoint);

      expect(md.bodyA.m_awakeFlag).assertEqual(true);
      expect(md.bodyA.m_sleepTime).assertEqual(0);
      expect(md.bodyB.m_awakeFlag).assertEqual(true);
      expect(md.bodyB.m_sleepTime).assertEqual(0);
    })

    it('test_010_1', 0, () => {
      // Step
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let timeStep = 1;
      let velocityIterations = 8;
      let positionIterations = 3;
      let particleIterations = box2d.b2CalculateParticleIterations(10, 0.04, 1 / 60);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      body.m_torque = 1;
      body.m_force.Copy(new b2Vec2(11,2))
      m_world.m_bodyList = body;
      m_world.Step(timeStep, velocityIterations, positionIterations, particleIterations);
      expect(body.m_torque).assertEqual(0)
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_010_2', 0, () => {
      // Step
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let timeStep = 1;
      let velocityIterations = 8;
      let positionIterations = 3;
      let particleIterations = box2d.b2CalculateParticleIterations(10, 0.04, 1 / 60);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      body.m_torque = 4;
      body.m_force.Copy(new b2Vec2(1,2))
      m_world.m_bodyList = body;
      m_world.Step(timeStep, velocityIterations, positionIterations, particleIterations);
      expect(body.m_torque).assertEqual(0)
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_010_3', 0, () => {
      // Step
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let timeStep = 1;
      let velocityIterations = 8;
      let positionIterations = 3;
      let particleIterations = box2d.b2CalculateParticleIterations(10, 0.04, 1 / 60);
      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      body.m_torque = -4;
      body.m_force.Copy(new b2Vec2(-1,-2))
      m_world.m_bodyList = body;
      m_world.Step(timeStep, velocityIterations, positionIterations, particleIterations);
      expect(body.m_torque).assertEqual(0)
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
    })

    it('test_011_1', 0, () => {
      // ClearForces
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);

      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      body.m_force.Set(1,1);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":1,"1":1}}')
      body.m_torque = 1;
      m_world.m_bodyList = body
      m_world.ClearForces();
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      expect(body.m_torque).assertEqual(0)
    })
    it('test_011_2', 0, () => {
      // ClearForces
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);

      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      body.m_force.Set(3,2);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":3,"1":2}}')
      body.m_torque = -11;
      m_world.m_bodyList = body
      m_world.ClearForces();
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      expect(body.m_torque).assertEqual(0)
    })
    it('test_011_3', 0, () => {
      // ClearForces
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);

      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      body.m_force.Set(5,7);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":5,"1":7}}')
      body.m_torque = 4;
      m_world.m_bodyList = body
      m_world.ClearForces();
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      expect(body.m_torque).assertEqual(0)
    })
    it('test_011_4', 0, () => {
      // ClearForces
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);

      let def: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      body.m_force.Set(-1,2);
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":-1,"1":2}}')
      body.m_torque = 3;
      m_world.m_bodyList = body
      m_world.ClearForces();
      expect(JSON.stringify(body.m_force)).assertEqual('{"data":{"0":0,"1":0}}')
      expect(body.m_torque).assertEqual(0)
    })
  })
}