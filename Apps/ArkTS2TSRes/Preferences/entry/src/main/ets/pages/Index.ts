interface Index_Params {
    nowTheme?: string;
    themeDatas?: Array<ImageAndName>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import Logger from '../model/Logger';
import preferences from '@ohos.data.preferences';
import ThemeDesktop from '../common/ThemeDesktop';
import emitter from '@ohos.events.emitter';
export interface ImageAndName {
    image: Resource;
    name: string;
}
const THEMES: Array<ImageAndName>[] = [
    [
        { image: $r('app.media.dialer'), name: '电话' },
        { image: $r('app.media.shopping'), name: '商城' },
        { image: $r('app.media.notes'), name: '备忘录' },
        { image: $r('app.media.settings'), name: '设置' },
        { image: $r('app.media.camera'), name: '相机' },
        { image: $r('app.media.gallery'), name: '相册' },
        { image: $r('app.media.music'), name: '音乐' },
        { image: $r('app.media.video'), name: '视频' },
    ],
    [
        { image: $r('app.media.simplicityCall'), name: '电话' },
        { image: $r('app.media.simplicityShop'), name: '商城' },
        { image: $r('app.media.simplicityNotes'), name: '备忘录' },
        { image: $r('app.media.simplicitySetting'), name: '设置' },
        { image: $r('app.media.simplicityCamera'), name: '相机' },
        { image: $r('app.media.simplicityPhotos'), name: '相册' },
        { image: $r('app.media.simplicityMusic'), name: '音乐' },
        { image: $r('app.media.simplicityVideo'), name: '视频' },
    ],
    [
        { image: $r('app.media.pwcall'), name: '电话' },
        { image: $r('app.media.pwshop'), name: '商城' },
        { image: $r('app.media.pwnotes'), name: '备忘录' },
        { image: $r('app.media.pwsetting'), name: '设置' },
        { image: $r('app.media.pwcamera'), name: '相机' },
        { image: $r('app.media.pwphotos'), name: '相册' },
        { image: $r('app.media.pwmusic'), name: '音乐' },
        { image: $r('app.media.pwvideo'), name: '视频' },
    ]
];
const TAG: string = '[Index]';
const PREFERENCES_NAME = 'theme.db';
const THEME_NAMES: string[] = ['default', 'simplicity', 'pomeloWhtie'];
let preferenceTheme: preferences.Preferences | null = null;
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__nowTheme = new ObservedPropertySimple('', this, "nowTheme");
        this.__themeDatas = new ObservedPropertyObject([], this, "themeDatas");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.nowTheme !== undefined) {
            this.nowTheme = params.nowTheme;
        }
        if (params.themeDatas !== undefined) {
            this.themeDatas = params.themeDatas;
        }
    }
    aboutToBeDeleted() {
        this.__nowTheme.aboutToBeDeleted();
        this.__themeDatas.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __nowTheme: ObservedPropertySimple<string>;
    get nowTheme() {
        return this.__nowTheme.get();
    }
    set nowTheme(newValue: string) {
        this.__nowTheme.set(newValue);
    }
    private __themeDatas: ObservedPropertyObject<Array<ImageAndName>>;
    get themeDatas() {
        return this.__themeDatas.get();
    }
    set themeDatas(newValue: Array<ImageAndName>) {
        this.__themeDatas.set(newValue);
    }
    async aboutToAppear() {
        //从内存中获取轻量级存储db文件
        await this.getPreferencesFromStorage();
        //从轻量级存储db文件中获取键名为theme的键值
        this.nowTheme = await this.getPreference();
        console.info(`nowTheme__get ${this.nowTheme}`);
        emitter.emit({ eventId: 0, priority: 0 }, { data: {
                nowTheme: this.nowTheme
            } });
        let index = THEME_NAMES.indexOf(this.nowTheme);
        this.themeDatas = THEMES[index];
    }
    async getPreferencesFromStorage() {
        let context = getContext(this) as Context;
        preferenceTheme = await preferences.getPreferences(context, PREFERENCES_NAME);
    }
    async putPreference(data: string) {
        Logger.info(TAG, `Put begin`);
        if (preferenceTheme !== null) {
            await preferenceTheme.put('theme', data);
            await preferenceTheme.flush();
        }
    }
    async getPreference(): Promise<string> {
        Logger.info(TAG, `Get begin`);
        let theme: string = '';
        if (preferenceTheme !== null) {
            theme = await preferenceTheme.get('theme', 'default') as string;
            return theme;
        }
        return theme;
    }
    changeTheme(themeNum: number) {
        this.themeDatas = THEMES[themeNum];
        this.putPreference(THEME_NAMES[themeNum]);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Row.create();
        Row.width('100%');
        Row.height(50);
        Row.backgroundColor('#0D9FFB');
        Text.create($r('app.string.MainAbility_label'));
        Text.fontSize(25);
        Text.layoutWeight(5);
        Text.padding({ left: 10 });
        Text.fontColor(Color.White);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Image.create($r('app.media.change'));
        Image.key('changeBtn');
        Image.id('changeBtn');
        Image.height(30);
        Image.layoutWeight(1);
        Image.objectFit(ImageFit.ScaleDown);
        Image.bindMenu([
            {
                value: THEME_NAMES[0],
                action: () => {
                    this.changeTheme(0);
                }
            },
            {
                value: THEME_NAMES[1],
                action: () => {
                    this.changeTheme(1);
                }
            },
            {
                value: THEME_NAMES[2],
                action: () => {
                    this.changeTheme(2);
                }
            }
        ]);
        Row.pop();
        let earlierCreatedChild_2: ThemeDesktop = (this && this.findChildById) ? this.findChildById("2") as ThemeDesktop : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ThemeDesktop("2", this, { themeDatas: this.__themeDatas }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
