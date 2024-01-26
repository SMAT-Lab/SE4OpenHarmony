/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
export default class MsgListBean {
    public Date: string = '';
    public From: string = '';
    public To: string = '';
    public Subject: string = '';
    public uid: string = '';
    constructor() {
    }
}
export class MsgListHeadBean extends MsgListBean {
    constructor() {
        super();
        this.Date = '';
        this.From = '';
        this.To = '';
        this.uid = '';
        this.Subject = '点击刷新(等同下拉刷新)';
    }
}
export class MsgListFootBean extends MsgListBean {
    constructor() {
        super();
        this.Date = '';
        this.From = '';
        this.To = '';
        this.uid = '';
        this.Subject = '点击加载更多(等同上拉加载)';
    }
}
