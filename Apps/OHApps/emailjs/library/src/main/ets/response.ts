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

//@ts-nocheck
import { SMTPError, SMTPErrorStates } from './error.js';
// import type { Socket } from 'net';
// import type { TLSSocket } from 'tls';
import socket from '@ohos.net.socket';
import buffer from '@ohos.buffer';
import SocketMsg from './SocketMsg'

export class SMTPResponseMonitor {
  public readonly stop: (err?: Error) => void;

  constructor(
    stream: socket.TCPSocket | socket.TLSSocket,
    timeout: number,
    msg: SocketMsg,
    onerror: (err: Error) => void
  ) {
    let bufferTemp = '';

    const notify = () => {
      if (bufferTemp.length) {
        // parse buffer for response codes
        const line = bufferTemp.replace('\r', '');
        if (!(line.trim().split('\n').pop()?.match(/^(\d{3})\s/) ?? false
        )
        ) {
          return;
        }

        const match = line ? line.match(/(\d+)\s?(.*)/) : null;
        const data =
            match !== null
            ? { code: match[1], message: match[2], data: line }
            : { code: -1, data: line };

        msg.emit('response', null, data);
        bufferTemp = '';
      }
    };

    const error = (err: Error) => {
      msg.emit(
        'response',
        SMTPError.create(
          'connection encountered an error',
          SMTPErrorStates.ERROR,
          err
        )
      );
    };

    const timedout = (err?: Error) => {
      stream.close();
      msg.emit(
        'response',
        SMTPError.create(
          'timedout while connecting to smtp server',
          SMTPErrorStates.TIMEDOUT,
          err
        )
      );
    };

    const watch = (data: string | buffer.Buffer) => {
      if (data !== null) {
        bufferTemp += data.toString();
        notify();
      }
    };

    const close = (err: Error) => {
      msg.emit(
        'response',
        SMTPError.create(
          'connection has closed',
          SMTPErrorStates.CONNECTIONCLOSED,
          err
        )
      );
    };

    const end = (err: Error) => {
      msg.emit(
        'response',
        SMTPError.create(
          'connection has ended',
          SMTPErrorStates.CONNECTIONENDED,
          err
        )
      );
    };

    this.stop = (err) => {
      // stream.removeAllListeners('response');
      // stream.removeListener('data', watch);
      // stream.removeListener('end', end);
      // stream.removeListener('close', close);
      // stream.removeListener('error', error);
      msg.off('response');
      stream.off('message', (data) => {
        if (data !== null) {
          bufferTemp += buffer.from(data.message).toString();
          notify();
        }
      });
      stream.off('close', (err) => {
        close(null)
      });
      stream.off('error', error);

      if (err != null && typeof onerror === 'function') {
        onerror(err);
      }
    };

    stream.on('message', (data) => {
      if (data !== null) {
        bufferTemp += buffer.from(data.message).toString();
        notify();
      }
    });
    // stream.on('end', end);
    stream.on('close', () => {
      close(null)
    });
    stream.on('error', error);
    // stream.setTimeout(timeout, timedout);
  }
}
