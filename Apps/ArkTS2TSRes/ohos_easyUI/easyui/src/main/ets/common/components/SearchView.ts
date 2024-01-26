interface SearchView_Params {
    isVisible?: boolean;
    flag?: boolean;
    inputWidth?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SearchView_" + ++__generate__Id;
}
export class SearchView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isVisible = new ObservedPropertySimple(true, this, "isVisible");
        this.__flag = new ObservedPropertySimple(true, this, "flag");
        this.__inputWidth = new ObservedPropertySimple('5%', this, "inputWidth");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SearchView_Params) {
        if (params.isVisible !== undefined) {
            this.isVisible = params.isVisible;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
        }
        if (params.inputWidth !== undefined) {
            this.inputWidth = params.inputWidth;
        }
    }
    aboutToBeDeleted() {
        this.__isVisible.aboutToBeDeleted();
        this.__flag.aboutToBeDeleted();
        this.__inputWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isVisible: ObservedPropertySimple<boolean>;
    get isVisible() {
        return this.__isVisible.get();
    }
    set isVisible(newValue: boolean) {
        this.__isVisible.set(newValue);
    }
    private __flag: ObservedPropertySimple<boolean>;
    get flag() {
        return this.__flag.get();
    }
    set flag(newValue: boolean) {
        this.__flag.set(newValue);
    }
    private __inputWidth: ObservedPropertySimple<string>;
    get inputWidth() {
        return this.__inputWidth.get();
    }
    set inputWidth(newValue: string) {
        this.__inputWidth.set(newValue);
    }
    switchToInput() {
        this.isVisible = false;
        Context.animateTo({
            duration: 1300,
            tempo: 1,
            iterations: 1,
            playMode: PlayMode.Normal,
            onFinish: () => { }
        }, () => {
            this.inputWidth = '90%';
        });
        console.log('1' + this.isVisible);
    }
    switchToImage() {
        if (this.isVisible === false) {
            Context.animateTo({
                duration: 1300,
                tempo: 1,
                iterations: 1,
                playMode: PlayMode.Normal,
                onFinish: () => {
                }
            }, () => {
                this.inputWidth = '0%';
            });
            setTimeout(() => {
                this.isVisible = true;
            }, 1300);
            console.log('2');
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.onClick(() => this.switchToImage());
        Column.create();
        Column.width('100%');
        Column.height(50);
        Column.backgroundColor('#33ff99');
        Column.justifyContent(FlexAlign.Center);
        Image.create({ "id": 0, "type": 30000, params: ["SearchView_search.png"] });
        Image.width(50);
        Image.height(50);
        Image.visibility(this.isVisible ? Visibility.Visible : Visibility.None);
        Image.onClick(() => this.switchToInput());
        TextInput.create({ placeholder: "search.." });
        TextInput.width(this.inputWidth);
        TextInput.backgroundColor(Color.White);
        TextInput.visibility(this.isVisible ? Visibility.Hidden : Visibility.Visible);
        TextInput.enterKeyType(EnterKeyType.Search);
        Column.pop();
        Column.pop();
    }
}
