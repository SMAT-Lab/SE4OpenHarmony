let __generate__Id: number = 0;
function generateId(): string {
    return "resModel_" + ++__generate__Id;
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
export class ResModel {
    id: number;
    name: string;
    progress: number; //进度
    priority: number; //优先级
    url: string; //资源链接
    //status: string; //下载状态
    constructor(id: number, name: string, progress: number, priority: number, url: string) {
        this.id = id;
        this.name = name;
        this.progress = progress;
        this.priority = priority;
        this.url = url;
    }
}
export function getResList(): Array<ResModel> {
    return [
        {
            id: 1,
            name: 'WeChat',
            //progress: this.progress,
            progress: 10,
            priority: 2,
            url: 'http://dldir1.qq.com/weixin/android/weixin6516android1120.apk'
        },
        {
            id: 2,
            name: 'LiuLiShuo',
            progress: 20,
            priority: 4,
            url: 'https://cdn.llscdn.com/yy/files/tkzpx40x-lls-LLS-5.7-785-20171108-111118.apk'
        },
        {
            id: 3,
            name: 'Alipay',
            progress: 30,
            priority: 6,
            url: 'https://t.alipayobjects.com/L1/71/100/and/alipay_wap_main.apk'
        },
        {
            id: 4,
            name: 'QQ for Mac',
            progress: 40,
            priority: 8,
            url: 'https://dldir1.qq.com/qqfile/QQforMac/QQ_V6.2.0.dmg'
        },
        {
            id: 5,
            name: 'ZhiHu',
            progress: 50,
            priority: 10,
            url: 'https://zhstatic.zhihu.com/pkg/store/zhihu/futureve-mobile-zhihu-release-5.8.2(596).apk' //有问题
        },
        {
            id: 6,
            name: 'NetEaseMusic',
            progress: 60,
            priority: 12,
            url: 'http://d1.music.126.net/dmusic/CloudMusic_official_4.3.2.468990.apk'
        },
        {
            id: 7,
            name: 'NetEaseMusic for Mac',
            progress: 70,
            priority: 14,
            url: 'http://d1.music.126.net/dmusic/NeteaseMusic_1.5.9_622_officialsite.dmg'
        },
        {
            id: 8,
            name: 'WeChat for Windows',
            progress: 80,
            priority: 16,
            url: 'http://dldir1.qq.com/weixin/Windows/WeChatSetup.exe'
        },
        {
            id: 9,
            name: 'WeChat Work',
            progress: 90,
            priority: 18,
            url: 'https://dldir1.qq.com/foxmail/work_weixin/wxwork_android_2.4.5.5571_100001.apk'
        },
        {
            id: 10,
            name: 'WeChat Work for Mac',
            progress: 100,
            priority: 20,
            url: 'https://dldir1.qq.com/foxmail/work_weixin/WXWork_2.4.5.213.dmg'
        }
    ];
}
