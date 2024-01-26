interface CustomSteps_vertical_Params {
    stepsStatus?: string[];
    stepsTime?: string[];
    successIcon?: string;
    defaultIcon?: string;
    hasSuccessIcon?: string;
    successFontColor?: string;
    defaultFontColor?: string;
    hasSuccessFontColor?: string;
    lineDefaultColor?: string;
    lineSuccessColor?: string;
    currentStep?: number;
}
interface CustomSteps_Params {
    steps?: string[];
    successIcon?: string;
    defaultIcon?: string;
    hasSuccessIcon?: string;
    successFontColor?: string;
    defaultFontColor?: string;
    hasSuccessFontColor?: string;
    lineDefaultColor?: string;
    lineSuccessColor?: string;
    currentStep?: number //是否是当前步骤
    ;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomSteps_" + ++__generate__Id;
}
export class CustomSteps extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.steps = [] //步骤信息
        ;
        this.successIcon = "Steps_success_circle.png" //成功icon
        ;
        this.defaultIcon = "Steps_default_circle.png" //默认icon
        ;
        this.hasSuccessIcon = "Steps_default_successCircle.png" //已经成功的icon
        ;
        this.successFontColor = "#ff22980d" //成功字体颜色
        ;
        this.defaultFontColor = "#ff737373" //默认字体颜色
        ;
        this.hasSuccessFontColor = "#ff000000" //已经成功的字体颜色
        ;
        this.lineDefaultColor = "#ff737373" //连接线默认颜色
        ;
        this.lineSuccessColor = "#ff22980d" //连接线成功颜色
        ;
        this.__currentStep = new SynchedPropertySimpleTwoWay(params.currentStep, this, "currentStep");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomSteps_Params) {
        if (params.steps !== undefined) {
            this.steps = params.steps;
        }
        if (params.successIcon !== undefined) {
            this.successIcon = params.successIcon;
        }
        if (params.defaultIcon !== undefined) {
            this.defaultIcon = params.defaultIcon;
        }
        if (params.hasSuccessIcon !== undefined) {
            this.hasSuccessIcon = params.hasSuccessIcon;
        }
        if (params.successFontColor !== undefined) {
            this.successFontColor = params.successFontColor;
        }
        if (params.defaultFontColor !== undefined) {
            this.defaultFontColor = params.defaultFontColor;
        }
        if (params.hasSuccessFontColor !== undefined) {
            this.hasSuccessFontColor = params.hasSuccessFontColor;
        }
        if (params.lineDefaultColor !== undefined) {
            this.lineDefaultColor = params.lineDefaultColor;
        }
        if (params.lineSuccessColor !== undefined) {
            this.lineSuccessColor = params.lineSuccessColor;
        }
    }
    aboutToBeDeleted() {
        this.__currentStep.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private steps: string[]; //步骤信息
    private successIcon: string; //成功icon
    private defaultIcon: string; //默认icon
    private hasSuccessIcon: string; //已经成功的icon
    private successFontColor: string; //成功字体颜色
    private defaultFontColor: string; //默认字体颜色
    private hasSuccessFontColor: string; //已经成功的字体颜色
    private lineDefaultColor: string; //连接线默认颜色
    private lineSuccessColor: string; //连接线成功颜色
    private __currentStep: SynchedPropertySimpleTwoWay<number>; //是否是当前步骤
    get currentStep() {
        return this.__currentStep.get();
    }
    set currentStep(newValue: number //是否是当前步骤
    ) {
        this.__currentStep.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween });
        Flex.margin(10);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.steps), (item, index) => {
            If.create();
            if (this.currentStep == index) {
                If.branchId(0);
                Text.create(item);
                Text.fontColor(this.successFontColor);
                Text.pop();
            }
            else if (this.currentStep < index) {
                If.branchId(1);
                Text.create(item);
                Text.fontColor(this.defaultFontColor);
                Text.pop();
            }
            else {
                If.branchId(2);
                Text.create(item);
                Text.fontColor(this.hasSuccessFontColor);
                Text.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Flex.pop();
        Flex.create({ direction: FlexDirection.Row, justifyContent: FlexAlign.SpaceBetween });
        Flex.margin({ bottom: 10, left: 10, right: 10 });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.steps), (item, index) => {
            Row.create();
            Row.height(25);
            Row.width(50);
            If.create();
            if (this.currentStep == index) {
                If.branchId(0);
                Image.create($rawfile(this.successIcon));
                Image.width(20);
                Image.height(20);
            }
            else if (this.currentStep < index) {
                If.branchId(1);
                Image.create($rawfile(this.defaultIcon));
                Image.width(10);
                Image.height(10);
            }
            else {
                If.branchId(2);
                Image.create($rawfile(this.hasSuccessIcon));
                Image.width(10);
                Image.height(10);
            }
            If.pop();
            Row.pop();
            If.create();
            if (index != this.steps.length - 1) {
                If.branchId(0);
                If.create();
                if (this.currentStep <= index) {
                    If.branchId(0);
                    Row.create();
                    Row.height(20);
                    Row.width("100%");
                    Row.create();
                    Row.layoutWeight(1);
                    Row.height(2);
                    Row.backgroundColor(this.lineDefaultColor);
                    Row.alignSelf(ItemAlign.Center);
                    Row.margin({ left: 10, right: 10 });
                    Row.pop();
                    Row.pop();
                }
                else {
                    If.branchId(1);
                    Row.create();
                    Row.height(20);
                    Row.width("100%");
                    Row.create();
                    Row.layoutWeight(1);
                    Row.height(2);
                    Row.backgroundColor(this.lineSuccessColor);
                    Row.alignSelf(ItemAlign.Center);
                    Row.margin({ left: 10, right: 10 });
                    Row.pop();
                    Row.pop();
                }
                If.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Flex.pop();
        Column.pop();
    }
}
export class CustomSteps_vertical extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.stepsStatus = [] //步骤状态
        ;
        this.stepsTime = [] //步骤时间
        ;
        this.successIcon = "Steps_success_circle.png" //成功icon
        ;
        this.defaultIcon = "Steps_default_circle.png" //默认icon
        ;
        this.hasSuccessIcon = "Steps_default_successCircle.png" //已经成功的icon
        ;
        this.successFontColor = "#ff22980d" //成功字体颜色
        ;
        this.defaultFontColor = "#ff737373" //默认字体颜色
        ;
        this.hasSuccessFontColor = "#ff000000" //已经成功的字体颜色
        ;
        this.lineDefaultColor = "#ff737373" //连接线默认颜色
        ;
        this.lineSuccessColor = "#ff22980d" //连接线成功颜色
        ;
        this.__currentStep = new SynchedPropertySimpleTwoWay(params.currentStep, this, "currentStep");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomSteps_vertical_Params) {
        if (params.stepsStatus !== undefined) {
            this.stepsStatus = params.stepsStatus;
        }
        if (params.stepsTime !== undefined) {
            this.stepsTime = params.stepsTime;
        }
        if (params.successIcon !== undefined) {
            this.successIcon = params.successIcon;
        }
        if (params.defaultIcon !== undefined) {
            this.defaultIcon = params.defaultIcon;
        }
        if (params.hasSuccessIcon !== undefined) {
            this.hasSuccessIcon = params.hasSuccessIcon;
        }
        if (params.successFontColor !== undefined) {
            this.successFontColor = params.successFontColor;
        }
        if (params.defaultFontColor !== undefined) {
            this.defaultFontColor = params.defaultFontColor;
        }
        if (params.hasSuccessFontColor !== undefined) {
            this.hasSuccessFontColor = params.hasSuccessFontColor;
        }
        if (params.lineDefaultColor !== undefined) {
            this.lineDefaultColor = params.lineDefaultColor;
        }
        if (params.lineSuccessColor !== undefined) {
            this.lineSuccessColor = params.lineSuccessColor;
        }
    }
    aboutToBeDeleted() {
        this.__currentStep.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private stepsStatus: string[]; //步骤状态
    private stepsTime: string[]; //步骤时间
    private successIcon: string; //成功icon
    private defaultIcon: string; //默认icon
    private hasSuccessIcon: string; //已经成功的icon
    private successFontColor: string; //成功字体颜色
    private defaultFontColor: string; //默认字体颜色
    private hasSuccessFontColor: string; //已经成功的字体颜色
    private lineDefaultColor: string; //连接线默认颜色
    private lineSuccessColor: string; //连接线成功颜色
    private __currentStep: SynchedPropertySimpleTwoWay<number>;
    get currentStep() {
        return this.__currentStep.get();
    }
    set currentStep(newValue: number) {
        this.__currentStep.set(newValue);
    }
    render() {
        Row.create();
        Row.padding({ top: 10, bottom: 10 });
        Row.backgroundColor("#ffffffff");
        Column.create();
        Column.layoutWeight(1);
        Column.alignSelf(ItemAlign.Start);
        ForEach.create("4", this, ObservedObject.GetRawObject(this.stepsStatus), (item, index) => {
            Row.create();
            Row.height(20);
            If.create();
            if (this.currentStep == index) {
                If.branchId(0);
                Image.create($rawfile(this.successIcon));
                Image.width(20);
                Image.height(20);
            }
            else if (this.currentStep < index) {
                If.branchId(1);
                Image.create($rawfile(this.defaultIcon));
                Image.width(10);
                Image.height(10);
                Image.alignSelf(ItemAlign.Center);
            }
            else {
                If.branchId(2);
                Image.create($rawfile(this.hasSuccessIcon));
                Image.width(10);
                Image.height(10);
            }
            If.pop();
            Row.pop();
            If.create();
            if (index != this.stepsStatus.length - 1) {
                If.branchId(0);
                If.create();
                if (this.currentStep <= index) {
                    If.branchId(0);
                    Column.create();
                    Column.width("100%");
                    Divider.create();
                    Divider.width(2);
                    Divider.height(30);
                    Divider.backgroundColor(this.lineDefaultColor);
                    Divider.alignSelf(ItemAlign.Center);
                    Column.pop();
                }
                else {
                    If.branchId(1);
                    Column.create();
                    Column.width("100%");
                    Divider.create();
                    Divider.width(2);
                    Divider.height(30);
                    Divider.backgroundColor(this.lineSuccessColor);
                    Divider.alignSelf(ItemAlign.Center);
                    Column.pop();
                }
                If.pop();
            }
            If.pop();
        });
        ForEach.pop();
        Column.pop();
        // .height(140)
        Column.create();
        // .height(140)
        Column.layoutWeight(7);
        ForEach.create("5", this, ObservedObject.GetRawObject(this.stepsStatus), (item, index) => {
            If.create();
            if (this.currentStep == index) {
                If.branchId(0);
                Column.create();
                Column.height(50);
                Column.width("100%");
                Text.create(item);
                Text.fontColor(this.successFontColor);
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Text.create(this.stepsTime[index]);
                Text.fontColor(this.successFontColor);
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Column.pop();
            }
            else if (this.currentStep < index) {
                If.branchId(1);
                Column.create();
                Column.height(50);
                Column.width("100%");
                Text.create(item);
                Text.fontColor(this.defaultFontColor);
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Text.create(this.stepsTime[index]);
                Text.fontColor(this.defaultFontColor);
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Column.pop();
            }
            else {
                If.branchId(2);
                Column.create();
                Column.height(50);
                Column.width("100%");
                Text.create(item);
                Text.fontColor(this.hasSuccessFontColor);
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Text.create(this.stepsTime[index]);
                Text.fontColor(this.hasSuccessFontColor);
                Text.alignSelf(ItemAlign.Start);
                Text.pop();
                Column.pop();
            }
            If.pop();
        });
        ForEach.pop();
        // .height(140)
        Column.pop();
        Row.pop();
    }
}
