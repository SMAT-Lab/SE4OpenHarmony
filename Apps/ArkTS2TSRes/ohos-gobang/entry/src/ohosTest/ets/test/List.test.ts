let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
import abilityTest from './Ability.test';
export default function testsuite() {
    abilityTest();
}
