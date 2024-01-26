let __generate__Id: number = 0;
function generateId(): string {
    return "data_" + ++__generate__Id;
}
