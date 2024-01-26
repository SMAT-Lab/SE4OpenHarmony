/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

export function toTime(Number: number): string {
  let hour: number
  let minute: number
  let second: number
  hour = Number / 3600 | 0
  minute = Number / 60 % 60 | 0
  second = Number % 60 | 0
  if (hour > 0) {
    return (hour < 10 ? '0' + hour : hour.toString()) + ":" + (minute < 10 ? '0' + minute : minute.toString()) + ":" + (second < 10 ? '0' + second : second.toString())
  } else {
    return (minute < 10 ? '0' + minute : minute.toString()) + ":" + (second < 10 ? '0' + second : second.toString())
  }
}