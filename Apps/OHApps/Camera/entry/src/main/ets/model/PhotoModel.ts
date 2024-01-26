import photoAccessHelper from '@ohos.file.photoAccessHelper';
import DateTimeUtil from '../utlis/DateTimeUtil';
import Logger from '../utlis/Logger';
import { GlobalContext } from '../utlis/GlobalContext'
import common from '@ohos.app.ability.common';
import fs from '@ohos.file.fs';

const TAG = '[PhotoModel]';

type FileInfo = {
  prefix: string;
  suffix: string;
};

export default class PhotoModel {
  private phAccessHelper: photoAccessHelper.PhotoAccessHelper = undefined;
  private static photoInstance: PhotoModel = undefined;

  constructor() {
    this.phAccessHelper = photoAccessHelper.getPhotoAccessHelper((GlobalContext.getContext().getValue('cameraContext') as common.UIAbilityContext));
  }

  public static getMediaInstance(): PhotoModel {
    if (this.photoInstance === undefined) {
      this.photoInstance = new PhotoModel();
    }
    return this.photoInstance;
  }

  async createAndGetUri(photoType: photoAccessHelper.PhotoType): Promise<string> {
    Logger.info(TAG, `createAssetDemo`);
    let dateTimeUtil: DateTimeUtil = new DateTimeUtil();
    let info: FileInfo = this.getInfoFromMediaType(photoType);
    let name: string = `${dateTimeUtil.getDate()}_${dateTimeUtil.getTime()}`;
    let displayName: string = `${info.prefix}${name}`;
    try {
      let extension: string = '';
      if (photoType == photoAccessHelper.PhotoType.IMAGE){
        extension = 'jpg';
      }else if(photoType == photoAccessHelper.PhotoType.VIDEO){
        extension = 'mp4';
      }
      Logger.info(TAG, `${displayName}`);
      let options: photoAccessHelper.CreateOptions = {
        title: displayName
      }
      let fileuri: string = await this.phAccessHelper.createAsset(photoType, extension, options);
      Logger.info(TAG, `createAsset uri ${fileuri}`);
      Logger.info(TAG, `createAsset successfully`);
      return fileuri
    } catch (err) {
      Logger.info(TAG, `createAsset failed, message = ${err}`);
    }
  }


  async getFdPath(fileuri: string): Promise<number> {
    let file = fs.openSync(fileuri, fs.OpenMode.READ_WRITE);
    let fd:number = file.fd
    Logger.info(TAG, `fd = ${fd}`);
    return fd;
  }

  getInfoFromMediaType(mediaType: photoAccessHelper.PhotoType): FileInfo {
    let fileInfo: FileInfo = {
      prefix: '',
      suffix: '',
    };
    switch (mediaType) {
      case photoAccessHelper.PhotoType.IMAGE:
        fileInfo.prefix = 'IMG_';
        fileInfo.suffix = '.jpg';
        break;
      case photoAccessHelper.PhotoType.VIDEO:
        fileInfo.prefix = 'VID_';
        fileInfo.suffix = '.mp4';
        break;
    }
    return fileInfo;
  }
}
