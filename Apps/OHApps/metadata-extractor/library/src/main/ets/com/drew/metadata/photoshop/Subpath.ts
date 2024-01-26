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

import Knot from './Knot'

class Subpath {
  private _knots: Array<Knot> = new Array<any>();
  private _type: string;

  constructor(type: string) {
    this._type = type;
  }

  /**
   * Appends a knot (set of 3 points) into the list
   */
  public add(knot: Knot) {
    this._knots.push(knot);
  }

  /**
   * Gets size of knots list
   *
   * @return size of knots ArrayList
   */
  public size(): number {
    return this._knots.length;
  }

  public getKnots() {
    return this._knots;
  }

  public getType(): string {
    return this._type;
  }
}

export default Subpath