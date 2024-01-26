interface Index3Page_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index3Page_" + ++__generate__Id;
}
//@Entry
import router from '@ohos.router';
import { CanvasPage } from './CanvasPage';
import { NewsPage } from './NewsPage';
export class Index3Page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index3Page_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.layoutWeight(1);
        // Text("点击此处进入新闻页面")
        //   .fontSize(40)
        //   .fontWeight(FontWeight.Bold)
        //   .onClick(()=> {
        //     console.info("点击了进入新闻页面")
        //     router.push({
        //       url: "pages/Day03/NewsPage",
        //     })
        //   })
        //
        // Text("点击此处开始画图")
        //   .fontSize(40)
        //   .fontWeight(FontWeight.Bold)
        //   .onClick(()=> {
        //     console.info("点击了画图")
        //     router.push({
        //       url: "pages/Day03/CanvasPage",
        //     })
        //   })
        Tabs.create();
        // Text("点击此处进入新闻页面")
        //   .fontSize(40)
        //   .fontWeight(FontWeight.Bold)
        //   .onClick(()=> {
        //     console.info("点击了进入新闻页面")
        //     router.push({
        //       url: "pages/Day03/NewsPage",
        //     })
        //   })
        //
        // Text("点击此处开始画图")
        //   .fontSize(40)
        //   .fontWeight(FontWeight.Bold)
        //   .onClick(()=> {
        //     console.info("点击了画图")
        //     router.push({
        //       url: "pages/Day03/CanvasPage",
        //     })
        //   })
        Tabs.scrollable(false);
        TabContent.create();
        TabContent.tabBar("新闻热点");
        let earlierCreatedChild_2: NewsPage = (this && this.findChildById) ? this.findChildById("2") as NewsPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new NewsPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        TabContent.pop();
        TabContent.create();
        TabContent.tabBar("画图");
        let earlierCreatedChild_3: CanvasPage = (this && this.findChildById) ? this.findChildById("3") as CanvasPage : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CanvasPage("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        TabContent.pop();
        // Text("点击此处进入新闻页面")
        //   .fontSize(40)
        //   .fontWeight(FontWeight.Bold)
        //   .onClick(()=> {
        //     console.info("点击了进入新闻页面")
        //     router.push({
        //       url: "pages/Day03/NewsPage",
        //     })
        //   })
        //
        // Text("点击此处开始画图")
        //   .fontSize(40)
        //   .fontWeight(FontWeight.Bold)
        //   .onClick(()=> {
        //     console.info("点击了画图")
        //     router.push({
        //       url: "pages/Day03/CanvasPage",
        //     })
        //   })
        Tabs.pop();
        Column.pop();
    }
}
