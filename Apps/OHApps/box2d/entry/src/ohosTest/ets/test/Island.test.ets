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
import {
  b2CircleContact,
  b2Contact,
  b2ContactImpulse,
  b2ContactListener,
  b2ContactVelocityConstraint,
  b2Island,
  b2Joint,
  b2Profile,
  b2RevoluteJoint,
  b2TimeStep,
  b2Vec2
} from '@ohos/box2d'

export default function islandTest() {
  describe('island_test', () => {
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
      // Initialize
      let island = new b2Island();
      let bodyCapacity: number = 1;
      let contactCapacity: number = 2;
      let jointCapacity: number = 3;
      let listener: b2ContactListener = new b2ContactListener();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      expect(island.m_bodyCapacity).assertEqual(bodyCapacity);
      expect(island.m_contactCapacity).assertEqual(contactCapacity);
      expect(island.m_jointCapacity).assertEqual(jointCapacity);
    })
    it('test_001_2', 0, () => {
      // Initialize
      let island = new b2Island();
      let bodyCapacity: number = 2;
      let contactCapacity: number = 1;
      let jointCapacity: number = 1;
      let listener: b2ContactListener = new b2ContactListener();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      expect(island.m_bodyCapacity).assertEqual(bodyCapacity);
      expect(island.m_contactCapacity).assertEqual(contactCapacity);
      expect(island.m_jointCapacity).assertEqual(jointCapacity);
    })
    it('test_001_3', 0, () => {
      // Initialize
      let island = new b2Island();
      let bodyCapacity: number = 3;
      let contactCapacity: number = 2;
      let jointCapacity: number = 1;
      let listener: b2ContactListener = new b2ContactListener();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      expect(island.m_bodyCapacity).assertEqual(bodyCapacity);
      expect(island.m_contactCapacity).assertEqual(contactCapacity);
      expect(island.m_jointCapacity).assertEqual(jointCapacity);
    })
    it('test_001_4', 0, () => {
      // Initialize
      let island = new b2Island();
      let bodyCapacity: number = 1;
      let contactCapacity: number = 1;
      let jointCapacity: number = 1;
      let listener: b2ContactListener = new b2ContactListener();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      expect(island.m_bodyCapacity).assertEqual(bodyCapacity);
      expect(island.m_contactCapacity).assertEqual(contactCapacity);
      expect(island.m_jointCapacity).assertEqual(jointCapacity);
    })
    it('test_001_5', 0, () => {
      // Initialize
      let island = new b2Island();
      let bodyCapacity: number = 3;
      let contactCapacity: number = 3;
      let jointCapacity: number = 3;
      let listener: b2ContactListener = new b2ContactListener();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      expect(island.m_bodyCapacity).assertEqual(bodyCapacity);
      expect(island.m_contactCapacity).assertEqual(contactCapacity);
      expect(island.m_jointCapacity).assertEqual(jointCapacity);
    })

    it('test_002_1', 0, () => {
      // Clear
      let island = new b2Island();
      island.m_bodyCount = 1;
      island.m_contactCount = 2;
      island.m_jointCount = 3;

      island.Clear()
      expect(island.m_bodyCount).assertEqual(0);
      expect(island.m_contactCount).assertEqual(0);
      expect(island.m_jointCount).assertEqual(0);
    })
    it('test_002_2', 0, () => {
      // Clear
      let island = new b2Island();
      island.m_bodyCount = 1;
      island.m_contactCount = 1;
      island.m_jointCount = 1;

      island.Clear()
      expect(island.m_bodyCount).assertEqual(0);
      expect(island.m_contactCount).assertEqual(0);
      expect(island.m_jointCount).assertEqual(0);
    })
    it('test_002_3', 0, () => {
      // Clear
      let island = new b2Island();
      island.m_bodyCount = 2;
      island.m_contactCount = 2;
      island.m_jointCount = 2;

      island.Clear()
      expect(island.m_bodyCount).assertEqual(0);
      expect(island.m_contactCount).assertEqual(0);
      expect(island.m_jointCount).assertEqual(0);
    })
    it('test_002_4', 0, () => {
      // Clear
      let island = new b2Island();
      island.m_bodyCount = 3;
      island.m_contactCount = 3;
      island.m_jointCount = 3;

      island.Clear()
      expect(island.m_bodyCount).assertEqual(0);
      expect(island.m_contactCount).assertEqual(0);
      expect(island.m_jointCount).assertEqual(0);
    })
    it('test_002_5', 0, () => {
      // Clear
      let island = new b2Island();
      island.m_bodyCount = 4;
      island.m_contactCount = 4;
      island.m_jointCount = 4;

      island.Clear()
      expect(island.m_bodyCount).assertEqual(0);
      expect(island.m_contactCount).assertEqual(0);
      expect(island.m_jointCount).assertEqual(0);
    })

    it('test_003_1', 0, () => {
      // Solve
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      island.AddBody(body)

      let profile: b2Profile = new b2Profile();
      let step: b2TimeStep = new b2TimeStep();
      let gravity: b2Vec2 = new b2Vec2(2, 3);
      let allowSleep: boolean = false;
      island.Solve(profile, step, gravity, allowSleep)

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":0,"1":0}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":0,"1":0}},"w":0}')
    })
    it('test_003_2', 0, () => {
      // Solve
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(1, 1));
      body.m_linearVelocity.Copy(new b2Vec2(2, 2))
      island.AddBody(body)

      let profile: b2Profile = new b2Profile();
      let step: b2TimeStep = new b2TimeStep();
      let gravity: b2Vec2 = new b2Vec2(2, 3);
      let allowSleep: boolean = false;
      island.Solve(profile, step, gravity, allowSleep)

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":1,"1":1}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":2,"1":2}},"w":0}')
    })
    it('test_003_3', 0, () => {
      // Solve
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(-1, -1));
      body.m_linearVelocity.Copy(new b2Vec2(-2, -2))
      island.AddBody(body)

      let profile: b2Profile = new b2Profile();
      let step: b2TimeStep = new b2TimeStep();
      let gravity: b2Vec2 = new b2Vec2(2, 3);
      let allowSleep: boolean = false;
      island.Solve(profile, step, gravity, allowSleep)

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":-1,"1":-1}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":-2,"1":-2}},"w":0}')
    })
    it('test_003_4', 0, () => {
      // Solve
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(10, 9));
      body.m_linearVelocity.Copy(new b2Vec2(3, 3))
      island.AddBody(body)

      let profile: b2Profile = new b2Profile();
      let step: b2TimeStep = new b2TimeStep();
      let gravity: b2Vec2 = new b2Vec2(2, 3);
      let allowSleep: boolean = false;
      island.Solve(profile, step, gravity, allowSleep)

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":10,"1":9}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":3,"1":3}},"w":0}')
    })
    it('test_003_5', 0, () => {
      // Solve
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(1, 2));
      body.m_linearVelocity.Copy(new b2Vec2(3, 4))
      island.AddBody(body)

      let profile: b2Profile = new b2Profile();
      let step: b2TimeStep = new b2TimeStep();
      let gravity: b2Vec2 = new b2Vec2(2, 3);
      let allowSleep: boolean = false;
      island.Solve(profile, step, gravity, allowSleep)

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":1,"1":2}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":3,"1":4}},"w":0}')
    })

    it('test_004_1', 0, () => {
      // SolveTOI
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      island.AddBody(body)

      let subStep: b2TimeStep = new b2TimeStep();
      let toiIndexA: number = 0;
      let toiIndexB: number = 0;
      island.SolveTOI(subStep, toiIndexA, toiIndexB);

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":0,"1":0}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":0,"1":0}},"w":0}')
    })
    it('test_004_2', 0, () => {
      // SolveTOI
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(1, 2))
      body.m_linearVelocity.Copy(new b2Vec2(2, 1))
      island.AddBody(body)

      let subStep: b2TimeStep = new b2TimeStep();
      let toiIndexA: number = 0;
      let toiIndexB: number = 0;
      island.SolveTOI(subStep, toiIndexA, toiIndexB);

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":1,"1":2}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":2,"1":1}},"w":0}')
    })
    it('test_004_3', 0, () => {
      // SolveTOI
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(2, 2))
      body.m_linearVelocity.Copy(new b2Vec2(3, 4))
      island.AddBody(body)

      let subStep: b2TimeStep = new b2TimeStep();
      let toiIndexA: number = 0;
      let toiIndexB: number = 0;
      island.SolveTOI(subStep, toiIndexA, toiIndexB);

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":2,"1":2}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":3,"1":4}},"w":0}')
    })
    it('test_004_4', 0, () => {
      // SolveTOI
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(-1, -1))
      body.m_linearVelocity.Copy(new b2Vec2(3, 3))
      island.AddBody(body)

      let subStep: b2TimeStep = new b2TimeStep();
      let toiIndexA: number = 0;
      let toiIndexB: number = 0;
      island.SolveTOI(subStep, toiIndexA, toiIndexB);

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":-1,"1":-1}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":3,"1":3}},"w":0}')
    })
    it('test_004_5', 0, () => {
      // SolveTOI
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity1);
      const body = m_world.CreateBody(bd);
      body.m_sweep.c.Copy(new b2Vec2(3, 3))
      body.m_linearVelocity.Copy(new b2Vec2(-3, -3))
      island.AddBody(body)

      let subStep: b2TimeStep = new b2TimeStep();
      let toiIndexA: number = 0;
      let toiIndexB: number = 0;
      island.SolveTOI(subStep, toiIndexA, toiIndexB);

      expect(JSON.stringify(island.m_positions[0])).assertEqual('{"c":{"data":{"0":3,"1":3}},"a":0}')
      expect(JSON.stringify(island.m_velocities[0])).assertEqual('{"v":{"data":{"0":-3,"1":-3}},"w":0}')
    })

    it('test_005_1', 0, () => {
      // AddBody
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(1, 2))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      island.AddBody(body)
      expect(island.m_bodyCount).assertEqual(1)
      expect(JSON.stringify(island.m_bodies[0].m_xf.p)).assertEqual(JSON.stringify(bd.position))
    })
    it('test_005_2', 0, () => {
      // AddBody
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(3, 4))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      island.AddBody(body)
      expect(island.m_bodyCount).assertEqual(1)
      expect(JSON.stringify(island.m_bodies[0].m_xf.p)).assertEqual(JSON.stringify(bd.position))
    })
    it('test_005_3', 0, () => {
      // AddBody
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(-1, -2))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      island.AddBody(body)
      expect(island.m_bodyCount).assertEqual(1)
      expect(JSON.stringify(island.m_bodies[0].m_xf.p)).assertEqual(JSON.stringify(bd.position))
    })
    it('test_005_4', 0, () => {
      // AddBody
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(3, 2))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      island.AddBody(body)
      expect(island.m_bodyCount).assertEqual(1)
      expect(JSON.stringify(island.m_bodies[0].m_xf.p)).assertEqual(JSON.stringify(bd.position))
    })
    it('test_005_5', 0, () => {
      // AddBody
      let island = new b2Island();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(1, 1))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      island.AddBody(body)
      expect(island.m_bodyCount).assertEqual(1)
      expect(JSON.stringify(island.m_bodies[0].m_xf.p)).assertEqual(JSON.stringify(bd.position))
    })

    it('test_006_1', 0, () => {
      // AddContact
      let island = new b2Island();

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_tangentSpeed = 1;
      island.AddContact(contact)
      expect(island.m_contactCount).assertEqual(1)
      expect(island.m_contacts[0].m_tangentSpeed).assertEqual(contact.m_tangentSpeed)
    })
    it('test_006_2', 0, () => {
      // AddContact
      let island = new b2Island();

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_tangentSpeed = 2;
      island.AddContact(contact)
      expect(island.m_contactCount).assertEqual(1)
      expect(island.m_contacts[0].m_tangentSpeed).assertEqual(contact.m_tangentSpeed)
    })
    it('test_006_3', 0, () => {
      // AddContact
      let island = new b2Island();

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_tangentSpeed = 3;
      island.AddContact(contact)
      expect(island.m_contactCount).assertEqual(1)
      expect(island.m_contacts[0].m_tangentSpeed).assertEqual(contact.m_tangentSpeed)
    })
    it('test_006_4', 0, () => {
      // AddContact
      let island = new b2Island();

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_tangentSpeed = 4;
      island.AddContact(contact)
      expect(island.m_contactCount).assertEqual(1)
      expect(island.m_contacts[0].m_tangentSpeed).assertEqual(contact.m_tangentSpeed)
    })
    it('test_006_5', 0, () => {
      // AddContact
      let island = new b2Island();

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_tangentSpeed = 5;
      island.AddContact(contact)
      expect(island.m_contactCount).assertEqual(1)
      expect(island.m_contacts[0].m_tangentSpeed).assertEqual(contact.m_tangentSpeed)
    })

    it('test_007_1', 0, () => {
      // AddJoint
      let island = new b2Island();
      const def = new box2d.b2RevoluteJointDef();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(-1, -1))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      def.bodyA = body;

      let joint: b2Joint = new b2RevoluteJoint(def);
      island.AddJoint(joint)
      expect(island.m_jointCount).assertEqual(1)
      expect(JSON.stringify(island.m_joints[0].m_bodyA.m_sweep.c)).assertEqual('{"data":{"0":-1,"1":-1}}')
    })
    it('test_007_2', 0, () => {
      // AddJoint
      let island = new b2Island();
      const def = new box2d.b2RevoluteJointDef();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(1, 1))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      def.bodyA = body;
      def.bodyA.m_sweep.c.Copy(new b2Vec2(1, 1))

      let joint: b2Joint = new b2RevoluteJoint(def);
      island.AddJoint(joint)
      expect(island.m_jointCount).assertEqual(1)
      expect(JSON.stringify(island.m_joints[0].m_bodyA.m_sweep.c)).assertEqual('{"data":{"0":1,"1":1}}')
    })
    it('test_007_3', 0, () => {
      // AddJoint
      let island = new b2Island();
      const def = new box2d.b2RevoluteJointDef();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(0, 1))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      def.bodyA = body;

      let joint: b2Joint = new b2RevoluteJoint(def);
      island.AddJoint(joint)
      expect(island.m_jointCount).assertEqual(1)
      expect(JSON.stringify(island.m_joints[0].m_bodyA.m_sweep.c)).assertEqual('{"data":{"0":0,"1":1}}')
    })
    it('test_007_4', 0, () => {
      // AddJoint
      let island = new b2Island();
      const def = new box2d.b2RevoluteJointDef();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(1, 1))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      def.bodyA = body;

      let joint: b2Joint = new b2RevoluteJoint(def);
      island.AddJoint(joint)
      expect(island.m_jointCount).assertEqual(1)
      expect(JSON.stringify(island.m_joints[0].m_bodyA.m_sweep.c)).assertEqual('{"data":{"0":1,"1":1}}')
    })
    it('test_007_5', 0, () => {
      // AddJoint
      let island = new b2Island();
      const def = new box2d.b2RevoluteJointDef();

      const bd = new box2d.b2BodyDef();
      bd.position.Copy(new b2Vec2(2, 3))
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const body = m_world.CreateBody(bd);
      def.bodyA = body;

      let joint: b2Joint = new b2RevoluteJoint(def);
      island.AddJoint(joint)
      expect(island.m_jointCount).assertEqual(1)
      expect(JSON.stringify(island.m_joints[0].m_bodyA.m_sweep.c)).assertEqual('{"data":{"0":2,"1":3}}')
    })

    it('test_008_1', 0, () => {
      // Report
      let island = new b2Island();

      let bodyCapacity: number = 1;
      let contactCapacity: number = 2;
      let jointCapacity: number = 3;

      class Test extends box2d.b2ContactListener {
        PostSolve(contact: b2Contact, impulse: b2ContactImpulse): void {
          expect(JSON.stringify(contact.m_manifold.localPoint)).assertEqual('{"data":{"0":1,"1":2}}')
          expect(JSON.stringify(impulse)).assertEqual('{"normalImpulses":[0,0],"tangentImpulses":[0,0],"count":0}')
        }
      }

      let listener: b2ContactListener = new Test();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_manifold.localPoint.Copy(new b2Vec2(1, 2));
      island.AddContact(contact)

      let constraints: b2ContactVelocityConstraint[] = b2ContactVelocityConstraint.MakeArray(1)
      island.Report(constraints)
    })
    it('test_008_2', 0, () => {
      // Report
      let island = new b2Island();

      let bodyCapacity: number = 1;
      let contactCapacity: number = 2;
      let jointCapacity: number = 3;

      class Test extends box2d.b2ContactListener {
        PostSolve(contact: b2Contact, impulse: b2ContactImpulse): void {
          expect(JSON.stringify(contact.m_manifold.localPoint)).assertEqual('{"data":{"0":-1,"1":0}}')
          expect(JSON.stringify(impulse)).assertEqual('{"normalImpulses":[1,0],"tangentImpulses":[1,0],"count":1}')
        }
      }

      let listener: b2ContactListener = new Test();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_manifold.localPoint.Copy(new b2Vec2(-1, 0));
      island.AddContact(contact)

      let constraints: b2ContactVelocityConstraint[] = b2ContactVelocityConstraint.MakeArray(1)
      constraints[0].points[0].normalImpulse = 1;
      constraints[0].points[0].tangentImpulse = 1;
      constraints[0].pointCount = 1;
      island.Report(constraints)
    })
    it('test_008_3', 0, () => {
      // Report
      let island = new b2Island();

      let bodyCapacity: number = 1;
      let contactCapacity: number = 2;
      let jointCapacity: number = 3;

      class Test extends box2d.b2ContactListener {
        PostSolve(contact: b2Contact, impulse: b2ContactImpulse): void {
          expect(JSON.stringify(contact.m_manifold.localPoint)).assertEqual('{"data":{"0":2,"1":2}}')
          expect(JSON.stringify(impulse)).assertEqual('{"normalImpulses":[-1,0],"tangentImpulses":[2,0],"count":1}')
        }
      }

      let listener: b2ContactListener = new Test();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_manifold.localPoint.Copy(new b2Vec2(2, 2));
      island.AddContact(contact)

      let constraints: b2ContactVelocityConstraint[] = b2ContactVelocityConstraint.MakeArray(1)
      constraints[0].points[0].normalImpulse = -1;
      constraints[0].points[0].tangentImpulse = 2;
      constraints[0].pointCount = 1;
      island.Report(constraints)
    })
    it('test_008_4', 0, () => {
      // Report
      let island = new b2Island();

      let bodyCapacity: number = 1;
      let contactCapacity: number = 2;
      let jointCapacity: number = 3;

      class Test extends box2d.b2ContactListener {
        PostSolve(contact: b2Contact, impulse: b2ContactImpulse): void {
          expect(JSON.stringify(contact.m_manifold.localPoint)).assertEqual('{"data":{"0":-3,"1":-3}}')
          expect(JSON.stringify(impulse)).assertEqual('{"normalImpulses":[3,0],"tangentImpulses":[3,0],"count":1}')
        }
      }

      let listener: b2ContactListener = new Test();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_manifold.localPoint.Copy(new b2Vec2(-3, -3));
      island.AddContact(contact)

      let constraints: b2ContactVelocityConstraint[] = b2ContactVelocityConstraint.MakeArray(1)
      constraints[0].points[0].normalImpulse = 3;
      constraints[0].points[0].tangentImpulse = 3;
      constraints[0].pointCount = 1;
      island.Report(constraints)
    })
    it('test_008_5', 0, () => {
      // Report
      let island = new b2Island();

      let bodyCapacity: number = 1;
      let contactCapacity: number = 2;
      let jointCapacity: number = 3;

      class Test extends box2d.b2ContactListener {
        PostSolve(contact: b2Contact, impulse: b2ContactImpulse): void {
          expect(JSON.stringify(contact.m_manifold.localPoint)).assertEqual('{"data":{"0":4,"1":5}}')
          expect(JSON.stringify(impulse)).assertEqual('{"normalImpulses":[4,0],"tangentImpulses":[-1,0],"count":1}')
        }
      }

      let listener: b2ContactListener = new Test();
      island.Initialize(bodyCapacity, contactCapacity, jointCapacity, listener)

      const contact: b2Contact = b2CircleContact.Create();
      contact.m_manifold.localPoint.Copy(new b2Vec2(4, 5));
      island.AddContact(contact)

      let constraints: b2ContactVelocityConstraint[] = b2ContactVelocityConstraint.MakeArray(1)
      constraints[0].points[0].normalImpulse = 4;
      constraints[0].points[0].tangentImpulse = -1;
      constraints[0].pointCount = 1;
      island.Report(constraints)
    })
  })
}