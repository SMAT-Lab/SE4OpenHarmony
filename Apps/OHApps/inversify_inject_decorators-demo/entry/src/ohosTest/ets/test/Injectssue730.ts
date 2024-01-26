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
import { Container, ContainerModule, injectable, interfaces, named, tagged } from 'inversify';
import getDecorators from "inversify-inject-decorators/es/index";

export function injectssue730Function() {

  const container = new Container();
  const {
    lazyInject,
    lazyInjectNamed,
    lazyInjectTagged,
    lazyMultiInject
  } = getDecorators(container, false);

  const FOO = "FOO";
  const BAR = "BAR";

  @injectable()
  class Foo {
  }

  @injectable()
  class NamedFoo {
  }

  @injectable()
  class TaggedFoo {
  }

  container.bind<Foo>(FOO).to(Foo);
  container.bind<NamedFoo>(BAR).to(NamedFoo).whenTargetNamed("bar");
  container.bind<TaggedFoo>(BAR).to(TaggedFoo).whenTargetTagged("bar", true);

  @injectable()
  class Test {
    @lazyInject(FOO) public foo: Foo;
    @lazyMultiInject(FOO) public foos: Foo[];
    @lazyInjectNamed(BAR, "bar") @named("bar") public namedFoo: Foo;
    @lazyInjectTagged(BAR, "bar", true) @tagged("bar", true) public taggedFoo: Foo;
  }

  const sut: any = new Test();

  let actual = function actual(key: string): any {
    return sut[key];
  }

  let obj = {
    container:container,
    actual:actual
  }

  return obj;
}

export function should_resolve_from_container_directly() {

  const container = new Container();
  const {
    lazyInject,
    lazyInjectNamed,
    lazyInjectTagged,
    lazyMultiInject
  } = getDecorators(container, false);

  const SINGLETON_FOO = "SINGLETON_FOO";
  const FOO = "FOO";
  const BAR = "BAR";

  @injectable()
  class FooBarBase {
  }

  @injectable()
  class SingletonFoo extends FooBarBase {
  }

  @injectable()
  class Foo extends FooBarBase {
  }

  @injectable()
  class Bar extends FooBarBase {
  }

  @injectable()
  class NamedBar extends FooBarBase {
  }

  @injectable()
  class TaggedBar extends FooBarBase {
  }

  const mFoo = new ContainerModule((bind: interfaces.Bind) => {
    bind<FooBarBase>(SINGLETON_FOO).to(SingletonFoo);
    bind<FooBarBase>(FOO).to(Foo);
  });
  const mBar = new ContainerModule((bind: interfaces.Bind) => {
    bind<FooBarBase>(FOO).to(Bar);
    bind<FooBarBase>(BAR).to(NamedBar).whenTargetNamed("bar");
    bind<FooBarBase>(BAR).to(TaggedBar).whenTargetTagged("bar", true);
  });

  container.load(mFoo, mBar);

  @injectable()
  class Test {
    @lazyInject(SINGLETON_FOO) public singletonFoo: FooBarBase;
    @lazyMultiInject(FOO) public foos: FooBarBase[];
    @lazyInjectNamed(BAR, "bar") @named("bar") public namedFoo: FooBarBase;
    @lazyInjectTagged(BAR, "bar", true) @tagged("bar", true) public taggedFoo: FooBarBase;
  }

  const sut: any = new Test();

  let actual = function actual(key: string): any {
    return sut[key];
  }

  let obj = {
    container:container,
    actual:actual
  }

  return obj;
}