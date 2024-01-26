/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
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
export enum GpioName {
  GPIO_01,
  GPIO_02,
  GPIO_03,
  GPIO_04,
  GPIO_05,
  GPIO_06,
  GPIO_07,
  GPIO_08,
  GPIO_09,
  GPIO_10,
  GPIO_11,
  GPIO_12,
  GPIO_13,
  GPIO_14,
  GPIO_15,
  GPIO_16,
}

export enum Dir {
  input,
  output,
  error
}

export enum Val {
  low,
  height
}

export class Gpio {
  constructor(gpio: GpioName, direction: Dir);

  read(): Val;

  write(val: Val): void;
}
