interface NewsItem_Params {
    newsData?: NewsData;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NewsItem_" + ++__generate__Id;
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
import { NewsData } from '../common/bean/NewsData';
import { NewsSource, NewsContent, NewsTitle, NewsGrid } from '../common/constant/CommonConstant';
export default class NewsItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.newsData = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: NewsItem_Params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private newsData: NewsData;
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Row.create();
        Image.create($r('app.media.news'));
        Image.width(NewsTitle.IMAGE_WIDTH);
        Image.height(NewsTitle.IMAGE_HEIGHT);
        Image.margin({
            top: NewsTitle.IMAGE_MARGIN_TOP,
            left: NewsTitle.IMAGE_MARGIN_LEFT
        });
        Image.objectFit(ImageFit.Fill);
        Text.create(this.newsData.title);
        Text.fontSize(NewsTitle.TEXT_FONT_SIZE);
        Text.fontColor($r('app.color.fontColor_text'));
        Text.height(NewsTitle.TEXT_HEIGHT);
        Text.width(NewsTitle.TEXT_WIDTH);
        Text.maxLines(NewsTitle.TEXT_MAX_LINES);
        Text.margin({ left: NewsTitle.TEXT_MARGIN_LEFT, top: NewsTitle.TEXT_MARGIN_TOP });
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.fontWeight(NewsTitle.TEXT_FONT_WEIGHT);
        Text.pop();
        Row.pop();
        Text.create(this.newsData.content);
        Text.fontSize(NewsContent.FONT_SIZE);
        Text.fontColor($r('app.color.fontColor_text'));
        Text.height(NewsContent.HEIGHT);
        Text.width(NewsContent.WIDTH);
        Text.maxLines(NewsContent.MAX_LINES);
        Text.margin({ left: NewsContent.MARGIN_LEFT, top: NewsContent.MARGIN_TOP });
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Grid.create();
        Grid.columnsTemplate('1fr '.repeat(this.newsData.imagesUrl.length));
        Grid.columnsGap(NewsGrid.COLUMNS_GAP);
        Grid.rowsTemplate(NewsGrid.ROWS_TEMPLATE);
        Grid.width(NewsGrid.WIDTH);
        Grid.height(NewsGrid.HEIGHT);
        Grid.margin({ left: NewsGrid.MARGIN_LEFT, top: NewsGrid.MARGIN_TOP,
            right: NewsGrid.MARGIN_RIGHT });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.newsData.imagesUrl), itemImg => {
            GridItem.create();
            Image.create($rawfile(itemImg.url));
            Image.objectFit(ImageFit.Cover);
            Image.borderRadius(NewsGrid.IMAGE_BORDER_RADIUS);
            GridItem.pop();
        }, (itemImg, index) => JSON.stringify(itemImg) + index.toString());
        ForEach.pop();
        Grid.pop();
        Text.create(this.newsData.source);
        Text.fontSize(NewsSource.FONT_SIZE);
        Text.fontColor($r('app.color.fontColor_text2'));
        Text.height(NewsSource.HEIGHT);
        Text.width(NewsSource.WIDTH);
        Text.maxLines(NewsSource.MAX_LINES);
        Text.margin({ left: NewsSource.MARGIN_LEFT, top: NewsSource.MARGIN_TOP });
        Text.textOverflow({ overflow: TextOverflow.None });
        Text.pop();
        Column.pop();
    }
}
