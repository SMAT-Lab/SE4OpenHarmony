interface ExercisePlan_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ExercisePlan_" + ++__generate__Id;
}
class ExercisePlan extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('我是运动计划'
        /**
         * In low-code mode, do not add anything to the build function, as it will be
         * overwritten by the content generated by the .visual file in the build phase.
         */
        , this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ExercisePlan_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    /**
     * In low-code mode, do not add anything to the build function, as it will be
     * overwritten by the content generated by the .visual file in the build phase.
     */
    render() {
    }
}
loadDocument(new ExercisePlan("1", undefined, {}));
