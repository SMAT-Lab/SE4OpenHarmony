interface Index_Params {
    xComponentContext?: XComponentContext | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import CommonConstants from '../common/CommonConstants';
import XComponentContext from "../interface/XComponentContext";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.xComponentContext = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.xComponentContext !== undefined) {
            this.xComponentContext = params.xComponentContext;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private xComponentContext: XComponentContext | undefined;
    render() {
        Column.create();
        Column.height(CommonConstants.FULL_PARENT);
        Column.backgroundColor($r('app.color.back_ground_color'));
        Row.create();
        Row.width(CommonConstants.FULL_PARENT);
        Row.height(CommonConstants.FULL_PARENT);
        XComponent.create({
            id: CommonConstants.X_COMPONENT_ID,
            type: CommonConstants.X_COMPONENT_TYPE,
            libraryname: CommonConstants.X_COMPONENT_LIBRARY_NAME
        });
        XComponent.onLoad((xComponentContext) => {
            this.xComponentContext = xComponentContext as XComponentContext;
            if (this.xComponentContext) {
                this.xComponentContext.drawPattern();
            }
        });
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
