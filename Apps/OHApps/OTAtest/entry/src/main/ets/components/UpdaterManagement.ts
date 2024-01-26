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
import deviceInfo from '@ohos.deviceInfo'
import wifiManager from '@ohos.wifiManager';
import Logger from './Logger'
import router from '@ohos.router';

const upgradeFile = {
  fileType: 1, // OTA包
  filePath: "/data/ota_package/updater.zip" // 本地升级包路径
};

const certsFile = "/etc/certificate/signing_cert.crt"; //本地证书路径
const upgradeFiles = [upgradeFile];

const HAS_NEW_VERSION = true;
const NO_NEW_VERSION = false;
const PACKAGE_NAME = "com.ohos.ota.updateclient";
const TAG = "OUC_DEMO ";


var EventId = {
  EVENT_TASK_BASE: 0x01000000,
  EVENT_TASK_CANCEL: 0x01000002,
  EVENT_DOWNLOAD_WAIT: 0x01000003,
  EVENT_DOWNLOAD_START: 0x01000004,
  EVENT_PROGRESS_UPDATE: 0x01000005,
  EVENT_DOWNLOAD_PAUSE: 0x01000006,
  EVENT_DOWNLOAD_RESUME: 0x01000007,
  EVENT_DOWNLOAD_SUCCESS: 0x01000008,
  EVENT_DOWNLOAD_FAIL: 0x01000009,
  EVENT_UPGRADE_WAIT: 0x01000010,
  EVENT_UPGRADE_START: 0x01000011,
  EVENT_UPGRADE_UPDATE: 0x01000012,
  EVENT_APPLY_WAIT: 0x01000013,
  EVENT_APPLY_START: 0x01000014,
  EVENT_UPGRADE_SUCCESS: 0x01000015,
  EVENT_UPGRADE_FAIL: 0x01000016
}

export enum NewVersionStatus {
  CHECKING = 'CHECKING',
  NO_NEW_VERSION = 'NO_NEW_VERSION',
  HAS_NEW_VERSION = 'HAS_NEW_VERSION',
  DOWNLOAD_NEW_VERSION = 'DOWNLOAD_NEW_VERSION',
  DOWNLOAD_PAUSE = 'DOWNLOAD_PAUSE',
  DOWNLOAD_SUCCESS = 'DOWNLOAD_SUCCESS',
  DOWNLOAD_FAIL = 'DOWNLOAD_FAIL'
}


// 版本摘要信息
let versionDigestInfo = {
  versionDigest: "versionDigest" // 检测结果中的版本摘要信息
};


let eventClassifyInfo = {
  eventClassify: EventId.EVENT_TASK_BASE,
  extraInfo: ""
}

export class UpdaterManagement {
  title: string = "版本号:" + deviceInfo.displayVersion; //标题
  button: string = "查看更新"; //按钮显示
  private localUpdater: update.LocalUpdater;
  pageType: string = "currVersion"; //页面类型
  versionName: string = deviceInfo.displayVersion; //版本名称
  size: string = "200MB"; //升级包大小
  newVersionStatus: string = NewVersionStatus.NO_NEW_VERSION; //新版本状态
  journal: string = "本次更新解决了一些BUG。"; //更新日志
  showUpdateMsg: number = 0; //升级信息展示
  downloadProgress: number = 0; //升级进度
  upgradeInfo: string = ""; //升级信息
  updater: update.Updater; //升级器对象

  static getInstance(): UpdaterManagement {
    return globalThis.UpdaterManagement ?? new UpdaterManagement();
  }

  private constructor() {
    Logger.info('OtaUpdateManager init.');
    globalThis.UpdaterManagement = this;
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
    this.title = "版本号:" + deviceInfo.displayVersion; //标题
    this.button = "正在查询服务器信息"; //按钮显示
    this.pageType = "currVersion"; //页面类型
    this.versionName = deviceInfo.displayVersion; //版本名称
    this.size = "200MB"; //升级包大小
    this.newVersionStatus = NewVersionStatus.NO_NEW_VERSION; //新版本状态
    this.journal = "本次更新解决了一些BUG。"; //更新日志
    this.showUpdateMsg = 0; //升级信息展示
    this.downloadProgress = 0; //升级进度
    this.upgradeInfo = ""; //升级信息
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
    } else if (this.pageType == "downVersion") { // 下载中，取消下载
      this.downloadPause();
    } else if (this.pageType == "downPause") { // 暂停下载，恢复
      this.downloadResume();
    } else if (this.pageType == "downSuccess") { // 出错，退出
      this.upgrade();
    } else if (this.pageType == "errorPage") { // 出错，退出
      router.back();
    }
  }

  //获取下载进度
  async getDownloadStatus() {
    this.updater.on(eventClassifyInfo, eventInfo => { //订阅升级事件
      Logger.info(TAG + "download eventInfo: " + JSON.stringify(eventInfo))
      let progress = {
        status: eventInfo.taskBody?.status,
        percent: eventInfo.taskBody?.progress,
        endReason: eventInfo.taskBody?.errorMessages?.[0]?.errorCode?.toString()
      }
      this.downloadProgress = progress.percent;
      // 下载成功 UpdateState.UPDATE_STATE_DOWNLOAD_SUCCESS
      if (eventInfo.eventId == EventId.EVENT_DOWNLOAD_SUCCESS) {

        this.pageType = "downSuccess";
        this.title = "下载完成";
        this.button = "现在更新";
        this.upgradeInfo = this.versionName + " 安装包下载完成，是否安装？";
        this.newVersionStatus = NewVersionStatus.DOWNLOAD_SUCCESS;
      } else if (eventInfo.eventId == EventId.EVENT_DOWNLOAD_FAIL) { // 失败
        this.pageType = "errorPage";
        this.button = '退出';
        this.title = "下载失败";
        this.newVersionStatus = NewVersionStatus.DOWNLOAD_FAIL;
        if (progress.endReason) {
          this.title = "下载失败，失败原因：" + progress.endReason;
        }
      }
    });
  }

  //下载升级包
  async download() {
    Logger.info(TAG + "download");
    this.getDownloadStatus();
    let downloadOptions = {
      allowNetwork: 1,
      order: 1
    }
    this.updater.download(versionDigestInfo, downloadOptions).then(result => {
      this.newVersionStatus = NewVersionStatus.DOWNLOAD_NEW_VERSION;
      Logger.info(TAG + "updater download result: " + JSON.stringify(result));
    }).catch(error => {
      Logger.error(TAG + "updater download error: " + JSON.stringify(error));
    });

  }

  //暂停下载
  async downloadPause() {
    if (this.pageType == "downVersion") {
      this.pageType = "downPause";
      this.button = "继续下载";
      let pauseDownloadOptions = {
        isAllowAutoResume: true
      }
      this.updater.pauseDownload(versionDigestInfo, pauseDownloadOptions).then(value => {
        Logger.log(`pauseDownload value is ` + value);
      }).catch(err => {
        Logger.log(`pauseDownload error ${JSON.stringify(err)}`);
      });
      this.updater.off(eventClassifyInfo, (eventInfo) => {
        Logger.info(TAG + "upgrade off eventInfo: " + JSON.stringify(eventInfo));
      });
    }
  }

  //恢复下载
  async downloadResume() {
    if (this.pageType == "downPause") {
      this.pageType = "downVersion";
      this.button = "暂停下载";
      let resumeDownloadOptions = {
        allowNetwork: 6, // wifi网络下下载
      };
      this.updater.resumeDownload(versionDigestInfo, resumeDownloadOptions).then(value => {
        Logger.log(`resumeDownload  value is ` + value);
      }).catch(err => {
        Logger.log(`resumeDownload  error ${JSON.stringify(err)}`);
      });
      this.getDownloadStatus();
    }
  }

  //获取当前版本信息以及获取升级任务信息
  async getCurrVersion() {
    Logger.info(TAG + "getCurrVersion");
    if (this.updater == undefined) {
      this.pageType = "errorPage";
      this.button = '退出';
      this.title = "初始化出现错误，退出app";
      return;
    }

    this.updater.getCurrentVersionInfo().then(info => {
      Logger.log(`info osVersion = ${info.osVersion}`);
      Logger.log(`info deviceName = ${info.deviceName}`);
      Logger.log(`info displayVersion = ${info.versionComponents[0].displayVersion}`);
    }).catch(err => {
      Logger.log(`getCurrentVersionInfo promise error ${JSON.stringify(err)}`);
    });

    this.updater.getTaskInfo().then(taskInfo => { //获取当前任务信息
      Logger.info(TAG + "getTaskInfo result: " + JSON.stringify(taskInfo));
      let existTask = taskInfo?.existTask;
      let taskStatus = taskInfo?.taskBody?.status;
      let progress = taskInfo?.taskBody?.progress;

      if (!existTask) { //是否存在已有的升级任务
        this.checkNewVersionLocal(); //没有，检查新版本
      } else {
        this.getNewVersionInfoLocal(taskStatus, progress); //有，获取本地升级任务信息
      }
    });
  }

  //检查新版本
  async checkNewVersionLocal() {
    this.updater.checkNewVersion().then(result => {
      Logger.info(TAG + "checkNewVersion result: " + result.isExistNewVersion);
      console.log(`checkNewVersion versionDigestInfo: ${result.newVersionInfo.versionComponents[0].displayVersion}`);
      if (result.isExistNewVersion == NO_NEW_VERSION || result.newVersionInfo.versionComponents[0].displayVersion <= deviceInfo.displayVersion) { // 已经是新版本
        this.title = "当前已经是新版本";
        this.button = "已是最新版本";
        this.pageType = "lastVersion";
        this.newVersionStatus = NewVersionStatus.NO_NEW_VERSION;
        Logger.info("当前已经是新版本");
      } else if (result.isExistNewVersion == HAS_NEW_VERSION && result.newVersionInfo.versionComponents[0].displayVersion > deviceInfo.displayVersion) {
        this.title = "版本号:" + deviceInfo.displayVersion
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
    this.localUpdater = update.getLocalUpdater()
    this.localUpdater.verifyUpgradePackage(upgradeFile, certsFile).then(() => {
      console.log(`verifyUpgradePackage success`);
      if (wifiManager.isConnected()) {
        wifiManager.disconnect();
      }
      this.localUpdater.applyNewVersion(upgradeFiles).then(() => {
        console.log(`applyNewVersion success`);
      }).catch(err => {
        console.log(`applyNewVersion error ${JSON.stringify(err)}`);
      });
    }).catch(err => {
      console.log(`verifyUpgradePackage error ${JSON.stringify(err)}`);
    });
  }

  async getUpgradePolicy(): Promise<update.UpgradePolicy> {
    return this.updater.getUpgradePolicy().then(policy => {
      Logger.log(`policy downloadStrategy = ${policy.downloadStrategy}`);
      Logger.log(`policy autoUpgradeStrategy = ${policy.autoUpgradeStrategy}`);
      return Promise.resolve(policy);
    }).catch(err => {
      Logger.log(`getUpgradePolicy promise error ${JSON.stringify(err)}`);
      throw err;
    });
  }

  async getDownloadStrategy(): Promise<boolean> {
    return this.updater.getUpgradePolicy().then(policy => {
      Logger.log(`getDownloadStrategy = ${JSON.stringify(policy.downloadStrategy)}`);
      return policy.downloadStrategy;
    }).catch(err => {
      Logger.log(`getDownloadStrategy promise error ${JSON.stringify(err)}`);
      return false;
    });
  }

  async getAutoUpgradeStrategy(): Promise<boolean> {
    return this.updater.getUpgradePolicy().then(policy => {
      Logger.log(`getAutoUpgradeStrategy = ${JSON.stringify(policy.autoUpgradeStrategy)}`);
      return policy.autoUpgradeStrategy;
    }).catch(err => {
      Logger.log(`getAutoUpgradeStrategy promise error ${JSON.stringify(err)}`);
      return false;
    });
  }


  async setUpgradePolicy(downloadStrategy: boolean, autoUpgradeStrategy: boolean) {
    let policy: update.UpgradePolicy = {
      downloadStrategy: downloadStrategy,
      autoUpgradeStrategy: autoUpgradeStrategy,
      autoUpgradePeriods: [{ start: 120, end: 240 }, { start: 120, end: 240 }] // 自动升级时间段，用分钟表示
    };
    this.updater.setUpgradePolicy(policy).then(() => {
      Logger.log(`setUpgradePolicy success`);
    }).catch(err => {
      Logger.log(`setUpgradePolicy promise error ${JSON.stringify(err)}`);
    });
  }
}