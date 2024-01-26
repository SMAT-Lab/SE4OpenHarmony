interface Label_useInButton_danger_3_Params {
    bgColor?: string;
}
interface Label_useInButton_warning_3_Params {
    bgColor?: string;
}
interface Label_useInButton_info_3_Params {
    bgColor?: string;
}
interface Label_useInButton_success_3_Params {
    bgColor?: string;
}
interface Label_useInButton_primary_3_Params {
    bgColor?: string;
}
interface Label_useInButton_danger_2_Params {
    bgColor?: string;
}
interface Label_useInButton_warning_2_Params {
    bgColor?: string;
}
interface Label_useInButton_info_2_Params {
    bgColor?: string;
}
interface Label_useInButton_success_2_Params {
    bgColor?: string;
}
interface Label_useInButton_primary_2_Params {
    bgColor?: string;
}
interface Label_useInButton_default_2_Params {
    bgColor?: string;
}
interface Label_useInButton_danger_1_Params {
    bgColor?: string;
}
interface Label_useInButton_warning_1_Params {
    bgColor?: string;
}
interface Label_useInButton_info_1_Params {
    bgColor?: string;
}
interface Label_useInButton_success_1_Params {
    bgColor?: string;
}
interface Label_useInButton_primary_1_Params {
    bgColor?: string;
}
interface Label_useInButton_danger_Params {
    bgColor?: string;
}
interface Label_useInButton_warning_Params {
    bgColor?: string;
}
interface Label_useInButton_info_Params {
    bgColor?: string;
}
interface Label_useInButton_success_Params {
    bgColor?: string;
}
interface Label_useInButton_primary_Params {
    bgColor?: string;
}
interface Label_useInButton_default_Params {
    bgColor?: string;
}
interface Label_outline_dot_danger_Params {
}
interface Label_outline_dot_warning_Params {
}
interface Label_outline_dot_info_Params {
}
interface Label_outline_dot_success_Params {
}
interface Label_outline_dot_primary_Params {
}
interface Label_outline_dot_default_Params {
}
interface Label_outline_badge_danger_Params {
}
interface Label_outline_badge_warning_Params {
}
interface Label_outline_badge_info_Params {
}
interface Label_outline_badge_success_Params {
}
interface Label_outline_badge_primary_Params {
}
interface Label_outline_badge_default_Params {
}
interface Label_outline_topic_danger_Params {
}
interface Label_outline_topic_warning_Params {
}
interface Label_outline_topic_info_Params {
}
interface Label_outline_topic_success_Params {
}
interface Label_outline_topic_primary_Params {
}
interface Label_outline_topic_default_Params {
}
interface Label_dot_danger_Params {
}
interface Label_dot_warning_Params {
}
interface Label_dot_info_Params {
}
interface Label_dot_success_Params {
}
interface Label_dot_primary_Params {
}
interface Label_dot_default_Params {
}
interface Label_badge_danger_Params {
}
interface Label_badge_warning_Params {
}
interface Label_badge_info_Params {
}
interface Label_badge_success_Params {
}
interface Label_badge_primary_Params {
}
interface Label_badge_default_Params {
}
interface Label_topic_danger_Params {
}
interface Label_topic_warning_Params {
}
interface Label_topic_info_Params {
}
interface Label_topic_success_Params {
}
interface Label_topic_primary_Params {
}
interface Label_topic_default_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Label_" + ++__generate__Id;
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
export const baseColor: string = "#ffdedede";
export const defaultColor: string = "#ff808080";
export const primaryColor: string = "#ff3280fc";
export const successColor: string = "#ff38b03f";
export const infoColor: string = "#ff03b8cf";
export const warningColor: string = "#fff1a325";
export const dangerColor: string = "#ffea644a";
export class Label_topic_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_topic_default_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    //  private textContent:string = "Default"
    //  private fontColor:string = "#ffffffff"
    render() {
        Flex.create();
        Text.create("Default");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(5);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(defaultColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_topic_primary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_topic_primary_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Primary");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(5);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(primaryColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_topic_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_topic_success_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Success");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(5);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(successColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_topic_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_topic_info_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Info");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(5);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(infoColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_topic_warning extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_topic_warning_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Warning");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(5);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(warningColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_topic_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_topic_danger_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Danger");
        Text.fontSize(16);
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(5);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(dangerColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_badge_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_badge_default_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Default");
        Text.fontSize(16);
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(defaultColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_badge_primary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_badge_primary_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Primary");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(primaryColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_badge_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_badge_success_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Success");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(successColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_badge_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_badge_info_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Info");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(infoColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_badge_warning extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_badge_warning_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Warning");
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(warningColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_badge_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_badge_danger_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Danger");
        Text.fontSize(16);
        Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(dangerColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_dot_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_dot_default_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(20);
        Circle.height(20);
        Circle.fill(defaultColor);
        Flex.pop();
    }
}
export class Label_dot_primary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_dot_primary_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(20);
        Circle.height(20);
        Circle.fill(primaryColor);
        Flex.pop();
    }
}
export class Label_dot_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_dot_success_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(20);
        Circle.height(20);
        Circle.fill(successColor);
        Flex.pop();
    }
}
export class Label_dot_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_dot_info_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(20);
        Circle.height(20);
        Circle.fill(infoColor);
        Flex.pop();
    }
}
export class Label_dot_warning extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_dot_warning_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(20);
        Circle.height(20);
        Circle.fill(warningColor);
        Flex.pop();
    }
}
export class Label_dot_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_dot_danger_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(20);
        Circle.height(20);
        Circle.fill(dangerColor);
        Flex.pop();
    }
}
export class Label_outline_topic_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_topic_default_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Default");
        Text.fontSize(16);
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(5);
        Text.fontColor(defaultColor);
        Text.borderColor(defaultColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_topic_primary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_topic_primary_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Primary");
        Text.fontSize(16);
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(5);
        Text.fontColor(primaryColor);
        Text.borderColor(primaryColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_topic_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_topic_success_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Success");
        Text.fontSize(16);
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(5);
        Text.fontColor(successColor);
        Text.borderColor(successColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_topic_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_topic_info_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Info");
        Text.fontSize(16);
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(5);
        Text.fontColor(infoColor);
        Text.borderColor(infoColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_topic_warning extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_topic_warning_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Warning");
        Text.fontSize(16);
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(5);
        Text.fontColor(warningColor);
        Text.borderColor(warningColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_topic_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_topic_danger_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Danger");
        Text.fontSize(16);
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(5);
        Text.fontColor(dangerColor);
        Text.borderColor(dangerColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_badge_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_badge_default_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Default");
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.backgroundColor("#ffffffff");
        Text.fontColor(defaultColor);
        Text.borderColor(defaultColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_badge_primary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_badge_primary_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Primary");
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.backgroundColor("#ffffffff");
        Text.fontColor(primaryColor);
        Text.borderColor(primaryColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_badge_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_badge_success_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Success");
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.backgroundColor("#ffffffff");
        Text.fontColor(successColor);
        Text.borderColor(successColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_badge_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_badge_info_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Info");
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.backgroundColor("#ffffffff");
        Text.fontColor(infoColor);
        Text.borderColor(infoColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_badge_warning extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_badge_warning_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Warning");
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.backgroundColor("#ffffffff");
        Text.fontColor(warningColor);
        Text.borderColor(warningColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_badge_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_badge_danger_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Text.create("Danger");
        Text.borderWidth(2);
        Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
        Text.borderRadius(20);
        Text.fontSize(16);
        Text.backgroundColor("#ffffffff");
        Text.fontColor(dangerColor);
        Text.borderColor(dangerColor);
        Text.pop();
        Flex.pop();
    }
}
export class Label_outline_dot_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_dot_default_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(19);
        Circle.height(19);
        Circle.fill("#ffffffff");
        Circle.strokeWidth(1);
        Circle.stroke(defaultColor);
        Flex.pop();
    }
}
export class Label_outline_dot_primary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_dot_primary_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(19);
        Circle.height(19);
        Circle.fill("#ffffffff");
        Circle.strokeWidth(1);
        Circle.stroke(primaryColor);
        Flex.pop();
    }
}
export class Label_outline_dot_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_dot_success_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(19);
        Circle.height(19);
        Circle.fill("#ffffffff");
        Circle.strokeWidth(1);
        Circle.stroke(successColor);
        Flex.pop();
    }
}
export class Label_outline_dot_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_dot_info_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(19);
        Circle.height(19);
        Circle.fill("#ffffffff");
        Circle.strokeWidth(1);
        Circle.stroke(infoColor);
        Flex.pop();
    }
}
export class Label_outline_dot_warning extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_dot_warning_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(19);
        Circle.height(19);
        Circle.fill("#ffffffff");
        Circle.strokeWidth(1);
        Circle.stroke(warningColor);
        Flex.pop();
    }
}
export class Label_outline_dot_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_outline_dot_danger_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Flex.create();
        Circle.create();
        Circle.width(19);
        Circle.height(19);
        Circle.fill("#ffffffff");
        Circle.strokeWidth(1);
        Circle.stroke(dangerColor);
        Flex.pop();
    }
}
export class Label_useInButton_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_default_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("我的消息");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(defaultColor);
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_primary extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_primary_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(primaryColor);
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_success extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_success_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(successColor);
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_info extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_info_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(infoColor);
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_warning extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_warning_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(warningColor);
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_danger extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_danger_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor(dangerColor);
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_primary_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(primaryColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_primary_1_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = primaryColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ff2464cd";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor("#ff2464cd");
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_success_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(successColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_success_1_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = successColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ff277c2e";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor("#ff277c2e");
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_info_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(infoColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_info_1_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = infoColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ff058492";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor("#ff058492");
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_warning_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(warningColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_warning_1_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = warningColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ffcd8a1b";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor("#ffcd8a1b");
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_danger_1 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(dangerColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_danger_1_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = dangerColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ffc1482f";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Text.create("12");
        Text.fontSize(16);
        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        Text.borderRadius(20);
        Text.fontColor("#ffffffff");
        Text.backgroundColor("#ffc1482f");
        Text.margin({ top: 3, bottom: 3 });
        Text.pop();
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_default_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_default_2_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("列表");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ff2464cd");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_primary_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_primary_2_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ff2464cd");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_success_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_success_2_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ff277c2e");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_info_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_info_2_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ff058492");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_warning_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_warning_2_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ffcd8a1b");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_danger_2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(baseColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_danger_2_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = baseColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = defaultColor;
            console.log("点击按钮");
        });
        Text.create("处理错误");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ffc1482f");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_primary_3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(primaryColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_primary_3_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = primaryColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ff2464cd";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ff2464cd");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_success_3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(successColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_success_3_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = successColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ff277c2e";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ff277c2e");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_info_3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(infoColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_info_3_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = infoColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ff058492";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ff058492");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_warning_3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(warningColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_warning_3_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = warningColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ffcd8a1b";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ffcd8a1b");
        Row.pop();
        Flex.pop();
    }
}
export class Label_useInButton_danger_3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__bgColor = new ObservedPropertySimple(dangerColor, this, "bgColor");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Label_useInButton_danger_3_Params) {
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
    }
    aboutToBeDeleted() {
        this.__bgColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __bgColor: ObservedPropertySimple<string>;
    get bgColor() {
        return this.__bgColor.get();
    }
    set bgColor(newValue: string) {
        this.__bgColor.set(newValue);
    }
    render() {
        Flex.create();
        Row.create();
        Context.animation({
            duration: 50,
            onFinish: () => {
                this.bgColor = dangerColor;
            }
        });
        Row.backgroundColor(this.bgColor);
        Row.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        Row.borderRadius(5);
        Context.animation(null);
        Row.onClick(() => {
            this.bgColor = "#ffc1482f";
            console.log("点击按钮");
        });
        Text.create("联系人");
        Text.fontColor("#ffffffff");
        Text.margin({ right: 5, top: 3, bottom: 3 });
        Text.alignSelf(ItemAlign.Center);
        Text.pop();
        Circle.create();
        Circle.width(10);
        Circle.height(10);
        Circle.fill("#ffc1482f");
        Row.pop();
        Flex.pop();
    }
}
