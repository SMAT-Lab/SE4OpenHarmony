/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Message } from './Message';
import { Logger } from './Logger';
import { Utils } from './Utils';
/**
 * Server class.
 * @class
 * @param {object} config Config object.
 * @param {object} config.primary Primary address
 * @param {string} config.primary.host Primary host name
 * @param {string|number} config.primary.port Primary port number
 * @param {object} config.secondary Secondary address
 * @param {string} config.secondary.host Secondary host name
 * @param {string|number} config.secondary.port Secondary port number
 */
export class Server {
    private _addr0: string;
    private _addr1: string;
    private _port0: number;
    private _port1: number;
    private _sockets = [];
    private _stats = {
        numRcvd: 0,
        numSent: 0,
        numMalformed: 0,
        numUnsupported: 0
    };
    private _logger: Logger;
    constructor(config) {
        this._addr0 = config.primary.host;
        this._addr1 = config.secondary.host;
        this._port0 = parseInt(config.primary.port);
        this._port1 = parseInt(config.secondary.port);
        this._logger = Logger.getInstance();
    }
    /** @private */
    _onListening(sid, address, port) {
        this._logger.info(Logger.serverEventId, "soc[" + sid + "] listening on " + address + ":" + port);
    }
    ;
    _onReceived(sid, msg, rinfo) {
        this._logger.debug(Logger.serverEventId, "soc[" + sid + "] received from " + rinfo.address + ":" + rinfo.port);
        var stunmsg = new Message();
        var fid = sid;
        this._stats.numRcvd++;
        try {
            stunmsg.deserialize(msg);
        }
        catch (e) {
            this._stats.numMalformed++;
            this._logger.warn(Logger.serverEventId, "Error: " + e.message);
            return;
        }
        // We are only interested in binding request.
        if (stunmsg.getType() != 'breq') {
            this._stats.numUnsupported++;
            return;
        }
        var val;
        // Modify source socket ID (fid) based on
        // CHANGE-REQUEST attribute.
        val = stunmsg.getAttribute('changeReq');
        if (val != undefined) {
            if (val.changeIp) {
                fid ^= 0x2;
            }
            if (val.changePort) {
                fid ^= 0x1;
            }
        }
        // Check if it has timestamp attribute.
        var txTs;
        var rcvdAt = Date.now();
        val = stunmsg.getAttribute('timestamp');
        if (val != undefined) {
            txTs = val.timestamp;
        }
        //this._logger.debug("sid=" + sid + " fid=" + fid);
        try {
            // Initialize the message object to reuse.
            // The init() does not reset transaction ID.
            stunmsg.init();
            stunmsg.setType('bres');
            // Add mapped address.
            stunmsg.addAttribute('mappedAddr', {
                'family': 'ipv4',
                'port': rinfo.port,
                'addr': rinfo.address
            });
            // Offer CHANGED-ADDRESS only when this._addr1 is defined.
            if (this._addr1 != undefined) {
                var chAddr = (sid & 0x2) ? this._addr0 : this._addr1;
                var chPort = (sid & 0x1) ? this._port0 : this._port1;
                stunmsg.addAttribute('changedAddr', {
                    'family': 'ipv4',
                    'port': chPort,
                    'addr': chAddr
                });
            }
            var soc = this._sockets[fid];
            // Add source address.
            stunmsg.addAttribute('sourceAddr', {
                'family': 'ipv4',
                'port': rinfo.port,
                'addr': rinfo.address
            });
            // Add timestamp if existed in the request.
            if (txTs) {
                stunmsg.addAttribute('timestamp', {
                    'respDelay': ((Date.now() - rcvdAt) & 0xffff),
                    'timestamp': txTs
                });
            }
            var resp = stunmsg.serialize();
            if (!soc) {
                throw new Error("Invalid from ID: " + fid);
            }
            this._logger.debug(Logger.serverEventId, 'soc[' + fid + '] sending ' + resp.byteLength + ' bytes to ' + rinfo.address + ':' + rinfo.port);
            soc.send({ data: resp, address: { port: rinfo.port, address: rinfo.address } });
        }
        catch (e) {
            this._stats.numMalformed++;
            this._logger.debug(Logger.serverEventId, "Error: " + e.message);
        }
        this._stats.numSent++;
    }
    ;
    _getPort(sid) {
        return (sid & 1) ? this._port1 : this._port0;
    }
    ;
    _getAddr(sid) {
        return (sid & 2) ? this._addr1 : this._addr0;
    }
    ;
    /**
     * Starts listening to STUN requests from clients.
     * @throws {Error} Server address undefined.
     */
    listen() {
        var self = this;
        // Sanity check
        if (!this._addr0) {
            throw new Error("Address undefined");
        }
        if (!this._addr1) {
            throw new Error("Address undefined");
        }
        for (var i = 0; i < 4; ++i) {
            // Create socket and add it to socket array.
            var soc = socket.constructUDPSocketInstance();
            this._sockets.push(soc);
            switch (i) {
                case 0:
                    soc.on("listening", () => {
                        self._onListening(0, self._getAddr(0), self._getPort(0));
                    });
                    soc.on("message", value => {
                        self._onReceived(0, value.message, value.remoteInfo);
                    });
                    break;
                case 1:
                    soc.on("listening", () => {
                        self._onListening(1, self._getAddr(1), self._getPort(1));
                    });
                    soc.on("message", value => {
                        self._onReceived(1, value.message, value.remoteInfo);
                    });
                    break;
                case 2:
                    soc.on("listening", () => {
                        self._onListening(2, self._getAddr(2), self._getPort(2));
                    });
                    soc.on("message", value => {
                        self._onReceived(2, value.message, value.remoteInfo);
                    });
                    break;
                case 3:
                    soc.on("listening", () => {
                        self._onListening(3, self._getAddr(3), self._getPort(3));
                    });
                    soc.on("message", value => {
                        self._onReceived(3, value.message, value.remoteInfo);
                    });
                    break;
                default:
                    throw new RangeError("Out of socket array");
                    break;
            }
            // Start listening.
            soc.bind({ address: self._getAddr(i), port: self._getPort(i) });
        }
    }
    ;
    /**
     * Closes the STUN server.
     */
    close() {
        while (this._sockets.length > 0) {
            var soc = this._sockets.shift();
            var sin = soc.address();
            this._logger.info(Logger.serverEventId, "Closing socket on " + sin.address + ":" + sin.port);
            soc.close();
        }
    }
    ;
}
