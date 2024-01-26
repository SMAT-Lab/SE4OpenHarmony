interface CustomDialogCase_Params {
    model?: MaterialDialog.Model;
    dialogAttribute?;
    dialogController?: CustomDialogController;
    customDialogController?: CustomDialogController;
    items?: string[];
    states?: string[];
    socialNetworks_longItems?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import prompt from '@system.prompt';
import { MaterialDialog } from '@ohos/material-dialogs';
import { ClickCallback } from '@ohos/material-dialogs';
import { ToggleCallback } from '@ohos/material-dialogs';
import { ItemListener } from '@ohos/material-dialogs';
import { ColorPalette } from '@ohos/material-dialogs';
import { DialogAttributeModel } from '@ohos/material-dialogs';
import { TextAttributeModel } from '@ohos/material-dialogs';
import { ListItemAttributeModel } from '@ohos/material-dialogs';
import { MultiChoiceListener } from '@ohos/material-dialogs';
import { ColorCallback } from '@ohos/material-dialogs';
import { DateTimeCallback } from '@ohos/material-dialogs';
import { InputCallback } from '@ohos/material-dialogs';
import { SingleChoiceListener } from '@ohos/material-dialogs';
class ClickCallback1 implements ClickCallback {
    value1: string = '';
    type: number = 0;
    onClick(value?: string) {
        if (this.type === 0) {
            console.info(this.value1);
        }
        else if (this.type === 1) {
            console.info('ClickCallback when the confirm button is clicked');
            prompt.showToast({ message: this.value1 });
        }
        else if (this.type === 2) {
            prompt.showToast({ message: this.value1 });
        }
        else {
            console.info('ClickCallback when the confirm button is clicked');
            prompt.showToast({ message: this.value1 + value });
        }
    }
    constructor(value: string, type: number) {
        this.value1 = value;
        this.type = type;
    }
}
class ToggleCallback1 implements ToggleCallback {
    onChanged(checked: boolean) {
        console.info('onChanged checked is ' + checked);
        prompt.showToast({ message: "Checked? " + checked });
    }
}
class ItemListener1 implements ItemListener {
    onSelected(value: string, index: number) {
        console.info('onSelected value is ' + value + ' index is ' + index);
        prompt.showToast({ message: "Selected item " + value + " at index " + index });
    }
}
class SingleChoiceListener1 implements SingleChoiceListener {
    onSelected(value: string, index: number) {
        console.info('onSelected value is ' + value + ' index is ' + index);
        prompt.showToast({ message: "Selected item " + value + " at index " + index });
    }
}
class ColorCallback1 implements ColorCallback {
    onSelected(color: string) {
        console.info('onSelected color is ' + color);
        prompt.showToast({ message: "Selected color: " + color });
    }
}
class DateTimeCallback1 implements DateTimeCallback {
    value1: string = '';
    onSelected(value: string) {
        console.info(this.value1 + ' onSelected value is ' + value);
        prompt.showToast({ message: "Selected date: " + value });
    }
    constructor(value1: string) {
        this.value1 = value1;
    }
}
class MultiChoiceListener1 implements MultiChoiceListener {
    onSelected(indices: number[], items: string[]) {
        console.info('onSelected indices is ' + indices + ' items is ' + items);
        prompt.showToast({ message: "Selected item " + items.toString() + " at index " + indices.toString() });
    }
}
class InputCallback1 implements InputCallback {
    value1: string = '';
    onChange(value: string) {
        console.info(this.value1 + value);
    }
    constructor(value: string) {
        this.value1 = value;
    }
}
function Callback(value1: string, type: number): ClickCallback {
    let back: ClickCallback = new ClickCallback1(value1, type);
    return back;
}
function toggleCallback(): ToggleCallback {
    let back: ToggleCallback = new ToggleCallback1();
    return back;
}
function itemListener(): ItemListener {
    let back: ItemListener = new ItemListener1();
    return back;
}
function singleChoiceListener(): SingleChoiceListener {
    let back: SingleChoiceListener = new SingleChoiceListener1();
    return back;
}
function colorCallback(): ColorCallback {
    let back: ColorCallback = new ColorCallback1();
    return back;
}
function dateTimeCallback(value1: string): DateTimeCallback {
    let back: DateTimeCallback = new DateTimeCallback1(value1);
    return back;
}
function multiChoiceListener(): MultiChoiceListener {
    let back: MultiChoiceListener = new MultiChoiceListener1();
    return back;
}
function inputCallback(value1: string): InputCallback {
    let back: InputCallback = new InputCallback1(value1);
    return back;
}
class CustomDialogCase extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.model = new MaterialDialog.Model();
        this.dialogAttribute = new DialogAttributeModel();
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new MaterialDialog({
                    model: this.model, dialogAttribute: this.dialogAttribute
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existDialog,
            autoCancel: true,
            alignment: DialogAlignment.Center,
            customStyle: true
        }, this);
        this.customDialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new MaterialDialog({
                    model: this.model, dialogAttribute: this.dialogAttribute, customComponent: () => {
                        this.MyComponent();
                    }
                });
                jsDialog.setController(this.customDialogController);
                View.create(jsDialog);
            },
            cancel: this.existDialog,
            autoCancel: true,
            alignment: DialogAlignment.Center,
            customStyle: true
        }, this);
        this.items = ['Twitter', 'Ohos', 'Instagram', 'Facebook'];
        this.states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas',
            'California', 'Colorado', 'Connecticut',
            'Delaware', 'District of Columbia',
            'Florida',
            'Georgia', 'Guam',
            'Hawaii', 'Idaho',
            'Illinois', 'Indiana', 'Iowa',
            'Kansas', 'Kentucky',
            'Louisiana',
            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
            'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Marianas Islands',
            'Ohio', 'Oklahoma', 'Oregon',
            'Pennsylvania', 'Puerto Rico',
            'Rhode Island',
            'South Carolina', 'South Dakota',
            'Tennessee', 'Texas',
            'Utah',
            'Vermont', 'Virginia', 'Virgin Islands',
            'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        this.socialNetworks_longItems = [
            'Twitter is an online social networking service that enables users to send and read short 140-character messages called "tweets".',
            'Ohos+ is an interest-based social network that is owned and operated by Ohos Inc. The service is Ohos\'s fourth foray into social networking.',
            'Instagram is an online mobile photo-sharing, video-sharing and social networking service that enables its users to take pictures and videos, and share them on a variety of social networking platforms.',
            'Facebook is an online social networking service headquartered in Menlo Park, California. Its website was launched on February 4, 2004, by Mark Zuckerberg with friends.'
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogCase_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.dialogAttribute !== undefined) {
            this.dialogAttribute = params.dialogAttribute;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.customDialogController !== undefined) {
            this.customDialogController = params.customDialogController;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.states !== undefined) {
            this.states = params.states;
        }
        if (params.socialNetworks_longItems !== undefined) {
            this.socialNetworks_longItems = params.socialNetworks_longItems;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private model: MaterialDialog.Model;
    private dialogAttribute;
    private dialogController: CustomDialogController;
    private customDialogController: CustomDialogController;
    private items: string[];
    private states: string[];
    private socialNetworks_longItems: string[];
    existDialog() {
        console.info('Click the callback in the blank area');
        this.dialogController.close();
    }
    showBasicDialog() {
        this.model.reset();
        this.model.message($r('app.string.shareLocationPrompt'), this.getMessageAttribute());
        this.dialogController.open();
    }
    showBasicTitleDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.dialogController.open();
    }
    showBasicButtonDialog() {
        this.model.reset();
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.dialogController.open();
    }
    showBasicStackedButtonDialog() {
        this.model.reset();
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton("This is a long button", Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton("So is this, these should stack", Callback('ClickCallback when the cancel button is clicked', 0));
        this.model.setStacked(true);
        this.dialogController.open();
    }
    showBasicTitleButtonDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    showBasicLongButtonDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r('app.string.testContent'), this.getMessageAttribute());
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.model.setStacked(false);
        this.model.setScrollHeight(400);
        this.dialogController.open();
    }
    showBasicIconButtonDialog() {
        this.model.reset();
        this.model.icon($r('app.media.ic_launcher'));
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    showBasicCheckboxButtonDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.model.setStacked(false);
        let textAttribute = new TextAttributeModel();
        textAttribute.fontSize = 14;
        this.model.checkBoxPrompt($r('app.string.checkboxConfirm'), false, toggleCallback(), textAttribute);
        this.dialogController.open();
    }
    showListDialog() {
        let attribute = new ListItemAttributeModel();
        attribute.textHeight = 50;
        this.model.reset();
        let items: string[] = ['Twitter', 'Ohos', 'Instagram', 'Facebook'];
        this.model.listItems(items, itemListener(), null, false, attribute);
        this.dialogController.open();
    }
    showListButtonDialog() {
        this.model.reset();
        let items: string[] = ['Twitter', 'Ohos', 'Instagram', 'Facebook'];
        this.model.listItems(items, itemListener(), null, true);
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.dialogController.open();
    }
    showListWithoutPositiveButtonDialog() {
        this.model.reset();
        let items: string[] = ['Twitter', 'Ohos', 'Instagram', 'Facebook'];
        this.model.listItems(items, itemListener(), null, false);
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the cancel button is clicked', 0));
        this.dialogController.open();
    }
    showListTitleDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'));
        this.model.listItems(this.items, itemListener(), null, false);
        this.dialogController.open();
    }
    showListTitleButtonDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItems(this.items, itemListener(), null, true);
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.dialogController.open();
    }
    showListTitleMessageButtonDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServices"), this.getMessageAttribute());
        this.model.listItems(this.items, itemListener(), null, true);
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.dialogController.open();
    }
    showListLongDialog() {
        this.model.reset();
        this.model.listItems(this.states, itemListener(), null, true);
        this.model.setScrollHeight(500);
        this.dialogController.open();
    }
    showListLongTitleDialog() {
        this.model.reset();
        this.model.title($r('app.string.states'), this.getTitleAttribute());
        this.model.listItems(this.states, itemListener(), null, true);
        this.model.setScrollHeight(460);
        this.dialogController.open();
    }
    private showListTitleCheckboxButtonDialog() {
        let titleAttribute = new TextAttributeModel();
        titleAttribute.fontSize = 25;
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), titleAttribute);
        this.model.listItems(this.socialNetworks_longItems, itemListener(), null, true);
        this.model.positiveButton($r('app.string.agree'), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r('app.string.disagree'), Callback('ClickCallback when the cancel button is clicked', 0));
        this.model.setStacked(false);
        this.model.checkBoxPrompt($r('app.string.checkboxConfirm'), false, toggleCallback());
        this.dialogController.open();
    }
    private showSingleChoiceDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'));
        this.model.listItemsSingleChoice(this.items, 1, true, null, -1, -1, singleChoiceListener());
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showSingleChoiceButtonsDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItemsSingleChoice(this.items, 2, true, null, -1, -1, singleChoiceListener());
        this.model.positiveButton('CHOOSE', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showSingleChoiceLongItemsDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItemsSingleChoice(this.socialNetworks_longItems, -1, true, null, -1, -1, singleChoiceListener());
        this.model.positiveButton('CHOOSE', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.setScrollHeight(400);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showSingleChoiceDisabledItemsDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItemsSingleChoice(this.items, 1, true, [1, 3], -1, -1, singleChoiceListener());
        this.model.positiveButton('CHOOSE', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showMultipleChoiceDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItemsMultiChoice(this.items, null, [1, 3], true, false, multiChoiceListener());
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showMultipleChoiceButtonsDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItemsMultiChoice(this.items, null, [1, 3], true, false, multiChoiceListener());
        this.model.positiveButton('CHOOSE', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showMultipleChoiceLongDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItemsMultiChoice(this.socialNetworks_longItems, null, [0, 2], true, false, multiChoiceListener());
        this.model.positiveButton('CHOOSE', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.setScrollHeight(400);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showMultipleChoiceDisabledDialog() {
        this.model.reset();
        this.model.title($r('app.string.socialNetworks'), this.getTitleAttribute());
        this.model.listItemsMultiChoice(this.items, [1, 3], [2, 3], true, false, multiChoiceListener());
        this.model.positiveButton('CHOOSE', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showStackedButtonsDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton('Hello World', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton('How are you doing?', Callback('ClickCallback when the negative button is clicked', 0));
        this.model.neutralButton('Testing long buttons', Callback('ClickCallback when the neutral button is clicked', 0));
        this.model.setStacked(true);
        this.dialogController.open();
    }
    private showStackedButtonsCheckboxDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton('Hello World', Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton('How are you doing?', Callback('ClickCallback when the negative button is clicked', 0));
        this.model.neutralButton('Testing long buttons', Callback('ClickCallback when the neutral button is clicked', 0));
        this.model.checkBoxPrompt($r('app.string.checkboxConfirm'), false, toggleCallback());
        this.model.setStacked(true);
        this.dialogController.open();
    }
    private shownNeutralButtonDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton($r("app.string.agree"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.disagree"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.neutralButton('MORE INFO', Callback('ClickCallback when the neutral button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private shownButtonCallbacksDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.positiveButton($r("app.string.agree"), Callback("On positive", 1));
        this.model.negativeButton($r("app.string.disagree"), Callback("On negative", 2));
        this.model.neutralButton('MORE INFO', Callback("On neutral", 2));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showInputDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.input(true, false, null, 'please input');
        this.model.positiveButton($r("app.string.agree"), Callback("Input: ", 3));
        this.model.negativeButton($r("app.string.disagree"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showInputMessageDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.input(true, false, null, 'please input', 'Pre-filled!');
        this.model.positiveButton($r("app.string.agree"), Callback("Input: ", 3));
        this.model.negativeButton($r("app.string.disagree"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showInputCounterDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.message($r("app.string.useOhosLocationServicesPrompt"), this.getMessageAttribute());
        this.model.input(true, false, inputCallback('InputCallback value is '), 'please input', '', 8);
        this.model.positiveButton($r("app.string.agree"), Callback("Input: ", 3));
        this.model.negativeButton($r("app.string.disagree"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showInputCheckboxDialog() {
        this.model.reset();
        this.model.title($r("app.string.useOhosLocationServices"), this.getTitleAttribute());
        this.model.input(true, false, null, 'please input');
        this.model.positiveButton($r("app.string.agree"), Callback("Input: ", 3));
        this.model.negativeButton($r("app.string.disagree"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.checkBoxPrompt($r('app.string.checkboxConfirm'), false, toggleCallback());
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showColorPrimaryDialog() {
        this.model.reset();
        this.model.title($r('app.string.primary_colors'), this.getTitleAttribute());
        this.model.colorChooser(ColorPalette.primary, ColorPalette.primarySub, -1, true, false, false, false, colorCallback());
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setScrollHeight(400);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showColorAccentDialog() {
        this.model.reset();
        this.model.title($r('app.string.accent_colors'), this.getTitleAttribute());
        this.model.colorChooser(ColorPalette.accent, ColorPalette.accentSub, -1, true, false, false, false, colorCallback());
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setScrollHeight(300);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showCustomColorDialog() {
        this.model.reset();
        this.model.title($r('app.string.custom_colors'), this.getTitleAttribute());
        let topLevel: string[] = ['#00000000', '#ff0000', '#ffff00', '#0000ff'];
        let subLevel: string[][] = [
            ['#ffffff', '#00000000', '#000000'],
            ['#CCCCCC', '#888888', '#444444'],
            ['#00FF00'],
            ['#FF00FF', '#00FFFF']
        ];
        this.model.colorChooser(topLevel, subLevel, -1, true, false, false, false, colorCallback());
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setScrollHeight(80);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showCustomNoSubDialog() {
        this.model.reset();
        this.model.title($r('app.string.custom_colors'), this.getTitleAttribute());
        let topLevel: string[] = ['#ff0000', '#ffff00', '#0000ff'];
        this.model.colorChooser(topLevel, null, -1, true, false, false, false, colorCallback());
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setScrollHeight(80);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showColorPrimaryCustomRgbDialog() {
        this.model.reset();
        this.model.title($r('app.string.primary_colors'), this.getTitleAttribute());
        this.model.colorChooser(ColorPalette.primary, ColorPalette.primarySub, -1, true, true, false, false, colorCallback());
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setScrollHeight(420);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showColorPrimaryCustomArgbDialog() {
        this.model.reset();
        this.model.title($r('app.string.primary_colors'), this.getTitleAttribute());
        this.model.colorChooser(ColorPalette.primary, ColorPalette.primarySub, -1, true, true, true, false, colorCallback());
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setScrollHeight(400);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showDateDialog() {
        this.model.reset();
        this.model.title('Select Date', this.getTitleAttribute());
        this.model.datePicker(2001, 2050, [2001, 1, 1], Color.Red, dateTimeCallback("datePicker"));
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showTimeDialog() {
        this.model.reset();
        this.model.title('Select Time', this.getTitleAttribute());
        this.model.timePicker(Color.Red, dateTimeCallback("timePicker"));
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setStacked(false);
        this.dialogController.open();
    }
    private showDateTimeDialog() {
        this.model.reset();
        this.model.title('Select DateTime', this.getTitleAttribute());
        this.model.dateTimePicker(2001, 2050, [2001, 1, 1], Color.Red, dateTimeCallback("dateTimePicker"));
        this.model.positiveButton($r("app.string.select"), Callback('ClickCallback when the confirm button is clicked', 0));
        this.model.negativeButton($r("app.string.cancel"), Callback('ClickCallback when the negative button is clicked', 0));
        this.model.setScrollHeight(360);
        this.model.setStacked(false);
        this.dialogController.open();
    }
    MyComponent(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Text.create('标题');
        Text.height(50);
        Text.fontSize(30);
        Text.fontColor(Color.Black);
        Text.pop();
        Column.create();
        Column.backgroundColor(Color.Gray);
        Column.width('100%');
        Column.margin({ bottom: 10 });
        Column.alignItems(HorizontalAlign.Center);
        Text.create('我是自定义组件');
        Text.height(50);
        Text.fontSize(25);
        Text.fontColor(Color.Red);
        Text.pop();
        Text.create('我是自定义组件');
        Text.height(50);
        Text.fontSize(16);
        Text.fontColor(Color.Pink);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.alignItems(VerticalAlign.Center);
        Row.justifyContent(FlexAlign.End);
        Button.createWithLabel('取消', { type: ButtonType.Normal });
        Button.fontColor(Color.White);
        Button.backgroundColor(Color.Blue);
        Button.onClick(() => {
            this.customDialogController.close();
        });
        Button.pop();
        Button.createWithLabel('确定', { type: ButtonType.Normal });
        Button.fontColor(Color.White);
        Button.backgroundColor(Color.Blue);
        Button.margin({ left: 20 });
        Button.onClick(() => {
            this.customDialogController.close();
        });
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    getTitleAttribute(): TextAttributeModel {
        let titleAttribute = new TextAttributeModel();
        titleAttribute.fontSize = 20;
        return titleAttribute;
    }
    getMessageAttribute(): TextAttributeModel {
        let messageAttribute = new TextAttributeModel();
        messageAttribute.fontColor = "#666666";
        messageAttribute.fontSize = 16;
        return messageAttribute;
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(10);
        Column.create();
        Column.width('100%');
        Column.padding({ left: 16, right: 16 });
        Text.create('Basic');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('BASIC');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicDialog();
        });
        Text.pop();
        Text.create('BASIC + TITLE');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicTitleDialog();
        });
        Text.pop();
        Text.create('BASIC + BUTTONS');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicButtonDialog();
        });
        Text.pop();
        Text.create('BASIC + STACKED BUTTONS');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicStackedButtonDialog();
        });
        Text.pop();
        Text.create('BASIC + TITLE + BUTTONS');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicTitleButtonDialog();
        });
        Text.pop();
        Text.create('BASIC LONG + TITLE + BUTTONS');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicLongButtonDialog();
        });
        Text.pop();
        Text.create('BASIC + ICON + BUTTONS');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicIconButtonDialog();
        });
        Text.pop();
        Text.create('BASIC + TITLE + CHECKBOX + BUTTONS');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showBasicCheckboxButtonDialog();
        });
        Text.pop();
        Text.create('Lists');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('LIST');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListDialog();
        });
        Text.pop();
        Text.create('LIST + BUTTONS');
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListButtonDialog();
        });
        Text.pop();
        Text.create("LIST + DON'T WAIT FOR POSITIVE");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListWithoutPositiveButtonDialog();
        });
        Text.pop();
        Text.create("LIST + TITLE");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListTitleDialog();
        });
        Text.pop();
        Text.create("LIST + TITLE + BUTTONS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListTitleButtonDialog();
        });
        Text.pop();
        Text.create("LIST + TITLE + MESSAGE + BUTTONS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListTitleMessageButtonDialog();
        });
        Text.pop();
        Text.create("LIST LONG");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListLongDialog();
        });
        Text.pop();
        Text.create("LIST LONG + TITLE");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListLongTitleDialog();
        });
        Text.pop();
        Text.create("LIST + TITLE + CHECKBOX PROMPT + BUTTONS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showListTitleCheckboxButtonDialog();
        });
        Text.pop();
        Text.create('Single Choice Lists');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("SINGLE CHOICE + TITLE");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showSingleChoiceDialog();
        });
        Text.pop();
        Text.create("SINGLE CHOICE + TITLE + BUTTONS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showSingleChoiceButtonsDialog();
        });
        Text.pop();
        Text.create("SINGLE CHOICE, LONG ITEMS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showSingleChoiceLongItemsDialog();
        });
        Text.pop();
        Text.create("SINGLE CHOICE, DISABLED ITEMS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showSingleChoiceDisabledItemsDialog();
        });
        Text.pop();
        Text.create('Multiple Choice Lists');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("MULTIPLE CHOICE");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showMultipleChoiceDialog();
        });
        Text.pop();
        Text.create("MULTIPLE CHOICE + BUTTONS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showMultipleChoiceButtonsDialog();
        });
        Text.pop();
        Text.create("MULTIPLE CHOICE, LONG ITEMS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showMultipleChoiceLongDialog();
        });
        Text.pop();
        Text.create("MULTIPLE CHOICE, DISABLED ITEMS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showMultipleChoiceDisabledDialog();
        });
        Text.pop();
        Text.create('Action Buttons');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("STACKED BUTTONS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showStackedButtonsDialog();
        });
        Text.pop();
        Text.create("STACKED BUTTONS + CHECKBOX PROMPT");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showStackedButtonsCheckboxDialog();
        });
        Text.pop();
        Text.create("NEUTRAL BUTTON");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.shownNeutralButtonDialog();
        });
        Text.pop();
        Text.create("BUTTON CALLBACKS");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.shownButtonCallbacksDialog();
        });
        Text.pop();
        Text.create('Text Input');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("INPUT");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showInputDialog();
        });
        Text.pop();
        Text.create("INPUT + MESSAGE");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showInputMessageDialog();
        });
        Text.pop();
        Text.create("INPUT + COUNTER");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showInputCounterDialog();
        });
        Text.pop();
        Text.create("INPUT + CHECKBOX PROMPT");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showInputCheckboxDialog();
        });
        Text.pop();
        Text.create('Color');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("COLOR CHOOSER, PRIMARY");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showColorPrimaryDialog();
        });
        Text.pop();
        Text.create("COLOR CHOOSER, ACCENT");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showColorAccentDialog();
        });
        Text.pop();
        Text.create("COLOR CHOOSER, CUSTOM");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showCustomColorDialog();
        });
        Text.pop();
        Text.create("COLOR CHOOSER, CUSTOM + NO SUB");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showCustomNoSubDialog();
        });
        Text.pop();
        Text.create("COLOR CHOOSER, PRIMARY CUSTOM + RGB");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showColorPrimaryCustomRgbDialog();
        });
        Text.pop();
        Text.create("COLOR CHOOSER, PRIMARY CUSTOM + ARGB");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showColorPrimaryCustomArgbDialog();
        });
        Text.pop();
        Text.create('DateTimePickers');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("DATE PICKER");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showDateDialog();
        });
        Text.pop();
        Text.create("TIME PICKER");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showTimeDialog();
        });
        Text.pop();
        Text.create("DATETIME PICKER");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.showDateTimeDialog();
        });
        Text.pop();
        Text.create('Custom Component');
        Text.fontSize(24);
        Text.fontColor(Color.Black);
        Text.width("100%");
        Text.textAlign(TextAlign.Start);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create("CUSTOM COMPONENT");
        Text.fontSize(20);
        Text.width("100%");
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.margin({ bottom: 10 });
        Text.backgroundColor("#999999");
        Text.padding(10);
        Text.borderRadius(10);
        Text.onClick(() => {
            this.model.reset();
            this.customDialogController.open();
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
}
loadDocument(new CustomDialogCase("1", undefined, {}));
