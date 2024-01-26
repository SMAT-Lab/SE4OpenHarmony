interface VideoNewsView_Params {
    title?: string;
    radio?: number;
    testUrl?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "VideoNewsView_" + ++__generate__Id;
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
import router from '@ohos.router';
import { CommonVideoView } from './CommonVideoView';
import { VideoSource } from './VideoSource';
export default class VideoNewsView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.title = "";
        this.radio = 1.77;
        this.testUrl = "http://devimages.apple.com.edgekey.net/streaming/examples/bipbop_4x3/bipbop_4x3_variant.m3u8";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: VideoNewsView_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.radio !== undefined) {
            this.radio = params.radio;
        }
        if (params.testUrl !== undefined) {
            this.testUrl = params.testUrl;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private title: string;
    private radio: number;
    private testUrl: string;
    render() {
        Column.create();
        Column.width('100%');
        Column.height('40%');
        Column.padding({ 'right': 14, 'left': 14 });
        __Common__.create();
        __Common__.width('100%');
        __Common__.aspectRatio(this.radio);
        __Common__.borderRadius(10);
        let earlierCreatedChild_2: CommonVideoView = (this && this.findChildById) ? this.findChildById("2") as CommonVideoView : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new CommonVideoView("2", this, {
                videoSource: new VideoSource(this.testUrl, '')
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                videoSource: new VideoSource(this.testUrl, '')
            });
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
        Column.pop();
    }
}
