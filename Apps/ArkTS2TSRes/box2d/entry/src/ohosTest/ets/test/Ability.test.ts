let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import * as box2d from '@ohos/box2d';
export default function abilityTest() {
    describe('box2d_est', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('b2ChainShape_test_001', 0, () => {
            let shape = new box2d.b2ChainShape();
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_chainShape);
        });
        it('b2ChainShape_test_002', 0, () => {
            let shape = new box2d.b2ChainShape();
            let sp = shape.CreateChain([1, 2]);
            expect(sp.m_type).assertEqual(box2d.b2ShapeType.e_chainShape);
        });
        it('b2Collision_test_003', 0, () => {
            let aabb = new box2d.b2AABB();
            let vec2 = aabb.GetCenter();
            expect(0).assertEqual(vec2.x);
            expect(0).assertEqual(vec2.y);
        });
        it('b2Math_test_004', 0, () => {
            let v1 = new box2d.b2Vec2();
            v1.x = 0;
            v1.y = 1;
            v1.SelfSub(new box2d.b2Vec2(10, 10));
            expect(-10).assertEqual(v1.x);
            expect(-9).assertEqual(v1.y);
            let v2 = v1.SelfAdd(new box2d.b2Vec2(1, 1));
            expect(-9).assertEqual(v2.x);
            expect(-8).assertEqual(v2.y);
            expect(v1).assertEqual(v2);
        });
        it('b2Math_test_005', 0, () => {
            let v1 = new box2d.b2Vec2();
            v1.x = 0;
            v1.y = 1;
            v1.SelfSubXY(v1.x, v1.y);
            expect(0).assertEqual(v1.x);
            expect(0).assertEqual(v1.y);
            let v2 = v1.SelfAdd(new box2d.b2Vec2(1, 1));
            expect(1).assertEqual(v2.x);
            expect(1).assertEqual(v2.y);
            expect(v1).assertEqual(v2);
        });
        it('b2Math_test_006', 0, () => {
            let v1 = new box2d.b2Vec2(10, -1.3);
            let m1 = box2d.b2Mat22.FromSSSS(1, 34, -3, 3);
            let m2 = box2d.b2Mat22.FromSSSS(2, -1, 4.1, -4);
            let vo = new box2d.b2Vec2();
            let mo = new box2d.b2Mat22();
            box2d.b2Mat22.MulTMM(m1, m2, mo);
            expect(v1.x).assertEqual(10);
        });
        it('b2TestCCD_test_024', 0, () => {
            const fd = new box2d.b2FixtureDef();
            fd.density = 4.0;
            fd.restitution = 1.4;
            const bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_dynamicBody;
            bd.bullet = true;
            bd.position.Set(15.0, 5.0);
            const sd_bottom = new box2d.b2PolygonShape();
            sd_bottom.SetAsBox(4.5, 0.45);
            fd.shape = sd_bottom;
            expect(true).assertEqual(bd.bullet);
            expect(15).assertEqual(bd.position.x);
        });
        it('b2PyramidTopple_test_025', 0, () => {
            const shape = new box2d.b2EdgeShape();
            shape.Set(new box2d.b2Vec2(-600, -240), new box2d.b2Vec2(600, -240));
            const fd = new box2d.b2FixtureDef();
            fd.shape = shape;
            fd.friction = 1.0;
            fd.restitution = 1.0;
            expect(fd.shape.m_type).assertEqual(box2d.b2ShapeType.e_edgeShape);
        });
        it('b2TopdownCar_test_026', 0, () => {
            const DEGTORAD = 0.0174532925199432957;
            const polygonShape = new box2d.b2PolygonShape();
            const fixtureDef = new box2d.b2FixtureDef();
            fixtureDef.shape = polygonShape;
            fixtureDef.isSensor = true;
            polygonShape.SetAsBox(9, 7, new box2d.b2Vec2(-10, 15), 20 * DEGTORAD);
            expect(true).assertEqual(fixtureDef.isSensor);
            expect(4).assertEqual(polygonShape.m_count);
        });
        it('b2ChainShape_test_027', 0, () => {
            let shape = new box2d.b2ChainShape();
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_chainShape);
        });
        it('b2BuoyancyTest_test_028', 0, () => {
            const bc = new box2d.b2BuoyancyController();
            bc.normal.Set(0.0, 1.0);
            bc.offset = 20.0;
            bc.density = 2.0;
            bc.linearDrag = 5.0;
            bc.angularDrag = 2.0;
            expect(0).assertEqual(bc.normal.x);
        });
        it('b2Sandbox_test_029', 0, () => {
            const m_killFieldTransform = new box2d.b2Transform();
            const loc = new box2d.b2Vec2(-20, 1);
            m_killFieldTransform.SetPositionAngle(loc, 0);
            expect(-20).assertEqual(loc.x);
        });
        it('b2DamBreak_test_030', 0, () => {
            const shape = new box2d.b2PolygonShape();
            shape.SetAsBox(0.8, 1.0, new box2d.b2Vec2(-1.2, 1.01), 0);
            const pd = new box2d.b2ParticleGroupDef();
            pd.shape = shape;
            expect(pd.shape.m_type).assertEqual(box2d.b2ShapeType.e_polygonShape);
        });
        it('b2LiquidTimer_test_031', 0, () => {
            const shape = new box2d.b2EdgeShape();
            let b1 = new box2d.b2Vec2(1.2, 0.8);
            let b2 = new box2d.b2Vec2(1.2, 0);
            shape.Set(b1, b2);
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_edgeShape);
        });
        it('b2WaveMachine_test_032', 0, () => {
            const bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_dynamicBody;
            bd.allowSleep = false;
            bd.position.Set(0.0, 1.0);
            expect(1).assertEqual(bd.position.y);
        });
        it('b2ChainShape_test_033', 0, () => {
            let shape = new box2d.b2ChainShape();
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_chainShape);
        });
        it('b2Particles_test_034', 0, () => {
            const shape = new box2d.b2CircleShape();
            shape.m_p.Set(0, 3);
            shape.m_radius = 2;
            const pd = new box2d.b2ParticleGroupDef();
            pd.shape = shape;
            expect(pd.shape.m_type).assertEqual(box2d.b2ShapeType.e_circleShape);
        });
        it('b2Faucet_test_035', 0, () => {
            const shape = new box2d.b2PolygonShape();
            const k_containerWidth = 1.0;
            const k_containerThickness = 0.05;
            shape.SetAsBox(k_containerWidth * 5.0, k_containerThickness, new box2d.b2Vec2(0.0, k_containerThickness * -2.0), 0.0);
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_polygonShape);
        });
        it('b2DrawingParticles_test_036', 0, () => {
            const shape = new box2d.b2PolygonShape();
            const vertices = [
                new box2d.b2Vec2(-4, -2),
                new box2d.b2Vec2(4, -2),
                new box2d.b2Vec2(4, 0),
                new box2d.b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 4);
            expect(4).assertEqual(shape.m_vertices[1].x);
        });
        it('b2Soup_test_037', 0, () => {
            const bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_dynamicBody;
            const shape = new box2d.b2CircleShape();
            shape.m_p.Set(0, 0.5);
            shape.m_radius = 0.1;
            expect(bd.type).assertEqual(box2d.b2BodyType.b2_dynamicBody);
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_circleShape);
        });
        it('b2Impulse_test_038', 0, () => {
            const shape = new box2d.b2PolygonShape();
            shape.SetAsBox(0.8, 1.0, new box2d.b2Vec2(0.0, 1.01), 0);
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_polygonShape);
        });
        it('b2SoupStirrer_test_039', 0, () => {
            const bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_dynamicBody;
            const shape = new box2d.b2CircleShape();
            expect(bd.type).assertEqual(box2d.b2BodyType.b2_dynamicBody);
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_circleShape);
        });
        it('b2Maxwell_test_040', 0, () => {
            const shape = new box2d.b2ChainShape();
            expect(shape.m_type).assertEqual(box2d.b2ShapeType.e_chainShape);
        });
        it('b2Ramp_test_041', 0, () => {
            const shape = new box2d.b2CircleShape();
            shape.m_p.Set(-20, 33);
            expect(33).assertEqual(shape.m_p.y);
        });
        it('b2Pointy_test_042', 0, () => {
            const m_killfieldShape = new box2d.b2PolygonShape();
            m_killfieldShape.SetAsBox(50.0, 1.0);
            const m_killfieldTransform = new box2d.b2Transform();
            const loc = new box2d.b2Vec2(-25, 1);
            m_killfieldTransform.SetPositionAngle(loc, 0);
            expect(0.016).assertEqual(m_killfieldShape.m_radius);
            expect(0).assertEqual(m_killfieldTransform.GetAngle());
        });
        it('b2Corner_test_043', 0, () => {
            const shape = new box2d.b2CircleShape();
            shape.m_p.Set(0, 35);
            expect(35).assertEqual(shape.m_p.y);
            const shape1 = new box2d.b2PolygonShape();
            const vertices = [
                new box2d.b2Vec2(-25.0, 0.0),
                new box2d.b2Vec2(20.0, 15.0),
                new box2d.b2Vec2(25.0, 0.0),
            ];
            shape1.Set(vertices);
            expect(25).assertEqual(shape1.m_vertices[0].x);
        });
        it('b2EyeCandy_test_044', 0, () => {
            const bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_staticBody;
            expect(bd.type).assertEqual(box2d.b2BodyType.b2_staticBody);
            const jd = new box2d.b2RevoluteJointDef();
            jd.localAnchorA.Set(0.0, 0.0);
            jd.localAnchorB.Set(0.0, 5.0);
            expect(0).assertEqual(jd.localAnchorA.x);
            expect(5).assertEqual(jd.localAnchorB.y);
        });
        it('b2Segway_test_045', 0, () => {
            const PENDULUM_LENGTH = 10;
            const bd: box2d.b2BodyDef = new box2d.b2BodyDef();
            bd.position.x = 0;
            bd.position.y = 2 + 0.5 * PENDULUM_LENGTH;
            expect(0).assertEqual(bd.position.x);
            expect(7).assertEqual(bd.position.y);
            const fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
            fd.density = 1 / (1 * PENDULUM_LENGTH);
            expect(0.1).assertEqual(fd.density);
        });
    });
}
