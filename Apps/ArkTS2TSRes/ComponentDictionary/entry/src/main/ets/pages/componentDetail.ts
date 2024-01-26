interface componentDetail_Params {
    componentName?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "componentDetail_" + ++__generate__Id;
}
import { MyImageAnimator } from '../common/components/MyImageAnimator';
import { MyTabAndTabContent } from '../common/components/MyTabAndTabConect';
import { MySwiper } from '../common/components/MySwiper';
import { MyRelativeContainer } from '../common/components/MyRelativeContainer';
import { MyRefresh } from '../common/components/MyRefresh';
import { MyPanel } from '../common/components/MyPanel';
import { MyListAndListItem } from '../common/components/MyListAndListItem';
import { MyBadge } from '../common/components/MyBadge';
import { MyToggle } from '../common/components/MyToggle';
import { MyTextArea } from '../common/components/MyTextArea';
import { MyText } from '../common/components/MyText';
import { MySpan } from '../common/components/MySpan';
import { MySlider } from '../common/components/MySlider';
import { MySelect } from '../common/components/MySelect';
import { MySearch } from '../common/components/MySearch';
import { MyRating } from '../common/components/MyRating';
import { MyQRCode } from '../common/components/MyQRCode';
import { MyProgress } from '../common/components/Myprogress';
import { MyPatternLock } from '../common/components/MyPatternLock';
import { MyImage } from '../common/components/MyImage';
import { MyDivider } from '../common/components/MyDivider';
import { MyDatePicker } from '../common/components/MyDatePicker';
import { MyButton } from '../common/components/MyButton';
import { MyVideo } from '../common/components/MyVideo';
import { MyColumnSplit } from '../common/components/MyColumnSplit';
import { MyAlertDialog } from '../common/components/MyAlertDialog';
import { MyCustomDialogController } from '../common/components/MyCustomDialogController';
import { MyDatePickerDialog } from '../common/components/MyDatePickerDialog';
import { MyTimePickerDialog } from '../common/components/MyTimePickerDialog';
import { MyTextPickerDialog } from '../common/components/MyTextPickerDialog';
import { MyActionSheet } from '../common/components/MyActionSheet';
import { MyStack } from '../common/components/MyStack';
import { MySideBarContainer } from '../common/components/MySideBarContainer';
import { MyScroll } from '../common/components/MyScroll';
import { MyRowSplit } from '../common/components/MyRowSplit';
import { MyRow } from '../common/components/MyRow';
import { MyNavigator } from '../common/components/MyNavigator';
import { MyGridGridItem } from '../common/components/MyGridGridItem';
import { MyGridContainer } from '../common/components/MyGridContainer';
import { MyFlex } from '../common/components/MyFlex';
import { MyCounter } from '../common/components/MyCounter';
import { MyColumn } from '../common/components/MyColumn';
import { MyAlphabetIndexer } from '../common/components/MyAlphabetIndexer';
import { MyTimePicker } from '../common/components/MyTimePicker';
import { MyTextTimer } from '../common/components/MyTextTimer';
import { MyTextPicker } from '../common/components/MyTextPicker';
import { MyTextInput } from '../common/components/MyTextInput';
import { MyTextClock } from '../common/components/MyTextClock';
import { MyStepperStepperItem } from '../common/components/MyStepperStepperItem';
import { MyScrollBar } from '../common/components/MyScrollBar';
import { MyRadio } from '../common/components/MyRadio';
import { MyNavigation } from '../common/components/MyNavigation';
import { MyLoadingProgress } from '../common/components/MyLoadingProgress';
import { MyGauge } from '../common/components/MyGauge';
import { MyDataPanel } from '../common/components/MyDataPanel';
import { MyCheckboxGroup } from '../common/components/MyCheckboxGroup';
import { MyCheckbox } from '../common/components/MyCheckbox';
import { MyBlank } from '../common/components/MyBlank';
import router from '@ohos.router';
export class componentDetail extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.componentName = router.getParams()['name'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: componentDetail_Params) {
        if (params.componentName !== undefined) {
            this.componentName = params.componentName;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private componentName: string;
    render() {
        Column.create();
        If.create();
        if (this.componentName == 'Blank') {
            If.branchId(0);
            let earlierCreatedChild_2: MyBlank = (this && this.findChildById) ? this.findChildById("2") as MyBlank : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new MyBlank("2", this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                if (!earlierCreatedChild_2.needsUpdate()) {
                    earlierCreatedChild_2.markStatic();
                }
                View.create(earlierCreatedChild_2);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Button') {
            If.branchId(0);
            let earlierCreatedChild_3: MyButton = (this && this.findChildById) ? this.findChildById("3") as MyButton : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new MyButton("3", this, {}));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'DatePicker') {
            If.branchId(0);
            let earlierCreatedChild_4: MyDatePicker = (this && this.findChildById) ? this.findChildById("4") as MyDatePicker : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new MyDatePicker("4", this, {}));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({});
                View.create(earlierCreatedChild_4);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Divider') {
            If.branchId(0);
            let earlierCreatedChild_5: MyDivider = (this && this.findChildById) ? this.findChildById("5") as MyDivider : undefined;
            if (earlierCreatedChild_5 == undefined) {
                View.create(new MyDivider("5", this, {}));
            }
            else {
                earlierCreatedChild_5.updateWithValueParams({});
                if (!earlierCreatedChild_5.needsUpdate()) {
                    earlierCreatedChild_5.markStatic();
                }
                View.create(earlierCreatedChild_5);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Image') {
            If.branchId(0);
            let earlierCreatedChild_6: MyImage = (this && this.findChildById) ? this.findChildById("6") as MyImage : undefined;
            if (earlierCreatedChild_6 == undefined) {
                View.create(new MyImage("6", this, {}));
            }
            else {
                earlierCreatedChild_6.updateWithValueParams({});
                View.create(earlierCreatedChild_6);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'ImageAnimator') {
            If.branchId(0);
            let earlierCreatedChild_7: MyImageAnimator = (this && this.findChildById) ? this.findChildById("7") as MyImageAnimator : undefined;
            if (earlierCreatedChild_7 == undefined) {
                View.create(new MyImageAnimator("7", this, {}));
            }
            else {
                earlierCreatedChild_7.updateWithValueParams({});
                View.create(earlierCreatedChild_7);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'PatternLock') {
            If.branchId(0);
            let earlierCreatedChild_8: MyPatternLock = (this && this.findChildById) ? this.findChildById("8") as MyPatternLock : undefined;
            if (earlierCreatedChild_8 == undefined) {
                View.create(new MyPatternLock("8", this, {}));
            }
            else {
                earlierCreatedChild_8.updateWithValueParams({});
                View.create(earlierCreatedChild_8);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Progress') {
            If.branchId(0);
            let earlierCreatedChild_9: MyProgress = (this && this.findChildById) ? this.findChildById("9") as MyProgress : undefined;
            if (earlierCreatedChild_9 == undefined) {
                View.create(new MyProgress("9", this, {}));
            }
            else {
                earlierCreatedChild_9.updateWithValueParams({});
                if (!earlierCreatedChild_9.needsUpdate()) {
                    earlierCreatedChild_9.markStatic();
                }
                View.create(earlierCreatedChild_9);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'QRCode') {
            If.branchId(0);
            let earlierCreatedChild_10: MyQRCode = (this && this.findChildById) ? this.findChildById("10") as MyQRCode : undefined;
            if (earlierCreatedChild_10 == undefined) {
                View.create(new MyQRCode("10", this, {}));
            }
            else {
                earlierCreatedChild_10.updateWithValueParams({});
                if (!earlierCreatedChild_10.needsUpdate()) {
                    earlierCreatedChild_10.markStatic();
                }
                View.create(earlierCreatedChild_10);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Rating') {
            If.branchId(0);
            let earlierCreatedChild_11: MyRating = (this && this.findChildById) ? this.findChildById("11") as MyRating : undefined;
            if (earlierCreatedChild_11 == undefined) {
                View.create(new MyRating("11", this, {}));
            }
            else {
                earlierCreatedChild_11.updateWithValueParams({});
                View.create(earlierCreatedChild_11);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Search') {
            If.branchId(0);
            let earlierCreatedChild_12: MySearch = (this && this.findChildById) ? this.findChildById("12") as MySearch : undefined;
            if (earlierCreatedChild_12 == undefined) {
                View.create(new MySearch("12", this, {}));
            }
            else {
                earlierCreatedChild_12.updateWithValueParams({});
                View.create(earlierCreatedChild_12);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Select') {
            If.branchId(0);
            let earlierCreatedChild_13: MySelect = (this && this.findChildById) ? this.findChildById("13") as MySelect : undefined;
            if (earlierCreatedChild_13 == undefined) {
                View.create(new MySelect("13", this, {}));
            }
            else {
                earlierCreatedChild_13.updateWithValueParams({});
                if (!earlierCreatedChild_13.needsUpdate()) {
                    earlierCreatedChild_13.markStatic();
                }
                View.create(earlierCreatedChild_13);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Slider') {
            If.branchId(0);
            let earlierCreatedChild_14: MySlider = (this && this.findChildById) ? this.findChildById("14") as MySlider : undefined;
            if (earlierCreatedChild_14 == undefined) {
                View.create(new MySlider("14", this, {}));
            }
            else {
                earlierCreatedChild_14.updateWithValueParams({});
                View.create(earlierCreatedChild_14);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Span') {
            If.branchId(0);
            let earlierCreatedChild_15: MySpan = (this && this.findChildById) ? this.findChildById("15") as MySpan : undefined;
            if (earlierCreatedChild_15 == undefined) {
                View.create(new MySpan("15", this, {}));
            }
            else {
                earlierCreatedChild_15.updateWithValueParams({});
                if (!earlierCreatedChild_15.needsUpdate()) {
                    earlierCreatedChild_15.markStatic();
                }
                View.create(earlierCreatedChild_15);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Text') {
            If.branchId(0);
            let earlierCreatedChild_16: MyText = (this && this.findChildById) ? this.findChildById("16") as MyText : undefined;
            if (earlierCreatedChild_16 == undefined) {
                View.create(new MyText("16", this, {}));
            }
            else {
                earlierCreatedChild_16.updateWithValueParams({});
                if (!earlierCreatedChild_16.needsUpdate()) {
                    earlierCreatedChild_16.markStatic();
                }
                View.create(earlierCreatedChild_16);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TextArea') {
            If.branchId(0);
            let earlierCreatedChild_17: MyTextArea = (this && this.findChildById) ? this.findChildById("17") as MyTextArea : undefined;
            if (earlierCreatedChild_17 == undefined) {
                View.create(new MyTextArea("17", this, {}));
            }
            else {
                earlierCreatedChild_17.updateWithValueParams({});
                View.create(earlierCreatedChild_17);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Toggle') {
            If.branchId(0);
            let earlierCreatedChild_18: MyToggle = (this && this.findChildById) ? this.findChildById("18") as MyToggle : undefined;
            if (earlierCreatedChild_18 == undefined) {
                View.create(new MyToggle("18", this, {}));
            }
            else {
                earlierCreatedChild_18.updateWithValueParams({});
                if (!earlierCreatedChild_18.needsUpdate()) {
                    earlierCreatedChild_18.markStatic();
                }
                View.create(earlierCreatedChild_18);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Checkbox') {
            If.branchId(0);
            let earlierCreatedChild_19: MyCheckbox = (this && this.findChildById) ? this.findChildById("19") as MyCheckbox : undefined;
            if (earlierCreatedChild_19 == undefined) {
                View.create(new MyCheckbox("19", this, {}));
            }
            else {
                earlierCreatedChild_19.updateWithValueParams({});
                if (!earlierCreatedChild_19.needsUpdate()) {
                    earlierCreatedChild_19.markStatic();
                }
                View.create(earlierCreatedChild_19);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'CheckboxGroup') {
            If.branchId(0);
            let earlierCreatedChild_20: MyCheckboxGroup = (this && this.findChildById) ? this.findChildById("20") as MyCheckboxGroup : undefined;
            if (earlierCreatedChild_20 == undefined) {
                View.create(new MyCheckboxGroup("20", this, {}));
            }
            else {
                earlierCreatedChild_20.updateWithValueParams({});
                if (!earlierCreatedChild_20.needsUpdate()) {
                    earlierCreatedChild_20.markStatic();
                }
                View.create(earlierCreatedChild_20);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'DataPanel') {
            If.branchId(0);
            let earlierCreatedChild_21: MyDataPanel = (this && this.findChildById) ? this.findChildById("21") as MyDataPanel : undefined;
            if (earlierCreatedChild_21 == undefined) {
                View.create(new MyDataPanel("21", this, {}));
            }
            else {
                earlierCreatedChild_21.updateWithValueParams({});
                if (!earlierCreatedChild_21.needsUpdate()) {
                    earlierCreatedChild_21.markStatic();
                }
                View.create(earlierCreatedChild_21);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Gauge') {
            If.branchId(0);
            let earlierCreatedChild_22: MyGauge = (this && this.findChildById) ? this.findChildById("22") as MyGauge : undefined;
            if (earlierCreatedChild_22 == undefined) {
                View.create(new MyGauge("22", this, {}));
            }
            else {
                earlierCreatedChild_22.updateWithValueParams({});
                if (!earlierCreatedChild_22.needsUpdate()) {
                    earlierCreatedChild_22.markStatic();
                }
                View.create(earlierCreatedChild_22);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'LoadingProgress') {
            If.branchId(0);
            let earlierCreatedChild_23: MyLoadingProgress = (this && this.findChildById) ? this.findChildById("23") as MyLoadingProgress : undefined;
            if (earlierCreatedChild_23 == undefined) {
                View.create(new MyLoadingProgress("23", this, {}));
            }
            else {
                earlierCreatedChild_23.updateWithValueParams({});
                if (!earlierCreatedChild_23.needsUpdate()) {
                    earlierCreatedChild_23.markStatic();
                }
                View.create(earlierCreatedChild_23);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Navigation') {
            If.branchId(0);
            let earlierCreatedChild_24: MyNavigation = (this && this.findChildById) ? this.findChildById("24") as MyNavigation : undefined;
            if (earlierCreatedChild_24 == undefined) {
                View.create(new MyNavigation("24", this, {}));
            }
            else {
                earlierCreatedChild_24.updateWithValueParams({});
                View.create(earlierCreatedChild_24);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Radio') {
            If.branchId(0);
            let earlierCreatedChild_25: MyRadio = (this && this.findChildById) ? this.findChildById("25") as MyRadio : undefined;
            if (earlierCreatedChild_25 == undefined) {
                View.create(new MyRadio("25", this, {}));
            }
            else {
                earlierCreatedChild_25.updateWithValueParams({});
                if (!earlierCreatedChild_25.needsUpdate()) {
                    earlierCreatedChild_25.markStatic();
                }
                View.create(earlierCreatedChild_25);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'ScrollBar') {
            If.branchId(0);
            let earlierCreatedChild_26: MyScrollBar = (this && this.findChildById) ? this.findChildById("26") as MyScrollBar : undefined;
            if (earlierCreatedChild_26 == undefined) {
                View.create(new MyScrollBar("26", this, {}));
            }
            else {
                earlierCreatedChild_26.updateWithValueParams({});
                if (!earlierCreatedChild_26.needsUpdate()) {
                    earlierCreatedChild_26.markStatic();
                }
                View.create(earlierCreatedChild_26);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Stepper&StepperItem') {
            If.branchId(0);
            let earlierCreatedChild_27: MyStepperStepperItem = (this && this.findChildById) ? this.findChildById("27") as MyStepperStepperItem : undefined;
            if (earlierCreatedChild_27 == undefined) {
                View.create(new MyStepperStepperItem("27", this, {}));
            }
            else {
                earlierCreatedChild_27.updateWithValueParams({});
                View.create(earlierCreatedChild_27);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TextClock') {
            If.branchId(0);
            let earlierCreatedChild_28: MyTextClock = (this && this.findChildById) ? this.findChildById("28") as MyTextClock : undefined;
            if (earlierCreatedChild_28 == undefined) {
                View.create(new MyTextClock("28", this, {}));
            }
            else {
                earlierCreatedChild_28.updateWithValueParams({});
                View.create(earlierCreatedChild_28);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TextInput') {
            If.branchId(0);
            let earlierCreatedChild_29: MyTextInput = (this && this.findChildById) ? this.findChildById("29") as MyTextInput : undefined;
            if (earlierCreatedChild_29 == undefined) {
                View.create(new MyTextInput("29", this, {}));
            }
            else {
                earlierCreatedChild_29.updateWithValueParams({});
                View.create(earlierCreatedChild_29);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TextPicker') {
            If.branchId(0);
            let earlierCreatedChild_30: MyTextPicker = (this && this.findChildById) ? this.findChildById("30") as MyTextPicker : undefined;
            if (earlierCreatedChild_30 == undefined) {
                View.create(new MyTextPicker("30", this, {}));
            }
            else {
                earlierCreatedChild_30.updateWithValueParams({});
                if (!earlierCreatedChild_30.needsUpdate()) {
                    earlierCreatedChild_30.markStatic();
                }
                View.create(earlierCreatedChild_30);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TextTimer') {
            If.branchId(0);
            let earlierCreatedChild_31: MyTextTimer = (this && this.findChildById) ? this.findChildById("31") as MyTextTimer : undefined;
            if (earlierCreatedChild_31 == undefined) {
                View.create(new MyTextTimer("31", this, {}));
            }
            else {
                earlierCreatedChild_31.updateWithValueParams({});
                View.create(earlierCreatedChild_31);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TimePicker') {
            If.branchId(0);
            let earlierCreatedChild_32: MyTimePicker = (this && this.findChildById) ? this.findChildById("32") as MyTimePicker : undefined;
            if (earlierCreatedChild_32 == undefined) {
                View.create(new MyTimePicker("32", this, {}));
            }
            else {
                earlierCreatedChild_32.updateWithValueParams({});
                if (!earlierCreatedChild_32.needsUpdate()) {
                    earlierCreatedChild_32.markStatic();
                }
                View.create(earlierCreatedChild_32);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'AlphabetIndexer') {
            If.branchId(0);
            let earlierCreatedChild_33: MyAlphabetIndexer = (this && this.findChildById) ? this.findChildById("33") as MyAlphabetIndexer : undefined;
            if (earlierCreatedChild_33 == undefined) {
                View.create(new MyAlphabetIndexer("33", this, {}));
            }
            else {
                earlierCreatedChild_33.updateWithValueParams({});
                if (!earlierCreatedChild_33.needsUpdate()) {
                    earlierCreatedChild_33.markStatic();
                }
                View.create(earlierCreatedChild_33);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Column') {
            If.branchId(0);
            let earlierCreatedChild_34: MyColumn = (this && this.findChildById) ? this.findChildById("34") as MyColumn : undefined;
            if (earlierCreatedChild_34 == undefined) {
                View.create(new MyColumn("34", this, {}));
            }
            else {
                earlierCreatedChild_34.updateWithValueParams({});
                if (!earlierCreatedChild_34.needsUpdate()) {
                    earlierCreatedChild_34.markStatic();
                }
                View.create(earlierCreatedChild_34);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'ColumnSplit') {
            If.branchId(0);
            let earlierCreatedChild_35: MyColumnSplit = (this && this.findChildById) ? this.findChildById("35") as MyColumnSplit : undefined;
            if (earlierCreatedChild_35 == undefined) {
                View.create(new MyColumnSplit("35", this, {}));
            }
            else {
                earlierCreatedChild_35.updateWithValueParams({});
                if (!earlierCreatedChild_35.needsUpdate()) {
                    earlierCreatedChild_35.markStatic();
                }
                View.create(earlierCreatedChild_35);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Counter') {
            If.branchId(0);
            let earlierCreatedChild_36: MyCounter = (this && this.findChildById) ? this.findChildById("36") as MyCounter : undefined;
            if (earlierCreatedChild_36 == undefined) {
                View.create(new MyCounter("36", this, {}));
            }
            else {
                earlierCreatedChild_36.updateWithValueParams({});
                View.create(earlierCreatedChild_36);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Flex') {
            If.branchId(0);
            let earlierCreatedChild_37: MyFlex = (this && this.findChildById) ? this.findChildById("37") as MyFlex : undefined;
            if (earlierCreatedChild_37 == undefined) {
                View.create(new MyFlex("37", this, {}));
            }
            else {
                earlierCreatedChild_37.updateWithValueParams({});
                if (!earlierCreatedChild_37.needsUpdate()) {
                    earlierCreatedChild_37.markStatic();
                }
                View.create(earlierCreatedChild_37);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'GridContainer') {
            If.branchId(0);
            let earlierCreatedChild_38: MyGridContainer = (this && this.findChildById) ? this.findChildById("38") as MyGridContainer : undefined;
            if (earlierCreatedChild_38 == undefined) {
                View.create(new MyGridContainer("38", this, {}));
            }
            else {
                earlierCreatedChild_38.updateWithValueParams({});
                View.create(earlierCreatedChild_38);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Grid&GridItem') {
            If.branchId(0);
            let earlierCreatedChild_39: MyGridGridItem = (this && this.findChildById) ? this.findChildById("39") as MyGridGridItem : undefined;
            if (earlierCreatedChild_39 == undefined) {
                View.create(new MyGridGridItem("39", this, {}));
            }
            else {
                earlierCreatedChild_39.updateWithValueParams({});
                View.create(earlierCreatedChild_39);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Navigator') {
            If.branchId(0);
            let earlierCreatedChild_40: MyNavigator = (this && this.findChildById) ? this.findChildById("40") as MyNavigator : undefined;
            if (earlierCreatedChild_40 == undefined) {
                View.create(new MyNavigator("40", this, {}));
            }
            else {
                earlierCreatedChild_40.updateWithValueParams({});
                View.create(earlierCreatedChild_40);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Row') {
            If.branchId(0);
            let earlierCreatedChild_41: MyRow = (this && this.findChildById) ? this.findChildById("41") as MyRow : undefined;
            if (earlierCreatedChild_41 == undefined) {
                View.create(new MyRow("41", this, {}));
            }
            else {
                earlierCreatedChild_41.updateWithValueParams({});
                if (!earlierCreatedChild_41.needsUpdate()) {
                    earlierCreatedChild_41.markStatic();
                }
                View.create(earlierCreatedChild_41);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'RowSplit') {
            If.branchId(0);
            let earlierCreatedChild_42: MyRowSplit = (this && this.findChildById) ? this.findChildById("42") as MyRowSplit : undefined;
            if (earlierCreatedChild_42 == undefined) {
                View.create(new MyRowSplit("42", this, {}));
            }
            else {
                earlierCreatedChild_42.updateWithValueParams({});
                if (!earlierCreatedChild_42.needsUpdate()) {
                    earlierCreatedChild_42.markStatic();
                }
                View.create(earlierCreatedChild_42);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Scroll') {
            If.branchId(0);
            let earlierCreatedChild_43: MyScroll = (this && this.findChildById) ? this.findChildById("43") as MyScroll : undefined;
            if (earlierCreatedChild_43 == undefined) {
                View.create(new MyScroll("43", this, {}));
            }
            else {
                earlierCreatedChild_43.updateWithValueParams({});
                if (!earlierCreatedChild_43.needsUpdate()) {
                    earlierCreatedChild_43.markStatic();
                }
                View.create(earlierCreatedChild_43);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'SideBarContainer') {
            If.branchId(0);
            let earlierCreatedChild_44: MySideBarContainer = (this && this.findChildById) ? this.findChildById("44") as MySideBarContainer : undefined;
            if (earlierCreatedChild_44 == undefined) {
                View.create(new MySideBarContainer("44", this, {}));
            }
            else {
                earlierCreatedChild_44.updateWithValueParams({});
                View.create(earlierCreatedChild_44);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Stack') {
            If.branchId(0);
            let earlierCreatedChild_45: MyStack = (this && this.findChildById) ? this.findChildById("45") as MyStack : undefined;
            if (earlierCreatedChild_45 == undefined) {
                View.create(new MyStack("45", this, {}));
            }
            else {
                earlierCreatedChild_45.updateWithValueParams({});
                if (!earlierCreatedChild_45.needsUpdate()) {
                    earlierCreatedChild_45.markStatic();
                }
                View.create(earlierCreatedChild_45);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Badge') {
            If.branchId(0);
            let earlierCreatedChild_46: MyBadge = (this && this.findChildById) ? this.findChildById("46") as MyBadge : undefined;
            if (earlierCreatedChild_46 == undefined) {
                View.create(new MyBadge("46", this, {}));
            }
            else {
                earlierCreatedChild_46.updateWithValueParams({});
                View.create(earlierCreatedChild_46);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'List&ListItem') {
            If.branchId(0);
            let earlierCreatedChild_47: MyListAndListItem = (this && this.findChildById) ? this.findChildById("47") as MyListAndListItem : undefined;
            if (earlierCreatedChild_47 == undefined) {
                View.create(new MyListAndListItem("47", this, {}));
            }
            else {
                earlierCreatedChild_47.updateWithValueParams({});
                View.create(earlierCreatedChild_47);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Panel') {
            If.branchId(0);
            let earlierCreatedChild_48: MyPanel = (this && this.findChildById) ? this.findChildById("48") as MyPanel : undefined;
            if (earlierCreatedChild_48 == undefined) {
                View.create(new MyPanel("48", this, {}));
            }
            else {
                earlierCreatedChild_48.updateWithValueParams({});
                View.create(earlierCreatedChild_48);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Refresh') {
            If.branchId(0);
            let earlierCreatedChild_49: MyRefresh = (this && this.findChildById) ? this.findChildById("49") as MyRefresh : undefined;
            if (earlierCreatedChild_49 == undefined) {
                View.create(new MyRefresh("49", this, {}));
            }
            else {
                earlierCreatedChild_49.updateWithValueParams({});
                View.create(earlierCreatedChild_49);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'RelativeContainer') {
            If.branchId(0);
            let earlierCreatedChild_50: MyRelativeContainer = (this && this.findChildById) ? this.findChildById("50") as MyRelativeContainer : undefined;
            if (earlierCreatedChild_50 == undefined) {
                View.create(new MyRelativeContainer("50", this, {}));
            }
            else {
                earlierCreatedChild_50.updateWithValueParams({});
                if (!earlierCreatedChild_50.needsUpdate()) {
                    earlierCreatedChild_50.markStatic();
                }
                View.create(earlierCreatedChild_50);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'swiper') {
            If.branchId(0);
            let earlierCreatedChild_51: MySwiper = (this && this.findChildById) ? this.findChildById("51") as MySwiper : undefined;
            if (earlierCreatedChild_51 == undefined) {
                View.create(new MySwiper("51", this, {}));
            }
            else {
                earlierCreatedChild_51.updateWithValueParams({});
                if (!earlierCreatedChild_51.needsUpdate()) {
                    earlierCreatedChild_51.markStatic();
                }
                View.create(earlierCreatedChild_51);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Tabs&TabContent') {
            If.branchId(0);
            let earlierCreatedChild_52: MyTabAndTabContent = (this && this.findChildById) ? this.findChildById("52") as MyTabAndTabContent : undefined;
            if (earlierCreatedChild_52 == undefined) {
                View.create(new MyTabAndTabContent("52", this, {}));
            }
            else {
                earlierCreatedChild_52.updateWithValueParams({});
                View.create(earlierCreatedChild_52);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'Video') {
            If.branchId(0);
            let earlierCreatedChild_53: MyVideo = (this && this.findChildById) ? this.findChildById("53") as MyVideo : undefined;
            if (earlierCreatedChild_53 == undefined) {
                View.create(new MyVideo("53", this, {}));
            }
            else {
                earlierCreatedChild_53.updateWithValueParams({});
                View.create(earlierCreatedChild_53);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'SideBarContainer') {
            If.branchId(0);
            let earlierCreatedChild_54: MySideBarContainer = (this && this.findChildById) ? this.findChildById("54") as MySideBarContainer : undefined;
            if (earlierCreatedChild_54 == undefined) {
                View.create(new MySideBarContainer("54", this, {}));
            }
            else {
                earlierCreatedChild_54.updateWithValueParams({});
                View.create(earlierCreatedChild_54);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'AlertDialog') {
            If.branchId(0);
            let earlierCreatedChild_55: MyAlertDialog = (this && this.findChildById) ? this.findChildById("55") as MyAlertDialog : undefined;
            if (earlierCreatedChild_55 == undefined) {
                View.create(new MyAlertDialog("55", this, {}));
            }
            else {
                earlierCreatedChild_55.updateWithValueParams({});
                if (!earlierCreatedChild_55.needsUpdate()) {
                    earlierCreatedChild_55.markStatic();
                }
                View.create(earlierCreatedChild_55);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'ActionSheet') {
            If.branchId(0);
            let earlierCreatedChild_56: MyActionSheet = (this && this.findChildById) ? this.findChildById("56") as MyActionSheet : undefined;
            if (earlierCreatedChild_56 == undefined) {
                View.create(new MyActionSheet("56", this, {}));
            }
            else {
                earlierCreatedChild_56.updateWithValueParams({});
                if (!earlierCreatedChild_56.needsUpdate()) {
                    earlierCreatedChild_56.markStatic();
                }
                View.create(earlierCreatedChild_56);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'CustomDialogController') {
            If.branchId(0);
            let earlierCreatedChild_57: MyCustomDialogController = (this && this.findChildById) ? this.findChildById("57") as MyCustomDialogController : undefined;
            if (earlierCreatedChild_57 == undefined) {
                View.create(new MyCustomDialogController("57", this, {}));
            }
            else {
                earlierCreatedChild_57.updateWithValueParams({});
                View.create(earlierCreatedChild_57);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'DatePickerDialog') {
            If.branchId(0);
            let earlierCreatedChild_58: MyDatePickerDialog = (this && this.findChildById) ? this.findChildById("58") as MyDatePickerDialog : undefined;
            if (earlierCreatedChild_58 == undefined) {
                View.create(new MyDatePickerDialog("58", this, {}));
            }
            else {
                earlierCreatedChild_58.updateWithValueParams({});
                if (!earlierCreatedChild_58.needsUpdate()) {
                    earlierCreatedChild_58.markStatic();
                }
                View.create(earlierCreatedChild_58);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TimePickerDialog') {
            If.branchId(0);
            let earlierCreatedChild_59: MyTimePickerDialog = (this && this.findChildById) ? this.findChildById("59") as MyTimePickerDialog : undefined;
            if (earlierCreatedChild_59 == undefined) {
                View.create(new MyTimePickerDialog("59", this, {}));
            }
            else {
                earlierCreatedChild_59.updateWithValueParams({});
                View.create(earlierCreatedChild_59);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'TextPickerDialog') {
            If.branchId(0);
            let earlierCreatedChild_60: MyTextPickerDialog = (this && this.findChildById) ? this.findChildById("60") as MyTextPickerDialog : undefined;
            if (earlierCreatedChild_60 == undefined) {
                View.create(new MyTextPickerDialog("60", this, {}));
            }
            else {
                earlierCreatedChild_60.updateWithValueParams({});
                View.create(earlierCreatedChild_60);
            }
        }
        If.pop();
        If.create();
        if (this.componentName == 'LoadingProgress') {
            If.branchId(0);
            let earlierCreatedChild_61: MyLoadingProgress = (this && this.findChildById) ? this.findChildById("61") as MyLoadingProgress : undefined;
            if (earlierCreatedChild_61 == undefined) {
                View.create(new MyLoadingProgress("61", this, {}));
            }
            else {
                earlierCreatedChild_61.updateWithValueParams({});
                if (!earlierCreatedChild_61.needsUpdate()) {
                    earlierCreatedChild_61.markStatic();
                }
                View.create(earlierCreatedChild_61);
            }
        }
        If.pop();
        Column.pop();
    }
}
loadDocument(new componentDetail("1", undefined, {}));
