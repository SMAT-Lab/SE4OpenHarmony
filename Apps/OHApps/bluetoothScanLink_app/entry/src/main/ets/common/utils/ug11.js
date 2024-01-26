/*
 * @Author: wangming
 * @Date: 2023-08-30 09:52:59
 * @LastEditors: wangming
 * @LastEditTime: 2023-08-30 10:49:37
 * @FilePath: /uni-sdk-npm/pages/connectDetail/ug11.js
 * @Description:
 */
// ArrayBuffer转16进制字符串示例
function ab2hex(buffer) {
    var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
            return ('00' + bit.toString(16)).slice(-2)
        }
    )
    return hexArr.join('');
}
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function parseData(res) {
    var resValue = ab2hex(res.characteristicValue);
    var startStr = (resValue.substring(0, 4) == "534e" || resValue.substring(0, 4) == "534E");
    var array = Array.prototype.slice.call(new Uint8Array(res.characteristicValue));
    var resObject = {}
    if (array[5] === 4 || array[5] === 14) {
        // 测试检测项目  0是血糖 1是尿酸
        var sendData = {}
        if (array[5] === 4) {
            resObject.code = '04'
        }
        if (array[5] === 14) {
            resObject.code = '0e'
        }
        var year = '20' + array[6]
        var month = formatNumber(array[7])
        var day = formatNumber(array[8])
        var h = formatNumber(array[9])
        var m = formatNumber(array[10])
        var seconds = formatNumber(array[11]);
        var testType = array[14]
        var hight = array[15] & 0xff
        var low = array[16] & 0xff

        if (testType == 0) {
            var result = (Math.round((hight << 8) + low)) / 10;
            if (result < 1.1) {
                result = "L";
            } else if (result > 33.3) {
                result = "H";
            }
            // object.GLU = result;
            resObject.data = {
                data: array,
                str: resValue,
                result: result,
                unit: 'mmol/L',
                formatTime: year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + seconds,
                time: new Date(year + '/' + month + '/' + day + ' ' + h + ':' + m + ':' + seconds).getTime(),
                type: 'GLU'
            }
            sendData = {
                "GLU": {
                    "result": result,
                    "unit": 'mmol/L'
                }
            }
        } else {
            var result = (Math.round((hight << 8) + low));
            if (result < 181) {
                result = "L";
            } else if (result > 1188) {
                result = "H";
            }
            resObject.data = {
                result: result,
                data: array,
                str: resValue,
                unit: 'μmol/L',
                formatTime: year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + seconds,
                time: new Date(year + '/' + month + '/' + day + ' ' + h + ':' + m + ':' + seconds).getTime(),
                type: 'UA'
            }
            sendData = {
                "UA": {
                    "result": result,
                    "unit": 'μmol/L'
                }
            }
        }
        return resObject
    }
}

export default {parseData}