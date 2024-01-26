interface ThemeDesktop_Params {
    themeDatas?: Array<ImageAndName>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ThemeDesktop_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import { ImageAndName } from '../pages/Index';
import { MyDataSource } from '../util/DataSource';
export default class ThemeDesktop extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__themeDatas = new SynchedPropertyObjectTwoWay(params.themeDatas, this, "themeDatas");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ThemeDesktop_Params) {
    }
    aboutToBeDeleted() {
        this.__themeDatas.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __themeDatas: SynchedPropertySimpleOneWay<Array<ImageAndName>>;
    get themeDatas() {
        return this.__themeDatas.get();
    }
    set themeDatas(newValue: Array<ImageAndName>) {
        this.__themeDatas.set(newValue);
    }
    render() {
        Grid.create();
        Grid.rowsGap(10);
        Grid.width('100%');
        Grid.columnsGap(10);
        Grid.layoutWeight(1);
        Grid.padding({ top: 20 });
        Grid.backgroundColor('#e5e5e5');
        Grid.columnsTemplate('1fr 1fr 1fr 1fr');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.themeDatas), (item: ImageAndName) => {
            GridItem.create();
            Column.create();
            Column.width(90);
            Column.height(90);
            Image.create(item.image);
            Image.width(70);
            Image.height(70);
            Image.padding(10);
            Image.objectFit(ImageFit.Fill);
            Text.create(item.name);
            Text.fontSize(15);
            Text.pop();
            Column.pop();
            GridItem.pop();
        }, (item: ImageAndName) => JSON.stringify(item));
        ForEach.pop();
        Grid.pop();
    }
}
