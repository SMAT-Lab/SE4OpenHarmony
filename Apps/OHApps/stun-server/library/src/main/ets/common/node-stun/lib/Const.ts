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

export class Const {

  /**
   * Transport address dependency types.
   * <ul>
   * <li>stun.Type.I: "I" (Independent)</li>
   * <li>stun.Type.PD: "PD" (Port dependent)</li>
   * <li>stun.Type.AD: "AD" (Address dependent)</li>
   * <li>stun.Type.APD: "APD" (Address&Port Dependent)</li>
   * <li>stun.Type.UNDEF: "UNDEF" (Undefined)</li>
   * </ul>
   */
  static Type = Object.freeze({
    /**
     * Independent. Returns a constant string value of "I".
     */
    I: "I",
    /**
     * Port dependent. Returns a constant string value of "PD".
     */
    PD: "PD",
    /**
     * Address dependent. Returns a constant string value of "AD".
     */
    AD: "AD",
    /**
     * Address and port dependent. Returns a constant string value of "APD".
     */
    APD: "APD",
    /**
     * Type undefined/undetermined. Returns a constant string value of "UNDEF".
     */
    UNDEF: "UNDEF"
  });

  /**
   * Discovery mode.
   * <ul>
   * <li>stun.Mode.FULL: 0</li>
   * <li>stun.Mode.NB_ONLY: 1</li>
   * </ul>
   */
  static Mode = Object.freeze({
    /** Performs full NAT type discovery.*/
    FULL: 0,
    /** NAT binding discovery only. */
    NB_ONLY: 1
  });

  /**
   * Result code.
   * <ul>
   * <li>stun.Result.OK: 0</li>
   * <li>stun.Result.HOST_NOT_FOUND: -1</li>
   * <li>stun.Result.UDP_BLOCKED: -2</li>
   * <li>stun.Result.NB_INCOMPLETE: -3</li>
   * </ul>
   */
  static Result = Object.freeze({
    /** Successful. */
    OK: 0,
    /** Domain does not exit. (DNS name resolution failed.) */
    HOST_NOT_FOUND: -1,
    /** No reply from server. Server may be down. */
    UDP_BLOCKED: -2,
    /** Partial UDP blockage. NB type discovery was incomplete. */
    NB_INCOMPLETE: -3
  });
  static MesgTypes = Object.freeze({
    "breq": 0x0001,
    "bres": 0x0101,
    "berr": 0x0111, // Not supported
    "sreq": 0x0002, // Not supported
    "sres": 0x0102, // Not supported
    "serr": 0x0112 // Not supported
  });
  static AttrTypes = Object.freeze({
    // RFC 3489
    "mappedAddr": 0x0001,
    "respAddr": 0x0002, // Not supported
    "changeReq": 0x0003,
    "sourceAddr": 0x0004,
    "changedAddr": 0x0005, // Not supported
    "username": 0x0006, // Not supported
    "password": 0x0007, // Not supported
    "msgIntegrity": 0x0008, // Not supported
    "errorCode": 0x0009, // Not supported
    "unknownAttr": 0x000a, // Not supported
    "reflectedFrom": 0x000b, // Not supported
    // RFC 3489bis
    "xorMappedAddr": 0x0020, // Not supported
    // Proprietary.
    "timestamp": 0x0032 // <16:srv-delay><16:tx-timestamp>
  });
  static Families = Object.freeze({
    "ipv4": 0x01
  });
}

