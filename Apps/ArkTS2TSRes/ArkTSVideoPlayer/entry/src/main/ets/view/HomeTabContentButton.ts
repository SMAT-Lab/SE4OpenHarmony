interface HomeTabContentButton_Params {
    currIndex?: number;
    videoList?: Array<VideoBean>;
    name?: string;
    src?: string;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HomeTabContentButton_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { HomeTabContentDialog } from './HomeTabContentDialog';
import { VideoBean } from '../common/bean/VideoBean';
import HomeVideoListModel from '../viewmodel/HomeVideoListModel';
import { CommonConstants } from '../common/constants/CommonConstants';
import { HomeConstants } from '../common/constants/HomeConstants';
export class HomeTabContentButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currIndex = undefined;
        this.__videoList = this.initializeConsume("videoList", "videoList");
        this.__name = new ObservedPropertySimple('', this, "name");
        this.__src = new ObservedPropertySimple('', this, "src");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new HomeTabContentDialog("2", this, {
                    confirm: this.confirm,
                    name: this.__name,
                    src: this.__src,
                    videoList: this.__videoList
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Default,
            offset: {
                dx: HomeConstants.INTERNET_ADD_DIALOG.OFFSET_DX,
                dy: HomeConstants.INTERNET_ADD_DIALOG.OFFSET_DY
            },
            gridCount: HomeConstants.INTERNET_ADD_DIALOG.GRID_COUNT,
            customStyle: false
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HomeTabContentButton_Params) {
        if (params.currIndex !== undefined) {
            this.currIndex = params.currIndex;
        }
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.src !== undefined) {
            this.src = params.src;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__videoList.aboutToBeDeleted();
        this.__name.aboutToBeDeleted();
        this.__src.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currIndex: number;
    private __videoList: SynchedPropertySimpleOneWay<Array<VideoBean>>;
    get videoList() {
        return this.__videoList.get();
    }
    set videoList(newValue: Array<VideoBean>) {
        this.__videoList.set(newValue);
    }
    private __name: ObservedPropertySimple<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __src: ObservedPropertySimple<string>;
    get src() {
        return this.__src.get();
    }
    set src(newValue: string) {
        this.__src.set(newValue);
    }
    private dialogController: CustomDialogController;
    confirm() {
        HomeVideoListModel.setInternetVideo(this.name, this.src);
        this.videoList = globalThis.videoInternetList;
        this.src = '';
        this.name = '';
    }
    render() {
        Column.create();
        Column.width(CommonConstants.FULL_PERCENT);
        Column.height(HomeConstants.HOME_TAB_BUTTON.COLUMN_HEIGHT);
        Column.justifyContent(FlexAlign.Center);
        Button.createWithLabel(this.currIndex === 0 ? $r('app.string.scan_local_video') : $r('app.string.add_internet_video'), {
            type: ButtonType.Normal,
            stateEffect: true
        });
        Button.borderRadius($r('app.float.tab_border_radius'));
        Button.fontSize($r('app.float.button_font_size'));
        Button.height(HomeConstants.HOME_TAB_BUTTON.HEIGHT);
        Button.backgroundColor($r('app.color.button_back_ground_color'));
        Button.onClick(async () => {
            if (this.currIndex === 0) {
                this.videoList = await HomeVideoListModel.getLocalVideo();
            }
            else {
                this.dialogController.open();
            }
        });
        Button.pop();
        Column.pop();
    }
}
