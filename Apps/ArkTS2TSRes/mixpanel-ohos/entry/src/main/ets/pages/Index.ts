interface Index_Params {
    title?: string;
    token?;
    distinctId?;
    mPanel?: ESObject | null;
    people?: ESObject | null;
    group?: ESObject | null;
    groupKey?: string;
    groupId?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import mixpanel from '@ohos/mixpanel';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new ObservedPropertySimple('Hello World', this, "title");
        this.token = '9b164f424c15d9d59b71efa4d9403a97';
        this.distinctId = 'mixpanel_distinctId';
        this.mPanel = null;
        this.people = null;
        this.group = null;
        this.groupKey = 'All';
        this.groupId = 'test_chris';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.token !== undefined) {
            this.token = params.token;
        }
        if (params.distinctId !== undefined) {
            this.distinctId = params.distinctId;
        }
        if (params.mPanel !== undefined) {
            this.mPanel = params.mPanel;
        }
        if (params.people !== undefined) {
            this.people = params.people;
        }
        if (params.group !== undefined) {
            this.group = params.group;
        }
        if (params.groupKey !== undefined) {
            this.groupKey = params.groupKey;
        }
        if (params.groupId !== undefined) {
            this.groupId = params.groupId;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private token; // replace with your mixpanel token id
    private distinctId;
    private mPanel: any | null;
    private people: any | null;
    private group: any | null;
    private groupKey: string;
    private groupId: string;
    aboutToAppear() {
        this.title = 'Mixpanel -TEST';
        this.mPanel = mixpanel.init(this.token);
        this.people = new mixpanel.MixPanelPeople(this.mPanel);
        this.group = new mixpanel.MixPanelGroups(this.mPanel);
    }
    render() {
        Scroll.create();
        Row.create();
        Column.create();
        Column.width('100%');
        Text.create(this.title);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.Black);
        Text.opacity(0.9);
        Text.width('100%');
        Text.padding(10);
        Text.margin({
            bottom: 20
        });
        Text.pop();
        Button.createWithLabel('Track');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonTrackClick();
        });
        Button.pop();
        Button.createWithLabel('Batch');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonBatchClick();
        });
        Button.pop();
        Button.createWithLabel('People Set');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleSetClick();
        });
        Button.pop();
        Button.createWithLabel('People Increment');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleIncrementClick();
        });
        Button.pop();
        Button.createWithLabel('People Append');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleAppendClick();
        });
        Button.pop();
        Button.createWithLabel('People Track');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleTrackClickCharge();
        });
        Button.pop();
        Button.createWithLabel('People Clear Charges');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleClearClickCharge();
        });
        Button.pop();
        Button.createWithLabel('People Remove');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleRemoveClick();
        });
        Button.pop();
        Button.createWithLabel('People Union');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleUnionClick();
        });
        Button.pop();
        Button.createWithLabel('People Unset');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonPeopleUnsetClick();
        });
        Button.pop();
        Button.createWithLabel('People Delete User');
        Button.width('90%');
        Button.margin({
            bottom: 10
        });
        Button.height(50);
        Button.onClick(() => {
            this.onButtonPeopleDeleteClick();
        });
        Button.pop();
        Button.createWithLabel('Group Set Once');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonGroupSetOnceClick();
        });
        Button.pop();
        Button.createWithLabel('Group Set');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonGroupSetClick();
        });
        Button.pop();
        Button.createWithLabel('Group Remove');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonGroupRemoveClick();
        });
        Button.pop();
        Button.createWithLabel('Group Union');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonGroupUnionClick();
        });
        Button.pop();
        Button.createWithLabel('Group Unset');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonGroupUnsetClick();
        });
        Button.pop();
        Button.createWithLabel('Group Delete');
        Button.width('90%');
        Button.height(50);
        Button.margin({
            bottom: 10
        });
        Button.onClick(() => {
            this.onButtonGroupDeleteClick();
        });
        Button.pop();
        Column.pop();
        Row.pop();
        Scroll.pop();
    }
    onButtonTrackClick() {
        try {
            let result: any = this.mPanel.track('Button Click Track');
            if (result) {
                this.title = `调用${'mPanel track'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'mPanel track'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'mPanel track'}出错，错误信息： ${err}`;
        }
    }
    onButtonBatchClick() {
        class event {
            event: string = '';
        }
        let batchEvents: event = { event: 'Event1' };
        try {
            let result: any = this.mPanel.trackBatch(batchEvents);
            if (result) {
                this.title = `调用${'mPanel trackBatch'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'mPanel trackBatch'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'mPanel trackBatch'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleSetOnceClick() {
        try {
            let result: any = this.people.setOnce(this.distinctId, {
                'place': 'Ahmedabad',
                'Date': '23 Dec 2021'
            });
            if (result) {
                this.title = `调用${'people setOnce'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people setOnce'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people setOnce'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleSetClick() {
        try {
            let result: any = this.people.set(this.distinctId, {
                'gender': 'male',
                'age': '28'
            });
            if (result) {
                this.title = `调用${'people set'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people set'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people set'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleIncrementClick() {
        try {
            let result: any = this.people.increment(this.distinctId, {
                'id': 1000,
                'page_views': 500,
                'count': -200,
            });
            if (result) {
                this.title = `调用${'people increment'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people increment'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people increment'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleAppendClick() {
        try {
            let result: any = this.people.append(this.distinctId, {
                list1: 'abcd',
                list2: 123
            });
            if (result) {
                this.title = `调用${'people append'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people append'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people append'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleTrackClickCharge() {
        try {
            let result: any = this.people.trackCharge(this.distinctId, 1000);
            if (result) {
                this.title = `调用${'people trackCharge'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people trackCharge'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people trackCharge'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleClearClickCharge() {
        try {
            let result: any = this.people.clearCharges(this.distinctId);
            if (result) {
                this.title = `调用${'people clearCharges'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people clearCharges'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people clearCharges'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleRemoveClick() {
        try {
            let result: any = this.people.remove(this.distinctId, {
                list1: 'abcd'
            });
            if (result) {
                this.title = `调用${'people remove'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people remove'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people remove'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleUnionClick() {
        try {
            let result: any = this.people.union(this.distinctId, {
                list1: 'abcd'
            });
            if (result) {
                this.title = `调用${'people union'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people union'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people union'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleUnsetClick() {
        try {
            let result: any = this.people.unset(this.distinctId, ['list1', 'list2']);
            if (result) {
                this.title = `调用${'people unset'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people unset'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people unset'}出错，错误信息： ${err}`;
        }
    }
    onButtonPeopleDeleteClick() {
        try {
            let result: any = this.people.deleteUser(this.distinctId);
            if (result) {
                this.title = `调用${'people deleteUser'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'people deleteUser'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'people deleteUser'}出错，错误信息： ${err}`;
        }
    }
    onButtonGroupSetOnceClick() {
        try {
            let result: any = this.group.setOnce(this.groupKey, this.groupId, {
                'name': 'abcd',
                'age': '21',
            });
            if (result) {
                this.title = `调用${'group setOnce'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'group setOnce'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'group setOnce'}出错，错误信息： ${err}`;
        }
    }
    onButtonGroupSetClick() {
        try {
            let result: any = this.group.set(this.groupKey, this.groupId, {
                'name': 'santa',
                'age': '26',
            });
            if (result) {
                this.title = `调用${'group set'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'group set'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'group set'}出错，错误信息： ${err}`;
        }
    }
    onButtonGroupRemoveClick() {
        try {
            let result: any = this.group.remove(this.groupKey, this.groupId, {
                'age': '21'
            });
            if (result) {
                this.title = `调用${'group remove'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'group remove'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'group remove'}出错，错误信息： ${err}`;
        }
    }
    onButtonGroupUnionClick() {
        try {
            let result: any = this.group.union(this.groupKey, this.groupId, {
                'age': '21'
            });
            if (result) {
                this.title = `调用${'group union'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'group union'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'group union'}出错，错误信息： ${err}`;
        }
    }
    onButtonGroupUnsetClick() {
        try {
            let result: any = this.group.unset(this.groupKey, this.groupId, 'age');
            if (result) {
                this.title = `调用${'group unset'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'group unset'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'group unset'}出错，错误信息： ${err}`;
        }
    }
    onButtonGroupDeleteClick() {
        try {
            let result: any = this.group.deleteGroup(this.groupKey, this.groupId);
            if (result) {
                this.title = `调用${'group deleteGroup'}结果： ${JSON.stringify(result)}`;
            }
            else {
                this.title = `调用${'group deleteGroup'}结束，无返回值`;
            }
        }
        catch (err) {
            this.title = `调用${'group deleteGroup'}出错，错误信息： ${err}`;
        }
    }
}
loadDocument(new Index("1", undefined, {}));
