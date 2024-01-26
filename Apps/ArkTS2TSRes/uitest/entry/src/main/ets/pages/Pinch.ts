interface ScreenExample_Params {
    myscale?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Pinch_" + ++__generate__Id;
}
class ScreenExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__myscale = new ObservedPropertySimple(1, this, "myscale");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ScreenExample_Params) {
        if (params.myscale !== undefined) {
            this.myscale = params.myscale;
        }
    }
    aboutToBeDeleted() {
        this.__myscale.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __myscale: ObservedPropertySimple<number>;
    get myscale() {
        return this.__myscale.get();
    }
    set myscale(newValue: number) {
        this.__myscale.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create(this.myscale.toString());
        Text.pop();
        Image.create($r('app.media.icon'));
        Image.objectFit(ImageFit.Auto);
        Image.height(200);
        Image.width(200);
        Image.id("pinch_ima");
        Image.scale({ x: this.myscale, y: this.myscale, z: this.myscale });
        Gesture.create(GesturePriority.Low);
        PinchGesture.create();
        PinchGesture.onActionStart((event: GestureEvent) => {
            console.info('Pinch start');
        });
        PinchGesture.onActionUpdate((event: GestureEvent) => {
            this.myscale = event.scale;
        });
        PinchGesture.onActionEnd(() => {
            console.info('Pinch end');
        });
        PinchGesture.pop();
        Gesture.pop();
        Column.pop();
    }
}
loadDocument(new ScreenExample("1", undefined, {}));
