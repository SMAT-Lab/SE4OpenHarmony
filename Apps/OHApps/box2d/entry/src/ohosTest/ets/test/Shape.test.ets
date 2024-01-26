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
import { b2ChainShape, b2CircleShape, b2EdgeShape,
  b2MassData,
  b2PolygonShape,
  b2RayCastInput,
  b2RayCastOutput,
  b2Shape, b2ShapeType,
  b2Transform,
  b2Vec2,
  XY
} from '@ohos/box2d'

export default function shapeTest() {
  describe('shape_test', () => {
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
      let shape = new b2CircleShape(2);
      expect(shape).not().assertNull()
      expect(shape.GetType()).assertEqual(b2ShapeType.e_circleShape)
    })
    it('test_001_2', 0, () => {
      // GetType
      let shape = new b2ChainShape();
      expect(shape).not().assertNull()
      expect(shape.GetType()).assertEqual(b2ShapeType.e_chainShape)
    })
    it('test_001_3', 0, () => {
      // GetType
      let shape = new b2EdgeShape();
      expect(shape).not().assertNull()
      expect(shape.GetType()).assertEqual(b2ShapeType.e_edgeShape)
    })
    it('test_001_4', 0, () => {
      // GetType
      let shape = new b2PolygonShape();
      expect(shape).not().assertNull()
      expect(shape.GetType()).assertEqual(b2ShapeType.e_polygonShape)
    })
    it('test_001_5', 0, () => {
      // GetType
      let shape = new b2CircleShape(2);
      expect(shape).not().assertNull()
      expect(shape.GetType()).not().assertEqual(b2ShapeType.e_unknown)
    })

    it('test_002_1', 0, () => {
      // Clone
      let shape = new b2CircleShape();
      let obj = shape.Clone();
      expect(obj).assertDeepEquals(shape)
      expect(obj).not().assertEqual(shape)
    })
    it('test_002_2', 0, () => {
      // Clone
      let shape = new b2ChainShape();
      let obj = shape.Clone();
      expect(obj).assertDeepEquals(shape)
      expect(obj).not().assertEqual(shape)
    })
    it('test_002_3', 0, () => {
      // Clone
      let shape = new b2EdgeShape();
      let obj = shape.Clone();
      expect(obj).assertDeepEquals(shape)
      expect(obj).not().assertEqual(shape)
    })
    it('test_002_4', 0, () => {
      // Clone
      let shape = new b2PolygonShape();
      let obj = shape.Clone();
      expect(obj).assertDeepEquals(shape)
      expect(obj).not().assertEqual(shape)
    })
    it('test_002_5', 0, () => {
      // Clone
      let shape = new b2CircleShape(5.1);
      let obj = shape.Clone();
      expect(obj).assertDeepEquals(shape)
      expect(obj).not().assertEqual(shape)
    })

    it('test_003_1', 0, () => {
      // Copy
      let shape = new b2CircleShape();
      let obj = shape.Copy(shape);
      expect(obj).assertDeepEquals(shape)
      expect(obj).assertEqual(shape)
    })
    it('test_003_2', 0, () => {
      // Copy
      let shape = new b2ChainShape();
      let obj = shape.Copy(shape);
      expect(obj).assertDeepEquals(shape)
      expect(obj).assertEqual(shape)
    })
    it('test_003_3', 0, () => {
      // Copy
      let shape = new b2EdgeShape();
      let obj = shape.Copy(shape);
      expect(obj).assertDeepEquals(shape)
      expect(obj).assertEqual(shape)
    })
    it('test_003_4', 0, () => {
      // Copy
      let shape = new b2PolygonShape();
      let obj = shape.Copy(shape);
      expect(obj).assertDeepEquals(shape)
      expect(obj).assertEqual(shape)
    })
    it('test_003_5', 0, () => {
      // Copy
      let shape = new b2CircleShape(5.1);
      let obj = shape.Copy(shape);
      expect(obj).assertDeepEquals(shape)
      expect(obj).assertEqual(shape)
    })

    it('test_004_1', 0, () => {
      // GetChildCount
      let shape = new b2CircleShape();
      let childCount = shape.GetChildCount();
      expect(childCount).assertEqual(1)
    })
    it('test_004_2', 0, () => {
      // GetChildCount
      let shape = new b2ChainShape();
      let childCount = shape.GetChildCount();
      expect(childCount).assertEqual(-1)
    })
    it('test_004_3', 0, () => {
      // GetChildCount
      let shape = new b2EdgeShape();
      let childCount = shape.GetChildCount();
      expect(childCount).assertEqual(1)
    })
    it('test_004_4', 0, () => {
      // GetChildCount
      let shape = new b2PolygonShape();
      let childCount = shape.GetChildCount();
      expect(childCount).assertEqual(1)
    })
    it('test_004_5', 0, () => {
      // GetChildCount
      let shape = new b2CircleShape(5.1);
      let childCount = shape.GetChildCount();
      expect(childCount).assertEqual(1)
    })

    it('test_005_1', 0, () => {
      // ComputeDistance
      let shape = new b2CircleShape();
      let xf: b2Transform = new b2Transform();
      xf.p.Copy(box2d.b2Rot.MulRV(xf.q, new box2d.b2Vec2(1.0, 0.0), new box2d.b2Vec2()));

      let p: b2Vec2 = new b2Vec2(1,2);
      let normal: b2Vec2 = new b2Vec2(3,4);
      let childIndex: number = 1;
      let distance = shape.ComputeDistance(xf, p, normal, childIndex);
      expect(distance).assertEqual(2)
    })
    it('test_005_2', 0, () => {
      // ComputeDistance
      let shape = new b2CircleShape();
      let xf: b2Transform = new b2Transform();
      xf.q.SetAngle(0.3524 * box2d.b2_pi);
      xf.p.Copy(box2d.b2Rot.MulRV(xf.q, new box2d.b2Vec2(1.0, 0.0), new box2d.b2Vec2()));

      let p: b2Vec2 = new b2Vec2(1,2);
      let normal: b2Vec2 = new b2Vec2(3,4);
      let childIndex: number = 1;
      let distance = shape.ComputeDistance(xf, p, normal, childIndex);
      expect(distance).assertEqual(1.2360679638904166)
    })
    it('test_005_3', 0, () => {
      // ComputeDistance
      let shape = new b2CircleShape();
      let xf: b2Transform = new b2Transform();
      xf.p.Copy(box2d.b2Rot.MulRV(xf.q, new box2d.b2Vec2(1.0, 0.0), new box2d.b2Vec2()));

      let p: b2Vec2 = new b2Vec2();
      let normal: b2Vec2 = new b2Vec2(3,4);
      let childIndex: number = 1;
      let distance = shape.ComputeDistance(xf, p, normal, childIndex);
      expect(distance).assertEqual(1)
    })
    it('test_005_4', 0, () => {
      // ComputeDistance
      let shape = new b2CircleShape();
      let xf: b2Transform = new b2Transform();
      xf.p.Copy(box2d.b2Rot.MulRV(xf.q, new box2d.b2Vec2(1.0, 0.0), new box2d.b2Vec2()));

      let p: b2Vec2 = new b2Vec2();
      let normal: b2Vec2 = new b2Vec2(1,2);
      let childIndex: number = 1;
      let distance = shape.ComputeDistance(xf, p, normal, childIndex);
      expect(distance).assertEqual(1)
    })
    it('test_005_5', 0, () => {
      // ComputeDistance
      let shape = new b2CircleShape();
      let xf: b2Transform = new b2Transform();
      xf.p.Copy(box2d.b2Rot.MulRV(xf.q, new box2d.b2Vec2(1.0, 0.0), new box2d.b2Vec2()));

      let p: b2Vec2 = new b2Vec2(1,2);
      let normal: b2Vec2 = new b2Vec2(1,4);
      let childIndex: number = 1;
      let distance = shape.ComputeDistance(xf, p, normal, childIndex);
      expect(distance).assertEqual(2)
    })

    it('test_006_1', 0, () => {
      // RayCast
      let shape = new b2CircleShape();
      let output: b2RayCastOutput = new box2d.b2RayCastOutput();;
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Set(10.2725,1.71372);
      input.p2.Set(10.2353,2.21807);
      input.maxFraction = 0.56762173;

      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(23.0, 5.0);
      let childIndex: number = 1;
      let flag = shape.RayCast(output, input, xf, childIndex);
      expect(flag).assertFalse()
    })
    it('test_006_2', 0, () => {
      // RayCast
      let shape = new b2PolygonShape();
      shape.SetAsBox(22.875, 3.0);

      let output: b2RayCastOutput = new box2d.b2RayCastOutput();;
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Set(10.2725,1.71372);
      input.p2.Set(10.2353,2.21807);
      input.maxFraction = 0.56762173;

      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(23.0, 5.0);
      let childIndex: number = 1;
      let flag = shape.RayCast(output, input, xf, childIndex);
      expect(flag).assertFalse()
    })
    it('test_006_3', 0, () => {
      // RayCast
      let shape = new b2PolygonShape();
      let vertices: XY[] = [];
      vertices[0] = {x:-22.875, y:-3.0};
      vertices[1] = {x:22.875, y: -3.0};
      vertices[2] = {x:22.875, y: 3.0};
      vertices[3] = {x:-22.875, y: 3.0};
      shape.Set(vertices, 4);
      shape.SetAsBox(22.875, 3.0);

      let output: b2RayCastOutput = new box2d.b2RayCastOutput();;
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Set(10.2725,1.71372);
      input.p2.Set(10.2353,2.21807);
      input.maxFraction = 0.567623;

      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(23.0, 5.0);
      let childIndex: number = 1;
      let flag = shape.RayCast(output, input, xf, childIndex);
      expect(flag).assertTrue()
    })
    it('test_006_4', 0, () => {
      // RayCast
      let shape = new b2PolygonShape();
      let vertices: XY[] = [];
      vertices[0] = {x:-22.875, y:-3.0};
      vertices[1] = {x:22.875, y: -3.0};
      vertices[2] = {x:22.875, y: 3.0};
      vertices[3] = {x:-22.875, y: 3.0};
      shape.Set(vertices, 4);

      let output: b2RayCastOutput = new box2d.b2RayCastOutput();;
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Set(10.2725,1.71372);
      input.p2.Set(10.2353,2.21807);

      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(23.0, 5.0);
      let childIndex: number = 1;
      let flag = shape.RayCast(output, input, xf, childIndex);
      expect(flag).assertTrue()
    })
    it('test_006_5', 0, () => {
      // RayCast
      let shape = new b2PolygonShape();
      let vertices: XY[] = [];
      vertices[0] = {x:-22.875, y:-3.0};
      vertices[1] = {x:22.875, y: -3.0};
      vertices[2] = {x:22.875, y: 3.0};
      vertices[3] = {x:-22.875, y: 3.0};
      shape.Set(vertices, 4);
      shape.SetAsBox(22.875, 3.0);

      let output: b2RayCastOutput = new box2d.b2RayCastOutput();;
      let input: b2RayCastInput = new box2d.b2RayCastInput();
      input.p1.Set(10.2725,1.71372);
      input.p2.Set(10.2353,2.21807);
      input.maxFraction = 0.56762173;

      let xf: b2Transform = new b2Transform();
      xf.SetIdentity();
      xf.p.Set(23.0, 5.0);
      let childIndex: number = 1;
      let flag = shape.RayCast(output, input, xf, childIndex);
      expect(flag).assertFalse()
    })

    it('test_007_1', 0, () => {
      // ComputeAABB
      let shape = new box2d.b2CircleShape();
      let m_mouseTracerPosition: box2d.b2Vec2 = new box2d.b2Vec2();
      shape.m_p.Copy(m_mouseTracerPosition);
      shape.m_radius = 2 * 1.0;
      let xf = new box2d.b2Transform();
      xf.SetIdentity();
      const aabb = new box2d.b2AABB();
      shape.ComputeAABB(aabb, xf, 0);
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":-2,"1":-2}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":2,"1":2}}')
    })
    it('test_007_2', 0, () => {
      // ComputeAABB
      let shape = new box2d.b2CircleShape();
      let m_mouseTracerPosition: box2d.b2Vec2 = new box2d.b2Vec2();
      shape.m_p.Copy(m_mouseTracerPosition);
      shape.m_radius = 1 * 1.0;
      let xf = new box2d.b2Transform();
      xf.SetIdentity();
      const aabb = new box2d.b2AABB();
      shape.ComputeAABB(aabb, xf, 1);
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":-1,"1":-1}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":1,"1":1}}')
    })
    it('test_007_3', 0, () => {
      // ComputeAABB
      let shape = new box2d.b2CircleShape();
      let m_mouseTracerPosition: box2d.b2Vec2 = new box2d.b2Vec2();
      let acceleration = new box2d.b2Vec2();
      let m_mouseTracerVelocity: box2d.b2Vec2 = new box2d.b2Vec2();
      let m_mouseWorld: box2d.b2Vec2 = new box2d.b2Vec2();
      let delay = 0.1;
      let timeStep = 1;
      acceleration.x = 2 / delay * (1 / delay * (m_mouseWorld.x - m_mouseTracerPosition.x) - m_mouseTracerVelocity.x);
      acceleration.y = 2 / delay * (1 / delay * (m_mouseWorld.y - m_mouseTracerPosition.y) - m_mouseTracerVelocity.y);
      m_mouseTracerVelocity.SelfMulAdd(timeStep, acceleration);
      m_mouseTracerPosition.SelfMulAdd(timeStep, m_mouseTracerVelocity);
      shape.m_p.Copy(m_mouseTracerPosition);
      shape.m_radius = 2 * 1.0;
      let xf = new box2d.b2Transform();
      xf.SetIdentity();
      const aabb = new box2d.b2AABB();
      shape.ComputeAABB(aabb, xf, 0);
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":-2,"1":-2}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":2,"1":2}}')
    })
    it('test_007_4', 0, () => {
      // ComputeAABB
      let shape = new box2d.b2CircleShape();
      let m_mouseTracerPosition: box2d.b2Vec2 = new box2d.b2Vec2();
      shape.m_p.Copy(m_mouseTracerPosition);
      shape.m_radius = 2 * 1.5;
      let xf = new box2d.b2Transform();
      xf.SetIdentity();
      const aabb = new box2d.b2AABB();
      shape.ComputeAABB(aabb, xf, 0);
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":-3,"1":-3}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":3,"1":3}}')
    })
    it('test_007_5', 0, () => {
      // ComputeAABB
      let shape = new box2d.b2CircleShape();
      let m_mouseTracerPosition: box2d.b2Vec2 = new box2d.b2Vec2();
      shape.m_p.Copy(m_mouseTracerPosition);
      shape.m_radius = -2 * 1.2;
      let xf = new box2d.b2Transform();
      xf.SetIdentity();
      const aabb = new box2d.b2AABB();
      shape.ComputeAABB(aabb, xf, 0);
      expect(JSON.stringify(aabb.lowerBound)).assertEqual('{"data":{"0":2.4000000953674316,"1":2.4000000953674316}}')
      expect(JSON.stringify(aabb.upperBound)).assertEqual('{"data":{"0":-2.4000000953674316,"1":-2.4000000953674316}}')
    })

    it('test_008_1', 0, () => {
      // ComputeMass
      let shape = new b2CircleShape();
      let massData: b2MassData = new b2MassData();
      shape.ComputeMass(massData, 1);
      expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":0,"1":0}},"I":0}')
    })
    it('test_008_2', 0, () => {
      // ComputeMass
      let shape = new b2ChainShape();
      let massData: b2MassData = new b2MassData();
      shape.ComputeMass(massData, 1);
      expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":0,"1":0}},"I":0}')
    })
    it('test_008_3', 0, () => {
      // ComputeMass
      let shape = new b2EdgeShape();
      let massData: b2MassData = new b2MassData();
      shape.ComputeMass(massData, 1);
      expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":0,"1":0}},"I":0}')
    })
    it('test_008_4', 0, () => {
      // ComputeMass
      let shape = new b2PolygonShape();
      let massData: b2MassData = new b2MassData();
      shape.ComputeMass(massData, 1);
      expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":null,"1":null}},"I":null}')
    })
    it('test_008_5', 0, () => {
      // ComputeMass
      let shape = new b2CircleShape();
      let massData: b2MassData = new b2MassData();
      shape.ComputeMass(massData, 2);
      expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":0,"1":0}},"I":0}')
    })
  })
}