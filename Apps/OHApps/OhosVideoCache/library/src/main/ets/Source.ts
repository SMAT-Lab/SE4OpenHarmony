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

import { DataBackListener } from './interfaces/DataBackListener';
export default interface Source {
  /**
   * Opens source. Source should be open before using {@link #read(byte[])}
   *
   * @param offset offset in bytes for source.
   * @throws ProxyCacheException if error occur while opening source.
   */
  setDataListener(listener: DataBackListener): void;


  /**
   * Opens source. Source should be open before using {@link #read(byte[])}
   *
   * @param offset offset in bytes for source.
   * @throws ProxyCacheException if error occur while opening source.
   */
  open(offset: number): Promise<void>;

  /**
   * Returns length bytes or <b>negative value</b> if length is unknown.
   *
   * @return bytes length
   * @throws ProxyCacheException if error occur while fetching source data.
   */
  length(): Promise<number>;

  // /**
  //  * Read data to byte buffer from source with current offset.
  //  *
  //  * @param buffer a buffer to be used for reading data.
  //  * @return a count of read bytes
  //  * @throws ProxyCacheException if error occur while reading source.
  //  */
  // read(buffer: ArrayBuffer): number;

  /**
   * Closes source and release resources. Every opened source should be closed.
   *
   * @throws ProxyCacheException if error occur while closing source.
   */
  close(): void;
}