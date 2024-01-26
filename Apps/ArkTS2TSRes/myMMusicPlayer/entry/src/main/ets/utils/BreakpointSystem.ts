let __generate__Id: number = 0;
function generateId(): string {
    return "BreakpointSystem_" + ++__generate__Id;
}
import mediaQuery from '@ohos.mediaquery';
import { BreakpointConstant } from '../common/BreakpointConstant';
export class BreakpointSystem {
    private currentBreakpoint: string = BreakpointConstant.BREAKPOINT_SM;
    private smListener: mediaQuery.MediaQueryListener;
    private mdListener: mediaQuery.MediaQueryListener;
    private lgListener: mediaQuery.MediaQueryListener;
    private updateCurrentBreakpoint(breakpoint: string) {
        if (this.currentBreakpoint != breakpoint) {
            this.currentBreakpoint = breakpoint;
            AppStorage.Set<string>(BreakpointConstant.CURRENT_BREAKPOINT, this.currentBreakpoint);
        }
    }
    private isBreakpointLG = (mediaQueryResult: mediaQuery.MediaQueryResult): void => {
        if (mediaQueryResult.matches) {
            this.updateCurrentBreakpoint(BreakpointConstant.BREAKPOINT_LG);
            AppStorage.Set<number>(BreakpointConstant.FONT_SIZE, BreakpointConstant.FONT_SIZE_LG);
            AppStorage.Set<number>(BreakpointConstant.COVER_MARGIN, BreakpointConstant.COVER_MARGIN_LG);
        }
    };
    private isBreakpointMD = (mediaQueryResult: mediaQuery.MediaQueryResult): void => {
        if (mediaQueryResult.matches) {
            this.updateCurrentBreakpoint(BreakpointConstant.BREAKPOINT_MD);
            AppStorage.Set<number>(BreakpointConstant.FONT_SIZE, BreakpointConstant.FONT_SIZE_MD);
            AppStorage.Set<number>(BreakpointConstant.COVER_MARGIN, BreakpointConstant.COVER_MARGIN_MD);
        }
    };
    private isBreakpointSM(mediaQueryResult: mediaQuery.MediaQueryResult): void {
        if (mediaQueryResult.matches) {
            this.updateCurrentBreakpoint(BreakpointConstant.BREAKPOINT_SM);
            AppStorage.Set<number>(BreakpointConstant.FONT_SIZE, BreakpointConstant.FONT_SIZE_SM);
            AppStorage.Set<number>(BreakpointConstant.COVER_MARGIN, BreakpointConstant.COVER_MARGIN_SM);
        }
    }
    public register(): void {
        this.smListener = mediaQuery.matchMediaSync(BreakpointConstant.RANGE_SM);
        let smFuncion = this.isBreakpointSM.bind(this);
        this.smListener.on('change', smFuncion);
        this.mdListener = mediaQuery.matchMediaSync(BreakpointConstant.RANGE_MD);
        this.mdListener.on('change', this.isBreakpointMD);
        this.lgListener = mediaQuery.matchMediaSync(BreakpointConstant.RANGE_LG);
        this.lgListener.on('change', this.isBreakpointLG);
    }
    public unRegister(): void {
        this.smListener.off('change', this.isBreakpointSM);
        this.mdListener.off('change', this.isBreakpointMD);
        this.lgListener.off('change', this.isBreakpointLG);
    }
}
