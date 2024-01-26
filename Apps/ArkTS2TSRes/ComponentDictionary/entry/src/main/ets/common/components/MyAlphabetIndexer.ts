interface MyAlphabetIndexer_Params {
    value?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyAlphabetIndexer_" + ++__generate__Id;
}
export class MyAlphabetIndexer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.value = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyAlphabetIndexer_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private value: string[];
    render() {
        AlphabetIndexer.create({ arrayValue: this.value, selected: 0 });
        AlphabetIndexer.selectedColor(0xffffff);
        AlphabetIndexer.popupColor(0xFFFAF0);
        AlphabetIndexer.selectedBackgroundColor(0xCCCCCC);
        AlphabetIndexer.popupBackground(0xD2B48C);
        AlphabetIndexer.usingPopup(true);
        AlphabetIndexer.selectedFont({ size: 16, weight: FontWeight.Bolder });
        AlphabetIndexer.popupFont({ size: 30, weight: FontWeight.Bolder });
        AlphabetIndexer.itemSize(28);
        AlphabetIndexer.alignStyle(IndexerAlign.Left);
        AlphabetIndexer.onSelect((index: number) => {
            console.info(this.value[index] + '被选中了'); // 选中的事件
        });
        AlphabetIndexer.margin({ left: 50 });
    }
}
