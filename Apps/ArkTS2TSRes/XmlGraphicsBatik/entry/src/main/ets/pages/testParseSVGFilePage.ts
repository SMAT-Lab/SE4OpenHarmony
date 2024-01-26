interface testParseSVGFilePage_Params {
    svgManager?: SVGManager;
    svgJson?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "testParseSVGFilePage_" + ++__generate__Id;
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
class testParseSVGFilePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.svgManager = SVGManager.getInstance();
        this.__svgJson = new ObservedPropertySimple('', this, "svgJson");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: testParseSVGFilePage_Params) {
        if (params.svgManager !== undefined) {
            this.svgManager = params.svgManager;
        }
        if (params.svgJson !== undefined) {
            this.svgJson = params.svgJson;
        }
    }
    aboutToBeDeleted() {
        this.__svgJson.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private svgManager: SVGManager;
    private __svgJson: ObservedPropertySimple<string>;
    get svgJson() {
        return this.__svgJson.get();
    }
    set svgJson(newValue: string) {
        this.__svgJson.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Button.createWithLabel('test parse svg file');
        Button.fontSize(20);
        Button.fontWeight(FontWeight.Bold);
        Button.width(250);
        Button.height(50);
        Button.onClick(() => {
            this.svgManager.parse('svg.svg', (parseXMLResultObj) => {
                this.svgJson = parseXMLResultObj;
            });
        });
        Button.pop();
        Text.create(this.svgJson);
        Text.width('100%');
        Text.height('100%');
        Text.pop();
        Flex.pop();
    }
    aboutToAppear() {
        let success = () => {
            consoleInfo('Test parse svg file, saveFile', 'success');
        };
        let svgOriginXml: string = GlobalContext.getContext().getObject("svgOriginXml") as string;
        this.svgManager.saveSVG('svg.svg', svgOriginXml, success);
    }
}
loadDocument(new testParseSVGFilePage("1", undefined, {}));
