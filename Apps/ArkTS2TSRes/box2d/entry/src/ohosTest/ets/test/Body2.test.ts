let __generate__Id: number = 0;
function generateId(): string {
    return "Body2.test_" + ++__generate__Id;
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
import { b2BodyType, b2MassData, b2Transform, b2Vec2, XY } from '@ohos/box2d';
export default function bodyTest2() {
    describe('body_test2', () => {
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
        it('test_013_1', 0, () => {
            // SetGravityScale
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let scale: number = 3;
            ground.SetGravityScale(scale);
            expect(ground.m_gravityScale).assertEqual(3);
        });
        it('test_013_2', 0, () => {
            // SetGravityScale
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let scale: number = 2;
            ground.SetGravityScale(scale);
            expect(ground.m_gravityScale).assertEqual(2);
        });
        it('test_013_3', 0, () => {
            // SetGravityScale
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let scale: number = -3;
            ground.SetGravityScale(scale);
            expect(ground.m_gravityScale).assertEqual(-3);
        });
        it('test_013_4', 0, () => {
            // SetGravityScale
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let scale: number = -1;
            ground.SetGravityScale(scale);
            expect(ground.m_gravityScale).assertEqual(-1);
        });
        it('test_013_5', 0, () => {
            // SetGravityScale
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let scale: number = 0;
            ground.SetGravityScale(scale);
            expect(ground.m_gravityScale).assertEqual(0);
        });
        it('test_014_1', 0, () => {
            // ApplyForce
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let force: XY = { x: 10, y: 20 };
            let point: XY = { x: 2, y: 3 };
            ground.ApplyForce(force, point);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_014_2', 0, () => {
            // ApplyForce
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 0;
            let force: XY = { x: 10, y: 20 };
            let point: XY = { x: 2, y: 3 };
            ground.ApplyForce(force, point);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_014_3', 0, () => {
            // ApplyForce
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 1;
            let force: XY = { x: 10, y: 20 };
            let point: XY = { x: 2, y: 3 };
            ground.ApplyForce(force, point);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_014_4', 0, () => {
            // ApplyForce
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 2;
            let force: XY = { x: 10, y: 20 };
            let point: XY = { x: 2, y: 3 };
            ground.ApplyForce(force, point);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":10,"1":20}}');
        });
        it('test_014_5', 0, () => {
            // ApplyForce
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let force: XY = { x: -10, y: -20 };
            let point: XY = { x: -2, y: -3 };
            ground.m_type = 2;
            ground.ApplyForce(force, point);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":-10,"1":-20}}');
        });
        it('test_015_1', 0, () => {
            // ApplyForceToCenter
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let force: XY = { x: 10, y: 20 };
            ground.ApplyForceToCenter(force);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_015_2', 0, () => {
            // ApplyForceToCenter
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 0;
            let force: XY = { x: 10, y: 20 };
            ground.ApplyForceToCenter(force);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_015_5', 0, () => {
            // ApplyForceToCenter
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 1;
            let force: XY = { x: 10, y: 20 };
            ground.ApplyForceToCenter(force);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_015_3', 0, () => {
            // ApplyForceToCenter
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 2;
            let force: XY = { x: 10, y: 20 };
            ground.ApplyForceToCenter(force);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":10,"1":20}}');
        });
        it('test_015_4', 0, () => {
            // ApplyForceToCenter
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 2;
            let force: XY = { x: -10, y: -20 };
            ground.ApplyForceToCenter(force);
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":-10,"1":-20}}');
        });
        it('test_016_1', 0, () => {
            // ApplyTorque
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let torque: number = 2;
            ground.ApplyTorque(torque);
            expect(ground.m_torque).assertEqual(0);
        });
        it('test_016_2', 0, () => {
            // ApplyTorque
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 0;
            let torque: number = 2;
            ground.ApplyTorque(torque);
            expect(ground.m_torque).assertEqual(0);
        });
        it('test_016_3', 0, () => {
            // ApplyTorque
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 1;
            let torque: number = 2;
            ground.ApplyTorque(torque);
            expect(ground.m_torque).assertEqual(0);
        });
        it('test_016_4', 0, () => {
            // ApplyTorque
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 2;
            let torque: number = 2;
            ground.ApplyTorque(torque);
            expect(ground.m_torque).assertEqual(2);
        });
        it('test_016_5', 0, () => {
            // ApplyTorque
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 2;
            let torque: number = -2;
            ground.ApplyTorque(torque);
            expect(ground.m_torque).assertEqual(-2);
        });
        it('test_017_1', 0, () => {
            // ApplyLinearImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_torque = 1;
            ground.m_angularVelocity = 1;
            ground.m_force.Copy(new b2Vec2(1, 2));
            ground.m_awakeFlag = false;
            ground.m_invMass = 2;
            ground.m_invI = 2;
            ground.m_sweep.c.Copy(new b2Vec2(2, 3));
            const fd = new box2d.b2FixtureDef();
            // Head
            fd.shape = new box2d.b2CircleShape(1.25);
            fd.density = 1.0;
            fd.friction = 0.4;
            fd.restitution = 0.3;
            const head = m_world.CreateBody(bd);
            head.CreateFixture(fd);
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            let impulse = new box2d.b2Vec2(3, 5);
            ground.ApplyLinearImpulse(impulse, head.GetWorldCenter());
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            expect(ground.m_awakeFlag).assertEqual(false);
        });
        it('test_017_2', 0, () => {
            // ApplyLinearImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_torque = 1;
            ground.m_angularVelocity = 1;
            ground.m_force.Copy(new b2Vec2(1, 2));
            ground.m_type = b2BodyType.b2_unknown;
            ground.m_awakeFlag = false;
            ground.m_invMass = 2;
            ground.m_invI = 2;
            ground.m_sweep.c.Copy(new b2Vec2(2, 3));
            const fd = new box2d.b2FixtureDef();
            // Head
            fd.shape = new box2d.b2CircleShape(1.25);
            fd.density = 1.0;
            fd.friction = 0.4;
            fd.restitution = 0.3;
            const head = m_world.CreateBody(bd);
            head.CreateFixture(fd);
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            let impulse = new box2d.b2Vec2(3, 5);
            ground.ApplyLinearImpulse(impulse, head.GetWorldCenter());
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            expect(ground.m_awakeFlag).assertEqual(false);
        });
        it('test_017_3', 0, () => {
            // ApplyLinearImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_torque = 1;
            ground.m_angularVelocity = 1;
            ground.m_force.Copy(new b2Vec2(1, 2));
            ground.m_type = b2BodyType.b2_kinematicBody;
            ground.m_awakeFlag = false;
            ground.m_invMass = 2;
            ground.m_invI = 2;
            ground.m_sweep.c.Copy(new b2Vec2(2, 3));
            const fd = new box2d.b2FixtureDef();
            // Head
            fd.shape = new box2d.b2CircleShape(1.25);
            fd.density = 1.0;
            fd.friction = 0.4;
            fd.restitution = 0.3;
            const head = m_world.CreateBody(bd);
            head.CreateFixture(fd);
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            let impulse = new box2d.b2Vec2(3, 5);
            ground.ApplyLinearImpulse(impulse, head.GetWorldCenter());
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            expect(ground.m_awakeFlag).assertEqual(false);
        });
        it('test_017_4', 0, () => {
            // ApplyLinearImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_torque = 1;
            ground.m_angularVelocity = 1;
            ground.m_force.Copy(new b2Vec2(1, 2));
            ground.m_type = b2BodyType.b2_staticBody;
            ground.m_awakeFlag = false;
            ground.m_invMass = 2;
            ground.m_invI = 2;
            ground.m_sweep.c.Copy(new b2Vec2(2, 3));
            const fd = new box2d.b2FixtureDef();
            // Head
            fd.shape = new box2d.b2CircleShape(1.25);
            fd.density = 1.0;
            fd.friction = 0.4;
            fd.restitution = 0.3;
            const head = m_world.CreateBody(bd);
            head.CreateFixture(fd);
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            let impulse = new box2d.b2Vec2(3, 5);
            ground.ApplyLinearImpulse(impulse, head.GetWorldCenter());
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(ground.m_torque).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            expect(JSON.stringify(ground.m_force)).assertEqual('{"data":{"0":1,"1":2}}');
            expect(ground.m_awakeFlag).assertEqual(false);
        });
        it('test_017_5', 0, () => {
            // ApplyLinearImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_torque = 1;
            ground.m_angularVelocity = 1;
            ground.m_force.Copy(new b2Vec2(1, 2));
            ground.m_type = b2BodyType.b2_dynamicBody;
            ground.m_awakeFlag = true;
            ground.m_invMass = 2;
            ground.m_invI = 2;
            ground.m_sweep.c.Copy(new b2Vec2(2, 3));
            const fd = new box2d.b2FixtureDef();
            // Head
            fd.shape = new box2d.b2CircleShape(1.25);
            fd.density = 1.0;
            fd.friction = 0.4;
            fd.restitution = 0.3;
            const head = m_world.CreateBody(bd);
            head.CreateFixture(fd);
            expect(ground.m_angularVelocity).assertEqual(1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":0,"1":0}}');
            let impulse = new box2d.b2Vec2(3, 5);
            ground.ApplyLinearImpulse(impulse, head.GetWorldCenter());
            expect(ground.m_angularVelocity).assertEqual(-1);
            expect(JSON.stringify(ground.m_linearVelocity)).assertEqual('{"data":{"0":6,"1":10}}');
            expect(ground.m_awakeFlag).assertEqual(true);
        });
        it('test_018_1', 0, () => {
            // ApplyAngularImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let impulse: number = 2;
            ground.ApplyAngularImpulse(impulse);
            expect(ground.m_angularVelocity).assertEqual(0);
        });
        it('test_018_2', 0, () => {
            // ApplyAngularImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = -1;
            let impulse: number = 2;
            ground.ApplyAngularImpulse(impulse);
            expect(ground.m_angularVelocity).assertEqual(0);
        });
        it('test_018_3', 0, () => {
            // ApplyAngularImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 0;
            let impulse: number = 2;
            ground.ApplyAngularImpulse(impulse);
            expect(ground.m_angularVelocity).assertEqual(0);
        });
        it('test_018_4', 0, () => {
            // ApplyAngularImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 1;
            let impulse: number = 2;
            ground.ApplyAngularImpulse(impulse);
            expect(ground.m_angularVelocity).assertEqual(0);
        });
        it('test_018_5', 0, () => {
            // ApplyAngularImpulse
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_type = 2;
            ground.m_invI = 1;
            let impulse: number = 2;
            ground.ApplyAngularImpulse(impulse);
            expect(ground.m_angularVelocity).assertEqual(2);
        });
        it('test_019_1', 0, () => {
            // GetMass
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let m_mass = ground.GetMass();
            expect(m_mass).assertEqual(0);
        });
        it('test_019_2', 0, () => {
            // GetMass
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = 1;
            let m_mass = ground.GetMass();
            expect(m_mass).assertEqual(1);
        });
        it('test_019_3', 0, () => {
            // GetMass
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = 2;
            let m_mass = ground.GetMass();
            expect(m_mass).assertEqual(2);
        });
        it('test_019_4', 0, () => {
            // GetMass
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = -1;
            let m_mass = ground.GetMass();
            expect(m_mass).assertEqual(-1);
        });
        it('test_019_5', 0, () => {
            // GetMass
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = -10;
            let m_mass = ground.GetMass();
            expect(m_mass).assertEqual(-10);
        });
        it('test_020_1', 0, () => {
            // GetInertia
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let inertia = ground.GetInertia();
            expect(inertia).assertEqual(0);
        });
        it('test_020_2', 0, () => {
            // GetInertia
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_I = 1;
            ground.m_mass = 1;
            let inertia = ground.GetInertia();
            expect(inertia).assertEqual(1);
        });
        it('test_020_3', 0, () => {
            // GetInertia
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_I = -1;
            ground.m_mass = 2;
            let inertia = ground.GetInertia();
            expect(inertia).assertEqual(-1);
        });
        it('test_020_4', 0, () => {
            // GetInertia
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_I = 1;
            ground.m_mass = 3;
            let inertia = ground.GetInertia();
            expect(inertia).assertEqual(1);
        });
        it('test_020_5', 0, () => {
            // GetInertia
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_I = 11;
            ground.m_mass = -1;
            let inertia = ground.GetInertia();
            expect(inertia).assertEqual(11);
        });
        it('test_021_1', 0, () => {
            // GetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            let massData = ground.GetMassData(data);
            expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":0,"1":0}},"I":0}');
        });
        it('test_021_2', 0, () => {
            // GetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = 1;
            ground.m_I = 2;
            ground.m_sweep.localCenter.Copy(new b2Vec2(2, 3));
            let data: b2MassData = new b2MassData();
            let massData = ground.GetMassData(data);
            expect(JSON.stringify(massData)).assertEqual('{"mass":1,"center":{"data":{"0":2,"1":3}},"I":15}');
        });
        it('test_021_3', 0, () => {
            // GetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = -1;
            ground.m_I = -2;
            ground.m_sweep.localCenter.Copy(new b2Vec2(-2, -3));
            let data: b2MassData = new b2MassData();
            let massData = ground.GetMassData(data);
            expect(JSON.stringify(massData)).assertEqual('{"mass":-1,"center":{"data":{"0":-2,"1":-3}},"I":-15}');
        });
        it('test_021_4', 0, () => {
            // GetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = 0;
            ground.m_I = 2;
            ground.m_sweep.localCenter.Copy(new b2Vec2(1, 2));
            let data: b2MassData = new b2MassData();
            let massData = ground.GetMassData(data);
            expect(JSON.stringify(massData)).assertEqual('{"mass":0,"center":{"data":{"0":1,"1":2}},"I":2}');
        });
        it('test_021_5', 0, () => {
            // GetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            ground.m_mass = 1.5;
            ground.m_I = 3;
            ground.m_sweep.localCenter.Copy(new b2Vec2(3, 2));
            let data: b2MassData = new b2MassData();
            let massData = ground.GetMassData(data);
            expect(JSON.stringify(massData)).assertEqual('{"mass":1.5,"center":{"data":{"0":3,"1":2}},"I":22.5}');
        });
        it('test_022_1', 0, () => {
            // SetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            ground.SetMassData(data);
            expect(ground.m_invMass).assertEqual(0);
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
        });
        it('test_022_2', 0, () => {
            // SetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = 1;
            data.center.Copy(new b2Vec2(1, 1));
            data.I = 1;
            ground.m_type = b2BodyType.b2_unknown;
            ground.SetMassData(data);
            expect(ground.m_invMass).assertEqual(0);
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
        });
        it('test_022_3', 0, () => {
            // SetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = 1;
            data.center.Copy(new b2Vec2(1, 1));
            data.I = 1;
            ground.m_type = b2BodyType.b2_staticBody;
            ground.SetMassData(data);
            expect(ground.m_invMass).assertEqual(0);
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
        });
        it('test_022_4', 0, () => {
            // SetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = 1;
            data.center.Copy(new b2Vec2(1, 1));
            data.I = 1;
            ground.m_type = b2BodyType.b2_kinematicBody;
            ground.SetMassData(data);
            expect(ground.m_invMass).assertEqual(0);
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
        });
        it('test_022_5', 0, () => {
            // SetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = 1;
            data.center.Copy(new b2Vec2(1, 1));
            data.I = 1;
            ground.m_type = b2BodyType.b2_dynamicBody;
            ground.SetMassData(data);
            expect(ground.m_invMass).assertEqual(1);
            expect(ground.m_I).assertEqual(-1);
            expect(ground.m_invI).assertEqual(-1);
        });
        it('test_023_1', 0, () => {
            // ResetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = 1;
            data.center.Copy(new b2Vec2(1, 1));
            data.I = 1;
            ground.m_type = b2BodyType.b2_dynamicBody;
            ground.SetMassData(data);
            ground.ResetMassData();
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
            expect(JSON.stringify(ground.m_sweep.localCenter)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_023_2', 0, () => {
            // ResetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = 2;
            data.center.Copy(new b2Vec2(2, 2));
            data.I = 2;
            ground.m_type = b2BodyType.b2_dynamicBody;
            ground.SetMassData(data);
            ground.ResetMassData();
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
            expect(JSON.stringify(ground.m_sweep.localCenter)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_023_3', 0, () => {
            // ResetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = -1;
            data.center.Copy(new b2Vec2(-1, -1));
            data.I = -1;
            ground.m_type = b2BodyType.b2_dynamicBody;
            ground.SetMassData(data);
            ground.ResetMassData();
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
            expect(JSON.stringify(ground.m_sweep.localCenter)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_023_4', 0, () => {
            // ResetMassData
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let data: b2MassData = new b2MassData();
            data.mass = -12;
            data.center.Copy(new b2Vec2(-1, 1));
            data.I = 3;
            ground.m_type = b2BodyType.b2_dynamicBody;
            ground.SetMassData(data);
            ground.ResetMassData();
            expect(ground.m_I).assertEqual(0);
            expect(ground.m_invI).assertEqual(0);
            expect(JSON.stringify(ground.m_sweep.localCenter)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_024_1', 0, () => {
            // GetWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let point = ground.GetWorldPoint(localPoint, out);
            expect(JSON.stringify(point)).assertEqual('{"data":{"0":10,"1":20}}');
        });
        it('test_024_2', 0, () => {
            // GetWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: -10, y: -20 };
            let out = new box2d.b2Vec2();
            let point = ground.GetWorldPoint(localPoint, out);
            expect(JSON.stringify(point)).assertEqual('{"data":{"0":-10,"1":-20}}');
        });
        it('test_024_3', 0, () => {
            // GetWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: 10, y: -20 };
            let out = new box2d.b2Vec2();
            let point = ground.GetWorldPoint(localPoint, out);
            expect(JSON.stringify(point)).assertEqual('{"data":{"0":10,"1":-20}}');
        });
        it('test_024_4', 0, () => {
            // GetWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: -10, y: 20 };
            let out = new box2d.b2Vec2();
            let point = ground.GetWorldPoint(localPoint, out);
            expect(JSON.stringify(point)).assertEqual('{"data":{"0":-10,"1":20}}');
        });
        it('test_024_5', 0, () => {
            // GetWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: 0, y: 0 };
            let out = new box2d.b2Vec2();
            let point = ground.GetWorldPoint(localPoint, out);
            expect(JSON.stringify(point)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_025_1', 0, () => {
            // GetWorldVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let result = ground.GetWorldVector(localPoint, out);
            expect(JSON.stringify(result)).assertEqual('{"data":{"0":10,"1":20}}');
        });
        it('test_025_2', 0, () => {
            // GetWorldVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(80);
            ground.SetTransform(xf);
            let result = ground.GetWorldVector(localPoint, out);
            expect(JSON.stringify(result)).assertEqual('{"data":{"0":18.773900985717773,"1":-12.146631240844727}}');
        });
        it('test_025_3', 0, () => {
            // GetWorldVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(90);
            ground.SetTransform(xf);
            let result = ground.GetWorldVector(localPoint, out);
            expect(JSON.stringify(result)).assertEqual('{"data":{"0":-22.36067008972168,"1":-0.0215056873857975}}');
        });
        it('test_025_4', 0, () => {
            // GetWorldVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let localPoint: XY = { x: 1, y: 1 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(-90);
            ground.SetTransform(xf);
            let result = ground.GetWorldVector(localPoint, out);
            expect(JSON.stringify(result)).assertEqual('{"data":{"0":0.4459230601787567,"1":-1.34207022190094}}');
        });
        it('test_026_1', 0, () => {
            // GetLocalPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldPoint: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let p = ground.GetLocalPoint(worldPoint, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":10,"1":20}}');
        });
        it('test_026_2', 0, () => {
            // GetLocalPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldPoint: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(80);
            ground.SetTransform(xf);
            let p = ground.GetLocalPoint(worldPoint, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":-20.981645584106445,"1":7.731141567230225}}');
        });
        it('test_026_3', 0, () => {
            // GetLocalPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldPoint: XY = { x: 1, y: 2 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(80);
            ground.SetTransform(xf);
            let p = ground.GetLocalPoint(worldPoint, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":-2.0981645584106445,"1":0.7731141448020935}}');
        });
        it('test_026_4', 0, () => {
            // GetLocalPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldPoint: XY = { x: -10, y: -20 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(90);
            ground.SetTransform(xf);
            let p = ground.GetLocalPoint(worldPoint, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":-13.399197578430176,"1":17.901439666748047}}');
        });
        it('test_027_1', 0, () => {
            // GetLocalVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let v = ground.GetLocalVector(worldVector, out);
            expect(JSON.stringify(v)).assertEqual('{"data":{"0":10,"1":20}}');
        });
        it('test_027_2', 0, () => {
            // GetLocalVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(80);
            ground.SetTransform(xf);
            let v = ground.GetLocalVector(worldVector, out);
            expect(JSON.stringify(v)).assertEqual('{"data":{"0":-20.981645584106445,"1":7.731141567230225}}');
        });
        it('test_027_3', 0, () => {
            // GetLocalVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: -10, y: -20 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(80);
            ground.SetTransform(xf);
            let v = ground.GetLocalVector(worldVector, out);
            expect(JSON.stringify(v)).assertEqual('{"data":{"0":20.981645584106445,"1":-7.731141567230225}}');
        });
        it('test_027_4', 0, () => {
            // GetLocalVector
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: 1, y: 1 };
            let out = new box2d.b2Vec2();
            let xf: b2Transform = new b2Transform();
            xf.q.SetAngle(90);
            ground.SetTransform(xf);
            let v = ground.GetLocalVector(worldVector, out);
            expect(JSON.stringify(v)).assertEqual('{"data":{"0":0.4459230601787567,"1":-1.34207022190094}}');
        });
        it('test_028_1', 0, () => {
            // GetLinearVelocityFromWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            let p = ground.GetLinearVelocityFromWorldPoint(worldVector, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":0,"1":0}}');
        });
        it('test_028_2', 0, () => {
            // GetLinearVelocityFromWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: 10, y: 20 };
            let out = new box2d.b2Vec2();
            ground.m_linearVelocity.Copy(new b2Vec2(1, 1));
            ground.m_angularVelocity = 2;
            ground.m_sweep.c.Copy(new b2Vec2(2, 3));
            let p = ground.GetLinearVelocityFromWorldPoint(worldVector, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":-33,"1":17}}');
        });
        it('test_028_3', 0, () => {
            // GetLinearVelocityFromWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: -1, y: -2 };
            let out = new box2d.b2Vec2();
            ground.m_linearVelocity.Copy(new b2Vec2(-1, -1));
            ground.m_angularVelocity = 2;
            ground.m_sweep.c.Copy(new b2Vec2(2, 3));
            let p = ground.GetLinearVelocityFromWorldPoint(worldVector, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":9,"1":-7}}');
        });
        it('test_028_4', 0, () => {
            // GetLinearVelocityFromWorldPoint
            const bd = new box2d.b2BodyDef();
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const ground = m_world.CreateBody(bd);
            let worldVector: XY = { x: 1, y: 1 };
            let out = new box2d.b2Vec2();
            ground.m_linearVelocity.Copy(new b2Vec2(2, 3));
            ground.m_angularVelocity = 1;
            ground.m_sweep.c.Copy(new b2Vec2(-2, -3));
            let p = ground.GetLinearVelocityFromWorldPoint(worldVector, out);
            expect(JSON.stringify(p)).assertEqual('{"data":{"0":-2,"1":6}}');
        });
    });
}
