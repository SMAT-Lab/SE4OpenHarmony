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

import Config from './Config';
import DiskUsage from './file/DiskUsage';
import FileNameGenerator from './file/FileNameGenerator';
import Md5FileNameGenerator from './file/Md5FileNameGenerator';
import TotalCountLruDiskUsage from './file/TotalCountLruDiskUsage';
import TotalSizeLruDiskUsage from './file/TotalSizeLruDiskUsage';
import EmptyHeadersInjector from './headers/EmptyHeadersInjector';
import HeaderInjector from './headers/HeaderInjector';
import HttpProxyCacheServer from './HttpProxyCacheServer';
import Preconditions from './Preconditions';
import SourceInfoStorage from './sourcestorage/SourceInfoStorage';
import SourceInfoStorageFactory from './sourcestorage/SourceInfoStorageFactory';
import StorageUtils from './StorageUtils';
export default class HttpProxyCacheServerBuilder {
  private DEFAULT_MAX_SIZE: number = 512 * 1024 * 1024;
  private cacheRoot: string;
  private fileNameGenerator: FileNameGenerator;
  private diskUsage: DiskUsage;
  private sourceInfoStorage: SourceInfoStorage;
  private headerInjector: HeaderInjector;
  private context: Context;

  public constructor(context: Context) {
    this.context = context;
  }

  /**
   * Overrides default cache folder to be used for caching files.
   * <p>
   * By default AndroidVideoCache uses
   * '/Android/data/[app_package_name]/cache/video-cache/' if card is mounted and app has appropriate permission
   * or 'video-cache' subdirectory in default application's cache directory otherwise.
   * </p>
   * <b>Note</b> directory must be used <b>only</b> for AndroidVideoCache files.
   *
   * @param file a cache directory, can't be null.
   * @return a builder.
   */
  public cacheDirectory(file: string): HttpProxyCacheServerBuilder {
    this.cacheRoot = Preconditions.checkNotNull(file);
    return this;
  }

  /**
   * Overrides default cache file name generator {@link Md5FileNameGenerator} .
   *
   * @param fileNameGenerator a new file name generator.
   * @return a builder.
   */
  public setFileNameGenerator(fileNameGenerator: FileNameGenerator): HttpProxyCacheServerBuilder {
    this.fileNameGenerator = Preconditions.checkNotNull(fileNameGenerator);
    return this;
  }

  /**
   * Sets max cache size in bytes.
   * <p>
   * All files that exceeds limit will be deleted using LRU strategy.
   * Default value is 512 Mb.
   * </p>
   * Note this method overrides result of calling {@link #maxCacheFilesCount(int)}
   *
   * @param maxSize max cache size in bytes.
   * @return a builder.
   */
  public maxCacheSize(maxSize: number): HttpProxyCacheServerBuilder {
    this.diskUsage = new TotalSizeLruDiskUsage(maxSize);
    return this;
  }

  /**
   * Sets max cache files count.
   * All files that exceeds limit will be deleted using LRU strategy.
   * Note this method overrides result of calling {@link #maxCacheSize(long)}
   *
   * @param count max cache files count.
   * @return a builder.
   */
  public maxCacheFilesCount(count: number): HttpProxyCacheServerBuilder {
    this.diskUsage = new TotalCountLruDiskUsage(count);
    return this;
  }

  /**
   * Set custom DiskUsage logic for handling when to keep or clean cache.
   *
   * @param diskUsage a disk usage strategy, can't be {@code null}.
   * @return a builder.
   */
  public setDiskUsage(diskUsage: DiskUsage): HttpProxyCacheServerBuilder {
    this.diskUsage = Preconditions.checkNotNull(diskUsage);
    return this;
  }

  /**
   * Add headers along the request to the server
   *
   * @param headerInjector to inject header base on url
   * @return a builder
   */
  public setHeaderInjector(headerInjector: HeaderInjector): HttpProxyCacheServerBuilder {
    this.headerInjector = Preconditions.checkNotNull(headerInjector);
    return this;
  }

  /**
   * Builds new instance of {@link HttpProxyCacheServer}.
   *
   * @return proxy cache. Only single instance should be used across whole app.
   */
  public build(): HttpProxyCacheServer {
    // 之所以把初始化从构造函数改到build是因为再构造函数里面初始化之后再在设置setDiskUsage方法里面设置，diskUsage这些对象不会被消除，还能存在，在LruDiskUsage调用accept方法的时候返回结果导致结果异常
    if (!this.sourceInfoStorage && this.context) {
      this.sourceInfoStorage = SourceInfoStorageFactory.newSourceInfoStorage(this.context);
    }
    if (!this.cacheRoot && this.context) {
      this.cacheRoot = StorageUtils.getIndividualCacheDirectory(this.context);
    }
    if (!this.diskUsage) {
      this.diskUsage = new TotalSizeLruDiskUsage(this.DEFAULT_MAX_SIZE);
    }
    if (!this.fileNameGenerator) {
      this.fileNameGenerator = new Md5FileNameGenerator();
    }
    if (!this.headerInjector) {
      this.headerInjector = new EmptyHeadersInjector();
    }
    let config = this.buildConfig();
    return new HttpProxyCacheServer(config);
  }

  public buildConfig(): Config {
    return new Config(this.cacheRoot, this.fileNameGenerator, this.diskUsage, this.sourceInfoStorage, this.headerInjector);
  }
}