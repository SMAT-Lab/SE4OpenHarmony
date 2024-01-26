let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
import localUnitTest from './LocalUnit.test';
export default function testsuite() {
    localUnitTest();
}
