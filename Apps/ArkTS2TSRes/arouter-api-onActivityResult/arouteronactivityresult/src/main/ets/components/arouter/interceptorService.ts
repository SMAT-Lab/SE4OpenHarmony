let __generate__Id: number = 0;
function generateId(): string {
    return "interceptorService_" + ++__generate__Id;
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
import { Arouter } from "./arouter";
import { GlobalContext } from './GlobalContext';
export interface IInterceptor {
    process: (postcard: Postcard, callback: InterceptorCallback) => void;
}
export interface InterceptorCallback {
    onContinue: (postcard: Postcard) => void;
    onInterrupt: (postcard: Postcard) => void;
}
export function navigationWithInterceptor(postcard: Postcard) {
    if (postcard.getGreenChannel()) {
        Arouter.getInstance()._navigation(postcard);
    }
    else {
        let interceptor: Interceptor = GlobalContext.getContext().getObject("interceptor") as Interceptor;
        if (interceptor != null) {
            interceptor.getIInterceptor().process(postcard, interceptor.getCallback());
        }
        else {
            Arouter.getInstance()._navigation(postcard);
        }
    }
}
export function registerInterceptor(iInterceptor: IInterceptor) {
    let interceptor: Interceptor = GlobalContext.getContext().getObject("interceptor") as Interceptor;
    if (interceptor == null) {
        GlobalContext.getContext().setObject("interceptor", new Interceptor(iInterceptor));
    }
    else {
        interceptor.setIIterceptor(iInterceptor);
    }
}
export function unregisterInterceptor() {
    GlobalContext.getContext().setObject("interceptor", null);
}
class Interceptor {
    private callback: InterceptorCallback;
    private iInterceptor: IInterceptor;
    constructor(iInterceptor: IInterceptor) {
        this.iInterceptor = iInterceptor;
        this.callback = {
            onInterrupt(postcard: Postcard) {
                if (postcard != null && postcard.getNavigationCallback() != null) {
                    postcard.getNavigationCallback()!.onInterrupt(postcard);
                }
            },
            onContinue(postcard: Postcard) {
                Arouter.getInstance()._navigation(postcard);
            }
        };
        GlobalContext.getContext().setObject("interceptor", this);
    }
    ;
    setIIterceptor(iInterceptor: IInterceptor) {
        this.iInterceptor = iInterceptor;
    }
    getIInterceptor(): IInterceptor {
        return this.iInterceptor;
    }
    getCallback(): InterceptorCallback {
        return this.callback;
    }
}
