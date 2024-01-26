/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 * 
 */
import yolo5snapi from '@ohos.yolo5snapi';
import opencvnapi from '@ohos.opencvnapi';
import promptAction from '@ohos.promptAction';
import image from '@ohos.multimedia.image';
import bundleManager from '@ohos.bundle.bundleManager';
import hilog from '@ohos.hilog';
import fs from '@ohos.file.fs';
import { BusinessError } from '@ohos.base';

let context;
context = getContext(this) as any
let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT;
function  GetRealPath(bundleName:string)
{
  let RealPath = "/data/app/el2/100/base/"+bundleName+"/haps/entry/files"
  return RealPath
}
@Entry
@Component
struct Index {
  @State pixelMap: PixelMap = undefined;
  @State arr: Array<string> =[]
  @State select: string =""
  private bundleName = ""
  private RealPath = ""
  loadimg(path:string){
    image.createImageSource(path).createPixelMap({
      sampleSize: 1,
      rotate: 0,
      editable: false
    }).then((pixelMap) => {
      this.pixelMap = pixelMap;
    })
  }
  aboutToAppear(){
    try {
      bundleManager.getBundleInfoForSelf(bundleFlags).then((data) => {
        hilog.info(0x0000, 'testTag', 'getBundleInfoForSelf successfully. Data: %{public}s', JSON.stringify(data));
        this.bundleName = data.name
        this.RealPath = GetRealPath(this.bundleName)
      }).catch(err => {
        hilog.error(0x0000, 'testTag', 'getBundleInfoForSelf failed. Cause: %{public}s', err.message);
      });
    } catch (err) {
      hilog.error(0x0000, 'testTag', 'getBundleInfoForSelf failed: %{public}s', err.message);
    }
  }

  build() {
    Row() {
      Grid(){
        GridItem() {
          Column(){
            if (undefined != this.pixelMap) {
              Image(this.pixelMap)
                .width("100%")
                .height("100%")
                .objectFit(ImageFit.Fill)
            }
          }
        }
        GridItem() {
          Column(){
            Text("图片文件目录")
              .width("50%")
            ForEach(this.arr.slice(0, 5), (item: number) => {
              Text(`${item} `).fontSize(18)
                .width("50%")
                .onClick(() => {
                  fs.rmdir(context.filesDir+"/out.bmp", (err: BusinessError) => {
                    if (err) {
                      console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                    } else {
                      console.info("Directory deleted");
                    }
                  });
                  this.select = item.toString()
                  this.loadimg(context.filesDir + "/" + this.select)
                })
            }, (item: number) => item.toString())
          }
        }
        GridItem() {
          Column(){
            Button("图片尺寸转换")
              .margin(10)
              .onClick(()=>{
                opencvnapi.opencvWithPromise(context.filesDir,this.select,640,640).then((result) =>{
                  promptAction.showToast({
                    message: result,
                    duration: 3000,
                  });
                });
              })
            Button("点击推理")
              .margin(10)
              .onClick(()=>{
                yolo5snapi.Yolo5sWithPromise(this.RealPath+"/aaa.jpg").then((result) =>{
                  promptAction.showToast({
                    message: result,
                    duration: 3000,
                  });
                  fs.rmdir(context.filesDir+"/aaa.jpg", (err: BusinessError) => {
                    if (err) {
                      console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                    } else {
                      console.info("Directory deleted");
                    }
                  });
                });
              })
            Button("显示结果")
              .margin(10)
              .onClick(()=>{
                this.loadimg(context.filesDir+"/out.bmp")
              })
          }
        }
        GridItem() {
          Column(){
            Text("当前选择的图片:"+this.select)
            Button("查看图片路径文件夹")
              .margin(10)
              .onClick(() => {
                fs.rmdir(context.filesDir+"/out.bmp", (err: BusinessError) => {
                  if (err) {
                    console.info("rmdir failed with error message: " + err.message + ", error code: " + err.code);
                  } else {
                    console.info("Directory deleted");
                  }
                  fs.listFile(context.filesDir).then((filenames) => {
                    console.info("listFile succeed");
                    promptAction.showToast({
                      message: 'listFile succeed',
                      duration: 2000,
                    });
                    for(let i=0;i<filenames.length;i++)
                    {
                      if(filenames[i] != "shader_cache")
                      {
                        this.arr[i] = filenames[i]
                      }
                    }

                  }).catch((err) => {
                    promptAction.showToast({
                      message: "listFile fails,list file failed with error message: " + err.message + ", error code: " + err.code,
                      duration: 2000,
                    });
                    console.info("list file failed with error message: " + err.message + ", error code: " + err.code);
                  });
                });
              })
          }
        }
      }
      .rowsTemplate('1fr 1fr')
      .columnsTemplate('1fr 1fr')
      .columnsGap(25)
      .rowsGap(25)
    }.width('100%').height('100%')
  }
}
