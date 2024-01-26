let __generate__Id: number = 0;
function generateId(): string {
    return "CommonConstants_" + ++__generate__Id;
}
export const PREFERENCES_NAME = 'MseaPreferences';
export const MESSAGE_DURATION = 3000;
export const HTTP_TIMEOUT = 10000;
// percent
export const PERCENT_100 = '100%';
