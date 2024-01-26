import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import pako from  'pako'

export function loadSamples(basename, resid, callback) {
  const result = {};
   globalThis.Ctx.resourceManager.getMediaContent(resid).then((uint8)=>{
    result[basename] = uint8;
    callback(result)
  })
}


export  function testInflate(samples, inflateOptions, deflateOptions) {
  let name, data, deflated, inflated;

  // inflate options have windowBits = 0 to force autodetect window size
  //
  for (name in samples) {
    if (!samples.hasOwnProperty(name)) continue;
    data = samples[name];

    deflated = pako.deflate(data, deflateOptions);
    inflated = pako.inflate(deflated, inflateOptions);

    // assert.deepStrictEqual(inflated, data);
    expect(inflated).assertDeepEquals(data)
  }
}

