interface getSVGPixelMap_Params {
    pixels?: PixelMap;
    pixels2?: PixelMap;
    visible?: Visibility;
    visible2?: Visibility;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "getSVGPixelMap_" + ++__generate__Id;
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
import { GlobalContext, SVGImageView } from '@ohos/svg';
export class getSVGPixelMap extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pixels = new ObservedPropertyObject(undefined, this, "pixels");
        this.__pixels2 = new ObservedPropertyObject(undefined, this, "pixels2");
        this.__visible = new ObservedPropertySimple(Visibility.None, this, "visible");
        this.__visible2 = new ObservedPropertySimple(Visibility.None, this, "visible2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: getSVGPixelMap_Params) {
        if (params.pixels !== undefined) {
            this.pixels = params.pixels;
        }
        if (params.pixels2 !== undefined) {
            this.pixels2 = params.pixels2;
        }
        if (params.visible !== undefined) {
            this.visible = params.visible;
        }
        if (params.visible2 !== undefined) {
            this.visible2 = params.visible2;
        }
    }
    aboutToBeDeleted() {
        this.__pixels.aboutToBeDeleted();
        this.__pixels2.aboutToBeDeleted();
        this.__visible.aboutToBeDeleted();
        this.__visible2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pixels?: ObservedPropertyObject<PixelMap>;
    get pixels() {
        return this.__pixels.get();
    }
    set pixels(newValue: PixelMap) {
        this.__pixels.set(newValue);
    }
    private __pixels2?: ObservedPropertyObject<PixelMap>;
    get pixels2() {
        return this.__pixels2.get();
    }
    set pixels2(newValue: PixelMap) {
        this.__pixels2.set(newValue);
    }
    private __visible: ObservedPropertySimple<Visibility>;
    get visible() {
        return this.__visible.get();
    }
    set visible(newValue: Visibility) {
        this.__visible.set(newValue);
    }
    private __visible2: ObservedPropertySimple<Visibility>;
    get visible2() {
        return this.__visible2.get();
    }
    set visible2(newValue: Visibility) {
        this.__visible2.set(newValue);
    }
    aboutToAppear() {
        let context: Context = GlobalContext.getContext().getObject("context") as Context;
        context.resourceManager.getMedia($r('app.media.ic_launcher_round').id).then(data => {
            let model = new SVGImageView.SVGImageViewModel();
            model.getSVGPixelMap(new Uint8Array(data.buffer), { width: 400, height: 400 }).then((pixelmap) => {
                this.pixels = pixelmap;
                this.visible = Visibility.Visible;
            });
        });
        context.resourceManager.getMedia($r('app.media.iconsvg').id).then(data => {
            let model = new SVGImageView.SVGImageViewModel();
            model.getSVGPixelMap(new Uint8Array(data.buffer), { width: 32, height: 32 }).then((pixelmap) => {
                this.pixels2 = pixelmap;
                this.visible2 = Visibility.Visible;
            });
        });
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.height("100%");
        Stack.width('100%');
        Column.create();
        Column.scale({ x: 0.7, y: 0.7 });
        Column.height("100%");
        Image.create(this.pixels);
        Image.width(400);
        Image.height(400);
        Image.visibility(this.visible);
        Image.create(this.pixels2);
        Image.width(32);
        Image.height(32);
        Image.visibility(this.visible2);
        Image.margin({ top: 20 });
        Column.pop();
        Stack.pop();
    }
}
loadDocument(new getSVGPixelMap("1", undefined, {}));
