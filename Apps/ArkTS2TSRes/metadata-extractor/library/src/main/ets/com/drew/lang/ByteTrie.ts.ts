/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import ByteTrieNode from './ByteTrieNode';
/**
 * Stores values using a prefix tree (aka 'trie', i.e. reTRIEval data structure).
 *
 * @param <T> the type of value to store for byte sequences
 */
class ByteTrie<T> {
    public _root: ByteTrieNode<T> = new ByteTrieNode();
    public _maxDepth: number;
    constructor() {
        this._maxDepth = 0;
    }
    //    /**
    //     * Return the most specific value stored for this byte sequence.
    //     * If not found, returns <code>null</code> or a default values as specified by
    //     * calling {@link ByteTrie#setDefaultValue}.
    //     */
    //    public find(bytes:Int8Array):T
    //    {
    //        return find(bytes, 0, bytes.length);
    //    }
    //
    /**
     * Return the most specific value stored for this byte sequence.
     * If not found, returns <code>null</code> or a default values as specified by
     * calling {@link ByteTrie#setDefaultValue}.
     */
    public find(bytes: Int8Array, offset?: number, count?: number): T {
        if (offset == null) {
            offset = 0;
        }
        if (count == null) {
            count = bytes.length;
        }
        let maxIndex = offset + count;
        if (maxIndex > bytes.length)
            throw new Error();
        let node: ByteTrieNode<T> = this._root;
        let value = node._value;
        for (let i = offset; i < maxIndex; i++) {
            let b = bytes[i];
            let child: ByteTrieNode<T> = node._children.get(b);
            if (child == null)
                break;
            node = child;
            if (node._value != null)
                value = node._value;
        }
        return value;
    }
    /** Store the given value at the specified path. */
    public addPath(value: T, ...parts: Int8Array[]): ByteTrie<T> {
        let depth = 0;
        let node: ByteTrieNode<T> = this._root;
        for (let part of parts) {
            for (let b of part) {
                let child: ByteTrieNode<T> = node._children.get(b);
                if (child == null) {
                    child = new ByteTrieNode<T>();
                    node._children.set(b, child);
                }
                node = child;
                depth++;
            }
        }
        if (depth == 0)
            throw new Error("Parts must contain at least one byte.");
        node.setValue(value);
        this._maxDepth = Math.max(this._maxDepth, depth);
        return this;
    }
    /** Sets the default value to use in {@link ByteTrie#find(byte[])} when no path matches. */
    public setDefaultValue(defaultValue: T): ByteTrie<T> {
        this._root.setValue(defaultValue);
        return this;
    }
    /** Gets the maximum depth stored in this trie. */
    public getMaxDepth(): number {
        return this._maxDepth;
    }
}
export default ByteTrie;
