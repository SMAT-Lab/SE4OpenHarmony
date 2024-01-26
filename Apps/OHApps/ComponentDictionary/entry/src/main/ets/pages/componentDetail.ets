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
import {MyNavigation}from'../common/components/MyNavigation'
import { MyLoadingProgress } from '../common/components/MyLoadingProgress';
import { MyGauge } from '../common/components/MyGauge';
import { MyDataPanel } from '../common/components/MyDataPanel';
import { MyCheckboxGroup } from '../common/components/MyCheckboxGroup';
import { MyCheckbox } from '../common/components/MyCheckbox';
import { MyBlank } from '../common/components/MyBlank';
import router from '@ohos.router';

@Entry
@Component
export struct componentDetail {
  private componentName: string = router.getParams()['name']

  build() {
    Column() {
      if (this.componentName == 'Blank') {
        MyBlank()
      }
      if (this.componentName == 'Button') {
        MyButton()
      }
      if (this.componentName == 'DatePicker') {
        MyDatePicker()
      }
      if (this.componentName == 'Divider') {
        MyDivider()
      }
      if (this.componentName == 'Image') {
        MyImage()
      }
      if (this.componentName == 'ImageAnimator') {
        MyImageAnimator()
      }
      if (this.componentName == 'PatternLock') {
        MyPatternLock()
      }
      if (this.componentName == 'Progress') {
        MyProgress()
      }
      if (this.componentName == 'QRCode') {
        MyQRCode()
      }
      if (this.componentName == 'Rating') {
        MyRating()
      }
      if (this.componentName == 'Search') {
        MySearch()
      }
      if (this.componentName == 'Select') {
        MySelect()
      }
      if (this.componentName == 'Slider') {
        MySlider()
      }
      if (this.componentName == 'Span') {
        MySpan()
      }
      if (this.componentName == 'Text') {
        MyText()
      }
      if (this.componentName == 'TextArea') {
        MyTextArea()
      }
      if (this.componentName == 'Toggle') {
        MyToggle()
      }
      if (this.componentName == 'Checkbox') {
        MyCheckbox()
      }
      if (this.componentName == 'CheckboxGroup') {
        MyCheckboxGroup()
      }
      if (this.componentName == 'DataPanel') {
        MyDataPanel()
      }
      if (this.componentName == 'Gauge') {
        MyGauge()
      }
      if (this.componentName == 'LoadingProgress') {
        MyLoadingProgress()
      }
      if (this.componentName == 'Navigation') {
        MyNavigation()
      }
      if (this.componentName == 'Radio') {
        MyRadio()
      }
      if (this.componentName == 'ScrollBar') {
        MyScrollBar()
      }
      if (this.componentName == 'Stepper&StepperItem') {
        MyStepperStepperItem()
      }
      if (this.componentName == 'TextClock') {
        MyTextClock()
      }
      if (this.componentName == 'TextInput') {
        MyTextInput()
      }
      if (this.componentName == 'TextPicker') {
        MyTextPicker()
      }
      if (this.componentName == 'TextTimer') {
        MyTextTimer()
      }
      if (this.componentName == 'TimePicker') {
        MyTimePicker()
      }
      if (this.componentName == 'AlphabetIndexer') {
        MyAlphabetIndexer()
      }
      if (this.componentName == 'Column') {
        MyColumn()
      }
      if (this.componentName == 'ColumnSplit') {
        MyColumnSplit()
      }
      if (this.componentName == 'Counter') {
        MyCounter()
      }
      if (this.componentName == 'Flex') {
        MyFlex()
      }
      if (this.componentName == 'GridContainer') {
        MyGridContainer()
      }
      if (this.componentName == 'Grid&GridItem') {
        MyGridGridItem()
      }
      if (this.componentName == 'Navigator') {
        MyNavigator()
      }
      if (this.componentName == 'Row') {
        MyRow()
      }
      if (this.componentName == 'RowSplit') {
        MyRowSplit()
      }
      if (this.componentName == 'Scroll') {
        MyScroll()
      }
      if (this.componentName == 'SideBarContainer') {
        MySideBarContainer()
      }
      if (this.componentName == 'Stack') {
        MyStack()
      }
      if (this.componentName == 'Badge') {
        MyBadge()
      }
      if (this.componentName == 'List&ListItem') {
        MyListAndListItem()
      }
      if (this.componentName == 'Panel') {
        MyPanel()
      }
      if (this.componentName == 'Refresh') {
        MyRefresh()
      }
      if (this.componentName == 'RelativeContainer') {
        MyRelativeContainer()
      }
      if (this.componentName == 'swiper') {
        MySwiper()
      }
      if (this.componentName == 'Tabs&TabContent') {
        MyTabAndTabContent()
      }
      if (this.componentName == 'Video') {
        MyVideo()
      }
      if (this.componentName == 'SideBarContainer') {
        MySideBarContainer()
      }
      if (this.componentName == 'AlertDialog') {
        MyAlertDialog()
      }
      if (this.componentName == 'ActionSheet') {
        MyActionSheet()
      }
      if (this.componentName == 'CustomDialogController') {
        MyCustomDialogController()
      }
      if (this.componentName == 'DatePickerDialog') {
        MyDatePickerDialog()
      }
      if (this.componentName == 'TimePickerDialog') {
        MyTimePickerDialog()
      }
      if (this.componentName == 'TextPickerDialog') {
        MyTextPickerDialog()
      }
      if (this.componentName=='LoadingProgress'){
        MyLoadingProgress()
      }
    }
  }
}

