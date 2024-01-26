## socket.io单元测试用例

该测试用例基于OpenHarmony系统下，采用[原库测试用例](https://gitee.com/hihopeorg/socketio/blob/master/entry/src/ohosTest/) 进行单元测试

### 单元测试用例覆盖情况

| 接口名                | 是否通过 |备注|
|--------------------|---|---|
| connect()     |pass|
| set_open_listener()             |pass|
| set_fail_listener()                |pass|
| set_reconnecting_listener()          |pass|
| set_reconnect_listener()          |pass|
| set_close_listener()      |pass|
| set_socket_open_listener()      |pass|
| set_socket_close_listener()      |pass|
| clear_con_listeners()      |pass|
| clear_socket_listeners()      |pass|
| set_reconnect_attempts()      |pass|
| set_reconnect_delay()      |pass|
| set_reconnect_delay_max()      |pass|
| close()      |pass|
| sync_close()      |pass|
| opened()      |pass|
| get_sessionid()      |pass|
| set_nsp()      |pass|
| on()      |pass|
| once()      |pass|
| off()      |pass|
| off_all()      |pass|
| socket_close()      |pass|
| on_error()      |pass|
| emit()      |pass|
| uint8ArrayToString()      |pass|
| stringToUint8Array()      |pass|