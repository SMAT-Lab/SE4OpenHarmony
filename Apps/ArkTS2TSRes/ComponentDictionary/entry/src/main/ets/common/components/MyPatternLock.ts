interface MyPatternLock_Params {
    passwords?: Number[];
    message?: string;
    patternLockController?: PatternLockController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyPatternLock_" + ++__generate__Id;
}
export class MyPatternLock extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__passwords = new ObservedPropertyObject([], this, "passwords");
        this.__message = new ObservedPropertySimple('please input password!', this, "message");
        this.patternLockController = new PatternLockController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyPatternLock_Params) {
        if (params.passwords !== undefined) {
            this.passwords = params.passwords;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.patternLockController !== undefined) {
            this.patternLockController = params.patternLockController;
        }
    }
    aboutToBeDeleted() {
        this.__passwords.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __passwords: ObservedPropertyObject<Number[]>;
    get passwords() {
        return this.__passwords.get();
    }
    set passwords(newValue: Number[]) {
        this.__passwords.set(newValue);
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private patternLockController: PatternLockController;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create(this.message);
        Text.textAlign(TextAlign.Center);
        Text.margin(20);
        Text.fontSize(20);
        Text.pop();
        PatternLock.create(this.patternLockController);
        PatternLock.sideLength(200);
        PatternLock.circleRadius(9);
        PatternLock.pathStrokeWidth(18);
        PatternLock.activeColor('#B0C4DE');
        PatternLock.selectedColor('#228B22');
        PatternLock.pathColor('#90EE90');
        PatternLock.backgroundColor('#F5F5F5');
        PatternLock.autoReset(true);
        PatternLock.onPatternComplete((input: Array<number>) => {
            // 输入的密码长度小于5时，提示重新输入
            if (input === null || input === undefined || input.length < 5) {
                this.message = 'The password length needs to be greater than 5, please enter again.';
                return;
            }
            // 判断密码长度是否大于0
            if (this.passwords.length > 0) {
                // 判断两次输入的密码是否相同，相同则提示密码设置成功，否则提示重新输入
                if (this.passwords.toString() === input.toString()) {
                    this.passwords = input;
                    this.message = 'Set password successfully: ' + this.passwords.toString();
                }
                else {
                    this.message = 'Inconsistent passwords, please enter again.';
                }
            }
            else {
                // 提示第二次输入密码
                this.passwords = input;
                this.message = "Please enter again.";
            }
        });
        Button.createWithLabel('Reset PatternLock');
        Button.margin(30);
        Button.onClick(() => {
            // 重置密码锁
            this.patternLockController.reset();
            this.passwords = [];
            this.message = 'Please input password';
        });
        Button.pop();
        Column.pop();
    }
}
