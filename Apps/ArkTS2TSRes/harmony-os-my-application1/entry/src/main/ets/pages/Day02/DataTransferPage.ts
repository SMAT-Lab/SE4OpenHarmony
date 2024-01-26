interface GrandSonComponent_Params {
    count?: number;
}
interface SonComponent_Params {
    count?: number;
    student?: Student;
    ANumber?: number;
}
interface DataTransferPage_Params {
    message?: string;
    count?: number;
    student?: Student;
    manager?: SystemManager;
    ANumber?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DataTransferPage_" + ++__generate__Id;
}
import { Student, SystemManager } from '../../model/Student';
class DataTransferPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.__count = new ObservedPropertySimple(10, this, "count");
        this.__student = new ObservedPropertyObject(new Student({ userName: "张三", age: 10 }), this, "student");
        this.__manager = new ObservedPropertyObject(new SystemManager("管理系统", new Student({ userName: "李四", age: 30 }))
        //@Provide 提供被监听数据，并类似于与@State同步页面渲染
        , this, "manager");
        this.__ANumber = new ObservedPropertySimple(0, this, "ANumber");
        this.addProvidedVar("test", this.__ANumber, false);
        this.addProvidedVar("ANumber", this.__ANumber, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DataTransferPage_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.student !== undefined) {
            this.student = params.student;
        }
        if (params.manager !== undefined) {
            this.manager = params.manager;
        }
        if (params.ANumber !== undefined) {
            this.ANumber = params.ANumber;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__student.aboutToBeDeleted();
        this.__manager.aboutToBeDeleted();
        this.__ANumber.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __student: ObservedPropertyObject<Student>;
    get student() {
        return this.__student.get();
    }
    set student(newValue: Student) {
        this.__student.set(newValue);
    }
    private __manager: ObservedPropertyObject<SystemManager>;
    get manager() {
        return this.__manager.get();
    }
    set manager(newValue: SystemManager) {
        this.__manager.set(newValue);
    }
    //@Provide 提供被监听数据，并类似于与@State同步页面渲染
    private __ANumber: ObservedPropertySimple<number>;
    get ANumber() {
        return this.__ANumber.get();
    }
    set ANumber(newValue: number) {
        this.__ANumber.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create("父组件" + this.count + this.manager.student.userName + this.manager.student.age);
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.count++;
            this.manager.student.age++;
        });
        Text.pop();
        Text.create("当前数据为" + this.ANumber);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.ANumber++;
        });
        Text.pop();
        let earlierCreatedChild_2: SonComponent = (this && this.findChildById) ? this.findChildById("2") as SonComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            //SonComponent({count: this.count}) //Prop单向传参
            //SonComponent({count: this.count, student: $student}) //Link双向绑定
            View.create(new SonComponent("2", this, { count: this.count, student: this.manager.student })); //objectLink传部分属性
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                count: this.count, student: this.manager.student
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Row.pop();
    }
}
class SonComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__count = new SynchedPropertySimpleOneWay(params.count, this, "count");
        this.__student = new SynchedPropertyNesedObject(params.student, this, "student");
        this.__ANumber = this.initializeConsume("test", "ANumber");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SonComponent_Params) {
        this.count = params.count;
        this.__student.set(params.student);
    }
    aboutToBeDeleted() {
        this.__count.aboutToBeDeleted();
        this.__student.aboutToBeDeleted();
        this.__ANumber.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //Prop装饰器 父组件数据改变时，自动单向同步到子组件
    private __count: SynchedPropertySimpleOneWay<number
    //Link装饰器 父组件和子组件双向同步
    //@Link count: number
    //@Link student: Student
    //ObjectLink 用于传递类中的部分属性，类需要被@Observed修饰
    >;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    //Link装饰器 父组件和子组件双向同步
    //@Link count: number
    //@Link student: Student
    //ObjectLink 用于传递类中的部分属性，类需要被@Observed修饰
    private __student: SynchedPropertyNesedObject<Student
    //监听@Provide提供的数据，并同步页面渲染
    >;
    get student() {
        return this.__student.get();
    }
    //监听@Provide提供的数据，并同步页面渲染
    private __ANumber: SynchedPropertySimpleTwoWay<number>;
    get ANumber() {
        return this.__ANumber.get();
    }
    set ANumber(newValue: number) {
        this.__ANumber.set(newValue);
    }
    render() {
        Column.create();
        Button.createWithLabel("子组件" + this.count + this.student.userName + this.student.age);
        Button.type(ButtonType.Normal);
        Button.fontSize(30);
        Button.onClick(() => {
            this.count++;
            this.student.age++;
        });
        Button.pop();
        Text.create("当前数据为" + this.ANumber);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.ANumber++;
        });
        Text.pop();
        let earlierCreatedChild_3: GrandSonComponent = (this && this.findChildById) ? this.findChildById("3") as GrandSonComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new GrandSonComponent("3", this, { count: this.count }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                count: this.count
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
class GrandSonComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__count = new SynchedPropertySimpleOneWay(params.count, this, "count");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GrandSonComponent_Params) {
        this.count = params.count;
    }
    aboutToBeDeleted() {
        this.__count.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __count: SynchedPropertySimpleOneWay<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    render() {
        Text.create("孙组件" + this.count);
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            this.count++;
        });
        Text.pop();
    }
}
loadDocument(new DataTransferPage("1", undefined, {}));
