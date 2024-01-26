function buf2hex (buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}
function parseData(res) {
    var array = buf2hex(res.characteristicValue);
    var testValue1=array.substr(18,2),testValue2=array.substr(20,2);
    var testValue3='0x'+testValue2+testValue1;
    //保留1位小数
    testValue3=parseInt(parseInt(testValue3)/10)/10;
    return testValue3
}

export default { parseData }