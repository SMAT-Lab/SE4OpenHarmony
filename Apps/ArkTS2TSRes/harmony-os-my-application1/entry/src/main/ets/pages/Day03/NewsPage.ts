interface NewsPage_Params {
    newsData?: NewsModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NewsPage_" + ++__generate__Id;
}
import http from '@ohos.net.http';
import router from '@ohos.router';
import { NewsModel } from '../../model/NewsModel';
export class NewsPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__newsData = new ObservedPropertyObject(null, this, "newsData");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NewsPage_Params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
    }
    aboutToBeDeleted() {
        this.__newsData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __newsData: ObservedPropertyObject<NewsModel>;
    get newsData() {
        return this.__newsData.get();
    }
    set newsData(newValue: NewsModel) {
        this.__newsData.set(newValue);
    }
    render() {
        If.create();
        if (this.newsData != null) {
            If.branchId(0);
            List.create();
            ForEach.create("2", this, ObservedObject.GetRawObject(this.newsData.data), (item, index) => {
                ListItem.create();
                ListItem.padding(10);
                Column.create();
                Column.onClick(() => {
                    router.push({
                        url: "pages/Day02/WebPage",
                        params: {
                            "url": item.mobilUrl
                        }
                    });
                });
                Column.backgroundColor("#D5D5D5");
                Column.padding(5);
                Column.borderRadius(15);
                Text.create(item.title);
                Text.fontSize(20);
                Text.fontWeight(FontWeight.Bold);
                Text.textAlign(TextAlign.Center);
                Text.margin(5);
                Text.pop();
                Text.create(item.desc);
                Text.fontSize(16);
                Text.margin(5);
                Text.pop();
                Image.create(item.pic);
                Image.margin(5);
                Column.pop();
                ListItem.pop();
            });
            ForEach.pop();
            List.pop();
        }
        If.pop();
    }
    //页面初始化时调用
    aboutToAppear() {
        this.getData();
    }
    //获取网络数据
    getData() {
        //定义url地址
        let url = "https://api.vvhan.com/api/hotlist?type=baiduRD";
        // 每一个httpRequest对应一个HTTP请求任务，不可复用
        let httpRequest = http.createHttp();
        // 用于订阅HTTP响应头，此接口会比request请求先返回。可以根据业务需要订阅此消息
        // 从API 8开始，使用on('headersReceive', Callback)替代on('headerReceive', AsyncCallback)。 8+
        httpRequest.on('headersReceive', (header) => {
            console.info('header: ' + JSON.stringify(header));
        });
        httpRequest.request(
        // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定
        url, {
            method: http.RequestMethod.POST,
            // 开发者根据自身业务需要添加header字段
            header: {
                'Content-Type': 'application/json'
            },
            // 当使用POST请求时此字段用于传递内容
            extraData: {
                "data": "data to send",
            },
            expectDataType: http.HttpDataType.STRING,
            usingCache: true,
            priority: 1,
            connectTimeout: 60000,
            readTimeout: 60000,
            usingProtocol: http.HttpProtocol.HTTP1_1, // 可选，协议类型默认值由系统自动指定
        }, (err, data) => {
            if (!err) {
                // // data.result为HTTP响应内容，可根据业务需要进行解析
                // console.info('Result:' + JSON.stringify(data.result));
                // console.info('code:' + JSON.stringify(data.responseCode));
                // // data.header为HTTP响应头，可根据业务需要进行解析
                // console.info('header:' + JSON.stringify(data.header));
                // console.info('cookies:' + JSON.stringify(data.cookies)); // 8+
                this.newsData = JSON.parse(data.result.toString());
            }
            else {
                console.info('error:' + JSON.stringify(err));
                // 取消订阅HTTP响应头事件
                httpRequest.off('headersReceive');
                // 当该请求使用完毕时，调用destroy方法主动销毁。
                httpRequest.destroy();
            }
        });
    }
}
