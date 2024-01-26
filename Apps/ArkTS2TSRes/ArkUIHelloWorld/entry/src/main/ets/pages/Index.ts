interface Index_Params {
    message?: string;
    say?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('父亲节我想对父亲说', this, "message");
        this.__say = new ObservedPropertySimple('燃烧的岁月，已将父亲的青春焚尽，' +
            '但那坚强的信念，仍在父亲额头闪光，' +
            '父亲在我心目中永远高大伟岸，' +
            '父亲的爱护、关怀和勉励将伴我信步风雨人生。' +
            '祝父亲快乐！爸爸我爱您。', this, "say");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.say !== undefined) {
            this.say = params.say;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__say.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __say: ObservedPropertySimple<string>;
    get say() {
        return this.__say.get();
    }
    set say(newValue: string) {
        this.__say.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.say);
        Text.fontSize(25);
        Text.fontColor(Color.Orange);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
