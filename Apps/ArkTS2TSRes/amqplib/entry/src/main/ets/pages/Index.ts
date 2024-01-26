interface Index_Params {
    routes?: routeBean[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import router from '@ohos.router';
class routeBean {
    name: string | Resource = '';
    path: string = '';
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.routes = [
            {
                name: 'WorkQueues(直连交换机)',
                path: 'pages/WorkQueues'
            },
            {
                name: 'PubSub(扇形交换机)',
                path: 'pages/PubSub'
            },
            {
                name: 'Routing(多队列匹配)',
                path: 'pages/Routing'
            },
            {
                name: 'Topics(主题交换机)',
                path: 'pages/Topics'
            }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.routes !== undefined) {
            this.routes = params.routes;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private routes: routeBean[];
    render() {
        Column.create({ space: 20 });
        Column.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.routes), (item: routeBean) => {
            Text.create(item.name);
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
            Text.onClick(() => {
                router.pushUrl({ url: item.path } as router.RouterOptions);
            });
            Text.pop();
        });
        ForEach.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
