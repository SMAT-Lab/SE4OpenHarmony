let __generate__Id: number = 0;
function generateId(): string {
    return "Contact.test_" + ++__generate__Id;
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
import { b2Body, b2BodyDef, b2ChainAndCircleContact, b2ChainAndPolygonContact, b2CircleContact, b2CircleShape, b2Contact, b2EdgeAndCircleContact, b2Fixture, b2FixtureDef, b2Manifold, b2ManifoldType, b2MixFriction, b2MixRestitution, b2PolygonShape, b2Vec2, b2World, b2WorldManifold } from '@ohos/box2d';
export default function contactTest() {
    describe('contact_test', () => {
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
        it('test_001_1', 0, () => {
            // Reset
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            let body: b2Body = m_world.CreateBody(bd);
            let def: b2FixtureDef = new b2FixtureDef();
            let shape = new b2CircleShape(2);
            def.shape = shape;
            def.density = 0;
            let fixtureA: b2Fixture = new b2Fixture(body, def);
            let indexA: number = 0;
            let fixtureB: b2Fixture = new b2Fixture(body, def);
            let indexB: number = 1;
            const contact: b2Contact = b2CircleContact.Create();
            contact.Reset(fixtureA, indexA, fixtureB, indexB);
            expect(contact.m_indexA).assertEqual(0);
            expect(contact.m_indexB).assertEqual(1);
            expect(contact.m_friction).assertEqual(0.2);
            expect(contact.m_restitution).assertEqual(0);
        });
        it('test_001_2', 0, () => {
            // Reset
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            let body: b2Body = m_world.CreateBody(bd);
            let def: b2FixtureDef = new b2FixtureDef();
            let shape = new b2CircleShape(2);
            def.shape = shape;
            def.density = 0;
            let fixtureA: b2Fixture = new b2Fixture(body, def);
            let indexA: number = 0;
            let fixtureB: b2Fixture = new b2Fixture(body, def);
            let indexB: number = 1;
            const contact: b2Contact = b2CircleContact.Create();
            contact.Reset(fixtureA, indexA, fixtureB, indexB);
            expect(contact.m_indexA).assertEqual(0);
            expect(contact.m_indexB).assertEqual(1);
            expect(contact.m_friction).assertEqual(0.2);
            expect(contact.m_restitution).assertEqual(0);
        });
        it('test_001_3', 0, () => {
            // Reset
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            let body: b2Body = m_world.CreateBody(bd);
            let def: b2FixtureDef = new b2FixtureDef();
            let shape = new b2CircleShape(2);
            def.shape = shape;
            def.density = 0;
            let fixtureA: b2Fixture = new b2Fixture(body, def);
            fixtureA.m_friction = 1;
            fixtureA.m_restitution = 2;
            let indexA: number = 1;
            let fixtureB: b2Fixture = new b2Fixture(body, def);
            fixtureB.m_friction = 2;
            fixtureB.m_restitution = -2;
            let indexB: number = 2;
            const contact: b2Contact = b2CircleContact.Create();
            contact.Reset(fixtureA, indexA, fixtureB, indexB);
            expect(contact.m_indexA).assertEqual(1);
            expect(contact.m_indexB).assertEqual(2);
            expect(contact.m_friction).assertEqual(1.4142135623730951);
            expect(contact.m_restitution).assertEqual(2);
        });
        it('test_002_1', 0, () => {
            // GetManifold
            const contact: b2Contact = b2CircleContact.Create();
            const manifold: b2Manifold = contact.GetManifold();
            expect(JSON.stringify(manifold.localNormal)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(manifold.localPoint)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_002_2', 0, () => {
            // GetManifold
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_manifold.localNormal.Copy(new b2Vec2(1, 2));
            contact.m_manifold.localPoint.Copy(new b2Vec2(2, 3));
            const manifold: b2Manifold = contact.GetManifold();
            expect(JSON.stringify(manifold.localNormal)).assertEqual('{"data":{"0":1,"1":2}}');
            expect(JSON.stringify(manifold.localPoint)).assertEqual('{"data":{"0":2,"1":3}}');
        });
        it('test_002_3', 0, () => {
            // GetManifold
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_manifold.localNormal.Copy(new b2Vec2(-1, -2));
            contact.m_manifold.localPoint.Copy(new b2Vec2(-2, -3));
            const manifold: b2Manifold = contact.GetManifold();
            expect(JSON.stringify(manifold.localNormal)).assertEqual('{"data":{"0":-1,"1":-2}}');
            expect(JSON.stringify(manifold.localPoint)).assertEqual('{"data":{"0":-2,"1":-3}}');
        });
        it('test_003_1', 0, () => {
            // GetWorldManifold
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 4);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureB = fixture;
            contact.m_manifold.pointCount = 1;
            let worldManifold: b2WorldManifold = new b2WorldManifold();
            contact.GetWorldManifold(worldManifold);
            expect(JSON.stringify(worldManifold.separations)).assertEqual('[0,0]');
        });
        it('test_003_2', 0, () => {
            // GetWorldManifold
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 4);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureB = fixture;
            contact.m_manifold.pointCount = 1;
            let worldManifold: b2WorldManifold = new b2WorldManifold();
            contact.GetWorldManifold(worldManifold);
            expect(JSON.stringify(worldManifold.separations)).assertEqual('[0,0]');
        });
        it('test_003_3', 0, () => {
            // GetWorldManifold
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 4);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureB = fixture;
            contact.m_manifold.pointCount = 1;
            contact.m_manifold.type = b2ManifoldType.e_circles;
            let worldManifold: b2WorldManifold = new b2WorldManifold();
            contact.GetWorldManifold(worldManifold);
            expect(JSON.stringify(worldManifold.separations)).assertEqual('[-0.03200000151991844,0]');
        });
        it('test_003_4', 0, () => {
            // GetWorldManifold
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 4);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureB = fixture;
            contact.m_manifold.pointCount = 1;
            contact.m_manifold.type = b2ManifoldType.e_faceA;
            let worldManifold: b2WorldManifold = new b2WorldManifold();
            contact.GetWorldManifold(worldManifold);
            expect(JSON.stringify(worldManifold.separations)).assertEqual('[0,0]');
        });
        it('test_003_5', 0, () => {
            // GetWorldManifold
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 4);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureB = fixture;
            contact.m_manifold.pointCount = 1;
            contact.m_manifold.type = b2ManifoldType.e_faceB;
            let worldManifold: b2WorldManifold = new b2WorldManifold();
            contact.GetWorldManifold(worldManifold);
            expect(JSON.stringify(worldManifold.separations)).assertEqual('[0,0]');
        });
        it('test_004_1', 0, () => {
            // IsTouching
            const contact: b2Contact = b2CircleContact.Create();
            let flag = contact.IsTouching();
            expect(flag).assertEqual(false);
        });
        it('test_004_2', 0, () => {
            // IsTouching
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_touchingFlag = false;
            let flag = contact.IsTouching();
            expect(flag).assertEqual(false);
        });
        it('test_004_3', 0, () => {
            // IsTouching
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_touchingFlag = true;
            let flag = contact.IsTouching();
            expect(flag).assertEqual(true);
        });
        it('test_005_1', 0, () => {
            // SetEnabled
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetEnabled(false);
            expect(contact.m_enabledFlag).assertEqual(false);
        });
        it('test_005_2', 0, () => {
            // SetEnabled
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetEnabled(true);
            expect(contact.m_enabledFlag).assertEqual(true);
        });
        it('test_006_1', 0, () => {
            // GetNext
            const contact: b2Contact = b2CircleContact.Create();
            let next = contact.GetNext();
            expect(next).assertNull();
        });
        it('test_006_2', 0, () => {
            // GetNext
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_next = b2CircleContact.Create();
            let next = contact.GetNext();
            expect(next).not().assertNull();
            expect(next instanceof b2CircleContact).assertEqual(true);
        });
        it('test_006_3', 0, () => {
            // GetNext
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_next = b2ChainAndCircleContact.Create();
            let next = contact.GetNext();
            expect(next).not().assertNull();
            expect(next instanceof b2ChainAndCircleContact).assertEqual(true);
        });
        it('test_006_4', 0, () => {
            // GetNext
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_next = b2ChainAndPolygonContact.Create();
            let next = contact.GetNext();
            expect(next).not().assertNull();
            expect(next instanceof b2ChainAndPolygonContact).assertEqual(true);
        });
        it('test_006_5', 0, () => {
            // GetNext
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_next = b2EdgeAndCircleContact.Create();
            let next = contact.GetNext();
            expect(next).not().assertNull();
            expect(next instanceof b2EdgeAndCircleContact).assertEqual(true);
        });
        it('test_007_1', 0, () => {
            // GetFixtureA
            const contact: b2Contact = b2CircleContact.Create();
            let fixture = contact.GetFixtureA();
            expect(fixture).assertUndefined();
        });
        it('test_007_2', 0, () => {
            // GetFixtureA
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, 1);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 2);
            contact.m_fixtureA = ground.CreateFixture(shape, 0.0);
            let fixture = contact.GetFixtureA();
            expect(fixture).not().assertUndefined();
        });
        it('test_007_3', 0, () => {
            // GetFixtureA
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(1, 0);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
            ];
            shape.Set(vertices, 1);
            contact.m_fixtureA = ground.CreateFixture(shape, 0.0);
            let fixture = contact.GetFixtureA();
            expect(fixture).not().assertUndefined();
        });
        it('test_007_4', 0, () => {
            // GetFixtureA
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(-1, -1);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(1, 2),
                new b2Vec2(1, 4),
            ];
            shape.Set(vertices, 1);
            contact.m_fixtureA = ground.CreateFixture(shape, 0.0);
            let fixture = contact.GetFixtureA();
            expect(fixture).not().assertUndefined();
        });
        it('test_008_1', 0, () => {
            // GetChildIndexA
            const contact: b2Contact = b2CircleContact.Create();
            let index = contact.GetChildIndexA();
            expect(index).assertEqual(0);
        });
        it('test_008_2', 0, () => {
            // GetChildIndexA
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_indexA = 1;
            let index = contact.GetChildIndexA();
            expect(index).assertEqual(1);
        });
        it('test_008_3', 0, () => {
            // GetChildIndexA
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_indexA = 3;
            let index = contact.GetChildIndexA();
            expect(index).assertEqual(3);
        });
        it('test_009_1', 0, () => {
            // GetFixtureB
            const contact: b2Contact = b2CircleContact.Create();
            let fixture = contact.GetFixtureB();
            expect(fixture).assertUndefined();
        });
        it('test_009_2', 0, () => {
            // GetFixtureB
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, 1);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 2);
            contact.m_fixtureB = ground.CreateFixture(shape, 0.0);
            let fixture = contact.GetFixtureB();
            expect(fixture).not().assertUndefined();
        });
        it('test_009_3', 0, () => {
            // GetFixtureB
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(1, -1);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
            ];
            shape.Set(vertices, 1);
            contact.m_fixtureB = ground.CreateFixture(shape, 0.0);
            let fixture = contact.GetFixtureB();
            expect(fixture).not().assertUndefined();
        });
        it('test_009_4', 0, () => {
            // GetFixtureB
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(10, 1);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(0, -2),
                new b2Vec2(1, 1),
            ];
            shape.Set(vertices, 2);
            contact.m_fixtureB = ground.CreateFixture(shape, 0.0);
            let fixture = contact.GetFixtureB();
            expect(fixture).not().assertUndefined();
        });
        it('test_010_1', 0, () => {
            // GetChildIndexB
            const contact: b2Contact = b2CircleContact.Create();
            let index = contact.GetChildIndexB();
            expect(index).assertEqual(0);
        });
        it('test_010_2', 0, () => {
            // GetChildIndexB
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_indexB = 1;
            let index = contact.GetChildIndexB();
            expect(index).assertEqual(1);
        });
        it('test_010_3', 0, () => {
            // GetChildIndexB
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_indexB = 3;
            let index = contact.GetChildIndexB();
            expect(index).assertEqual(3);
        });
        it('test_011_1', 0, () => {
            // SetFriction
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetFriction(1);
            expect(contact.m_friction).assertEqual(1);
        });
        it('test_011_2', 0, () => {
            // SetFriction
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetFriction(2);
            expect(contact.m_friction).assertEqual(2);
        });
        it('test_011_3', 0, () => {
            // SetFriction
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetFriction(0.2);
            expect(contact.m_friction).assertEqual(0.2);
        });
        it('test_012_1', 0, () => {
            // GetFriction
            const contact: b2Contact = b2CircleContact.Create();
            let friction = contact.GetFriction();
            expect(friction).assertEqual(0);
        });
        it('test_012_2', 0, () => {
            // GetFriction
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_friction = 1.5;
            let friction = contact.GetFriction();
            expect(friction).assertEqual(1.5);
        });
        it('test_012_3', 0, () => {
            // GetFriction
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_friction = 0.2;
            let friction = contact.GetFriction();
            expect(friction).assertEqual(0.2);
        });
        it('test_013_1', 0, () => {
            // ResetFriction
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 1);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureA.m_friction = 0;
            contact.m_fixtureB = fixture;
            contact.m_fixtureB.m_friction = 0.2;
            contact.ResetFriction();
            expect(contact.m_friction).assertEqual(0.2);
        });
        it('test_013_2', 0, () => {
            // ResetFriction
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, -2),
                new b2Vec2(4, -2),
                new b2Vec2(4, 0),
                new b2Vec2(-4, 0),
            ];
            shape.Set(vertices, 1);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureA.m_friction = 3;
            contact.m_fixtureB = fixture;
            contact.m_fixtureB.m_friction = 3;
            contact.ResetFriction();
            expect(contact.m_friction).assertEqual(3);
        });
        it('test_013_3', 0, () => {
            // ResetFriction
            const contact: b2Contact = b2CircleContact.Create();
            const bd = new b2BodyDef();
            const gravity: b2Vec2 = new b2Vec2(0, -10);
            let m_world = new b2World(gravity);
            const ground = m_world.CreateBody(bd);
            const shape = new b2PolygonShape();
            const vertices = [
                new b2Vec2(-4, 2),
                new b2Vec2(4, 2),
                new b2Vec2(-4, 0),
                new b2Vec2(4, 0),
            ];
            shape.Set(vertices, 1);
            let fixture: b2Fixture = ground.CreateFixture(shape, 0.0);
            contact.m_fixtureA = fixture;
            contact.m_fixtureA.m_friction = 2;
            contact.m_fixtureB = fixture;
            contact.m_fixtureB.m_friction = 2;
            contact.ResetFriction();
            expect(contact.m_friction).assertEqual(2);
        });
        it('test_014_1', 0, () => {
            // SetRestitution
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetRestitution(2);
            expect(contact.m_restitution).assertEqual(2);
        });
        it('test_014_2', 0, () => {
            // SetRestitution
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetRestitution(1);
            expect(contact.m_restitution).assertEqual(1);
        });
        it('test_014_3', 0, () => {
            // SetRestitution
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetRestitution(-1);
            expect(contact.m_restitution).assertEqual(-1);
        });
        it('test_015_1', 0, () => {
            // GetRestitution
            const contact: b2Contact = b2CircleContact.Create();
            let m_restitution = contact.GetRestitution();
            expect(m_restitution).assertEqual(0);
        });
        it('test_015_2', 0, () => {
            // GetRestitution
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_restitution = -1;
            let m_restitution = contact.GetRestitution();
            expect(m_restitution).assertEqual(-1);
        });
        it('test_015_3', 0, () => {
            // GetRestitution
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_restitution = 2;
            let m_restitution = contact.GetRestitution();
            expect(m_restitution).assertEqual(2);
        });
        it('test_016_1', 0, () => {
            // SetTangentSpeed
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetTangentSpeed(2);
            expect(contact.m_tangentSpeed).assertEqual(2);
        });
        it('test_016_2', 0, () => {
            // SetTangentSpeed
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetTangentSpeed(0);
            expect(contact.m_tangentSpeed).assertEqual(0);
        });
        it('test_016_3', 0, () => {
            // SetTangentSpeed
            const contact: b2Contact = b2CircleContact.Create();
            contact.SetTangentSpeed(-2);
            expect(contact.m_tangentSpeed).assertEqual(-2);
        });
        it('test_017_1', 0, () => {
            // GetTangentSpeed
            const contact: b2Contact = b2CircleContact.Create();
            let speed = contact.GetTangentSpeed();
            expect(speed).assertEqual(0);
        });
        it('test_017_2', 0, () => {
            // GetTangentSpeed
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_tangentSpeed = 1;
            let speed = contact.GetTangentSpeed();
            expect(speed).assertEqual(1);
        });
        it('test_017_3', 0, () => {
            // GetTangentSpeed
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_tangentSpeed = 2;
            let speed = contact.GetTangentSpeed();
            expect(speed).assertEqual(2);
        });
        it('test_020_1', 0, () => {
            // FlagForFiltering
            const contact: b2Contact = b2CircleContact.Create();
            contact.FlagForFiltering();
            expect(contact.m_filterFlag).assertEqual(true);
        });
        it('test_020_2', 0, () => {
            // FlagForFiltering
            const contact: b2Contact = b2CircleContact.Create();
            contact.m_filterFlag = false;
            contact.FlagForFiltering();
            expect(contact.m_filterFlag).assertEqual(true);
        });
        it('test_021_1', 0, () => {
            // b2MixFriction
            let result = b2MixFriction(3, 3);
            expect(result).assertEqual(3);
        });
        it('test_021_2', 0, () => {
            // b2MixFriction
            let result = b2MixFriction(2, 2);
            expect(result).assertEqual(2);
        });
        it('test_021_3', 0, () => {
            // b2MixFriction
            let result = b2MixFriction(1, 4);
            expect(result).assertEqual(2);
        });
        it('test_022_1', 0, () => {
            // b2MixRestitution
            let result = b2MixRestitution(2, 3);
            expect(result).assertEqual(3);
        });
        it('test_022_2', 0, () => {
            // b2MixRestitution
            let result = b2MixRestitution(-2, -3);
            expect(result).assertEqual(-2);
        });
        it('test_022_3', 0, () => {
            // b2MixRestitution
            let result = b2MixRestitution(0, 1);
            expect(result).assertEqual(1);
        });
    });
}
