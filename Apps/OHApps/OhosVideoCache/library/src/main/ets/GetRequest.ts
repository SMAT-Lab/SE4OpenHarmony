/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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

import buffer from '@ohos.buffer';
import Preconditions from './Preconditions';

export default class GetRequest {
  private RANGE_HEADER_PATTERN: RegExp = new RegExp("[R,r]ange:[ ]?bytes=(\\d*)-");
  private URL_PATTERN: RegExp = new RegExp("GET /(.*) HTTP");
  public uri: string;
  public rangeOffset: number;
  public partial: boolean;

  constructor(request: string) {
    Preconditions.checkNotNull(request);
    let offset = this.findRangeOffset(request);
    this.rangeOffset = Math.max(0, offset);
    this.partial = offset >= 0;
    this.uri = this.findUri(request);
  }

  public static read(inputStream: ArrayBuffer): GetRequest {
    let stringRequest: string = buffer.from(inputStream).toString("UTF-8");
    return new GetRequest(stringRequest);
  }

  private findRangeOffset(request: string): number {
    try {
      let matcher = this.RANGE_HEADER_PATTERN.exec(request);
      if (!matcher || matcher.length < 2) return -1;
      let rangeValue = matcher[1];
      return Number.parseInt(rangeValue);
    } catch (err) {

    }
    return -1;
  }

  private findUri(request: string): string {
    let matcher = this.URL_PATTERN.exec(request);
    if (!matcher || matcher.length < 2 || (matcher.length >= 2 && !matcher[1])) throw new Error("Invalid request `");
    if (this.URL_PATTERN.test(request)) {
      return matcher!![1];
    }
    throw new Error("Invalid request `" + request + "`: url not found!");
  }


  public toString(): string {
    return "GetRequest{" +
      "rangeOffset=" + this.rangeOffset +
      ", partial=" + this.partial +
      ", uri='" + this.uri + '\'' +
      '}';
  }
}