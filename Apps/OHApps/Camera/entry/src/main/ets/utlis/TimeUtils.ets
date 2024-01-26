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

const TEN = 10; // 这是数字10
const SIXTY = 60; // 时间进制
const THOUSAND = 1000; // 这是数字1000

export function tempNum(num: number): string {
  if (num < TEN) {
    return '0' + num;
  }
  return num.toString();
}

export function getDurationString(duration: number): string {
  let hour = Math.floor(duration / (THOUSAND * SIXTY * SIXTY));
  let minute = Math.floor((duration - hour * (THOUSAND * SIXTY * SIXTY)) / (THOUSAND * SIXTY));
  let second = Math.floor(
    (duration - hour * (THOUSAND * SIXTY * SIXTY) - minute * (SIXTY * THOUSAND)) / THOUSAND
  );
  if (hour > 0) {
    return `${tempNum(hour)}:${tempNum(minute)}:${tempNum(second)}`;
  }
  return `${tempNum(minute)}:${tempNum(second)}`;
}
