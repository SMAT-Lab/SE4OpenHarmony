/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
@Entry
@Component
struct Index {
  //  @State newVersionActionText: Resource = '已经是最新版本';
  @State dotTextPlay: boolean = false;
  //  @State newVersionStatus: string = NewVersionStatus.NO_NEW_VERSION;
  @StorageProp('updateStatus')
  private updateStatus: number = AppStorage.Get('updateStatus');
  //  private videoController: VideoController = new VideoController();
  private actionCallBack: Array<() => void> = [];
  @State private buttonText: string = '';
  //  @State updaterManagement: UpdaterManagement = new UpdaterManagement();

  aboutToAppear() {
    //    this.updaterManagement.onInit();
  }

  build() {
    Column() {
      //      TitleBar()

      Image($r('app.media.logo'))
        .height('30%')
        .width('70%')
        .objectFit(ImageFit.Contain)

      Column() {
        Row({ space: 40 }) {
          Progress({ value: 10, type: ProgressType.Linear }).width('70%')
        }
      }
    }
    .width('100%')
  }
}