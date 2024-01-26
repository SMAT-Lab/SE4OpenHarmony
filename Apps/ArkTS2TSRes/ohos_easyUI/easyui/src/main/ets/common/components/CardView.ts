interface CardView_Params {
    /**
     * 对卡片的属性进行设置
     * @param name:
     */
    attribute?: CardViewAttribute;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CardView_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
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
//卡片视图组件
//暴露组件的属性
export class CardViewAttribute {
    //卡片的默认名字
    private static DEFAULT_NAME = "小M";
    //卡片的默认头像
    private static DEFAULT_ICON = "icon.png";
    //卡片的默认图片
    private static DEFAULT_CARDIMGAE = "img_1.png";
    //卡片视图的名字
    name?: string;
    //卡片视图的头像
    icon?: string;
    //卡片视图的图片
    CardImage?: string;
    //属性检查，设为默认属性
    static checkAttribute(attribute: CardViewAttribute) {
        if (attribute == undefined) {
            attribute = new CardViewAttribute();
        }
        attribute.name = Precondition.check(attribute.name, CardViewAttribute.DEFAULT_NAME);
        attribute.icon = Precondition.check(attribute.icon, CardViewAttribute.DEFAULT_ICON);
        attribute.CardImage = Precondition.check(attribute.CardImage, CardViewAttribute.DEFAULT_CARDIMGAE);
        return attribute;
    }
}
//属性检查类
class Precondition {
    public static check(target: any, defaultValue: any): any {
        return undefined == target ? defaultValue : target;
    }
}
export class CardView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.attribute = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CardView_Params) {
        if (params.attribute !== undefined) {
            this.attribute = params.attribute;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    /**
     * 对卡片的属性进行设置
     * @param name:
     */
    private attribute: CardViewAttribute;
    aboutToAppear() {
        if (this.attribute == undefined) {
            console.error("请设置卡片视图组件的属性attribute");
        }
        this.attribute = CardViewAttribute.checkAttribute(this.attribute);
    }
    render() {
        Row.create();
        Row.height(350);
        Row.margin(20);
        Column.create();
        Column.backgroundColor("#ffffffff");
        Column.width('100%');
        Column.borderWidth(2);
        Column.borderColor("#ffc3c3c3");
        Column.borderRadius(10);
        Column.borderStyle(BorderStyle.Solid);
        Column.shadow({
            radius: 10,
            color: "#ffd6d4d4",
            offsetX: -10,
            offsetY: 10
        });
        //        Image($rawfile("img.png"))
        Row.create();
        //        Image($rawfile("img.png"))
        Row.layoutWeight(1);
        Row.create({ space: 10 });
        Row.padding({ left: 10, top: 15 });
        Image.create($rawfile(this.attribute.icon));
        Image.height(50);
        Image.width(50);
        Image.borderWidth(1);
        Image.borderStyle(BorderStyle.Solid);
        Image.borderColor("#ffc3c3c3");
        Image.borderRadius(5);
        Image.alignSelf(ItemAlign.Center);
        Column.create({ space: 5 });
        Column.width("75%");
        Column.alignItems(HorizontalAlign.Start);
        Column.padding({ bottom: 15 });
        Text.create(this.attribute.name);
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        //                              .textAlign(TextAlign.Start)
        //                Text("发表于 2022-7-14 10:53")
        //                .fontSize(16)
        Row.create();
        Text.create("发表于  ");
        Text.fontSize(16);
        Text.pop();
        Text.create("" + new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString() + "-" + new Date().getUTCDate().toString() + "  " +
            (new Date().getHours() + 8).toString() + ":" + new Date().getMinutes());
        Text.fontSize(15);
        Text.baselineOffset(TextAlign.Start);
        Text.pop();
        //                              .textAlign(TextAlign.Start)
        //                Text("发表于 2022-7-14 10:53")
        //                .fontSize(16)
        Row.pop();
        Column.pop();
        Row.pop();
        //        Image($rawfile("img.png"))
        Row.pop();
        Row.create();
        Row.layoutWeight(5);
        Row.padding({ top: 15, bottom: 15 });
        Image.create($rawfile(this.attribute.CardImage));
        Row.pop();
        Row.create();
        Row.layoutWeight(1);
        Text.create("Like");
        Text.fontSize(18);
        Text.layoutWeight(3);
        Text.padding({ left: 20 });
        Text.pop();
        Text.create("Comment");
        Text.fontSize(18);
        Text.layoutWeight(3);
        Text.textAlign(TextAlign.End);
        Text.pop();
        //            .padding({left:20})
        Text.create("Read more");
        //            .padding({left:20})
        Text.fontSize(18);
        //            .padding({left:20})
        Text.layoutWeight(5);
        //            .padding({left:20})
        Text.textAlign(TextAlign.End);
        //            .padding({left:20})
        Text.padding({ right: 20 });
        //            .padding({left:20})
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
