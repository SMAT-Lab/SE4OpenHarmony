interface Write_Params {
    parsePlistText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Write_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { NSObject } from '@ohos/dd-plist';
import fs from '@ohos.file.fs';
import { PropertyListParser } from '@ohos/dd-plist';
import { NSDate } from '@ohos/dd-plist';
import { NSDictionary } from '@ohos/dd-plist';
import { NSArray } from '@ohos/dd-plist';
import router from '@system.router';
import { GlobalContext } from '../pages/GlobalContext';
let path = GlobalContext.getContext().getValue("path") + '/';
class Write extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__parsePlistText = new ObservedPropertySimple('', this, "parsePlistText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Write_Params) {
        if (params.parsePlistText !== undefined) {
            this.parsePlistText = params.parsePlistText;
        }
    }
    aboutToBeDeleted() {
        this.__parsePlistText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __parsePlistText: ObservedPropertySimple<string>;
    get parsePlistText() {
        return this.__parsePlistText.get();
    }
    set parsePlistText(newValue: string) {
        this.__parsePlistText.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Text.create('写入plist文件');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#4e9bd1');
        Button.onClick(() => {
            this.writeXMLPlist();
        });
        Text.create('写入plist文件');
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.onClick(() => {
            router.back();
        });
        Text.create('返回测试读取');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Text.create("该文件中的内容：");
        Text.fontSize(20);
        Text.align(Alignment.Center);
        Text.margin({ top: 20 });
        Text.pop();
        List.create();
        List.width('80%');
        List.layoutWeight(1);
        List.margin({ top: 10 });
        List.padding({ left: 5, right: 5 });
        List.divider({ strokeWidth: 0.5, color: '#aaa' });
        If.create();
        if (this.parsePlistText.length > 0) {
            If.branchId(0);
            ListItem.create();
            Row.create();
            Row.width('100%');
            Row.height(500);
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ left: 10 });
            Column.alignItems(HorizontalAlign.Start);
            Text.create(this.parsePlistText);
            Text.fontSize(14);
            Text.pop();
            Column.pop();
            Row.pop();
            ListItem.pop();
        }
        If.pop();
        List.pop();
        Flex.pop();
    }
    public writeXMLPlist() {
        //Creating the root object
        let root: NSDictionary = new NSDictionary();
        //Creation of an array of the length 2
        let people: NSArray = new NSArray(2);
        //Creation of the first object to be stored in the array
        let person1: NSDictionary = new NSDictionary();
        //The NSDictionary will automatically wrap strings, numbers and dates in the respective NSObject subclasses
        person1.putByObject("Name", "Peter"); //This will become a NSString
        let date = new Date();
        date.setFullYear(2011, 1, 13);
        date.setHours(9, 28);
        person1.putByObject("RegistrationDate", new NSDate(null, null, null, null, date)); //This will become a NSDate
        person1.putByObject("Age", 23); //This will become a NSNumber
        //Creation of the second object to be stored in the array
        let person2: NSDictionary = new NSDictionary();
        person2.putByObject("Name", "Lisa");
        person2.putByObject("Age", 42);
        person2.putByObject("RegistrationDate", new NSDate(null, null, null, "2010-09-23T12:32:42Z"));
        //Put the objects into the array
        people.setValue(0, person1);
        people.setValue(1, person2);
        //Put the array into the property list
        root.put("People", people);
        this.parsePlistText = root.toXMLPropertyList();
        //        let context = featureAbility.getContext();
        //        let _this = this
        //        context.getOrCreateLocalDir((err, data)=>{
        //          let path = data + "/People.plist"
        //          let ss = fs.createStreamSync(path, "w+")
        //          PropertyListParser.saveAsXMLByStream(root, ss)
        //          ss.closeSync();
        //        })
        let filePath = path + 'People.plist';
        let stream = fs.createStreamSync(filePath, 'w+');
        PropertyListParser.saveAsXMLByStream(root, filePath);
        stream.closeSync();
    }
}
loadDocument(new Write("1", undefined, {}));
