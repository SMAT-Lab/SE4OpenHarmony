interface StylePage_Params {
    message?: string;
}
interface HelloComponent_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StylePage_" + ++__generate__Id;
}
/*
 * 自定义组件特点：
 * 可组合：允许开发者组合使用系统组件、及其属性和方法。
 * 可重用：自定义组件可以被其他组件重用，并作为不同的实例在不同的父组件或容器中使用。
 * 数据驱动UI更新：通过状态变量的改变，来驱动UI的刷新。
 *
 * */
import promptAction from '@ohos.promptAction';
class HelloComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello, World!', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HelloComponent_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    aboutToAppear() {
        promptAction.showToast({ message: "aboutToAppear" });
    }
    aboutToDisappear() {
        promptAction.showToast({ message: "aboutToDisappear" });
    }
    /*
     * 组件生命周期，即一般用@Component装饰的自定义组件的生命周期，提供以下生命周期接口：
     * aboutToAppear：组件即将出现时回调该接口，具体时机为在创建自定义组件的新实例后，在执行其build()函数之前执行。
     * aboutToDisappear：在自定义组件即将析构销毁时执行。
     * */
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    //build()函数：build()函数用于定义自定义组件的声明式UI描述，自定义组件必须定义build()函数。
    render() {
        // HelloComponent自定义组件组合系统组件Row和Text
        Row.create();
        Text.create(this.message);
        Text.onClick(() => {
            // 状态变量message的改变驱动UI刷新，UI从'Hello, World!'刷新为'Hello, ArkUI!'
            this.message = 'Hello, ArkUI!';
        });
        Text.pop();
        // HelloComponent自定义组件组合系统组件Row和Text
        Row.pop();
    }
}
/*
* @Extend，用于扩展原生组件样式。
*注意点：1.和@Styles不同，@Extend仅支持定义在全局，不支持在组件内部定义。
*       2.和@Styles不同，@Extend装饰的方法支持参数
*       3.@Extend的参数可以为状态变量，当状态变量改变时，UI可以正常的被刷新渲染。
*       4.@Extend装饰的方法的参数可以为function，作为Event事件的句柄。
 * */
function __Text__fancy(fontSize: number): void {
    Text.fontColor(Color.Red);
    Text.fontSize(fontSize);
}
class StylePage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StylePage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        let earlierCreatedChild_2: HelloComponent = (this && this.findChildById) ? this.findChildById("2") as HelloComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new HelloComponent("2", this, { message: '自定义组件' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                message: '自定义组件'
            });
            View.create(earlierCreatedChild_2);
        }
        Text.create(this.message);
        Text.width(150);
        Text.height(100);
        Text.backgroundColor(Color.Pink);
        Text.pop();
        // .fontSize(50)
        // .fontWeight(FontWeight.Bold)
        Text.create('Fancy');
        __Text__fancy(16);
        // .fontSize(50)
        // .fontWeight(FontWeight.Bold)
        Text.pop();
        Text.create('Fancy');
        __Text__fancy(24);
        Text.pop();
        Button.createWithLabel('Click me');
        ViewStackProcessor.visualState("focused");
        Button.backgroundColor(Color.Pink);
        ViewStackProcessor.visualState("pressed");
        Button.backgroundColor(Color.Black);
        ViewStackProcessor.visualState("normal");
        Button.backgroundColor(Color.Yellow);
        ViewStackProcessor.visualState();
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new StylePage("1", undefined, {}));
