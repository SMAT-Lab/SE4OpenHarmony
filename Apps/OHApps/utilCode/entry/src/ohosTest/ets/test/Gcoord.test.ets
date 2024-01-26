/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import gcoord from 'gcoord'

export default function GcoordTest() {
  describe('Gcoord', () => {
    it('BD092GCJ02', 0, () => {
      expect(gcoord.transform(
        [116.403988, 39.914266], // 经纬度坐标
      gcoord.BD09, // 当前坐标系
      gcoord.GCJ02 // 目标坐标系
      )).assertDeepEquals([116.39761462515557, 39.90792254403078])
    })
    it('GCJ022BD09', 0, () => {
      expect(gcoord.transform(
        [116.403988, 39.914266], // 经纬度坐标
      gcoord.GCJ02, // 当前坐标系
      gcoord.BD09 // 目标坐标系
      )).assertDeepEquals([116.41035800409784,39.920603218738634])
    })
    it('GCJ022WGS84', 0, () => {
      expect(gcoord.transform(
        [116.403988, 39.914266], // 经纬度坐标
      gcoord.GCJ02, // 当前坐标系
      gcoord.WGS84 // 目标坐标系
      )).assertDeepEquals([116.39774359252733,39.91286174888657])
    })
    it('WGS842GCJ02', 0, () => {
      expect(gcoord.transform(
        [116.403988, 39.914266], // 经纬度坐标
      gcoord.WGS84, // 当前坐标系
      gcoord.GCJ02 // 目标坐标系
      )).assertDeepEquals([116.41023240747266,39.915670251113426])
    })
    it('BD092WGS84', 0, () => {
      expect(gcoord.transform(
        [116.403988, 39.914266], // 经纬度坐标
      gcoord.BD09, // 当前坐标系
      gcoord.WGS84 // 目标坐标系
      )).assertDeepEquals([116.39137353150247,39.906521276697305])
    })
    it('WGS842BD09', 0, () => {
      expect(gcoord.transform(
        [116.403988, 39.914266], // 经纬度坐标
      gcoord.WGS84, // 当前坐标系
      gcoord.BD09 // 目标坐标系
      )).assertDeepEquals([116.41661560068297,39.92196580126834])
    })
  })
}