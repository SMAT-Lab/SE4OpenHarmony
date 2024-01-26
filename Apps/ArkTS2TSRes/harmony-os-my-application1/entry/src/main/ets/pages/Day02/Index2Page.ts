interface Index2Page_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index2Page_" + ++__generate__Id;
}
import router from '@ohos.router';
import { GoodsPage } from './GoodsPage';
export class Index2Page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index2Page_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        let earlierCreatedChild_2: GoodsPage = (this && this.findChildById) ? this.findChildById("2") as GoodsPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // Row() {
            //   Column() {
            //     Text("点击此处进入商品页面")
            //       .fontSize(40)
            //       .fontWeight(FontWeight.Bold)
            //       .onClick(()=> {
            //         console.info("点击了进入商品页面")
            //         router.push({
            //           url: "pages/Day02/GoodsPage",
            //         })
            //       })
            //   }
            //   .width('100%')
            // }
            // .height('100%')
            View.create(new GoodsPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
    }
}
