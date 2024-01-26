let __generate__Id: number = 0;
function generateId(): string {
    return "World2.test_" + ++__generate__Id;
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
import { b2CircleContact, b2IBodyDef, b2ParticleSystemDef, b2TreeNode, b2Vec2 } from '@ohos/box2d';
export default function worldTest2() {
    describe('world_test2', () => {
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
        it('test_015_1', 0, () => {
            // GetBodyList
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            expect(m_world.GetBodyList()).assertNull();
        });
        it('test_015_2', 0, () => {
            // GetBodyList
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            expect(m_world.GetBodyList()).assertNull();
            let bd: b2IBodyDef = new box2d.b2BodyDef();
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(10, -10);
            let world: box2d.b2World = new box2d.b2World(gravity1);
            m_world.m_bodyList = new box2d.b2Body(bd, world);
            expect(m_world.GetBodyList()).assertEqual(m_world.m_bodyList);
        });
        it('test_015_3', 0, () => {
            // GetBodyList
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            expect(m_world.GetBodyList()).assertNull();
            let bd: b2IBodyDef = new box2d.b2BodyDef();
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let world: box2d.b2World = new box2d.b2World(gravity1);
            m_world.m_bodyList = new box2d.b2Body(bd, world);
            expect(m_world.GetBodyList()).assertEqual(m_world.m_bodyList);
        });
        it('test_015_4', 0, () => {
            // GetBodyList
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            expect(m_world.GetBodyList()).assertNull();
            let bd: b2IBodyDef = new box2d.b2BodyDef();
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let world: box2d.b2World = new box2d.b2World(gravity1);
            m_world.m_bodyList = new box2d.b2Body(bd, world);
            expect(m_world.GetBodyList()).assertEqual(m_world.m_bodyList);
        });
        it('test_016_1', 0, () => {
            // GetJointList
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            let jointList = m_world.GetJointList();
            expect(jointList).assertNull();
        });
        it('test_016_2', 0, () => {
            // GetJointList
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            const bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_dynamicBody;
            const rjd = new box2d.b2RevoluteJointDef();
            bd.position.Set(-10.0, 20.0);
            const body = m_world.CreateBody(bd);
            const bd1 = new box2d.b2BodyDef();
            let ground = m_world.CreateBody(bd1);
            rjd.Initialize(ground, body, new box2d.b2Vec2(-10.0, 12.0));
            let m_joint = m_world.CreateJoint(rjd);
            m_world.m_jointList = m_joint;
            let jointList = m_world.GetJointList();
            expect(jointList).not().assertNull();
        });
        it('test_016_3', 0, () => {
            // GetJointList
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            const bd = new box2d.b2BodyDef();
            bd.type = box2d.b2BodyType.b2_dynamicBody;
            const rjd = new box2d.b2RevoluteJointDef();
            bd.position.Set(10.0, -20.0);
            const body = m_world.CreateBody(bd);
            const bd1 = new box2d.b2BodyDef();
            let ground = m_world.CreateBody(bd1);
            rjd.Initialize(ground, body, new box2d.b2Vec2(10.0, -12.0));
            let m_joint = m_world.CreateJoint(rjd);
            m_world.m_jointList = m_joint;
            let jointList = m_world.GetJointList();
            expect(jointList).not().assertNull();
        });
        it('test_017_1', 0, () => {
            // SetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = true;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.m_warmStarting).assertEqual(enableWarmStarting);
        });
        it('test_017_2', 0, () => {
            // SetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = false;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.m_warmStarting).assertEqual(enableWarmStarting);
        });
        it('test_017_3', 0, () => {
            // SetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = true;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.m_warmStarting).assertEqual(enableWarmStarting);
        });
        it('test_017_4', 0, () => {
            // SetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = false;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.m_warmStarting).assertEqual(enableWarmStarting);
        });
        it('test_018_1', 0, () => {
            // GetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = true;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.GetWarmStarting()).assertEqual(enableWarmStarting);
        });
        it('test_018_2', 0, () => {
            // GetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = false;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.GetWarmStarting()).assertEqual(enableWarmStarting);
        });
        it('test_018_3', 0, () => {
            // GetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = true;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.GetWarmStarting()).assertEqual(enableWarmStarting);
        });
        it('test_018_4', 0, () => {
            // GetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = false;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.GetWarmStarting()).assertEqual(enableWarmStarting);
        });
        it('test_018_5', 0, () => {
            // GetWarmStarting
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
            let m_world = new box2d.b2World(gravity);
            let enableWarmStarting: boolean = true;
            m_world.SetWarmStarting(enableWarmStarting);
            expect(m_world.GetWarmStarting()).assertEqual(enableWarmStarting);
        });
        it('test_019_1', 0, () => {
            // SetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(true);
            expect(m_world.m_continuousPhysics).assertEqual(true);
        });
        it('test_019_2', 0, () => {
            // SetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(false);
            expect(m_world.m_continuousPhysics).assertEqual(false);
        });
        it('test_019_3', 0, () => {
            // SetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(true);
            expect(m_world.m_continuousPhysics).assertEqual(true);
        });
        it('test_019_4', 0, () => {
            // SetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(false);
            expect(m_world.m_continuousPhysics).assertEqual(false);
        });
        it('test_019_5', 0, () => {
            // SetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(true);
            expect(m_world.m_continuousPhysics).assertEqual(true);
        });
        it('test_020_1', 0, () => {
            // GetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(true);
            expect(m_world.GetContinuousPhysics()).assertEqual(true);
        });
        it('test_020_2', 0, () => {
            // GetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -1);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(false);
            expect(m_world.GetContinuousPhysics()).assertEqual(false);
        });
        it('test_020_3', 0, () => {
            // GetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(true);
            expect(m_world.GetContinuousPhysics()).assertEqual(true);
        });
        it('test_020_4', 0, () => {
            // GetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(false);
            expect(m_world.GetContinuousPhysics()).assertEqual(false);
        });
        it('test_020_5', 0, () => {
            // GetContinuousPhysics
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            let m_world = new box2d.b2World(gravity);
            m_world.SetContinuousPhysics(true);
            expect(m_world.GetContinuousPhysics()).assertEqual(true);
        });
        it('test_021_1', 0, () => {
            // GetProxyCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const proxyCount = m_world.GetProxyCount();
            expect(proxyCount).assertEqual(0);
        });
        it('test_021_2', 0, () => {
            // GetProxyCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_contactManager.m_broadPhase.m_proxyCount = 1;
            const proxyCount = m_world.GetProxyCount();
            expect(proxyCount).assertEqual(1);
        });
        it('test_021_3', 0, () => {
            // GetProxyCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_contactManager.m_broadPhase.m_proxyCount = 11;
            const proxyCount = m_world.GetProxyCount();
            expect(proxyCount).assertEqual(11);
        });
        it('test_022_1', 0, () => {
            // GetBodyCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const bodyCount = m_world.GetBodyCount();
            expect(bodyCount).assertEqual(0);
        });
        it('test_022_2', 0, () => {
            // GetBodyCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_bodyCount = 1;
            const bodyCount = m_world.GetBodyCount();
            expect(bodyCount).assertEqual(1);
        });
        it('test_022_3', 0, () => {
            // GetBodyCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_bodyCount = 3;
            const bodyCount = m_world.GetBodyCount();
            expect(bodyCount).assertEqual(3);
        });
        it('test_022_4', 0, () => {
            // GetBodyCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_bodyCount = 11;
            const bodyCount = m_world.GetBodyCount();
            expect(bodyCount).assertEqual(11);
        });
        it('test_023_1', 0, () => {
            // GetJointCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const jointCount = m_world.GetJointCount();
            expect(jointCount).assertEqual(0);
        });
        it('test_023_2', 0, () => {
            // GetJointCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_jointCount = 4;
            const jointCount = m_world.GetJointCount();
            expect(jointCount).assertEqual(4);
        });
        it('test_023_3', 0, () => {
            // GetJointCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_jointCount = 1;
            const jointCount = m_world.GetJointCount();
            expect(jointCount).assertEqual(1);
        });
        it('test_023_4', 0, () => {
            // GetJointCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_jointCount = 11;
            const jointCount = m_world.GetJointCount();
            expect(jointCount).assertEqual(11);
        });
        it('test_024_1', 0, () => {
            // GetContactCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const contactCount = m_world.GetContactCount();
            expect(contactCount).assertEqual(0);
        });
        it('test_024_2', 0, () => {
            // GetContactCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_contactManager.m_contactCount = 4;
            const contactCount = m_world.GetContactCount();
            expect(contactCount).assertEqual(4);
        });
        it('test_024_3', 0, () => {
            // GetContactCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_contactManager.m_contactCount = -4;
            const contactCount = m_world.GetContactCount();
            expect(contactCount).assertEqual(-4);
        });
        it('test_024_4', 0, () => {
            // GetContactCount
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_contactManager.m_contactCount = 1;
            const contactCount = m_world.GetContactCount();
            expect(contactCount).assertEqual(1);
        });
        it('test_025_1', 0, () => {
            // GetTreeHeight
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const treeHeight = m_world.GetTreeHeight();
            expect(treeHeight).assertEqual(0);
        });
        it('test_025_2', 0, () => {
            // GetTreeHeight
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.height = 11;
            const treeHeight = m_world.GetTreeHeight();
            expect(treeHeight).assertEqual(11);
        });
        it('test_025_3', 0, () => {
            // GetTreeHeight
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.height = -1;
            const treeHeight = m_world.GetTreeHeight();
            expect(treeHeight).assertEqual(-1);
        });
        it('test_026_1', 0, () => {
            // GetTreeBalance
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const treeBalance = m_world.GetTreeBalance();
            expect(treeBalance).assertEqual(0);
        });
        it('test_026_2', 0, () => {
            // GetTreeBalance
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.height = 11;
            root.child1 = new b2TreeNode();
            root.child1.height = 2;
            root.child2 = new b2TreeNode();
            root.child1.height = 8;
            const treeBalance = m_world.GetTreeBalance();
            expect(treeBalance).assertEqual(8);
        });
        it('test_026_3', 0, () => {
            // GetTreeBalance
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.height = 1;
            root.child1 = new b2TreeNode();
            root.child1.height = 2;
            root.child2 = new b2TreeNode();
            root.child1.height = 8;
            const treeBalance = m_world.GetTreeBalance();
            expect(treeBalance).assertEqual(0);
        });
        it('test_026_4', 0, () => {
            // GetTreeBalance
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.height = 2;
            root.child1 = new b2TreeNode();
            root.child1.height = 1;
            root.child2 = new b2TreeNode();
            root.child1.height = -1;
            const treeBalance = m_world.GetTreeBalance();
            expect(treeBalance).assertEqual(1);
        });
        it('test_026_5', 0, () => {
            // GetTreeBalance
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.height = 0;
            root.child1 = new b2TreeNode();
            root.child1.height = 1;
            root.child2 = new b2TreeNode();
            root.child1.height = -1;
            const treeBalance = m_world.GetTreeBalance();
            expect(treeBalance).assertEqual(0);
        });
        it('test_027_1', 0, () => {
            // GetTreeQuality
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const treeQuality = m_world.GetTreeQuality();
            expect(treeQuality).assertEqual(0);
        });
        it('test_027_2', 0, () => {
            // GetTreeQuality
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.aabb.lowerBound.Copy(new b2Vec2(1, 2));
            root.aabb.upperBound.Copy(new b2Vec2(2, 3));
            const rootArea: number = root.aabb.GetPerimeter();
            root.child1 = new b2TreeNode();
            root.child2 = new b2TreeNode();
            m_world.m_contactManager.m_broadPhase.m_tree.GetAreaRatio();
            const treeQuality = m_world.GetTreeQuality();
            expect(treeQuality).assertEqual(1);
        });
        it('test_027_3', 0, () => {
            // GetTreeQuality
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.aabb.lowerBound.Copy(new b2Vec2(-1, 2));
            root.aabb.upperBound.Copy(new b2Vec2(2, -3));
            root.child2 = new b2TreeNode();
            const treeQuality = m_world.GetTreeQuality();
            expect(treeQuality).assertEqual(0);
        });
        it('test_027_4', 0, () => {
            // GetTreeQuality
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let root = m_world.m_contactManager.m_broadPhase.m_tree.m_root = new b2TreeNode();
            root.aabb.lowerBound.Copy(new b2Vec2(-1, 2));
            root.aabb.upperBound.Copy(new b2Vec2(2, -3));
            const rootArea: number = root.aabb.GetPerimeter();
            root.child1 = new b2TreeNode();
            root.child1.aabb.lowerBound.Copy(new b2Vec2(1, 1));
            root.child1.aabb.upperBound.Copy(new b2Vec2(2, 3));
            root.child2 = new b2TreeNode();
            root.child2.aabb.lowerBound.Copy(new b2Vec2(-1, 1));
            root.child2.aabb.upperBound.Copy(new b2Vec2(2, -3));
            const treeQuality = m_world.GetTreeQuality();
            expect(treeQuality).assertEqual(1);
        });
        it('test_028_1', 0, () => {
            // SetGravity
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(1, 1);
            m_world.SetGravity(gravity1);
            expect(m_world.m_gravity).assertDeepEquals(gravity1);
        });
        it('test_028_2', 0, () => {
            // SetGravity
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(-1, -1);
            m_world.SetGravity(gravity1);
            expect(m_world.m_gravity).assertDeepEquals(gravity1);
        });
        it('test_028_3', 0, () => {
            // SetGravity
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            m_world.SetGravity(gravity1);
            expect(m_world.m_gravity).assertDeepEquals(gravity1);
        });
        it('test_029_1', 0, () => {
            // GetGravity
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(1, 1);
            m_world.m_gravity.Copy(gravity1);
            expect(m_world.GetGravity()).assertDeepEquals(gravity1);
        });
        it('test_029_2', 0, () => {
            // GetGravity
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(-1, -1);
            m_world.m_gravity.Copy(gravity1);
            expect(m_world.GetGravity()).assertDeepEquals(gravity1);
        });
        it('test_029_3', 0, () => {
            // GetGravity
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            const gravity1: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
            m_world.m_gravity.Copy(gravity1);
            expect(m_world.GetGravity()).assertDeepEquals(gravity1);
        });
        it('test_030_1', 0, () => {
            // IsLocked
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let isLocked = m_world.IsLocked();
            expect(isLocked).assertEqual(false);
        });
        it('test_030_2', 0, () => {
            // IsLocked
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_locked = false;
            let isLocked = m_world.IsLocked();
            expect(isLocked).assertEqual(false);
        });
        it('test_030_3', 0, () => {
            // IsLocked
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_locked = true;
            let isLocked = m_world.IsLocked();
            expect(isLocked).assertEqual(true);
        });
        it('test_031_1', 0, () => {
            // SetAutoClearForces
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetAutoClearForces(true);
            expect(m_world.m_clearForces).assertTrue();
        });
        it('test_031_2', 0, () => {
            // SetAutoClearForces
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetAutoClearForces(false);
            expect(m_world.m_clearForces).assertFalse();
        });
        it('test_032_1', 0, () => {
            // GetAutoClearForces
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetAutoClearForces(true);
            expect(m_world.GetAutoClearForces()).assertTrue();
        });
        it('test_032_2', 0, () => {
            // GetAutoClearForces
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.SetAutoClearForces(false);
            expect(m_world.GetAutoClearForces()).assertFalse();
        });
        it('test_033_1', 0, () => {
            // GetContactManager
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let m_contactManager = m_world.GetContactManager();
            expect(m_contactManager.m_contactCount).assertEqual(0);
            expect(m_contactManager.m_contactList).assertNull();
        });
        it('test_033_2', 0, () => {
            // GetContactManager
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_contactManager.m_contactCount = 4;
            m_world.m_contactManager.m_contactList = b2CircleContact.Create();
            let m_contactManager = m_world.GetContactManager();
            expect(m_contactManager.m_contactCount).assertEqual(4);
            expect(m_contactManager.m_contactList).not().assertNull();
        });
        it('test_033_3', 0, () => {
            // GetContactManager
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_contactManager.m_contactCount = 3;
            m_world.m_contactManager.m_contactList = b2CircleContact.Create();
            let m_contactManager = m_world.GetContactManager();
            expect(m_contactManager.m_contactCount).assertEqual(3);
            expect(m_contactManager.m_contactList).not().assertNull();
        });
        it('test_034_1', 0, () => {
            // GetProfile
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let m_profile = m_world.GetProfile();
            expect(JSON.stringify(m_profile)).assertEqual('{"step":0,"collide":0,"solve":0,"solveInit":0,"solveVelocity":0,"solvePosition":0,"broadphase":0,"solveTOI":0}');
        });
        it('test_034_2', 0, () => {
            // GetProfile
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_profile.solveInit = 1;
            m_world.m_profile.solveVelocity = 2;
            m_world.m_profile.solvePosition = 3;
            let m_profile = m_world.GetProfile();
            expect(JSON.stringify(m_profile)).assertEqual('{"step":0,"collide":0,"solve":0,"solveInit":1,"solveVelocity":2,"solvePosition":3,"broadphase":0,"solveTOI":0}');
        });
        it('test_034_3', 0, () => {
            // GetProfile
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_profile.broadphase = 1;
            m_world.m_profile.solveTOI = 2;
            m_world.m_profile.solve = 3;
            let m_profile = m_world.GetProfile();
            expect(JSON.stringify(m_profile)).assertEqual('{"step":0,"collide":0,"solve":3,"solveInit":0,"solveVelocity":0,"solvePosition":0,"broadphase":1,"solveTOI":2}');
        });
        it('test_034_4', 0, () => {
            // GetProfile
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            m_world.m_profile.step = 1;
            m_world.m_profile.collide = 2;
            let m_profile = m_world.GetProfile();
            expect(JSON.stringify(m_profile)).assertEqual('{"step":1,"collide":2,"solve":0,"solveInit":0,"solveVelocity":0,"solvePosition":0,"broadphase":0,"solveTOI":0}');
        });
        it('test_035_1', 0, () => {
            // CreateParticleSystem
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let def: b2ParticleSystemDef = new b2ParticleSystemDef();
            let system = m_world.CreateParticleSystem(def);
            expect(system.m_inverseDensity).assertEqual(1);
            expect(system.m_particleDiameter).assertEqual(2);
            expect(system.m_inverseDiameter).assertEqual(0.5);
            expect(system.m_squaredDiameter).assertEqual(4);
            expect(system.m_internalAllocatedCapacity).assertEqual(256);
        });
        it('test_035_2', 0, () => {
            // CreateParticleSystem
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let def: b2ParticleSystemDef = new b2ParticleSystemDef();
            def.density = 2;
            def.gravityScale = 3;
            def.radius = 1.5;
            def.maxCount = 4;
            let system = m_world.CreateParticleSystem(def);
            expect(system.m_inverseDensity).assertEqual(0.5);
            expect(system.m_particleDiameter).assertEqual(3);
            expect(system.m_inverseDiameter).assertEqual(0.3333333333333333);
            expect(system.m_squaredDiameter).assertEqual(9);
            expect(system.m_internalAllocatedCapacity).assertEqual(4);
        });
        it('test_035_3', 0, () => {
            // CreateParticleSystem
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let def: b2ParticleSystemDef = new b2ParticleSystemDef();
            def.density = 4;
            def.gravityScale = 2;
            def.radius = 3;
            def.maxCount = 2;
            let system = m_world.CreateParticleSystem(def);
            expect(system.m_inverseDensity).assertEqual(0.25);
            expect(system.m_particleDiameter).assertEqual(6);
            expect(system.m_inverseDiameter).assertEqual(0.16666666666666666);
            expect(system.m_squaredDiameter).assertEqual(36);
            expect(system.m_internalAllocatedCapacity).assertEqual(2);
        });
        it('test_036_1', 0, () => {
            // DestroyParticleSystem
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let def: b2ParticleSystemDef = new b2ParticleSystemDef();
            let system = m_world.CreateParticleSystem(def);
            m_world.DestroyParticleSystem(system);
            expect(system.m_prev).assertNull();
            expect(system.m_next).assertNull();
        });
        it('test_036_2', 0, () => {
            // DestroyParticleSystem
            const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
            let m_world = new box2d.b2World(gravity);
            let def: b2ParticleSystemDef = new b2ParticleSystemDef();
            let system = m_world.CreateParticleSystem(def);
            let prevDef: b2ParticleSystemDef = new b2ParticleSystemDef();
            let prev = m_world.CreateParticleSystem(prevDef);
            system.m_prev = prev;
            let nextDef: b2ParticleSystemDef = new b2ParticleSystemDef();
            let next = m_world.CreateParticleSystem(nextDef);
            system.m_next = next;
            m_world.DestroyParticleSystem(system);
            expect(system.m_prev.m_next).assertEqual(next);
            expect(system.m_next.m_prev).assertEqual(prev);
        });
    });
}
