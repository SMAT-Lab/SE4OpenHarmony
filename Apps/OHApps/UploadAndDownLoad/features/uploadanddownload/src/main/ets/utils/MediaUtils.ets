/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';
import mediaLibrary from '@ohos.multimedia.mediaLibrary';
import { logger } from '../utils/Logger';

const TAG: string = 'MediaUtils';

export class MediaUtils {
  async copyFileToCache(cacheDir: string, uri: string): Promise<string> {
    let id = uri.split('/').pop();
    let imagePath = `${cacheDir}/${id}.jpg`;
    let file = await fs.open(uri);
    try {
      fs.copyFileSync(file.fd, imagePath);
    } catch (err) {
      logger.info(TAG, `copyFileToCache copyFileSync err = ${err}`);
    }
    await fs.close(file.fd);
    return imagePath;
  }
}