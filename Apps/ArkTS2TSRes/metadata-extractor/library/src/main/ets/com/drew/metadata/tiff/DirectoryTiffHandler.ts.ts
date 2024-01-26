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
import RandomAccessReader from '../../lang/RandomAccessReader';
import StringValue from '../StringValue';
import Rational from '../../lang/Rational';
import Metadata from '../Metadata';
import TiffHandler from '../../imaging/tiff/TiffHandler';
import Directory from '../Directory';
import StackUtil from '../../lang/StackUtil';
abstract class DirectoryTiffHandler implements TiffHandler {
    private readonly _directoryStack: StackUtil<Directory> = new StackUtil<Directory>();
    private _rootParentDirectory: Directory;
    protected _currentDirectory: Directory;
    protected readonly _metadata: Metadata;
    constructor(metadata: Metadata, parentDirectory: Directory) {
        this._metadata = metadata;
        this._rootParentDirectory = parentDirectory;
    }
    public abstract setTiffMarker(marker: number): void;
    public abstract tryEnterSubIfd(tagId: number): boolean;
    public abstract hasFollowerIfd(): boolean;
    public abstract tryCustomProcessFormat(tagId: number, formatCode: number, componentCount: number): number;
    public abstract customProcessTag(tagOffset: number, processedIfdOffsets: Set<number>, tiffHeaderOffset: number, reader: RandomAccessReader, tagId: number, byteCount: number): boolean;
    public endingIFD(): void {
        this._currentDirectory = this._directoryStack.empty() ? null : this._directoryStack.pop();
    }
    protected pushDirectory(directoryClass: Directory): void {
        let newDirectory: Directory = directoryClass;
        //        try {
        //            newDirectory = directoryClass.newInstance();
        //        } catch (InstantiationException e) {
        //            throw new RuntimeException(e);
        //        } catch (IllegalAccessException e) {
        //            throw new RuntimeException(e);
        //        }
        // If this is the first directory, don't add to the stack
        if (this._currentDirectory == null) {
            // Apply any pending root parent to this new directory
            if (this._rootParentDirectory != null) {
                newDirectory.setParent(this._rootParentDirectory);
                this._rootParentDirectory = null;
            }
        }
        else {
            // The current directory is pushed onto the stack, and set as the new directory's parent
            this._directoryStack.push(this._currentDirectory);
            newDirectory.setParent(this._currentDirectory);
        }
        this._currentDirectory = newDirectory;
        this._metadata.addDirectory(this._currentDirectory);
    }
    public warn(message: string) {
        this.getCurrentOrErrorDirectory().addError(message);
    }
    public error(message: string) {
        this.getCurrentOrErrorDirectory().addError(message);
    }
    private getCurrentOrErrorDirectory(): Directory {
        //        if (this._currentDirectory != null)
        //            return this._currentDirectory;
        //        ErrorDirectory error = this._metadata.getFirstDirectoryOfType(ErrorDirectory.class);
        //        if (error != null)
        //            return error;
        //        pushDirectory(ErrorDirectory.class);
        return this._currentDirectory;
    }
    public setByteArray(tagId: number, bytes: Int8Array) {
        this._currentDirectory.setByteArray(tagId, bytes);
    }
    public setString(tagId: number, string: StringValue) {
        this._currentDirectory.setStringValue(tagId, string);
    }
    public setRational(tagId: number, rational: Rational) {
        this._currentDirectory.setRational(tagId, rational);
    }
    public setRationalArray(tagId: number, array: Rational[]) {
        this._currentDirectory.setRationalArray(tagId, array);
    }
    public setFloat(tagId: number, float32: number) {
        this._currentDirectory.setFloat(tagId, float32);
    }
    public setFloatArray(tagId: number, array: Int32Array) {
        this._currentDirectory.setFloatArray(tagId, array);
    }
    public setDouble(tagId: number, double64: number) {
        this._currentDirectory.setDouble(tagId, double64);
    }
    public setDoubleArray(tagId: number, array: Int32Array) {
        this._currentDirectory.setDoubleArray(tagId, array);
    }
    public setInt8s(tagId: number, int8s: number) {
        // NOTE Directory stores all integral types as int32s, except for int32u and long
        this._currentDirectory.setInt(tagId, int8s);
    }
    public setInt8sArray(tagId: number, array: Int8Array) {
        // NOTE Directory stores all integral types as int32s, except for int32u and long
        this._currentDirectory.setByteArray(tagId, array);
    }
    public setInt8u(tagId: number, int8u: number) {
        // NOTE Directory stores all integral types as int32s, except for int32u and long
        this._currentDirectory.setInt(tagId, int8u);
    }
    public setInt8uArray(tagId: number, array: Uint8Array) {
        // TODO create and use a proper setter for short[]
        this._currentDirectory.setObjectArray(tagId, array);
    }
    public setInt16s(tagId: number, int16s: number) {
        // TODO create and use a proper setter for int16u?
        this._currentDirectory.setInt(tagId, int16s);
    }
    public setInt16sArray(tagId: number, array: Int16Array) {
        // TODO create and use a proper setter for short[]
        this._currentDirectory.setObjectArray(tagId, array);
    }
    public setInt16u(tagId: number, int16u: number) {
        // TODO create and use a proper setter for
        this._currentDirectory.setInt(tagId, int16u);
    }
    public setInt16uArray(tagId: number, array: Uint16Array) {
        // TODO create and use a proper setter for short[]
        this._currentDirectory.setObjectArray(tagId, array);
    }
    public setInt32s(tagId: number, int32s: number) {
        this._currentDirectory.setInt(tagId, int32s);
    }
    public setInt32sArray(tagId: number, array: Int32Array) {
        this._currentDirectory.setIntArray(tagId, array);
    }
    public setInt32u(tagId: number, int32u: number) {
        this._currentDirectory.setLong(tagId, int32u);
    }
    public setInt32uArray(tagId: number, array: Uint32Array) {
        // TODO create and use a proper setter for short[]
        this._currentDirectory.setObjectArray(tagId, array);
    }
}
export default DirectoryTiffHandler;
