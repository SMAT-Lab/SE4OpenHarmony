interface Index_Params {
    showMessage?: string;
    webViewArray?: WebViewInfo[];
    videoArray?: VideoInfo[];
    webViewIndexMap?: Map<number, number>;
    videoIndexMap?: Map<number, number>;
    workPort?: PortProxy;
    dialogController?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/****************************************************************************
 Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var nativerender = globalThis.requireNapi("cocos", true);
;
import { WorkerManager } from '../cocos/WorkerManager';
import { ContextType } from '../common/Constants';
import { EditBoxDialog } from '../components/EditBoxDialog';
import { CocosWebView, WebViewInfo } from '../components/CocosWebView';
import { CocosVideoPlayer, VideoInfo } from '../components/CocosVideoPlayer';
import { MessageEvent } from '@ohos.worker';
import { PortProxy } from '../common/PortProxy';
const nativePageLifecycle = nativerender.getContext(ContextType.JSPAGE_LIFECYCLE);
const engineUtils = nativerender.getContext(ContextType.ENGINE_UTILS);
interface WorkerMessage {
    type: string;
    data: data;
}
interface data {
    id: string;
    name: string;
    param: number | string | param;
}
interface param {
    tag?: number;
    url?: string;
    contents?: string;
    mimeType?: string;
    encoding?: string;
    baseUrl?: string;
    jsContents?: string;
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    visible?: boolean;
    resourceType?: number;
    time?: number;
    fullScreen?: boolean;
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__showMessage = new ObservedPropertySimple('', this, "showMessage");
        this.__webViewArray = new ObservedPropertyObject([], this, "webViewArray");
        this.__videoArray = new ObservedPropertyObject([], this, "videoArray");
        this.webViewIndexMap = new Map<number, number>();
        this.videoIndexMap = new Map<number, number>();
        this.workPort = new PortProxy(WorkerManager.getInstance().getWorker());
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new EditBoxDialog("5", this, {
                    showMessage: this.showMessage,
                    onTextChange: (msg: string): void => {
                        this.showMessage = msg;
                        this.workPort.postMessage('onTextInput', msg);
                    },
                    accept: (msg: string): void => {
                        this.showMessage = msg;
                        this.workPort.postMessage('onComplete', msg);
                    }
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: (): void => {
                this.workPort.postMessage('onComplete', this.showMessage);
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.showMessage !== undefined) {
            this.showMessage = params.showMessage;
        }
        if (params.webViewArray !== undefined) {
            this.webViewArray = params.webViewArray;
        }
        if (params.videoArray !== undefined) {
            this.videoArray = params.videoArray;
        }
        if (params.webViewIndexMap !== undefined) {
            this.webViewIndexMap = params.webViewIndexMap;
        }
        if (params.videoIndexMap !== undefined) {
            this.videoIndexMap = params.videoIndexMap;
        }
        if (params.workPort !== undefined) {
            this.workPort = params.workPort;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__showMessage.aboutToBeDeleted();
        this.__webViewArray.aboutToBeDeleted();
        this.__videoArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __showMessage: ObservedPropertySimple<string>;
    get showMessage() {
        return this.__showMessage.get();
    }
    set showMessage(newValue: string) {
        this.__showMessage.set(newValue);
    }
    private __webViewArray: ObservedPropertyObject<WebViewInfo[]>;
    get webViewArray() {
        return this.__webViewArray.get();
    }
    set webViewArray(newValue: WebViewInfo[]) {
        this.__webViewArray.set(newValue);
    }
    private __videoArray: ObservedPropertyObject<VideoInfo[]>;
    get videoArray() {
        return this.__videoArray.get();
    }
    set videoArray(newValue: VideoInfo[]) {
        this.__videoArray.set(newValue);
    }
    private webViewIndexMap: Map<number, number>;
    private videoIndexMap: Map<number, number>;
    private workPort: PortProxy;
    private dialogController: CustomDialogController;
    aboutToAppear(): void {
        console.log('[LIFECYCLE-Index] cocos aboutToAppear');
        this.workPort._messageHandle = async (e: MessageEvent<WorkerMessage>): Promise<void> => {
            let data: WorkerMessage = e.data;
            let msg = data.data;
            let result: boolean | string | number | null = null;
            switch (msg.name) {
                // EditBox
                case "showEditBox": {
                    this.showMessage = msg.param as string;
                    this.dialogController.open();
                    break;
                }
                case "hideEditBox": {
                    this.showMessage = '';
                    this.dialogController.close();
                    break;
                }
                // WebView
                case "createWebView": {
                    this.webViewArray.push(new WebViewInfo(0, 0, 0, 0, msg.param as number));
                    this.webViewIndexMap.set(msg.param as number, this.webViewArray.length - 1);
                    break;
                }
                case "removeWebView": {
                    if (this.webViewArray.length > 0) {
                        this.webViewArray.splice(this.webViewIndexMap.get(msg?.param as number) as number, 1);
                    }
                    break;
                }
                case "loadUrl": {
                    let web = msg.param as param;
                    let index = this.webViewIndexMap.get(web?.tag as number) as number;
                    this.webViewArray[index].url = web?.url as string;
                    this.webViewArray[index].controller.loadUrl(web?.url as string);
                    break;
                }
                case "loadHTMLString": {
                    let web = msg.param as param;
                    let index = this.webViewIndexMap.get(web?.tag as number) as number;
                    this.webViewArray[index].controller.loadData(web?.contents as string, "text/html", "UTF-8", web?.baseUrl);
                    break;
                }
                case "loadData": {
                    let web = msg.param as param;
                    let index = this.webViewIndexMap.get(web?.tag as number) as number;
                    this.webViewArray[index].controller.loadData(web?.contents as string, web?.mimeType as string, web?.encoding as string, web?.baseUrl as string);
                    break;
                }
                case "evaluateJS": {
                    let web = msg.param as param;
                    let index = this.webViewIndexMap.get(web?.tag as number) as number;
                    this.webViewArray[index].controller.runJavaScript(web?.jsContents as string);
                    break;
                }
                case "reload": {
                    let index = this.webViewIndexMap.get(msg.param as number) as number;
                    this.webViewArray[index].controller.refresh();
                    break;
                }
                case "stopLoading": {
                    let index = this.webViewIndexMap.get(msg.param as number) as number;
                    this.webViewArray[index].controller.stop();
                    break;
                }
                case "canGoForward": {
                    let index = this.webViewIndexMap.get(msg.param as number) as number;
                    result = this.webViewArray[index].controller.accessForward();
                    break;
                }
                case "canGoBack": {
                    let index = this.webViewIndexMap.get(msg.param as number) as number;
                    result = this.webViewArray[index].controller.accessBackward();
                    break;
                }
                case "goForward": {
                    let index = this.webViewIndexMap.get(msg.param as number) as number;
                    this.webViewArray[index].controller.forward();
                    break;
                }
                case "goBack": {
                    let index = this.webViewIndexMap.get(msg.param as number) as number;
                    this.webViewArray[index].controller.backward();
                    break;
                }
                case "setWebViewRect": {
                    let web = msg.param as param;
                    let index = this.webViewIndexMap.get(web?.tag as number) as number;
                    this.webViewArray[index].x = px2vp(web?.x as number) as number;
                    this.webViewArray[index].y = px2vp(web?.y as number) as number;
                    this.webViewArray[index].w = px2vp(web?.w as number) as number;
                    this.webViewArray[index].h = px2vp(web?.h as number) as number;
                    break;
                }
                case "setVisible": {
                    let web = msg.param as param;
                    let index = this.webViewIndexMap.get(web?.tag as number) as number;
                    this.webViewArray[index].visible = web?.visible as boolean;
                    break;
                }
                // video
                case "createVideo": {
                    this.videoArray.push(new VideoInfo(0, 0, 0, 0, msg.param as number));
                    this.videoIndexMap.set(msg.param as number, this.videoArray.length - 1);
                    break;
                }
                case "removeVideo": {
                    if (this.videoArray.length > 0) {
                        this.videoArray.splice(this.videoIndexMap.get(msg.param as number) as number, 1);
                    }
                    break;
                }
                case "setVideoUrl":
                    let video = msg.param as param;
                    let index = this.videoIndexMap.get(video?.tag as number) as number;
                    let resourceType = video.resourceType;
                    if (resourceType == 1) {
                        this.videoArray[index].url = $rawfile(video.url as string);
                    }
                    else {
                        this.videoArray[index].url = video.url as string;
                    }
                    break;
                case "setVideoRect": {
                    let video = msg.param as param;
                    let index = this.videoIndexMap.get(video?.tag as number) as number;
                    this.videoArray[index].x = px2vp(video?.x as number) as number;
                    this.videoArray[index].y = px2vp(video?.y as number) as number;
                    this.videoArray[index].w = px2vp(video?.w as number) as number;
                    this.videoArray[index].h = px2vp(video?.h as number) as number;
                    break;
                }
                case "startVideo": {
                    let index = this.videoIndexMap.get(msg.param as number) as number;
                    this.videoArray[index].controller.start();
                    break;
                }
                case "pauseVideo": {
                    let index = this.videoIndexMap.get(msg.param as number) as number;
                    this.videoArray[index].controller.pause();
                    break;
                }
                case "stopVideo": {
                    let index = this.videoIndexMap.get(msg.param as number) as number;
                    this.videoArray[index].controller.stop();
                    break;
                }
                case "resumeVideo": {
                    let index = this.videoIndexMap.get(msg.param as number) as number;
                    this.videoArray[index].controller.start();
                    break;
                }
                case "getVideoDuration": {
                    let index = this.videoIndexMap.get(msg.param as number) as number;
                    result = this.videoArray[index].duration;
                    break;
                }
                case "seekVideoTo": {
                    let video = msg.param as param;
                    let index = this.videoIndexMap.get(video?.tag as number) as number;
                    this.videoArray[index].controller.setCurrentTime(video?.time as number, SeekMode.Accurate);
                    break;
                }
                case "setVideoVisible": {
                    let video = msg.param as param;
                    let index = this.videoIndexMap.get(video?.tag as number) as number;
                    this.videoArray[index].visible = video.visible as boolean;
                    break;
                }
                case "setFullScreenEnabled": {
                    let video = msg.param as param;
                    let index = this.videoIndexMap.get(video?.tag as number) as number;
                    this.videoArray[index].isFullScreen = video.fullScreen as boolean;
                    break;
                }
                case "currentTime": {
                    let index = this.videoIndexMap.get(msg.param as number) as number;
                    result = this.videoArray[index].currentTime;
                    break;
                }
                default: {
                }
            }
            if (result != null || result != undefined) {
                this.workPort.postReturnMessage(data, result);
            }
        };
    }
    aboutToDisappear(): void {
        console.log('[LIFECYCLE-Index] cocos aboutToDisappear');
        //  this.cocosWorker.postMessage({type: "JSPageLifecycle", data: "aboutToAppear"});
        //  nativePageLifecycle.aboutToDisappear();
    }
    onPageShow(): void {
        console.log('[LIFECYCLE-Page] cocos onPageShow');
        nativePageLifecycle.onPageShow();
    }
    onPageHide(): void {
        console.log('[LIFECYCLE-Page] cocos onPageHide');
        nativePageLifecycle.onPageHide();
    }
    onBackPress() {
        console.log("[LIFECYCLE-Page] cocos onBackPress");
        this.workPort.postMessage("backPress", "");
        // If disable system exit needed, remove comment "return true"
        // return true;
    }
    render() {
        Flex.create({
            direction: FlexDirection.Column,
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center
        } as FlexOptions);
        Flex.width('100%');
        Flex.height('100%');
        XComponent.create({ id: 'xcomponentId', type: 'surface', libraryname: 'cocos' });
        XComponent.onLoad((context) => {
            // Set the cache directory in the ts layer.
            this.workPort.postMessage("onXCLoad", "XComponent");
        });
        XComponent.onDestroy(() => {
            console.log('cocos onDestroy');
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.webViewArray), (item: WebViewInfo) => {
        }, (item: WebViewInfo): string => item.viewTag.toString());
        ForEach.pop();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.videoArray), (item: VideoInfo) => {
            let earlierCreatedChild_3: CocosVideoPlayer = (this && this.findChildById) ? this.findChildById("3") as CocosVideoPlayer : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new CocosVideoPlayer("3", this, { videoInfo: item, workPort: this.workPort }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    videoInfo: item, workPort: this.workPort
                });
                View.create(earlierCreatedChild_3);
            }
        }, (item: VideoInfo): string => item.viewTag.toString());
        ForEach.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
