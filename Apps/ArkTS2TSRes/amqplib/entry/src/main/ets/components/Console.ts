interface Console_Params {
    model?: ConsoleN.Model;
    logInfos?: Array<ConsoleN.LogInfo>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Console_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import ConsoleN from './ConsoleN';
export class Console extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__logInfos = new ObservedPropertyObject([], this, "logInfos");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Console_Params) {
        if (params.logInfos !== undefined) {
            this.logInfos = params.logInfos;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__logInfos.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<ConsoleN.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ConsoleN.Model) {
        this.__model.set(newValue);
    }
    private __logInfos: ObservedPropertyObject<Array<ConsoleN.LogInfo>>;
    get logInfos() {
        return this.__logInfos.get();
    }
    set logInfos(newValue: Array<ConsoleN.LogInfo>) {
        this.__logInfos.set(newValue);
    }
    render() {
        Stack.create();
        Stack.width('100%');
        Stack.height('100%');
        Stack.padding(5);
        List.create();
        List.width('100%');
        List.height('100%');
        List.alignListItem(ListItemAlign.Start);
        List.backgroundColor(Color.White);
        List.borderRadius(10);
        List.shadow({ radius: 20 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.logInfos), (logInfo: any) => {
            ListItem.create();
            Text.create(logInfo.message);
            Text.fontColor(ConsoleN.parseLogColor(logInfo.level));
            Text.pop();
            ListItem.pop();
        }, (logInfo: any) => {
            return logInfo.id.toString();
        });
        ForEach.pop();
        List.pop();
        Stack.pop();
    }
    aboutToAppear() {
        this.model?.setOnLogAppendListener((message: string, level: ConsoleN.LOG_LEVEL) => {
            this.onLogAppend(message, level);
        });
    }
    onLogAppend(message: string, level: ConsoleN.LOG_LEVEL) {
        this.logInfos.push({ id: this.logInfos.length, message, level });
    }
}
