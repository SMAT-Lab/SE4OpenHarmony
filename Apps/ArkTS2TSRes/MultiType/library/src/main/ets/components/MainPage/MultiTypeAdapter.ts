interface MultiTypeAdapter_Params {
    array?: Array<ESObject>;
    child?: (array: ESObject, index: number) => ESObject;
    attribute?: Attributes;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MultiTypeAdapter_" + ++__generate__Id;
}
/*
Copyright (c) 2021 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { Attributes } from './Attributes';
export class MultiTypeAdapter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.array = [];
        this.child = undefined;
        this.attribute = {} //属性
        ;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MultiTypeAdapter_Params) {
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.child !== undefined) {
            this.child = params.child;
        }
        if (params.attribute !== undefined) {
            this.attribute = params.attribute;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private array: Array<any>;
    private __child?;
    private attribute?: Attributes; //属性
    render() {
        Column.create();
        List.create({
            space: this.attribute?.space == undefined ? 0 : this.attribute.space,
            initialIndex: this.attribute?.initialIndex == undefined ? 0 : this.attribute.initialIndex
        });
        List.listDirection(this.attribute?.listDirection == undefined ? Axis.Vertical : this.attribute.listDirection);
        List.divider(this.attribute?.divider == undefined ? { strokeWidth: 0 } : this.attribute.divider);
        List.edgeEffect(this.attribute?.edgeEffect == undefined ? EdgeEffect.None : this.attribute.edgeEffect);
        List.chainAnimation(this.attribute?.chainAnimation == undefined ? false : this.attribute.chainAnimation);
        List.onScrollIndex((firstIndex: number, lastIndex: number) => {
            if (this.attribute?.onScrollIndex) {
                this.attribute?.onScrollIndex(firstIndex, lastIndex);
            }
        });
        List.editMode(this.attribute?.editMode == undefined ? false : this.attribute.editMode);
        List.onItemDelete((index: number) => {
            if (this.attribute?.onItemDelete) {
                this.attribute?.onItemDelete(index);
            }
            return true;
        });
        List.width(this.attribute?.width);
        List.height(this.attribute?.height);
        List.padding({
            top: this.attribute?.topPadding,
            right: this.attribute?.rightPadding,
            bottom: this.attribute?.bottomPadding,
            left: this.attribute?.leftPadding,
        });
        List.margin({
            top: this.attribute?.topMargin,
            right: this.attribute?.rightMargin,
            bottom: this.attribute?.bottomMargin,
            left: this.attribute?.leftMargin,
        });
        List.backgroundColor(this.attribute?.backgroundColor);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.array), (item: any, index: number) => {
            ListItem.create();
            ListItem.sticky(this.attribute?.sticky == undefined ? Sticky.None : this.attribute.sticky);
            ListItem.editable(this.attribute?.editMode == undefined ? false : this.attribute.editMode);
            If.create();
            if (this.child) {
                If.branchId(0);
                this.child(this.array, index, this);
            }
            If.pop();
            ListItem.pop();
        }, (item: string) => JSON.stringify(item));
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
