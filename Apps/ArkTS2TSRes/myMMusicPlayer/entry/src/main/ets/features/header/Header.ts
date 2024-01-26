interface Header_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Header_" + ++__generate__Id;
}
import { MenuData } from '../../common/MenuData';
import { HeaderConstant } from '../header/HeaderConstant';
import Prompt from '@system.prompt';
import promptAction from '@ohos.promptAction';
export class Header extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Header_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create({ space: HeaderConstant.ROW_SPACE });
        Row.width(HeaderConstant.ROW_WIDTH);
        Row.padding(HeaderConstant.ROW_PADDING);
        Image.create($r('app.media.ic_back'));
        Image.width(HeaderConstant.IMAGE_WIDTH);
        Image.height(HeaderConstant.IMAGE_HEIGHT);
        Text.create(HeaderConstant.TEXT_INFORMATION);
        Text.fontSize(HeaderConstant.TEXT_FONTSIZE);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.ic_more'));
        Image.width(HeaderConstant.IMAGE_WIDTH);
        Image.height(HeaderConstant.IMAGE_HEIGHT);
        Image.bindMenu(this.getMenu());
        Row.pop();
    }
    getMenu(): MenuData[] {
        let menuItem: MenuData = new MenuData();
        let MenuDatas: MenuData[] = [];
        if (canIUse(HeaderConstant.SYSCAP_ETHERNET)) {
            menuItem.value = HeaderConstant.AUDIO_DEVICE_SERVICE;
            menuItem.action = (): void => {
                promptAction.showToast({
                    message: HeaderConstant.AUDIO_DEVICE_SERVICE,
                    duration: HeaderConstant.TOAST_DURATION
                });
            };
            MenuDatas.push(menuItem);
            if (canIUse(HeaderConstant.SYSCAP_AUDIO_RENDER)) {
                menuItem.value = HeaderConstant.AUDIO_RENDER;
                menuItem.action = (): void => {
                    promptAction.showToast({
                        message: HeaderConstant.AUDIO_RENDER,
                        duration: HeaderConstant.TOAST_DURATION
                    });
                };
                MenuDatas.push(menuItem);
            }
        }
        return MenuDatas;
    }
}
