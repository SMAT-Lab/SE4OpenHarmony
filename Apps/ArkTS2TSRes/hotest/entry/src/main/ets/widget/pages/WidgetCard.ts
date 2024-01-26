interface WidgetCard_Params {
    TITLE?: string;
    ACTION_TYPE?: string;
    ABILITY_NAME?: string;
    MESSAGE?: string;
    FULL_WIDTH_PERCENT?: string;
    FULL_HEIGHT_PERCENT?: string;
    rotateAngle?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WidgetCard_" + ++__generate__Id;
}
class WidgetCard extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.TITLE = 'Hello World';
        this.ACTION_TYPE = 'router';
        this.ABILITY_NAME = 'EntryAbility';
        this.MESSAGE = 'add detail';
        this.FULL_WIDTH_PERCENT = '100%';
        this.FULL_HEIGHT_PERCENT = '100%';
        this.__rotateAngle = new ObservedPropertySimple(0, this, "rotateAngle");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WidgetCard_Params) {
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
        if (params.rotateAngle !== undefined) {
            this.rotateAngle = params.rotateAngle;
        }
    }
    aboutToBeDeleted() {
        this.__rotateAngle.aboutToBeDeleted();
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
    private __rotateAngle: ObservedPropertySimple<number>;
    get rotateAngle() {
        return this.__rotateAngle.get();
    }
    set rotateAngle(newValue: number) {
        this.__rotateAngle.set(newValue);
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
        Button.createWithLabel('change rotate angle');
        Context.animation({
            curve: Curve.EaseOut,
            playMode: PlayMode.AlternateReverse
        });
        Button.onClick(() => {
            this.rotateAngle = 90;
        });
        Button.margin(20);
        Button.rotate({ angle: this.rotateAngle });
        Context.animation(null);
        Button.pop();
        Text.create(this.TITLE);
        Text.fontSize($r('app.float.font_size'));
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new WidgetCard("1", undefined, {}));
