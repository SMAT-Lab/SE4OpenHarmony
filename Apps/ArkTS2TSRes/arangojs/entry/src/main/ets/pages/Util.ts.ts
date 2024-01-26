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
export async function getData(selectCollection) {
    let datas;
    const res = await selectCollection.all();
    let data = await res.all();
    data.forEach((v) => {
        datas.push(v);
    });
    return datas;
}
export async function createEdgeCollection(selectCollection, collectionText) {
    return await selectCollection.createEdgeCollection(collectionText);
}
export async function createCollection(selectCollection, collectionText) {
    return await selectCollection.createCollection(collectionText);
}
export function getCollection(selectCollection, name) {
    return selectCollection.collection(name);
}
export async function remove(selectCollection, id) {
    return await selectCollection.remove(id);
}
export async function save(selectCollection, obj, objNew?) {
    if (objNew == undefined) {
        return await selectCollection.save(obj);
    }
    else {
        return await selectCollection.save(obj, objNew);
    }
}
