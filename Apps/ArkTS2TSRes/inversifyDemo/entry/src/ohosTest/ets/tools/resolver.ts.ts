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
import * as ns from "reflect-metadata";
import { inject } from 'inversify';
import { injectable } from 'inversify';
import { postConstruct } from 'inversify';
import { Container } from 'inversify';
ns;
export async function dependencies() {
    @injectable()
    class Parent {
        public constructor(
        @inject('Date')
        date: Date) {
        }
    }
    @injectable()
    class Child {
        public static boo;
        public constructor(
        @inject(Parent)
        parent: Parent, 
        @inject('Date')
        date: Date) {
            Child.boo = parent instanceof Parent;
            // expect(parent).instanceOf(new Parent(Object(null)));
            // expect(date).instanceOf(Date);
        }
    }
    const container = new Container({
        autoBindInjectable: true
    });
    container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
    let boo1 = await container.getAsync<Date>('Date') instanceof Date; // causes container to cache singleton as Lazy object
    await container.getAsync<Child>(Child);
    return {
        boo: Child.boo,
        boo1: boo1
    };
}
export async function layers() {
    @injectable()
    class AsyncValue {
        public date: Date;
        public constructor(
        @inject('Date')
        date: Date) {
            this.date = date;
        }
    }
    @injectable()
    class MixedDependency {
        public asyncValue: AsyncValue;
        public date: Date;
        public static boo;
        public constructor(
        @inject(AsyncValue)
        asyncValue: AsyncValue, 
        @inject('Date')
        date: Date) {
            MixedDependency.boo = asyncValue instanceof AsyncValue;
            this.date = date;
            this.asyncValue = asyncValue;
        }
    }
    const container = new Container({
        autoBindInjectable: true
    });
    container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
    const subject1 = await container.getAsync<MixedDependency>(MixedDependency);
    let boo1 = subject1.asyncValue instanceof AsyncValue;
    return {
        boo: MixedDependency.boo,
        boo1: boo1
    };
}
export async function sharedAutoBindInjectable() {
    @injectable()
    class AsyncValue {
        public date: Date;
        public constructor(
        @inject('Date')
        date: Date) {
            this.date = date;
        }
    }
    @injectable()
    class MixedDependency {
        public asyncValue: AsyncValue;
        public static boo1;
        public constructor(
        @inject(AsyncValue)
        asyncValue: AsyncValue) {
            MixedDependency.boo1 = asyncValue instanceof AsyncValue;
            this.asyncValue = asyncValue;
        }
    }
    const container = new Container({
        autoBindInjectable: true, defaultScope: 'Singleton'
    });
    container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
    const async = await container.getAsync<AsyncValue>(AsyncValue);
    const object1 = await container.getAsync<MixedDependency>(MixedDependency);
    return {
        boo1: MixedDependency.boo1
    };
}
export async function autoBindInjectable() {
    @injectable()
    class AsyncValue {
        public date: Date;
        public constructor(
        @inject('Date')
        date: Date) {
            this.date = date;
        }
    }
    @injectable()
    class MixedDependency {
        public asyncValue: AsyncValue;
        public date!: Date;
        public static boo1;
        public constructor(
        @inject(AsyncValue)
        asyncValue: AsyncValue) {
            MixedDependency.boo1 = asyncValue instanceof AsyncValue;
            this.asyncValue = asyncValue;
        }
    }
    const container = new Container({
        autoBindInjectable: true, defaultScope: 'Singleton'
    });
    container.bind<Date>('Date').toDynamicValue(() => Promise.resolve(new Date())).inSingletonScope();
    const object1 = await container.getAsync<MixedDependency>(MixedDependency);
    const object2 = await container.getAsync<MixedDependency>(MixedDependency);
    return {
        boo1: MixedDependency.boo1
    };
}
export async function postConstruct1() {
    let resolved = false;
    @injectable()
    class Constructable {
        @postConstruct()
        public myPostConstructMethod() {
            return new Promise<ESObject>((r) => {
                resolved = true;
                r({});
            });
        }
    }
    const container = new Container();
    container.bind<Constructable>('Constructable').to(Constructable);
    const result: ESObject = await container.getAsync('Constructable');
    let boo1 = result instanceof Constructable;
    return {
        boo1: boo1
    };
}
export async function onActivation() {
    let resolved = false;
    @injectable()
    class Constructable {
    }
    const container = new Container();
    container.bind<Constructable>('Constructable').to(Constructable).inSingletonScope()
        .onActivation((context, c) => new Promise((r) => {
        resolved = true;
        r(c);
    }));
    const result: ESObject = await container.getAsync('Constructable');
    let boo1 = result instanceof Constructable;
    return {
        boo1: boo1
    };
}
export async function instance() {
    @injectable()
    class Constructable {
    }
    let activated: Constructable | null = null;
    const container = new Container();
    container.bind<Constructable>('Constructable').toDynamicValue(() => Promise.resolve(new Constructable()))
        .inSingletonScope()
        .onActivation((context, c) => new Promise((r) => {
        activated = c;
        r(c);
    }));
    await container.getAsync('Constructable');
    let boo1 = activated instanceof Constructable;
    return {
        boo1: boo1
    };
}
export async function onDeactivation() {
    @injectable()
    class Destroyable {
    }
    const container = new Container();
    let deactivatedDestroyable: Destroyable | null = null;
    container.bind<Destroyable>('Destroyable').toDynamicValue(() => Promise.resolve(new Destroyable()))
        .inSingletonScope()
        .onDeactivation((instance) => new Promise((r) => {
        deactivatedDestroyable = instance;
        r();
    }));
    await container.getAsync('Destroyable');
    await container.unbindAsync('Destroyable');
    let boo = deactivatedDestroyable instanceof Destroyable;
    // with BindingInWhenOnSyntax
    const container2 = new Container({
        defaultScope: 'Singleton'
    });
    let deactivatedDestroyable2: Destroyable | null = null;
    container2.bind<Destroyable>('Destroyable').toDynamicValue(() => Promise.resolve(new Destroyable()))
        .onDeactivation((instance) => new Promise((r) => {
        deactivatedDestroyable2 = instance;
        r();
    }));
    await container2.getAsync('Destroyable');
    await container2.unbindAsync('Destroyable');
    let boo1 = deactivatedDestroyable2 instanceof Destroyable;
    return {
        boo: boo,
        boo1: boo1
    };
}
