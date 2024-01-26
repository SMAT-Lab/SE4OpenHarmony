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

import process from '@ohos.process'
import socket from '@ohos.net.socket';
import { Const } from './Const';
import { Message } from './Message';
import { Logger } from './Logger';
import { Utils } from './Utils';
import { Md5 } from './Md5'

const State = Object.freeze({
  //                src   dst  chIp chPort  breq
  IDLE: 0, //  -----  ---- ---- ------ ------
  RESOLV: 1, //    -     -     -    -       -
  NBDaDp: 2, //  _soc0  DaDp   0    0    _breq0
  NBDaCp: 3, //  _soc0  DaCp   0    0    _breq0
  NBCaDp: 4, //  _soc0  CaDp   0    0    _breq0
  NBCaCp: 5, //  _soc0  CaCp   0    0    _breq0
  EFDiscov: 6, //  _soc0  DaDp   1    1    _breq0
  //  _soc0  DaDp   1    0    _breq1
  COMPLETE: 7
})

class Rtt {
  _sum: number = 0;
  _num: number = 0;

  init() {
    this._sum = 0;
    this._num = 0;
  };

  addSample(rtt) {
    this._sum += rtt;
    this._num++;
  };

  get(): number {
    return this._num ? (this._sum / this._num) : 0;
  };
}

export class Client {
  private _domain: string; // FQDN
  private _serv0: string; // Dotted decimal.
  private _serv1: string; // Dotted decimal.
  private _port0: number = 3478;
  private _port1: number; // Obtained via CHANGE-ADDRESS
  private _local = { addr: '0.0.0.0', port: 0 };
  private _soc0;
  private _soc1;
  private _breq0: Message; // Binding request 0 of type Message.
  private _breq1: Message; // Binding request 1 of type Message.
  private _state: number = State.IDLE;
  private _mapped = [
    { addr: 0, port: 0 }, // mapped addr from DaDp
    { addr: 0, port: 0 }, // mapped addr from DaCp
    { addr: 0, port: 0 }, // mapped addr from CaDp
    { addr: 0, port: 0 }]; // mapped addr from CaCp
  // pd ad
  //  0  0 : Independent
  //  0  1 : Address dependent
  //  1  0 : Port dependent (rare)
  //  1  1 : Address & port dependent
  // -1  * : pd check in progress
  //  * -1 : ad check in progress
  private _ef = { ad: undefined, pd: undefined };
  private _numSocs: number = 0;
  private _cbOnComplete: (result: number) => Function;
  private _cbOnClosed: () => Function;
  private _intervalId: number;
  private _retrans: number = 0; // num of retransmissions
  private _elapsed: number = 0; // *100 msec
  private _mode: number = Const.Mode.FULL;
  private _isNatted: boolean;
  private _rtt: Rtt = new Rtt();
  private _logger: Logger = Logger.getInstance();

  constructor(address: string) {
    this._local = { addr: address, port: 0 };
  }
  /**
   * @private
   * @static
   */
  private static _isLocalAddr(addr, cb) {
    let dummy = socket.constructUDPSocketInstance();
    dummy.bind({ address: addr }, err => {
      if (err) {
        return
      }
      dummy.close();
      cb(null, true);
    })
    dummy.on('error', err => {
      if (err) {
        return cb(err);
      }
      cb(null, false);
    });
  };

  _discover() {
    var self = this;
    // Create socket 0.
    this._soc0 = socket.constructUDPSocketInstance()
    this._soc0.on("listening", () => {
      self._onListening();
    });
    this._soc0.on("message", value => {
      // Get assigned port name for this socket.
      self._onReceived(value.message, value.remoteInfo);
    });
    this._soc0.on('error', err => {
      console.log("qcb on error, err:" + JSON.stringify(err))
    });
    this._soc0.on("close", () => {
      self._onClosed();
    });

    // Start listening on the local port.
    this._soc0.bind({ address: this._local.addr }, function () {
      // Get assigned port name for this socket.
      self._breq0 = new Message();
      self._breq0.init();
      self._breq0.setType('breq');
      self._breq0.setTransactionId(Client._randTransId())
      /*
      self._breq0.addAttribute('timestamp', {
          'respDelay': 0,
          'timestamp': (Date.now() & 0xffff)
      });
      */
      var msg = self._breq0.serialize()
      self._soc0.send({ data: msg, address: { address: self._serv0, port: self._port0 } });
      self._retrans = 0;
      self._elapsed = 0;
      self._intervalId = setInterval(function () {
        self._onTick();
      }, 100);
      self._state = State.NBDaDp;
    });
  };

  _onResolved(err, addresses) {
    if (err) {
      if (this._cbOnComplete != undefined) {
        this._cbOnComplete(Const.Result.HOST_NOT_FOUND);
      }
      return;
    }

    this._serv0 = addresses[0];
    this._discover();
  };

  _onListening() {
    this._numSocs++;
  };

  _onClosed() {
    if (this._numSocs > 0) {
      this._numSocs--;
      if (this._cbOnClosed != undefined && !this._numSocs) {
        this._cbOnClosed();
      }
    }
  };

  _onTick() {
    var sbuf: ArrayBuffer;

    // this._retrans this._elapsed
    //    0       1( 1)  == Math.min((1 << this._retrans), 16)
    //    1       2( 3)
    //    2       4( 7)
    //    3       8(15)
    //    4      16(31)
    //    5      16(47)
    //    6      16(63)
    //    7      16(79)
    //    8      16(95)

    this._elapsed++;

    if (this._elapsed >= Math.min((1 << this._retrans), 16)) {
      // Retransmission timeout.
      this._retrans++;
      this._elapsed = 0;

      if (this._state == State.NBDaDp ||
      this._state == State.NBDaCp ||
      this._state == State.NBCaDp ||
      this._state == State.NBCaCp) {
        if (this._retrans < 9) {
          /*
          this._breq0.addAttribute('timestamp', {
              'respDelay': 0,
              'timestamp': (Date.now() & 0xffff)
          });
          */
          sbuf = this._breq0.serialize();
          var toAddr;
          var toPort;

          switch (this._state) {
            case State.NBDaDp:
              toAddr = this._serv0;
              toPort = this._port0;
              break;
            case State.NBDaCp:
              toAddr = this._serv0;
              toPort = this._port1;
              break;
            case State.NBCaDp:
              toAddr = this._serv1;
              toPort = this._port0;
              break;
            case State.NBCaCp:
              toAddr = this._serv1;
              toPort = this._port1;
              break;
          }

          this._soc0.send({ data: sbuf, address: { port: toPort, address: toAddr } });
          this._logger.info(Logger.clientEventId,
            "NB-Rtx0: len=" + sbuf.byteLength +
            " retrans=" + this._retrans +
            " elapsed=" + this._elapsed +
            " to=" + toAddr +
            ":" + toPort);
        }
        else {
          clearInterval(this._intervalId);
          var firstNB = (this._state == State.NBDaDp);
          this._state = State.COMPLETE;

          if (this._cbOnComplete != undefined) {
            if (firstNB) {
              this._cbOnComplete(Const.Result.UDP_BLOCKED);
            }
            else {
              // First binding succeeded, then subsequent
              // binding should work, but didn't.
              this._cbOnComplete(Const.Result.NB_INCOMPLETE);
            }
          }
        }
      }
      else if (this._state == State.EFDiscov) {
        if (this._ef.ad == undefined) {
          if (this._retrans < 9) {
            sbuf = this._breq0.serialize();
            this._soc1.send({ data: sbuf, address: { port: this._port0, address: this._serv0 } });
            this._logger.info(Logger.clientEventId, "EF-Rtx0: retrans=" + this._retrans + " elapsed=" + this._elapsed);
          }
          else {
            this._ef.ad = 1;
          }
        }
        if (this._ef.pd == undefined) {
          if (this._retrans < 9) {
            sbuf = this._breq1.serialize();
            this._soc1.send({ data: sbuf, address: { port: this._port0, address: this._serv0 } });
            this._logger.info(Logger.clientEventId, "EF-Rtx1: retrans=" + this._retrans + " elapsed=" + this._elapsed);
          }
          else {
            this._ef.pd = 1;
          }
        }
        if (this._ef.ad != undefined && this._ef.pd != undefined) {
          clearInterval(this._intervalId);
          this._state = State.COMPLETE;
          if (this._cbOnComplete != undefined) {
            this._cbOnComplete(Const.Result.OK);
          }
        }
      }
      else {
        this._logger.info(Logger.clientEventId, "Warning: unexpected timer event. Forgot to clear timer?");
        clearInterval(this._intervalId);
      }
    }
  };

  _onReceived(msg: ArrayBuffer, remoteInfo) {
    var self = this;
    var bres = new Message();
    var val
    var now: number = Date.now()
    var sbuf: ArrayBuffer
    void remoteInfo

    try {
      bres.deserialize(msg)
    } catch (e) {
      console.log("Error: " + e.message)
      return
    }
    // We are only interested in binding response.
    if (bres.getType() != 'bres') {
      return;
    }

    if (this._state == State.NBDaDp) {
      if (!Utils.bufferCompare(bres.getTransactionId(), this._breq0.getTransactionId())) {
        return; // discard
      }
      clearInterval(this._intervalId);

      // Get MAPPED-ADDRESS value.
      val = bres.getAttribute('mappedAddr');
      if (val == undefined) {
        this._logger.error(Logger.clientEventId, "Error: MAPPED-ADDRESS not present");
        return;
      }
      this._mapped[0].addr = val.addr;
      this._mapped[0].port = val.port;

      // Check if the mapped address is a local or not (natted)
      if (this._local.addr !== '') {
        Client._isLocalAddr(this._mapped[0].addr, function (err, isLocal) {
          if (!err) {
            self._isNatted = !isLocal;
          }
        });
      } else {
        this._isNatted = true;
      }

      // Get CHANGED-ADDRESS value.
      val = bres.getAttribute('changedAddr');
      if (val == undefined) {
        this._logger.error(Logger.clientEventId, "Error: CHANGED-ADDRESS not present");
        return;
      }
      this._logger.info(Logger.clientEventId, 'CHANGED: addr=' + val.addr + ':' + val.port);
      this._serv1 = val.addr;
      this._port1 = val.port;

      // Calculate RTT if timestamp is attached.
      val = bres.getAttribute('timestamp');
      if (val != undefined) {
        this._rtt.addSample(((now & 0xffff) - val.timestamp) - val.respDelay);
      }

      this._logger.info(Logger.clientEventId, "MAPPED0: addr=" + this._mapped[0].addr + ":" + this._mapped[0].port);
      //this._logger.info(Logger.clientEventId, "CHANGED: addr=" + this._serv1 + ":" + this._port1);

      // Start NBDaCp.
      this._breq0.init();
      this._breq0.setType('breq');
      this._breq0.setTransactionId(Client._randTransId());
      /*
      this._breq0.addAttribute('timestamp', {
          'respDelay': 0,
          'timestamp': (now & 0xffff)
      });
      */
      sbuf = this._breq0.serialize();
      this._soc0.send({ data: sbuf, address: { port: this._port1, address: this._serv0 } });

      this._retrans = 0;
      this._elapsed = 0;
      this._intervalId = setInterval(function () {
        self._onTick();
      }, 100);
      this._state = State.NBDaCp;
    }
    else if (this._state == State.NBDaCp) {
      if (!Utils.bufferCompare(bres.getTransactionId(), this._breq0.getTransactionId())) {
        return; // discard
      }
      clearInterval(this._intervalId);

      // Get MAPPED-ADDRESS value.
      val = bres.getAttribute('mappedAddr');
      if (val == undefined) {
        this._logger.error(Logger.clientEventId, "Error: MAPPED-ADDRESS not present");
        return;
      }
      this._mapped[1].addr = val.addr;
      this._mapped[1].port = val.port;

      // Calculate RTT if timestamp is attached.
      val = bres.getAttribute('timestamp');
      if (val != undefined) {
        this._rtt.addSample(((now & 0xffff) - val.timestamp) - val.respDelay);
      }

      this._logger.info(Logger.clientEventId, "MAPPED1: addr=" + this._mapped[1].addr + ":" + this._mapped[1].port);

      // Start NBCaDp.
      this._breq0.init();
      this._breq0.setType('breq');
      this._breq0.setTransactionId(Client._randTransId());
      /*
      this._breq0.addAttribute('timestamp', {
          'respDelay': 0,
          'timestamp': (now & 0xffff)
      });
      */
      sbuf = this._breq0.serialize();
      this._soc0.send({ data: sbuf, address: { port: this._port0, address: this._serv1 } });

      this._retrans = 0;
      this._elapsed = 0;
      this._intervalId = setInterval(function () {
        self._onTick();
      }, 100);
      this._state = State.NBCaDp;
    }
    else if (this._state == State.NBCaDp) {
      if (!Utils.bufferCompare(bres.getTransactionId(), this._breq0.getTransactionId())) {
        return; // discard
      }
      clearInterval(this._intervalId);

      // Get MAPPED-ADDRESS value.
      val = bres.getAttribute('mappedAddr');
      if (val == undefined) {
        this._logger.error(Logger.clientEventId, "Error: MAPPED-ADDRESS not present");
        return;
      }
      this._mapped[2].addr = val.addr;
      this._mapped[2].port = val.port;

      // Calculate RTT if timestamp is attached.
      val = bres.getAttribute('timestamp');
      if (val != undefined) {
        this._rtt.addSample(((now & 0xffff) - val.timestamp) - val.respDelay);
      }

      this._logger.info(Logger.clientEventId, "MAPPED2: addr=" + this._mapped[2].addr + ":" + this._mapped[2].port);

      // Start NBCaCp.
      this._breq0.init();
      this._breq0.setType('breq');
      this._breq0.setTransactionId(Client._randTransId());
      /*
      this._breq0.addAttribute('timestamp', {
          'respDelay': 0,
          'timestamp': (now & 0xffff)
      });
      */
      sbuf = this._breq0.serialize();
      this._soc0.send({ data: sbuf, address: { port: this._port1, address: this._serv1 } });

      this._retrans = 0;
      this._elapsed = 0;
      this._intervalId = setInterval(function () {
        self._onTick();
      }, 100);
      this._state = State.NBCaCp;
    }
    else if (this._state == State.NBCaCp) {
      if (!Utils.bufferCompare(bres.getTransactionId(), this._breq0.getTransactionId())) {
        return; // discard
      }
      clearInterval(this._intervalId);

      // Get MAPPED-ADDRESS value.
      val = bres.getAttribute('mappedAddr');
      if (val == undefined) {
        this._logger.error(Logger.clientEventId, "Error: MAPPED-ADDRESS not present");
        return;
      }
      this._mapped[3].addr = val.addr;
      this._mapped[3].port = val.port;

      // Calculate RTT if timestamp is attached.
      val = bres.getAttribute('timestamp');
      if (val != undefined) {
        this._rtt.addSample(((now & 0xffff) - val.timestamp) - val.respDelay);
      }

      this._logger.info(Logger.clientEventId, "MAPPED3: addr=" + this._mapped[3].addr + ":" + this._mapped[3].port);

      // Start NBDiscov.
      this._ef.ad = undefined;
      this._ef.pd = undefined;

      // Create another socket (this._soc1) from which EFDiscov is performed).
      this._soc1 = socket.constructUDPSocketInstance()
      this._soc1.on("listening", () => {
        self._onListening();
      });
      this._soc1.on("message", value => {
        self._onReceived(value.message, value.remoteInfo);
      });
      this._soc1.on("close", () => {
        self._onClosed();
      });

      // Start listening on the local port.
      this._soc1.bind({ address: this._local.addr });

      // changeIp=true,changePort=true from this._soc1
      this._breq0.init();
      this._breq0.setType('breq');
      this._breq0.setTransactionId(Client._randTransId());
      this._breq0.addAttribute('changeReq', {
        'changeIp': true,
        'changePort': true
      });

      sbuf = this._breq0.serialize();
      this._soc1.send({ data: sbuf, address: { port: this._port0, address: this._serv0 } });

      // changeIp=false,changePort=true from this._soc1
      this._breq1 = new Message();
      this._breq1.setType('breq');
      this._breq1.setTransactionId(Client._randTransId());
      this._breq1.addAttribute('changeReq', {
        'changeIp': false,
        'changePort': true
      });

      sbuf = this._breq1.serialize();
      this._soc1.send({ data: sbuf, address: { port: this._port0, address: this._serv0 } });

      this._retrans = 0;
      this._elapsed = 0;
      this._intervalId = setInterval(function () {
        self._onTick();
      }, 100);
      this._state = State.EFDiscov;
    }
    else if (this._state == State.EFDiscov) {
      var res = -1;
      if (this._ef.ad == undefined) {
        if (Utils.bufferCompare(bres.getTransactionId(), this._breq0.getTransactionId())) {
          res = 0;
        }
      }
      if (res < 0 && this._ef.pd == undefined) {
        if (Utils.bufferCompare(bres.getTransactionId(), this._breq1.getTransactionId())) {
          res = 1;
        }
      }

      if (res < 0) {
        return; // discard
      }

      if (res == 0) {
        this._ef.ad = 0;
      } else {
        this._ef.pd = 0;
      }

      if (this._ef.ad !== undefined && this._ef.pd !== undefined) {
        clearInterval(this._intervalId);
        this._state = State.COMPLETE;
        if (this._cbOnComplete) {
          this._cbOnComplete(Const.Result.OK);
        }
      }
    }
    else {
      return; // discard
    }
  };

  private static _randTransId(): Uint8Array {
    var seed = process.pid.toString(16)
    seed += Math.round(Math.random() * 0x100000000).toString(16)
    seed += (new Date()).getTime().toString(16)
    return new Uint8Array(Md5.hashStr(seed, true).buffer)
  }

  /**
   * Sets local address. Use of this method is optional. If your
   * local device has more then one interfaces, you can specify
   * one of these interfaces form which STUN is performed.
   * @param {string} addr Local IP address.
   * @throws {Error} The address not available.
   */
  setLocalAddr(addr: string) {
    this._local.addr = addr;
    this._local.port = 0;
  };

  /**
   * Sets STUN server address.
   * @param {string} addr Domain name of the STUN server. Dotted
   * decimal IP address can be used.
   * @param {number} port Port number of the STUN server. If not
   * defined, default port number 3478 will be used.
   */
  setServerAddress(host: string, port: number) {
    var d = host.split('.');
    if (d.length != 4 || (
      isNaN(parseInt(d[0])) ||
      isNaN(parseInt(d[1])) ||
      isNaN(parseInt(d[2])) ||
      isNaN(parseInt(d[3])))) {
      this._domain = host;
      this._serv0 = undefined;
    } else {
      this._domain = undefined;
      this._serv0 = host;
    }

    if (port != undefined) {
      this._port0 = port;
    }
  };

  /**
   * Starts NAT discovery.
   * @param {object} [option]. Options.
   * @param {boolean} [option.bindingOnly] Perform NAT binding only. Otherwise
   * perform full NAT discovery process.
   * @param {function} cb Callback made when NAT discovery is complete.
   * The callback function takes an argument, a result code of type {number}
   * defined as stun.Result.
   * @see stun.Result
   * @throws {Error} STUN is already in progress.
   * @throws {Error} STUN server address is not defined yet.
   */
  start(option, cb) {
    if (typeof option !== 'object') {
      cb = option;
      option = {};
    }

    // Sanity check
    if (this._state !== State.IDLE)
    throw new Error("Not allowed in state " + this._state);
    if (!this._domain && !this._serv0)
    throw new Error("Address undefined");

    this._cbOnComplete = cb;
    this._mode = (option && option.bindingOnly) ? Const.Mode.NB_ONLY : Const.Mode.FULL;

    // Initialize.
    this._rtt.init();

    if (this._serv0) {
      this._discover();
    }
  };

  /**
   * Closes STUN client.
   * @param {function} callback Callback made when UDP sockets in use
   * are all closed.
   */
  close(callback) {
    this._cbOnClosed = callback;
    if (this._soc0) {
      this._soc0.close();
    }
    if (this._soc1) {
      this._soc1.close();
    }
  };

  /**
   * Tells whether we are behind a NAT or not.
   * @type boolean
   */
  isNatted() {
    return this._isNatted;
  };

  /**
   * Gets NAT binding type.
   * @type string
   * @see stun.Type
   */
  getNB() {
    if (!this.isNatted()) {
      return Const.Type.I;
    }

    if (this._mapped[1].addr && this._mapped[2].addr && this._mapped[3].addr) {
      if (this._mapped[0].port == this._mapped[2].port) {
        if (this._mapped[0].port == this._mapped[1].port) {
          return Const.Type.I;
        }
        return Const.Type.PD;
      }

      if (this._mapped[0].port == this._mapped[1].port) {
        return Const.Type.AD;
      }
      return Const.Type.APD;
    }

    return Const.Type.UNDEF;
  };

  /**
   * Gets endpoint filter type.
   * @type string
   * @see stun.Type
   */
  getEF() {
    if (this.isNatted() == undefined) {
      return Const.Type.UNDEF;
    }

    if (!this.isNatted()) {
      return Const.Type.I;
    }

    if (this._ef.ad == undefined) {
      return Const.Type.UNDEF;
    }

    if (this._ef.pd == undefined) {
      return Const.Type.UNDEF;
    }

    if (this._ef.ad == 0) {
      if (this._ef.pd == 0) {
        return Const.Type.I;
      }
      return Const.Type.PD;
    }

    if (this._ef.pd == 0) {
      return Const.Type.AD;
    }
    return Const.Type.APD;
  };

  /**
   * Gets name of NAT type.
   * @type string
   */
  getNatType() {
    var natted = this.isNatted();
    var nb = this.getNB();
    var ef = this.getEF();

    if (natted == undefined) return "UDP blocked";
    if (!natted) return "Open to internet";
    if (nb == Const.Type.UNDEF || ef == Const.Type.UNDEF)
    return "Natted (details not available)";

    if (nb == Const.Type.I) {
      // Cone.
      if (ef == Const.Type.I) return "Full cone";
      if (ef == Const.Type.PD) return "Port-only-restricted cone";
      if (ef == Const.Type.AD) return "Address-restricted cone";
      return "Port-restricted cone";
    }

    return "Symmetric";
  };

  /**
   * Gets mapped address (IP address & port) returned by STUN server.
   * @type object
   */
  getMappedAddr() {
    return { address: this._mapped[0].addr, port: this._mapped[0].port };
  };

  /**
   * Gets RTT (Round-Trip Time) in milliseconds measured during
   * NAT binding discovery.
   * @type number
   */
  getRtt(): number {
    return this._rtt.get();
  };
}

