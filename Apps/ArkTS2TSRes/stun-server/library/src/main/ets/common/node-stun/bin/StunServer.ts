let __generate__Id: number = 0;
function generateId(): string {
    return "StunServer_" + ++__generate__Id;
}
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
import { Index } from '../Index';
import { Logger } from '../lib/Logger';
import util from '@ohos.util';
import { Server } from '../lib/Server';
class Default {
    host: string = '';
    port: string = '';
}
class defaults {
    primary: Default | any;
    secondary: Default | any;
}
export interface OnServerMessageListener {
    onMessageChanged(serverMessage: string): void;
}
export class StunServer {
    private onServerMessageListener: OnServerMessageListener | undefined = undefined;
    public setServerMessageListener(onServerMessageListener: OnServerMessageListener): void {
        this.onServerMessageListener = onServerMessageListener;
    }
    constructor() {
        let self = this;
        // Set log event handler
        Logger.getInstance().emitterOn({ eventId: Logger.serverEventId }, (log: any) => {
            let serverMessage = util.printf('%s : [%s] %s', new Date(), log.data.level, log.data.message);
            console.log(serverMessage);
            if (self.onServerMessageListener) {
                self.onServerMessageListener.onMessageChanged(serverMessage);
            }
        });
    }
    createServer(newDefaults?: defaults) {
        // Load config (ini) file.
        let config: () => void = ((): any => {
            let defaults: defaults;
            if (newDefaults) {
                defaults = newDefaults;
            }
            else {
                defaults = {
                    primary: {
                        host: '127.0.0.1',
                        port: '3478'
                    },
                    secondary: {
                        host: '127.0.0.2',
                        port: '3479'
                    }
                };
            }
            return defaults;
        })();
        let index: Index = new Index();
        let server = index.createServer(config);
        server.listen();
    }
}
