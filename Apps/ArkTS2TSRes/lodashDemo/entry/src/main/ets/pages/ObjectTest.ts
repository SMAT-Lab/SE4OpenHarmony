interface Index_Params {
    a?: number;
    b?: number;
    c?: number;
    d?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ObjectTest_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import { assignIn, findKey, forIn, keys, get, invert } from "lodash";
class C {
    c: number = 0;
}
class B {
    b: C | any;
}
class Objects {
    a: B[] = [];
}
class ABC {
    a: string = '';
    b: string = '';
    c: string = '';
}
class Info {
    Name: string = '';
    password: string = '';
    username: string = '';
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__a = new ObservedPropertySimple(0, this, "a");
        this.__b = new ObservedPropertySimple(0, this, "b");
        this.__c = new ObservedPropertySimple(0, this, "c");
        this.__d = new ObservedPropertySimple(0, this, "d");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.a !== undefined) {
            this.a = params.a;
        }
        if (params.b !== undefined) {
            this.b = params.b;
        }
        if (params.c !== undefined) {
            this.c = params.c;
        }
        if (params.d !== undefined) {
            this.d = params.d;
        }
    }
    aboutToBeDeleted() {
        this.__a.aboutToBeDeleted();
        this.__b.aboutToBeDeleted();
        this.__c.aboutToBeDeleted();
        this.__d.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __a: ObservedPropertySimple<number>;
    get a() {
        return this.__a.get();
    }
    set a(newValue: number) {
        this.__a.set(newValue);
    }
    private __b: ObservedPropertySimple<number>;
    get b() {
        return this.__b.get();
    }
    set b(newValue: number) {
        this.__b.set(newValue);
    }
    private __c: ObservedPropertySimple<number>;
    get c() {
        return this.__c.get();
    }
    set c(newValue: number) {
        this.__c.set(newValue);
    }
    private __d: ObservedPropertySimple<number>;
    get d() {
        return this.__d.get();
    }
    set d(newValue: number) {
        this.__d.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('遍历并继承分配来源对象的可枚举属性到目标对象上');
        Button.onClick(() => {
            let object: object = assignIn({ a: 4 }, { b: 1 }, { c: 3 });
            // => {"a":4,"b":1,"c":3}
            console.log('遍历并继承分配来源对象的可枚举属性到目标对象上：' + JSON.stringify(object));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('访问集合的每个值,在一定条件下获取匹配的元素');
        Button.onClick(() => {
            class User {
                salary: number = 0;
                active: boolean = true;
            }
            class MeetuS {
                meetu: User | any;
                teetu: User | any;
                seetu: User | any;
            }
            let users: MeetuS = {
                meetu: { salary: 36000, active: true },
                teetu: { salary: 40000, active: false },
                seetu: { salary: 10000, active: true }
            };
            let found_elem: number = findKey(users, (o: any) => {
                return o.salary < 40000;
            });
            console.log('访问集合的每个值,在一定条件下获取匹配的元素为：' + found_elem);
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('遍历对象');
        Button.onClick(() => {
            let object: ABC = { a: 'a', b: 'b', c: 'c' };
            let item: string = forIn(object, (value: any, key: any) => {
                console.log(key);
            });
            console.log('遍历的对象:' + JSON.stringify(item));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('创建一个object自身和继承的可枚举属性名为数组');
        Button.onClick(() => {
            let obj: Info = {
                Name: "Geeks for Geeks",
                password: "@1234",
                username: "your_geeks"
            };
            // => ["Name","password","username"]
            console.log('创建一个object自身和继承的可枚举属性名为数组:' + JSON.stringify(keys(obj)));
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('根据对象的path路径获取值');
        Button.onClick(() => {
            let object: Objects = { a: [{ b: { c: 3 } }] };
            let get1: object = get(object, 'a[0].b.c');
            // => 3
            let get2: object = get(object, ['a', '0', 'b', 'c']);
            // => 3
            let get3: object = get(object, 'a.b.c', 'default');
            // => 'default'
            console.log('根据对象的path路径获取值:' + get1 + ' ' + get2 + ' ' + get3);
        });
        Button.margin(10);
        Button.pop();
        Button.createWithLabel('创建一个object键值倒置后的对象');
        Button.onClick(() => {
            class AObject {
                a: number = 0;
                b: number = 0;
                c: number = 0;
            }
            let object: AObject = { a: 1, b: 2, c: 1 };
            let invertObject: object = invert(object);
            // => { '1': 'c', '2': 'b' }
            console.log('创建一个object键值倒置后的对象:' + JSON.stringify(invertObject));
        });
        Button.margin(10);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
