let __generate__Id: number = 0;
function generateId(): string {
    return "QueueController_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DownloadContextListener } from '@ohos/okdownload';
import { DownloadContext, QueueSet } from '@ohos/okdownload';
import { DownloadTask } from '@ohos/okdownload';
import { SampleListener } from '@ohos/okdownload';
export class QueueController {
    private taskList: Array<DownloadTask> = [];
    private context: DownloadContext = new QueueSet().commit().build();
    //private listener: QueueListener = new QueueListener();
    public initTasks(listener: DownloadContextListener): DownloadContext {
        let queueSet: QueueSet = new QueueSet();
        queueSet.setParentPath('queue');
        let builder: any = queueSet.commit();
        let url = "http://dldir1.qq.com/weixin/android/weixin6516android1120.apk";
        let boundTask: DownloadTask = builder.bindUrl(url, 'weixin6516android1120.apk');
        url = "https://cdn.llscdn.com/yy/files/tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk";
        boundTask = builder.bindUrl(url, 'tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk');
        url = "https://t.alipayobjects.com/L1/71/100/and/alipay_wap_main.apk";
        boundTask = builder.bindUrl(url, 'alipay_wap_main.apk');
        url = "https://dldir1.qq.com/qqfile/QQforMac/QQ_V6.2.0.dmg";
        boundTask = builder.bindUrl(url, 'QQ_V6.2.0.dmg');
        //    url = "https://zhstatic.zhihu.com/pkg/store/zhihu/futureve-mobile-zhihu-release-5.8.2(596).apk"
        //    boundTask = builder.bindUrl(url, 'futureve')
        url = "http://d1.music.126.net/dmusic/CloudMusic_official_4.3.2.468990.apk";
        boundTask = builder.bindUrl(url, 'CloudMusic_official_4.3.2.468990.apk');
        url = "http://d1.music.126.net/dmusic/NeteaseMusic_1.5.9_622_officialsite.dmg";
        boundTask = builder.bindUrl(url, 'NeteaseMusic_1.5.9_622_officialsite.dmg');
        url = "http://dldir1.qq.com/weixin/Windows/WeChatSetup.exe";
        boundTask = builder.bindUrl(url, 'WeChatSetup.exe');
        url = "https://dldir1.qq.com/foxmail/work_weixin/wxwork_android_2.4.5.5571_100001.apk";
        boundTask = builder.bindUrl(url, 'wxwork_android_2.4.5.5571_100001.apk');
        url = "https://dldir1.qq.com/foxmail/work_weixin/WXWork_2.4.5.213.dmg";
        boundTask = builder.bindUrl(url, 'WXWork_2.4.5.213.dmg');
        builder.setListener(listener);
        this.context = builder.build();
        this.taskList = this.context.getTasks();
        return this.context;
    }
}
