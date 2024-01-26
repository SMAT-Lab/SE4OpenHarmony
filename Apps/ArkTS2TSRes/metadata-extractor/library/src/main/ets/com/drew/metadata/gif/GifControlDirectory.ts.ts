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
import GifControlDescriptor from './GifControlDescriptor';
class GifControlDirectory extends Directory {
    public static readonly TAG_DELAY: number = 1;
    public static readonly TAG_DISPOSAL_METHOD: number = 2;
    public static readonly TAG_USER_INPUT_FLAG: number = 3;
    public static readonly TAG_TRANSPARENT_COLOR_FLAG: number = 4;
    public static readonly TAG_TRANSPARENT_COLOR_INDEX: number = 5;
    private static readonly _tagNameMap: Map<number, string> = new Map<number, string>()
        .set(GifControlDirectory.TAG_DELAY, "Delay")
        .set(GifControlDirectory.TAG_DISPOSAL_METHOD, "Disposal Method")
        .set(GifControlDirectory.TAG_USER_INPUT_FLAG, "User Input Flag")
        .set(GifControlDirectory.TAG_TRANSPARENT_COLOR_FLAG, "Transparent Color Flag")
        .set(GifControlDirectory.TAG_TRANSPARENT_COLOR_INDEX, "Transparent Color Index");
    public constructor() {
        super();
        this.setDescriptor(new GifControlDescriptor(this));
    }
    public getName(): string {
        return "GIF Control";
    }
    public getDisposalMethod(): InstanceType<typeof GifControlDirectory.DisposalMethod> {
        return this.getObject(GifControlDirectory.TAG_DISPOSAL_METHOD);
    }
    public isTransparent(): boolean {
        let transparent: boolean = this.getBooleanObject(GifControlDirectory.TAG_TRANSPARENT_COLOR_FLAG);
        return transparent != null && transparent;
    }
    protected getTagNameMap(): Map<number, string> {
        return GifControlDirectory._tagNameMap;
    }
    /**
       * Disposal method indicates the way in which the graphic is to be treated
       * after being displayed.
       */
    static DisposalMethod = class {
        public static NOT_SPECIFIED;
        public static DO_NOT_DISPOSE;
        public static RESTORE_TO_BACKGROUND_COLOR;
        public static RESTORE_TO_PREVIOUS;
        public static TO_BE_DEFINED;
        public static INVALID;
    };
    public static typeOf(value: number): InstanceType<typeof GifControlDirectory.DisposalMethod> {
        switch (value) {
            case 0:
                return GifControlDirectory.DisposalMethod.NOT_SPECIFIED;
            case 1:
                return GifControlDirectory.DisposalMethod.DO_NOT_DISPOSE;
            case 2:
                return GifControlDirectory.DisposalMethod.RESTORE_TO_BACKGROUND_COLOR;
            case 3:
                return GifControlDirectory.DisposalMethod.RESTORE_TO_PREVIOUS;
            case 4:
            case 5:
            case 6:
            case 7:
                return GifControlDirectory.DisposalMethod.TO_BE_DEFINED;
            default:
                return GifControlDirectory.DisposalMethod.INVALID;
        }
    }
    public toString(): string {
        switch (GifControlDirectory.DisposalMethod) {
            case GifControlDirectory.DisposalMethod.DO_NOT_DISPOSE:
                return "Don't Dispose";
            case GifControlDirectory.DisposalMethod.INVALID:
                return "Invalid value";
            case GifControlDirectory.DisposalMethod.NOT_SPECIFIED:
                return "Not Specified";
            case GifControlDirectory.DisposalMethod.RESTORE_TO_BACKGROUND_COLOR:
                return "Restore to Background Color";
            case GifControlDirectory.DisposalMethod.RESTORE_TO_PREVIOUS:
                return "Restore to Previous";
            case GifControlDirectory.DisposalMethod.TO_BE_DEFINED:
                return "To Be Defined";
            default:
                return super.toString();
        }
    }
}
export default GifControlDirectory;
