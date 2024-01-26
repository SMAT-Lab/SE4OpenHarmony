let __generate__Id: number = 0;
function generateId(): string {
    return "module_activation_store.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import { ModuleActivationStore } from 'inversify/lib/container/module_activation_store';
import { interfaces } from 'inversify';
export default function module_activation_storeTest() {
    describe('module_activation_storeTest', () => {
        _it('should_remove_handlers_added_by_the_module', () => {
            const moduleActivationStore = new ModuleActivationStore();
            const moduleId1: number = 1;
            const moduleId2: number = 2;
            const serviceIdentifier1: string = 'some-service-1';
            const serviceIdentifier2: string = 'some-service-2';
            const onActivation1: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onActivation2: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onActivation3: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onDeactivation1: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            const onDeactivation2: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            const onDeactivation3: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            moduleActivationStore.addActivation(moduleId1, serviceIdentifier1, onActivation1);
            moduleActivationStore.addActivation(moduleId1, serviceIdentifier1, onActivation2);
            moduleActivationStore.addActivation(moduleId1, serviceIdentifier2, onActivation3);
            moduleActivationStore.addDeactivation(moduleId1, serviceIdentifier1, onDeactivation1);
            moduleActivationStore.addDeactivation(moduleId1, serviceIdentifier1, onDeactivation2);
            moduleActivationStore.addDeactivation(moduleId1, serviceIdentifier2, onDeactivation3);
            const onActivationMod2: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onDeactivationMod2: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            moduleActivationStore.addActivation(moduleId2, serviceIdentifier1, onActivationMod2);
            moduleActivationStore.addDeactivation(moduleId2, serviceIdentifier1, onDeactivationMod2);
            const handlers = moduleActivationStore.remove(moduleId1);
            expect(handlers.onActivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingActivation<any>[]>([
                [serviceIdentifier1, [onActivation1, onActivation2]],
                [serviceIdentifier2, [onActivation3]]
            ]));
            expect(handlers.onDeactivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingDeactivation<any>[]>([
                [serviceIdentifier1, [onDeactivation1, onDeactivation2]],
                [serviceIdentifier2, [onDeactivation3]],
            ]));
            const noHandlers = moduleActivationStore.remove(moduleId1);
            expect(noHandlers.onActivations.getMap()).to.deep.equal(new Map());
            expect(noHandlers.onDeactivations.getMap()).to.deep.equal(new Map());
            const module2Handlers = moduleActivationStore.remove(moduleId2);
            expect(module2Handlers.onActivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingActivation<any>[]>([[serviceIdentifier1, [onActivationMod2]]]));
            expect(module2Handlers.onDeactivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingDeactivation<any>[]>([[serviceIdentifier1, [onDeactivationMod2]]]));
        });
        _it('should_be_able_to_clone', () => {
            const moduleActivationStore = new ModuleActivationStore();
            const moduleId1: number = 1;
            const moduleId2: number = 2;
            const serviceIdentifier1: string = 'some-service-1';
            const serviceIdentifier2: string = 'some-service-2';
            const onActivation1: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onActivation2: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onActivation3: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onDeactivation1: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            const onDeactivation2: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            const onDeactivation3: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            moduleActivationStore.addActivation(moduleId1, serviceIdentifier1, onActivation1);
            moduleActivationStore.addActivation(moduleId1, serviceIdentifier1, onActivation2);
            moduleActivationStore.addActivation(moduleId1, serviceIdentifier2, onActivation3);
            moduleActivationStore.addDeactivation(moduleId1, serviceIdentifier1, onDeactivation1);
            moduleActivationStore.addDeactivation(moduleId1, serviceIdentifier1, onDeactivation2);
            moduleActivationStore.addDeactivation(moduleId1, serviceIdentifier2, onDeactivation3);
            const onActivationMod2: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onDeactivationMod2: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            moduleActivationStore.addActivation(moduleId2, serviceIdentifier1, onActivationMod2);
            moduleActivationStore.addDeactivation(moduleId2, serviceIdentifier1, onDeactivationMod2);
            const clone = moduleActivationStore.clone();
            //change original
            const onActivation4: interfaces.BindingActivation<any> = (c, a: any) => a;
            const onDeactivation4: interfaces.BindingDeactivation<any> = (d: any) => Promise.resolve();
            moduleActivationStore.addActivation(moduleId1, serviceIdentifier1, onActivation4);
            moduleActivationStore.addDeactivation(moduleId1, serviceIdentifier1, onDeactivation4);
            moduleActivationStore.remove(moduleId2);
            const cloneModule1Handlers = clone.remove(moduleId1);
            expect(cloneModule1Handlers.onActivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingActivation<any>[]>([
                [serviceIdentifier1, [onActivation1, onActivation2]],
                [serviceIdentifier2, [onActivation3]]
            ]));
            expect(cloneModule1Handlers.onDeactivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingDeactivation<any>[]>([
                [serviceIdentifier1, [onDeactivation1, onDeactivation2]],
                [serviceIdentifier2, [onDeactivation3]],
            ]));
            const cloneModule2Handlers = clone.remove(moduleId2);
            expect(cloneModule2Handlers.onActivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingActivation<any>[]>([[serviceIdentifier1, [onActivationMod2]]]));
            expect(cloneModule2Handlers.onDeactivations.getMap()).to.deep.equal(new Map<string, interfaces.BindingDeactivation<any>[]>([[serviceIdentifier1, [onDeactivationMod2]]]));
        });
    });
}
