interface DebugInfo_Params {
    debugWindow?: boolean;
    pssMemory?: number;
    sharedMemory?: number;
    privateMemory?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DebugInfo_" + ++__generate__Id;
}
export default class DebugInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__debugWindow = new SynchedPropertySimpleOneWay(params.debugWindow, this, "debugWindow");
        this.__pssMemory = new SynchedPropertySimpleTwoWay(params.pssMemory, this, "pssMemory");
        this.__sharedMemory = new SynchedPropertySimpleTwoWay(params.sharedMemory, this, "sharedMemory");
        this.__privateMemory = new SynchedPropertySimpleTwoWay(params.privateMemory, this, "privateMemory");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DebugInfo_Params) {
        this.debugWindow = params.debugWindow;
    }
    aboutToBeDeleted() {
        this.__debugWindow.aboutToBeDeleted();
        this.__pssMemory.aboutToBeDeleted();
        this.__sharedMemory.aboutToBeDeleted();
        this.__privateMemory.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __debugWindow: SynchedPropertySimpleOneWay<boolean>;
    get debugWindow() {
        return this.__debugWindow.get();
    }
    set debugWindow(newValue: boolean) {
        this.__debugWindow.set(newValue);
    }
    private __pssMemory: SynchedPropertySimpleTwoWay<number>;
    get pssMemory() {
        return this.__pssMemory.get();
    }
    set pssMemory(newValue: number) {
        this.__pssMemory.set(newValue);
    }
    private __sharedMemory: SynchedPropertySimpleTwoWay<number>;
    get sharedMemory() {
        return this.__sharedMemory.get();
    }
    set sharedMemory(newValue: number) {
        this.__sharedMemory.set(newValue);
    }
    private __privateMemory: SynchedPropertySimpleTwoWay<number>;
    get privateMemory() {
        return this.__privateMemory.get();
    }
    set privateMemory(newValue: number) {
        this.__privateMemory.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.width('100%');
        Stack.height('100%');
        Text.create($r('app.string.navigation_information'));
        Text.fontSize(25);
        Text.width('80%');
        Text.lineHeight(40);
        Text.margin({ top: '5%' });
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        If.create();
        if (this.debugWindow) {
            If.branchId(0);
            Column.create();
            Column.width('85%');
            Column.height('25%');
            Column.margin({ top: '35%' });
            Column.padding({ bottom: '5%', top: '5%' });
            Column.backgroundColor(Color.White);
            Column.border({ width: 2, radius: 10 });
            this.showDebug($r('app.string.pss'), this.pssMemory, this);
            this.showDebug($r('app.string.sharedDirty'), this.sharedMemory, this);
            this.showDebug($r('app.string.privateDirty'), this.privateMemory, this);
            Column.pop();
        }
        If.pop();
        Stack.pop();
    }
    // Debug显示信息复用组件
    showDebug(title: Resource, data: number, parent = null) {
        Row.create();
        Row.width('100%');
        Row.margin({ top: 10 });
        Text.create(title);
        Text.fontSize(20);
        Text.width('70%');
        Text.textAlign(TextAlign.End);
        Text.pop();
        Text.create(`${data}KB`);
        Text.fontSize(20);
        Text.pop();
        Row.pop();
    }
}
