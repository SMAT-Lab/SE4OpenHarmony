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

import {
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  it,
  expect
} from '@ohos/hypium'

import { injectssue730Function, should_resolve_from_container_directly } from './Injectssue730';
import { Bar, BAR, FOO, Foo, FooBarBase, mBar, mFoo, NamedFoo, SingletonFoo, TaggedFoo, throws } from './inject';

let tag:string = "inversify-demo："

export default function injectssue730Test() {

  describe("when_bindingunbinding", ()=>{

    it("Should_resolve_from_container_directly1",0, () => {
      let obj = injectssue730Function();
      expect(JSON.stringify(obj.actual("foo"))).assertEqual(JSON.stringify(new Foo()));
      expect(JSON.stringify(obj.actual("foos")[0])).assertEqual(JSON.stringify(new Foo()));
      expect(JSON.stringify(obj.actual("namedFoo"))).assertEqual(JSON.stringify(new NamedFoo()));
      expect(JSON.stringify(obj.actual("taggedFoo"))).assertEqual(JSON.stringify(new TaggedFoo()));

      obj.container.unbind(FOO);
      obj.container.unbind(BAR);

      try {
        throws && throws("foo")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: FOO";
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }

      try {
        throws && throws("foos")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: FOO";
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }

      try {
        throws && throws("namedFoo")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: BAR";
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }

      try {
        throws && throws("taggedFoo")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: BAR";
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }
    });

    it("Should_resolve_from_container_directly",0, () => {

      let  obj = should_resolve_from_container_directly();
      expect(JSON.stringify(obj.actual("singletonFoo"))).assertEqual(JSON.stringify(new SingletonFoo()));
      let foos: FooBarBase[] = obj.actual("foos");
      expect(foos.length).assertEqual(2);
      expect(JSON.stringify(foos[0])).assertEqual(JSON.stringify(new Foo()));
      expect(JSON.stringify(foos[1])).assertEqual(JSON.stringify(new Bar()));
      obj.container.unload(mBar);

      expect(JSON.stringify(obj.actual("singletonFoo"))).assertEqual(JSON.stringify(new SingletonFoo()));
      foos = obj.actual("foos");
      expect(foos.length).assertEqual(2);
      expect(JSON.stringify(foos[0])).assertEqual(JSON.stringify(new Foo()));
      obj.container.unload(mFoo);

      try {
        throws && throws("namedFoo")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: BAR"
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }

      try {
        throws && throws("taggedFoo")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: BAR"
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }
      obj.container.unload(mFoo);

      try {
        throws && throws("singletonFoo")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: SINGLETON_FOO"
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }

      try {
        throws && throws("foos")
      }catch(err){
        let value:string = "No matching bindings found for serviceIdentifier: FOO"
        console.log(tag + "expect("+err.message+").throw("+value+")")
      }
    });

  });

}