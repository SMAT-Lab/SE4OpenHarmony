// ArrayBuffer转16进制字符串示例
function parseData(res) {
  var array = Array.prototype.slice.call(new Uint8Array(res.characteristicValue));
  if (array[2] == 184) {
    return {
      "bloodMeasureHigh": array[4],
      "bloodMeasureLow": array[5],
      "checkHeartRate": array[6]
    }
  }
}

export default { parseData }