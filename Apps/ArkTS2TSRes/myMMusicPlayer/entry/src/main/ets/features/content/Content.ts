interface Content_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Content_" + ++__generate__Id;
}
import { AlbumCover } from './AlbumCover';
import { PlayerList } from './PlayerList';
export class Content extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Content_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        GridRow.create();
        GridCol.create({ span: { sm: 12, md: 6, lg: 4 } });
        let earlierCreatedChild_2: AlbumCover = (this && this.findChildById) ? this.findChildById("2") as AlbumCover : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new AlbumCover("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        GridCol.pop();
        GridCol.create({ span: { sm: 12, md: 6, lg: 8 } });
        let earlierCreatedChild_3: PlayerList = (this && this.findChildById) ? this.findChildById("3") as PlayerList : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new PlayerList("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        GridCol.pop();
        GridRow.pop();
    }
}
