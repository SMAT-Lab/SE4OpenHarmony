import UIAbility from '@ohos.app.ability.UIAbility';
import hilog from '@ohos.hilog';
import Logger from '../util/Logger';
export default class EntryAbility extends UIAbility {
    onCreate(want, launchParam) {
        Logger.info('testTag', '%{public}s', 'Ability onCreate');
    }
    onDestroy() {
        Logger.info('testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage) {
        // Main window is created, set main page for this ability
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/Index', (err, data) => {
            var _a, _b;
            if (err.code) {
                Logger.error('testTag', 'Failed to load the content. Cause: %{public}s', (_a = JSON.stringify(err)) !== null && _a !== void 0 ? _a : '');
                return;
            }
            Logger.info('testTag', 'Succeeded in loading the content. Data: %{public}s', (_b = JSON.stringify(data)) !== null && _b !== void 0 ? _b : '');
        });
    }
    onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        Logger.info('testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        // Ability has brought to foreground
        Logger.info('testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground() {
        // Ability has back to background
        Logger.info('testTag', '%{public}s', 'Ability onBackground');
    }
    customFun() {
        return "custom";
    }
}
//# sourceMappingURL=EntryAbility.js.map