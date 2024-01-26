let __generate__Id: number = 0;
function generateId(): string {
    return "test_" + ++__generate__Id;
}
