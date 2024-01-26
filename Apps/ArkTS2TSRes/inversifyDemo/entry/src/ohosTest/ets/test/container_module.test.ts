let __generate__Id: number = 0;
function generateId(): string {
    return "container_module.test_" + ++__generate__Id;
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
import { NOT_REGISTERED } from 'inversify/lib/constants/error_msgs';
import { Container } from 'inversify';
import { AsyncContainerModule, ContainerModule } from 'inversify';
import { interfaces } from 'inversify';
import { symbolFor } from '../tools/symbol';
export default function container_moduleTest() {
    describe('container_moduleTest', () => {
        _it('Should_be_able_to_set_the_registry_of_a_container_module', () => {
            const registry = (bind: interfaces.Bind) => { };
            const warriors = new ContainerModule(registry);
            expect(warriors.id).to.be.a('number');
            expect(warriors.registry).eql(registry);
        });
        _it('Should_be_able_to_remove_some_bindings_from_w_ithin_a_container_module', () => {
            const container = new Container();
            container.bind<string>('A').toConstantValue('1');
            expect(container.get<string>('A')).to.eql('1');
            const warriors = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
                expect(container.get<string>('A')).to.eql('1');
                unbind<any>('A');
                bind<string>('A').toConstantValue('2');
                expect(container.get<string>('A')).to.eql('2');
                bind<string>('B').toConstantValue('3');
                expect(container.get<string>('B')).to.eql('3');
            });
            container.load(warriors);
            expect(container.get<string>('A')).to.eql('2');
            expect(container.get<string>('B')).to.eql('3');
        });
        _it('Should_be_able_to_check_for_existence_of_bindings_w_ithin_a_container_module', () => {
            const container = new Container();
            container.bind<string>('A').toConstantValue('1');
            expect(container.get<string>('A')).to.eql('1');
            const warriors = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound) => {
                expect(container.get<string>('A')).to.eql('1');
                expect(isBound<any>('A')).to.eql(true);
                unbind<any>('A');
                expect(isBound<any>('A')).to.eql(false);
            });
            container.load(warriors);
        });
        _it('Should_be_able_to_override_a_binding_using_rebind_w_ithin_a_container_module', () => {
            interface TYPE {
                someType: string;
            }
            const TYPES: TYPE = {
                someType: 'someType'
            };
            const container = new Container();
            const module1 = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound) => {
                bind<number>(TYPES.someType).toConstantValue(1);
                bind<number>(TYPES.someType).toConstantValue(2);
            });
            const module2 = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
                rebind<number>(TYPES.someType).toConstantValue(3);
            });
            container.load(module1);
            const values1: any = container.getAll(TYPES.someType);
            expect(values1[0]).to.eq(1);
            expect(values1[1]).to.eq(2);
            container.load(module2);
            const values2: any = container.getAll(TYPES.someType);
            expect(values2[0]).to.eq(3);
            expect(values2[1]).to.eq(undefined);
        });
        _it('Should_be_able_use_awa_it_async_functions_in_container_modules', async () => {
            const container = new Container();
            const someAsyncFactory = () => new Promise<number>((res) => setTimeout(() => res(1), 100));
            const A = symbolFor('A');
            const B = symbolFor('B');
            const moduleOne = new AsyncContainerModule(async (bind) => {
                const val = await someAsyncFactory();
                bind<any>(A).toConstantValue(val);
            });
            const moduleTwo = new AsyncContainerModule(async (bind) => {
                bind<any>(B).toConstantValue(2);
            });
            await container.loadAsync(moduleOne, moduleTwo);
            const AIsBound = container.isBound(A);
            expect(AIsBound).to.eq(true);
            const a: any = container.get(A);
            expect(a).to.eq(1);
        });
        //
        //   _it('Should_be_able_to_add_an_activation_hook_through_a_container_module', () => {
        //
        //     const container = new Container();
        //     container.bind<string>('A').toDynamicValue(() => '1');
        //     expect(container.get<string>('A')).to.eql('1');
        //
        //     const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation) => {
        //       bind<string>('B').toConstantValue('2').onActivation(() => 'C');
        //       onActivation('A', () => 'B');
        //     });
        //
        //     container.load(module);
        //
        //     expect(container.get<string>('A')).to.eql('B');
        //     expect(container.get('B')).to.eql('C')
        //   });
        //
        //   _it('Should_be_able_to_add_a_deactivation_hook_through_a_container_module', () => {
        //     const container = new Container();
        //     container.bind<string>('A').toConstantValue('1');
        //     let deact = false;
        //     const warriors = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //       onDeactivation<string>('A', () => {
        //         deact = true;
        //       });
        //     });
        //
        //     container.load(warriors);
        //     container.get('A');
        //     container.unbind('A');
        //
        //     expect(deact).eql(true);
        //   });
        //
        //   _it('Should_be_able_to_add_an_async_deactivation_hook_through_a_container_module_async', async () => {
        //   const container = new Container();
        //   container.bind<string>('A').toConstantValue('1');
        //
        //   let deact = false;
        //
        //   const warriors = new ContainerModule((bind, unbind, isBound, rebind, unBindAsync, onActivation, onDeactivation) => {
        //     onDeactivation<ESObject>('A', async () => {
        //       deact = true;
        //     });
        //   });
        //
        //   container.load(warriors);
        //   container.get('A');
        //   await container.unbindAsync('A');
        //
        //   expect(deact).eql(true);
        // });
        //
        //
        //   _it('Should_remove_module_bindings_when_unload', () => {
        //     const sid = 'sid';
        //     const container = new Container();
        //     container.bind<string>(sid).toConstantValue('Not module');
        //     const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //       bind<string>(sid).toConstantValue('Module')
        //     });
        //     container.load(module);
        //     let values:ESObject = container.getAll(sid);
        //     expect(values).to.deep.equal(['Not module', 'Module']);
        //
        //     container.unload(module);
        //     values = container.getAll(sid);
        //     expect(values).to.deep.equal(['Not module']);
        //   });
        //
        //   _it('Should_deactivate_singletons_from_module_bindings_when_unload', () => {
        //     const sid = 'sid';
        //     const container = new Container();
        //     let moduleBindingDeactivated: string | undefined
        //     let containerDeactivated: string | undefined
        //     const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //       bind<string>(sid).toConstantValue('Module').onDeactivation(injectable => { moduleBindingDeactivated = injectable });
        //       onDeactivation<string>(sid, injectable => { containerDeactivated = injectable })
        //     });
        //     container.load(module);
        //     container.get(sid);
        //
        //     container.unload(module);
        //     expect(moduleBindingDeactivated).to.equal('Module');
        //     expect(containerDeactivated).to.equal('Module');
        //   });
        //
        //   _it('Should_remove_container_handlers_from_module_when_unload', () => {
        //     const sid = 'sid';
        //     const container = new Container();
        //     let activatedNotModule: string | undefined
        //     let deactivatedNotModule: string | undefined
        //     container.onActivation<string>(sid, (_, injected) => {
        //       activatedNotModule = injected;
        //       return injected;
        //     });
        //     container.onDeactivation<string>(sid, injected => { deactivatedNotModule = injected })
        //     container.bind<string>(sid).toConstantValue('Value');
        //     let activationCount = 0;
        //     let deactivationCount = 0;
        //     const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //       onDeactivation<string>(sid, _ => { deactivationCount++ });
        //       onActivation<string>(sid, (_, injected) => {
        //         activationCount++;
        //         return injected;
        //       });
        //     });
        //     container.load(module);
        //     container.unload(module);
        //
        //     container.get(sid);
        //     container.unbind(sid);
        //
        //     expect(activationCount).to.equal(0);
        //     expect(deactivationCount).to.equal(0);
        //
        //     expect(activatedNotModule).to.equal('Value');
        //     expect(deactivatedNotModule).to.equal('Value')
        //   })
        //   _it('Should_remove_module_bindings_when_unloadAsync', async () => {
        //   const sid = 'sid';
        //   const container = new Container();
        //   container.onDeactivation(sid, (injected:ESObject) => Promise.resolve());
        //   container.bind<string>(sid).toConstantValue('Not module');
        //   const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //     bind<string>(sid).toConstantValue('Module')
        //   });
        //   container.load(module);
        //   let values:ESObject = container.getAll(sid);
        //   expect(values).to.deep.equal(['Not module', 'Module']);
        //
        //   await container.unloadAsync(module);
        //   values = container.getAll(sid);
        //   expect(values).to.deep.equal(['Not module']);
        // });
        //
        //   _it('Should_deactivate_singletons_from_module_bindings_when_unloadAsync', async () => {
        //   const sid = 'sid';
        //   const container = new Container();
        //   let moduleBindingDeactivated: string | undefined
        //   let containerDeactivated: string | undefined
        //   const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //     bind<string>(sid).toConstantValue('Module').onDeactivation(injectable => { moduleBindingDeactivated = injectable });
        //     onDeactivation<string>(sid, injectable => {
        //       containerDeactivated = injectable;
        //       return Promise.resolve();
        //     })
        //   });
        //   container.load(module);
        //   container.get(sid);
        //
        //   await container.unloadAsync(module);
        //   expect(moduleBindingDeactivated).to.equal('Module');
        //   expect(containerDeactivated).to.equal('Module');
        // });
        //
        //   _it('Should_remove_container_handlers_from_module_when_unloadAsync', async () => {
        //   const sid = 'sid';
        //   const container = new Container();
        //   let activatedNotModule: string | undefined
        //   let deactivatedNotModule: string | undefined
        //   container.onActivation<string>(sid, (_, injected) => {
        //     activatedNotModule = injected;
        //     return injected;
        //   });
        //   container.onDeactivation<string>(sid, injected => {
        //     deactivatedNotModule = injected;
        //   })
        //   container.bind<string>(sid).toConstantValue('Value');
        //   let activationCount = 0;
        //   let deactivationCount = 0;
        //   const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //     onDeactivation<string>(sid, _ => {
        //       deactivationCount++
        //       return Promise.resolve();
        //     });
        //     onActivation<string>(sid, (_, injected) => {
        //       activationCount++;
        //       return injected;
        //     });
        //   });
        //   container.load(module);
        //   await container.unloadAsync(module);
        //
        //   container.get(sid);
        //   container.unbind(sid);
        //
        //   expect(activationCount).to.equal(0);
        //   expect(deactivationCount).to.equal(0);
        //
        //   expect(activatedNotModule).to.equal('Value');
        //   expect(deactivatedNotModule).to.equal('Value');
        // });
        //
        //   _it('should_be_able_to_unbindAsync_from_a_module', async () => {
        //   let _unbindAsync: interfaces.UnbindAsync | undefined
        //   const container = new Container();
        //   const module = new ContainerModule((bind, unbind, isBound, rebind, unbindAsync, onActivation, onDeactivation) => {
        //     _unbindAsync = unbindAsync
        //   });
        //   const sid = 'sid';
        //   container.bind<string>(sid).toConstantValue('Value')
        //   container.bind<string>(sid).toConstantValue('Value2')
        //   const deactivated: string[] = []
        //   container.onDeactivation<string>(sid, injected => {
        //     deactivated.push(injected);
        //     return Promise.resolve();
        //   })
        //
        //   container.getAll(sid);
        //   container.load(module);
        //   await _unbindAsync!<ESObject>(sid) ;
        //   expect(deactivated).to.deep.equal(['Value', 'Value2']);
        //   //bindings removed
        //   expect(() => container.getAll(sid)).to.throw(`${NOT_REGISTERED} sid`)
        // });
    });
}
