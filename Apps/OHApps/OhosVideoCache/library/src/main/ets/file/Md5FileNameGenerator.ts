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

import ProxyCacheUtils from '../ProxyCacheUtils';
import FileNameGenerator from './FileNameGenerator';

export default class Md5FileNameGenerator implements FileNameGenerator {
  private MAX_EXTENSION_LENGTH: number = 4;

  generate(url: string): string {
    let extension = this.getExtension(url);
    let name = ProxyCacheUtils.computeMD5(url);
    return!extension || extension.length < 1 ? name : name + "." + extension;
  }

  private getExtension(url: string): string {
    let dotIndex = url.lastIndexOf('.');
    let slashIndex = url.lastIndexOf('/');
    return dotIndex != -1 && dotIndex > slashIndex && dotIndex + 2 + this.MAX_EXTENSION_LENGTH > url.length ?
    url.substring(dotIndex + 1, url.length) : "";
  }
}