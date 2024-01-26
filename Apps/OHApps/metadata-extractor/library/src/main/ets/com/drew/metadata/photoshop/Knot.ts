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

class Knot {
  private _points = new Array<number>(6);
  private _type: string;

  constructor(type: string) {
    this._type = type;
  }

  /**
   * Add an individual coordinate value (x or y) to
   * points array (6 points per knot)
   *
   * @param index location of point to be added in points
   * @param point coordinate value to be added to points
   */
  public setPoint(index: number, point: number) {
        this._points[index] = point;
    }

  /**
   * Get an individual coordinate value (x or y)
   *
   * @return an individual coordinate value
   */
  public getPoint(index: number): number {
    return this._points[index];
  }

  /**
   * Get the type of knot (linked or unlinked)
   *
   * @return the type of knot
   */
  public getType(): string {
    return this._type;
  }
}

export default Knot
