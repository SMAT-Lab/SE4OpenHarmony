/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import getDecorators from "inversify-inject-decorators/es/index";
import { Container, injectable, tagged, named, inject, ContainerModule, interfaces } from 'inversify';
import "reflect-metadata";
export let TYPES = {
    Weapon: Symbol.for("Weapon")
};
interface Weapon {
    name: string;
    durability: number;
    use(): void;
}
@injectable()
export class Sword implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
        this.durability = 100;
        this.name = "Sword";
    }
    public use() {
        this.durability = this.durability - 10;
    }
}
@injectable()
export class Shuriken implements Weapon {
    public name: string;
    public durability: number;
    public constructor() {
        this.durability = 100;
        this.name = "Shuriken";
    }
    public use() {
        this.durability = this.durability - 10;
    }
}
export function lazyInjectNamedFunction() {
    let container = new Container();
    let { lazyInjectNamed, } = getDecorators(container);
    class Warrior {
        @lazyInjectNamed(TYPES.Weapon, "not-throwwable")
        @named("not-throwwable")
        public primaryWeapon: Weapon;
        @lazyInjectNamed(TYPES.Weapon, "throwwable")
        @named("throwwable")
        public secondaryWeapon: Weapon;
    }
    container.bind<Weapon>(TYPES.Weapon).to(Sword).whenTargetNamed("not-throwwable");
    container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetNamed("throwwable");
    let warrior1 = new Warrior();
    return warrior1;
}
export function lazyInjectTaggedFunction() {
    let container = new Container();
    let { lazyInjectTagged } = getDecorators(container);
    class Warrior {
        @lazyInjectTagged(TYPES.Weapon, "throwwable", false)
        @tagged("throwwable", false)
        public primaryWeapon: Weapon;
        @lazyInjectTagged(TYPES.Weapon, "throwwable", true)
        @tagged("throwwable", true)
        public secondaryWeapon: Weapon;
    }
    container.bind<Weapon>(TYPES.Weapon).to(Sword).whenTargetTagged("throwwable", false);
    container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetTagged("throwwable", true);
    let warrior1 = new Warrior();
    return warrior1;
}
export function lazyMultiInjectFunction() {
    let container = new Container();
    let { lazyMultiInject } = getDecorators(container);
    class Warrior {
        @lazyMultiInject(TYPES.Weapon)
        public weapons: Weapon[];
    }
    container.bind<Weapon>(TYPES.Weapon).to(Sword).whenTargetTagged("throwwable", false);
    container.bind<Weapon>(TYPES.Weapon).to(Shuriken).whenTargetTagged("throwwable", true);
    let warrior1 = new Warrior();
    return warrior1;
}
export function lazyInjectFunction() {
    let container = new Container();
    let { lazyInject } = getDecorators(container);
    class Warrior {
        @lazyInject(TYPES.Weapon)
        public weapon: Weapon;
    }
    container.bind<Weapon>(TYPES.Weapon).to(Sword);
    let warrior1 = new Warrior();
    return warrior1;
}
export function getThrows() {
    const container = new Container();
    const { lazyInject } = getDecorators(container);
    @injectable()
    class Dom {
        public domUi: DomUi;
        constructor(domUi: DomUi) {
            this.domUi = domUi;
        }
    }
    @injectable()
    class DomUi {
        @lazyInject(Dom)
        public dom: Dom;
    }
    @injectable()
    class Test {
        public dom: Dom;
        constructor(dom: Dom) {
            this.dom = dom;
        }
    }
    container.bind<Dom>(Dom).toSelf().inSingletonScope();
    container.bind<DomUi>(DomUi).toSelf().inSingletonScope();
    function throws() {
        return container.resolve(Test);
    }
    return throws;
}
export function getTest() {
    const container = new Container();
    const { lazyInject } = getDecorators(container);
    const TYPE = {
        Dom: Symbol.for("Dom"),
        DomUi: Symbol.for("DomUi")
    };
    @injectable()
    class DomUi {
        public dom: Dom;
        public name: string;
        constructor(
        @inject(TYPE.Dom)
        dom: Dom) {
            this.dom = dom;
            this.name = "DomUi";
        }
    }
    @injectable()
    class Dom {
        public name: string;
        @lazyInject(TYPE.DomUi)
        public domUi: DomUi;
        public constructor() {
            this.name = "Dom";
        }
    }
    @injectable()
    class Test {
        public dom: Dom;
        constructor(
        @inject(TYPE.Dom)
        dom: Dom) {
            this.dom = dom;
        }
    }
    container.bind<Dom>(TYPE.Dom).to(Dom).inSingletonScope();
    container.bind<DomUi>(TYPE.DomUi).to(DomUi).inSingletonScope();
    const test = container.resolve(Test);
    return test;
}
export const container = new Container();
const { lazyInject, lazyInjectNamed, lazyInjectTagged, lazyMultiInject } = getDecorators(container, false);
export const FOO = "FOO";
export const BAR = "BAR";
@injectable()
export class Foo {
}
@injectable()
export class NamedFoo {
}
@injectable()
export class TaggedFoo {
}
container.bind<Foo>(FOO).to(Foo);
container.bind<NamedFoo>(BAR).to(NamedFoo).whenTargetNamed("bar");
container.bind<TaggedFoo>(BAR).to(TaggedFoo).whenTargetTagged("bar", true);
@injectable()
class Test {
    @lazyInject(FOO)
    public foo: Foo;
    @lazyMultiInject(FOO)
    public foos: Foo[];
    @lazyInjectNamed(BAR, "bar")
    @named("bar")
    public namedFoo: Foo;
    @lazyInjectTagged(BAR, "bar", true)
    @tagged("bar", true)
    public taggedFoo: Foo;
}
export const sut: any = new Test();
export function actual(key: string): any {
    return sut[key];
}
export function throws(key: string): () => any {
    return () => {
        return sut[key];
    };
}
const SINGLETON_FOO = "SINGLETON_FOO";
@injectable()
export class FooBarBase {
}
@injectable()
export class SingletonFoo extends FooBarBase {
}
@injectable()
export class Foo1 extends FooBarBase {
}
@injectable()
export class Bar extends FooBarBase {
}
@injectable()
class NamedBar extends FooBarBase {
}
@injectable()
class TaggedBar extends FooBarBase {
}
export const mFoo = new ContainerModule((bind: interfaces.Bind) => {
    bind<FooBarBase>(SINGLETON_FOO).to(SingletonFoo);
    bind<FooBarBase>(FOO).to(Foo);
});
export const mBar = new ContainerModule((bind: interfaces.Bind) => {
    bind<FooBarBase>(FOO).to(Bar);
    bind<FooBarBase>(BAR).to(NamedBar).whenTargetNamed("bar");
    bind<FooBarBase>(BAR).to(TaggedBar).whenTargetTagged("bar", true);
});
container.load(mFoo, mBar);
@injectable()
class Test1 {
    @lazyInject(SINGLETON_FOO)
    public singletonFoo: FooBarBase;
    @lazyMultiInject(FOO)
    public foos: FooBarBase[];
    @lazyInjectNamed(BAR, "bar")
    @named("bar")
    public namedFoo: FooBarBase;
    @lazyInjectTagged(BAR, "bar", true)
    @tagged("bar", true)
    public taggedFoo: FooBarBase;
}
const sut1: any = new Test1();
export function actual1(key: string): any {
    return sut1[key];
}
export function throws1(key: string): () => any {
    return () => {
        return sut1[key];
    };
}
