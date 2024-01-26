interface Rate_readOnly_Params {
    cur_height?: number;
    cur_width?: number;
    rating?: number;
}
interface Rate_disabled_Params {
    cur_height?: number;
    cur_width?: number;
    rating?: number;
}
interface Rate_number_Params {
    cur_height?: number;
    cur_width?: number;
    total_score?: number;
    rating?: number;
}
interface Rate_halfStar_Params {
    cur_height?: number;
    cur_width?: number;
    rating?: number;
}
interface Rate_style_Params {
    cur_height?: number;
    cur_width?: number;
    rating?: number;
}
interface Rate_icon_Params {
    cur_height?: number;
    cur_width?: number;
    rating?: number;
}
interface Rate_default_Params {
    cur_height?: number;
    cur_width?: number;
    rating?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Rate_" + ++__generate__Id;
}
export class Rate_default extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(70, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__rating = new ObservedPropertySimple(3, this, "rating");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rate_default_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__rating.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    render() {
        Column.create();
        Column.height(this.cur_height);
        Column.width(this.cur_width);
        Rating.create({ rating: this.rating, indicator: false });
        Rating.size({ width: 300, height: 60 });
        Rating.stars(5);
        Rating.stepSize(1);
        Rating.pop();
        Column.pop();
    }
}
export class Rate_icon extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(70, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__rating = new ObservedPropertySimple(3, this, "rating");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rate_icon_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__rating.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    render() {
        Column.create();
        Column.height(this.cur_height);
        Column.width(this.cur_width);
        Rating.create({ rating: this.rating, indicator: false });
        Rating.size({ width: 300, height: 60 });
        Rating.stars(5);
        Rating.stepSize(1);
        Rating.starStyle({
            backgroundUri: "/common/img/Rate_heart_white.png",
            foregroundUri: "/common/img/Rate_heart_yellow.png"
        });
        Rating.pop();
        Column.pop();
    }
}
export class Rate_style extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(70, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__rating = new ObservedPropertySimple(3, this, "rating");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rate_style_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__rating.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    render() {
        Column.create();
        Column.height(this.cur_height);
        Column.width(this.cur_width);
        Rating.create({ rating: this.rating, indicator: false });
        Rating.size({ width: 300, height: 60 });
        Rating.stars(5);
        Rating.stepSize(1);
        Rating.starStyle({
            backgroundUri: "/common/img/Rate_star_grey.png",
            foregroundUri: "/common/img/Rate_star_red.png"
        });
        Rating.pop();
        Column.pop();
    }
}
export class Rate_halfStar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(70, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__rating = new ObservedPropertySimple(3.5, this, "rating");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rate_halfStar_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__rating.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    render() {
        Column.create();
        Column.height(this.cur_height);
        Column.width(this.cur_width);
        Rating.create({ rating: this.rating, indicator: false });
        Rating.size({ width: 300, height: 60 });
        Rating.stars(5);
        Rating.stepSize(0.5);
        Rating.pop();
        Column.pop();
    }
}
export class Rate_number extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(70, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__total_score = new ObservedPropertySimple(5, this, "total_score");
        this.__rating = new ObservedPropertySimple(5, this, "rating");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rate_number_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.total_score !== undefined) {
            this.total_score = params.total_score;
        }
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__total_score.aboutToBeDeleted();
        this.__rating.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __total_score: ObservedPropertySimple<number>;
    get total_score() {
        return this.__total_score.get();
    }
    set total_score(newValue: number) {
        this.__total_score.set(newValue);
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    render() {
        Column.create();
        Column.height(this.cur_height);
        Column.width(this.cur_width);
        Rating.create({ rating: this.rating, indicator: false });
        Rating.size({ width: 300, height: 60 });
        Rating.stars(this.total_score);
        Rating.stepSize(1);
        Rating.pop();
        Column.pop();
    }
}
export class Rate_disabled extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(70, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__rating = new ObservedPropertySimple(4, this, "rating");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rate_disabled_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__rating.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    render() {
        Column.create();
        Column.height(this.cur_height);
        Column.width(this.cur_width);
        Rating.create({ rating: this.rating, indicator: false });
        Rating.size({ width: 300, height: 60 });
        Rating.stars(5);
        Rating.stepSize(1);
        Rating.enabled(false);
        Rating.starStyle({
            backgroundUri: "/common/img/Rate_star_grey.png",
            foregroundUri: "/common/img/Rate_star_grey_2.png"
        });
        Rating.pop();
        Column.pop();
    }
}
export class Rate_readOnly extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__cur_height = new ObservedPropertySimple(70, this, "cur_height");
        this.__cur_width = new ObservedPropertySimple(360, this, "cur_width");
        this.__rating = new ObservedPropertySimple(4, this, "rating");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Rate_readOnly_Params) {
        if (params.cur_height !== undefined) {
            this.cur_height = params.cur_height;
        }
        if (params.cur_width !== undefined) {
            this.cur_width = params.cur_width;
        }
        if (params.rating !== undefined) {
            this.rating = params.rating;
        }
    }
    aboutToBeDeleted() {
        this.__cur_height.aboutToBeDeleted();
        this.__cur_width.aboutToBeDeleted();
        this.__rating.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __cur_height: ObservedPropertySimple<number>; //组件高度
    get cur_height() {
        return this.__cur_height.get();
    }
    set cur_height(newValue: number) {
        this.__cur_height.set(newValue);
    }
    private __cur_width: ObservedPropertySimple<number>; //组件宽度
    get cur_width() {
        return this.__cur_width.get();
    }
    set cur_width(newValue: number) {
        this.__cur_width.set(newValue);
    }
    private __rating: ObservedPropertySimple<number>;
    get rating() {
        return this.__rating.get();
    }
    set rating(newValue: number) {
        this.__rating.set(newValue);
    }
    render() {
        Column.create();
        Column.height(this.cur_height);
        Column.width(this.cur_width);
        Rating.create({ rating: this.rating, indicator: false });
        Rating.size({ width: 300, height: 60 });
        Rating.stars(5);
        Rating.stepSize(1);
        Rating.enabled(false);
        Rating.pop();
        Column.pop();
    }
}
