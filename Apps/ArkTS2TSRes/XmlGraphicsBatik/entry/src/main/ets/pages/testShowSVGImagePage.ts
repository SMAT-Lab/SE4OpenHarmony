interface Index_Params {
    svgManager?: SVGManager;
    filePath?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "testShowSVGImagePage_" + ++__generate__Id;
}
/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { SVGManager, consoleInfo } from '@ohos/XmlGraphicsBatik';
import { GlobalContext } from '@ohos/XmlGraphicsBatik';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.svgManager = SVGManager.getInstance();
        this.__filePath = new ObservedPropertySimple('', this, "filePath");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.svgManager !== undefined) {
            this.svgManager = params.svgManager;
        }
        if (params.filePath !== undefined) {
            this.filePath = params.filePath;
        }
    }
    aboutToBeDeleted() {
        this.__filePath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private svgManager: SVGManager;
    private __filePath: ObservedPropertySimple<string>;
    get filePath() {
        return this.__filePath.get();
    }
    set filePath(newValue: string) {
        this.__filePath.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Image.create($r('app.media.svgSample'));
        Image.width(500);
        Image.height(500);
        Image.create($r('app.media.svgAnimate'));
        Image.width(500);
        Image.height(500);
        Image.margin({ top: 5 });
        Image.create('file://' + this.filePath + '/svg.svg');
        Image.width(150);
        Image.height(150);
        Image.margin({ top: 5 });
        Flex.pop();
    }
    aboutToAppear() {
        let success = () => {
            consoleInfo('Test parse svg file, saveFile', 'success');
        };
        let filesDir: string = GlobalContext.getContext().getObject("filesDir") as string;
        this.filePath = filesDir;
        let svgOriginXml: string = GlobalContext.getContext().getObject("svgOriginXml") as string;
        this.svgManager.saveSVG('svg.svg', svgOriginXml, success);
    }
}
loadDocument(new Index("1", undefined, {}));
