/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class hero {
  x: number = 676
  y: number = 142
  width: number = 124
  height: number = 99
  index: number = 0
  eCout: number = 0
  n: number = 0
  removable: number = 0
  life: number = 6
}

export class enemy {
  x: number = 0
  y: number = 0
  index: number = 0
  width: number = 51
  height: number = 51
  life: number = 5

  constructor(y: number) {
    this.y = y
  }
}

export class enemya {
  x: number = 0
  y: number = 0
  index: number = 0
  width: number = 95
  height: number = 69
  life: number = 10

  constructor(y: number) {
    this.y = y
  }
}

export class cBossenemy {
  x: number = 0
  y: number = 0
  index: number = 0
  width: number = 258
  height: number = 169
  life: number = 200

  constructor(y: number) {
    this.y = y
  }
}

export class hullet {
  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0
  n: number = 0
  removable: number = 0

  constructor(x: number, y: number, n: number) {
    this.x = x
    this.y = y + (99 - 8) / 2
    this.n = n
  }
}
