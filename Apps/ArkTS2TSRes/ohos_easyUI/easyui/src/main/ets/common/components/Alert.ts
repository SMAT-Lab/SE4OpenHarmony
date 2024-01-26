interface Alert_close_Params {
    cur_emotion?: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    cur_iconUrl?: string;
    icon_size?: number;
    cur_title?: string;
    cur_detail?: string;
    cur_tip_text?: string;
    height_message?: number;
    cur_bg_color?: string;
    cur_text_color?: string;
    closeBtn_visible?: Visibility;
}
interface Alert_emotion_icon_block_Params {
    cur_emotion?: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    cur_iconUrl?: string;
    icon_size?: number;
    cur_title?: string;
    cur_detail?: string;
    isSingleLine?: boolean;
    height_single_message?: number;
    height_multi_message?: number;
    cur_bg_color?: string;
    cur_text_color?: string;
    cur_divider_color?: string;
    single_line_Visible?: Visibility;
    multi_Line_Visible?: Visibility;
    height_message?: number;
}
interface Alert_emotion_icon_inverse_Params {
    cur_emotion?: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    cur_iconUrl?: string;
    icon_size?: number;
    cur_title?: string;
    cur_detail?: string;
    isSingleLine?: boolean;
    height_single_message?: number;
    height_multi_message?: number;
    cur_bg_color?: string;
    cur_text_color?: string;
    cur_divider_color?: string;
    single_line_Visible?: Visibility;
    multi_Line_Visible?: Visibility;
    height_message?: number;
}
interface Alert_emotion_icon_Params {
    cur_emotion?: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    cur_iconUrl?: string;
    icon_size?: number;
    cur_title?: string;
    cur_detail?: string;
    isSingleLine?: boolean;
    height_single_message?: number;
    height_multi_message?: number;
    cur_bg_color?: string;
    cur_text_color?: string;
    cur_divider_color?: string;
    single_line_Visible?: Visibility;
    multi_Line_Visible?: Visibility;
    height_message?: number;
}
interface Alert_emotion_Params {
    cur_emotion?: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    cur_title?: string;
    cur_detail?: string;
    isSingleLine?: boolean;
    height_single_message?: number;
    height_multi_message?: number;
    cur_bg_color?: string;
    cur_text_color?: string;
    cur_divider_color?: string;
    single_line_Visible?: Visibility;
    multi_Line_Visible?: Visibility;
    height_message?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Alert_" + ++__generate__Id;
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
import router from '@ohos.router';
import web_webview from '@ohos.web.webview';
export class Alert_emotion extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.cur_emotion = "";
        this.cur_title = "";
        this.cur_detail = "";
        this.isSingleLine = false //是否单行显示
        ;
        this.height_single_message = 50;
        this.height_multi_message = 100;
        this.__cur_bg_color = new ObservedPropertySimple("#F1F1F1", this, "cur_bg_color");
        this.__cur_text_color = new ObservedPropertySimple("#000000", this, "cur_text_color");
        this.__cur_divider_color = new ObservedPropertySimple("#E4E4E4", this, "cur_divider_color");
        this.__single_line_Visible = new ObservedPropertySimple(Visibility.Hidden, this, "single_line_Visible");
        this.__multi_Line_Visible = new ObservedPropertySimple(Visibility.Visible, this, "multi_Line_Visible");
        this.__height_message = new ObservedPropertySimple(100, this, "height_message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Alert_emotion_Params) {
        if (params.cur_emotion !== undefined) {
            this.cur_emotion = params.cur_emotion;
        }
        if (params.cur_title !== undefined) {
            this.cur_title = params.cur_title;
        }
        if (params.cur_detail !== undefined) {
            this.cur_detail = params.cur_detail;
        }
        if (params.isSingleLine !== undefined) {
            this.isSingleLine = params.isSingleLine;
        }
        if (params.height_single_message !== undefined) {
            this.height_single_message = params.height_single_message;
        }
        if (params.height_multi_message !== undefined) {
            this.height_multi_message = params.height_multi_message;
        }
        if (params.cur_bg_color !== undefined) {
            this.cur_bg_color = params.cur_bg_color;
        }
        if (params.cur_text_color !== undefined) {
            this.cur_text_color = params.cur_text_color;
        }
        if (params.cur_divider_color !== undefined) {
            this.cur_divider_color = params.cur_divider_color;
        }
        if (params.single_line_Visible !== undefined) {
            this.single_line_Visible = params.single_line_Visible;
        }
        if (params.multi_Line_Visible !== undefined) {
            this.multi_Line_Visible = params.multi_Line_Visible;
        }
        if (params.height_message !== undefined) {
            this.height_message = params.height_message;
        }
    }
    aboutToBeDeleted() {
        this.__cur_bg_color.aboutToBeDeleted();
        this.__cur_text_color.aboutToBeDeleted();
        this.__cur_divider_color.aboutToBeDeleted();
        this.__single_line_Visible.aboutToBeDeleted();
        this.__multi_Line_Visible.aboutToBeDeleted();
        this.__height_message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private cur_emotion: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    private cur_title: string; //Alert的标题文本
    private cur_detail: string; //Alert的详细说明文本
    private isSingleLine: boolean; //是否单行显示
    private height_single_message: number;
    private height_multi_message: number;
    private __cur_bg_color: ObservedPropertySimple<string>; //Alert背景颜色
    get cur_bg_color() {
        return this.__cur_bg_color.get();
    }
    set cur_bg_color(newValue: string) {
        this.__cur_bg_color.set(newValue);
    }
    private __cur_text_color: ObservedPropertySimple<string>; //Alert文本颜色
    get cur_text_color() {
        return this.__cur_text_color.get();
    }
    set cur_text_color(newValue: string) {
        this.__cur_text_color.set(newValue);
    }
    private __cur_divider_color: ObservedPropertySimple<string>; //标题与详细说明之间的分隔线的颜色
    get cur_divider_color() {
        return this.__cur_divider_color.get();
    }
    set cur_divider_color(newValue: string) {
        this.__cur_divider_color.set(newValue);
    }
    private __single_line_Visible: ObservedPropertySimple<Visibility>;
    get single_line_Visible() {
        return this.__single_line_Visible.get();
    }
    set single_line_Visible(newValue: Visibility) {
        this.__single_line_Visible.set(newValue);
    }
    private __multi_Line_Visible: ObservedPropertySimple<Visibility>;
    get multi_Line_Visible() {
        return this.__multi_Line_Visible.get();
    }
    set multi_Line_Visible(newValue: Visibility) {
        this.__multi_Line_Visible.set(newValue);
    }
    private __height_message: ObservedPropertySimple<number>; //Alert高度
    get height_message() {
        return this.__height_message.get();
    }
    set height_message(newValue: number) {
        this.__height_message.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.height(this.height_message);
        Stack.onAppear(() => {
            if (this.isSingleLine == true) {
                this.single_line_Visible = Visibility.Visible;
                this.multi_Line_Visible = Visibility.Hidden;
                this.height_message = this.height_single_message;
            }
            else {
                this.single_line_Visible = Visibility.Hidden;
                this.multi_Line_Visible = Visibility.Visible;
                this.height_message = this.height_multi_message;
            }
        });
        Column.create();
        Column.backgroundColor("" + this.cur_bg_color);
        Column.borderRadius(10);
        Column.width("98%");
        Column.height(this.height_multi_message);
        Column.visibility(this.multi_Line_Visible);
        Column.onAppear(() => {
            if (this.multi_Line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#F1F1F1";
                        this.cur_text_color = "#000000";
                        this.cur_divider_color = "#E4E4E4";
                        break;
                    case "primary":
                        this.cur_bg_color = "#EBF2F9";
                        this.cur_text_color = "#000000";
                        this.cur_divider_color = "#D0E0F1";
                        break;
                    case "success":
                        this.cur_bg_color = "#DDF4DF";
                        this.cur_text_color = "#329D38";
                        this.cur_divider_color = "#BAE8B6";
                        break;
                    case "info":
                        this.cur_bg_color = "#DDF3F5";
                        this.cur_text_color = "#03A2B6";
                        break;
                    case "warning":
                        this.cur_bg_color = "#FFF0D5";
                        this.cur_text_color = "#ED980F";
                        break;
                    case "danger":
                        this.cur_bg_color = "#FFE5E0";
                        this.cur_text_color = "#E75033";
                        this.cur_divider_color = "#fff1c2b9";
                        break;
                }
            }
        });
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Rect.create();
        Rect.height("2%");
        Rect.fill(this.cur_divider_color);
        Rect.width("98%");
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Column.create();
        Column.backgroundColor("" + this.cur_bg_color);
        Column.borderRadius(10);
        Column.width("98%");
        Column.height(this.height_single_message);
        Column.visibility(this.single_line_Visible);
        Column.onAppear(() => {
            if (this.single_line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#F1F1F1";
                        this.cur_text_color = "#000000";
                        break;
                    case "primary":
                        this.cur_bg_color = "#EBF2F9";
                        this.cur_text_color = "#000000";
                        break;
                    case "success":
                        this.cur_bg_color = "#DDF4DF";
                        this.cur_text_color = "#329D38";
                        break;
                    case "info":
                        this.cur_bg_color = "#DDF3F5";
                        this.cur_text_color = "#03A2B6";
                        break;
                    case "warning":
                        this.cur_bg_color = "#FFF0D5";
                        this.cur_text_color = "#ED980F";
                        break;
                    case "danger":
                        this.cur_bg_color = "#FFE5E0";
                        this.cur_text_color = "#FF2023";
                        break;
                }
            }
        });
        Row.create();
        Row.width("100%");
        Row.height("100%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.pop();
    }
}
export class Alert_emotion_icon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.cur_emotion = "";
        this.cur_iconUrl = "";
        this.icon_size = 30;
        this.cur_title = "";
        this.cur_detail = "";
        this.isSingleLine = false;
        this.height_single_message = 50;
        this.height_multi_message = 100;
        this.__cur_bg_color = new ObservedPropertySimple("#F1F1F1", this, "cur_bg_color");
        this.__cur_text_color = new ObservedPropertySimple("#000000", this, "cur_text_color");
        this.__cur_divider_color = new ObservedPropertySimple("#E4E4E4", this, "cur_divider_color");
        this.__single_line_Visible = new ObservedPropertySimple(Visibility.Hidden, this, "single_line_Visible");
        this.__multi_Line_Visible = new ObservedPropertySimple(Visibility.Visible, this, "multi_Line_Visible");
        this.__height_message = new ObservedPropertySimple(100, this, "height_message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Alert_emotion_icon_Params) {
        if (params.cur_emotion !== undefined) {
            this.cur_emotion = params.cur_emotion;
        }
        if (params.cur_iconUrl !== undefined) {
            this.cur_iconUrl = params.cur_iconUrl;
        }
        if (params.icon_size !== undefined) {
            this.icon_size = params.icon_size;
        }
        if (params.cur_title !== undefined) {
            this.cur_title = params.cur_title;
        }
        if (params.cur_detail !== undefined) {
            this.cur_detail = params.cur_detail;
        }
        if (params.isSingleLine !== undefined) {
            this.isSingleLine = params.isSingleLine;
        }
        if (params.height_single_message !== undefined) {
            this.height_single_message = params.height_single_message;
        }
        if (params.height_multi_message !== undefined) {
            this.height_multi_message = params.height_multi_message;
        }
        if (params.cur_bg_color !== undefined) {
            this.cur_bg_color = params.cur_bg_color;
        }
        if (params.cur_text_color !== undefined) {
            this.cur_text_color = params.cur_text_color;
        }
        if (params.cur_divider_color !== undefined) {
            this.cur_divider_color = params.cur_divider_color;
        }
        if (params.single_line_Visible !== undefined) {
            this.single_line_Visible = params.single_line_Visible;
        }
        if (params.multi_Line_Visible !== undefined) {
            this.multi_Line_Visible = params.multi_Line_Visible;
        }
        if (params.height_message !== undefined) {
            this.height_message = params.height_message;
        }
    }
    aboutToBeDeleted() {
        this.__cur_bg_color.aboutToBeDeleted();
        this.__cur_text_color.aboutToBeDeleted();
        this.__cur_divider_color.aboutToBeDeleted();
        this.__single_line_Visible.aboutToBeDeleted();
        this.__multi_Line_Visible.aboutToBeDeleted();
        this.__height_message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private cur_emotion: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    private cur_iconUrl: string; //Alert图标url
    private icon_size: number; //Alert图标大小
    private cur_title: string; //Alert的标题文本
    private cur_detail: string; //Alert的详细说明文本
    private isSingleLine: boolean; //是否单行显示
    private height_single_message: number;
    private height_multi_message: number;
    private __cur_bg_color: ObservedPropertySimple<string>; //Alert背景颜色
    get cur_bg_color() {
        return this.__cur_bg_color.get();
    }
    set cur_bg_color(newValue: string) {
        this.__cur_bg_color.set(newValue);
    }
    private __cur_text_color: ObservedPropertySimple<string>; //Alert文本颜色
    get cur_text_color() {
        return this.__cur_text_color.get();
    }
    set cur_text_color(newValue: string) {
        this.__cur_text_color.set(newValue);
    }
    private __cur_divider_color: ObservedPropertySimple<string>; //标题与详细说明之间的分隔线的颜色
    get cur_divider_color() {
        return this.__cur_divider_color.get();
    }
    set cur_divider_color(newValue: string) {
        this.__cur_divider_color.set(newValue);
    }
    private __single_line_Visible: ObservedPropertySimple<Visibility>;
    get single_line_Visible() {
        return this.__single_line_Visible.get();
    }
    set single_line_Visible(newValue: Visibility) {
        this.__single_line_Visible.set(newValue);
    }
    private __multi_Line_Visible: ObservedPropertySimple<Visibility>;
    get multi_Line_Visible() {
        return this.__multi_Line_Visible.get();
    }
    set multi_Line_Visible(newValue: Visibility) {
        this.__multi_Line_Visible.set(newValue);
    }
    private __height_message: ObservedPropertySimple<number>; //Alert高度
    get height_message() {
        return this.__height_message.get();
    }
    set height_message(newValue: number) {
        this.__height_message.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.height(this.height_message);
        Stack.onAppear(() => {
            if (this.isSingleLine == true) {
                this.single_line_Visible = Visibility.Visible;
                this.multi_Line_Visible = Visibility.Hidden;
                this.height_message = this.height_single_message;
            }
            else {
                this.single_line_Visible = Visibility.Hidden;
                this.multi_Line_Visible = Visibility.Visible;
                this.height_message = this.height_multi_message;
            }
        });
        Row.create();
        Row.backgroundColor("" + this.cur_bg_color);
        Row.borderRadius(10);
        Row.width("98%");
        Row.height(this.height_multi_message);
        Row.visibility(this.multi_Line_Visible);
        Row.onAppear(() => {
            if (this.multi_Line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#F1F1F1";
                        this.cur_text_color = "#000000";
                        this.cur_divider_color = "#E4E4E4";
                        break;
                    case "primary":
                        this.cur_bg_color = "#EBF2F9";
                        this.cur_text_color = "#000000";
                        this.cur_divider_color = "#D0E0F1";
                        break;
                    case "success":
                        this.cur_bg_color = "#DDF4DF";
                        this.cur_text_color = "#329D38";
                        this.cur_divider_color = "#BAE8B6";
                        break;
                    case "info":
                        this.cur_bg_color = "#DDF3F5";
                        this.cur_text_color = "#03A2B6";
                        this.cur_divider_color = "#DDF3F5";
                        break;
                    case "warning":
                        this.cur_bg_color = "#FFF0D5";
                        this.cur_text_color = "#ED980F";
                        this.cur_divider_color = "#FFF0D5";
                        break;
                    case "danger":
                        this.cur_bg_color = "#FFE5E0";
                        this.cur_text_color = "#E75033";
                        this.cur_divider_color = "#fff1c2b9";
                        break;
                }
            }
        });
        Column.create();
        Column.width("15%");
        Image.create($rawfile(this.cur_iconUrl));
        Image.width(this.icon_size);
        Image.height(this.icon_size);
        Column.pop();
        Column.create();
        Column.width("85%");
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Rect.create();
        Rect.height("2%");
        Rect.fill(this.cur_divider_color);
        Rect.width("98%");
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.backgroundColor("" + this.cur_bg_color);
        Row.borderRadius(10);
        Row.width("98%");
        Row.height(this.height_single_message);
        Row.visibility(this.single_line_Visible);
        Row.onAppear(() => {
            if (this.single_line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#F1F1F1";
                        this.cur_text_color = "#000000";
                        break;
                    case "primary":
                        this.cur_bg_color = "#EBF2F9";
                        this.cur_text_color = "#000000";
                        break;
                    case "success":
                        this.cur_bg_color = "#DDF4DF";
                        this.cur_text_color = "#329D38";
                        break;
                    case "info":
                        this.cur_bg_color = "#DDF3F5";
                        this.cur_text_color = "#03A2B6";
                        break;
                    case "warning":
                        this.cur_bg_color = "#FFF0D5";
                        this.cur_text_color = "#ED980F";
                        break;
                    case "danger":
                        this.cur_bg_color = "#FFE5E0";
                        this.cur_text_color = "#FF2023";
                        break;
                }
            }
        });
        Column.create();
        Column.width("15%");
        Image.create($rawfile(this.cur_iconUrl));
        Image.width(this.icon_size);
        Image.height(this.icon_size);
        Column.pop();
        Column.create();
        Column.width("85%");
        Row.create();
        Row.width("100%");
        Row.height("100%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Stack.pop();
    }
}
export class Alert_emotion_icon_inverse extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.cur_emotion = "";
        this.cur_iconUrl = "";
        this.icon_size = 30;
        this.cur_title = "";
        this.cur_detail = "";
        this.isSingleLine = false;
        this.height_single_message = 50;
        this.height_multi_message = 100;
        this.__cur_bg_color = new ObservedPropertySimple("#000000", this, "cur_bg_color");
        this.__cur_text_color = new ObservedPropertySimple("#FFFFFF", this, "cur_text_color");
        this.__cur_divider_color = new ObservedPropertySimple("#5F5F5F", this, "cur_divider_color");
        this.__single_line_Visible = new ObservedPropertySimple(Visibility.Hidden, this, "single_line_Visible");
        this.__multi_Line_Visible = new ObservedPropertySimple(Visibility.Visible, this, "multi_Line_Visible");
        this.__height_message = new ObservedPropertySimple(100, this, "height_message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Alert_emotion_icon_inverse_Params) {
        if (params.cur_emotion !== undefined) {
            this.cur_emotion = params.cur_emotion;
        }
        if (params.cur_iconUrl !== undefined) {
            this.cur_iconUrl = params.cur_iconUrl;
        }
        if (params.icon_size !== undefined) {
            this.icon_size = params.icon_size;
        }
        if (params.cur_title !== undefined) {
            this.cur_title = params.cur_title;
        }
        if (params.cur_detail !== undefined) {
            this.cur_detail = params.cur_detail;
        }
        if (params.isSingleLine !== undefined) {
            this.isSingleLine = params.isSingleLine;
        }
        if (params.height_single_message !== undefined) {
            this.height_single_message = params.height_single_message;
        }
        if (params.height_multi_message !== undefined) {
            this.height_multi_message = params.height_multi_message;
        }
        if (params.cur_bg_color !== undefined) {
            this.cur_bg_color = params.cur_bg_color;
        }
        if (params.cur_text_color !== undefined) {
            this.cur_text_color = params.cur_text_color;
        }
        if (params.cur_divider_color !== undefined) {
            this.cur_divider_color = params.cur_divider_color;
        }
        if (params.single_line_Visible !== undefined) {
            this.single_line_Visible = params.single_line_Visible;
        }
        if (params.multi_Line_Visible !== undefined) {
            this.multi_Line_Visible = params.multi_Line_Visible;
        }
        if (params.height_message !== undefined) {
            this.height_message = params.height_message;
        }
    }
    aboutToBeDeleted() {
        this.__cur_bg_color.aboutToBeDeleted();
        this.__cur_text_color.aboutToBeDeleted();
        this.__cur_divider_color.aboutToBeDeleted();
        this.__single_line_Visible.aboutToBeDeleted();
        this.__multi_Line_Visible.aboutToBeDeleted();
        this.__height_message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private cur_emotion: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    private cur_iconUrl: string; //Alert图标url
    private icon_size: number; //Alert图标大小
    private cur_title: string; //Alert的标题文本
    private cur_detail: string; //Alert的详细说明文本
    private isSingleLine: boolean; //是否单行显示
    private height_single_message: number;
    private height_multi_message: number;
    private __cur_bg_color: ObservedPropertySimple<string>; //Alert背景颜色
    get cur_bg_color() {
        return this.__cur_bg_color.get();
    }
    set cur_bg_color(newValue: string) {
        this.__cur_bg_color.set(newValue);
    }
    private __cur_text_color: ObservedPropertySimple<string>; //Alert文本颜色
    get cur_text_color() {
        return this.__cur_text_color.get();
    }
    set cur_text_color(newValue: string) {
        this.__cur_text_color.set(newValue);
    }
    private __cur_divider_color: ObservedPropertySimple<string>; //标题与详细说明之间的分隔线的颜色
    get cur_divider_color() {
        return this.__cur_divider_color.get();
    }
    set cur_divider_color(newValue: string) {
        this.__cur_divider_color.set(newValue);
    }
    private __single_line_Visible: ObservedPropertySimple<Visibility>;
    get single_line_Visible() {
        return this.__single_line_Visible.get();
    }
    set single_line_Visible(newValue: Visibility) {
        this.__single_line_Visible.set(newValue);
    }
    private __multi_Line_Visible: ObservedPropertySimple<Visibility>;
    get multi_Line_Visible() {
        return this.__multi_Line_Visible.get();
    }
    set multi_Line_Visible(newValue: Visibility) {
        this.__multi_Line_Visible.set(newValue);
    }
    private __height_message: ObservedPropertySimple<number>; //Alert高度
    get height_message() {
        return this.__height_message.get();
    }
    set height_message(newValue: number) {
        this.__height_message.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.height(this.height_message);
        Stack.onAppear(() => {
            if (this.isSingleLine == true) {
                this.single_line_Visible = Visibility.Visible;
                this.multi_Line_Visible = Visibility.Hidden;
                this.height_message = this.height_single_message;
            }
            else {
                this.single_line_Visible = Visibility.Hidden;
                this.multi_Line_Visible = Visibility.Visible;
                this.height_message = this.height_multi_message;
            }
        });
        Row.create();
        Row.backgroundColor("" + this.cur_bg_color);
        Row.borderRadius(10);
        Row.width("98%");
        Row.height(this.height_multi_message);
        Row.visibility(this.multi_Line_Visible);
        Row.onAppear(() => {
            if (this.multi_Line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#000000";
                        this.cur_divider_color = "#5F5F5F";
                        break;
                    case "primary":
                        this.cur_bg_color = "#3280FC";
                        this.cur_divider_color = "#5C97F4";
                        break;
                    case "success":
                        this.cur_bg_color = "#38B03F";
                        this.cur_divider_color = "#61BB66";
                        break;
                    case "info":
                        this.cur_bg_color = "#03B8CF";
                        this.cur_divider_color = "#03B8CF";
                        break;
                    case "warning":
                        this.cur_bg_color = "#F1A325";
                        this.cur_divider_color = "#F1A325";
                        break;
                    case "danger":
                        this.cur_bg_color = "#EA644A";
                        this.cur_divider_color = "#fff1c2b9";
                        break;
                }
                console.log("========" + this.cur_emotion + " ==== " + this.cur_bg_color + " ===== " + this.cur_divider_color);
            }
        });
        Column.create();
        Column.width("15%");
        Image.create($rawfile(this.cur_iconUrl));
        Image.width(this.icon_size);
        Image.height(this.icon_size);
        Column.pop();
        Column.create();
        Column.width("85%");
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Rect.create();
        Rect.height("2%");
        Rect.fill(this.cur_divider_color);
        Rect.width("98%");
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.backgroundColor("" + this.cur_bg_color);
        Row.borderRadius(10);
        Row.width("98%");
        Row.height(this.height_single_message);
        Row.visibility(this.single_line_Visible);
        Row.onAppear(() => {
            if (this.single_line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#000000";
                        break;
                    case "primary":
                        this.cur_bg_color = "#3280FC";
                        break;
                    case "success":
                        this.cur_bg_color = "#38B03F";
                        break;
                    case "info":
                        this.cur_bg_color = "#03B8CF";
                        break;
                    case "warning":
                        this.cur_bg_color = "#F1A325";
                        break;
                    case "danger":
                        this.cur_bg_color = "#EA644A";
                        break;
                }
                console.log("========" + this.cur_emotion + " ==== " + this.cur_bg_color + " ===== " + this.cur_divider_color);
            }
        });
        Column.create();
        Column.width("15%");
        Image.create($rawfile(this.cur_iconUrl));
        Image.width(this.icon_size);
        Image.height(this.icon_size);
        Column.pop();
        Column.create();
        Column.width("85%");
        Row.create();
        Row.width("100%");
        Row.height("100%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Stack.pop();
    }
}
export class Alert_emotion_icon_block extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.cur_emotion = "";
        this.cur_iconUrl = "";
        this.icon_size = 30;
        this.cur_title = "";
        this.cur_detail = "";
        this.isSingleLine = false;
        this.height_single_message = 50;
        this.height_multi_message = 100;
        this.__cur_bg_color = new ObservedPropertySimple("#F1F1F1", this, "cur_bg_color");
        this.__cur_text_color = new ObservedPropertySimple("#000000", this, "cur_text_color");
        this.__cur_divider_color = new ObservedPropertySimple("#E4E4E4", this, "cur_divider_color");
        this.__single_line_Visible = new ObservedPropertySimple(Visibility.Hidden, this, "single_line_Visible");
        this.__multi_Line_Visible = new ObservedPropertySimple(Visibility.Visible, this, "multi_Line_Visible");
        this.__height_message = new ObservedPropertySimple(100, this, "height_message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Alert_emotion_icon_block_Params) {
        if (params.cur_emotion !== undefined) {
            this.cur_emotion = params.cur_emotion;
        }
        if (params.cur_iconUrl !== undefined) {
            this.cur_iconUrl = params.cur_iconUrl;
        }
        if (params.icon_size !== undefined) {
            this.icon_size = params.icon_size;
        }
        if (params.cur_title !== undefined) {
            this.cur_title = params.cur_title;
        }
        if (params.cur_detail !== undefined) {
            this.cur_detail = params.cur_detail;
        }
        if (params.isSingleLine !== undefined) {
            this.isSingleLine = params.isSingleLine;
        }
        if (params.height_single_message !== undefined) {
            this.height_single_message = params.height_single_message;
        }
        if (params.height_multi_message !== undefined) {
            this.height_multi_message = params.height_multi_message;
        }
        if (params.cur_bg_color !== undefined) {
            this.cur_bg_color = params.cur_bg_color;
        }
        if (params.cur_text_color !== undefined) {
            this.cur_text_color = params.cur_text_color;
        }
        if (params.cur_divider_color !== undefined) {
            this.cur_divider_color = params.cur_divider_color;
        }
        if (params.single_line_Visible !== undefined) {
            this.single_line_Visible = params.single_line_Visible;
        }
        if (params.multi_Line_Visible !== undefined) {
            this.multi_Line_Visible = params.multi_Line_Visible;
        }
        if (params.height_message !== undefined) {
            this.height_message = params.height_message;
        }
    }
    aboutToBeDeleted() {
        this.__cur_bg_color.aboutToBeDeleted();
        this.__cur_text_color.aboutToBeDeleted();
        this.__cur_divider_color.aboutToBeDeleted();
        this.__single_line_Visible.aboutToBeDeleted();
        this.__multi_Line_Visible.aboutToBeDeleted();
        this.__height_message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private cur_emotion: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    private cur_iconUrl: string; //Alert图标url
    private icon_size: number; //Alert图标大小
    private cur_title: string; //Alert的标题文本
    private cur_detail: string; //Alert的详细说明文本
    private isSingleLine: boolean; //是否单行显示
    private height_single_message: number;
    private height_multi_message: number;
    private __cur_bg_color: ObservedPropertySimple<string>; //Alert背景颜色
    get cur_bg_color() {
        return this.__cur_bg_color.get();
    }
    set cur_bg_color(newValue: string) {
        this.__cur_bg_color.set(newValue);
    }
    private __cur_text_color: ObservedPropertySimple<string>; //Alert文本颜色
    get cur_text_color() {
        return this.__cur_text_color.get();
    }
    set cur_text_color(newValue: string) {
        this.__cur_text_color.set(newValue);
    }
    private __cur_divider_color: ObservedPropertySimple<string>; //标题与详细说明之间的分隔线的颜色
    get cur_divider_color() {
        return this.__cur_divider_color.get();
    }
    set cur_divider_color(newValue: string) {
        this.__cur_divider_color.set(newValue);
    }
    private __single_line_Visible: ObservedPropertySimple<Visibility>;
    get single_line_Visible() {
        return this.__single_line_Visible.get();
    }
    set single_line_Visible(newValue: Visibility) {
        this.__single_line_Visible.set(newValue);
    }
    private __multi_Line_Visible: ObservedPropertySimple<Visibility>;
    get multi_Line_Visible() {
        return this.__multi_Line_Visible.get();
    }
    set multi_Line_Visible(newValue: Visibility) {
        this.__multi_Line_Visible.set(newValue);
    }
    private __height_message: ObservedPropertySimple<number>; //Alert高度
    get height_message() {
        return this.__height_message.get();
    }
    set height_message(newValue: number) {
        this.__height_message.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.height(this.height_message);
        Stack.onAppear(() => {
            if (this.isSingleLine == true) {
                this.single_line_Visible = Visibility.Visible;
                this.multi_Line_Visible = Visibility.Hidden;
                this.height_message = this.height_single_message;
            }
            else {
                this.single_line_Visible = Visibility.Hidden;
                this.multi_Line_Visible = Visibility.Visible;
                this.height_message = this.height_multi_message;
            }
        });
        Row.create();
        Row.backgroundColor("" + this.cur_bg_color);
        Row.width("100%");
        Row.height(this.height_multi_message);
        Row.visibility(this.multi_Line_Visible);
        Row.onAppear(() => {
            if (this.multi_Line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#F1F1F1";
                        this.cur_text_color = "#000000";
                        this.cur_divider_color = "#E4E4E4";
                        break;
                    case "primary":
                        this.cur_bg_color = "#EBF2F9";
                        this.cur_text_color = "#000000";
                        this.cur_divider_color = "#D0E0F1";
                        break;
                    case "success":
                        this.cur_bg_color = "#DDF4DF";
                        this.cur_text_color = "#329D38";
                        this.cur_divider_color = "#BAE8B6";
                        break;
                    case "info":
                        this.cur_bg_color = "#DDF3F5";
                        this.cur_text_color = "#03A2B6";
                        this.cur_divider_color = "#DDF3F5";
                        break;
                    case "warning":
                        this.cur_bg_color = "#FFF0D5";
                        this.cur_text_color = "#ED980F";
                        this.cur_divider_color = "#FFF0D5";
                        break;
                    case "danger":
                        this.cur_bg_color = "#FFE5E0";
                        this.cur_text_color = "#E75033";
                        this.cur_divider_color = "#fff1c2b9";
                        break;
                }
            }
        });
        Column.create();
        Column.width("15%");
        Image.create($rawfile(this.cur_iconUrl));
        Image.width(this.icon_size);
        Image.height(this.icon_size);
        Column.pop();
        Column.create();
        Column.width("85%");
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Rect.create();
        Rect.height("2%");
        Rect.fill(this.cur_divider_color);
        Rect.width("98%");
        Row.create();
        Row.width("100%");
        Row.height("49%");
        Row.align(Alignment.Start);
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Row.create();
        Row.backgroundColor("" + this.cur_bg_color);
        Row.width("100%");
        Row.height(this.height_single_message);
        Row.visibility(this.single_line_Visible);
        Row.onAppear(() => {
            if (this.single_line_Visible == Visibility.Visible) {
                switch (this.cur_emotion) {
                    case "":
                        this.cur_bg_color = "#F1F1F1";
                        this.cur_text_color = "#000000";
                        break;
                    case "primary":
                        this.cur_bg_color = "#EBF2F9";
                        this.cur_text_color = "#000000";
                        break;
                    case "success":
                        this.cur_bg_color = "#DDF4DF";
                        this.cur_text_color = "#329D38";
                        break;
                    case "info":
                        this.cur_bg_color = "#DDF3F5";
                        this.cur_text_color = "#03A2B6";
                        break;
                    case "warning":
                        this.cur_bg_color = "#FFF0D5";
                        this.cur_text_color = "#ED980F";
                        break;
                    case "danger":
                        this.cur_bg_color = "#FFE5E0";
                        this.cur_text_color = "#FF2023";
                        break;
                }
            }
        });
        Column.create();
        Column.width("15%");
        Image.create($rawfile(this.cur_iconUrl));
        Image.width(this.icon_size);
        Image.height(this.icon_size);
        Column.pop();
        Column.create();
        Column.width("85%");
        Row.create();
        Row.width("100%");
        Row.height("100%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        Stack.pop();
    }
}
export class Alert_close extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.cur_emotion = "";
        this.cur_iconUrl = "";
        this.icon_size = 30;
        this.cur_title = "";
        this.cur_detail = "";
        this.cur_tip_text = "您可以点击右上角的 X 来关闭这条消息。";
        this.__height_message = new ObservedPropertySimple(100, this, "height_message");
        this.__cur_bg_color = new ObservedPropertySimple("#F1F1F1", this, "cur_bg_color");
        this.__cur_text_color = new ObservedPropertySimple("#000000", this, "cur_text_color");
        this.__closeBtn_visible = new ObservedPropertySimple(Visibility.Visible, this, "closeBtn_visible");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Alert_close_Params) {
        if (params.cur_emotion !== undefined) {
            this.cur_emotion = params.cur_emotion;
        }
        if (params.cur_iconUrl !== undefined) {
            this.cur_iconUrl = params.cur_iconUrl;
        }
        if (params.icon_size !== undefined) {
            this.icon_size = params.icon_size;
        }
        if (params.cur_title !== undefined) {
            this.cur_title = params.cur_title;
        }
        if (params.cur_detail !== undefined) {
            this.cur_detail = params.cur_detail;
        }
        if (params.cur_tip_text !== undefined) {
            this.cur_tip_text = params.cur_tip_text;
        }
        if (params.height_message !== undefined) {
            this.height_message = params.height_message;
        }
        if (params.cur_bg_color !== undefined) {
            this.cur_bg_color = params.cur_bg_color;
        }
        if (params.cur_text_color !== undefined) {
            this.cur_text_color = params.cur_text_color;
        }
        if (params.closeBtn_visible !== undefined) {
            this.closeBtn_visible = params.closeBtn_visible;
        }
    }
    aboutToBeDeleted() {
        this.__height_message.aboutToBeDeleted();
        this.__cur_bg_color.aboutToBeDeleted();
        this.__cur_text_color.aboutToBeDeleted();
        this.__closeBtn_visible.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private cur_emotion: string;
    //感情色彩: (默认为灰色)
    // 默认 -- 灰色     primary -- 蓝色   success -- 绿色
    // info -- 青色    warning -- 橙色   danger -- 红色
    private cur_iconUrl: string; //Alert图标url
    private icon_size: number; //Alert图标大小
    private cur_title: string; //Alert的标题文本
    private cur_detail: string; //Alert的详细说明文本
    private cur_tip_text: string; //Alert的提示文本
    private __height_message: ObservedPropertySimple<number>;
    get height_message() {
        return this.__height_message.get();
    }
    set height_message(newValue: number) {
        this.__height_message.set(newValue);
    }
    private __cur_bg_color: ObservedPropertySimple<string>; //Alert背景颜色
    get cur_bg_color() {
        return this.__cur_bg_color.get();
    }
    set cur_bg_color(newValue: string) {
        this.__cur_bg_color.set(newValue);
    }
    private __cur_text_color: ObservedPropertySimple<string>; //Alert文本颜色
    get cur_text_color() {
        return this.__cur_text_color.get();
    }
    set cur_text_color(newValue: string) {
        this.__cur_text_color.set(newValue);
    }
    private __closeBtn_visible: ObservedPropertySimple<Visibility>;
    get closeBtn_visible() {
        return this.__closeBtn_visible.get();
    }
    set closeBtn_visible(newValue: Visibility) {
        this.__closeBtn_visible.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Column.create();
        Column.backgroundColor("" + this.cur_bg_color);
        Column.borderRadius(10);
        Column.width("98%");
        Column.height(this.height_message);
        Column.onAppear(() => {
            switch (this.cur_emotion) {
                case "":
                    this.cur_bg_color = "#F1F1F1";
                    this.cur_text_color = "#000000";
                    break;
                case "primary":
                    this.cur_bg_color = "#EBF2F9";
                    this.cur_text_color = "#000000";
                    break;
                case "success":
                    this.cur_bg_color = "#DDF4DF";
                    this.cur_text_color = "#329D38";
                    break;
                case "info":
                    this.cur_bg_color = "#DDF3F5";
                    this.cur_text_color = "#03A2B6";
                    break;
                case "warning":
                    this.cur_bg_color = "#FFF0D5";
                    this.cur_text_color = "#ED980F";
                    break;
                case "danger":
                    this.cur_bg_color = "#FFE5E0";
                    this.cur_text_color = "#FF2023";
                    break;
            }
        });
        Row.create();
        Row.height("40%");
        Row.create();
        Row.width("100%");
        Row.height("100%");
        Row.align(Alignment.Start);
        Text.create(this.cur_title);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(900);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Text.create(this.cur_detail);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(400);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Row.pop();
        Row.create();
        Row.height("40%");
        Row.width("100%");
        Text.create(this.cur_tip_text);
        Text.fontWeight(3);
        Text.margin({ left: 10 });
        Text.fontWeight(500);
        Text.fontColor(this.cur_text_color);
        Text.pop();
        Row.pop();
        Column.pop();
        Stack.create();
        Stack.visibility(this.closeBtn_visible);
        Stack.zIndex(10);
        Stack.width("100%");
        Stack.height(this.height_message);
        Stack.align(Alignment.TopEnd);
        Text.create('x');
        Text.width(20);
        Text.height(20);
        Text.fontSize(20);
        Text.fontColor(this.cur_text_color);
        Text.backgroundColor(this.cur_bg_color);
        Text.margin({ top: 5, right: 5 });
        Text.onClick(() => {
            this.closeBtn_visible = Visibility.Hidden;
            this.height_message = 0;
        });
        Text.pop();
        Stack.pop();
        Stack.pop();
    }
}
