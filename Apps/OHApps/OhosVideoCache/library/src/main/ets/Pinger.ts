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

import socket from '@ohos.net.socket';
import taskpool from '@ohos.taskpool';
import connection from '@ohos.net.connection';
import Preconditions from './Preconditions';
import { ProxyCacheException } from './ProxyCacheException';
import emitter from '@ohos.events.emitter';
import HttpUrlSource from './HttpUrlSource';
import buffer from '@ohos.buffer';
import { DataBackListener } from './interfaces/DataBackListener';
import ProgressValue from './bean/ProgressValue';
import { VideoCacheConstant } from './constant/VideoCacheConstant';

async function pingCallable(pingUrl: string) {
  'use concurrent'
  let pingResult: boolean = false;
  let source = new HttpUrlSource([pingUrl]);
  try {
    let expectedResponse = VideoCacheConstant.PING_RESPONSE;

    class TempDataBackListener implements DataBackListener {
      onDataEnd() {
      }
      onDataStart() {
      }
      onDataProgress(progress: ProgressValue) {
      }
      onDataReceive(data: ArrayBuffer) {
        if (data && data.byteLength) {
          let response = buffer.from(data).toString('utf-8')
          console.info("Ping response: `" + response + "`, pinged? " + pingResult);
          pingResult = expectedResponse == response;
          let eventData: emitter.EventData = {
            data: {
              "content": pingResult,
              "id": VideoCacheConstant.PING_EVENT_ID
            }
          }
          let event: emitter.InnerEvent = {
            eventId: VideoCacheConstant.PING_EVENT_ID,
            priority: emitter.EventPriority.IMMEDIATE
          }
          emitter.emit(event, eventData)
        }
      }
    }
    source.setDataListener(new TempDataBackListener())
   await source.open(0);
  } catch (err) {
    console.error("Error reading ping response,reason is " + err.message);
    pingResult = false;
  } finally {
    if (source) {
      source.close();
    }
  }
}

export default class Pinger {
  private host: string;
  private port: number;

  constructor(host: string, port: number) {
    this.host = Preconditions.checkNotNull(host);
    this.port = port;
  }

  async ping(maxAttempts: number, startTimeout: number): Promise<boolean> {
    Preconditions.checkArgument(maxAttempts >= 1);
    Preconditions.checkArgument(startTimeout > 0);
    const self = this;
    let timeout = startTimeout;
    let attempts = 0;
    let pingData: boolean = false;
    while (attempts < maxAttempts) {
      try {
        pingData = await new Promise<boolean>((resolve, reject) => {
          let event: emitter.InnerEvent = {
            eventId: VideoCacheConstant.PING_EVENT_ID
          }
          emitter.on(event, (data: emitter.EventData) => {
            if (data && data.data && data.data.content && typeof data.data.content === 'boolean') {
             return resolve(data.data.content)
            } else {
              return resolve(false)
            }
          })
          let url = self.getPingUrl()
          let runningTask: taskpool.Task = new taskpool.Task(pingCallable, url)
          taskpool.execute(runningTask,taskpool.Priority.HIGH);

          let closeTaskEvent: emitter.InnerEvent = {
            eventId: VideoCacheConstant.SHUT_DOWN_TASKPOOL
          }
          emitter.on(closeTaskEvent, (data: emitter.EventData) => {
            try {
              if (runningTask) {
                taskpool.cancel(runningTask)
              }
              emitter.off(VideoCacheConstant.PING_EVENT_ID)
              emitter.off(VideoCacheConstant.SHUT_DOWN_TASKPOOL)
            } catch (err) {
            }
          })

        })
        if (pingData) {
          break;
        }
      } catch (err) {
        console.warn("Error pinging server (attempt: " + attempts + ", timeout: " + timeout + "). ");
        console.error("Error pinging server due to unexpected error,reason is " + err.message)
      }
      attempts++;
      timeout *= 2;
    }
    if (pingData) {
      return new Promise<boolean>((resolve, reject) => {
        resolve(pingData)
      })
    } else {
      let proxy = await this.getDefaultProxies()
      let error = `Error pinging server (attempts: ${attempts}, max timeout: ${timeout / 2}).
     If you see this message, please, report at https://github.com/danikula/AndroidVideoCache/issues/134.
     Default proxies are:${JSON.stringify(proxy)}`
      console.error(error, new ProxyCacheException(error));
      return new Promise((resolve, reject) => {
       return resolve(false)
      })
    }

  }

  isPingRequest(request: string): boolean {
    return VideoCacheConstant.PING_REQUEST == request;
  }

  async responseToPing(socket: socket.TCPSocketConnection): Promise<void> {
    let header: socket.TCPSendOptions = {
      data: "HTTP/1.1 200 OK\n\n"
    }
    await socket?.send(header)
    let body: socket.TCPSendOptions = {
      data: VideoCacheConstant.PING_RESPONSE
    }
    await socket?.send(body)
    return Promise.resolve();
  }


  private async getDefaultProxies(): Promise<connection.HttpProxy> {
    try {
      let result = await connection.getDefaultHttpProxy();
      return result;
    } catch (err) {
      throw new ProxyCacheException(err.message);
    }
  }

  private getPingUrl(): string {
    return `http://${this.host}:${this.port}/${VideoCacheConstant.PING_REQUEST}`;
  }
}