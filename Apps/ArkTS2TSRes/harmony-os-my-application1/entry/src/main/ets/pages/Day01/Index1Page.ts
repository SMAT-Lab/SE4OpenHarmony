interface Index1Page_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index1Page_" + ++__generate__Id;
}
import router from '@ohos.router';
import { LuckyPage } from './LuckyPage';
export class Index1Page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index1Page_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        let earlierCreatedChild_2: LuckyPage = (this && this.findChildById) ? this.findChildById("2") as LuckyPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // Row() {
            //   Column() {
            //     Text("点击此处开始抽奖")
            //       .fontSize(40)
            //       .fontWeight(FontWeight.Bold)
            //       .onClick(()=> {
            //         console.info("点击了开始抽奖")
            //         router.push({
            //           url: "pages/Day01/LuckyPage"
            //         })
            //       })
            //   }
            //   .width('100%')
            // }
            // .height('100%')
            View.create(new LuckyPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
    }
}
