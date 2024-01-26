/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import Directory from '../Directory';
import XmpDescriptor from './XmpDescriptor';

class XmpDirectory extends Directory {
  public static readonly TAG_XMP_VALUE_COUNT: number = 0xFFFF;
  private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
    .set(XmpDirectory.TAG_XMP_VALUE_COUNT, "XMP Value Count");

  //private _xmpMeta: XMPMeta;
  private _xmpMeta: string;

  public constructor() {
    super();
    this.setDescriptor(new XmpDescriptor(this));
  }

  public getName(): string {
    return "XMP";
  }

  protected getTagNameMap(): Map<number, string> {
    return XmpDirectory._tagNameMap;
  }

  /**
   * Gets a map of all XMP properties in this directory.
   * <p>
   * This is required because XMP properties are represented as strings, whereas the rest of this library
   * uses integers for keys.
   */
  public getXmpProperties(): Map<string, string> {
    let propertyValueByPath: Map<string, string> = new Map<string, string>();

    if (this._xmpMeta != null) {
      try {
        //let options = new IteratorOptions().setJustLeafnodes(true);
        let options = '';
        /*for (let i = this._xmpMeta.iterator(options); i.hasNext();) {
          let prop = i.next();
          let path: string = prop.getPath();
          let value: string = prop.getValue();
          if (path != null && value != null) {
            propertyValueByPath.set(path, value);
          }
        }*/
      } catch (error) {
        throw new Error(error);
      }
    }
    return propertyValueByPath;
  }

  public setXMPMeta(xmpMeta: string): void {
    this._xmpMeta = xmpMeta;

    try {
      let valueCount: number = 0;
      //let options = new IteratorOptions().setJustLeafnodes(true);
      let options = '';
      /*for (let i = this._xmpMeta.iterator(options); i.hasNext();) {
        let prop = i.next();
        if (prop.getPath() != null) {
          valueCount++;
        }
      }
      this.setInt(XmpDirectory.TAG_XMP_VALUE_COUNT, valueCount);*/
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Gets the XMPMeta object used to populate this directory. It can be used for more XMP-oriented operations.
   * If one does not exist it will be created.
   */
  public getXMPMeta(): string {
    if (this._xmpMeta == null) {
      //this._xmpMeta = new XMPMetaImpl();
    }
    return this._xmpMeta;
  }
}

export default XmpDirectory;