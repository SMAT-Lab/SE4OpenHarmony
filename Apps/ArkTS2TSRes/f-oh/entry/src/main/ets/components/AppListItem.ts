interface AppListItem_Params {
    appInfo?: AppInfo;
    mainAbilityName?: string;
    versionCode?: string;
    installLoading?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AppListItem_" + ++__generate__Id;
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
import { AppInfo, AppActionText, AppStatus } from '../model/AppInfo';
import request from '@ohos.request';
import promptAction from '@ohos.promptAction';
import installer from '@ohos.bundle.installer';
import fs from '@ohos.file.fs';
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
import router from '@ohos.router';
const ToastDuration = 1000;
export default class AppListItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__appInfo = new ObservedPropertyObject(null, this, "appInfo");
        this.__mainAbilityName = new ObservedPropertySimple('', this, "mainAbilityName");
        this.__versionCode = new ObservedPropertySimple('', this, "versionCode");
        this.__installLoading = new ObservedPropertySimple(false, this, "installLoading");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AppListItem_Params) {
        if (params.appInfo !== undefined) {
            this.appInfo = params.appInfo;
        }
        if (params.mainAbilityName !== undefined) {
            this.mainAbilityName = params.mainAbilityName;
        }
        if (params.versionCode !== undefined) {
            this.versionCode = params.versionCode;
        }
        if (params.installLoading !== undefined) {
            this.installLoading = params.installLoading;
        }
    }
    aboutToBeDeleted() {
        this.__appInfo.aboutToBeDeleted();
        this.__mainAbilityName.aboutToBeDeleted();
        this.__versionCode.aboutToBeDeleted();
        this.__installLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __appInfo: ObservedPropertyObject<AppInfo>;
    get appInfo() {
        return this.__appInfo.get();
    }
    set appInfo(newValue: AppInfo) {
        this.__appInfo.set(newValue);
    }
    private __mainAbilityName: ObservedPropertySimple<string>;
    get mainAbilityName() {
        return this.__mainAbilityName.get();
    }
    set mainAbilityName(newValue: string) {
        this.__mainAbilityName.set(newValue);
    }
    private __versionCode: ObservedPropertySimple<string>;
    get versionCode() {
        return this.__versionCode.get();
    }
    set versionCode(newValue: string) {
        this.__versionCode.set(newValue);
    }
    private __installLoading: ObservedPropertySimple<boolean>;
    get installLoading() {
        return this.__installLoading.get();
    }
    set installLoading(newValue: boolean) {
        this.__installLoading.set(newValue);
    }
    aboutToAppear() {
        // 检查应用是否已经安装，并获取指定包名应用的启动Ability名
        let bundleName = this.appInfo.packageName;
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_ABILITY;
        let userId = 100;
        try {
            bundleManager.getBundleInfo(bundleName, bundleFlags, userId, (err, data) => {
                if (err) {
                    // 获取失败
                    hilog.error(0x0000, 'testTag', 'getBundleInfo failed: %{public}s', err.message);
                }
                else {
                    // 获取成功
                    hilog.info(0x0000, 'testTag', 'getBundleInfo successfully: %{public}s', JSON.stringify(data));
                    // 记录包名和版本号
                    this.mainAbilityName = data.hapModulesInfo[0].mainElementName;
                    this.versionCode = data.versionName;
                    // 校验是否有新版本
                    if (this.appInfo.version == this.versionCode) {
                        this.appInfo.status = AppStatus.INSTALLED;
                        this.appInfo.actionText = AppActionText.OPEN;
                    }
                    else {
                        this.appInfo.status = AppStatus.UPDATABLE;
                        this.appInfo.actionText = AppActionText.UPDATE;
                    }
                }
            });
        }
        catch (err) {
            hilog.error(0x0000, 'testTag', 'getBundleInfo failed: %{public}s', err.message);
        }
    }
    render() {
        // 应用信息行
        Flex.create({
            direction: FlexDirection.Row,
            justifyContent: FlexAlign.SpaceBetween,
            alignItems: ItemAlign.Center
        });
        // 应用信息行
        Flex.height(69.6);
        Flex.create({
            direction: FlexDirection.Row,
            justifyContent: FlexAlign.SpaceBetween,
            alignItems: ItemAlign.Center
        });
        Flex.height('100%');
        Flex.onClick(() => {
            if (this.appInfo.hapUrl) {
                router.pushUrl({ url: 'pages/AppDetail', params: { appInfo: this.appInfo, localVersionName: this.versionCode } });
            }
            else {
                promptAction.showToast({ message: '应用信息无效', duration: ToastDuration });
            }
        });
        // 左 应用图标
        Image.create(this.appInfo.getIcon() || $r('app.media.icon_default'));
        // 左 应用图标
        Image.width(55);
        // 左 应用图标
        Image.height(55);
        // 左 应用图标
        Image.border({ width: 0.7, radius: 13, color: '#ebebeb' });
        // 左 应用图标
        Image.flexShrink(0);
        //        .backgroundColor('#00f')
        // 中 应用信息
        Column.create();
        //        .backgroundColor('#00f')
        // 中 应用信息
        Column.height(55);
        //        .backgroundColor('#00f')
        // 中 应用信息
        Column.margin({ left: 10, right: 10 });
        //        .backgroundColor('#00f')
        // 中 应用信息
        Column.alignItems(HorizontalAlign.Start);
        //        .backgroundColor('#00f')
        // 中 应用信息
        Column.flexGrow(1);
        //        .backgroundColor('#00f')
        // 中 应用信息
        Column.justifyContent(FlexAlign.Start);
        Text.create(this.appInfo.name);
        Text.fontSize(16);
        Text.margin({ top: 2, bottom: 5 });
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Text.create(this.appInfo.desc);
        Text.fontSize(12);
        Text.maxLines(2);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        //        .backgroundColor('#00f')
        // 中 应用信息
        Column.pop();
        Flex.pop();
        //      .backgroundColor('#f00')
        // 右 安装按钮
        Column.create();
        //      .backgroundColor('#f00')
        // 右 安装按钮
        Column.width(65);
        //      .backgroundColor('#f00')
        // 右 安装按钮
        Column.height(55);
        //      .backgroundColor('#f00')
        // 右 安装按钮
        Column.flexShrink(0);
        //      .backgroundColor('#f00')
        // 右 安装按钮
        Column.justifyContent(FlexAlign.Center);
        Stack.create();
        Button.createWithLabel(this.appInfo.actionText.toString());
        Button.width('100%');
        Button.height(26);
        Button.fontSize(14);
        Button.fontColor('#3478f6');
        Button.backgroundColor('#eeeeee');
        Button.onClick(() => {
            this.appAction();
        });
        Button.pop();
        Button.createWithChild();
        Button.width('100%');
        Button.height(26);
        Button.fontSize(14);
        Button.fontColor('#3478f6');
        Button.backgroundColor('#eeeeee');
        Button.visibility(this.installLoading ? Visibility.Visible : Visibility.None);
        Row.create();
        Row.alignItems(VerticalAlign.Center);
        Row.width('100%');
        Row.height('100%');
        LoadingProgress.create();
        LoadingProgress.width('100%');
        LoadingProgress.height('100%');
        LoadingProgress.color('#3478f6');
        Row.pop();
        Button.pop();
        Stack.pop();
        //      .backgroundColor('#f00')
        // 右 安装按钮
        Column.pop();
        // 应用信息行
        Flex.pop();
    }
    appAction() {
        if (this.appInfo.status == AppStatus.NOT_INSTALLED) {
            // 校验hapUrl
            if (!this.appInfo.getHapUrl()) {
                promptAction.showToast({ message: '应用下载链接无效', duration: ToastDuration });
                return;
            }
            // 未安装（下载或下载并安装）
            this.downloadApp();
        }
        else if (this.appInfo.status == AppStatus.INSTALLED) {
            // 已安装（打开）
            this.openApp();
        }
        else if (this.appInfo.status == AppStatus.UPDATABLE) {
            // 可更新(更新)
            this.updateApp();
        }
    }
    downloadApp() {
        this.installLoading = true;
        let _this = this;
        let downloadTask;
        // 下载路径，示例: /data/storage/el2/base/haps/entry/files/org.ohosdev.deviceinfo-v1.0.0.hap
        let filePath = globalThis.abilityContext.filesDir + '/' + this.appInfo.packageName + '-' + this.appInfo.version + ".hap";
        // 判断文件是否存在
        fs.access(filePath).then((res) => {
            if (res) {
                // 存在，直接安装
                this.installApp(filePath);
            }
            else {
                // 不存在，下载并安装
                try {
                    request.downloadFile(globalThis.abilityContext, {
                        url: this.appInfo.getHapUrl(),
                        filePath: filePath
                    }).then((data) => {
                        downloadTask = data;
                        // 监听下载完成
                        downloadTask.on('complete', function callback() {
                            console.info('Download task completed.');
                            // 安装应用
                            _this.installApp(filePath);
                        });
                        // 监听下载失败
                        downloadTask.on('fail', function callBack(err) {
                            console.info('Download task failed. Cause:' + err);
                            this.installLoading = false;
                            promptAction.showToast({ message: '下载失败', duration: ToastDuration });
                        });
                    }).catch((err) => {
                        console.error('Failed to request the download. Cause: ' + JSON.stringify(err));
                        this.installLoading = false;
                        promptAction.showToast({ message: '下载失败', duration: ToastDuration });
                    });
                }
                catch (err) {
                    // err.message: bad file path   Download File already exists
                    console.error('err.code : ' + err.code + ', err.message : ' + err.message);
                    this.installLoading = false;
                    promptAction.showToast({ message: '下载失败', duration: ToastDuration });
                }
            }
        }).catch((err) => {
            console.info("access failed with error message: " + err.message + ", error code: " + err.code);
            this.installLoading = false;
        });
    }
    // 安装应用 或 更新应用
    installApp(hapPath: string) {
        let hapFilePaths = [hapPath];
        let installParam = {
            userId: 100,
            isKeepData: false,
            installFlag: 1,
        };
        try {
            installer.getBundleInstaller().then(data => {
                data.install(hapFilePaths, installParam, err => {
                    this.installLoading = false;
                    if (err) {
                        console.error('install failed:' + err.message);
                        promptAction.showToast({ message: this.appInfo.actionText + '失败：' + err.message, duration: ToastDuration });
                    }
                    else {
                        console.info('install successfully.');
                        promptAction.showToast({ message: this.appInfo.actionText + '成功', duration: ToastDuration });
                        // 更改状态和操作文本
                        this.appInfo.status = AppStatus.INSTALLED;
                        this.appInfo.actionText = AppActionText.OPEN;
                    }
                });
            }).catch(error => {
                console.error('getBundleInstaller failed. Cause: ' + error.message);
                this.installLoading = false;
                promptAction.showToast({ message: this.appInfo.actionText + '失败：' + error.message, duration: ToastDuration });
            });
        }
        catch (error) {
            console.error('getBundleInstaller failed. Cause: ' + error.message);
            this.installLoading = false;
            promptAction.showToast({ message: this.appInfo.actionText + '失败：' + error.message, duration: ToastDuration });
        }
    }
    // 打开应用
    openApp() {
        // 检查应用是否已经安装，并获取指定包名应用的启动Ability名
        let bundleName = this.appInfo.packageName;
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_ABILITY;
        let userId = 100;
        try {
            bundleManager.getBundleInfo(bundleName, bundleFlags, userId, (err, data) => {
                if (err) {
                    // 获取失败
                    hilog.error(0x0000, 'testTag', 'getBundleInfo failed: %{public}s', err.message);
                    promptAction.showToast({ message: '打开失败：应用不存在', duration: ToastDuration });
                    this.appInfo.status = AppStatus.NOT_INSTALLED;
                    this.appInfo.actionText = AppActionText.INSTALL;
                }
                else {
                    this.mainAbilityName = data.hapModulesInfo[0].mainElementName;
                    // 获取成功
                    hilog.info(0x0000, 'testTag', 'getBundleInfo successfully: %{public}s', JSON.stringify(data));
                    // 打开应用
                    globalThis.abilityContext.startAbility({
                        bundleName: this.appInfo.packageName,
                        abilityName: this.mainAbilityName,
                        moduleName: '',
                    }).then(() => {
                        console.error('startApplication promise success');
                        //            promptAction.showToast({ message: '打开成功', duration: ToastDuration });
                    }, (err) => {
                        console.error(`startApplication promise error: ${JSON.stringify(err)}`);
                        promptAction.showToast({ message: '打开失败：应用不存在', duration: ToastDuration });
                    });
                }
            });
        }
        catch (err) {
            hilog.error(0x0000, 'testTag', 'getBundleInfo failed: %{public}s', err.message);
            promptAction.showToast({ message: '打开失败：应用不存在', duration: ToastDuration });
            this.appInfo.status = AppStatus.NOT_INSTALLED;
            this.appInfo.actionText = AppActionText.INSTALL;
        }
    }
    updateApp() {
        this.downloadApp();
        /*try {
          promptAction.showDialog({
            title: '更新提示',
            message: this.appInfo.name + '：' + this.versionCode + " → " + this.appInfo.version,
            buttons: [
              {
                text: '取消',
                color: '#000000',
              },
              {
                text: '更新',
                color: '#3478f6',
              }
            ],
          }).then(data => {
            console.info('showDialog success, click button: ' + data.index);
            if (data.index == 1) {
              this.downloadApp()
            }
          }).catch(err => {
            console.info('showDialog error: ' + err);
          })
        } catch (error) {
          console.error(`showDialog args error code is ${error.code}, message is ${error.message}`);
        }*/
    }
}
