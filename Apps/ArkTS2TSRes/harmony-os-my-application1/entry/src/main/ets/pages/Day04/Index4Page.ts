interface Index4Page_Params {
    type?: string;
    input?: string;
    musics?: Music;
    controller?: TextInputController;
    selectList?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index4Page_" + ++__generate__Id;
}
//@Entry
import router from '@ohos.router';
import http from '@ohos.net.http';
import { Music } from '../../model/Music';
import { MusicPage } from './MusicPage';
export class Index4Page extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__type = new ObservedPropertySimple("", this, "type");
        this.__input = new ObservedPropertySimple("", this, "input");
        this.__musics = new ObservedPropertyObject(null, this, "musics");
        this.addProvidedVar("music", this.__musics, false);
        this.addProvidedVar("musics", this.__musics, false);
        this.controller = new TextInputController();
        this.selectList = [
            { value: 'QQ', type: "qq" },
            { value: '网易', type: "netease" },
            { value: '酷狗', type: "kugou" },
            { value: '酷我', type: "kuwo" }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index4Page_Params) {
        if (params.type !== undefined) {
            this.type = params.type;
        }
        if (params.input !== undefined) {
            this.input = params.input;
        }
        if (params.musics !== undefined) {
            this.musics = params.musics;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.selectList !== undefined) {
            this.selectList = params.selectList;
        }
    }
    aboutToBeDeleted() {
        this.__type.aboutToBeDeleted();
        this.__input.aboutToBeDeleted();
        this.__musics.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __type: ObservedPropertySimple<string>;
    get type() {
        return this.__type.get();
    }
    set type(newValue: string) {
        this.__type.set(newValue);
    }
    private __input: ObservedPropertySimple<string>;
    get input() {
        return this.__input.get();
    }
    set input(newValue: string) {
        this.__input.set(newValue);
    }
    private __musics: ObservedPropertyObject<Music>;
    get musics() {
        return this.__musics.get();
    }
    set musics(newValue: Music) {
        this.__musics.set(newValue);
    }
    private controller: TextInputController;
    private selectList;
    render() {
        Flex.create({ direction: FlexDirection.Column });
        Flex.width('100%');
        Row.create();
        Select.create(this.selectList);
        Select.selected(0);
        Select.value("音乐平台");
        Select.onSelect((index: number) => {
            this.type = this.selectList[index].type;
        });
        Select.width(100);
        Select.pop();
        TextInput.create({ text: this.input, placeholder: '输入歌曲名或歌手名', controller: this.controller });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.height(40);
        TextInput.margin(5);
        TextInput.fontSize(18);
        TextInput.fontColor(Color.Black);
        TextInput.layoutWeight(1);
        TextInput.enterKeyType(EnterKeyType.Search);
        TextInput.onChange((value: string) => {
            this.input = value;
        });
        TextInput.onSubmit((enterKeyType: EnterKeyType) => {
            this.search();
        });
        Image.create($r("app.media.search"));
        Image.onClick(() => {
            this.search();
        });
        Image.width(30);
        Image.height(30);
        Image.margin(5);
        Row.pop();
        let earlierCreatedChild_2: MusicPage = (this && this.findChildById) ? this.findChildById("2") as MusicPage : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MusicPage("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Flex.pop();
    }
    search() {
        var input1 = this.input;
        while (input1.indexOf(" ") >= 0) {
            input1 = input1.replace(" ", "");
        }
        console.info(input1);
        if (this.type == null || this.type == "") {
            AlertDialog.show({
                title: '提示',
                message: "请选择音乐平台",
                autoCancel: true,
                alignment: DialogAlignment.Center,
                confirm: {
                    value: '确认',
                    action: () => {
                    }
                }
            });
        }
        else {
            if (input1 == "") {
                AlertDialog.show({
                    title: '提示',
                    message: "歌曲名为空",
                    autoCancel: true,
                    alignment: DialogAlignment.Center,
                    confirm: {
                        value: '确认',
                        action: () => {
                        }
                    }
                });
            }
            else {
                // router.push({
                //   url: "pages/Day04/MusicPage",
                //   params: {
                //     "url": "https://api.dzzui.com/api/music.php?input=:" + input1 + "&filter=name&type=" + this.type
                //   }
                // })
                this.getData("https://api.dzzui.com/api/music.php?input=:" + input1 + "&filter=name&type=" + this.type);
            }
        }
    }
    //获取网络数据
    getData(url: string) {
        console.info(url);
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
                this.musics = JSON.parse(data.result.toString());
                console.info(this.musics.data.toString());
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
