/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
// 商家数据结构
export interface BusinessInfo {
  id: string,
  name: string,
  cover: string,
  isOpen: boolean,
  address: string,
  longitude: string,
  latitude: string,
  distance: string,
  startTime: string,
  endTime: string,
  notice: string,
  startPrice: number,
  deliveryPrice: number,
  phoneNumber: number,
  score: string,
  monthlySale: string,
  perCapita: string,
  deliveryTime: string,
  ranking: string,
  createBy: string,
  createTime: string,
  updateBy?: string,
  updateTime?: string,
  delFlag: boolean
}

// 商品数据结构
export interface CommodityInfo {
  id: string,
  businessId: string,
  name: string,
  cover: string,
  price: string,
  salePrice: string,
  priceExplain: string,
  salesNumber: string,
  totalNumber: string,
  description: string,
  standards: string,
  weight: string,
  brand: string,
  breed: string,
  made: number,
  producer: string,
  qualityDate: string,
  packing: string,
  category: string,
  taste: string,
  keepType: string,
  createBy: string,
  createTime: string,
  updateBy?: string,
  updateTime?: string,
  delFlag: boolean
}

// 评论数据结构
export interface CommentInfo {
  id: string,
  businessId: string,
  userName: string,
  star: number,
  content: string,
  createBy?: string,
  createTime: string,
  updateBy?: string,
  updateTime?: string,
  delFlag: boolean
}

export interface SelfPickUpInfo {
  name: string,
  address: string,
  distance: string
}