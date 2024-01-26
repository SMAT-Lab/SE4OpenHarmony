interface DragExample_Params {
    numbers?: string[];
    text?: string;
    bool?: boolean;
    dragBool?: boolean;
    appleVisible?: Visibility;
    orangeVisible?: Visibility;
    bananaVisible?: Visibility;
    select?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Drag_" + ++__generate__Id;
}
class DragExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__numbers = new ObservedPropertyObject(['one', 'two', 'three', 'four', 'five', 'six'], this, "numbers");
        this.__text = new ObservedPropertySimple('', this, "text");
        this.__bool = new ObservedPropertySimple(false, this, "bool");
        this.__dragBool = new ObservedPropertySimple(false, this, "dragBool");
        this.__appleVisible = new ObservedPropertySimple(Visibility.Visible, this, "appleVisible");
        this.__orangeVisible = new ObservedPropertySimple(Visibility.Visible, this, "orangeVisible");
        this.__bananaVisible = new ObservedPropertySimple(Visibility.Visible, this, "bananaVisible");
        this.__select = new ObservedPropertySimple(0, this, "select");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DragExample_Params) {
        if (params.numbers !== undefined) {
            this.numbers = params.numbers;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.bool !== undefined) {
            this.bool = params.bool;
        }
        if (params.dragBool !== undefined) {
            this.dragBool = params.dragBool;
        }
        if (params.appleVisible !== undefined) {
            this.appleVisible = params.appleVisible;
        }
        if (params.orangeVisible !== undefined) {
            this.orangeVisible = params.orangeVisible;
        }
        if (params.bananaVisible !== undefined) {
            this.bananaVisible = params.bananaVisible;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
    }
    aboutToBeDeleted() {
        this.__numbers.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__bool.aboutToBeDeleted();
        this.__dragBool.aboutToBeDeleted();
        this.__appleVisible.aboutToBeDeleted();
        this.__orangeVisible.aboutToBeDeleted();
        this.__bananaVisible.aboutToBeDeleted();
        this.__select.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __numbers: ObservedPropertyObject<string[]>;
    get numbers() {
        return this.__numbers.get();
    }
    set numbers(newValue: string[]) {
        this.__numbers.set(newValue);
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __bool: ObservedPropertySimple<boolean>;
    get bool() {
        return this.__bool.get();
    }
    set bool(newValue: boolean) {
        this.__bool.set(newValue);
    }
    private __dragBool: ObservedPropertySimple<boolean>;
    get dragBool() {
        return this.__dragBool.get();
    }
    set dragBool(newValue: boolean) {
        this.__dragBool.set(newValue);
    }
    private __appleVisible: ObservedPropertySimple<Visibility>;
    get appleVisible() {
        return this.__appleVisible.get();
    }
    set appleVisible(newValue: Visibility) {
        this.__appleVisible.set(newValue);
    }
    private __orangeVisible: ObservedPropertySimple<Visibility>;
    get orangeVisible() {
        return this.__orangeVisible.get();
    }
    set orangeVisible(newValue: Visibility) {
        this.__orangeVisible.set(newValue);
    }
    private __bananaVisible: ObservedPropertySimple<Visibility>;
    get bananaVisible() {
        return this.__bananaVisible.get();
    }
    set bananaVisible(newValue: Visibility) {
        this.__bananaVisible.set(newValue);
    }
    private __select: ObservedPropertySimple<number>;
    get select() {
        return this.__select.get();
    }
    set select(newValue: number) {
        this.__select.set(newValue);
    }
    pixelMapBuilder(parent = null) {
        Column.create();
        Text.create(this.text);
        Text.width('50%');
        Text.height(60);
        Text.fontSize(16);
        Text.borderRadius(10);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(Color.Yellow);
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding({ top: 20 });
        Column.margin({ top: 20 });
        Text.create('There are three Text elements here');
        Text.fontSize(12);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.textAlign(TextAlign.Start);
        Text.margin(5);
        Text.pop();
        Button.createWithLabel("Show Item");
        Button.id("show_item");
        Button.onClick(() => {
            this.appleVisible = Visibility.Visible;
            this.bananaVisible = Visibility.Visible;
        });
        Button.pop();
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceAround });
        Flex.border({ width: 1 });
        Flex.width('90%');
        Flex.padding({ top: 10, bottom: 10 });
        Flex.margin(10);
        Text.create('apple');
        Text.width('25%');
        Text.height(35);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xAFEEEE);
        Text.visibility(this.appleVisible);
        Text.onDragStart(() => {
            this.bool = true;
            this.text = 'apple';
            this.appleVisible = Visibility.Hidden;
            return { builder: this.pixelMapBuilder.bind(this) };
        });
        Text.pop();
        Text.create('orange');
        Text.width('25%');
        Text.height(35);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xAFEEEE);
        Text.visibility(this.orangeVisible);
        Text.onDragStart(() => {
            this.bool = true;
            this.text = 'orange';
            this.orangeVisible = Visibility.Hidden;
            return { builder: this.pixelMapBuilder.bind(this) };
        });
        Text.pop();
        Text.create('banana');
        Text.width('25%');
        Text.height(35);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(0xAFEEEE);
        Text.visibility(this.bananaVisible);
        Text.onDragStart((event: DragEvent, extraParams: string) => {
            console.log('Text onDragStarts, ' + extraParams);
            this.bool = true;
            this.text = 'banana';
            this.bananaVisible = Visibility.Hidden;
            return { builder: this.pixelMapBuilder.bind(this) };
        });
        Text.pop();
        Flex.pop();
        Text.create('This is a List element');
        Text.fontSize(12);
        Text.fontColor(0xCCCCCC);
        Text.width('90%');
        Text.textAlign(TextAlign.Start);
        Text.margin(15);
        Text.pop();
        List.create({ space: 20, initialIndex: 0 });
        List.height('50%');
        List.width('90%');
        List.border({ width: 1 });
        List.divider({ strokeWidth: 2, color: 0xFFFFFF, startMargin: 20, endMargin: 20 });
        List.onDragEnter((event: DragEvent, extraParams: string) => {
            console.log('List onDragEnter, ' + extraParams);
        });
        List.onDragMove((event: DragEvent, extraParams: string) => {
            console.log('List onDragMove, ' + extraParams);
        });
        List.onDragLeave((event: DragEvent, extraParams: string) => {
            console.log('List onDragLeave, ' + extraParams);
        });
        List.onDrop((event: DragEvent, extraParams: string) => {
            let jsonString: extraObj = JSON.parse(extraParams);
            if (this.bool) {
                this.numbers.splice(jsonString.insertIndex, 0, this.text);
                this.bool = false;
            }
            else if (this.dragBool) {
                this.numbers.splice(jsonString.selectedIndex, 1);
                this.numbers.splice(jsonString.insertIndex, 0, this.text);
                this.bool = false;
                this.dragBool = false;
            }
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.numbers), (item: string) => {
            ListItem.create();
            ListItem.onDragStart((event: DragEvent, extraParams: string) => {
                console.log('ListItem onDragStarts, ' + extraParams);
                let jsonString: extraObj = JSON.parse(extraParams);
                this.dragBool = true;
                this.text = this.numbers[jsonString.selectedIndex];
                this.select = jsonString.selectedIndex;
                return { builder: this.pixelMapBuilder.bind(this) };
            });
            Text.create('' + item);
            Text.width('100%');
            Text.height(80);
            Text.fontSize(16);
            Text.borderRadius(10);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor(0xAFEEEE);
            Text.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
interface extraObj {
    insertIndex: number;
    selectedIndex: number;
}
loadDocument(new DragExample("1", undefined, {}));
