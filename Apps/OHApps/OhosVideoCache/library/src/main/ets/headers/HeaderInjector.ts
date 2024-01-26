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
import HashMap from '@ohos.util.HashMap';
export default interface HeaderInjector {

  /**
   * Adds headers to server's requests for corresponding url.
   *
   * @param url an url headers will be added for
   * @return a map with headers, where keys are header's names, and values are header's values. {@code null} is not acceptable!
   */
  addHeaders(url: string): HashMap<string, string>;
}