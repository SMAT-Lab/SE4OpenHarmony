let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
export type { IParser } from './src/main/ets/parse/IParser';
export { Lyric } from './src/main/ets/bean/Lyric';
export { LyricLine } from './src/main/ets/bean/LyricLine';
export { LyricParser } from './src/main/ets/parse/LyricParser';
export { LyricView } from './src/main/ets/view/LyricView';
export { LyricController } from './src/main/ets/view/LyricController';
export { LyricHelper } from './src/main/ets/LyricHelper';
