interface Second_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Second_" + ++__generate__Id;
}
// Second.ets
// 导入socket模块
import router from '@ohos.router';
import prompt from '@system.prompt';
import wifi from '@ohos.wifi';
import { resolveIP } from '../Utils/SocketUtil';
let ipInfo = wifi.getIpInfo();
let localIp = resolveIP(ipInfo.ipAddress);
let serverIp = resolveIP(ipInfo.serverIp);
class Second extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Second_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Row.create();
        Row.width('80%');
        Text.create('本地IP: ');
        Text.fontSize(25);
        Text.width('30%');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(localIp);
        Text.fontSize(25);
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('80%');
        Text.create('路由IP: ');
        Text.fontSize(25);
        Text.width('30%');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(serverIp);
        Text.fontSize(25);
        Text.pop();
        Row.pop();
        Text.create('确定');
        Text.height(50);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.borderRadius(20);
        Text.fontSize(25);
        Text.width('80%');
        Text.margin({ top: 45 });
        Text.backgroundColor('#1890ff');
        Text.onClick(() => {
            if (localIp === '' || localIp === '0.0.0.0') {
                prompt.showToast({
                    message: '请检查网络环境'
                });
                return;
            }
            router.pushUrl({
                url: 'pages/Third',
                params: { localIp: localIp, serverIp: serverIp }
            });
        });
        Text.pop();
        Flex.pop();
    }
}
loadDocument(new Second("1", undefined, {}));
