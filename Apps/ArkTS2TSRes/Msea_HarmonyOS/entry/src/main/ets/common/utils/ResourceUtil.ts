let __generate__Id: number = 0;
function generateId(): string {
    return "ResourceUtil_" + ++__generate__Id;
}
export function getResourceText(resource: Resource) {
    return getContext(this).resourceManager.getStringSync(resource);
}
