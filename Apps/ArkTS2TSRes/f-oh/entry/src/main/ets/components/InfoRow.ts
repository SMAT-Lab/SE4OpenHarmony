interface InfoRow_Params {
    icon?: string | PixelMap | Resource;
    title?: string;
    info?: string | Resource;
    clickHandler?: (event?: ClickEvent) => void;
    showRightArrow?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "InfoRow_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import pasteboard from '@ohos.pasteboard';
export class InfoRow extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.icon = undefined;
        this.title = undefined;
        this.info = undefined;
        this.clickHandler = undefined;
        this.showRightArrow = true;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: InfoRow_Params) {
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.info !== undefined) {
            this.info = params.info;
        }
        if (params.clickHandler !== undefined) {
            this.clickHandler = params.clickHandler;
        }
        if (params.showRightArrow !== undefined) {
            this.showRightArrow = params.showRightArrow;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private icon?: string | PixelMap | Resource;
    private title: string;
    private info?: string | Resource;
    private clickHandler?: (event?: ClickEvent) => void;
    private showRightArrow?: boolean;
    render() {
        Flex.create({
            direction: FlexDirection.Row,
            justifyContent: FlexAlign.SpaceBetween,
            alignItems: ItemAlign.Center
        });
        Flex.width('100%');
        Flex.height(48);
        Flex.onClick(this.clickHandler || ((e) => {
            let pasteData = pasteboard.createData(pasteboard.MIMETYPE_TEXT_PLAIN, this.info.toString());
            pasteboard.getSystemPasteboard();
            let systemPasteboard = pasteboard.getSystemPasteboard();
            systemPasteboard.setData(pasteData, (err, data) => {
                if (err) {
                    console.error('Failed to set PasteData. Cause: ' + err.message);
                    return;
                }
                console.info('Succeeded in setting PasteData.');
                // 提示
                try {
                    promptAction.showToast({
                        message: '已复制 ' + this.title,
                        duration: 1000,
                    });
                }
                catch (error) {
                    console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
                }
                ;
            });
        }));
        Flex.margin({ top: 5, bottom: 5 });
        Image.create(this.icon);
        Image.width(26);
        Image.height(26);
        Image.borderRadius(13);
        Image.flexShrink(0);
        Column.create();
        Column.margin({ left: 14 });
        Column.alignItems(HorizontalAlign.Center);
        Column.flexGrow(1);
        Text.create(this.title);
        Text.fontSize(16);
        Text.fontColor('#FF182431');
        Text.alignSelf(ItemAlign.Start);
        Text.pop();
        Text.create(this.info);
        Text.fontSize(13);
        Text.fontColor('#99182431');
        Text.maxLines(1);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.alignSelf(ItemAlign.Start);
        Text.margin({ top: 4 });
        Text.pop();
        Column.pop();
        If.create();
        if (this.showRightArrow) {
            If.branchId(0);
            Image.create($r('app.media.ic_right_arrow'));
            Image.width(24);
            Image.height(24);
            Image.objectFit(ImageFit.Contain);
            Image.flexShrink(0);
        }
        If.pop();
        Flex.pop();
    }
}
