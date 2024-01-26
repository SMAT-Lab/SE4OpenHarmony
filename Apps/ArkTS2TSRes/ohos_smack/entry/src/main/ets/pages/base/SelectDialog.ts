interface SelectDialog_Params {
    controller?: CustomDialogController;
    vue?: string;
    options?: Array<SelectOptionsEntity>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectDialog_" + ++__generate__Id;
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
import { SelectOptionsEntity } from '../../entity/SelectOptionsEntity';
export class SelectDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = {} as CustomDialogController;
        this.__vue = new SynchedPropertySimpleTwoWay(params.vue, this, "vue");
        this.options = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.options !== undefined) {
            this.options = params.options;
        }
    }
    aboutToBeDeleted() {
        this.__vue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __vue: SynchedPropertySimpleTwoWay<string>;
    get vue() {
        return this.__vue.get();
    }
    set vue(newValue: string) {
        this.__vue.set(newValue);
    }
    private options: Array<SelectOptionsEntity>;
    render() {
        Column.create();
        Column.height(50 * this.options.length);
        Column.backgroundColor('#ffffff');
        Column.borderRadius(10);
        Column.width('60%');
        List.create({});
        List.height(50 * this.options.length);
        List.width('100%');
        List.listDirection(Axis.Vertical);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.options), (item: SelectOptionsEntity) => {
            ListItem.create();
            ListItem.editable(true);
            ListItem.onClick(v => {
                this.vue = item.label;
                this.controller.close();
            });
            Text.create(item.label);
            Text.width('100%');
            Text.height(50);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            ListItem.pop();
        }, (item: SelectOptionsEntity) => item.label);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
