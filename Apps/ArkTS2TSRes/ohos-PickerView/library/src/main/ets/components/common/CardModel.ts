let __generate__Id: number = 0;
function generateId(): string {
    return "CardModel_" + ++__generate__Id;
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
const initCardData: number[] = [1, 2, 3, 4, 5];
export function initializeCardData(): Array<CardBean> {
    let cardDataArray: Array<CardBean> = [];
    initCardData.forEach((item: number) => {
        cardDataArray.push(new CardBean("No.ABC12345 " + item));
    });
    cardDataArray.forEach(item => {
        if (item.cardNo.length > 6) {
            let cardNoSubstring = item.cardNo.substring(0, 6) + "...";
            item.cardNo = cardNoSubstring;
        }
    });
    return cardDataArray;
}
let NextId = 0;
export class CardBean {
    id: string;
    cardNo: string;
    constructor(cardNo: string) {
        this.id = `${NextId++}`;
        this.cardNo = cardNo;
    }
}
