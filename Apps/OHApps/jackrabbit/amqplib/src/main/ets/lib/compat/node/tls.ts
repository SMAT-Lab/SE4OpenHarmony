/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import socket from '@ohos.net.socket';

import { Duplex, buffer } from '@ohos/node-polyfill';
import wifiManager from '@ohos.wifiManager'
import { intToIP } from './util';
let Buffer = buffer.Buffer

const CONNECT_ERROR_CODE_TIMEOUT = 115;

export function connect(options: ConnectionOptions, connectionListener?: () => void): Socket {
    const socket: Socket = new Socket();
    socket.connect(options, connectionListener);
    return socket;
}

export interface ConnectionOptions {
    address: NetAddress;
    secureOptions: SecureContextOptions;
    ALPNProtocols?: Array<string>;
}

export interface NetAddress {
    address: string;
    family?: number;
    port?: number;
}

export interface SecureContextOptions {
    ca: string | Array<string>;
    cert: string;
    key: string;
    passwd?: string;
    protocols?: Protocol | Array<Protocol>;
    useRemoteCipherPrefer?: boolean;
    signatureAlgorithms?: string;
    cipherSuite?: string;
}


export class Socket extends Duplex {
    private tlsSocket: socket.TLSSocket
    private options: ConnectionOptions
    private tlsConnectOptions: socket.TLSConnectOptions = {
        address: undefined,
        secureOptions: undefined,
        ALPNProtocols: ["spdy/1", "http/1.1"]
    }
    private tcpExtraOptions: socket.TCPExtraOptions = { socketLinger: { on: true, linger: 10 } }
    private timeoutCallback: () => void
    private connectListeners: (() => void)[] = []
    private messageListeners: ((any) => void)[] = []
    private errorListeners: ((any) => void)[] = []
    private connecting: boolean = false;
    private address: string = 'localhost'

    constructor() {
        super({ allowHalfOpen: false, emitClose: false, autoDestroy: true, decodeStrings: false });
        let ipInfo = wifiManager.getIpInfo()
        this.address = intToIP(ipInfo.ipAddress)
        this.tlsSocket = socket.constructTLSSocketInstance()
        this.tlsSocket.on('connect', this.connectDispatcher)
        this.tlsSocket.on('message', this.messageDispatcher)
        this.tlsSocket.on('error', this.errorDispatcher)
        this.tlsSocket.bind({ address: this.address, family: 1 }).catch(err => {
        })
    }

    connect(options: ConnectionOptions, connectionListener?: () => void) {
        this.connecting = true;
        this.options = options;
        this.parseOptions(options);
        connectionListener && this.on('connect', connectionListener)
        this.tlsSocket.connect(this.tlsConnectOptions).then(() => {
            this.connecting = false;
            this.connectDispatcher();
        }).catch(err => {
            this.connecting = false;
            if (err) {
                if (err.code == CONNECT_ERROR_CODE_TIMEOUT && this.timeoutCallback) {
                    this.timeoutCallback();
                }
            }
        })
    }

    private parseOptions(netConnectOpts: NetConnectOpts) {
        if (netConnectOpts) {
            this.tcpConnectOptions.address = { address: netConnectOpts.host, port: netConnectOpts.port, family: 1 }
            if (netConnectOpts.timeout != undefined) {
                this.tcpConnectOptions.timeout = netConnectOpts.timeout / 1000;
            }
        }
    }

    setNoDelay(noDelay: boolean) {
        this.tcpExtraOptions.TCPNoDelay = noDelay;
        if (this.tlsSocket) {
            this.tlsSocket.setExtraOptions(this.tcpExtraOptions);
        }
    }

    setKeepAlive(keepAlive: boolean, keepAliveDelay: number) {
        this.tcpExtraOptions.keepAlive = keepAlive
        if (this.tlsSocket) {
            this.tlsSocket.setExtraOptions(this.tcpExtraOptions);
        }
    }

    // useless, ohos TCPSocket must set timeout before connect
    setTimeout(timeout: number, callback?: () => void) {
        this.tcpExtraOptions.socketTimeout = timeout / 1000;
        this.timeoutCallback = callback
        if (this.tlsSocket) {
            this.tlsSocket.setExtraOptions(this.tcpExtraOptions);
        }
    }

    end() {
        this.tlsSocket?.getState().then((state) => {
            if (!state.isClose) {
                this.tlsSocket.close()
            }
        })
    }

    destroy() {
        this.tlsSocket = undefined;
    }

    _read(n) {
        if (this.connecting || !this.tlsSocket) {
            this.once('connect', () => this._read(n));
        } else {
        }
    }

    _write(data, encoding, cb) {
        if (typeof cb != 'function') {
            cb = nop;
        }
        if (this.connecting || !this.tlsSocket) {
            this.once('connect', () => this._write(data, encoding, cb));
        } else {
            this.tlsSocket.send({ data: Uint8Array.from(Array.from(data)).buffer, encoding }, (err) => {
                if (err) {
                    cb(err)
                } else {
                    cb()
                }
            });
        }
    }

    write(data, encoding, cb) {
        if (encoding == undefined) {
            encoding = 'buffer';
        }
        let result = this._write(data, encoding, cb);
        return result === true;
    }

    on(event: string, callback: (...any) => void) {
        switch (event) {
            case 'connect':
                if (!this.connectListeners.includes(callback)) {
                    this.connectListeners.push(callback)
                }
                break;
            case 'message':
                if (!this.messageListeners.includes(callback)) {
                    this.messageListeners.push(callback)
                }
                break;
            case 'error':
                if (!this.errorListeners.includes(callback)) {
                    this.errorListeners.push(callback)
                }
                break;
            default:
                super.on(event, callback);
                break;
        }
    }

    once(event: string, callback: (any) => void) {
        var listenerList: ((any) => void)[]
        switch (event) {
            case 'connect':
                listenerList = this.connectListeners
                break;
            case 'message':
                listenerList = this.messageListeners
                break;
            case 'error':
                listenerList = this.errorListeners
                break;
            default:
                super.once(event, callback);
                return;
        }
        if (listenerList) {
            let wrappedCallback = (err: any) => {
                callback(err)
                let index = listenerList.indexOf(wrappedCallback)
                if (index >= 0) {
                    listenerList.splice(index, 1)
                }
            }
            listenerList.push(wrappedCallback)
        }
    }

    private connectDispatcher = () => {
        if (!this.connecting) {
            this.connectListeners.forEach((callback) => {
                callback()
            })
        }
    }
    private messageDispatcher = (message: any) => {
        if (message?.message) {
            let data = Buffer.from(message.message)

            this.push(data, 'buffer');
        } else {

            this.push(null);
        }
        this.messageListeners.forEach((callback) => {
            callback(message)
        })
    }
    private errorDispatcher = (error: any) => {
        this.errorListeners.forEach((callback) => {
            callback(error)
        })
    }
}