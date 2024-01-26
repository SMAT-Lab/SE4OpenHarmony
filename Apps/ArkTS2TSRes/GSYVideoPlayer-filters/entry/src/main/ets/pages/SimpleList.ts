interface SimpleList_Params {
    screenHeight?: string;
    videoModels?: Array<StandardGSYVideoModel>;
    items?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SimpleList_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { BaseVideoPlayer, GlobalContext, StandardForListGSYVideoPlayer, StandardGSYVideoModel } from '@ohos/gsyvideoplayer';
class SimpleList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__screenHeight = new ObservedPropertySimple('30%', this, "screenHeight");
        this.videoModels = [];
        this.items = ['http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4',
            'http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4',
            'http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4',
            'http://1251017968.vod2.myqcloud.com/3eb04eefvodtransgzp1251017968/8782b1285285890810009576163/v.f30.mp4', 'http://video.chinanews.com/flv/2019/04/23/400/111773_web.mp4'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SimpleList_Params) {
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.videoModels !== undefined) {
            this.videoModels = params.videoModels;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    aboutToBeDeleted() {
        this.__screenHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __screenHeight: ObservedPropertySimple<string>;
    get screenHeight() {
        return this.__screenHeight.get();
    }
    set screenHeight(newValue: string) {
        this.__screenHeight.set(newValue);
    }
    private videoModels: Array<StandardGSYVideoModel>;
    private items: Array<string>;
    render() {
        List.create({ space: 3 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.videoModels), (item: StandardGSYVideoModel) => {
            ListItem.create();
            Row.create();
            Row.margin({ left: 10, right: 10 });
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
    async aboutToAppear() {
        for (let i = 0; i < this.items.length; i++) {
            let model = new StandardGSYVideoModel();
            model.setUrl(this.items[i], false);
            model.setTitle("这是测试视频的标题");
            model.setCoverImage($r('app.media.app_icon'));
            this.videoModels[i] = model;
        }
    }
    aboutToDisappear() {
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            player.stop();
        }
    }
    onPageShow() {
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            player.resumePlay();
        }
    }
    onPageHide() {
        let player = GlobalContext.getContext().getObject("currentPlayer") as BaseVideoPlayer;
        if (player) {
            player.pause();
        }
    }
}
loadDocument(new SimpleList("1", undefined, {}));
