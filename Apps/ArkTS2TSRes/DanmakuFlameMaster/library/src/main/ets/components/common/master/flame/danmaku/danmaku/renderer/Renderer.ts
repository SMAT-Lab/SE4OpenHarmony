let __generate__Id: number = 0;
function generateId(): string {
    return "Renderer_" + ++__generate__Id;
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
import { IRenderer, RenderingState, OnDanmakuShownListener } from './IRenderer';
import { IDanmakus } from '../model/IDanmakus';
import { IDisplayer } from '../model/IDisplayer';
export abstract class Renderer implements IRenderer {
    abstract draw(disp: IDisplayer, danmakus: IDanmakus, startRenderTime: number, renderingState: RenderingState): void;
    abstract clear(): void;
    abstract clearRetainer(): void;
    abstract release(): void;
    abstract setVerifierEnabled(enabled: boolean): void;
    abstract setOnDanmakuShownListener(onDanmakuShownListener: OnDanmakuShownListener): void;
    abstract removeOnDanmakuShownListener(): void;
    abstract alignBottom(enable: boolean): void;
}
