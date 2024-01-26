interface Search_friends_Params {
    resultList?: Array<string>;
    searchText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "search_friends_" + ++__generate__Id;
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
import { Toolbar } from '../base/toolbar';
class Search_friends extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__resultList = new ObservedPropertyObject([], this, "resultList");
        this.__searchText = new ObservedPropertySimple('', this, "searchText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Search_friends_Params) {
        if (params.resultList !== undefined) {
            this.resultList = params.resultList;
        }
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
    }
    aboutToBeDeleted() {
        this.__resultList.aboutToBeDeleted();
        this.__searchText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __resultList: ObservedPropertyObject<Array<string>>;
    get resultList() {
        return this.__resultList.get();
    }
    set resultList(newValue: Array<string>) {
        this.__resultList.set(newValue);
    }
    private __searchText: ObservedPropertySimple<string>;
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue: string) {
        this.__searchText.set(newValue);
    }
    aboutToAppear() {
        this.onSearch();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.backgroundColor('#ececec');
        let earlierCreatedChild_2: Toolbar = (this && this.findChildById) ? this.findChildById("2") as Toolbar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Toolbar("2", this, { title: '搜索', isBack: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: '搜索', isBack: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.padding(10);
        Column.backgroundColor('#ffffff');
        TextInput.create({ placeholder: '搜 索' });
        TextInput.width('100%');
        TextInput.padding(px2vp(10));
        TextInput.fontSize(px2fp(30));
        TextInput.height(px2vp(80));
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            this.searchText = value;
            this.resultList = [];
        });
        TextInput.onSubmit(v => {
            this.onSearch();
        });
        Column.pop();
        List.create();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.resultList), (item: string) => {
            ListItem.create();
            Flex.create({ direction: FlexDirection.Column });
            Text.create(item);
            Text.fontSize(px2fp(30));
            Text.padding(13);
            Text.margin({ top: 1 });
            Text.width('100%');
            Text.backgroundColor('#ffffff');
            Text.pop();
            Flex.pop();
            ListItem.pop();
        }, (item: string) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    // 搜索好友
    private onSearch() {
        for (let i = 0; i < 20; i++) {
            this.resultList.push('我是搜索之后的结果');
        }
    }
}
loadDocument(new Search_friends("1", undefined, {}));
