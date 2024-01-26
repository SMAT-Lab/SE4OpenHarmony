import { MenuData } from '../../common/MenuData'
import {HeaderConstant} from '../header/HeaderConstant'
import Prompt from '@system.prompt'
import promptAction from '@ohos.promptAction'

@Component
export struct Header{
  build(){
    Row({space:HeaderConstant.ROW_SPACE}){
      Image($r('app.media.ic_back'))
        .width(HeaderConstant.IMAGE_WIDTH)
        .height(HeaderConstant.IMAGE_HEIGHT)

      Text(HeaderConstant.TEXT_INFORMATION)
        .fontSize(HeaderConstant.TEXT_FONTSIZE)
        .fontWeight(FontWeight.Bold)

      Blank()

      Image($r('app.media.ic_more'))
        .width(HeaderConstant.IMAGE_WIDTH)
        .height(HeaderConstant.IMAGE_HEIGHT)
        .bindMenu(this.getMenu())
    }.width(HeaderConstant.ROW_WIDTH)
    .padding(HeaderConstant.ROW_PADDING)
  }

  getMenu():MenuData[]{
    let menuItem:MenuData=new MenuData()
    let MenuDatas:MenuData[]=[]

    if (canIUse(HeaderConstant.SYSCAP_ETHERNET)){
      menuItem.value=HeaderConstant.AUDIO_DEVICE_SERVICE
      menuItem.action=():void=>{
        promptAction.showToast({
          message:HeaderConstant.AUDIO_DEVICE_SERVICE,
          duration:HeaderConstant.TOAST_DURATION
        })
      }
      MenuDatas.push(menuItem)

      if (canIUse(HeaderConstant.SYSCAP_AUDIO_RENDER)){
        menuItem.value=HeaderConstant.AUDIO_RENDER
        menuItem.action=():void=>{
          promptAction.showToast({
            message:HeaderConstant.AUDIO_RENDER,
            duration:HeaderConstant.TOAST_DURATION
          })
        }
        MenuDatas.push(menuItem)
      }
    }
    return MenuDatas
  }
}