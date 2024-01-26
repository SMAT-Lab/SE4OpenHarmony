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
export enum FileType {
  Unknown = 0,
  File,
  Directory,
  SymbolicLink
}

export interface UnixPermissions {
  readonly user: number
  readonly group: number
  readonly world: number
}

/**
 * Describes a file, directory or symbolic link.
 */
export class FileInfo {
  static UnixPermission = {
    Read: 4,
    Write: 2,
    Execute: 1
  }

  type = FileType.Unknown
  size = 0
  /**
   * Unparsed, raw modification date as a string.
   *
   * If `modifiedAt` is undefined, the FTP server you're connected to doesn't support the more modern
   * MLSD command for machine-readable directory listings. The older command LIST is then used returning
   * results that vary a lot between servers as the format hasn't been standardized. Here, directory listings
   * and especially modification dates were meant to be human-readable first.
   *
   * Be careful when still trying to parse this by yourself. Parsing dates from listings using LIST is
   * unreliable. This library decides to offer parsed dates only when they're absolutely reliable and safe to
   * use e.g. for comparisons.
   */
  rawModifiedAt = ""
  /**
   * Parsed modification date.
   *
   * Available if the FTP server supports the MLSD command. Only MLSD guarantees dates than can be reliably
   * parsed with the correct timezone and a resolution down to seconds. See `rawModifiedAt` property for the unparsed
   * date that is always available.
   */
  modifiedAt?: Date = undefined
  /**
   * Unix permissions if present. If the underlying FTP server is not running on Unix this will be undefined.
   * If set, you might be able to edit permissions with the FTP command `SITE CHMOD`.
   */
  permissions?: UnixPermissions = undefined
  /**
   * Hard link count if available.
   */
  hardLinkCount?: number = undefined
  /**
   * Link name for symbolic links if available.
   */
  link?: string = undefined
  /**
   * Unix group if available.
   */
  group?: string = undefined
  /**
   * Unix user if available.
   */
  user?: string = undefined
  /**
   * Unique ID if available.
   */
  uniqueID?: string = undefined

  constructor(public name: string) {
    this.name = name
  }

  get isDirectory(): boolean {
    return this.type === FileType.Directory
  }

  get isSymbolicLink(): boolean {
    return this.type === FileType.SymbolicLink
  }

  get isFile(): boolean {
    return this.type === FileType.File
  }

  /**
   * Deprecated, legacy API. Use `rawModifiedAt` instead.
   * @deprecated
   */
  get date(): string {
    return this.rawModifiedAt
  }

  set date(rawModifiedAt: string) {
    let  startTime1 = new Date().getTime();
    this.rawModifiedAt = rawModifiedAt
    let endTime1 = new Date().getTime();
    let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
    console.log("BasicFtpTest : date averageTime : " + averageTime1 + "us")
  }
}
