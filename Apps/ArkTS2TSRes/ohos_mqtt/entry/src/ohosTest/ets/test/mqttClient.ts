let __generate__Id: number = 0;
function generateId(): string {
    return "mqttClient_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the  Eclipse Public License -v 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.eclipse.org/legal/epl-2.0/
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { MqttConnectOptions, MqttSubscribeOptions, MqttPublishOptions, MqttResponse, MqttMessage, MqttClient, } from '@ohos/mqtt';
export function mqttConnect(mqttAsyncClient: MqttClient, options: MqttConnectOptions): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (mqttAsyncClient) {
            mqttAsyncClient.connect(options, (err, data) => {
                if (!err) {
                    resolve(data.message);
                }
                else {
                    reject(err.message);
                }
            });
        }
        else {
            reject("mqttAsyncClient not create");
        }
    });
}
export function mqttSubscribe(mqttAsyncClient: MqttClient, options: MqttSubscribeOptions): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (mqttAsyncClient) {
            mqttAsyncClient.subscribe(options, (err, data) => {
                if (!err) {
                    resolve(data.message);
                }
                else {
                    reject(err.message);
                }
            });
        }
        else {
            reject("mqttAsyncClient not create");
        }
    });
}
export function mqttPublish(mqttAsyncClient: MqttClient, options: MqttPublishOptions): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (mqttAsyncClient) {
            mqttAsyncClient.publish(options, (err, data) => {
                if (!err) {
                    resolve(data.message);
                }
                else {
                    reject(err);
                }
            });
        }
        else {
            reject("mqttAsyncClient not create");
        }
    });
}
export function mqttUnSubscribe(mqttAsyncClient: MqttClient, options: MqttSubscribeOptions): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (mqttAsyncClient) {
            mqttAsyncClient.unsubscribe(options, (err, data) => {
                if (!err) {
                    resolve(data.message);
                }
                else {
                    reject(err);
                }
            });
        }
        else {
            reject("mqttAsyncClient not create");
        }
    });
}
export function mqttDisConnect(mqttAsyncClient: MqttClient): Promise<string> {
    return new Promise(async (resolve, reject) => {
        if (mqttAsyncClient) {
            mqttAsyncClient.disconnect((err, data) => {
                if (!err) {
                    resolve(data.message);
                }
                else {
                    reject(err);
                }
            });
        }
        else {
            reject("mqttAsyncClient not create");
        }
    });
}
