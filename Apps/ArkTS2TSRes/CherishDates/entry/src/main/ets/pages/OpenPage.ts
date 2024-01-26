interface OpenPage_Params {
    message?: string;
    value?: number;
    intervalID?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "OpenPage_" + ++__generate__Id;
}
import router from '@system.router';
class OpenPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__value = new ObservedPropertySimple(0, this, "value");
        this.intervalID = -1;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: OpenPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __value: ObservedPropertySimple<number>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: number) {
        this.__value.set(newValue);
    }
    private intervalID: number;
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.onClick(() => {
            router.push({ uri: 'pages/TabPage' });
        });
        Column.width('100%');
        Image.create($r("app.media.logo"));
        Image.width(200);
        Image.margin({ bottom: 400 });
        Text.create("CherishDates");
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bolder);
        Text.pop();
        Progress.create({
            value: this.value,
            total: 100,
            type: ProgressType.Linear
        });
        Progress.style({ strokeWidth: 10 });
        Progress.margin({ top: 20 });
        Progress.size({ width: '80%', height: 40 });
        Progress.color(Color.Pink);
        Column.pop();
        Row.pop();
    }
    aboutToAppear() {
        this.intervalID = setInterval(() => {
            this.value += 1;
            if (this.value > 100) {
                clearInterval(this.intervalID);
            }
            console.log("update: " + this.value);
        }, 100);
    }
}
loadDocument(new OpenPage("1", undefined, {}));
