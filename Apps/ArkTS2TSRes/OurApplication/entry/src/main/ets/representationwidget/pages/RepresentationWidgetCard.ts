interface RepresentationWidgetCard_Params {
    TITLE?: string;
    ACTION_TYPE?: string;
    ABILITY_NAME?: string;
    MESSAGE?: string;
    FULL_WIDTH_PERCENT?: string;
    FULL_HEIGHT_PERCENT?: string;
    img_link?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RepresentationWidgetCard_" + ++__generate__Id;
}
class RepresentationWidgetCard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.TITLE = '你想好今天吃什么了吗';
        this.ACTION_TYPE = 'router';
        this.ABILITY_NAME = 'EntryAbility';
        this.MESSAGE = '你想好今天吃什么了吗';
        this.FULL_WIDTH_PERCENT = '100%';
        this.FULL_HEIGHT_PERCENT = '100%';
        this.__img_link = new ObservedPropertySimple("", this, "img_link");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RepresentationWidgetCard_Params) {
        if (params.TITLE !== undefined) {
            this.TITLE = params.TITLE;
        }
        if (params.ACTION_TYPE !== undefined) {
            this.ACTION_TYPE = params.ACTION_TYPE;
        }
        if (params.ABILITY_NAME !== undefined) {
            this.ABILITY_NAME = params.ABILITY_NAME;
        }
        if (params.MESSAGE !== undefined) {
            this.MESSAGE = params.MESSAGE;
        }
        if (params.FULL_WIDTH_PERCENT !== undefined) {
            this.FULL_WIDTH_PERCENT = params.FULL_WIDTH_PERCENT;
        }
        if (params.FULL_HEIGHT_PERCENT !== undefined) {
            this.FULL_HEIGHT_PERCENT = params.FULL_HEIGHT_PERCENT;
        }
        if (params.img_link !== undefined) {
            this.img_link = params.img_link;
        }
    }
    aboutToBeDeleted() {
        this.__img_link.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    /*
     * The title.
     */
    readonly TITLE: string;
    /*
     * The action type.
     */
    readonly ACTION_TYPE: string;
    /*
     * The ability name.
     */
    readonly ABILITY_NAME: string;
    /*
     * The message.
     */
    readonly MESSAGE: string;
    /*
     * The with percentage setting.
     */
    readonly FULL_WIDTH_PERCENT: string;
    /*
     * The height percentage setting.
     */
    readonly FULL_HEIGHT_PERCENT: string;
    private __img_link: ObservedPropertySimple<string>;
    get img_link() {
        return this.__img_link.get();
    }
    set img_link(newValue: string) {
        this.__img_link.set(newValue);
    }
    render() {
        Row.create();
        Row.height(this.FULL_HEIGHT_PERCENT);
        Row.onClick(() => {
            postCardAction(this, {
                "action": this.ACTION_TYPE,
                "abilityName": this.ABILITY_NAME,
                "params": {
                    "message": this.MESSAGE
                }
            });
        });
        Column.create();
        Column.width(this.FULL_WIDTH_PERCENT);
        Column.height(this.FULL_HEIGHT_PERCENT);
        // Text(this.MESSAGE)
        //   .fontColor(Color.Orange)
        //   .height('100%')
        //   .width('100%')
        //   .backgroundColor(Color.Grey)
        Image.create($r('app.media.WhatToEat'));
        Column.pop();
        Row.pop();
    }
}
loadDocument(new RepresentationWidgetCard("1", undefined, {}));
