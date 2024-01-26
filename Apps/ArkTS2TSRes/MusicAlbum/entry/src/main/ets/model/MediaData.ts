let __generate__Id: number = 0;
function generateId(): string {
    return "MediaData_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import mediaQuery from '@ohos.mediaquery';
interface MediaQueryResult {
    matches: boolean;
}
export default class BreakpointSystem {
    private currentBreakpoint: string = 'md';
    private smListener: mediaQuery.MediaQueryListener = {} as mediaQuery.MediaQueryListener;
    private mdListener: mediaQuery.MediaQueryListener = {} as mediaQuery.MediaQueryListener;
    private lgListener: mediaQuery.MediaQueryListener = {} as mediaQuery.MediaQueryListener;
    private updateCurrentBreakpoint(breakpoint: string) {
        if (this.currentBreakpoint !== breakpoint) {
            this.currentBreakpoint = breakpoint;
            AppStorage.Set<string>('currentBreakpoint', this.currentBreakpoint);
        }
    }
    private isBreakpointSM = (mediaQueryResult: MediaQueryResult) => {
        if (mediaQueryResult.matches) {
            this.updateCurrentBreakpoint('sm');
            AppStorage.Set<number>('fontSize', 14);
            AppStorage.Set<number>('coverMargin', 10);
        }
    };
    private isBreakpointMD = (mediaQueryResult: MediaQueryResult) => {
        if (mediaQueryResult.matches) {
            this.updateCurrentBreakpoint('md');
            AppStorage.Set<number>('fontSize', 16);
            AppStorage.Set<number>('coverMargin', 30);
        }
    };
    private isBreakpointLG = (mediaQueryResult: MediaQueryResult) => {
        if (mediaQueryResult.matches) {
            this.updateCurrentBreakpoint('lg');
            AppStorage.Set<number>('fontSize', 18);
            AppStorage.Set<number>('coverMargin', 40);
        }
    };
    public register() {
        this.smListener = mediaQuery.matchMediaSync('(320vp<=width<520vp)');
        this.smListener.on('change', this.isBreakpointSM);
        this.mdListener = mediaQuery.matchMediaSync('(520vp<=width<840vp)');
        this.mdListener.on('change', this.isBreakpointMD);
        this.lgListener = mediaQuery.matchMediaSync('(840vp<=width)');
        this.lgListener.on('change', this.isBreakpointLG);
    }
    public unregister() {
        this.smListener.off('change', this.isBreakpointSM);
        this.mdListener.off('change', this.isBreakpointMD);
        this.lgListener.off('change', this.isBreakpointLG);
    }
}
