interface ScreenshotDialog_Params {
    screenshotController?: CustomDialogController;
    screenshotUrl?: PixelMap;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScreenshotDialog_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
const SCALE: number = 0.5; // 缩放比例
export class ScreenshotDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.screenshotController = undefined;
        this.__screenshotUrl = new SynchedPropertyObjectTwoWay(params.screenshotUrl, this, "screenshotUrl");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ScreenshotDialog_Params) {
        if (params.screenshotController !== undefined) {
            this.screenshotController = params.screenshotController;
        }
    }
    aboutToBeDeleted() {
        this.__screenshotUrl.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private screenshotController: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.screenshotController = ctr;
    }
    private __screenshotUrl: SynchedPropertySimpleOneWay<PixelMap>;
    get screenshotUrl() {
        return this.__screenshotUrl.get();
    }
    set screenshotUrl(newValue: PixelMap) {
        this.__screenshotUrl.set(newValue);
    }
    render() {
        Column.create();
        Column.borderRadius(10);
        Column.padding(20);
        Column.backgroundColor(Color.White);
        Column.scale({ x: SCALE, y: SCALE });
        Image.create(this.screenshotUrl);
        Column.pop();
    }
}
