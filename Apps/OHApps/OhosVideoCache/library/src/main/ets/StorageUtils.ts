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
import { Context } from '@ohos.abilityAccessCtrl';

export default class StorageUtils {
  private static INDIVIDUAL_DIR_NAME: string = "video-cache";
  public  static DEFAULT_DIR: string = '/data/storage/el2/base/haps/entry/cache';

  /**
   * Returns individual application cache directory (for only video caching from Proxy). Cache directory will be
   * created on SD card <i>("/Android/data/[app_package_name]/cache/video-cache")</i> if card is mounted .
   * Else - Android defines cache directory on device's file system.
   *
   * @param context Application context
   * @return Cache {@link File directory}
   */
  public static getIndividualCacheDirectory(context: Context): string {
    let cacheDir = StorageUtils.getCacheDirectory(context, true);
    return cacheDir + '/' + StorageUtils.INDIVIDUAL_DIR_NAME;
  }


  /**
   * Returns application cache directory. Cache directory will be created on SD card
   * <i>("/Android/data/[app_package_name]/cache")</i> (if card is mounted and app has appropriate permission) or
   * on device's file system depending incoming parameters.
   *
   * @param context        Application context
   * @param preferExternal Whether prefer external location for cache
   * @return Cache {@link File directory}.<br />
   * <b>NOTE:</b> Can be null in some unpredictable cases (if SD card is unmounted and
   * {@link android.content.Context#getCacheDir() Context.getCacheDir()} returns null).
   */
  private static getCacheDirectory(context: Context, preferExternal: boolean): string {
    let appCacheDir: string | null = null;
    try {
      if (context && context.cacheDir && preferExternal) {
        appCacheDir = context.cacheDir
      } else {
        appCacheDir = StorageUtils.DEFAULT_DIR
      }

    } catch (err) { // (sh)it happens
      appCacheDir = StorageUtils.DEFAULT_DIR
    }
    return appCacheDir;
  }
}