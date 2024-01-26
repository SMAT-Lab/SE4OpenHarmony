interface TaskPool_Params {
    numberOfExecutions?: number;
    isExecute?;
    clickAble?;
    task?: taskpool.Task | null;
    msg?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TaskPool_" + ++__generate__Id;
}
/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import taskpool from '@ohos.taskpool';
import router from '@ohos.router';
function functionForTasks(numberOfExecutions: number) {
    "use concurrent";
    return numberOfExecutions + 1;
}
export class TaskPool extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__numberOfExecutions = new ObservedPropertySimple(0, this, "numberOfExecutions");
        this.isExecute = true;
        this.clickAble = true;
        this.__task = new ObservedPropertyObject(null, this, "task");
        this.__msg = new ObservedPropertySimple('task ready', this, "msg");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TaskPool_Params) {
        if (params.numberOfExecutions !== undefined) {
            this.numberOfExecutions = params.numberOfExecutions;
        }
        if (params.isExecute !== undefined) {
            this.isExecute = params.isExecute;
        }
        if (params.clickAble !== undefined) {
            this.clickAble = params.clickAble;
        }
        if (params.task !== undefined) {
            this.task = params.task;
        }
        if (params.msg !== undefined) {
            this.msg = params.msg;
        }
    }
    aboutToBeDeleted() {
        this.__numberOfExecutions.aboutToBeDeleted();
        this.__task.aboutToBeDeleted();
        this.__msg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __numberOfExecutions: ObservedPropertySimple<number>;
    get numberOfExecutions() {
        return this.__numberOfExecutions.get();
    }
    set numberOfExecutions(newValue: number) {
        this.__numberOfExecutions.set(newValue);
    }
    private isExecute;
    private clickAble;
    private __task: ObservedPropertyObject<taskpool.Task | null>;
    get task() {
        return this.__task.get();
    }
    set task(newValue: taskpool.Task | null) {
        this.__task.set(newValue);
    }
    private __msg: ObservedPropertySimple<string>;
    get msg() {
        return this.__msg.get();
    }
    set msg(newValue: string) {
        this.__msg.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        Row.create();
        Row.width('90%');
        Text.create($r('app.string.click_exec_add_one'));
        Text.margin({ top: 22 });
        Text.pop();
        Row.pop();
        Column.create();
        Column.height(160);
        Column.margin({ top: 12 });
        Column.padding(16);
        Column.borderRadius(16);
        Column.backgroundColor($r('app.color.bg_white'));
        Row.create();
        Row.width('100%');
        Text.create('numberOfExecutions:');
        Text.fontColor($r('sys.color.ohos_id_color_text_primary'));
        Text.pop();
        Text.create(this.numberOfExecutions.toString());
        Text.fontColor($r('sys.color.ohos_id_color_text_primary'));
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Text.create('task status:');
        Text.fontColor($r('sys.color.ohos_id_color_text_primary'));
        Text.pop();
        Text.create(this.msg);
        Text.fontColor($r('sys.color.ohos_id_color_text_primary'));
        Text.pop();
        Row.pop();
        Column.pop();
        Blank.create();
        Blank.layoutWeight(1);
        Blank.pop();
        Row.create({ space: 20 });
        Row.width('100%');
        Row.margin({ top: 12, bottom: 16 });
        Row.justifyContent(FlexAlign.Center);
        Button.createWithLabel('Execute task');
        Button.id('execute_task');
        Button.type(ButtonType.Capsule);
        Button.width('45%');
        Button.fontColor($r('app.color.text_color_accent'));
        Button.backgroundColor($r('app.color.bg_btn_grey'));
        Button.onClick(async () => {
            if (!this.clickAble) {
                return;
            }
            for (let i = 0; i > -1; i++) {
                this.task = new taskpool.Task(functionForTasks, i);
                if (!this.isExecute) {
                    this.isExecute = true;
                    taskpool.cancel(ObservedObject.GetRawObject(this.task));
                }
                else {
                    this.clickAble = false;
                    this.msg = 'task is running';
                    await taskpool.execute(ObservedObject.GetRawObject(this.task))
                        .then((res: any) => {
                        this.numberOfExecutions = Number(JSON.parse(JSON.stringify(res)));
                    });
                }
            }
        });
        Button.pop();
        Button.createWithLabel('Cancel task');
        Button.id('cancel_task');
        Button.type(ButtonType.Capsule);
        Button.width('45%');
        Button.fontColor($r('app.color.text_color_red'));
        Button.backgroundColor($r('app.color.bg_btn_grey'));
        Button.onClick(() => {
            if (!this.clickAble) {
                this.msg = 'task cancel';
                this.clickAble = true;
                this.isExecute = !this.isExecute;
            }
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
