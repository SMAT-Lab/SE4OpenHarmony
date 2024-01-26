interface Browser_Params {
    title?: string;
    url?: string;
    isPhone?: boolean;
    controller?: webview.WebviewController;
    // 扩展浏览器对象
    extObj?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Browser_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 westinyang https://gitee.com/ohos-dev
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import webview from '@ohos.web.webview';
import hilog from '@ohos.hilog';
import parameter from '@ohos.systemparameter';
import router from '@ohos.router';
import WindowStageUtil from '../util/WindowStageUtil';
// 自定义UA
const PAD_USER_AGENT: string = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTMl, like Gecko) Chrome/99.0.4844.88 Safari/537.36';
const PHONE_USER_AGENT: string = 'Mozilla/5.0 (Linux; Android 10.0; ohos) AppleWebKit/537.36 (KHTMl, like Gecko) Chrome/99.0.4844.88 HuaweiBrowser/13.0.4.302 Mobile Safari/537.36';
class Browser extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new ObservedPropertySimple(router.getParams()['title'], this, "title");
        this.__url = new ObservedPropertySimple(router.getParams()['url'], this, "url");
        this.__isPhone = new ObservedPropertySimple(false, this, "isPhone");
        this.controller = new webview.WebviewController();
        this.extObj = {
            test: (str) => {
                console.log("extObj.test: " + str);
                return "test " + str;
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Browser_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.url !== undefined) {
            this.url = params.url;
        }
        if (params.isPhone !== undefined) {
            this.isPhone = params.isPhone;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.extObj !== undefined) {
            this.extObj = params.extObj;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__url.aboutToBeDeleted();
        this.__isPhone.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: ObservedPropertySimple<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __url: ObservedPropertySimple<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __isPhone: ObservedPropertySimple<boolean>;
    get isPhone() {
        return this.__isPhone.get();
    }
    set isPhone(newValue: boolean) {
        this.__isPhone.set(newValue);
    }
    private controller: webview.WebviewController;
    onPageShow() {
        console.info('AboutComponent onPageShow');
        WindowStageUtil.setLayoutFullScreen(globalThis.windowStage, WindowStageUtil.COLOR_WHITE, WindowStageUtil.COLOR_BLACK, WindowStageUtil.COLOR_WHITE, WindowStageUtil.COLOR_BLACK);
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.width('100%');
        Text.create(this.title);
        Text.fontColor('#182431');
        Text.fontSize(26);
        Text.fontWeight(500);
        Text.pop();
        Column.pop();
    }
    render() {
        Column.create();
        // 页面标题
        Navigation.create();
        // 页面标题
        Navigation.title({ builder: () => {
                this.NavigationTitle.call(this);
            } });
        // 页面标题
        Navigation.hideToolBar(true);
        // 页面标题
        Navigation.height(56);
        // 页面标题
        Navigation.width('100%');
        // 页面标题
        Navigation.titleMode(NavigationTitleMode.Mini);
        // 页面标题
        Navigation.hideBackButton(false);
        // 页面标题
        Navigation.pop();
        // 加载在线网页
        Web.create({ src: this.url, controller: this.controller });
        // 加载在线网页
        Web.width('100%');
        // 加载在线网页
        Web.height('100%');
        // 加载在线网页
        Web.padding({ bottom: 56 });
        // 加载在线网页
        Web.javaScriptAccess(true);
        // 加载在线网页
        Web.javaScriptProxy({
            object: this.extObj,
            name: "extObj",
            methodList: ["test"],
            controller: this.controller,
        });
        // 加载在线网页
        Web.fileAccess(true);
        // 加载在线网页
        Web.domStorageAccess(true);
        // 加载在线网页
        Web.userAgent(this.isPhone ? PHONE_USER_AGENT : PAD_USER_AGENT);
        // 加载在线网页
        Web.onPageBegin((event) => {
            hilog.info(0x0, '[Index]', `onPageBegin= ${JSON.stringify(event)}`);
        });
        // 加载在线网页
        Web.onPageEnd((event) => {
            hilog.info(0x0, '[Index]', `onPageEnd= ${JSON.stringify(event)}`);
        });
        // 加载在线网页
        Web.onProgressChange((event) => {
            hilog.info(0x0, '[Index]', `onProgressChange`);
        });
        Column.pop();
    }
    aboutToAppear() {
        try {
            let deviceType = parameter.getSync("const.build.characteristics");
            // 修改为：default 也认为是 phone
            if (deviceType === 'phone' || deviceType === 'default') {
                this.isPhone = true;
            }
        }
        catch (e) {
            hilog.info(0x0, '[Index]', `getSync unexpected error: ${e}`);
        }
    }
    // 扩展浏览器对象
    private extObj;
}
loadDocument(new Browser("1", undefined, {}));
