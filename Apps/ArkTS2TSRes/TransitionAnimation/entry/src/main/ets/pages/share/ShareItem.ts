interface ShareItem_Params {
    info?: MyDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ShareItem_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
import TitleBar from '../../common/TitleBar';
export const SHARE_IMAGES = [
    $r('app.media.share1'),
    $r('app.media.share2'),
    $r('app.media.share3'),
    $r('app.media.share4'),
    $r('app.media.share5'),
    $r('app.media.share6')
];
class BasicDataSource implements IDataSource {
    private listeners: DataChangeListener[] = [];
    public totalCount() {
        return 0;
    }
    public getData(index: number): undefined | Resource {
        return undefined;
    }
    registerDataChangeListener(listener: DataChangeListener) {
        if (this.listeners.indexOf(listener) < 0) {
            this.listeners.push(listener);
        }
    }
    unregisterDataChangeListener(listener: DataChangeListener) {
        const pos = this.listeners.indexOf(listener);
        if (pos >= 0) {
            this.listeners.splice(pos, 1);
        }
    }
    notifyDataReload() {
        this.listeners.forEach((listener: DataChangeListener) => {
            listener.onDataReloaded();
        });
    }
    notifyDataAdd(index: number) {
        this.listeners.forEach((listener: DataChangeListener) => {
            listener.onDataAdd(index);
        });
    }
    notifyDataChange(index: number) {
        this.listeners.forEach((listener: DataChangeListener) => {
            listener.onDataChange(index);
        });
    }
    notifyDataDelete(index: number) {
        this.listeners.forEach((listener: DataChangeListener) => {
            listener.onDataDelete(index);
        });
    }
    notifyDataMove(from: number, to: number) {
        this.listeners.forEach((listener: DataChangeListener) => {
            listener.onDataMove(from, to);
        });
    }
}
class MyDataSource extends BasicDataSource {
    private dataArray: Resource[] = SHARE_IMAGES;
    public totalCount() {
        return this.dataArray.length;
    }
    public getData(index: number): undefined | Resource {
        return this.dataArray[index];
    }
    public addData(index: number) {
        this.dataArray.splice(index, 0);
        this.notifyDataAdd(index);
    }
    public pushData(index: number) {
        this.dataArray.push();
        this.notifyDataAdd(this.dataArray.length - 1);
    }
    public replaceData(result: Resource[]) {
        this.dataArray = result;
    }
}
class ShareItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__info = new ObservedPropertyObject(new MyDataSource(), this, "info");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ShareItem_Params) {
        if (params.info !== undefined) {
            this.info = params.info;
        }
    }
    aboutToBeDeleted() {
        this.__info.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __info: ObservedPropertyObject<MyDataSource>;
    get info() {
        return this.__info.get();
    }
    set info(newValue: MyDataSource) {
        this.__info.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, { hasBackPress: true }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                hasBackPress: true
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Text.create($r('app.string.share_transition_tips'));
        Text.fontColor(Color.Black);
        Text.fontSize(25);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.margin(10);
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr 1fr 1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.padding(10);
        Grid.layoutWeight(1);
        LazyForEach.create("3", this, ObservedObject.GetRawObject(this.info), (item: Resource, index?: number) => {
            this.isRenderingInProgress = true;
            GridItem.create();
            GridItem.padding(10);
            GridItem.backgroundColor('#F5F5F5');
            GridItem.borderRadius(10);
            GridItem.onClick(() => {
                router.push({
                    url: 'pages/share/SharePage',
                    params: {
                        index: index
                    }
                });
            });
            If.create();
            if (index !== undefined) {
                If.branchId(0);
                Image.create(item);
                Image.width(120);
                Image.aspectRatio(1);
                Image.sharedTransition(index.toString(), { duration: 600, curve: Curve.Smooth, delay: 100 });
            }
            If.pop();
            GridItem.pop();
            this.isRenderingInProgress = false;
        }, (item: Resource) => JSON.stringify(item));
        LazyForEach.pop();
        Grid.pop();
        Column.pop();
    }
}
loadDocument(new ShareItem("1", undefined, {}));
