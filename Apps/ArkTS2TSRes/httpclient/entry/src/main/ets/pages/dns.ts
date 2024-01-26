interface dns_Params {
    url?: string;
    ipUrl?: string;
    jdUrl?: string;
    baiduUrl?: string;
    urlTest?: string;
    result?: string;
    scroller?: Scroller;
    hereResourceManager?: resmgr.ResourceManager;
    TEST_CA?;
    TEST_OTHER_CA?;
    BAIDU_TEST_CA?;
    BAIDU_OTHER_CA?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "dns_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Chain, Dns, HttpClient, Interceptor, Logger, Request, Response, TimeUnit, Utils } from '@ohos/httpclient';
import connection from '@ohos.net.connection';
import resmgr from '@ohos.resourceManager';
import { Utils as UtilCA } from '../utils/Utils';
import { BusinessError } from '@ohos/httpclient/src/main/ets/http';
class dns extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__url = new ObservedPropertySimple('https://www.wanandroid.com/hotkey/json', this, "url");
        this.__ipUrl = new ObservedPropertySimple('https://47.104.74.169/hotkey/json', this, "ipUrl");
        this.__jdUrl = new ObservedPropertySimple('https://www.jd.com', this, "jdUrl");
        this.__baiduUrl = new ObservedPropertySimple('https://www.baidu.com', this, "baiduUrl");
        this.__urlTest = new ObservedPropertySimple('http://139.9.199.99:3000', this, "urlTest");
        this.__result = new ObservedPropertySimple('响应结果', this, "result");
        this.scroller = new Scroller();
        this.hereResourceManager = getContext().resourceManager;
        this.TEST_CA = 'wanandroidRoot.crt';
        this.TEST_OTHER_CA = 'wanandroidRSA.crt';
        this.BAIDU_TEST_CA = 'BaiduGlobalSign.crt';
        this.BAIDU_OTHER_CA = 'BaiduSSLCA.crt';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: dns_Params) {
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.ipUrl !== undefined) {
            this.ipUrl = params.ipUrl;
        }
        if (params.jdUrl !== undefined) {
            this.jdUrl = params.jdUrl;
        }
        if (params.baiduUrl !== undefined) {
            this.baiduUrl = params.baiduUrl;
        }
        if (params.urlTest !== undefined) {
            this.urlTest = params.urlTest;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.hereResourceManager !== undefined) {
            this.hereResourceManager = params.hereResourceManager;
        }
        if (params.TEST_CA !== undefined) {
            this.TEST_CA = params.TEST_CA;
        }
        if (params.TEST_OTHER_CA !== undefined) {
            this.TEST_OTHER_CA = params.TEST_OTHER_CA;
        }
        if (params.BAIDU_TEST_CA !== undefined) {
            this.BAIDU_TEST_CA = params.BAIDU_TEST_CA;
        }
        if (params.BAIDU_OTHER_CA !== undefined) {
            this.BAIDU_OTHER_CA = params.BAIDU_OTHER_CA;
        }
    }
    aboutToBeDeleted() {
        this.__url.aboutToBeDeleted();
        this.__ipUrl.aboutToBeDeleted();
        this.__jdUrl.aboutToBeDeleted();
        this.__baiduUrl.aboutToBeDeleted();
        this.__urlTest.aboutToBeDeleted();
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    /**
     * 配置类
     *
     * 额外提供三个测试域名
     * @State url: string = 'https://mail.qq.com';
     * @State url: string = 'https://news.qq.com';
     * @State url: string = 'http://hshapp.ncn.com.cn/wisdom3/config/config.do';
     * https://www.wanandroid.com对应的dns为https://47.104.74.169
     * 对应证书目录：httpclient-master\entry\src\main\resources\rawfile
     */
    private __url: ObservedPropertySimple<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __ipUrl: ObservedPropertySimple<string>;
    get ipUrl() {
        return this.__ipUrl.get();
    }
    set ipUrl(newValue: string) {
        this.__ipUrl.set(newValue);
    }
    private __jdUrl: ObservedPropertySimple<string>;
    get jdUrl() {
        return this.__jdUrl.get();
    }
    set jdUrl(newValue: string) {
        this.__jdUrl.set(newValue);
    }
    private __baiduUrl: ObservedPropertySimple<string>;
    get baiduUrl() {
        return this.__baiduUrl.get();
    }
    set baiduUrl(newValue: string) {
        this.__baiduUrl.set(newValue);
    }
    private __urlTest: ObservedPropertySimple<string>;
    get urlTest() {
        return this.__urlTest.get();
    }
    set urlTest(newValue: string) {
        this.__urlTest.set(newValue);
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private scroller: Scroller;
    private hereResourceManager: resmgr.ResourceManager;
    private TEST_CA;
    private TEST_OTHER_CA;
    private BAIDU_TEST_CA;
    private BAIDU_OTHER_CA;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.height('10%');
        Row.width('100%');
        Navigator.create({
            target: '',
            type: NavigationType.Back
        });
        Text.create('BACK');
        Text.fontSize(10);
        Text.border({
            width: 1
        });
        Text.padding(10);
        Text.fontColor(0x000000);
        Text.borderColor(0x317aff);
        Text.pop();
        Navigator.pop();
        Row.pop();
        //输入对应的Url，这里默认为“'https://www.wanandroid.com/hotkey/json'
        TextInput.create({ text: this.url, placeholder: '请输入URL' });
        //输入对应的Url，这里默认为“'https://www.wanandroid.com/hotkey/json'
        TextInput.placeholderColor('#ffffff');
        //输入对应的Url，这里默认为“'https://www.wanandroid.com/hotkey/json'
        TextInput.caretColor(Color.Blue);
        //输入对应的Url，这里默认为“'https://www.wanandroid.com/hotkey/json'
        TextInput.height('150px');
        //输入对应的Url，这里默认为“'https://www.wanandroid.com/hotkey/json'
        TextInput.fontSize('18fp');
        //输入对应的Url，这里默认为“'https://www.wanandroid.com/hotkey/json'
        TextInput.onChange((value: string) => {
            this.url = value;
        });
        Button.createWithLabel('请求DNS方法1：正常可连接');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async (event: ClickEvent) => {
            Logger.info('DNSTEST HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new CustomDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info('DNSTEST HttpClient end');
            let context: Context = getContext();
            //获取CA证书
            let CA: string = await new UtilCA().getCA(this.TEST_CA, context);
            let otherCA: string = await new UtilCA().getCA(this.TEST_OTHER_CA, context);
            Logger.info('DNSTEST request begin');
            let request: Request = new Request.Builder()
                .url(this.url)
                .method('GET')
                .ca([CA, otherCA])
                .build();
            Logger.info('DNSTEST request end');
            //异步发送网络请求
            client.newCall(request).enqueue((result: Response) => {
                this.result = '响应结果1' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info('dns---success---' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: BusinessError) => {
                this.result = '响应结果1' + JSON.stringify(err);
                Logger.info('dns---failed---', JSON.stringify(err));
            });
        });
        Button.pop();
        //在原网络地址中，新增8.8.8.8地址
        Button.createWithLabel('请求DNS方法2：自定义DNS传入');
        //在原网络地址中，新增8.8.8.8地址
        Button.width('80%');
        //在原网络地址中，新增8.8.8.8地址
        Button.height('80px');
        //在原网络地址中，新增8.8.8.8地址
        Button.fontSize(18);
        //在原网络地址中，新增8.8.8.8地址
        Button.fontColor(0xCCCCCC);
        //在原网络地址中，新增8.8.8.8地址
        Button.align(Alignment.Center);
        //在原网络地址中，新增8.8.8.8地址
        Button.margin(10);
        //在原网络地址中，新增8.8.8.8地址
        Button.onClick(async (event: ClickEvent) => {
            //构建http链接
            Logger.info('DNSTEST2 HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new CustomAddDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info('DNSTEST2 HttpClient end');
            let context: Context = getContext();
            let CA: string = await new UtilCA().getCA(this.BAIDU_TEST_CA, context);
            let otherCA: string = await new UtilCA().getCA(this.BAIDU_OTHER_CA, context);
            Logger.info('DNSTEST2 request begin');
            let request: Request = new Request.Builder()
                .url(this.baiduUrl)
                .method('GET')
                .ca([CA, otherCA])
                .build();
            Logger.info('DNSTEST2 request end');
            client.newCall(request).enqueue((result: Response) => {
                this.result = '响应结果2' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info('dns2---success---' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: BusinessError) => {
                this.result = '响应结果2' + JSON.stringify(err);
                Logger.info('dns2---failed---', JSON.stringify(err));
            });
        });
        //在原网络地址中，新增8.8.8.8地址
        Button.pop();
        //传入默认的域名，然后重定义到百度
        Button.createWithLabel('请求DNS方法3：重定向到百度');
        //传入默认的域名，然后重定义到百度
        Button.width('80%');
        //传入默认的域名，然后重定义到百度
        Button.height('80px');
        //传入默认的域名，然后重定义到百度
        Button.fontSize(18);
        //传入默认的域名，然后重定义到百度
        Button.fontColor(0xCCCCCC);
        //传入默认的域名，然后重定义到百度
        Button.align(Alignment.Center);
        //传入默认的域名，然后重定义到百度
        Button.margin(10);
        //传入默认的域名，然后重定义到百度
        Button.onClick(async (event: ClickEvent) => {
            //构建http链接
            Logger.info('DNSTEST3  HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new CustomChangeDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info('DNSTEST3 HttpClient end');
            let context: Context = getContext();
            let CA: string = await new UtilCA().getCA(this.BAIDU_TEST_CA, context);
            let otherCA: string = await new UtilCA().getCA(this.BAIDU_OTHER_CA, context);
            Logger.info('DNSTEST3 request begin');
            let request: Request = new Request.Builder()
                .url(this.baiduUrl)
                .method('GET')
                .ca([CA, otherCA])
                .build();
            Logger.info('DNSTEST3 request end');
            client.newCall(request).enqueue((result: Response) => {
                this.result = '响应结果3' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info('dns---success---' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: BusinessError) => {
                this.result = '响应结果3' + JSON.stringify(err);
                Logger.info('dns---failed--- ', JSON.stringify(err));
            });
        });
        //传入默认的域名，然后重定义到百度
        Button.pop();
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.createWithLabel('请求DNS方法4：2303501');
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.width('80%');
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.height('80px');
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.fontSize(18);
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.fontColor(0xCCCCCC);
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.align(Alignment.Center);
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.margin(10);
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.onClick(async (event: ClickEvent) => {
            //构建http链接
            this.url = this.baiduUrl;
            Logger.info('DNSTEST4 HttpClient begin new url', this.url);
            Logger.info('DNSTEST4 HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new CustomConnectDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info('DNSTEST4 HttpClient end');
            let context: Context = getContext();
            let CA: string = await new UtilCA().getCA(this.TEST_CA, context);
            let otherCA: string = await new UtilCA().getCA(this.TEST_OTHER_CA, context);
            Logger.info('DNSTEST4 request begin');
            let request: Request = new Request.Builder()
                .url(this.baiduUrl)
                .method('GET')
                .ca([CA, otherCA])
                .build();
            Logger.info('DNSTEST request end');
            client.newCall(request).enqueue((result: Response) => {
                this.result = '响应结果4' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info('dns---success---' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: BusinessError) => {
                this.result = '响应结果4' + JSON.stringify(err);
                Logger.info('dns---failed---', JSON.stringify(err));
            });
        });
        //通过传入错误证书证书，报错2303501
        //百度{'address':'153.3.238.102','family':1,'port':0}
        Button.pop();
        //传入空的dns地址，抛出错误
        Button.createWithLabel('请求DNS方法5：2100002');
        //传入空的dns地址，抛出错误
        Button.width('80%');
        //传入空的dns地址，抛出错误
        Button.height('80px');
        //传入空的dns地址，抛出错误
        Button.fontSize(18);
        //传入空的dns地址，抛出错误
        Button.fontColor(0xCCCCCC);
        //传入空的dns地址，抛出错误
        Button.align(Alignment.Center);
        //传入空的dns地址，抛出错误
        Button.margin(10);
        //传入空的dns地址，抛出错误
        Button.onClick(async (event: ClickEvent) => {
            //构建http链接
            Logger.info('DNSTEST5 HttpClient begin');
            let client: HttpClient = new HttpClient
                .Builder()
                .dns(new CustomEmptyDns())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            Logger.info('DNSTEST5 HttpClient end');
            let context: Context = getContext();
            let CA: string = await new UtilCA().getCA(this.TEST_CA, context);
            let otherCA: string = await new UtilCA().getCA(this.TEST_OTHER_CA, context);
            Logger.info('DNSTEST5 request begin');
            let request: Request = new Request.Builder()
                .url(this.baiduUrl)
                .method('GET')
                .ca([CA, otherCA])
                .build();
            Logger.info('DNSTEST5 request end');
            client.newCall(request).enqueue((result: Response) => {
                this.result = '响应结果5' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4);
                Logger.info('dns---success---' + JSON.stringify(JSON.parse(JSON.stringify(result)), null, 4));
            }, (err: BusinessError) => {
                this.result = '响应结果5' + JSON.stringify(err);
                Logger.info('dns---failed---', JSON.stringify(err));
            });
        });
        //传入空的dns地址，抛出错误
        Button.pop();
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.createWithLabel('拦截器方法');
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.width('80%');
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.height('80px');
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.fontSize(18);
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.fontColor(0xCCCCCC);
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.align(Alignment.Center);
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.margin(10);
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.onClick(async (event: ClickEvent) => {
            let client: HttpClient = new HttpClient
                .Builder()
                .addInterceptor(new CustomInterceptor())
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            let context: Context = getContext();
            let CA: string = await new UtilCA().getCA(this.TEST_CA, context);
            let otherCA: string = await new UtilCA().getCA(this.TEST_OTHER_CA, context);
            let request: Request = new Request.Builder()
                .url(this.url)
                .method('GET')
                .ca([CA, otherCA])
                .build();
            client.newCall(request).enqueue((result: Response) => {
                this.result = '响应结果\r\n' + JSON.stringify(result.result);
                Logger.info('interceptor---success---' + JSON.stringify(result.result));
            }, (err: BusinessError) => {
                this.result = '响应结果\r\n' + JSON.stringify(err);
                Logger.info('interceptor---failed---', JSON.stringify(err));
            });
        });
        //需要对应'https://www.wanandroid.com/hotkey/json';
        Button.pop();
        Button.createWithLabel('清理');
        Button.width('80%');
        Button.height('80px');
        Button.fontSize(18);
        Button.fontColor(0xCCCCCC);
        Button.align(Alignment.Center);
        Button.margin(10);
        Button.onClick(async (event: ClickEvent) => {
            this.clear();
        });
        Button.pop();
        Scroll.create();
        Scroll.width('100%');
        Scroll.layoutWeight(1);
        Column.create();
        Text.create(this.result);
        Text.width('80%');
        Text.fontSize('18fp');
        Text.margin(10);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    clear() {
        this.result = '';
    }
}
/**
 * 自定义CustomDns实现dns
 *
 * 只对域名进行解析
 * @netAddress 网络地址，里面携带了dns
 * @err 错误值
 */
export class CustomDns implements Dns {
    lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        Logger.info('DNSTEST CustomDns begin here');
        return new Promise((resolve, reject) => {
            connection.getAddressesByName(hostname).then((netAddress) => {
                //解析出来的网址|1是Ipv4，2是IPV6|端口号
                Logger.info('DNSTEST netAddress = ' + JSON.stringify(netAddress));
                resolve(netAddress);
                Logger.info('DNSTEST CustomDns end');
            }).catch((err: BusinessError) => {
                reject(err);
            });
        });
    }
}
/**
 * 自定义CustomAddDns实现dns
 *
 * 进行解析，并且传入自定义dns
 * @netAddress 网络地址，里面携带了dns
 * @err 错误值
 */
export class CustomAddDns implements Dns {
    lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        Logger.info('DNSTEST2 CustomDns2 begin here');
        return new Promise((resolve, reject) => {
            connection.getAddressesByName(hostname).then((netAddress) => {
                Logger.info('DNSTEST2 netAddress = ' + JSON.stringify(netAddress));
                if (netAddress) {
                    //自定义，传入一个网络地址（两种都行）
                    netAddress.push({ 'address': '8.8.8.8', 'family': 1, 'port': 0 });
                    netAddress.push({ 'address': '9.9.9.9' });
                    resolve(netAddress);
                    Logger.info('DNSTEST2 new netAddress = ' + JSON.stringify(netAddress));
                    Logger.info('DNSTEST2 CustomDns end');
                }
                else {
                    // 如果netAddress为空，可以执行这里的其他逻辑
                    Logger.error('DNSTEST2 netAddress is empty');
                    let defaultNetAddress: Array<connection.NetAddress> = [{
                            'address': '153.3.238.102',
                            'family': 1,
                            'port': 443
                        }];
                    resolve(defaultNetAddress);
                }
            }).catch((err: BusinessError) => {
                reject(err);
            });
        });
    }
}
/**
 * 自定义CustomChangeDns实现dns
 *
 * 进行解析，并且传入将其dns重定向到百度
 * @netAddress 网络地址，里面携带了dns
 * @err 错误值
 */
export class CustomChangeDns implements Dns {
    lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        Logger.info('DNSTEST3  CustomDns  begin here ');
        return new Promise((resolve, reject) => {
            connection.getAddressesByName(hostname).then((netAddress) => {
                Logger.info('DNSTEST3 netAddress = ' + JSON.stringify(netAddress));
                if (netAddress) {
                    //重定义到百度地址
                    netAddress = [{ 'address': '153.3.238.102', 'family': 1, 'port': 0 }];
                    Logger.info('DNSTEST3  new netAddress = ' + JSON.stringify(netAddress));
                    resolve(netAddress);
                    Logger.info('DNSTEST3  CustomDns end');
                }
                else {
                    // 如果netAddress为空，可以执行这里的其他逻辑
                    Logger.error('DNSTEST3 netAddress is empty');
                    let defaultNetAddress: Array<connection.NetAddress> = [{
                            'address': '153.3.238.102',
                            'family': 1,
                            'port': 443
                        }];
                    resolve(defaultNetAddress);
                }
            }).catch((err: BusinessError) => {
                reject(err);
            });
        });
    }
}
/**
 * 自定义CustomConnectDns实现dns
 *
 * 模拟异常场景，加入解析有问题，将dns取默认
 * @netAddress 网络地址，里面携带了dns
 * @err 错误值
 */
export class CustomConnectDns implements Dns {
    lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        Logger.info('DNSTEST4  CustomDns  begin here ');
        return new Promise((resolve, reject) => {
            connection.getAddressesByName(hostname).then((netAddress) => {
                Logger.info('DNSTEST4 netAddress = ' + JSON.stringify(netAddress));
                if (netAddress) {
                    //模拟异常场景，若解析出来的dns为空，则将网站取默认
                    Logger.error('netAddress is empty');
                    let nonaddress: Array<connection.NetAddress> = [{
                            'address': '153.3.238.102',
                            'family': 1,
                            'port': 443
                        }];
                    resolve(nonaddress);
                }
                else {
                    resolve(netAddress);
                }
            }).catch((err: BusinessError) => {
                reject(err);
            });
        });
    }
}
/**
 * 自定义CustomEmptyDns实现dns
 *
 * 模拟异常场景，传入一个空的地址
 * @netAddress 网络地址，里面携带了dns
 * @err 错误值
 */
export class CustomEmptyDns implements Dns {
    lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        Logger.info('DNSTEST5 CustomDns begin here ');
        return new Promise((resolve, reject) => {
            connection.getAddressesByName(hostname).then((netAddress) => {
                Logger.info('DNSTEST5 netAddress = ' + JSON.stringify(netAddress));
                if (netAddress) {
                    // 重定义到一个空地址
                    netAddress = [{ 'address': '' }];
                    Logger.info('DNSTEST5 new netAddress = ' + JSON.stringify(netAddress));
                    resolve(netAddress);
                    Logger.info('DNSTEST5 CustomDns end');
                }
                else {
                    // 如果netAddress为空，可以执行这里的其他逻辑
                    Logger.error('DNSTEST5 netAddress is empty');
                    let defaultNetAddress: Array<connection.NetAddress> = [{
                            'address': '153.3.238.102',
                            'family': 1,
                            'port': 443
                        }];
                    resolve(defaultNetAddress);
                }
            }).catch((err: BusinessError) => {
                reject(err);
            });
        });
    }
}
/**
 * 自定义拦截器
 *
 * 自定义拦截器实现
 * @Response Response对象
 * @err 错误值
 */
export class CustomInterceptor implements Interceptor {
    intercept(chain: Chain): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            let originRequest: Request = chain.requestI();
            let url: string = originRequest.url.getUrl();
            let host: string = Utils.getDomainOrIp(url);
            connection.getAddressesByName(host).then((netAddress) => {
                let newRequest: any = originRequest.newBuilder();
                if (!!netAddress) {
                    if (Utils.isIPv6(netAddress[0].address)) {
                        let ipv4Address: Array<connection.NetAddress> = [];
                        let ipv6Address: Array<connection.NetAddress> = [];
                        for (let i = 0, len = netAddress.length; i < len; i++) {
                            if (Utils.isIPv6(netAddress[i].address)) {
                                ipv6Address.push(netAddress[i]);
                            }
                            else {
                                ipv4Address.push(netAddress[i]);
                            }
                        }
                        netAddress = [];
                        netAddress = netAddress.concat(ipv4Address).concat(ipv6Address);
                    }
                    url = url.replace(host, netAddress[0].address);
                    newRequest.url(url);
                }
                newRequest.dnsInterceptor();
                let newResponse: Promise<Response> = chain.proceedI(newRequest.build());
                resolve(newResponse);
            }).catch((err: BusinessError) => {
                reject(err);
            });
        });
    }
}
loadDocument(new dns("1", undefined, {}));
