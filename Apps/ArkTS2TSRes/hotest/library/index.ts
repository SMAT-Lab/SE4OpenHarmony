let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
export { MainPage } from './src/main/ets/components/mainpage/MainPage';
