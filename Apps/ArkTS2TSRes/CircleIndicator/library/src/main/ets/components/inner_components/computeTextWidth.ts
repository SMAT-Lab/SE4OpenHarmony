interface ComputeTextWidth_Params {
    textModel?: ComputeTextWidth.textModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "computeTextWidth_" + ++__generate__Id;
}
class ComputeTextWidth extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textModel = new ObservedPropertyObject(new ComputeTextWidth.textModel(), this, "textModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ComputeTextWidth_Params) {
        if (params.textModel !== undefined) {
            this.textModel = params.textModel;
        }
    }
    aboutToBeDeleted() {
        this.__textModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textModel: ObservedPropertyObject<ComputeTextWidth.textModel>;
    get textModel() {
        return this.__textModel.get();
    }
    set textModel(newValue: ComputeTextWidth.textModel) {
        this.__textModel.set(newValue);
    }
    render() {
        Scroll.create(this.textModel.getScroller());
        Scroll.width("100%");
        Scroll.height("0px");
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.align(Alignment.Start);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.textModel.scrollToEnd();
        });
        Scroll.onScrollEnd(() => {
            this.textModel.onScrollEnd();
        });
        Row.create();
        Flex.create();
        Flex.width("100%");
        Flex.height("100%");
        Flex.backgroundColor("red");
        Flex.pop();
        Text.create(this.textModel.getText());
        Text.fontSize(this.textModel.getFontSize());
        Text.pop();
        Row.pop();
        Scroll.pop();
    }
}
namespace ComputeTextWidth {
    export class textModel {
        private text: string = '';
        private fontSize: number = 0;
        private textWidth: number = 0;
        private computeEnd = false;
        private textList: Array<string> = [];
        private index: number = 0;
        private textWidthList: Array<number> = [];
        private extra: number = 0;
        private computeEndListener: () => void = () => { };
        private scroller: Scroller = new Scroller();
        public setComputeEndListener(computeEndListener: () => void): textModel {
            this.computeEndListener = computeEndListener;
            return this;
        }
        public setTextList(textList: Array<string>): textModel {
            this.textList = textList;
            this.index = 0;
            this.setText(this.textList[this.index]);
            return this;
        }
        public setText(text: string): textModel {
            this.text = text;
            return this;
        }
        public getText(): string {
            return this.text;
        }
        public setExtra(extra: number): textModel {
            this.extra = extra;
            return this;
        }
        public setFontSize(fontSize: number): textModel {
            this.fontSize = fontSize;
            return this;
        }
        public getFontSize(): number {
            return this.fontSize;
        }
        public getScroller(): Scroller {
            return this.scroller;
        }
        public scrollToEnd() {
            if (!this.computeEnd && this.textList) {
                this.scroller.scrollEdge(Edge.End);
                this.computeEnd = true;
            }
        }
        public onScrollEnd() {
            this.textWidth = this.scroller.currentOffset().xOffset;
            this.textWidthList.push(this.textWidth + this.extra);
            if (this.index < this.textList.length - 1) {
                this.index++;
                this.setText(this.textList[this.index]);
                this.computeEnd = false;
            }
            else if (this.computeEndListener) {
                this.computeEndListener();
            }
        }
        public getTextWidthList(): Array<number> {
            return this.textWidthList;
        }
        public getExtra(): number {
            return this.extra;
        }
    }
}
export default ComputeTextWidth;
