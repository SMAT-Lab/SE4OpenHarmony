import media from '@ohos.multimedia.media';
export class AVPlayerHelper {
    private constructor() {
        media.createAVPlayer((error, video) => {
            if (video != null) {
                this.avPlayer = video;
                console.error(`createAVPlayer success `);
                this.setAVPlayerStateChange(null);
            }
            else {
                console.error(`createAVPlayer fail, error message:${error.message}`);
            }
        });
    }
    public static instance: AVPlayerHelper = new AVPlayerHelper();
    private avPlayer;
    setAVPlayerStateChange(callback: AVPlayerStateCallback) {
        if (this.avPlayer != undefined) {
            this.avPlayer.on('stateChange', async (state, reason) => {
                switch (state) {
                    case 'idle':
                        console.error('state idle called');
                        break;
                    case 'initialized':
                        console.error('initialized prepared called');
                        this.avPlayer.prepare();
                        break;
                    case 'prepared':
                        console.error('state prepared called');
                        this.avPlayer.play();
                        break;
                    case 'playing':
                        console.error('state playing called');
                        break;
                    case 'paused':
                        console.error('state paused called');
                        break;
                    case 'completed':
                        console.error('state completed called');
                        this.avPlayer.reset();
                        break;
                    case 'stopped':
                        console.error('state stopped called');
                        break;
                    case 'released':
                        console.error('state released called');
                        break;
                    case 'error':
                        console.error('state error called');
                        this.avPlayer.reset();
                        break;
                    default:
                        console.info('unkown state :' + state);
                        break;
                }
                if (callback) {
                    callback(state);
                }
            });
        }
    }
    playWithUrl(url: string, callback: AVPlayerStateCallback) {
        if (this.avPlayer) {
            this.resetAVPlayer();
            this.setAVPlayerStateChange(callback);
            this.avPlayer.url = url;
            console.error("开始播放--> " + url);
        }
    }
    resetAVPlayer() {
        if (this.avPlayer) {
            this.avPlayer.reset();
        }
    }
}
export interface AVPlayerStateCallback {
    (state: string): void;
}
