/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { HiLog } from './HiLog';
import _createRawReactElement from '@babel/runtime/helpers/esm/jsx';
import _iterableToArrayLimit from '@babel/runtime/helpers/esm/iterableToArrayLimit';
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread2";
import _typeof from '@babel/runtime/helpers/esm/typeof';
import _get from '@babel/runtime/helpers/esm/get';


export class Model {
  public name: string;
  public describe: string;
  public fun: Function;
  private static hilog: HiLog = HiLog.getHiLogInstance();
  private static tag: string = "[Model.ets_buildModel()]";

  constructor(name: string, describe: string, fun: Function) {
    this.name = name;
    this.describe = describe;
    this.fun = fun;
  }

  public static buildModel(): Array<Model> {
    let modelList: Array<Model> = new Array();
    const modelObj: Model = new Model("", "", () => {
    });
    // asyncIterator
    modelList.push(new Model("_createRawReactElement()", "该函数接受四个参数：type、props、key 和 children。它根据这些参数创建了一个包含元素类型、属性、键、子元素等信息的对象，并返回该对象作为结果", modelObj._createRawReactElement));
    modelList.push(new Model("_iterableToArrayLimit()", "指定可迭代数组的极限长度", modelObj._iterableToArrayLimit));
    modelList.push(new Model("_objectSpread2()", "将多个对象的属性合并到目标对象中，并返回合并后的目标对象。", modelObj._objectSpread2));
    modelList.push(new Model("_typeof()", "用于获取给定对象的类型。", modelObj._typeof));
    modelList.push(new Model("_get()", "用于获取对象的属性值。", modelObj._get));
    return modelList;
  }

  private _createRawReactElement(): string {
    Model.hilog.HILOG_INFO(Model.tag, "execute _createRawReactElement begin");

    class prop {
      name: string = ''
      value: Object = ''
    };

    interface ReactElementBean {
      $$typeof: Object,
      type: Object,
      key: Object,
      ref: Object,
      props: Object,
      _owner: Object
    }
    let props: prop[] = [{
      name: "width", value: 30
    } as prop, {
      name: "height", value: 30
    } as prop];

    let reactElement: ReactElementBean = _createRawReactElement('div', props, "key", "text");
    return reactElement.type + "\n" + reactElement.key + "\n" + JSON.stringify(reactElement.props);
  }

  private _iterableToArrayLimit(): string {
    Model.hilog.HILOG_INFO(Model.tag, "execute _iterableToArrayLimit begin");
    let arr: Array<string> = new Array()
    arr.push('a', 'b', 'c', 'd', 'e');
    Model.hilog.HILOG_INFO(Model.tag, "execute _iterableToArrayLimit execute result : " + _iterableToArrayLimit(arr, 2));
    return JSON.stringify(_iterableToArrayLimit(arr, 2));
  }

  private _objectSpread2(): string {
    interface A {
      a?: number;
      b?: number;
    };

    interface C {
      c: string;
      d: string;
    }

    const target: A = { a: 1 };
    const source1: A = { b: 2 };
    const source2: C = { c: "one", d: "two" };
    return JSON.stringify(_objectSpread2(target, source1, source2));
  }

  private _typeof(): string {
    interface A {
      a: number;
    }

    const str: string = "Hello";
    const num: number = 42;
    const bool: boolean = true;
    const arr: Array<number> = [1, 2, 3];
    const obj: A = { a: 1 };

    return JSON.stringify(_typeof(str)) + "\n" + JSON.stringify(_typeof(num)) + "\n" + JSON.stringify(_typeof(bool))
      + "\n" + JSON.stringify(_typeof(arr)) + "\n" + JSON.stringify(_typeof(obj));
  }

  private _get(): string {
    interface A {
      a?: number;
      b?: number;
    };

    interface Obj {
      name: string;
      age: number;
      inte: A;
    }

    const obj: Obj = {
      name: "John",
      age: 30,
      inte: {
        a: 100,
        b: 200
      }
    };
    // 使用 _get 函数获取属性值
    const name: Object = _get(obj, "name");

    const age: Object = _get(obj, "age");

    const fullName: Object = _get(obj, "inte");

    return JSON.stringify(name) + "\n" + JSON.stringify(age) + "\n" + JSON.stringify(fullName);
  }
}