interface Index_Params {
    message?: string;
    messageService?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello', this, "message");
        this.__messageService = new ObservedPropertySimple('Atomic Service', this, "messageService");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.messageService !== undefined) {
            this.messageService = params.messageService;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__messageService.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __messageService: ObservedPropertySimple<string>;
    get messageService() {
        return this.__messageService.get();
    }
    set messageService(newValue: string) {
        this.__messageService.set(newValue);
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
        Text.create(this.messageService);
        Text.fontSize(35);
        Text.fontWeight(Color.Orange);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
