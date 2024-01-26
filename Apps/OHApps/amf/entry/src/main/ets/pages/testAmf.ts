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
import AMF, { Spec, ByteArray } from 'amf-convert'
import Deserializer from 'amf-convert/dist/lib/amf/deserializer'

export function  test1(){
    let ser
    let sumavg1 = 0
    for (let i = 0; i < 1000; i++) {
      let s1 = new Date().getTime()
      // @ts-ignore
      ser = AMF.serialize()
      let e1 = new Date().getTime()
      let avg1 = e1 - s1
      sumavg1 += avg1;
    }
    console.log(`AMF.serialize() 接口耗时= ${sumavg1 / 1000.0}ms`)


    let sumavg2 = 0
    for (let i = 0; i < 1000; i++) {
      let s2 = new Date().getTime()
      let deser = AMF.deserialize(ser)
      let e2 = new Date().getTime()
      let avg2 = e2 - s2
      sumavg2 += avg2;
    }
    console.log(`AMF.deserialize() 接口耗时= ${sumavg2 / 1000.0}ms`)


    let stringify1
    let sumavg3 = 0
    for (let i = 0; i < 1000; i++) {
      let s3 = new Date().getTime()
      // @ts-ignore
      stringify1 = AMF.stringify()
      let e3 = new Date().getTime()
      let avg3 = e3 - s3
      sumavg3 += avg3;
    }
    console.log(`AMF.stringify() 接口耗时= ${sumavg3 / 1000.0}ms`)


    let sumavg4 = 0
    for (let i = 0; i < 1000; i++) {
      let s4 = new Date().getTime()
      let parse = AMF.stringify(stringify1)
      let e4 = new Date().getTime()
      let avg4 = e4 - s4
      sumavg4 += avg4;
    }
    console.log(` AMF.parse() 接口耗时= ${sumavg4 / 1000.0}ms`)
}


export function test2(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }

  test('undefined', function () {

    // @ts-ignore
    console.log('AMF.deserialize(AMF.serialize()), undefined) =' + AMF.deserialize(AMF.serialize()))
  });

  test('null', function () {
    // @ts-ignore
    console.log('AMF.deserialize(AMF.serialize(null))=' + AMF.deserialize(AMF.serialize(null)))
  });

  test('false', function () {
    // @ts-ignore
    console.log('AMF.deserialize(AMF.serialize(false))=' + AMF.deserialize(AMF.serialize(false)))
  });

  test('true', function () {
    // @ts-ignore
    console.log('AMF.deserialize(AMF.serialize(true))=' + AMF.deserialize(AMF.serialize(true)));
  });

  test('int', function () {

    var samples = [5, 100, -100, 100878, -199, Spec.MIN_INT, Spec.MAX_INT, -109876983];

    for (var i in samples) {
      var sample = samples[i];
      console.log('sample =' + sample)
      // @ts-ignore
      var data = AMF.serialize(sample, true, Spec.AMF3_INT);
      let deserData = AMF.deserialize(data)
      console.log(`AMF.deserialize( AMF.serialize(${sample}, true, Spec.AMF3_INT))=${deserData}`)

    }

    try {
      // @ts-ignore
      AMF.serialize(Spec.MAX_INT + 1, true, Spec.AMF3_INT);
    } catch (e) {
      console.log('AMF.serialize(Spec.MAX_INT + 1, true, Spec.AMF3_INT) e.msg=' + e.message)
    }

  });

  test('double', function () {

    var samples = [-10, 0.3767574, Spec.MIN_INT, Spec.MAX_INT, Math.PI, Number.MAX_VALUE, Number.MIN_VALUE, 102.145];

    for (var i in samples) {
      var sample = samples[i];
      console.log('sample =' + sample)
      // @ts-ignore
      let deserData = AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_DOUBLE), Spec.AMF3_DOUBLE)
      console.log(`AMF.deserialize(AMF.serialize(${sample}, true, Spec.AMF3_DOUBLE), Spec.AMF3_DOUBLE)=${deserData}}`)
    }
  });
}

export function  test3(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }
  test('string', function () {


    var samples = ['hello!', '', '.', 'i ❤ π'];


    for (var s in samples) {
      var sample = samples[s];
      // @ts-ignore
      let deserData = AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_STRIG))
      console.log(`AMF.deserialize(AMF.serialize(${sample}, true, Spec.AMF3_STRIG))=${deserData}`);
    }
  });
}

export function test4(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }
  test('date', function () {
    var samples = [new Date(), new Date(2011, 3, 9), new Date(1843, 1, 9), new Date(254, 1, 9), new Date(2040, 5, 12)];
    for (var i in samples) {
      var sample = samples[i];
      var data = AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_DATE));
      console.log(`AMF.deserialize(AMF.serialize(${sample}, true, Spec.AMF3_DATE))=${data}`)
    }
  });
}

export function test5(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }
  test('array', function () {
    var sparse = [1, 2];
    sparse[5] = 9;

    var samples = [
      [1, 2, 3],
      [12.345, "hello", false, ['hi', 1234]],
      [true, false, null, "<h1>Hi</h1>"],
      sparse
    ];


    for (var i in samples) {
      var sample = samples[i];
      let data = AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_ARRAY), Spec.AMF3_ARRAY)
      console.log(`AMF.deserialize(AMF.serialize(${sample}, true, Spec.AMF3_ARRAY), Spec.AMF3_ARRAY)=${data}`);
    }
  });
}

export function test6(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }
  test('object', function () {
    var ref = [1, 2, 3];

    var samples = [
      { "hello": "Bob!" },
      {
        "array": [99, 100, 101,
          { "nesting": "of objects", "yeah?": true, ref: ref }
        ],
        "reference": ref
      }
    ];

    for (var i in samples) {
      var sample = samples[i];
      var data = AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_OBJECT), Spec.AMF3_OBJECT);
      console.log(`AMF.deserialize(AMF.serialize(${JSON.stringify(sample)}, true, Spec.AMF3_OBJECT),Spec.AMF3_OBJECT)=${JSON.stringify(data)}`);
    }
  });
}

export function  test7(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }
  test('class mapping', function () {

    var Something = function () {
    };

    Something.prototype = {
      _classMapping: 'SomethingClass',
      doSomething: function () {
        console.log('Something was done!');
      }
    };
    // @ts-ignore
    AMF.registerClassAlias('SomethingClass', Something);
    var test = new Something();

    let isInstanceof = AMF.parse(AMF.stringify(test, AMF.CLASS_MAPPING)) instanceof Something

    console.log('AMF.parse(AMF.stringify(test, AMF.CLASS_MAPPING)) instanceof Something=' + isInstanceof)

  });
}

export function test8(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }
  test('class mapping serializable', function () {

    var Serializable = function (){};

    Serializable.prototype = {
      _classMapping:  'SerializableClass',
      property:  'value',
      exportData: function () {return { property: this.property }},

      importData: function (data) {
        for (var key in data) {

          this[key] = data[key];
        }
      }
    };
    // @ts-ignore
    AMF.registerClassAlias('SerializableClass',    Serializable);
    var test = new Serializable();
    var tested = AMF.parse(AMF.stringify(test, AMF.CLASS_MAPPING));
    let isInstanceof = tested instanceof Serializable
    console.log('AMF tested instanceof Serializable=' + isInstanceof)
    console.log(`AMF value = {property: 'value'}     tested =` + JSON.stringify(tested))

  });
}
export function test9(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }
  test('bytearray', function () {


    // @ts-ignore
    var simple = new ByteArray.default('656566');
    var data = AMF.deserialize(AMF.serialize(simple, true, Spec.AMF3_BYTE_ARRAY));
    console.log(`AMF.deserialize(AMF.serialize(${simple}, true, Spec.AMF3_BYTE_ARRAY))=${data}`)

    // create a bytearray with serialize AMF data, serialize the bytearray, deserialize the bytearray and then deserialize the AMF data
    // #meta

    var obj = { it: "works!" };
    // @ts-ignore
    var amf = new ByteArray.default(AMF.serialize(obj, true, Spec.AMF3_OBJECT));
    var serialized = AMF.serialize(amf, true, Spec.AMF3_BYTE_ARRAY);
    var deserialized = AMF.deserialize(serialized, Spec.AMF3_BYTE_ARRAY);

    let deserData = AMF.deserialize(deserialized, Spec.AMF3_OBJECT)
    console.log(`AMF.deserialize(AMF.deserialize(AMF.serialize(new ByteArray.default(AMF.serialize(${JSON.stringify(obj)}, true, Spec.AMF3_OBJECT)), true, Spec.AMF3_BYTE_ARRAY), Spec.AMF3_BYTE_ARRAY), Spec.AMF3_OBJECT)=${JSON.stringify(deserData)}`)


  });
}

export function  test10(){

  let test = (name: string, func) => {
    console.log('测试 ' + name)
    func()
  }

  test('NotSupportedException', function () {


    try {
      AMF.stringify(function () {
      });
    }
    catch (e) {
      console.log(' AMF.stringify(function(){}) e.msg = ' + e.message)

    }
  });

  test('DeserializationException', function () {

    // @ts-ignore
    var deserializer = new Deserializer();
    // @ts-ignore
    deserializer.stream = {
      // @ts-ignore
      readByte: function () {
        return 999;
      }
    };

    try {
      deserializer.deserialize();
    }
    catch (e) {
      console.log('AMF deserializer.deserialize() e.msg=' + e.message)
    }
  });

}