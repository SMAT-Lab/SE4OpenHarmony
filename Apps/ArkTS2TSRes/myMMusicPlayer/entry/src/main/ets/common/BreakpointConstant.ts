let __generate__Id: number = 0;
function generateId(): string {
    return "BreakpointConstant_" + ++__generate__Id;
}
export class BreakpointConstant {
    static readonly BREAKPOINT_SM: string = 'sm';
    static readonly BREAKPOINT_MD: string = 'md';
    static readonly BREAKPOINT_LG: string = 'lg';
    static readonly CURRENT_BREAKPOINT: string = 'currentBreakpoint';
    static readonly FONT_SIZE: string = 'fontSize';
    static readonly COVER_MARGIN: string = 'coverMargin';
    static readonly FONT_SIZE_SM: number = 14;
    static readonly FONT_SIZE_MD: number = 16;
    static readonly FONT_SIZE_LG: number = 18;
    static readonly COVER_MARGIN_SM: number = 10;
    static readonly COVER_MARGIN_MD: number = 30;
    static readonly COVER_MARGIN_LG: number = 40;
    static readonly RANGE_SM: string = '(320vp<=width<600vp)';
    static readonly RANGE_MD: string = '(600vp<=width<840vp)';
    static readonly RANGE_LG: string = '(840vp<=width)';
}
