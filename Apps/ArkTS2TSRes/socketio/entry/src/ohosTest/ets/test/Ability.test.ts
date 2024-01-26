let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { client_socket, buffer_util } from '@ohos/socketio';
import hilog from '@ohos.hilog';
export default function abilityTest() {
    describe('client_socket_test', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('client_socket_test_connect_open', 0, () => {
            let connect_finish: boolean = false;
            let client: client_socket = new client_socket();
            client.set_open_listener(() => {
                connect_finish = true;
            });
            client.set_fail_listener(() => {
                connect_finish = false;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                expect(connect_finish).assertEqual(true);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_connect_open finished');
        });
        it('client_socket_test_connect_fail', 0, () => {
            let connect_finish: boolean = false;
            let client: client_socket = new client_socket();
            client.set_open_listener(() => {
                connect_finish = true;
            });
            client.set_fail_listener(() => {
                connect_finish = false;
            });
            let uri: string = "";
            client.connect(uri);
            setTimeout(() => {
                expect(connect_finish).assertEqual(false);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_connect_fail finished');
        });
        it('client_socket_test_login', 0, () => {
            let connect_finish: boolean = false;
            let login_finish: boolean = false;
            let client: client_socket = new client_socket();
            client.set_open_listener(() => {
                connect_finish = true;
            });
            client.on("login", () => {
                login_finish = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                expect(connect_finish).assertEqual(false);
                client.emit("add user", "username");
                setTimeout(() => {
                    expect(login_finish).assertEqual(true);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_login finished');
        });
        it('client_socket_test_emit', 0, () => {
            let connect_finish: boolean = false;
            let login_finish: boolean = false;
            let message: string = "";
            let client: client_socket = new client_socket();
            client.set_open_listener(() => {
                connect_finish = true;
            });
            client.on("login", () => {
                login_finish = true;
            });
            client.on("new message", (event_json: string) => {
                message = event_json;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                expect(connect_finish).assertEqual(false);
                client.emit("add user", "username");
                setTimeout(() => {
                    expect(login_finish).assertEqual(true);
                    client.emit("new message", "message");
                    expect(message != null).assertEqual(true);
                    setTimeout(() => {
                        expect(message != "").assertEqual(true);
                    }, 1000);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_emit finished');
        });
        it('client_socket_test_clear_listener', 0, () => {
            let is_call_open_listener: boolean = false;
            let client: client_socket = new client_socket();
            client.clear_con_listeners();
            client.set_open_listener(() => {
                is_call_open_listener = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                setTimeout(() => {
                    expect(is_call_open_listener).assertEqual(false);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_clear_listener finished');
        });
        it('client_socket_test_socket_open_close', 0, () => {
            let socket_status: boolean = false;
            let client: client_socket = new client_socket();
            client.set_socket_open_listener((nsp: string) => {
                socket_status = true;
            });
            client.set_socket_close_listener((nsp: string) => {
                socket_status = false;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                expect(socket_status).assertEqual(true);
                client.socket_close();
                setTimeout(() => {
                    expect(socket_status).assertEqual(false);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_socket_open_close finished');
        });
        it('client_socket_test_close', 0, () => {
            let connect_close: boolean = false;
            let client: client_socket = new client_socket();
            client.set_close_listener((reason: string) => {
                connect_close = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                client.close();
                setTimeout(() => {
                    expect(connect_close).assertEqual(true);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_close finished');
        });
        it('client_socket_test_sync_close', 0, () => {
            let connect_sync_close: boolean = false;
            let client: client_socket = new client_socket();
            client.set_close_listener((reason: string) => {
                connect_sync_close = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                client.sync_close();
                setTimeout(() => {
                    expect(connect_sync_close).assertEqual(true);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_sync_close finished');
        });
        it('client_socket_test_opened', 0, () => {
            let client: client_socket = new client_socket();
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                expect(client.opened()).assertEqual(true);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_opened finished');
        });
        it('client_socket_test_get_sessionid', 0, () => {
            let client: client_socket = new client_socket();
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                client.emit("add user", "username");
                setTimeout(() => {
                    expect(client.get_sessionid() != null && client.get_sessionid() != "").assertEqual(true);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_get_sessionid finished');
        });
        it('client_socket_test_off', 0, () => {
            let is_call_login_listener: boolean = false;
            let client: client_socket = new client_socket();
            client.on("login", () => {
                is_call_login_listener = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                client.off("add user");
                client.emit("add user", "username");
                setTimeout(() => {
                    expect(is_call_login_listener).assertEqual(false);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_off finished');
        });
        it('client_socket_test_off_all', 0, () => {
            let is_call_login_listener: boolean = false;
            let is_error: boolean = false;
            let client: client_socket = new client_socket();
            client.on("login", () => {
                is_call_login_listener = true;
            });
            client.on_error(() => {
                is_error = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                client.off_all();
                client.emit("add user", "username");
                setTimeout(() => {
                    expect(is_call_login_listener).assertEqual(false);
                    expect(is_error).assertEqual(true);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_off_all finished');
        });
        it('client_socket_test_reconnect_attempts', 0, () => {
            let reconnect_num: number = 0;
            let connect_fail: boolean = false;
            let client: client_socket = new client_socket();
            client.set_reconnect_delay(1000);
            client.set_reconnect_attempts(1);
            client.set_reconnect_listener(() => {
                reconnect_num++;
            });
            client.set_fail_listener(() => {
                connect_fail = true;
            });
            let uri: string = "";
            client.connect(uri);
            setTimeout(() => {
                expect(reconnect_num == 1 && connect_fail).assertEqual(true);
            }, 15000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_reconnect_attempts finished');
        });
        it('client_socket_test_reconnecting', 0, () => {
            let reconnect_num: number = 0;
            let reconnecting_num: number = 0;
            let client: client_socket = new client_socket();
            client.set_reconnect_delay(1000);
            client.set_reconnect_delay_max(1000);
            client.set_reconnect_listener(() => {
                reconnect_num++;
            });
            client.set_reconnecting_listener(() => {
                reconnecting_num++;
            });
            let uri: string = "";
            client.connect(uri);
            setTimeout(() => {
                expect(reconnect_num > 0 && reconnecting_num > 0).assertEqual(true);
            }, 15000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_reconnecting finished');
        });
        it('client_socket_test_clear_socket_listeners', 0, () => {
            let is_call_open_listener: boolean = false;
            let client: client_socket = new client_socket();
            client.clear_socket_listeners();
            client.set_socket_open_listener((nsp: string) => {
                is_call_open_listener = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                setTimeout(() => {
                    expect(is_call_open_listener).assertEqual(false);
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_clear_socket_listeners finished');
        });
        it('client_socket_test_nsp', 0, () => {
            let chat: string = '';
            let client: client_socket = new client_socket();
            client.set_nsp("chat");
            client.set_socket_open_listener((nsp: string) => {
                chat = nsp;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                setTimeout(() => {
                    expect(chat).not().assertEqual('');
                }, 1000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_nsp finished');
        });
        it('client_socket_test_once', 0, () => {
            let once: boolean = false;
            let client: client_socket = new client_socket();
            client.on("login", () => {
            });
            client.once("login", (event_json: string) => {
                once = true;
            });
            let uri: string = "http://10.50.40.37:3000";
            client.connect(uri);
            setTimeout(() => {
                client.emit("add user", "username");
                setTimeout(() => {
                    client.off("login");
                }, 1000);
                setTimeout(() => {
                    expect(once).assertEqual(false);
                }, 2000);
            }, 1000);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'client_socket_test_once finished');
        });
        it('test_buffer_util', 0, () => {
            let uArray = Uint8Array.from([1234]);
            let bufString = buffer_util.uint8ArrayToString(uArray);
            expect(bufString).not().assertEqual('');
            let buf = buffer_util.stringToUint8Array(bufString);
            expect(buf.length).not().assertEqual(0);
            hilog.info(0x0000, 'socketioTest', '%{public}s', 'test_buffer_util finished');
        });
    });
}
