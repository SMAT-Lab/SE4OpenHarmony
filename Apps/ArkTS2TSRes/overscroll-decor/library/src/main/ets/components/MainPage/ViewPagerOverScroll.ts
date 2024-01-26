interface ViewPagerOverScroll_Params {
    model?: ViewPagerOverScroll.Model;
    child?: () => any;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ViewPagerOverScroll_" + ++__generate__Id;
}
class ViewPagerOverScroll extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.child = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ViewPagerOverScroll_Params) {
        if (params.child !== undefined) {
            this.child = params.child;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<ViewPagerOverScroll.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ViewPagerOverScroll.Model) {
        this.__model.set(newValue);
    }
    private __child;
    render() {
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height(this.model.mHeight);
        Flex.width(this.model.mWidth);
        this.child(this);
        Flex.pop();
    }
}
namespace ViewPagerOverScroll {
    export class Model {
        mHeight: number | string = px2vp(2340);
        mWidth: number | string = px2vp(lpx2px(720));
        public getHeight(): number | string {
            return this.mHeight;
        }
        public setHeight(height: number | string): Model {
            this.mHeight = height;
            return this;
        }
        public getWidth(): number | string {
            return this.mWidth;
        }
        public setWidth(width: number | string): Model {
            this.mWidth = width;
            return this;
        }
    }
}
export default ViewPagerOverScroll;
