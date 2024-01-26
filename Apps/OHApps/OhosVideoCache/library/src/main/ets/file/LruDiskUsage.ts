// @ts-nocheck
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

import LinkedList from '@ohos.util.LinkedList';
import DiskUsage from './DiskUsage';
import { Files } from './Files';
import fs from '@ohos.file.fs';
import taskpool from '@ohos.taskpool';
import emitter from '@ohos.events.emitter';
import { VideoCacheConstant } from '../constant/VideoCacheConstant';
import StorageUtils from '../StorageUtils';

async function TouchCallable(file: string) {
  'use concurrent'
  Files.setLastModifiedNow(file);
  let last = file.lastIndexOf("/");
  let directory: string = file.substring(0, last);
  let files = Files.getLruListFiles(directory);

  let eventStart: emitter.InnerEvent = {
    eventId: VideoCacheConstant.COUNT_TOTAL_SIZE_START_ID,
    priority: emitter.EventPriority.IMMEDIATE
  }
  emitter.emit(eventStart);
  for (let i = 0; i < files.length; i++) {
    let singleFile = files.get(i);
    let eventData: emitter.EventData = {
      data: {
        id: VideoCacheConstant.COUNT_TOTAL_SIZE_ID,
        content: singleFile
      }
    }
    let event: emitter.InnerEvent = {
      eventId: VideoCacheConstant.COUNT_TOTAL_SIZE_ID,
      priority: emitter.EventPriority.IMMEDIATE
    }
    emitter.emit(event, eventData)
  }

  let event: emitter.InnerEvent = {
    eventId: VideoCacheConstant.COUNT_TOTAL_SIZE_END_ID,
    priority: emitter.EventPriority.IMMEDIATE
  }
  emitter.emit(event);

  let totalSize = await new Promise<number>((resolve, reject) => {
    let sendSizeEvent: emitter.InnerEvent = {
      eventId: VideoCacheConstant.SEND_TOTAL_SIZE_ID
    }
    emitter.on(sendSizeEvent, (data: emitter.EventData) => {
      try {
        if (data && data.data && typeof data.data.totalSize === "number") {
          return resolve(data.data.totalSize)
        }

      } catch (err) {
        return reject(0)
      }
    })
  })

  let totalCount = files.length;
  for (let i = 0; i < files.length; i++) {
    let file: string = files[i];
    let eventData: emitter.EventData = {
      data: {
        id: VideoCacheConstant.GET_ACCEPT_ID,
        "file": file,
        "totalSize": totalSize,
        "totalCount": totalCount
      }
    }
    let event: emitter.InnerEvent = {
      eventId: VideoCacheConstant.GET_ACCEPT_ID,
      priority: emitter.EventPriority.IMMEDIATE
    }
    emitter.emit(event, eventData);
    let accepted = await new Promise<boolean>((resolve, reject) => {
      let acceptEvent: emitter.InnerEvent = {
        eventId: VideoCacheConstant.SEND_ACCEPT_ID
      }
      emitter.on(acceptEvent, (data: emitter.EventData) => {
        try {
          if (data && data.data && typeof data.data.accept === "boolean") {
            return resolve(data.data.accept);
          }
        } catch (err) {
          return reject(false);
        }
      })

    })

    if (!accepted) {
      let fileSize = fs.statSync(file).size;
      fs.unlinkSync(file);
      totalCount--;
      totalSize -= fileSize;
    }
  }


}


export default class LruDiskUsage implements DiskUsage {
  private list: LinkedList<string> = new LinkedList();
  private file: string = "";
  private totalSize: number = 0;
  private totalCount: number = 0;

  constructor() {
    let self = this;
    self.list = new LinkedList();
    let countTotalSizeEvent: emitter.InnerEvent = {
      eventId: VideoCacheConstant.COUNT_TOTAL_SIZE_ID
    }
    emitter.on(countTotalSizeEvent, (data: emitter.EventData) => {
      if (data && data.data && typeof data.data.content === "string") {
        let content = data.data.content;
        self.list.add(content);
      }
    })
    let countTotalStratEvent: emitter.InnerEvent = {
      eventId: VideoCacheConstant.COUNT_TOTAL_SIZE_START_ID
    }
    emitter.on(countTotalStratEvent, (data: emitter.EventData) => {
      self.list.clear()
    })
    let countTotalEndEvent: emitter.InnerEvent = {
      eventId: VideoCacheConstant.COUNT_TOTAL_SIZE_END_ID
    }
    emitter.on(countTotalEndEvent, (data: emitter.EventData) => {
      let totalSize = self.countTotalSize(self.list);
      let endData: emitter.EventData = {
        data: {
          id: VideoCacheConstant.SEND_TOTAL_SIZE_ID,
          "totalSize": totalSize
        }
      }
      let endEvent: emitter.InnerEvent = {
        eventId: VideoCacheConstant.SEND_TOTAL_SIZE_ID,
        priority: emitter.EventPriority.IMMEDIATE
      }
      emitter.emit(endEvent, endData);
    })

    let acceptEvent: emitter.InnerEvent = {
      eventId: VideoCacheConstant.GET_ACCEPT_ID
    }
    emitter.on(acceptEvent, (data: emitter.EventData) => {
      self.file = data?.data?.file ? data?.data?.file : "";
      self.totalSize = data?.data?.totalSize ? data?.data?.totalSize : 0;
      self.totalCount = data?.data?.totalCount ? data?.data?.totalCount : 0;
      if (data && data.data && typeof data.data.file === "string") {
        self.file = data.data.file;
        let accept = self.accept(self.file, self.totalSize, self.totalCount);
        let endData: emitter.EventData = {
          data: {
            id: VideoCacheConstant.SEND_ACCEPT_ID,
            "accept": accept
          }
        }
        let endEvent: emitter.InnerEvent = {
          eventId: VideoCacheConstant.SEND_ACCEPT_ID,
          priority: emitter.EventPriority.IMMEDIATE
        }

        emitter.emit(endEvent, endData);
      }

    })
  }

  touch(filePath: string): void {
    if (!filePath || !filePath.startsWith(StorageUtils.DEFAULT_DIR)) {
      return;
    }
    let task: taskpool.Task = new taskpool.Task(TouchCallable, filePath);
    taskpool.execute(task, taskpool.Priority.HIGH);
    let closeTaskEvent: emitter.InnerEvent = {
      eventId: VideoCacheConstant.SHUT_DOWN_TASKPOOL
    }
    emitter.on(closeTaskEvent, (data: emitter.EventData) => {
      if (task) {
        taskpool.cancel(task)
      }
      emitter.off(VideoCacheConstant.SEND_TOTAL_SIZE_ID)
      emitter.off(VideoCacheConstant.SEND_ACCEPT_ID)
      emitter.off(VideoCacheConstant.COUNT_TOTAL_SIZE_ID)
      emitter.off(VideoCacheConstant.COUNT_TOTAL_SIZE_START_ID)
      emitter.off(VideoCacheConstant.COUNT_TOTAL_SIZE_END_ID)
      emitter.off(VideoCacheConstant.GET_ACCEPT_ID)
      emitter.off(VideoCacheConstant.SHUT_DOWN_TASKPOOL)
    })
  }

  countTotalSize(files: LinkedList<string>): number {
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      let file: string = files[i];
      if (!fs.accessSync(file)) {
        continue;
      }
      let tempSize = fs.statSync(file).size;
      totalSize += tempSize
    }
    return totalSize;
  }

  protected accept(file: string, totalSize: number, totalCount: number): boolean {
    return false;
  }
}