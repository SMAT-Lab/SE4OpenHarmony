interface MainPage_Params {
    textInfo?: string;
    controller?: SearchController;
    customizeFunction?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MainPage_" + ++__generate__Id;
}
export class MainPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textInfo = new SynchedPropertySimpleTwoWay(params.textInfo, this, "textInfo");
        this.controller = new SearchController();
        this.customizeFunction = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MainPage_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.customizeFunction !== undefined) {
            this.customizeFunction = params.customizeFunction;
        }
    }
    aboutToBeDeleted() {
        this.__textInfo.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textInfo: SynchedPropertySimpleTwoWay<string>;
    get textInfo() {
        return this.__textInfo.get();
    }
    set textInfo(newValue: string) {
        this.__textInfo.set(newValue);
    }
    private controller: SearchController;
    private customizeFunction: () => void;
    render() {
        Column.create();
        Column.margin({ top: 10, bottom: 10 });
        Search.create({ value: this.textInfo, placeholder: 'Input to search', controller: this.controller });
        Search.searchButton('Search');
        Search.width('95%');
        Search.height(40);
        Search.textFont({ size: 25, weight: FontWeight.Bold });
        Search.placeholderFont({ size: 25, weight: FontWeight.Normal, style: FontStyle.Normal });
        Search.backgroundColor(Color.White);
        Search.placeholderColor(Color.Grey);
        Search.onSubmit((value: string) => {
            this.textInfo = value;
            this.customizeFunction();
        });
        Search.onChange((value: string) => {
            this.textInfo = value;
            this.customizeFunction();
        });
        Search.pop();
        Column.pop();
    }
}
