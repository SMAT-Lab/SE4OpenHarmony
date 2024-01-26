/* Copyright 2023 Unionman Technology Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
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
    var resValue = ab2hex(res.value)
    var array = Array.prototype.slice.call(new Uint8Array(res.characteristicValue));
    var info = {}
    switch (array[2]) {
        case 177:
            info.code = 'b1'
            info.msg = '开始测量'
            break;
        case 178:
            info.code = 'b2'
            info.msg = '停止测量';
            break;
        case 179:
            info.code = 'b3'
            info.msg = '正在归零'
            break;
        case 180:
            info.code = 'b4'
            info.msg = '归零结束'
            break;
        case 181:
            info.code = 'b5'
            info.msg = '电量'
            break;
        case 183:
            info.code = 'b7'
            info.msg = '过程数据'
            break;
        case 184:
            info.code = '04'
            info.msg = '测量数据'
            break;
        case 185:
            info.code = 'b9'
            info.msg = '测量错误'
            break;
        case 186:
            info.code = 'ba'
            info.msg = '关机'
            break;
        case 187:
            info.code = 'bb'
            info.msg = '低电量'
            break;
    }
    if (info.code) {
        var testResult = {}
        if (info.code === '04') {
            //            testResult = {
            //                type: 'BP'
            //            }
            //            info.code = ''
            testResult = {
                "bloodMeasureHigh": array[4],
                "bloodMeasureLow": array[5],
                "checkHeartRate": array[6]
            }
            info.data = testResult
        }
        if (info.code === 'bd') {
            info.code = ''
            testResult.time = '20' + formatNumber(array[3]) + '/' + formatNumber(array[4]) + '/' + formatNumber(array[5])
        }
        if (info.code === 'be') {
            // testResult
            let moment = formatNumber(array[3]) + ':' + formatNumber(array[4]) + ':' + '00'
            testResult.formatTime = testResult.time + ' ' + moment
            testResult.formatTime = testResult.formatTime.replace(/\//g, '-')
            testResult.time = new Date().getTime(testResult.time + ' ' + moment)
            // return testResult
            info.data = testResult
            info.code = '04'
        }
        if (info.code === 'b7') {
            info.data = {
                "bloodMeasureHigh": array[4],
                "bloodMeasureLow": array[5],
                "checkHeartRate": array[6]
            }
        }
        if (info.code === 'b9') {
            info.data = {
                //                result: codeSwitch.errCodeNf(array[3])
            }
        }
        if (info.code === 'b5') {
            info.data = {
                result: array[3]
            }
        }

        if (info.code) {
            return info
        }
    }
}

export default {
    parseData
}