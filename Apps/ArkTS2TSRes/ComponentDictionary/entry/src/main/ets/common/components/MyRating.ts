interface MyRating_Params {
    rating?: number;
    indicator?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MyRating_" + ++__generate__Id;
}
export class MyRating extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__rating = new ObservedPropertySimple(1, this, "rating");
        this.__indicator = new ObservedPropertySimple(false, this, "indicator");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyRating_Params) {
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
        if (params.indicator !== undefined) {
            this.indicator = params.indicator;
        }
    }
    aboutToBeDeleted() {
        this.__rating.aboutToBeDeleted();
        this.__indicator.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    private __indicator: ObservedPropertySimple<boolean>;
    get indicator() {
        return this.__indicator.get();
    }
    set indicator(newValue: boolean) {
        this.__indicator.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceBetween });
        Flex.width(350);
        Flex.height(200);
        Flex.padding(35);
        Text.create('current score is ' + this.rating);
        Text.fontSize(20);
        Text.pop();
        Rating.create({ rating: this.rating, indicator: this.indicator });
        Rating.stars(5);
        Rating.stepSize(0.5);
        Rating.onChange((value: number) => {
            this.rating = value;
        });
        Rating.pop();
        Flex.pop();
    }
}
