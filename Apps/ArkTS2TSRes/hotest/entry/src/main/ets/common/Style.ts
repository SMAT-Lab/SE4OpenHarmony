let __generate__Id: number = 0;
function generateId(): string {
    return "Style_" + ++__generate__Id;
}
