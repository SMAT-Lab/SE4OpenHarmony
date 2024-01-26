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
import AMF,{Spec,ByteArray} from 'amf-convert'

import Deserializer from 'amf-convert/dist/lib/amf/deserializer'

import DeserializationException from 'amf-convert/dist/lib/exception/deserialization'
import Serialization from 'amf-convert/dist/lib/exception/serialization'
import NotSupportedException from 'amf-convert/dist/lib/exception/not-supported'

export function  getAMFDesSerUndefined(){
  // @ts-ignore
  return AMF.deserialize(AMF.serialize());
}
export function  getAMFDesSerNull(){
  return AMF.deserialize(AMF.serialize(null));
}
export function  getAMFDesSerFalse(){
  // @ts-ignore
  return AMF.deserialize(AMF.serialize(false));
}
export function  getAMFDesSerTrue(){
  // @ts-ignore
  return AMF.deserialize(AMF.serialize(true));
}
export function getClassMapping(){
  let Something =  ()=>{};

  Something.prototype = {
    _classMapping: 'SomethingClass',
    doSomething:  ()=>{
      console.log('Something was done!');
    }
  };
  // @ts-ignore
  AMF.registerClassAlias('SomethingClass', Something);
  let test = new Something();
  return AMF.parse(AMF.stringify(test, AMF.CLASS_MAPPING)) instanceof Something;
}

export  function getClassMappingSer(){
  let Serializable =  ()=>{};

  Serializable.prototype = {
    _classMapping: 'SerializableClass',
    property: 'value',
    exportData:  ()=>{
      return {property: this.property}
    },
    importData: function(data) {
      for(let key in data) {
        this[key] = data[key];
      }
    }
  };
  // @ts-ignore
  AMF.registerClassAlias('SerializableClass', Serializable);
  let test = new Serializable();

  let tested = AMF.parse(AMF.stringify(test, AMF.CLASS_MAPPING));
  return tested instanceof Serializable
}

export function  getDeserializationException(){
  // @ts-ignore
  let deserializer = new Deserializer();
  // @ts-ignore
  deserializer.stream = {
    // @ts-ignore
    readByte:  ()=>{
      return 999;
    }
  };

  try
  {
    deserializer.deserialize();
  }
  catch (e) {
    return e.name

  }
}