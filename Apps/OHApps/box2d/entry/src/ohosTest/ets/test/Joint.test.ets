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
  b2AreaJoint,
  b2AreaJointDef,
  b2Body,
  b2DistanceJoint,
  b2DistanceJointDef,
  b2IBodyDef,
  b2IJointDef,
  b2Joint,
  b2JointType,
  b2LimitState,
  b2MotorJoint,
  b2MotorJointDef,
  b2Position,
  b2PrismaticJoint,
  b2PrismaticJointDef,
  b2PulleyJoint,
  b2PulleyJointDef,
  b2RevoluteJoint, b2RevoluteJointDef,
  b2SolverData,
  b2Vec2,
  b2Velocity,
  b2WheelJoint,
  b2WheelJointDef
} from '@ohos/box2d'

export default function jointTest() {
  describe('joint_test', () => {
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
      // GetType
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let type = join.GetType();
      expect(type).assertEqual(b2JointType.e_revoluteJoint)
    })
    it('test_001_2', 0, () => {
      // GetType
      let def: b2PrismaticJointDef = new b2PrismaticJointDef();
      let join = new b2PrismaticJoint(def);
      let type = join.GetType();
      expect(type).assertEqual(b2JointType.e_prismaticJoint)
    })
    it('test_001_3', 0, () => {
      // GetType
      let def: b2WheelJointDef = new b2WheelJointDef();
      let join = new b2WheelJoint(def);
      let type = join.GetType();
      expect(type).assertEqual(b2JointType.e_wheelJoint)
    })
    it('test_001_4', 0, () => {
      // GetType
      let def: b2DistanceJointDef = new b2DistanceJointDef();
      let join = new b2DistanceJoint(def);
      let type = join.GetType();
      expect(type).assertEqual(b2JointType.e_distanceJoint)
    })
    it('test_001_5', 0, () => {
      // GetType
      let def: b2PulleyJointDef = new b2PulleyJointDef();
      let join = new b2PulleyJoint(def);
      let type = join.GetType();
      expect(type).assertEqual(b2JointType.e_pulleyJoint)
    })

    it('test_002_1', 0, () => {
      // GetBodyA
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let m_bodyA = join.GetBodyA();
      expect(m_bodyA).assertUndefined()
    })
    it('test_002_2', 0, () => {
      // GetBodyA
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def1);
      body.m_sleepTime = 1;
      join.m_bodyA = body;
      let m_bodyA = join.GetBodyA();
      expect(m_bodyA).not().assertUndefined()
      expect(m_bodyA.m_sleepTime).assertEqual(1)
    })
    it('test_002_3', 0, () => {
      // GetBodyA
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def1);
      body.m_sleepTime = 3;
      join.m_bodyA = body;
      let m_bodyA = join.GetBodyA();
      expect(m_bodyA).not().assertUndefined()
      expect(m_bodyA.m_sleepTime).assertEqual(3)
    })

    it('test_003_1', 0, () => {
      // GetBodyB
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let body = join.GetBodyB();
      expect(body).assertUndefined()
    })
    it('test_003_2', 0, () => {
      // GetBodyB
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def1);
      body.m_sleepTime = 3;
      join.m_bodyB = body;
      let m_bodyB = join.GetBodyB();
      expect(m_bodyB).not().assertUndefined()
      expect(m_bodyB.m_sleepTime).assertEqual(3)
    })
    it('test_003_3', 0, () => {
      // GetBodyB
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(10, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      let body: b2Body = m_world.CreateBody(def1);
      body.m_sleepTime = 2;
      join.m_bodyB = body;
      let m_bodyB = join.GetBodyB();
      expect(m_bodyB).not().assertUndefined()
      expect(m_bodyB.m_sleepTime).assertEqual(2)
    })

    it('test_004_1', 0, () => {
      // GetAnchorA
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let DrawJoint_s_p1: b2Vec2 = new b2Vec2();
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      join.m_bodyA = m_world.CreateBody(def1);
      let out = join.GetAnchorA(DrawJoint_s_p1);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_004_2', 0, () => {
      // GetAnchorA
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let DrawJoint_s_p1: b2Vec2 = new b2Vec2();
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      join.m_bodyA = m_world.CreateBody(def1);

      join.m_localAnchorA.Copy(new b2Vec2(1,2))
      let out = join.GetAnchorA(DrawJoint_s_p1);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":1,"1":2}}')
    })
    it('test_004_3', 0, () => {
      // GetAnchorA
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let DrawJoint_s_p1: b2Vec2 = new b2Vec2();
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      join.m_bodyA = m_world.CreateBody(def1);
      join.m_localAnchorA.Copy(new b2Vec2(3,1))
      let out = join.GetAnchorA(DrawJoint_s_p1);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":3,"1":1}}')
    })

    it('test_005_1', 0, () => {
      // GetAnchorB
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let DrawJoint_s_p1: b2Vec2 = new b2Vec2();

      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      join.m_bodyB = m_world.CreateBody(def1);

      let out = join.GetAnchorB(DrawJoint_s_p1);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_005_2', 0, () => {
      // GetAnchorB
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let DrawJoint_s_p1: b2Vec2 = new b2Vec2();
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      join.m_bodyB = m_world.CreateBody(def1);

      join.m_localAnchorB.Copy(new b2Vec2(1,2))
      let out = join.GetAnchorB(DrawJoint_s_p1);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":1,"1":2}}')
    })
    it('test_005_3', 0, () => {
      // GetAnchorB
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let DrawJoint_s_p1: b2Vec2 = new b2Vec2();
      let gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world: box2d.b2World = new box2d.b2World(gravity);
      let def1: b2IBodyDef = new box2d.b2BodyDef();
      join.m_bodyB = m_world.CreateBody(def1);
      join.m_localAnchorB.Copy(new b2Vec2(3,1))
      let out = join.GetAnchorB(DrawJoint_s_p1);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":3,"1":1}}')
    })

    it('test_006_1', 0, () => {
      // GetReactionForce
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let vec: b2Vec2 = new b2Vec2();
      let out = join.GetReactionForce(2, vec);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_006_2', 0, () => {
      // GetReactionForce
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let vec: b2Vec2 = new b2Vec2();
      join.m_impulse.SetXYZ(1,2,3);
      let out = join.GetReactionForce(2, vec);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":2,"1":4}}')
    })
    it('test_006_3', 0, () => {
      // GetReactionForce
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let vec: b2Vec2 = new b2Vec2();
      join.m_impulse.SetXYZ(-1,-2,3);
      let out = join.GetReactionForce(2, vec);
      expect(JSON.stringify(out)).assertEqual('{"data":{"0":-2,"1":-4}}')
    })

    it('test_007_1', 0, () => {
      // GetReactionTorque
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let result = join.GetReactionTorque(2);
      expect(result).assertEqual(0)
    })
    it('test_007_2', 0, () => {
      // GetReactionTorque
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.m_impulse.SetXYZ(-1,-2,-3);
      let result = join.GetReactionTorque(2);
      expect(result).assertEqual(-6)
    })
    it('test_007_3', 0, () => {
      // GetReactionTorque
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.m_impulse.SetXYZ(-1,-2,3);
      let result = join.GetReactionTorque(2);
      expect(result).assertEqual(6)
    })

    it('test_008_1', 0, () => {
      // GetNext
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let next = join.GetNext();
      expect(next).assertNull();
    })
    it('test_008_2', 0, () => {
      // GetNext
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);

      let def1: b2IJointDef = new b2MotorJointDef();
      let joint: b2Joint = new b2MotorJoint(def1);
      join.m_next = joint;
      let next = join.GetNext();
      expect(next).not().assertNull();
      expect(next instanceof  b2MotorJoint).assertEqual(true)
    })
    it('test_008_3', 0, () => {
      // GetNext
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);

      let def1: b2AreaJointDef = new b2AreaJointDef();
      let joint: b2Joint = new b2AreaJoint(def1);
      join.m_next = joint;
      let next = join.GetNext();
      expect(next).not().assertNull();
      expect(next instanceof  b2AreaJoint).assertEqual(true)
    })
    it('test_008_4', 0, () => {
      // GetNext
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);

      let def1: b2DistanceJointDef = new b2DistanceJointDef();
      let joint: b2Joint = new b2DistanceJoint(def1);
      join.m_next = joint;
      let next = join.GetNext();
      expect(next).not().assertNull();
      expect(next instanceof b2DistanceJoint).assertEqual(true)
    })
    it('test_008_5', 0, () => {
      // GetNext
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);

      let def1: b2PrismaticJointDef = new b2PrismaticJointDef();
      let joint: b2Joint = new b2PrismaticJoint(def1);
      join.m_next = joint;
      let next = join.GetNext();
      expect(next).not().assertNull();
      expect(next instanceof  b2PrismaticJoint).assertEqual(true)
    })

    it('test_009_1', 0, () => {
      // GetUserData
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.m_userData = 1;
      let data = join.GetUserData() as number;
      expect(data).assertEqual(1)
    })
    it('test_009_2', 0, () => {
      // GetUserData
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.m_userData = -1;
      let data = join.GetUserData() as number;
      expect(data).assertEqual(-1)
    })
    it('test_009_3', 0, () => {
      // GetUserData
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.m_userData = 0;
      let data = join.GetUserData() as number;
      expect(data).assertEqual(0)
    })

    it('test_010_1', 0, () => {
      // SetUserData
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.SetUserData(1);
      expect(join.m_userData).assertEqual(1)
    })
    it('test_010_2', 0, () => {
      // SetUserData
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.SetUserData(-1);
      expect(join.m_userData).assertEqual(-1)
    })
    it('test_010_3', 0, () => {
      // SetUserData
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.SetUserData(0);
      expect(join.m_userData).assertEqual(0)
    })

    it('test_011_1', 0, () => {
      // IsActive
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = body;
      join.m_bodyB = body;
      let flag = join.IsActive()
      expect(flag).assertEqual(true)
    })
    it('test_011_2', 0, () => {
      // IsActive
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = body;
      join.m_bodyB = body;
      join.m_bodyA.m_activeFlag = false;
      join.m_bodyB.m_activeFlag = true;
      let flag = join.IsActive()
      expect(flag).assertEqual(true)
    })
    it('test_011_3', 0, () => {
      // IsActive
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = body;
      join.m_bodyB = body;
      join.m_bodyA.m_activeFlag = true;
      join.m_bodyB.m_activeFlag = false;
      let flag = join.IsActive()
      expect(flag).assertEqual(false)
    })
    it('test_011_4', 0, () => {
      // IsActive
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = body;
      join.m_bodyB = body;
      join.m_bodyA.m_activeFlag = true;
      join.m_bodyB.m_activeFlag = true;
      let flag = join.IsActive()
      expect(flag).assertEqual(true)
    })

    it('test_012_1', 0, () => {
      // InitVelocityConstraints
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let bodyA: b2Body = m_world.CreateBody(bd);
      let bodyB: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = bodyA;
      join.m_bodyB = bodyB;
      join.m_bodyA.m_islandIndex = 0;
      join.m_bodyB.m_islandIndex = 0;
      join.m_bodyA.m_invI = 1;
      join.m_bodyB.m_invI = 2;

      let s_solverData = new b2SolverData();
      s_solverData.positions = b2Position.MakeArray(2);
      s_solverData.velocities = b2Velocity.MakeArray(2);

      join.InitVelocityConstraints(s_solverData)
      expect(join.m_indexA).assertEqual(0)
      expect(join.m_indexB).assertEqual(0)
      expect(join.m_invIA).assertEqual(1)
      expect(join.m_invIB).assertEqual(2)
    })
    it('test_012_2', 0, () => {
      // InitVelocityConstraints
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let bodyA: b2Body = m_world.CreateBody(bd);
      let bodyB: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = bodyA;
      join.m_bodyB = bodyB;
      join.m_bodyA.m_islandIndex = 1;
      join.m_bodyB.m_islandIndex = 1;
      join.m_bodyA.m_invI = -1;
      join.m_bodyB.m_invI = -2;

      let s_solverData = new b2SolverData();
      s_solverData.positions = b2Position.MakeArray(2);
      s_solverData.velocities = b2Velocity.MakeArray(2);

      join.InitVelocityConstraints(s_solverData)
      expect(join.m_indexA).assertEqual(1)
      expect(join.m_indexB).assertEqual(1)
      expect(join.m_invIA).assertEqual(-1)
      expect(join.m_invIB).assertEqual(-2)
    })
    it('test_012_3', 0, () => {
      // InitVelocityConstraints
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let bodyA: b2Body = m_world.CreateBody(bd);
      let bodyB: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = bodyA;
      join.m_bodyB = bodyB;
      join.m_bodyA.m_islandIndex = 1;
      join.m_bodyB.m_islandIndex = 0;
      join.m_bodyA.m_invI = 0;
      join.m_bodyB.m_invI = 1;

      let s_solverData = new b2SolverData();
      s_solverData.positions = b2Position.MakeArray(2);
      s_solverData.velocities = b2Velocity.MakeArray(2);

      join.InitVelocityConstraints(s_solverData)
      expect(join.m_indexA).assertEqual(1)
      expect(join.m_indexB).assertEqual(0)
      expect(join.m_invIA).assertEqual(0)
      expect(join.m_invIB).assertEqual(1)
    })

    it('test_013_1', 0, () => {
      // SolveVelocityConstraints
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let bodyA: b2Body = m_world.CreateBody(bd);
      let bodyB: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = bodyA;
      join.m_bodyB = bodyB;
      join.m_bodyA.m_islandIndex = 0;
      join.m_bodyB.m_islandIndex = 0;
      join.m_bodyA.m_invI = 1;
      join.m_bodyB.m_invI = 2;
      let s_solverData = new b2SolverData();
      s_solverData.positions = b2Position.MakeArray(2);
      s_solverData.velocities = b2Velocity.MakeArray(2);
      join.SolveVelocityConstraints(s_solverData)
      expect(JSON.stringify(join.m_impulse)).assertEqual('{"data":{"0":0,"1":0,"2":0}}')
      expect(join.m_motorImpulse).assertEqual(0)
    })
    it('test_013_2', 0, () => {
      // SolveVelocityConstraints
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let bodyA: b2Body = m_world.CreateBody(bd);
      let bodyB: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = bodyA;
      join.m_bodyB = bodyB;
      join.m_bodyA.m_islandIndex = 0;
      join.m_bodyB.m_islandIndex = 0;
      join.m_bodyA.m_invI = 1;
      join.m_bodyB.m_invI = 2;
      join.m_indexB = 1;
      join.m_invIB = -1;
      join.m_limitState = b2LimitState.e_atUpperLimit;
      join.m_enableLimit = true;
      join.m_motorImpulse = 2;
      join.m_motorMass = 3;
      join.m_maxMotorTorque = 1.2;
      join.m_mass.SetVVV({x:1,y:1,z:1},{x:2,y:2,z:2}, {x:3,y:3,z:3});
      join.m_impulse.SetXYZ(1,2,3);
      let s_solverData = new b2SolverData();
      s_solverData.positions = b2Position.MakeArray(2);
      s_solverData.velocities = b2Velocity.MakeArray(2);
      s_solverData.step.dt = 3;
      const vA: b2Vec2 = s_solverData.velocities[join.m_indexA].v.Copy(new b2Vec2(1,2));
      let wA: number = s_solverData.velocities[join.m_indexA].w = 1;
      const vB: b2Vec2 = s_solverData.velocities[join.m_indexB].v.Copy(new b2Vec2(1,2));
      let wB: number = s_solverData.velocities[join.m_indexB].w = 2;

      join.SolveVelocityConstraints(s_solverData)
      expect(JSON.stringify(join.m_impulse)).assertEqual('{"data":{"0":1,"1":2,"2":0}}')
      expect(join.m_motorImpulse).assertEqual(2)
    })

    it('test_014_1', 0, () => {
      // SolvePositionConstraints
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let bodyA: b2Body = m_world.CreateBody(bd);
      let bodyB: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = bodyA;
      join.m_bodyB = bodyB;
      join.m_bodyA.m_islandIndex = 0;
      join.m_bodyB.m_islandIndex = 0;
      join.m_bodyA.m_invI = 1;
      join.m_bodyB.m_invI = 2;
      join.m_invIB = -1;

      join.m_upperAngle = -1
      let s_solverData = new b2SolverData();
      s_solverData.positions = b2Position.MakeArray(2);
      s_solverData.velocities = b2Velocity.MakeArray(2);
      // s_solverData.step.dt = 3;
      let flag = join.SolvePositionConstraints(s_solverData)
      expect(flag).assertEqual(true)
    })
    it('test_014_2', 0, () => {
      // SolvePositionConstraints
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let bodyA: b2Body = m_world.CreateBody(bd);
      let bodyB: b2Body = m_world.CreateBody(bd);
      join.m_bodyA = bodyA;
      join.m_bodyB = bodyB;
      join.m_bodyA.m_islandIndex = 0;
      join.m_bodyB.m_islandIndex = 0;
      join.m_bodyA.m_invI = 1;
      join.m_bodyB.m_invI = 2;
      join.m_indexB = 1;
      join.m_invIB = -1;
      join.m_enableMotor = true;
      join.m_limitState = b2LimitState.e_equalLimits;
      join.m_enableLimit = true;
      join.m_motorImpulse = 2;
      join.m_motorMass = 3;
      join.m_maxMotorTorque = 1.2;
      join.m_mass.SetVVV({x:1,y:1,z:1},{x:2,y:2,z:2}, {x:3,y:3,z:3});
      join.m_impulse.SetXYZ(1,2,3);

      join.m_upperAngle = 2
      let s_solverData = new b2SolverData();
      s_solverData.positions = b2Position.MakeArray(2);
      s_solverData.velocities = b2Velocity.MakeArray(2);
      s_solverData.step.dt = 3;

      const cA: b2Vec2 = s_solverData.positions[join.m_indexA].c.Copy(new b2Vec2(1,2));
      let aA: number = s_solverData.positions[join.m_indexA].a = 1;
      const cB: b2Vec2 = s_solverData.positions[join.m_indexB].c.Copy(new b2Vec2(3,4));
      let aB: number = s_solverData.positions[join.m_indexB].a = 2;

      let flag = join.SolvePositionConstraints(s_solverData)
      expect(flag).assertEqual(false)
    })

    it('test_015_1', 0, () => {
      // GetCollideConnected
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      let flag = join.GetCollideConnected()
      expect(flag).assertEqual(false)
    })
    it('test_015_2', 0, () => {
      // GetCollideConnected
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.m_collideConnected = false;
      let flag = join.GetCollideConnected()
      expect(flag).assertEqual(false)
    })
    it('test_015_3', 0, () => {
      // GetCollideConnected
      let def: b2RevoluteJointDef = new b2RevoluteJointDef();
      let join = new b2RevoluteJoint(def);
      join.m_collideConnected = true;
      let flag = join.GetCollideConnected()
      expect(flag).assertEqual(true)
    })
  })
}