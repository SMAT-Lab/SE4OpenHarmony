let __generate__Id: number = 0;
function generateId(): string {
    return "provider.test_" + ++__generate__Id;
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
import { Container, injectable } from 'inversify';
import { valueOrDefault } from '../tools/tools';
export default function providerTest() {
    describe('providerTest', () => {
        _it('Should_support_complex_asynchronous_initialization_processes', (done: any) => {
            @injectable()
            class Ninja {
                public level: number;
                public rank: string;
                public constructor() {
                    this.level = 0;
                    this.rank = 'Ninja';
                }
                public train(): Promise<number> {
                    return new Promise<number>((resolve) => {
                        setTimeout(() => {
                            this.level += 10;
                            resolve(this.level);
                        }, 10);
                    });
                }
            }
            @injectable()
            class NinjaMaster {
                public rank: string;
                public constructor() {
                    this.rank = 'NinjaMaster';
                }
            }
            type NinjaMasterProvider = () => Promise<NinjaMaster>;
            const container = new Container();
            container.bind<Ninja>('Ninja').to(Ninja).inSingletonScope();
            container.bind<NinjaMasterProvider>('Provider<NinjaMaster>').toProvider((context) => () => new Promise<NinjaMaster>((resolve, reject) => {
                const ninja = context.container.get<Ninja>('Ninja');
                ninja.train().then((level) => {
                    if (level >= 20) {
                        resolve(new NinjaMaster());
                    }
                    else {
                        reject('Not enough training');
                    }
                });
            }));
            const ninjaMasterProvider = container.get<NinjaMasterProvider>('Provider<NinjaMaster>');
            // helper
            valueOrDefault<any>(ninjaMasterProvider, { rank: 'DefaultNinjaMaster' }).then((ninjaMaster: any) => {
                expect(ninjaMaster.rank).to.eql('DefaultNinjaMaster');
            });
            valueOrDefault<any>(ninjaMasterProvider, { rank: 'DefaultNinjaMaster' }).then((ninjaMaster: any) => {
                expect(ninjaMaster.rank).to.eql('NinjaMaster');
                done();
            });
        });
        _it('Should_support_custom_arguments', (done: any) => {
            const container = new Container();
            interface Sword {
                material: string;
                damage: number;
            }
            @injectable()
            class Katana implements Sword {
                public material!: string;
                public damage!: number;
            }
            type SwordProvider = (material: string, damage: number) => Promise<Sword>;
            container.bind<Sword>('Sword').to(Katana);
            container.bind<SwordProvider>('SwordProvider').toProvider<Sword>((context) => (material: string, damage: number) => new Promise<Sword>((resolve) => {
                setTimeout(() => {
                    const katana = context.container.get<Sword>('Sword');
                    katana.material = material;
                    katana.damage = damage;
                    resolve(katana);
                }, 10);
            }));
            const katanaProvider = container.get<SwordProvider>('SwordProvider');
            katanaProvider('gold', 100).then((powerfulGoldKatana) => {
                expect(powerfulGoldKatana.material).to.eql('gold');
                expect(powerfulGoldKatana.damage).to.eql(100);
                katanaProvider('gold', 10).then((notSoPowerfulGoldKatana) => {
                    expect(notSoPowerfulGoldKatana.material).to.eql('gold');
                    expect(notSoPowerfulGoldKatana.damage).to.eql(10);
                    done();
                });
            });
        });
        _it('Should_support_partial_application_of_custom_arguments', (done: any) => {
            const container = new Container();
            interface Sword {
                material: string;
                damage: number;
            }
            @injectable()
            class Katana implements Sword {
                public material!: string;
                public damage!: number;
            }
            type SwordProvider = (material: string) => (damage: number) => Promise<Sword>;
            container.bind<Sword>('Sword').to(Katana);
            container.bind<SwordProvider>('SwordProvider').toProvider<Sword>((context) => (material: string) => (damage: number) => new Promise<Sword>((resolve) => {
                setTimeout(() => {
                    const katana = context.container.get<Sword>('Sword');
                    katana.material = material;
                    katana.damage = damage;
                    resolve(katana);
                }, 10);
            }));
            const katanaProvider = container.get<SwordProvider>('SwordProvider');
            const goldKatanaProvider = katanaProvider('gold');
            goldKatanaProvider(100).then((powerfulGoldKatana) => {
                expect(powerfulGoldKatana.material).to.eql('gold');
                expect(powerfulGoldKatana.damage).to.eql(100);
                goldKatanaProvider(10).then((notSoPowerfulGoldKatana) => {
                    expect(notSoPowerfulGoldKatana.material).to.eql('gold');
                    expect(notSoPowerfulGoldKatana.damage).to.eql(10);
                    done();
                });
            });
        });
        _it('Should_support_the_declaration_of_singletons', (done: any) => {
            const container = new Container();
            interface Warrior {
                level: number;
            }
            @injectable()
            class Ninja implements Warrior {
                public level: number;
                public constructor() {
                    this.level = 0;
                }
            }
            type WarriorProvider = (level: number) => Promise<Warrior>;
            container.bind<Warrior>('Warrior').to(Ninja).inSingletonScope(); // Value is singleton!
            container.bind<WarriorProvider>('WarriorProvider').toProvider<Warrior>((context) => (increaseLevel: number) => new Promise<Warrior>((resolve) => {
                setTimeout(() => {
                    const warrior = context.container.get<Warrior>('Warrior'); // Get singleton!
                    warrior.level += increaseLevel;
                    resolve(warrior);
                }, 100);
            }));
            const warriorProvider = container.get<WarriorProvider>('WarriorProvider');
            warriorProvider(10).then((warrior) => {
                expect(warrior.level).to.eql(10);
                warriorProvider(10).then((warrior2) => {
                    expect(warrior.level).to.eql(20);
                    done();
                });
            });
        });
    });
}
