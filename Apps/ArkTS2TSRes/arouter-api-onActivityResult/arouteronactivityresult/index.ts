let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
export { Arouter } from "./src/main/ets/components/arouter/arouter";
export { IInterceptor, InterceptorCallback } from "./src/main/ets/components/arouter/interceptorService";
export { navigationWithInterceptor, registerInterceptor, unregisterInterceptor } from "./src/main/ets/components/arouter/interceptorService";
export { clear } from "./src/main/ets/components/arouter/logisticsCeter";
export { NavigationCallback } from "./src/main/ets/components/arouter/navigationCallback";
export { Postcard } from "./src/main/ets/components/arouter/postcard";
export { PretreatmentService } from "./src/main/ets/components/arouter/pretreatmenService";
export { GlobalContext } from "./src/main/ets/components/arouter/GlobalContext";
