interface MyImage_Params {
    on?: string;
    src?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyImage_" + ++__generate__Id;
}
export class MyImage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.on = 'https://developer.harmonyos.com/resource/image/new/home/jz1.png';
        this.__src = new ObservedPropertySimple(this.on, this, "src");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyImage_Params) {
        if (params.on !== undefined) {
            this.on = params.on;
        }
        if (params.src !== undefined) {
            this.src = params.src;
        }
    }
    aboutToBeDeleted() {
        this.__src.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private on: string;
    private __src: ObservedPropertySimple<string>;
    get src() {
        return this.__src.get();
    }
    set src(newValue: string) {
        this.__src.set(newValue);
    }
    render() {
        Column.create();
        Column.height(320);
        Column.width(360);
        Column.padding({ right: 10, top: 10 });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        Text.create('default');
        Text.fontSize(16);
        Text.fontColor(0xcccccc);
        Text.height(30);
        Text.pop();
        Row.create({ space: 5 });
        Image.create($r('app.media.ic_png'));
        Image.width(110);
        Image.height(110);
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.overlay('png', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Image.create($r('app.media.ic_gif'));
        Image.width(110);
        Image.height(110);
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.overlay('gif', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Image.create($r('app.media.grid'));
        Image.width(110);
        Image.height(110);
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.overlay('svg', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Row.pop();
        Row.create({ space: 5 });
        Row.margin({ top: 25, bottom: 10 });
        Image.create($r('app.media.img'));
        Image.width(110);
        Image.height(110);
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.overlay('jpg', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Image.create(this.src);
        Image.width(110);
        Image.height(110);
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.overlay('network', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Row.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start });
        Text.create('objectFit');
        Text.fontSize(16);
        Text.fontColor(0xcccccc);
        Text.height(30);
        Text.pop();
        Row.create({ space: 5 });
        Image.create($r('app.media.img'));
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.objectFit(ImageFit.None);
        Image.width(110);
        Image.height(110);
        Image.overlay('None', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Image.create($r('app.media.img'));
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.objectFit(ImageFit.Fill);
        Image.width(110);
        Image.height(110);
        Image.overlay('Fill', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Image.create($r('app.media.img'));
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.objectFit(ImageFit.Cover);
        Image.width(110);
        Image.height(110);
        Image.overlay('Cover', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Row.pop();
        Row.create({ space: 5 });
        Row.margin({ top: 25 });
        Image.create($r('app.media.img'));
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.objectFit(ImageFit.Contain);
        Image.width(110);
        Image.height(110);
        Image.overlay('Contain', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Image.create($r('app.media.img'));
        Image.border({ width: 1 });
        Image.borderStyle(BorderStyle.Dashed);
        Image.objectFit(ImageFit.ScaleDown);
        Image.width(110);
        Image.height(110);
        Image.overlay('ScaleDown', { align: Alignment.Bottom, offset: { x: 0, y: 20 } });
        Row.pop();
        Flex.pop();
        Column.pop();
    }
}
