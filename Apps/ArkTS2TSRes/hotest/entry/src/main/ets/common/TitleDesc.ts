interface TitleDesc_Params {
    text?: string;
    Url?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleDesc_" + ++__generate__Id;
}
import router from '@ohos.router';
export class TitleDesc extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = undefined;
        this.Url = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TitleDesc_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.Url !== undefined) {
            this.Url = params.Url;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private text: string;
    private Url: string;
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.onClick(() => {
            router.pushUrl({ url: this.Url });
        });
        Stack.margin(10);
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.createWithLabel(this.text);
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.fontSize(20);
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.fontWeight(FontWeight.Bold);
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.fontColor(Color.Black);
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.width("100%");
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.height(60);
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.backgroundColor(Color.Orange);
        //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
        Button.pop();
        Stack.pop();
    }
}
