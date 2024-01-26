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


export default class BufferBoundsException extends Error {
  public constructor(index: number, bytesRequested: number, bufferLength: number) {
    super(BufferBoundsException.getMessage(index, bytesRequested, bufferLength))
  }

  private static getMessage(index: number, bytesRequested: number, bufferLength: number): string
  {
    if (index < 0)
    return "Attempt to read from buffer using a negative index " + index;

    if (bytesRequested < 0)
    return "Number of requested bytes cannot be negative" + bytesRequested;

    if (index + bytesRequested - 1 > Number.MAX_VALUE)
    return "Number of requested bytes summed with starting index exceed maximum range of signed 32 bit integers (requested index:" + index + " requested count: " + bytesRequested;

    return "Attempt to read from beyond end of underlying data source requested index:+" + index + "requested count:" + bytesRequested + ", max index: " + (bufferLength - 1)
  }
}