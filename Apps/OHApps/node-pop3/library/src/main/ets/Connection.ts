// @ts-nocheck
import socket from '@ohos.net.socket';
import connection from '@ohos.net.connection';
import { Buffer } from '../polyfill/buffer';
import { EventEmitter } from '../polyfill/events';
import { Readable } from '../polyfill/stream';
import to from './await-to-js'
import Pop3Error from './Pop3Error'
import {
  CRLF,
  CRLF_BUFFER,
  MAYBE_MULTI_LINE_COMMAND_NAME,
  MULTI_LINE_COMMAND_NAME,
  TERMINATOR_BUFFER,
  TERMINATOR_BUFFER_ARRAY
} from './constant.js';
const BASE_COUNT = 1

class Pop3Connection extends EventEmitter {
  protected _socket: socket.TCPSocket | socket.TLSSocket = undefined;
  private host: string = '';
  private port: number = 110;
  private timeout: number = 30000;
  private tls: boolean = false;
  private tlsOptions: socket.TLSConnectOptions = undefined;
  private _command: string = '';
  private servername: string = '';
  private _stream: any = undefined;

  constructor(bean:Pop3LoginBean) {
    super();
    this.host = bean?.host;
    this.port = bean?.port || (bean?.tls ? 995 : 110);
    this.tls = bean?.tls;
    this.timeout = bean?.timeout;
    this._socket = null;
    this._stream = null;
    this._command = '';
    this.tlsOptions = bean?.tlsOptions || {};
    this.servername = bean?.servername || bean?.host;
  }

  /**
   * @returns {Readable}
   */
  _updateStream() {
    this._stream = new Readable({
      read() {
        //
      }
    });
    return this._stream;
  }

  /**
   * @param {Buffer} buffer
   * @returns {void}
   */
  _pushStream(buffer) {
    if (TERMINATOR_BUFFER_ARRAY.some((_buffer) => _buffer.equals(buffer))) {
      this._endStream();
      return;
    }
    const endBuffer = buffer.subarray(-5);
    if (endBuffer.equals(TERMINATOR_BUFFER)) {
      /** @type {Readable} */
      (this._stream).push(buffer.subarray(0, -5));
      this._endStream();
      return;
    }
    /** @type {Readable} */
    (this._stream).push(buffer);
  }

  /**
   * @param {Error} [err]
   * @returns {void}
   */
  _endStream(err?: Pop3Error) {
    if (this._stream) {
      this._stream.push(null);
    }
    this._stream = null;
    this.emit('end', err);
  }

  /**
   * @returns {Promise<void>}
   */
  connect():Promise<void> {
    return new Promise(async (resolve, reject) => {
      const {host, port, tlsOptions, servername} = this;
      if (!tlsOptions) {
        this._socket = socket.constructTLSSocketInstance();
      } else {
        this._socket = socket.constructTCPSocketInstance();
      }
      let [netHandleErr, netHandle] = await to<connection.NetHandle>(connection.getDefaultNet())
      if (netHandleErr) {
        reject(netHandleErr)
      }
      if (!netHandle) {
        reject(new Pop3Error('get Default Net is fail'))
      }
      let [netSyncErr, netSyncInfo] = await to<connection.ConnectionProperties>(connection.getConnectionProperties(netHandle))
      if (netSyncErr) {
        reject(netSyncErr)
      }
      if (!netSyncInfo || !netSyncInfo.linkAddresses || netSyncInfo.linkAddresses.length < 1
      || !netSyncInfo.linkAddresses[0] || !netSyncInfo.linkAddresses[0].address) {
        reject(new Pop3Error('get local ip is fail'))
      }
      let [bindErr, bindInfo] = await to<void>(this._socket.bind({
        address: netSyncInfo.linkAddresses[0].address.address,
        port: netSyncInfo.linkAddresses[0].address.port,
        family: 1
      }))
      if (bindErr) {
        reject(bindErr)
      }
      this._socket.on('error', async (err) => {
        let tempErr = new Pop3Error();
        tempErr.name = err.name;
        tempErr.stack = err.stack;
        tempErr.message = err.message;
        if (err && err.message.indexOf('timeout') != -1) {
          tempErr.eventName = 'timeout';
          reject(tempErr)
          if (this.listeners('end').length) {
            this.emit('end', tempErr);
          }
          if (this.listeners('error').length) {
            this.emit('error', tempErr);
          }
          await this._socket.close();
          this._socket = null;
        } else {
          tempErr.eventName = 'error';
          if (this._stream) {
            this.emit('error', tempErr);
            return;
          }
          reject(tempErr);
          this._socket = null;
        }
      })


      this._socket.on('message', (data) => {
        let bufferData = Buffer.from(data.message)
        if (this._stream) {
          this._pushStream(bufferData);
          return;
        }

        if (bufferData[0] === 45) { // '-'
          const err = (new Pop3Error(bufferData.subarray(5, -2)));
          err.eventName = 'error';
          err.command = this._command;
          this.emit('error', err);
          return;
        }
        if (bufferData[0] === 43) { // '+'
          const firstLineEndIndex = bufferData.indexOf(CRLF_BUFFER);
          const infoBuffer = bufferData.subarray(4, firstLineEndIndex);
          const [commandName, msgNumber] = (this._command || '').split(' ');
          let stream = null;
          if (MULTI_LINE_COMMAND_NAME.includes(commandName) ||
          (!msgNumber &&
          MAYBE_MULTI_LINE_COMMAND_NAME.includes(commandName))) {
            this._updateStream();
            stream = this._stream;
            const bodyBuffer = bufferData.subarray(firstLineEndIndex + 2);
            if (bodyBuffer[0]) {
              this._pushStream(bodyBuffer);
            }
          }
          this.emit('response', infoBuffer.toString(), stream);
          resolve(infoBuffer.toString());
          return;
        }
        const err = (new Pop3Error('Unexpected response'));
        err.eventName = 'bad-server-response';
        reject(err);
      }
      );

      this._socket.on('close', () => {
        const err = (new Pop3Error('close'));
        err.eventName = 'close';
        reject(err);
        this._socket = null;
      });
      let [extraErr, extraInfo] = await to<void>(this._socket.setExtraOptions({
        keepAlive: true,
        socketTimeout: this.timeout
      }))
      if (extraErr) {
        return new Promise(function (resolve, reject) {
          reject(extraErr)
        })
      }
      let [addressErr, addressInfo] = await to<Array<socket.NetAddress>>(connection.getAddressesByName(host))
      if (addressErr) {
        reject(addressErr)
      }
      if (!addressInfo || addressInfo.length < 1) {
        reject(new Pop3Error('parse host fail'))

      }
      let parseHost = addressInfo[0].address
      let parsePort = addressInfo[0].port;
      for (let i = 0; i < addressInfo.length; i++) {
        if (!addressInfo[i]) {
          continue;
        }
        if (addressInfo[i].family === 2 || addressInfo[i].address.indexOf("::") != -1) {
          continue;
        }
        parseHost = addressInfo[i].address;
        parsePort = addressInfo[i].port;
        break;
      }


      if (!tlsOptions) {
        let option: socket.TLSConnectOptions = {
          address: {
            address: parseHost,
            port: port ? port : parsePort,
            family: 1
          },
          secureOptions: tlsOptions.secureOptions,
          ALPNProtocols: tlsOptions.ALPNProtocols
        }
        let [connectErr, connectInfo] = await to<void>((this._socket as socket.TLSSocket).connect(option))
        if (connectErr) {
          reject(connectErr)
        }
      } else {
        let option: socket.TCPConnectOptions = {
          address: {
            address: host,
            port: port ? port : parsePort,
            family: 1
          }
        }

        option.address.port = port ? port : parsePort;
        option.address.address = parseHost;

        let [connectErr, connectInfo] = await to<void>((this._socket as socket.TCPSocket).connect(option))
        if (connectErr) {
          reject(connectErr)
        }
      }
    });
  }

  /**
   * @param {...(string|Integer)} args
   * @throws {Error}
   * @returns {Promise<[string, Readable]>}
   */
  async command(...args):Promise<[string, Readable]> {
    let startTime1 = new Date().getTime();
    this._command = args.join(' ');
    if (!this._socket) {
      throw new Pop3Error('no-socket');
    }
    await new Promise((resolve, reject) => {
      if (!this._stream) {
        return resolve(null,null);
      }
      this.once('error', (err) => {
        return reject(err);
      });
      this.once('end', (err) => {
        return err ? reject(err) : resolve(null);
      });
    });

    return new Promise((resolve, reject) => {
      /**
       * @param {Error} err
       */
      const rejectFn = (err) => reject(err);
      this.once('error', rejectFn);
      this.once('response', (info, stream) => {
        this.removeListener('error', rejectFn);
        return resolve([info, stream]);
      });
      if (!this._socket) {
        reject(new Pop3Error('no-socket'));
      }
      if ('getCipherSuite' in this._socket) {
        let tempSocket = this._socket as socket.TLSSocket;
        tempSocket.send(`${this._command}${CRLF}`)
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("command averageTime : " + averageTime1 + "us")
      } else {
        let tempSocket = this._socket as socket.TCPSocket;
        tempSocket.send({
          data: `${this._command}${CRLF}`,
          encoding: 'utf8'
        })
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
        console.log("command averageTime : " + averageTime1 + "us")
      }
    });
  }
}

export default Pop3Connection;
