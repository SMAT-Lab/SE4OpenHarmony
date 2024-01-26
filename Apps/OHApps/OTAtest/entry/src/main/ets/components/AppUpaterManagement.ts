/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import update from '@ohos.update';
import Logger from './Logger'
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
import request from '@ohos.request';
import installer from '@ohos.bundle.installer';
import fileio from '@ohos.fileio';

let hapFilePaths = ['/data/storage/el2/base/haps/entry/files/OTA.hap'];
let installParam = {
  userId: 100,
  isKeepData: false,
  installFlag: 1,
};

let downloadTask
let bundleName = 'com.example.hello';
let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_ABILITY;
let userId = 100;
const HAS_NEW_VERSION = true;
const NO_NEW_VERSION = false;
const PACKAGE_NAME = "com.ohos.ota.updateclient";
const TAG = "OUC_DEMO ";
// 版本摘要信息
let versionDigestInfo = {
  versionDigest: "versionDigest" // 检测结果中的版本摘要信息
};

export enum NewVersionStatus {
  CHECKING = 'CHECKING',
  NO_NEW_VERSION = 'NO_NEW_VERSION',
  HAS_NEW_VERSION = 'HAS_NEW_VERSION',
  DOWNLOAD_NEW_VERSION = 'DOWNLOAD_NEW_VERSION',
  DOWNLOAD_PAUSE = 'DOWNLOAD_PAUSE',
  DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS',
  DOWNLOAD_FAIL = 'DOWNLOAD_FAIL'
}

export class UpdaterManagement {
  title: string = "软件:" + bundleName; //标题
  button: string = "查看更新"; //按钮显示
  pageType: string = "currVersion"; //页面类型
  versionName: string = "查询中..."; //版本名称
  size: string = "200MB"; //升级包大小
  newVersionStatus: string = NewVersionStatus.NO_NEW_VERSION; //新版本状态
  journal: string = "本次更新解决了一些BUG。"; //更新日志
  showUpdateMsg: number = 0; //升级信息展示
  downloadProgress: number = 0; //升级进度
  upgradeInfo: string = ""; //升级信息
  updater: update.Updater; //升级器对象

  getBundleInfo() {
    try {
      bundleManager.getBundleInfo(bundleName, bundleFlags, userId, (err, data) => {
        if (err) {
          this.title = "本机无当前查询应用"
          hilog.error(0x0000, 'testTag', 'getBundleInfo failed: %{public}s', err.message);
        } else {
          this.title = "软件版本号:" + data.name + data.versionName
          this.versionName = data.versionName
          hilog.info(0x0000, 'testTag', 'getBundleInfo successfully: %{public}s', JSON.stringify(data));
        }
      });
    } catch (err) {
      hilog.error(0x0000, 'testTag', 'getBundleInfo failed: %{public}s', err.message);
    }
  }

  static getInstance(): UpdaterManagement {
    return globalThis.UpdaterManagement1 ?? new UpdaterManagement();
  }

  private constructor() {
    Logger.info('OtaUpdateManager init.');
    globalThis.UpdaterManagement1 = this;
    //获取在线升级对象并检测新版本
    let businessType: {
      vendor: update.BusinessVendor.PUBLIC,
      subType: update.BusinessSubType.FIRMWARE
    }
    let upgradeInfo: update.UpgradeInfo = {
      upgradeApp: PACKAGE_NAME,
      businessType: businessType
    };
    try {
      this.updater = update.getOnlineUpdater(upgradeInfo);
    } catch (error) {
      Logger.error(TAG + "onInit error: " + JSON.stringify(error));
    }

  }

  async onInit() {
    this.getBundleInfo()
  }
  //点击更新按钮状态
  async onClick() {
    if (this.pageType == "currVersion") { // 检查更新版本
      this.pageType = "checkVersion";
      this.showUpdateMsg = 1;
      this.button = "取消查看";
      this.checkNewVersion();
    } else if (this.pageType == "newVersion") { // 当前需要下载新的版本
      this.pageType = "downVersion";
      this.button = "暂停下载";
      if (this.updater == undefined) {
        this.pageType = "errorPage";
        this.button = '退出';
        this.title = "初始化出现错误，退出app";
        return;
      }
      this.download()
    } else if (this.pageType == "lastVersion") { // 已经是新的版本了，单击后退出页面
    } else if (this.pageType == "checkVersion") { // 检查中，取消检查
    } else if (this.pageType == "downSuccess") { // 出错，退出
      this.upgrade();
    } else if (this.pageType == "errorPage") { // 出错，退出
    }
  }
  //下载升级包
  async down() {
    try {
      request.downloadFile(globalThis.context, { url: this.journal,
        filePath: '/data/storage/el2/base/haps/entry/files/OTA.hap' }, (err, data) => {
        downloadTask = data;
        downloadTask.on('progress', (receivedSize, totalSize) => {
          if (receivedSize != totalSize) {
            this.title = (parseInt(receivedSize) / 1024 / 1024).toFixed(2) + "MB/" + (parseInt(totalSize) / 1024 / 1024).toFixed(2) + "MB"
          } else {
            this.title = (parseInt(receivedSize) / 1024 / 1024).toFixed(2) + "MB/" + (parseInt(totalSize) / 1024 / 1024).toFixed(2) + "MB"
            this.newVersionStatus = NewVersionStatus.DOWNLOAD_SUCCESS;
            this.pageType = "downSuccess"
            this.button = "现在升级"
          }
        });
        if (err) {
          this.title = "下载失败"
          this.newVersionStatus = NewVersionStatus.DOWNLOAD_FAIL;
          console.error('Failed to request the download. Cause: ' + JSON.stringify(err));
          return;
        }
      });
    } catch (err) {
      this.newVersionStatus = NewVersionStatus.DOWNLOAD_FAIL;
      this.title = "下载失败"
      console.error('err.code : ' + err.code + ', err.message : ' + err.message);
    }
  }

  async download() {
    fileio.access('/data/storage/el2/base/haps/entry/files/OTA.hap').then(() => {
      fileio.unlink('/data/storage/el2/base/haps/entry/files/OTA.hap').then(() => {
        this.down()
        console.info(TAG + "remove file succeed");
      }).catch(function (error) {
        console.info(TAG + "remove file failed with error:" + error);
      });
      console.info(TAG + "access succeed");
    }).catch((err) => {
      this.down()
      console.info(TAG + "access failed with error:" + err);
    });
  }
  //获取当前版本信息以及获取升级任务信息
  async getCurrVersion() {
    Logger.info(TAG + "getCurrVersion");
    this.checkNewVersionLocal(); //没有，检查新版本
  }
  //检查新版本
  async checkNewVersionLocal() {
    this.updater.checkNewVersion().then(result => {
      Logger.info(TAG + "checkNewVersion result: " + result.isExistNewVersion);
      console.log(TAG + `checkNewVersion versionDigestInfo: ${result.newVersionInfo.versionComponents[0].displayVersion}`);
      console.log(TAG + this.versionName)
      if (result.isExistNewVersion == NO_NEW_VERSION || result.newVersionInfo.versionComponents[0].displayVersion <= this.versionName) { // 已经是新版本
        this.title = "当前已经是新版本";
        this.button = "已是最新版本";
        this.pageType = "lastVersion";
        this.newVersionStatus = NewVersionStatus.NO_NEW_VERSION;
        Logger.info("当前已经是新版本");
      } else if (result.isExistNewVersion == HAS_NEW_VERSION && result.newVersionInfo.versionComponents[0].displayVersion > this.versionName) {
        this.button = "查看更新";
        this.pageType = "currVersion";
        this.versionName = result?.newVersionInfo?.versionComponents?.[0]?.displayVersion;
        this.newVersionStatus = NewVersionStatus.HAS_NEW_VERSION;
        Logger.info("检测到新版本");
      } else {
        this.title = "获取新版本失败";
        this.newVersionStatus = NewVersionStatus.NO_NEW_VERSION
      }
    }).catch(error => {
      Logger.info(TAG + "checkNewVersion error: " + JSON.stringify(error));
      this.pageType = "errorPage";
      this.button = '退出';
      this.title = "检查新版本失败，请检测网络连接与服务器ip";
      if (error.errorNum) {
        this.title = "检查新版本失败，请检测网络连接与服务器ip";
      }
    });
  }
  //获取本地新版本的升级信息
  async getNewVersionInfoLocal(taskStatus, progress) {
    this.updater.getNewVersionInfo().then(data => {
      Logger.info(TAG + "getNewVersionInfo result: " + JSON.stringify(data));
      if (taskStatus == 24) { //已经有下载完成的升级包，进入是否升级界面
        Logger.info("DOWNLOAD_SUCCESS");
        this.newVersionStatus = NewVersionStatus.DOWNLOAD_SUCCESS;
        this.versionName = data?.versionComponents?.[0]?.displayVersion;
        this.pageType = "downSuccess";
        this.title = "下载完成";
        this.button = "现在更新";
      }
      else if (taskStatus == 20) { //有正在下载的任务，显示下载进度。
        Logger.info("DOWNLOADing");
        this.newVersionStatus = NewVersionStatus.DOWNLOAD_NEW_VERSION;
        this.versionName = data?.versionComponents?.[0]?.displayVersion;
        this.pageType = "downPause";
        this.button = "继续下载";
        this.downloadProgress = progress;
      }
      else { //重新检查新版本信息
        this.checkNewVersionLocal();
      }
    }).catch(error => {
      Logger.info(TAG + "getNewVersionInfo error: " + JSON.stringify(error));
      this.pageType = "errorPage";
      this.button = '退出';
      this.title = "检查新版本失败";
      if (error.errorNum) {
        this.title = "检查新版本失败，失败原因：" + error.errorNum;
      }
    });
  }
  //检测新版本信息
  async checkNewVersion() {
    if (this.updater == undefined) {
      this.pageType = "errorPage";
      this.button = '退出';
      this.title = "初始化出现错误，退出app";
      return;
    }
    Logger.info(TAG + "checkNewVersion");
    this.updater.getNewVersionInfo().then(info => {
      Logger.info(TAG + "checkNewVersion getNewVersionInfo: " + JSON.stringify(info));
      versionDigestInfo = info?.versionDigestInfo;
      let size = info?.versionComponents?.[0]?.size / 1024 / 1024;
      this.versionName = info?.versionComponents?.[0]?.displayVersion;
      this.size = String(size.toFixed(2)) + "MB";
      if (info?.versionComponents?.[0]?.descriptionInfo?.content != undefined) {
        this.journal = info?.versionComponents?.[0]?.descriptionInfo?.content;
      }
      this.pageType = "newVersion";
      this.button = "下载更新包";
    }).catch(error => {
      this.pageType = "errorPage";
      this.button = '退出';
      this.title = "检查新版本失败";
      if (error.errorNum) {
        this.title = "检查新版本失败，失败原因：" + error.errorNum;
      }
    });
  }

  async upgrade() {
    installer.getBundleInstaller().then(data => {
      data.install(hapFilePaths, installParam, err => {
        if (err) {
          this.title = "升级失败" + 'install failed:' + err.message
          console.error('install failed:' + err.message);
        } else {
          this.title = "升级成功"
          console.info('install successfully.');
        }
      });
    }).catch(error => {
      console.error('getBundleInstaller failed. Cause: ' + error.message);
    });
  }
}