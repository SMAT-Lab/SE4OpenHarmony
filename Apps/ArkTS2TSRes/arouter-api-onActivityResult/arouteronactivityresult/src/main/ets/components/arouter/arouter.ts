let __generate__Id: number = 0;
function generateId(): string {
    return "arouter_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { Postcard } from './postcard';
import { navigationWithInterceptor } from "./interceptorService";
import { PretreatmentService } from './pretreatmenService';
import { NavigationCallback } from './navigationCallback';
import router from '@ohos.router';
import { GlobalContext } from './GlobalContext';
export class Arouter {
    build(uri: string): Postcard {
        return new Postcard(uri, new Object());
    }
    private static sInstance: Arouter;
    public static getInstance(): Arouter {
        if (!Arouter.sInstance) {
            Arouter.sInstance = new Arouter();
        }
        return Arouter.sInstance;
    }
    getPostcard(path: string): Postcard {
        let routes: Map<string, Postcard> = GlobalContext.getContext().getObject("routes") as Map<string, Postcard>;
        if (!!routes) {
            let routesd: Postcard | undefined = routes.get(path);
            if (routesd != undefined) {
                return routesd;
            }
            else {
                return new Postcard("", "");
            }
        }
        else {
            return new Postcard("", "");
        }
    }
    inject(postcard: Postcard) {
        let routes: Map<string, Postcard> = GlobalContext.getContext().getObject("routes") as Map<string, Postcard>;
        if (routes == null) {
            GlobalContext.getContext().setObject("routes", new Map());
            routes = GlobalContext.getContext().getObject("routes") as Map<string, Postcard>;
        }
        routes.set(postcard.getUri(), postcard);
    }
    navigation(postcard: Postcard, callback: NavigationCallback) {
        postcard.setNavigationCallback(callback);
        let pretreatmentService: PretreatmentService = postcard.getPretreatmentService() as PretreatmentService;
        if (pretreatmentService != null && !pretreatmentService.onPretreatment(postcard)) {
        }
        else {
            navigationWithInterceptor(postcard);
        }
    }
    _navigation(postcard: Postcard) {
        this.inject(postcard);
        if (postcard.getFlags()) {
            router.replace({
                url: postcard.getUri(),
                params: postcard.getParams()
            });
        }
        else {
            router.push({
                url: postcard.getUri(),
                params: postcard.getParams()
            });
        }
    }
}
