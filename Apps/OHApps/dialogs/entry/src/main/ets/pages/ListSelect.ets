/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import  { listSelectModel, ListSelectDialog, BaseMode } from '@ohos/dialogs'
import  { TitleBorder,BtnContentBorder,ListItemBorder,BtnBorder} from '@ohos/dialogs'
class obj  {
  name: string =''
  id: number = 0
  isSelect: boolean = false
}
@Entry
@Component
struct CheckComp {
  @State message: string = '列表弹窗'
  @State model:listSelectModel = new listSelectModel()

  aboutToAppear(){
    this.model.dialogBgColor = '#232323'
    this.model.title = '请选择一项'
    this.model.titleFontColor = '#ffffff'
    this.model.titleMargin = 10
    this.model.titleBorder = {
      width: {bottom: 2},
      color:{bottom: Color.White},
      style:{top:BorderStyle.Solid}
    }
    this.model.listPadding = {left: 5,right: 5}
    this.model.listTextFontColor = '#ffffff'
    this.model.listItemPadding = {left:5}
    let btnContentBorder:BtnContentBorder = {
      width: {top: 1},
      color:{top:'#ffffff'},
      style:{top:BorderStyle.Solid},
    }
    this.model.btnContentBorder = btnContentBorder
    let listItemBorder:ListItemBorder= {
      width: {bottom: 1},
      color:{bottom: '#ffffff'},
      style:{top:BorderStyle.Solid}
    }
    this.model.listItemBorder = listItemBorder
    this.model.selectMode = 'normal'
    this.model.isDisplayBtn = true
    this.model.cancelBtnFontColor = '#ffffff'
    this.model.cancelBtnBgColor = '#232323'
    this.model.cancelBtnTitle = 'Cancel'
    let btnBorder:BtnBorder = {
      width: {right: 1},
      color:{right:'#ffffff'},
      style:{top:BorderStyle.Solid}
    }
    this.model.btnBorder = btnBorder
    this.model.confirmBtnFontColor = '#ffffff'
    this.model.confirmBtnBgColor = '#232323'
    this.model.confirmBtnTitle = 'OK'
    this.model.btnWidth = '50%'
    this.model.btnHeight = 60
    this.model.btnContentMargin = {top: 30}
    this.model.cancel = this.cancel
    this.model.confirm = (data?:object) => {
      this.confirm(data as obj[])
    }
  }

  @State list: obj[] = [
    {
      name:'我是第1条数据',
      id: 1,
      isSelect:false
    },
    {
      name:'我是第2条数据',
      id: 2,
      isSelect:false
    },
    {
      name:'我是第3条数据',
      id: 3,
      isSelect:false
    },
    {
      name:'我是第4条数据',
      id: 4,
      isSelect:false
    },
    {
      name:'我是第5条数据',
      id: 5,
      isSelect:false
    }

  ]

  confirm(data:obj[]) {
    if(data) {
     data.forEach(item => {
          this.list.forEach(obj => {
            if(this.model.selectMode == 'checkbox') {
              if(obj.id == item.id) {
                obj.isSelect = item.isSelect
              }
            }else{
              if(obj.id == item.id) {
                obj.isSelect = true
              }else{
                obj.isSelect = false
              }
            }
          })
     })
    }

    console.info('Callback when the confirm button is clicked')
  }
  cancel() {
    console.info('Callback when the cancel button is clicked')
  }

  CheckDialogController: CustomDialogController = new CustomDialogController({
    builder: ListSelectDialog({
      model: this.model,
      arrList: this.list,
    }),
    alignment: DialogAlignment.Center,
    customStyle: true
  })

  build(){
    Column(){
      Button('打开列表弹窗')
        .onClick(() => {
          this.model.isDisplayBtn = false
          this.model.selectMode = 'normal'
          this.CheckDialogController.open()
        }).margin({bottom:20})
      Button('打开多选列表弹窗')
        .onClick(() => {
          this.model.isDisplayBtn = true
          this.model.selectMode = 'checkbox'
          this.CheckDialogController.open()
        }).margin({bottom:20})
      Button('打开单选列表弹窗')
        .onClick(() => {
          this.model.isDisplayBtn = false
          this.model.selectMode = 'radio'
          this.CheckDialogController.open()
        }).margin({bottom:20})
    }.padding(20)
  }
}