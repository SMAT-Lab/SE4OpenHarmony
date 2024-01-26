let __generate__Id: number = 0;
function generateId(): string {
    return "HeaderConstant_" + ++__generate__Id;
}
export class HeaderConstant {
    static readonly TEXT_INFORMATION: string = '歌单';
    static readonly TEXT_FONTSIZE: number = 20;
    static readonly TEXT_FONTWEIGHT: number = FontWeight.Bold;
    static readonly IMAGE_WIDTH: number = 20;
    static readonly IMAGE_HEIGHT: number = 20;
    static readonly ROW_SPACE: number = 10;
    static readonly ROW_WIDTH: string = '100%';
    static readonly ROW_PADDING: number = 10;
    static readonly SYSCAP_ETHERNET: string = 'SystemCapability.Multimedia.Audio.Device';
    static readonly AUDIO_DEVICE_SERVICE: string = '音频设备管理';
    static readonly TOAST_DURATION: number = 2000;
    static readonly SYSCAP_AUDIO_RENDER: string = 'SystemCapability.Multimedia.Audio.Renderer';
    static readonly AUDIO_RENDER: string = '音频输出能力';
}
