/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import Directory from '../Directory';
import GifAnimationDescriptor from './GifAnimationDescriptor';
class GifAnimationDirectory extends Directory {
    public static readonly TAG_ITERATION_COUNT: number = 1;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(GifAnimationDirectory.TAG_ITERATION_COUNT, "Iteration Count");
    public constructor() {
        super();
        this.setDescriptor(new GifAnimationDescriptor(this));
    }
    public getName(): string {
        return "GIF Animation";
    }
    protected getTagNameMap(): Map<number, string> {
        return GifAnimationDirectory._tagNameMap;
    }
}
export default GifAnimationDirectory;
