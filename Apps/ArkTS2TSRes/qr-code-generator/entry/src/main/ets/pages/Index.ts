interface Index_Params {
    isSimpleVisibility?: Visibility;
    isManualVisibility?: Visibility;
    SimpleContext?: CanvasRenderingContext2D;
    ManualContext?: CanvasRenderingContext2D;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */
import { qrcodegen } from '@ohos/qr-code-generator';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isSimpleVisibility = new ObservedPropertySimple(Visibility.Hidden, this, "isSimpleVisibility");
        this.__isManualVisibility = new ObservedPropertySimple(Visibility.Hidden, this, "isManualVisibility");
        this.SimpleContext = new CanvasRenderingContext2D(new RenderingContextSettings(true));
        this.ManualContext = new CanvasRenderingContext2D(new RenderingContextSettings(true));
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.isSimpleVisibility !== undefined) {
            this.isSimpleVisibility = params.isSimpleVisibility;
        }
        if (params.isManualVisibility !== undefined) {
            this.isManualVisibility = params.isManualVisibility;
        }
        if (params.SimpleContext !== undefined) {
            this.SimpleContext = params.SimpleContext;
        }
        if (params.ManualContext !== undefined) {
            this.ManualContext = params.ManualContext;
        }
    }
    aboutToBeDeleted() {
        this.__isSimpleVisibility.aboutToBeDeleted();
        this.__isManualVisibility.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isSimpleVisibility: ObservedPropertySimple<Visibility>;
    get isSimpleVisibility() {
        return this.__isSimpleVisibility.get();
    }
    set isSimpleVisibility(newValue: Visibility) {
        this.__isSimpleVisibility.set(newValue);
    }
    private __isManualVisibility: ObservedPropertySimple<Visibility>;
    get isManualVisibility() {
        return this.__isManualVisibility.get();
    }
    set isManualVisibility(newValue: Visibility) {
        this.__isManualVisibility.set(newValue);
    }
    private SimpleContext: CanvasRenderingContext2D;
    private ManualContext: CanvasRenderingContext2D;
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.padding(16);
        Flex.width('100%');
        Flex.height('100%');
        Column.create({ space: 10 });
        Column.height("50%");
        Text.create("Simple operation");
        Text.fontSize(25);
        Text.fontColor(Color.Gray);
        Text.padding(20);
        Text.pop();
        Canvas.create(this.SimpleContext);
        Canvas.width('80%');
        Canvas.height("50%");
        Canvas.onReady(() => {
            let qrcode: qrcodegen.QrCode = qrcodegen.QrCode.encodeText("Hello, world!", qrcodegen.QrCode.Ecc.MEDIUM);
            qrcode.drawCanvas(8, 1, this.SimpleContext);
        });
        Canvas.visibility(this.isSimpleVisibility);
        Canvas.pop();
        Button.createWithLabel("显示'Hello, world!'二维码", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("70%");
        Button.onClick(() => {
            this.isSimpleVisibility = Visibility.Visible;
        });
        Button.pop();
        Column.pop();
        Column.create({ space: 10 });
        Column.height("50%");
        Text.create("Manual operation");
        Text.fontSize(25);
        Text.fontColor(Color.Gray);
        Text.padding(20);
        Text.pop();
        Canvas.create(this.ManualContext);
        Canvas.width('80%');
        Canvas.height("60%");
        Canvas.onReady(() => {
            const segs = qrcodegen.QrSegment.makeSegments("3.141592653589793238462643383");
            const qr1 = qrcodegen.QrCode.encodeSegments(segs, qrcodegen.QrCode.Ecc.HIGH, 5, 5, 2, false);
            qr1.drawCanvas(5, 5, this.ManualContext);
        });
        Canvas.visibility(this.isManualVisibility);
        Canvas.pop();
        Button.createWithLabel("显示圆周率二维码", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("70%");
        Button.onClick(() => {
            this.isManualVisibility = Visibility.Visible;
        });
        Button.pop();
        Column.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
