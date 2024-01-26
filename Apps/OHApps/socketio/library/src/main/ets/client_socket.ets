/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

import client_socket_c from 'libclient_socket_c.so';
import { buffer_util } from './buffer_util'

export class client_socket {
  constructor() {
  }

  //client相关接口

  public set_open_listener(on_open: () => void) {
    client_socket_c.set_open_listener(on_open);
  }

  public set_fail_listener(on_fail: () => void) {
    client_socket_c.set_fail_listener(on_fail);
  }

  public set_reconnecting_listener(on_reconnecting: () => void) {
    client_socket_c.set_reconnecting_listener(on_reconnecting);
  }

  public set_reconnect_listener(on_reconnect: () => void) {
    client_socket_c.set_reconnect_listener(on_reconnect);
  }

  public set_close_listener(on_close: (reason: string) => void) {
    client_socket_c.set_close_listener(on_close);
  }

  public set_socket_open_listener(on_socket_open: (nsp: string) => void) {
    client_socket_c.set_socket_open_listener(on_socket_open);
  }

  public set_socket_close_listener(on_socket_close: (nsp: string) => void) {
    client_socket_c.set_socket_close_listener(on_socket_close);
  }

  public connect(uri: string) {
    client_socket_c.connect(uri);
  }

  public clear_con_listeners() {
    client_socket_c.clear_con_listeners();
  }

  public clear_socket_listeners() {
    client_socket_c.clear_socket_listeners();
  }

  public set_reconnect_attempts(attempts: number) {
    client_socket_c.set_reconnect_attempts(attempts);
  }

  public set_reconnect_delay(millis: number) {
    client_socket_c.set_reconnect_delay(millis);
  }

  public set_reconnect_delay_max(millis: number) {
    client_socket_c.set_reconnect_delay_max(millis);
  }

  public set_logs_default() {
    client_socket_c.set_logs_default();
  }

  public set_logs_quiet() {
    client_socket_c.set_logs_quiet();
  }

  public set_logs_verbose() {
    client_socket_c.set_logs_verbose();
  }

  public close() {
    client_socket_c.close();
  }

  public sync_close() {
    client_socket_c.sync_close();
  }

  public set_proxy_basic_auth(uri: string, username: string, password: string) {
    client_socket_c.set_proxy_basic_auth(uri, username, password);
  }

  public opened(): boolean {
    return client_socket_c.opened();
  }

  public get_sessionid(): string {
    return client_socket_c.get_sessionid();
  }

  //socket相关接口

  public set_nsp(nsp: string) {
    client_socket_c.set_nsp(nsp);
  }

  public on(event_name: string, on_event_listener: (event_json: string) => void) {
    client_socket_c.on(event_name, on_event_listener);
  }

  public once(event_name: string, on_event_listener: (event_json: string) => void) {
    client_socket_c.once(event_name, on_event_listener);
  }

  public off(event_name: string) {
    client_socket_c.off(event_name);
  }

  public off_all() {
    client_socket_c.off_all();
  }

  public socket_close() {
    client_socket_c.socket_close();
  }

  public on_error(on_error_listener: (message: string) => void) {
    client_socket_c.on_error(on_error_listener);
  }

  public off_error() {
    client_socket_c.off_error();
  }

  public emit(name: string, message: ESObject, on_emit_callback?: (emit_callback_json: string) => void) {
    if (message instanceof Uint8Array) {
      client_socket_c.emit(name, buffer_util.uint8ArrayToString(message), true, on_emit_callback);
    } else {
      client_socket_c.emit(name, message, false, on_emit_callback);
    }
  }
}

