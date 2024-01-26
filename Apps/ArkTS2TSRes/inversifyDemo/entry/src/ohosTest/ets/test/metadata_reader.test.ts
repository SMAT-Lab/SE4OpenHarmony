let __generate__Id: number = 0;
function generateId(): string {
    return "metadata_reader.test_" + ++__generate__Id;
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
import * as METADATA_KEY from "inversify/lib/constants/metadata_keys";
import { interfaces } from "inversify";
import { Container, inject, injectable, MetadataReader } from "inversify";
import { Metadata } from "inversify/lib/planning/metadata";
import * as ns from "reflect-metadata";
import { arrayConversion, compilerGeneratedMetadataTest } from '../tools/utilFun';
ns;
export default function metadata_readerTest() {
    describe('metadata_readerTest', () => {
        interface FunctionWithMetadata extends NewableFunction {
            constructorInjections: interfaces.ServiceIdentifier[];
            propertyInjections: PropertyInjectionMetadata[];
        }
        interface PropertyInjectionMetadata {
            propName: string;
            injection: interfaces.ServiceIdentifier;
        }
        class StaticPropsMetadataReader implements interfaces.MetadataReader {
            public getConstructorMetadata(constructorFunc: FunctionWithMetadata): interfaces.ConstructorMetadata {
                const formatMetadata = (injections: interfaces.ServiceIdentifier[]) => {
                    const userGeneratedMetadata: interfaces.MetadataMap = {};
                    injections.forEach((injection, index) => {
                        const metadata = new Metadata(METADATA_KEY.INJECT_TAG, injection);
                        if (Array.isArray(userGeneratedMetadata[index])) {
                            userGeneratedMetadata[index]?.push(metadata);
                        }
                        else {
                            userGeneratedMetadata[index] = [metadata];
                        }
                    });
                    return userGeneratedMetadata;
                };
                const constructorInjections = constructorFunc.constructorInjections;
                if (!Array.isArray(constructorInjections)) {
                    throw new Error("Missing constructorInjections annotation!");
                }
                const userGeneratedConsturctorMetadata = formatMetadata(constructorInjections);
                return {
                    // compilerGeneratedMetadata lenght must match userGeneratedMetadata
                    // we expose compilerGeneratedMetadata because if your custom annotation
                    // system is powered by decorators. The TypeScript compiler could generate
                    // some metadata when the emitDecoratorMetadata flag is enabled.
                    compilerGeneratedMetadata: new Array(constructorInjections.length),
                    userGeneratedMetadata: userGeneratedConsturctorMetadata
                };
            }
            public getPropertiesMetadata(constructorFunc: FunctionWithMetadata): interfaces.MetadataMap {
                const formatMetadata = (injections: PropertyInjectionMetadata[]) => {
                    const userGeneratedMetadata: interfaces.MetadataMap = {};
                    injections.forEach((propInjection, index) => {
                        const metadata = new Metadata(METADATA_KEY.INJECT_TAG, propInjection.injection);
                        if (Array.isArray(userGeneratedMetadata[propInjection.propName])) {
                            userGeneratedMetadata[propInjection.propName]?.push(metadata);
                        }
                        else {
                            userGeneratedMetadata[propInjection.propName] = [metadata];
                        }
                    });
                    return userGeneratedMetadata;
                };
                const propertyInjections = constructorFunc.propertyInjections;
                if (!Array.isArray(propertyInjections)) {
                    throw new Error("Missing propertyInjections annotation!");
                }
                const userGeneratedPropertyMetadata = formatMetadata(propertyInjections);
                return userGeneratedPropertyMetadata;
            }
        }
        _it("Should_be_able_to_use_custom_constructor_injection_metadata", () => {
            interface Ninja1 {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                hit(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            class Katana implements Katana1 {
                public static readonly constructorInjections: any = [];
                public static readonly propertyInjections: any = [];
                public hit() {
                    return "cut!";
                }
            }
            class Shuriken implements Shuriken1 {
                public static readonly constructorInjections: any = [];
                public static readonly propertyInjections: any = [];
                public throw() {
                    return "hit!";
                }
            }
            class Ninja implements Ninja1 {
                public static readonly constructorInjections = ["Katana", "Shuriken"];
                public static readonly propertyInjections: any = [];
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(katana: Katana, shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.hit(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.applyCustomMetadataReader(new StaticPropsMetadataReader());
            container.bind<Ninja>("Ninja").to(Ninja);
            container.bind<Katana>("Katana").to(Katana);
            container.bind<Shuriken>("Shuriken").to(Shuriken);
            const ninja = container.get<Ninja>("Ninja");
            expect(ninja.fight()).eql("cut!");
            expect(ninja.sneak()).eql("hit!");
        });
        _it("Should_be_able_to_use_custom_prop_injection_metadata", () => {
            interface Ninja1 {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                hit(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            class Katana implements Katana1 {
                public static readonly constructorInjections: any = [];
                public static readonly propertyInjections: any = [];
                public static readonly __brk = 1; // TEMP
                public hit() {
                    return "cut!";
                }
            }
            class Shuriken implements Shuriken1 {
                public static readonly constructorInjections: any = [];
                public static readonly propertyInjections: any = [];
                public static readonly __brk = 1; // TEMP
                public throw() {
                    return "hit!";
                }
            }
            class Ninja implements Ninja1 {
                public static readonly constructorInjections: any = [];
                public static readonly propertyInjections: any = [
                    { propName: "_katana", injection: "Katana" },
                    { propName: "_shuriken", injection: "Shuriken" }
                ];
                public static readonly __brk = 1; // TEMP
                private _katana!: Katana;
                private _shuriken!: Shuriken;
                public fight(): string { return this._katana.hit(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.applyCustomMetadataReader(new StaticPropsMetadataReader());
            container.bind<Ninja>("Ninja").to(Ninja);
            container.bind<Katana>("Katana").to(Katana);
            container.bind<Shuriken>("Shuriken").to(Shuriken);
            const ninja = container.get<Ninja>("Ninja");
            expect(ninja.fight()).eql("cut!");
            expect(ninja.sneak()).eql("hit!");
        });
        _it("Should_be_able_to_use_extend_the_default_metadata_reader", () => {
            const constructorMetadataLog: interfaces.ConstructorMetadata[] = [];
            const propertyMetadataLog: interfaces.MetadataMap[] = [];
            class CustomMetadataReader extends MetadataReader {
                public getConstructorMetadata(constructorFunc: NewableFunction): interfaces.ConstructorMetadata {
                    const constructorMetadata = super.getConstructorMetadata(constructorFunc);
                    constructorMetadataLog.push(constructorMetadata);
                    return constructorMetadata;
                }
                public getPropertiesMetadata(constructorFunc: NewableFunction): interfaces.MetadataMap {
                    const propertyMetadata = super.getPropertiesMetadata(constructorFunc);
                    propertyMetadataLog.push(propertyMetadata);
                    return propertyMetadata;
                }
            }
            interface Ninja1 {
                fight(): string;
                sneak(): string;
            }
            interface Katana1 {
                hit(): string;
            }
            interface Shuriken1 {
                throw(): string;
            }
            @injectable()
            class Katana implements Katana1 {
                public hit() {
                    return "cut!";
                }
            }
            @injectable()
            class Shuriken implements Shuriken1 {
                public throw() {
                    return "hit!";
                }
            }
            @injectable()
            @Reflect.metadata("design:paramtypes", arrayConversion(Katana, Shuriken))
            class Ninja implements Ninja1 {
                private _katana: Katana;
                private _shuriken: Shuriken;
                public constructor(
                @inject("Katana")
                katana: Katana, 
                @inject("Shuriken")
                shuriken: Shuriken) {
                    this._katana = katana;
                    this._shuriken = shuriken;
                }
                public fight(): string { return this._katana.hit(); }
                public sneak(): string { return this._shuriken.throw(); }
            }
            const container = new Container();
            container.applyCustomMetadataReader(new CustomMetadataReader());
            container.bind<Ninja>("Ninja").to(Ninja);
            container.bind<Katana>("Katana").to(Katana);
            container.bind<Shuriken>("Shuriken").to(Shuriken);
            const ninja = container.get<Ninja>("Ninja");
            expect(ninja.fight()).eql("cut!");
            expect(ninja.sneak()).eql("hit!");
            expect(Array.isArray(constructorMetadataLog)).eq(true);
            expect(constructorMetadataLog.length).eq(3);
            const constructorMetadataLogFirstElement = constructorMetadataLog[0] as interfaces.ConstructorMetadata;
            const constructorMetadataLogSecondElement = constructorMetadataLog[1] as interfaces.ConstructorMetadata;
            const constructorMetadataLogThirdElement = constructorMetadataLog[2] as interfaces.ConstructorMetadata;
            const compilerGeneratedMetadata0 = constructorMetadataLogFirstElement.compilerGeneratedMetadata;
            if (compilerGeneratedMetadata0) {
                expect(compilerGeneratedMetadataTest(compilerGeneratedMetadata0[0], Katana)).eq(true);
                expect(compilerGeneratedMetadataTest(compilerGeneratedMetadata0[1], Shuriken)).eq(true);
            }
            const userGeneratedMetadataFirstElement: any = constructorMetadataLogFirstElement.userGeneratedMetadata["0"] as interfaces.Metadata[];
            const userGeneratedMetadataSecondElement: any = constructorMetadataLogFirstElement.userGeneratedMetadata["1"] as interfaces.Metadata[];
            expect((userGeneratedMetadataFirstElement[0] as interfaces.Metadata).key).eq("inject");
            expect((userGeneratedMetadataFirstElement[0] as interfaces.Metadata).value).eq("Katana");
            expect((userGeneratedMetadataSecondElement[0] as interfaces.Metadata).key).eq("inject");
            expect((userGeneratedMetadataSecondElement[0] as interfaces.Metadata).value).eq("Shuriken");
            expect(JSON.stringify(constructorMetadataLogSecondElement.compilerGeneratedMetadata)).eq(JSON.stringify([]));
            expect(JSON.stringify(constructorMetadataLogThirdElement.compilerGeneratedMetadata)).eq(JSON.stringify([]));
            expect(JSON.stringify(constructorMetadataLogSecondElement.userGeneratedMetadata)).eq(JSON.stringify({}));
            expect(JSON.stringify(constructorMetadataLogThirdElement.userGeneratedMetadata)).eq(JSON.stringify({}));
            expect(propertyMetadataLog.length).eq(3);
            interface length {
                length: number;
            }
            const getLength = (metadata: interfaces.MetadataMap) => {
                return (metadata as any as length).length;
            };
            expect(getLength(propertyMetadataLog[0] as interfaces.MetadataMap)).eq(0);
            expect(getLength(propertyMetadataLog[1] as interfaces.MetadataMap)).eq(0);
            expect(getLength(propertyMetadataLog[2] as interfaces.MetadataMap)).eq(0);
        });
    });
}
