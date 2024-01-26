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
 
import { FileInfo, FileType } from './FileInfo'

/**
 * This parser is based on the FTP client library source code in Apache Commons Net provided
 * under the Apache 2.0 license. It has been simplified and rewritten to better fit the Javascript language.
 *
 * https://github.com/apache/commons-net/blob/master/src/main/java/org/apache/commons/net/ftp/parser/NTFTPEntryParser.java
 */

const RE_LINE = new RegExp(
  "(\\S+)\\s+(\\S+)\\s+" // MM-dd-yy whitespace hh:mma|kk:mm swallow trailing spaces
  + "(?:(<DIR>)|([0-9]+))\\s+" // <DIR> or ddddd swallow trailing spaces
  + "(\\S.*)" // First non-space followed by rest of line (name)
)

/**
 * Returns true if a given line might be a DOS-style listing.
 *
 * - Example: `12-05-96  05:03PM       <DIR>          myDir`
 */
export function testLine(line: string): boolean {
  return /^\d{2}/.test(line) && RE_LINE.test(line)
}

/**
 * Parse a single line of a DOS-style directory listing.
 */
export function parseLine(line: string): FileInfo | undefined {
  const groups = line.match(RE_LINE)
  if (groups === null) {
    return undefined
  }
  const name = groups[5]
  if (name === "." || name === "..") { // Ignore parent directory links
    return undefined
  }
  const file = new FileInfo(name)
  const fileType = groups[3]
  if (fileType === "<DIR>") {
    file.type = FileType.Directory
    file.size = 0
  }
  else {
    file.type = FileType.File
    file.size = parseInt(groups[4], 10)
  }
  file.rawModifiedAt = groups[1] + " " + groups[2]
  return file
}

export function transformList(files: FileInfo[]): FileInfo[] {
  return files
}