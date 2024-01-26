interface LRUCache_Params {
    resultText?: string;
    actionSheets?: Array<string>;
    isGet?: boolean;
    action?;
    actionDialogController?: CustomDialogController;
    doOperation?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LRUCache_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { ActionSheetDialog } from './lrucache/ActionSheetDialog';
import { GridOperation } from '../GridOperation';
import { clear, getCapacity, getAllKeyValues, getCacheString, initLRUCache, lruBuffer, operationLog, putKeyValue, updateCapacity } from '../../util/LRUCacheUtil';
export class LRUCache extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__resultText = new ObservedPropertySimple('', this, "resultText");
        this.__actionSheets = new ObservedPropertyObject([], this, "actionSheets");
        this.isGet = true;
        this.action = (key: string) => {
            if (this.isGet) {
                if (lruBuffer.contains(key)) {
                    let value: string = lruBuffer.get(key) as string;
                    this.resultText = `key = ${key},  value=${value}`;
                }
                else {
                    this.resultText = `the key:${key} is not found`;
                }
            }
            else {
                lruBuffer.remove(key);
                this.resultText = `key:${key} is removed\n`;
            }
        };
        this.actionDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new ActionSheetDialog("3", this, {
                    title: 'Click the key',
                    sheets: this.actionSheets,
                    action: this.action
                });
                jsDialog.setController(this.actionDialogController);
                View.create(jsDialog);
            },
            autoCancel: true
        }, this);
        this.doOperation = (index: number) => {
            if (index !== 0 && lruBuffer === null) {
                this.resultText = 'Click the first button and then operate';
                return;
            }
            switch (index) {
                case 0:
                    this.resultText = initLRUCache();
                    break;
                case 1:
                    this.resultText = getCapacity();
                    break;
                case 2:
                    this.resultText = updateCapacity();
                    break;
                case 3:
                    this.resultText = getCacheString();
                    break;
                case 4:
                    this.resultText = putKeyValue();
                    break;
                case 5:
                    this.isGet = true;
                    this.actionSheets = lruBuffer.keys() as string[];
                    this.actionDialogController.open();
                    break;
                case 6:
                    this.resultText = getAllKeyValues();
                    break;
                case 7:
                    this.isGet = false;
                    this.actionSheets = lruBuffer.keys() as string[];
                    this.actionDialogController.open();
                    break;
                case 8:
                    this.resultText = clear();
                    break;
                case 9:
                    this.resultText = operationLog();
                default:
                    break;
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LRUCache_Params) {
        if (params.resultText !== undefined) {
            this.resultText = params.resultText;
        }
        if (params.actionSheets !== undefined) {
            this.actionSheets = params.actionSheets;
        }
        if (params.isGet !== undefined) {
            this.isGet = params.isGet;
        }
        if (params.action !== undefined) {
            this.action = params.action;
        }
        if (params.actionDialogController !== undefined) {
            this.actionDialogController = params.actionDialogController;
        }
        if (params.doOperation !== undefined) {
            this.doOperation = params.doOperation;
        }
    }
    aboutToBeDeleted() {
        this.__resultText.aboutToBeDeleted();
        this.__actionSheets.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __resultText: ObservedPropertySimple<string>;
    get resultText() {
        return this.__resultText.get();
    }
    set resultText(newValue: string) {
        this.__resultText.set(newValue);
    }
    private __actionSheets: ObservedPropertyObject<Array<string>>;
    get actionSheets() {
        return this.__actionSheets.get();
    }
    set actionSheets(newValue: Array<string>) {
        this.__actionSheets.set(newValue);
    }
    private isGet: boolean;
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create();
        Column.width('100%');
        Column.padding(16);
        Scroll.create();
        Scroll.width('90%');
        Scroll.height(240);
        Scroll.margin({ top: 10 });
        Scroll.border({ width: 1, color: Color.Gray, radius: 15 });
        Scroll.scrollBar(BarState.Off);
        Scroll.padding(15);
        Text.create(this.resultText);
        Text.width('100%');
        Text.fontSize(16);
        Text.pop();
        Scroll.pop();
        let earlierCreatedChild_2: GridOperation = (this && this.findChildById) ? this.findChildById("2") as GridOperation : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new GridOperation("2", this, { operationRes: $r('app.strarray.lru_cache_operations'), doOperation: this.doOperation }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                operationRes: $r('app.strarray.lru_cache_operations'), doOperation: this.doOperation
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Scroll.pop();
    }
    private action;
    private actionDialogController: CustomDialogController;
    private doOperation;
}
