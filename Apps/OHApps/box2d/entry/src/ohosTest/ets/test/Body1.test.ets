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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import * as box2d from '@ohos/box2d'
import {
  b2Fixture,
  b2Transform, b2Vec2, XY } from '@ohos/box2d'

export default function bodyTest1() {
  describe('body_test1', () => {
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
      // CreateFixture
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
      let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
      expect(fixture).not().assertNull()
      expect(fixture.GetShape()).assertDeepEquals(shape)
    })
    it('test_001_2', 0, () => {
      // CreateFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      const shape = new box2d.b2PolygonShape();

      const vertices = [
        new box2d.b2Vec2(-4, -2),
        new box2d.b2Vec2(-4, 0),
      ];
      shape.Set(vertices, 2);
      let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
      expect(fixture).not().assertNull()
      expect(fixture.GetShape()).assertDeepEquals(shape)
    })
    it('test_001_3', 0, () => {
      // CreateFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
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
      let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
      expect(fixture).not().assertNull()
      expect(fixture.GetShape()).assertDeepEquals(shape)
    })
    it('test_001_4', 0, () => {
      // CreateFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      const shape = new box2d.b2PolygonShape();

      const vertices = [
        new box2d.b2Vec2(-4, -2),
        new box2d.b2Vec2(4, 0),
        new box2d.b2Vec2(-4, 0),
      ];
      shape.Set(vertices, 3);
      let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
      expect(fixture).not().assertNull()
      expect(fixture.GetShape()).assertDeepEquals(shape)
    })
    it('test_001_5', 0, () => {
      // CreateFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      const shape = new box2d.b2PolygonShape();

      const vertices = [
        new box2d.b2Vec2(-4, -2),
        new box2d.b2Vec2(-4, 0),
      ];
      shape.Set(vertices, 2);
      let fixture: b2Fixture = ground.CreateFixture(shape, 1.0);
      expect(fixture).not().assertNull()
      expect(fixture.GetShape()).assertDeepEquals(shape)
    })

    it('test_002_1', 0, () => {
      // DestroyFixture
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
      let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);

      ground.m_mass = 1;
      ground.m_invMass = 1;
      ground.m_I = 1;
      ground.m_invI = 1;

      expect(ground.m_fixtureCount).assertEqual(1)
      expect(ground.m_mass).assertEqual(1)
      expect(ground.m_invMass).assertEqual(1)
      expect(ground.m_I).assertEqual(1)
      expect(ground.m_invI).assertEqual(1)

      ground.DestroyFixture(fixture)
      expect(ground.m_fixtureCount).assertEqual(0)
      expect(ground.m_mass).assertEqual(0)
      expect(ground.m_invMass).assertEqual(0)
      expect(ground.m_I).assertEqual(0)
      expect(ground.m_invI).assertEqual(0)
    })
    it('test_002_2', 0, () => {
      // DestroyFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      const shape = new box2d.b2PolygonShape();

      const vertices = [
        new box2d.b2Vec2(-4, -2),
        new box2d.b2Vec2(-4, 0),
      ];
      shape.Set(vertices, 2);
      let fixture: b2Fixture = ground.CreateFixture(shape, 1.0);

      ground.m_mass = 2;
      ground.m_invMass = 2;
      ground.m_I = 2;
      ground.m_invI = 2;

      expect(ground.m_fixtureCount).assertEqual(1)
      expect(ground.m_mass).assertEqual(2)
      expect(ground.m_invMass).assertEqual(2)
      expect(ground.m_I).assertEqual(2)
      expect(ground.m_invI).assertEqual(2)

      ground.DestroyFixture(fixture)
      expect(ground.m_fixtureCount).assertEqual(0)
      expect(ground.m_mass).assertEqual(0)
      expect(ground.m_invMass).assertEqual(0)
      expect(ground.m_I).assertEqual(0)
      expect(ground.m_invI).assertEqual(0)
    })
    it('test_002_3', 0, () => {
      // DestroyFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      const shape = new box2d.b2PolygonShape();

      const vertices = [
        new box2d.b2Vec2(-4, -2),
        new box2d.b2Vec2(4, -2),
        new box2d.b2Vec2(-4, 0),
      ];
      shape.Set(vertices, 3);
      let fixture: b2Fixture = ground.CreateFixture(shape, 2.0);

      ground.m_mass = 1.5;
      ground.m_invMass = 1.5;
      ground.m_I = 1.5;
      ground.m_invI = 1.5;

      expect(ground.m_fixtureCount).assertEqual(1)
      expect(ground.m_mass).assertEqual(1.5)
      expect(ground.m_invMass).assertEqual(1.5)
      expect(ground.m_I).assertEqual(1.5)
      expect(ground.m_invI).assertEqual(1.5)

      ground.DestroyFixture(fixture)
      expect(ground.m_fixtureCount).assertEqual(0)
      expect(ground.m_mass).assertEqual(0)
      expect(ground.m_invMass).assertEqual(0)
      expect(ground.m_I).assertEqual(0)
      expect(ground.m_invI).assertEqual(0)
    })
    it('test_002_4', 0, () => {
      // DestroyFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      const shape = new box2d.b2PolygonShape();

      const vertices = [
        new box2d.b2Vec2(-4, -2),
        new box2d.b2Vec2(-4, 0),
      ];
      shape.Set(vertices, 2);
      let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);

      ground.m_mass = 3;
      ground.m_invMass = 3;
      ground.m_I = 3;
      ground.m_invI = 3;

      expect(ground.m_fixtureCount).assertEqual(1)
      expect(ground.m_mass).assertEqual(3)
      expect(ground.m_invMass).assertEqual(3)
      expect(ground.m_I).assertEqual(3)
      expect(ground.m_invI).assertEqual(3)

      ground.DestroyFixture(fixture)
      expect(ground.m_fixtureCount).assertEqual(0)
      expect(ground.m_mass).assertEqual(0)
      expect(ground.m_invMass).assertEqual(0)
      expect(ground.m_I).assertEqual(0)
      expect(ground.m_invI).assertEqual(0)
    })
    it('test_002_5', 0, () => {
      // DestroyFixture
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
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
      let fixture: b2Fixture = ground.CreateFixture(shape, 3.0);

      ground.m_mass = -1;
      ground.m_invMass = -1;
      ground.m_I = -1;
      ground.m_invI = -1;

      expect(ground.m_fixtureCount).assertEqual(1)
      expect(ground.m_mass).assertEqual(-1)
      expect(ground.m_invMass).assertEqual(-1)
      expect(ground.m_I).assertEqual(-1)
      expect(ground.m_invI).assertEqual(-1)

      ground.DestroyFixture(fixture)
      expect(ground.m_fixtureCount).assertEqual(0)
      expect(ground.m_mass).assertEqual(0)
      expect(ground.m_invMass).assertEqual(0)
      expect(ground.m_I).assertEqual(0)
      expect(ground.m_invI).assertEqual(0)
    })

    it('test_003_1', 0, () => {
      // SetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.q.SetAngle(2)
      xf.p.Set(23.0, 5.0);
      expect(ground.m_xf.q.GetAngle()).assertEqual(0)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":0,"1":0}}')

      ground.SetTransform(xf);
      expect(ground.m_xf.q.GetAngle()).assertEqual(2)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":23,"1":5}}')
    })
    it('test_003_2', 0, () => {
      // SetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.q.SetAngle(1)
      xf.p.Set(-23.0, -5.0);
      expect(ground.m_xf.q.GetAngle()).assertEqual(0)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":0,"1":0}}')

      ground.SetTransform(xf);
      expect(ground.m_xf.q.GetAngle()).assertEqual(1)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":-23,"1":-5}}')
    })
    it('test_003_3', 0, () => {
      // SetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.q.SetAngle(3)
      xf.p.Set(13.0, 15.0);
      expect(ground.m_xf.q.GetAngle()).assertEqual(0)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":0,"1":0}}')

      ground.SetTransform(xf);
      expect(ground.m_xf.q.GetAngle()).assertEqual(3)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":13,"1":15}}')
    })
    it('test_003_4', 0, () => {
      // SetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.q.SetAngle(-2)
      xf.p.Set(-13.0, -15.0);
      expect(ground.m_xf.q.GetAngle()).assertEqual(0)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":0,"1":0}}')

      ground.SetTransform(xf);
      expect(ground.m_xf.q.GetAngle()).assertEqual(-2)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":-13,"1":-15}}')
    })
    it('test_003_5', 0, () => {
      // SetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.q.SetAngle(2)
      xf.p.Set(3.0, 0.0);
      expect(ground.m_xf.q.GetAngle()).assertEqual(0)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":0,"1":0}}')

      ground.SetTransform(xf);
      expect(ground.m_xf.q.GetAngle()).assertEqual(2)
      expect(JSON.stringify(ground.m_xf.p)).assertEqual('{"data":{"0":3,"1":0}}')
    })

    it('test_004_1', 0, () => {
      // GetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(23.0, 5.0);
      ground.SetTransform(xf);
      let xf1 = ground.GetTransform();
      expect(xf1).assertDeepEquals(xf)
    })
    it('test_004_2', 0, () => {
      // GetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(13.0, 15.0);
      ground.SetTransform(xf);
      let xf1 = ground.GetTransform();
      expect(xf1).assertDeepEquals(xf)
    })
    it('test_004_3', 0, () => {
      // GetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(3.0, 0);
      ground.SetTransform(xf);
      let xf1 = ground.GetTransform();
      expect(xf1).assertDeepEquals(xf)
    })
    it('test_004_4', 0, () => {
      // GetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(-23.0, -5.0);
      ground.SetTransform(xf);
      let xf1 = ground.GetTransform();
      expect(xf1).assertDeepEquals(xf)
    })
    it('test_004_5', 0, () => {
      // GetTransform
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(-3.0, -10);
      ground.SetTransform(xf);
      let xf1 = ground.GetTransform();
      expect(xf1).assertDeepEquals(xf)
    })

    it('test_005_1', 0, () => {
      // GetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(23.0, 15.0);
      ground.SetTransform(xf);
      let pos = ground.GetPosition();
      expect(JSON.stringify(pos)).assertEqual('{"data":{"0":23,"1":15}}')
    })
    it('test_005_2', 0, () => {
      // GetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let pos = ground.GetPosition();
      expect(JSON.stringify(pos)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_005_3', 0, () => {
      // GetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(-23.0, -15.0);
      ground.SetTransform(xf);
      let pos = ground.GetPosition();
      expect(JSON.stringify(pos)).assertEqual('{"data":{"0":-23,"1":-15}}')
    })
    it('test_005_4', 0, () => {
      // GetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(3.0, 5.0);
      ground.SetTransform(xf);
      let pos = ground.GetPosition();
      expect(JSON.stringify(pos)).assertEqual('{"data":{"0":3,"1":5}}')
    })
    it('test_005_5', 0, () => {
      // GetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(-3.0, -5.0);
      ground.SetTransform(xf);
      let pos = ground.GetPosition();
      expect(JSON.stringify(pos)).assertEqual('{"data":{"0":-3,"1":-5}}')
    })

    it('test_006_1', 0, () => {
      // SetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let position: XY = {x:-10, y:-20};
      ground.SetPosition(position)

      expect(JSON.stringify(ground.GetPosition())).assertEqual('{"data":{"0":-10,"1":-20}}')
    })
    it('test_006_2', 0, () => {
      // SetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let position: XY = {x:1, y:2};
      ground.SetPosition(position)

      expect(JSON.stringify(ground.GetPosition())).assertEqual('{"data":{"0":1,"1":2}}')
    })
    it('test_006_3', 0, () => {
      // SetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let position: XY = {x:-1, y:-2};
      ground.SetPosition(position)

      expect(JSON.stringify(ground.GetPosition())).assertEqual('{"data":{"0":-1,"1":-2}}')
    })
    it('test_006_4', 0, () => {
      // SetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let position: XY = {x:0, y:0};
      ground.SetPosition(position)

      expect(JSON.stringify(ground.GetPosition())).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_006_5', 0, () => {
      // SetPosition
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let position: XY = {x:3, y:3};
      ground.SetPosition(position)

      expect(JSON.stringify(ground.GetPosition())).assertEqual('{"data":{"0":3,"1":3}}')
    })

    it('test_007_1', 0, () => {
      // GetAngle
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let angle = ground.GetAngle()
      expect(angle).assertEqual(0)
    })
    it('test_007_2', 0, () => {
      // GetAngle
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetAngle(1)
      let angle = ground.GetAngle()
      expect(angle).assertEqual(1)
    })
    it('test_007_3', 0, () => {
      // GetAngle
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetAngle(2)
      let angle = ground.GetAngle()
      expect(angle).assertEqual(2)
    })
    it('test_007_4', 0, () => {
      // GetAngle
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetAngle(-1)
      let angle = ground.GetAngle()
      expect(angle).assertEqual(-1)
    })
    it('test_007_5', 0, () => {
      // GetAngle
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.SetAngle(-10)
      let angle = ground.GetAngle()
      expect(angle).assertEqual(-10)
    })

    it('test_008_1', 0, () => {
      // GetWorldCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let center = ground.GetWorldCenter()
      expect(JSON.stringify(center)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_008_2', 0, () => {
      // GetWorldCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      // ground.m_sweep.c = new b2Vec2(2, 3);
      ground.m_sweep.c.Copy(new b2Vec2(2, 3));
      let center = ground.GetWorldCenter()
      expect(JSON.stringify(center)).assertEqual('{"data":{"0":2,"1":3}}')
    })
    it('test_008_3', 0, () => {
      // GetWorldCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_sweep.c.Copy(new b2Vec2(1, 1));
      let center = ground.GetWorldCenter()
      expect(JSON.stringify(center)).assertEqual('{"data":{"0":1,"1":1}}')
    })
    it('test_008_4', 0, () => {
      // GetWorldCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_sweep.c.Copy(new b2Vec2(-2, -3));
      let center = ground.GetWorldCenter()
      expect(JSON.stringify(center)).assertEqual('{"data":{"0":-2,"1":-3}}')
    })
    it('test_008_5', 0, () => {
      // GetWorldCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_sweep.c.Copy(new b2Vec2(-1, -1));
      let center = ground.GetWorldCenter()
      expect(JSON.stringify(center)).assertEqual('{"data":{"0":-1,"1":-1}}')
    })

    it('test_009_1', 0, () => {
      // GetLocalCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let localCenter = ground.GetLocalCenter();
      expect(JSON.stringify(localCenter)).assertEqual('{"data":{"0":0,"1":0}}')
    })
    it('test_009_2', 0, () => {
      // GetLocalCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let center: b2Vec2 = new b2Vec2(1, 1);
      ground.m_sweep.localCenter.Copy(center);
      let localCenter = ground.GetLocalCenter();
      expect(JSON.stringify(localCenter)).assertEqual('{"data":{"0":1,"1":1}}')
    })
    it('test_009_3', 0, () => {
      // GetLocalCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let center: b2Vec2 = new b2Vec2(-1, -1);
      ground.m_sweep.localCenter.Copy(center);
      let localCenter = ground.GetLocalCenter();
      expect(JSON.stringify(localCenter)).assertEqual('{"data":{"0":-1,"1":-1}}')
    })
    it('test_009_4', 0, () => {
      // GetLocalCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let center: b2Vec2 = new b2Vec2(-10, -10);
      ground.m_sweep.localCenter.Copy(center);
      let localCenter = ground.GetLocalCenter();
      expect(JSON.stringify(localCenter)).assertEqual('{"data":{"0":-10,"1":-10}}')
    })
    it('test_009_5', 0, () => {
      // GetLocalCenter
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let center: b2Vec2 = new b2Vec2(11, -15);
      ground.m_sweep.localCenter.Copy(center);
      let localCenter = ground.GetLocalCenter();
      expect(JSON.stringify(localCenter)).assertEqual('{"data":{"0":11,"1":-15}}')
    })

    it('test_010_1', 0, () => {
      // SetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:1, y:2};
      ground.m_type = 1;
      ground.SetLinearVelocity(v);
      expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":1,"1":2}}');
    })
    it('test_010_2', 0, () => {
      // SetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:10, y:20};
      ground.m_type = 1;
      ground.SetLinearVelocity(v);
      expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":10,"1":20}}');
    })
    it('test_010_3', 0, () => {
      // SetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:-10, y:-20};
      ground.m_type = 1;
      ground.SetLinearVelocity(v);
      expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":-10,"1":-20}}');
    })
    it('test_010_4', 0, () => {
      // SetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:-1, y:-2};
      ground.m_type = 1;
      ground.SetLinearVelocity(v);
      expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":-1,"1":-2}}');
    })
    it('test_010_5', 0, () => {
      // SetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:0, y:0};
      ground.m_type = 1;
      ground.SetLinearVelocity(v);
      expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
    })
    it('test_010_6', 0, () => {
      // GetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:10, y:20};
      ground.m_linearVelocity.Copy(v);
      expect(JSON.stringify(ground.GetLinearVelocity())).assertEqual('{"data":{"0":10,"1":20}}');
    })
    it('test_010_7', 0, () => {
      // GetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:11, y:2};
      ground.m_linearVelocity.Copy(v);
      expect(JSON.stringify(ground.GetLinearVelocity())).assertEqual('{"data":{"0":11,"1":2}}');
    })
    it('test_010_8', 0, () => {
      // GetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:-10, y:-20};
      ground.m_linearVelocity.Copy(v);
      expect(JSON.stringify(ground.GetLinearVelocity())).assertEqual('{"data":{"0":-10,"1":-20}}');
    })
    it('test_010_9', 0, () => {
      // GetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:-1, y:-2};
      ground.m_linearVelocity.Copy(v);
      expect(JSON.stringify(ground.GetLinearVelocity())).assertEqual('{"data":{"0":-1,"1":-2}}');
    })
    it('test_010_10', 0, () => {
      // GetLinearVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let v: XY = {x:0, y:0};
      ground.m_linearVelocity.Copy(v);
      expect(JSON.stringify(ground.GetLinearVelocity())).assertEqual('{"data":{"0":0,"1":0}}');
    })

    it('test_011_1', 0, () => {
      // SetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let w: number = 12;
      ground.SetAngularVelocity(w);
      expect(ground.m_angularVelocity).assertEqual(0)
    })
    it('test_011_2', 0, () => {
      // SetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = -12;
      ground.SetAngularVelocity(w);
      expect(ground.m_angularVelocity).assertEqual(w)
    })
    it('test_011_3', 0, () => {
      // SetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = -2;
      ground.SetAngularVelocity(w);
      expect(ground.m_angularVelocity).assertEqual(w)
    })
    it('test_011_4', 0, () => {
      // SetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = 2;
      ground.SetAngularVelocity(w);
      expect(ground.m_angularVelocity).assertEqual(w)
    })
    it('test_011_5', 0, () => {
      // SetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = 1;
      ground.SetAngularVelocity(w);
      expect(ground.m_angularVelocity).assertEqual(w)
    })
    it('test_011_6', 0, () => {
      // GetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let w: number = 12;
      ground.SetAngularVelocity(w);
      expect(ground.GetAngularVelocity()).assertEqual(0)
    })
    it('test_011_7', 0, () => {
      // GetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = -12;
      ground.SetAngularVelocity(w);
      expect(ground.GetAngularVelocity()).assertEqual(w)
    })
    it('test_011_8', 0, () => {
      // GetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = -2;
      ground.SetAngularVelocity(w);
      expect(ground.GetAngularVelocity()).assertEqual(w)
    })
    it('test_011_9', 0, () => {
      // GetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = 2;
      ground.SetAngularVelocity(w);
      expect(ground.GetAngularVelocity()).assertEqual(w)
    })
    it('test_011_10', 0, () => {
      // GetAngularVelocity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      ground.m_type = 1;
      let w: number = 1;
      ground.SetAngularVelocity(w);
      expect(ground.GetAngularVelocity()).assertEqual(w)
    })

    it('test_012_1', 0, () => {
      // GetGravityScale
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let gravityScale = ground.GetGravityScale()
      expect(gravityScale).assertEqual(1)
    })
    it('test_012_2', 0, () => {
      // GetGravityScale
      const bd = new box2d.b2BodyDef();
      bd.gravityScale = -2;
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let gravityScale = ground.GetGravityScale()
      expect(gravityScale).assertEqual(-2)
    })
    it('test_012_3', 0, () => {
      // GetGravityScale
      const bd = new box2d.b2BodyDef();
      bd.gravityScale = 3;
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let gravityScale = ground.GetGravityScale()
      expect(gravityScale).assertEqual(3)
    })
    it('test_012_4', 0, () => {
      // GetGravityScale
      const bd = new box2d.b2BodyDef();
      bd.gravityScale = -3;
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let gravityScale = ground.GetGravityScale()
      expect(gravityScale).assertEqual(-3)
    })
    it('test_012_5', 0, () => {
      // GetGravityScale
      const bd = new box2d.b2BodyDef();
      bd.gravityScale = 5;
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
      let m_world = new box2d.b2World(gravity);
      const ground = m_world.CreateBody(bd);
      let gravityScale = ground.GetGravityScale()
      expect(gravityScale).assertEqual(5)
    })
  })
}