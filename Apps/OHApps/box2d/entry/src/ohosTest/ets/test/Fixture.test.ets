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
  b2Body,
  b2ChainShape,
  b2CircleShape,
  b2EdgeShape,
  b2Filter,
  b2Fixture,
  b2FixtureDef,
  b2FixtureProxy,
  b2PolygonShape,
  b2RayCastInput,
  b2RayCastOutput,
  b2ShapeType,
  b2Vec2,
  XY
} from '@ohos/box2d'

export default function fixtureTest() {
  describe('fixture_test', () => {
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
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let type: b2ShapeType = fixture.GetType();
      expect(type).assertEqual(b2ShapeType.e_circleShape)
    })
    it('test_001_2', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2ChainShape();
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let type: b2ShapeType = fixture.GetType();
      expect(type).assertEqual(b2ShapeType.e_chainShape)
    })
    it('test_001_3', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2EdgeShape();
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let type: b2ShapeType = fixture.GetType();
      expect(type).assertEqual(b2ShapeType.e_edgeShape)
    })
    it('test_001_4', 0, () => {
      // GetType
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2PolygonShape();
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let type: b2ShapeType = fixture.GetType();
      expect(type).assertEqual(b2ShapeType.e_polygonShape)
    })

    it('test_002_1', 0, () => {
      // GetShape
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let shape1 = fixture.GetShape();
      expect(shape1 instanceof b2CircleShape).assertEqual(true)
    })
    it('test_002_2', 0, () => {
      // GetShape
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2ChainShape();
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let shape1 = fixture.GetShape();
      expect(shape1 instanceof b2ChainShape).assertEqual(true)
    })
    it('test_002_3', 0, () => {
      // GetShape
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2EdgeShape();
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let shape1 = fixture.GetShape();
      expect(shape1 instanceof b2EdgeShape).assertEqual(true)
    })
    it('test_002_4', 0, () => {
      // GetShape
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2PolygonShape();
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let shape1 = fixture.GetShape();
      expect(shape1 instanceof b2PolygonShape).assertEqual(true)
    })

    it('test_003_1', 0, () => {
      // IsSensor
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let flag = fixture.IsSensor();
      expect(flag).assertFalse()
    })
    it('test_003_2', 0, () => {
      // IsSensor
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_isSensor = false;
      let flag = fixture.IsSensor();
      expect(flag).assertFalse()
    })
    it('test_003_3', 0, () => {
      // IsSensor
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_isSensor = true;
      let flag = fixture.IsSensor();
      expect(flag).assertTrue()
    })

    it('test_004_1', 0, () => {
      // SetSensor
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetSensor(true);
      expect(fixture.IsSensor()).assertTrue()
    })
    it('test_004_2', 0, () => {
      // SetSensor
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetSensor(false);
      expect(fixture.IsSensor()).assertFalse()
    })

    it('test_005_1', 0, () => {
      // SetFilterData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let filter: b2Filter = new b2Filter();
      filter.groupIndex = 1;
      fixture.SetFilterData(filter)
      expect(fixture.m_filter).assertDeepEquals(filter)
    })
    it('test_005_2', 0, () => {
      // SetFilterData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let filter: b2Filter = new b2Filter();
      filter.groupIndex = 2;
      fixture.SetFilterData(filter)
      expect(fixture.m_filter).assertDeepEquals(filter)
    })
    it('test_005_3', 0, () => {
      // SetFilterData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let filter: b2Filter = new b2Filter();
      filter.groupIndex = 3;
      fixture.SetFilterData(filter)
      expect(fixture.m_filter).assertDeepEquals(filter)
    })

    it('test_006_1', 0, () => {
      // GetFilterData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let filterData = fixture.GetFilterData();
      expect(JSON.stringify(filterData)).assertEqual('{"categoryBits":1,"maskBits":65535,"groupIndex":0}')
    })
    it('test_006_2', 0, () => {
      // GetFilterData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let filter: b2Filter = new b2Filter();
      filter.groupIndex = 3;
      fixture.SetFilterData(filter)
      let filterData = fixture.GetFilterData();
      expect(JSON.stringify(filterData)).assertEqual('{"categoryBits":1,"maskBits":65535,"groupIndex":3}')
    })
    it('test_006_3', 0, () => {
      // GetFilterData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let filter: b2Filter = new b2Filter();
      filter.groupIndex = 2;
      fixture.SetFilterData(filter)
      let filterData = fixture.GetFilterData();
      expect(JSON.stringify(filterData)).assertEqual('{"categoryBits":1,"maskBits":65535,"groupIndex":2}')
    })

    it('test_008_1', 0, () => {
      // GetBody
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let body1 = fixture.GetBody();
      expect(body1).assertEqual(body)
    })
    it('test_008_2', 0, () => {
      // GetBody
      const bd = new box2d.b2BodyDef();
      bd.bullet = false;
      bd.fixedRotation = false;
      bd.allowSleep = true;
      bd.awake = false;
      bd.active = false;
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let body1 = fixture.GetBody();
      expect(body1).assertEqual(body)
    })
    it('test_008_3', 0, () => {
      // GetBody
      const bd = new box2d.b2BodyDef();
      bd.bullet = true;
      bd.fixedRotation = true;
      bd.allowSleep = true;
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let body1 = fixture.GetBody();
      expect(body1).assertEqual(body)
    })

    it('test_009_1', 0, () => {
      // GetNext
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let next = fixture.GetNext()
      expect(next).assertNull();
    })
    it('test_009_2', 0, () => {
      // GetNext
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_next = new b2Fixture(body, def);
      let next = fixture.GetNext()
      expect(next).not().assertNull();
    })
    it('test_009_3', 0, () => {
      // GetNext
      const bd = new box2d.b2BodyDef();
      bd.bullet = true;
      bd.fixedRotation = true;
      bd.allowSleep = true;
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_next = new b2Fixture(body, def);
      let next = fixture.GetNext()
      expect(next).not().assertNull();
    })

    it('test_010_1', 0, () => {
      // GetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let data: ESObject = fixture.GetUserData()
      expect(data).assertNull()
    })
    it('test_010_2', 0, () => {
      // GetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_userData = 1;
      let data: number = fixture.GetUserData()
      expect(data).assertEqual(1)
    })
    it('test_010_3', 0, () => {
      // GetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_userData = -1;
      let data: number = fixture.GetUserData()
      expect(data).assertEqual(-1)
    })

    it('test_011_1', 0, () => {
      // SetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetUserData(-1)
      expect(fixture.m_userData).assertEqual(-1)
    })
    it('test_011_2', 0, () => {
      // SetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetUserData(1)
      expect(fixture.m_userData).assertEqual(1)
    })
    it('test_011_3', 0, () => {
      // SetUserData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetUserData(0)
      expect(fixture.m_userData).assertEqual(0)
    })

    it('test_012_1', 0, () => {
      // TestPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: XY = {
        x: 1, y: 2
      }
      let flag = fixture.TestPoint(p)
      expect(flag).assertEqual(false)
    })
    it('test_012_2', 0, () => {
      // TestPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: XY = {
        x: 0, y: 0
      }
      let flag = fixture.TestPoint(p)
      expect(flag).assertEqual(true)
    })
    it('test_012_3', 0, () => {
      // TestPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: XY = {
        x: -1, y: -2
      }
      let flag = fixture.TestPoint(p)
      expect(flag).assertEqual(false)
    })
    it('test_012_4', 0, () => {
      // TestPoint
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: XY = {
        x: 11, y: -12
      }
      let flag = fixture.TestPoint(p)
      expect(flag).assertEqual(false)
    })

    it('test_013_1', 0, () => {
      // ComputeDistance
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: b2Vec2 = new b2Vec2(2, 3);
      let normal: b2Vec2 = new b2Vec2(1, 4);
      let childIndex: number = 0
      let result = fixture.ComputeDistance(p, normal, childIndex)
      expect(result).assertEqual(1.6055512754639891)
    })
    it('test_013_2', 0, () => {
      // ComputeDistance
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: b2Vec2 = new b2Vec2(-2, 3);
      let normal: b2Vec2 = new b2Vec2(5, 2);
      let childIndex: number = 0
      let result = fixture.ComputeDistance(p, normal, childIndex)
      expect(result).assertEqual(1.6055512754639891)
    })
    it('test_013_3', 0, () => {
      // ComputeDistance
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: b2Vec2 = new b2Vec2(10, -3);
      let normal: b2Vec2 = new b2Vec2(2, 5);
      let childIndex: number = 0
      let result = fixture.ComputeDistance(p, normal, childIndex)
      expect(result).assertEqual(8.44030650891055)
    })
    it('test_013_4', 0, () => {
      // ComputeDistance
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let p: b2Vec2 = new b2Vec2(5, 5);
      let normal: b2Vec2 = new b2Vec2(20, -4);
      let childIndex: number = 0
      let result = fixture.ComputeDistance(p, normal, childIndex)
      expect(result).assertEqual(5.0710678118654755)
    })

    it('test_014_1', 0, () => {
      // RayCast
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let output: b2RayCastOutput = new box2d.b2RayCastOutput();
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      let childIndex: number = 0;

      let flag = fixture.RayCast(output, input, childIndex)
      expect(flag).assertEqual(false)
    })
    it('test_014_2', 0, () => {
      // RayCast
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let output: b2RayCastOutput = new box2d.b2RayCastOutput();
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Copy(new b2Vec2(1, 1));
      input.p2.Copy(new b2Vec2(2, 2));
      input.maxFraction = 0;
      let childIndex: number = 0;
      let flag = fixture.RayCast(output, input, childIndex)
      expect(flag).assertEqual(false)
    })
    it('test_014_3', 0, () => {
      // RayCast
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let output: b2RayCastOutput = new box2d.b2RayCastOutput();
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Copy(new b2Vec2(-1, 1));
      input.p2.Copy(new b2Vec2(2, -2));
      input.maxFraction = -1;
      let childIndex: number = 0;
      let flag = fixture.RayCast(output, input, childIndex)
      expect(flag).assertEqual(false)
    })
    it('test_014_4', 0, () => {
      // RayCast
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let output: b2RayCastOutput = new box2d.b2RayCastOutput();
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Copy(new b2Vec2(1, 3));
      input.p2.Copy(new b2Vec2(4, 2));
      input.maxFraction = 2;
      let childIndex: number = 0;
      let flag = fixture.RayCast(output, input, childIndex)
      expect(flag).assertEqual(false)
    })
    it('test_014_5', 0, () => {
      // RayCast
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let output: b2RayCastOutput = new box2d.b2RayCastOutput();
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Copy(new b2Vec2(3, 5));
      input.p2.Copy(new b2Vec2(0, -1));
      input.maxFraction = -1;
      let childIndex: number = 0;
      let flag = fixture.RayCast(output, input, childIndex)
      expect(flag).assertEqual(false)
    })

    it('test_015_1', 0, () => {
      // GetMassData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let massData = fixture.GetMassData()
      expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":0,"1":0}},"I":0}')
    })
    it('test_015_2', 0, () => {
      // GetMassData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_density = 1;
      let massData = fixture.GetMassData()
      expect(JSON.stringify(massData))
        .assertEqual('{"mass":12.56637061436,"center":{"data":{"0":0,"1":0}},"I":25.13274122872}')
    })
    it('test_015_3', 0, () => {
      // GetMassData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_density = 0.5;
      let massData = fixture.GetMassData()
      expect(JSON.stringify(massData))
        .assertEqual('{"mass":6.28318530718,"center":{"data":{"0":0,"1":0}},"I":12.56637061436}')
    })
    it('test_015_4', 0, () => {
      // GetMassData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_density = 0.8;
      let massData = fixture.GetMassData()
      expect(JSON.stringify(massData))
        .assertEqual('{"mass":10.053096491488,"center":{"data":{"0":0,"1":0}},"I":20.106192982976}')
    })
    it('test_015_5', 0, () => {
      // GetMassData
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_density = 0.3;
      let massData = fixture.GetMassData()
      expect(JSON.stringify(massData))
        .assertEqual('{"mass":3.769911184308,"center":{"data":{"0":0,"1":0}},"I":7.539822368616}')
    })

    it('test_016_1', 0, () => {
      // SetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(2)
      expect(fixture.m_density).assertEqual(2)
    })
    it('test_016_2', 0, () => {
      // SetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(1)
      expect(fixture.m_density).assertEqual(1)
    })
    it('test_016_3', 0, () => {
      // SetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(1.5)
      expect(fixture.m_density).assertEqual(1.5)
    })
    it('test_016_4', 0, () => {
      // SetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(5)
      expect(fixture.m_density).assertEqual(5)
    })
    it('test_016_5', 0, () => {
      // SetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(3)
      expect(fixture.m_density).assertEqual(3)
    })

    it('test_017_1', 0, () => {
      // GetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(3)
      let density = fixture.GetDensity()
      expect(density).assertEqual(3)
    })
    it('test_017_2', 0, () => {
      // GetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(2)
      let density = fixture.GetDensity()
      expect(density).assertEqual(2)
    })
    it('test_017_3', 0, () => {
      // GetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(1)
      let density = fixture.GetDensity()
      expect(density).assertEqual(1)
    })
    it('test_017_4', 0, () => {
      // GetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(1.3)
      let density = fixture.GetDensity()
      expect(density).assertEqual(1.3)
    })
    it('test_017_5', 0, () => {
      // GetDensity
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetDensity(2.3)
      let density = fixture.GetDensity()
      expect(density).assertEqual(2.3)
    })

    it('test_018_1', 0, () => {
      // GetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let friction = fixture.GetFriction()
      expect(friction).assertEqual(0.2)
    })
    it('test_018_2', 0, () => {
      // GetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_friction = 1
      let friction = fixture.GetFriction()
      expect(friction).assertEqual(1)
    })
    it('test_018_3', 0, () => {
      // GetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_friction = -1
      let friction = fixture.GetFriction()
      expect(friction).assertEqual(-1)
    })
    it('test_018_4', 0, () => {
      // GetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_friction = 2
      let friction = fixture.GetFriction()
      expect(friction).assertEqual(2)
    })
    it('test_018_5', 0, () => {
      // GetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_friction = 3
      let friction = fixture.GetFriction()
      expect(friction).assertEqual(3)
    })

    it('test_019_1', 0, () => {
      // SetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetFriction(1)
      expect(fixture.m_friction).assertEqual(1)
    })
    it('test_019_2', 0, () => {
      // SetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetFriction(2)
      expect(fixture.m_friction).assertEqual(2)
    })
    it('test_019_3', 0, () => {
      // SetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetFriction(3)
      expect(fixture.m_friction).assertEqual(3)
    })
    it('test_019_4', 0, () => {
      // SetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetFriction(0.5)
      expect(fixture.m_friction).assertEqual(0.5)
    })
    it('test_019_5', 0, () => {
      // SetFriction
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetFriction(1.2)
      expect(fixture.m_friction).assertEqual(1.2)
    })

    it('test_020_1', 0, () => {
      // GetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let m_restitution = fixture.GetRestitution()
      expect(m_restitution).assertEqual(0)
    })
    it('test_020_2', 0, () => {
      // GetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_restitution = 2
      let m_restitution = fixture.GetRestitution()
      expect(m_restitution).assertEqual(2)
    })
    it('test_020_3', 0, () => {
      // GetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_restitution = 3
      let m_restitution = fixture.GetRestitution()
      expect(m_restitution).assertEqual(3)
    })
    it('test_020_4', 0, () => {
      // GetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_restitution = 4
      let m_restitution = fixture.GetRestitution()
      expect(m_restitution).assertEqual(4)
    })
    it('test_020_5', 0, () => {
      // GetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_restitution = 1.2
      let m_restitution = fixture.GetRestitution()
      expect(m_restitution).assertEqual(1.2)
    })

    it('test_021_1', 0, () => {
      // SetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetRestitution(2)
      expect(fixture.m_restitution).assertEqual(2)
    })
    it('test_021_2', 0, () => {
      // SetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetRestitution(1.2)
      expect(fixture.m_restitution).assertEqual(1.2)
    })
    it('test_021_3', 0, () => {
      // SetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetRestitution(1)
      expect(fixture.m_restitution).assertEqual(1)
    })
    it('test_021_4', 0, () => {
      // SetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetRestitution(3)
      expect(fixture.m_restitution).assertEqual(3)
    })
    it('test_021_5', 0, () => {
      // SetRestitution
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.SetRestitution(4)
      expect(fixture.m_restitution).assertEqual(4)
    })

    it('test_022_1', 0, () => {
      // GetAABB
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      let aabb = fixture.GetAABB(0)
      expect(aabb).not().assertNull()
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":-2,"1":-2}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":2,"1":2}}')
    })
    it('test_022_2', 0, () => {
      // GetAABB
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let proxy = new b2FixtureProxy(fixture, 0);
      proxy.aabb.lowerBound.Copy(new b2Vec2(1, 2));
      proxy.aabb.upperBound.Copy(new b2Vec2(2, 3));
      fixture.m_proxies.push(proxy)
      let aabb = fixture.GetAABB(0)
      expect(aabb).not().assertNull()
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":1,"1":2}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":2,"1":3}}')
    })
    it('test_022_3', 0, () => {
      // GetAABB
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let proxy = new b2FixtureProxy(fixture, 0);
      proxy.aabb.lowerBound.Copy(new b2Vec2(-1, 2));
      proxy.aabb.upperBound.Copy(new b2Vec2(-2, 3));
      fixture.m_proxies.push(proxy)
      let aabb = fixture.GetAABB(0)
      expect(aabb).not().assertNull()
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":-1,"1":2}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":-2,"1":3}}')
    })
    it('test_022_4', 0, () => {
      // GetAABB
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let proxy = new b2FixtureProxy(fixture, 0);
      proxy.aabb.lowerBound.Copy(new b2Vec2(11, 3));
      proxy.aabb.upperBound.Copy(new b2Vec2(4, 6));
      fixture.m_proxies.push(proxy)
      let aabb = fixture.GetAABB(0)
      expect(aabb).not().assertNull()
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":11,"1":3}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":4,"1":6}}')
    })
    it('test_022_5', 0, () => {
      // GetAABB
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      let proxy = new b2FixtureProxy(fixture, 0);
      proxy.aabb.lowerBound.Copy(new b2Vec2(5, 7));
      proxy.aabb.upperBound.Copy(new b2Vec2(2, 8));
      fixture.m_proxies.push(proxy)
      let aabb = fixture.GetAABB(0)
      expect(aabb).not().assertNull()
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":5,"1":7}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":2,"1":8}}')
    })

    it('test_023_1', 0, () => {
      // Reset
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      expect(fixture.m_proxyCount === 1)
      fixture.Reset()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_023_2', 0, () => {
      // Reset
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 2))
      expect(fixture.m_proxyCount === 3)
      fixture.Reset()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_023_3', 0, () => {
      // Reset
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      expect(fixture.m_proxyCount === 2)
      fixture.Reset()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_023_4', 0, () => {
      // Reset
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 2))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 3))
      expect(fixture.m_proxyCount === 4)
      fixture.Reset()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_023_5', 0, () => {
      // Reset
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 2))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 3))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 4))
      expect(fixture.m_proxyCount === 5)
      fixture.Reset()
      expect(fixture.m_proxyCount === 0)
    })

    it('test_024_1', 0, () => {
      // DestroyProxies
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      expect(fixture.m_proxyCount === 1)
      fixture.DestroyProxies()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_024_2', 0, () => {
      // DestroyProxies
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      expect(fixture.m_proxyCount === 2)
      fixture.DestroyProxies()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_024_3', 0, () => {
      // DestroyProxies
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 2))
      expect(fixture.m_proxyCount === 3)
      fixture.DestroyProxies()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_024_4', 0, () => {
      // DestroyProxies
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 2))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 3))
      expect(fixture.m_proxyCount === 4)
      fixture.DestroyProxies()
      expect(fixture.m_proxyCount === 0)
    })
    it('test_024_5', 0, () => {
      // DestroyProxies
      const bd = new box2d.b2BodyDef();
      const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
      let m_world = new box2d.b2World(gravity);
      let body: b2Body = m_world.CreateBody(bd);

      let def: b2FixtureDef = new b2FixtureDef();
      let shape = new b2CircleShape(2);
      def.shape = shape;
      def.density = 0;
      let fixture: b2Fixture = new b2Fixture(body, def);
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 0))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 1))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 2))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 3))
      fixture.m_proxies.push(new b2FixtureProxy(fixture, 4))
      expect(fixture.m_proxyCount === 5)
      fixture.DestroyProxies()
      expect(fixture.m_proxyCount === 0)
    })
  })
}