// @ts-nocheck
import { CRLF } from './constant.js';
import { Buffer } from '../polyfill/buffer';
/**
 * @param {import('stream').Stream} stream
 */
export function stream2String(stream) {
  let startTime1 = new Date().getTime();
  return new Promise((resolve, reject) => {
    let buffer = Buffer.concat([]);
    let {length: len} = buffer;
    stream.on('data', (_buffer) => {
      len += _buffer.length;
      buffer = Buffer.concat([buffer, _buffer], len);
    });
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(buffer.toString()));
    let endTime1 = new Date().getTime();
    let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
    console.log("stream2String averageTime : " + averageTime1 + "us")
  });
}

/**
 * @param {string} str
 * @returns {string[][]}
 */
export function listify(str) {
  let startTime1 = new Date().getTime();
  let result = str.split(CRLF)
    .filter(Boolean)
    .map((line) => line.split(' '));
  let endTime1 = new Date().getTime();
  let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
  console.log("listify averageTime : " + averageTime1 + "us")
  return result;
}
