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

export const connect: (uri: string) => void;
export const set_nsp: (set_nsp: string) => void;
export const set_open_listener: (open: any) => void;

export const set_fail_listener: (fail: any) => void;

export const set_reconnecting_listener: (reconnecting: any) => void;

export const set_reconnect_listener: (reconnect: any) => void;

export const set_close_listener: (closeListener: any) => void;

export const set_socket_open_listener: (socket_open_listener: any) => void;

export const set_socket_close_listener: (socket_close_listener: any) => void;

export const clear_con_listeners: () => void;

export const clear_socket_listeners: () => void;

export const set_reconnect_attempts: (reconnect_attempts: any) => void;

export const set_reconnect_delay: (reconnect_delay: any) => void;

export const set_reconnect_delay_max: (reconnect_delay_max: any) => void;

export const set_logs_default: () => void;


export const set_logs_quiet: () => void;
export const set_logs_verbose: () => void;

export const close: () => void;

export const sync_close: () => void;

export const set_proxy_basic_auth: (uri: string, username: string, password: string) => void;

export const opened: () => boolean;

export const get_sessionid: () => string;

export const on: (event_name: string, on_event_listener: (event_json: string) => void) => void;

export const once: (event_name: string, on_event_listener: (event_json: string) => void) => void;

export const off: (close: any) => void;

export const off_all: () => void;

export const socket_close: () => void;

export const off_error: () => void;
export const on_error: (on_error_listener: (message: string) => void) => void;

export const emit: (name: string, message: any, b: boolean, on_emit_callback: (emit_callback_json: string) => void) => void;