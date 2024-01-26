/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 */
// import { deepStrictEqual } from "assert";
// import { decodeAsync, encode, decodeArrayStream } from "@msgpack/msgpack";
// import { ReadableStream as PonyReadableStream } from "web-streams-polyfill/ponyfill";
// const isReadableStreamConstructorAvailable: boolean = (() => {
//   try {
//     // Edge <= 18 has ReadableStream but its constructor is not available
//     new ReadableStream({
//       start() {},
//     });
//     return true;
//   } catch {
//     return false;
//   }
// })();
//
// const MyReadableStream = isReadableStreamConstructorAvailable ? ReadableStream : PonyReadableStream;
//
// // Downgrade stream not to implement AsyncIterable<T>
// function downgradeReadableStream(stream: ReadableStream | PonyReadableStream) {
//   (stream as any)[Symbol.asyncIterator] = undefined;
// }
//
// describe("whatwg streams", () => {
//   it("decodeArrayStream", async () => {
//     const data = [1, 2, 3];
//     const encoded = encode(data);
//     const stream = new MyReadableStream({
//       start(controller) {
//         for (const byte of encoded) {
//           controller.enqueue([byte]);
//         }
//         controller.close();
//       },
//     });
//     downgradeReadableStream(stream);
//
//     const items: Array<unknown> = [];
//     for await (const item of decodeArrayStream(stream)) {
//       items.push(item);
//     }
//     deepStrictEqual(items, data);
//   });
//
//   it("decodeAsync", async () => {
//     const data = [1, 2, 3];
//     const encoded = encode(data);
//     const stream = new MyReadableStream({
//       start(controller) {
//         for (const byte of encoded) {
//           controller.enqueue([byte]);
//         }
//         controller.close();
//       },
//     });
//     downgradeReadableStream(stream);
//
//     deepStrictEqual(await decodeAsync(stream), data);
//   });
// });
