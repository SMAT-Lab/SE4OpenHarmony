interface SeekBar_Params {
    model?: SeekBarModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SeekBar_" + ++__generate__Id;
}
export default class SeekBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SeekBarModel(), this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SeekBar_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SeekBarModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SeekBarModel) {
        this.__model.set(newValue);
    }
    render() {
        Row.create();
        Row.padding({ top: 10 });
        Row.width('100%');
        Slider.create({
            value: this.model.value,
            min: this.model.min,
            max: this.model.max,
            style: SliderStyle.OutSet
        });
        Slider.width('90%');
        Slider.blockColor(0x009688);
        Slider.trackColor(0xD8D8D8);
        Slider.selectedColor(0x009688);
        Slider.showSteps(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            this.model.value = value;
        });
        Text.create(this.model.value.toFixed(0));
        Text.fontSize(16);
        Text.pop();
        Row.pop();
    }
}
export class SeekBarModel {
    value: number = 45;
    min: number = 0;
    max: number = 200;
    constructor(value?: number) {
        this.value = value ? value : 0;
    }
    setValue(value: number): SeekBarModel {
        this.value = value ? value : 0;
        return this;
    }
    getValue(): number {
        return this.value;
    }
    setMin(min: number): SeekBarModel {
        this.min = min ? min : 0;
        return this;
    }
    getMin(): number {
        return this.min;
    }
    setMax(max: number): SeekBarModel {
        this.max = max ? max : 0;
        return this;
    }
    getMax(): number {
        return this.max;
    }
}
