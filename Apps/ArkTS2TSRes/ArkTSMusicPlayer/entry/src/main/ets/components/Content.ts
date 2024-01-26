interface Content_Params {
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Content_" + ++__generate__Id;
}
import { GridConstants } from '../common/constants/GridConstants';
import { StyleConstants } from '../common/constants/StyleConstants';
import { AlbumCover } from './AlbumCover';
import { PlayList } from './PlayList';
export class Content extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWay(params.currentBreakpoint, this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Content_Params) {
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakpoint: SynchedPropertySimpleTwoWay<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    render() {
        GridRow.create();
        GridRow.height(StyleConstants.FULL_HEIGHT);
        GridRow.onBreakpointChange((breakpoints: string) => {
            this.currentBreakpoint = breakpoints;
        });
        // 封面
        GridCol.create({ span: { sm: GridConstants.SPAN_TWELVE, md: GridConstants.SPAN_SIX, lg: GridConstants.SPAN_FOUR } });
        // 封面
        GridCol.backgroundColor($r('app.color.album_background'));
        let earlierCreatedChild_2: AlbumCover = (this && this.findChildById) ? this.findChildById("2") as AlbumCover : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new AlbumCover("2", this, { currentBreakpoint: this.__currentBreakpoint }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        // 封面
        GridCol.pop();
        // 歌曲列表
        GridCol.create({ span: { sm: GridConstants.SPAN_TWELVE, md: GridConstants.SPAN_SIX, lg: GridConstants.SPAN_EIGHT } });
        // 歌曲列表
        GridCol.borderRadius($r('app.float.playlist_border_radius'));
        let earlierCreatedChild_3: PlayList = (this && this.findChildById) ? this.findChildById("3") as PlayList : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new PlayList("3", this, { currentBreakpoint: this.__currentBreakpoint }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        // 歌曲列表
        GridCol.pop();
        GridRow.pop();
    }
}
