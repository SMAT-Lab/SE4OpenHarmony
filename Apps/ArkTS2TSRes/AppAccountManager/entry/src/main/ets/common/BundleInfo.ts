interface BundleInfo_Params {
    dataSet?: MyDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BundleInfo_" + ++__generate__Id;
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
class BasicDataSource implements IDataSource {
    private listeners: DataChangeListener[] = [];
    public totalCount() {
        return 0;
    }
    public getData(index: number): DataArray {
        return new DataArray();
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
        this.listeners.forEach(listener => {
            listener.onDataReloaded();
        });
    }
    notifyDataAdd(index: number) {
        this.listeners.forEach(listener => {
            listener.onDataAdd(index);
        });
    }
    notifyDataChange(index: number) {
        this.listeners.forEach(listener => {
            listener.onDataChange(index);
        });
    }
    notifyDataDelete(index: number) {
        this.listeners.forEach(listener => {
            listener.onDataDelete(index);
        });
    }
    notifyDataMove(from: number, to: number) {
        this.listeners.forEach(listener => {
            listener.onDataMove(from, to);
        });
    }
}
class DataArray {
    img: Resource = $r('app.string.empty');
    text: Resource = $r('app.string.empty');
    name: string = '';
}
class MyDataSource extends BasicDataSource {
    private dataArray: Array<DataArray> = [
        { img: $r('app.media.music'), text: $r('app.string.music'), name: 'Music' },
        { img: $r('app.media.video'), text: $r('app.string.video'), name: 'Video' },
        { img: $r('app.media.map'), text: $r('app.string.map'), name: 'Map' }
    ];
    public totalCount() {
        return this.dataArray.length;
    }
    public getData(index: number) {
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
    public replaceData(result: DataArray[]) {
        this.dataArray = result;
    }
}
export class BundleInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dataSet = new ObservedPropertyObject(new MyDataSource(), this, "dataSet");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BundleInfo_Params) {
        if (params.dataSet !== undefined) {
            this.dataSet = params.dataSet;
        }
    }
    aboutToBeDeleted() {
        this.__dataSet.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dataSet: ObservedPropertyObject<MyDataSource>;
    get dataSet() {
        return this.__dataSet.get();
    }
    set dataSet(newValue: MyDataSource) {
        this.__dataSet.set(newValue);
    }
    render() {
        Column.create();
        Column.layoutWeight(1);
        LazyForEach.create("2", this, ObservedObject.GetRawObject(this.dataSet), (item: DataArray) => {
            this.isRenderingInProgress = true;
            Row.create();
            Row.id(item.name + 'App');
            Row.margin(5);
            Row.width('95%');
            Row.height('20%');
            Row.borderRadius(20);
            Row.backgroundColor('#f6f6f6');
            Row.onClick(() => {
                router.replaceUrl({
                    url: 'pages/Login',
                    params: {
                        bundleName: item.name
                    }
                });
            });
            Image.create(item.img);
            Image.margin(10);
            Image.width('40%');
            Image.height('60%');
            Image.objectFit(ImageFit.Contain);
            Text.create(item.text);
            Text.margin(10);
            Text.fontSize(20);
            Text.pop();
            Image.create($r('app.media.right'));
            Image.margin(10);
            Image.width('15%');
            Image.height('20%');
            Image.layoutWeight(1);
            Image.objectFit(ImageFit.Contain);
            Row.pop();
            this.isRenderingInProgress = false;
        }, (item: DataArray) => item.name.toString());
        LazyForEach.pop();
        Column.pop();
    }
}
