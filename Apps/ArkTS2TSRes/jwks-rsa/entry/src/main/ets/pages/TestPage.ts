interface Index_Params {
    kid?: string;
    alg?: string;
    kty?: string;
    usage?: string;
    publicKey?: string;
    client?: JwksClient | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestPage_" + ++__generate__Id;
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
import { JwksClient } from "@ohos/jwks_rsa";
import util from '@ohos.util';
// let that:ESObject;
class Option {
    jwksUri: string;
    requestHeaders: any; // Optional
    timeout: number = 5000; // Defaults to 30s
    cache: boolean;
    rateLimit: boolean;
    constructor(jwksUri: string, requestHeaders: any, // Optional
    timeout: number, // Defaults to 30s
    cache: boolean, rateLimit: boolean) {
        this.jwksUri = jwksUri;
        this.requestHeaders = requestHeaders;
        this.timeout = timeout;
        this.cache = cache;
        this.rateLimit = rateLimit;
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__kid = new ObservedPropertySimple('', this, "kid");
        this.__alg = new ObservedPropertySimple('', this, "alg");
        this.__kty = new ObservedPropertySimple('', this, "kty");
        this.__usage = new ObservedPropertySimple('', this, "usage");
        this.__publicKey = new ObservedPropertySimple('', this, "publicKey");
        this.client = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.kid !== undefined) {
            this.kid = params.kid;
        }
        if (params.alg !== undefined) {
            this.alg = params.alg;
        }
        if (params.kty !== undefined) {
            this.kty = params.kty;
        }
        if (params.usage !== undefined) {
            this.usage = params.usage;
        }
        if (params.publicKey !== undefined) {
            this.publicKey = params.publicKey;
        }
        if (params.client !== undefined) {
            this.client = params.client;
        }
    }
    aboutToBeDeleted() {
        this.__kid.aboutToBeDeleted();
        this.__alg.aboutToBeDeleted();
        this.__kty.aboutToBeDeleted();
        this.__usage.aboutToBeDeleted();
        this.__publicKey.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __kid: ObservedPropertySimple<string>;
    get kid() {
        return this.__kid.get();
    }
    set kid(newValue: string) {
        this.__kid.set(newValue);
    }
    private __alg: ObservedPropertySimple<string>;
    get alg() {
        return this.__alg.get();
    }
    set alg(newValue: string) {
        this.__alg.set(newValue);
    }
    private __kty: ObservedPropertySimple<string>;
    get kty() {
        return this.__kty.get();
    }
    set kty(newValue: string) {
        this.__kty.set(newValue);
    }
    private __usage: ObservedPropertySimple<string>;
    get usage() {
        return this.__usage.get();
    }
    set usage(newValue: string) {
        this.__usage.set(newValue);
    }
    private __publicKey: ObservedPropertySimple<string>;
    get publicKey() {
        return this.__publicKey.get();
    }
    set publicKey(newValue: string) {
        this.__publicKey.set(newValue);
    }
    private client: JwksClient | null;
    render() {
        Column.create();
        Column.height('100%');
        Column.justifyContent(FlexAlign.Start);
        Column.alignItems(HorizontalAlign.Start);
        Scroll.create();
        Column.create({ space: 5 });
        Column.width('100%');
        Column.margin($r('app.string.margin'));
        Column.alignItems(HorizontalAlign.Start);
        Column.justifyContent(FlexAlign.Start);
        Row.create();
        Row.justifyContent(FlexAlign.Center);
        Row.width('100%');
        Row.height('100vp');
        Button.createWithLabel('点击生成公钥');
        Button.fontSize($r('app.string.button_font_size'));
        Button.width('70%');
        Button.height('70%');
        Button.padding($r('app.string.margin'));
        Button.onClick(() => {
            console.info("===== get publicKey start =====");
            const kid = 'RkI5MjI5OUY5ODc1N0Q4QzM0OUYzNkVGMTJDOUEzQkFCOTU3NjE2Rg';
            //根据kid从秘钥集中获取对应的jwk
            this.getData(kid);
        });
        Button.pop();
        Row.pop();
        Text.create("kid: " + this.kid);
        Text.fontSize($r('app.string.font_size'));
        Text.pop();
        Text.create("alg: " + this.alg);
        Text.fontSize($r('app.string.font_size'));
        Text.pop();
        Text.create("kty: " + this.kty);
        Text.fontSize($r('app.string.font_size'));
        Text.pop();
        Text.create("usage: " + this.usage);
        Text.fontSize($r('app.string.font_size'));
        Text.pop();
        Text.create("publicKey: " + this.publicKey);
        Text.fontSize($r('app.string.font_size'));
        Text.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    aboutToAppear() {
        // that = this;
        let option: Option = new Option('https://sandrino.auth0.com/.well-known/jwks.json', null, 5000, false, true);
        this.client = new JwksClient(option);
    }
    async getData(kid: string) {
        if (this.client != null) {
            let signingKey: any | null = await this.client.getSigningKey(kid);
            console.info("jwks_rsa signingKey:" + JSON.stringify(signingKey));
            this.kid = signingKey.kid;
            this.alg = signingKey.algorithm;
            this.kty = signingKey.type;
            this.usage = signingKey.usage;
            let pubKey: any = await signingKey.getPublicKey();
            let publicData: any = pubKey.getEncoded().data;
            console.info("jwks_rsa public key encode  = " + publicData);
            let base64: util.Base64Helper = new util.Base64Helper();
            this.publicKey = base64.encodeToStringSync(publicData);
            console.info("jwks_rsa publicKey = " + this.publicKey);
        }
    }
}
loadDocument(new Index("1", undefined, {}));
