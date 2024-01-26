interface CircleImageView_Params {
    model?: CircleImageView.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CircleImageView_" + ++__generate__Id;
}
class CircleImageView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CircleImageView_Params) {
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<CircleImageView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CircleImageView.Model) {
        this.__model.set(newValue);
    }
    render() {
        Stack.create();
        Column.create();
        Column.width((this.model.diameter + this.model.borderWidth));
        Column.height((this.model.diameter + this.model.borderWidth));
        Column.borderRadius((this.model.diameter + this.model.borderWidth) / 2.0);
        Column.justifyContent(FlexAlign.Center);
        Column.backgroundColor(this.model.borderColor);
        Image.create($rawfile(this.model.src));
        Image.objectFit(this.model.scaleType);
        Image.clip(this.model.circle);
        Image.width(this.model.diameter);
        Image.height(this.model.diameter);
        Image.backgroundColor(this.model.color);
        Column.pop();
        Stack.pop();
    }
}
namespace CircleImageView {
    export class Model {
        src: string = '';
        diameter: number = 0;
        scaleType: ImageFit = ImageFit.Contain;
        disableCircularTransformation: boolean = true;
        circle: any;
        color: number = 0;
        borderWidth: number = 0;
        borderColor: ResourceColor = Color.Gray;
        setDiameter(diameter: number): Model {
            this.diameter = diameter;
            return this;
        }
        getDiameter(): number {
            return this.diameter;
        }
        setImageURI(src: string): Model {
            this.src = src;
            return this;
        }
        getImageURI(): string {
            return this.src;
        }
        setScaleType(scaleType: ImageFit): Model {
            this.scaleType = scaleType;
            return this;
        }
        getScaleType(): ImageFit {
            return this.scaleType;
        }
        setDisableCircularTransformation(disableCircularTransformation: boolean): Model {
            this.disableCircularTransformation = disableCircularTransformation;
            if (disableCircularTransformation) {
                this.circle = new Circle({ width: this.diameter, height: this.diameter });
            }
            else {
                this.circle = null;
            }
            return this;
        }
        isDisableCircularTransformation(): boolean {
            return this.disableCircularTransformation;
        }
        setCircleBackgroundColor(color: number): Model {
            this.color = color;
            return this;
        }
        getCircleBackgroundColor(): number {
            return this.color;
        }
        setBorderWidth(borderWidth: number): Model {
            this.borderWidth = borderWidth;
            return this;
        }
        getBorderWidth(): number {
            return this.borderWidth;
        }
        setBorderColor(borderColor: ResourceColor): Model {
            this.borderColor = borderColor;
            return this;
        }
        getBorderColor(): ResourceColor {
            return this.borderColor;
        }
    }
}
export default CircleImageView;
