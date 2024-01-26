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
import Directory from './Directory';
/**
 * A top-level object that holds the metadata values extracted from an image.
 * <p>
 * Metadata objects may contain zero or more {@link Directory} objects.  Each directory may contain zero or more tags
 * with corresponding values.
 *
 * @author Drew Noakes https://drewnoakes.com
 */
class Metadata {
    /**
         * The list of {@link Directory} instances in this container, in the order they were added.
         */
    private readonly _directories: Set<Directory> = new Set<Directory>();
    /**
         * Returns an iterable set of the {@link Directory} instances contained in this metadata collection.
         *
         * @return an iterable set of directories
         */
    public getDirectories(): Set<Directory> {
        return this._directories;
    }
    public getDirectoriesOfType(classType: Directory): Set<Directory> {
        let directories: Set<Directory> = new Set<Directory>();
        for (let i = 0; i < this._directories.size; i++) {
            //            if (type.isAssignableFrom(dir.getClass())) {
            //                directories.add((T)dir);
            //            }
            if (this._directories.has(classType))
                directories.add(classType);
        }
        return directories;
    }
    /**
         * Returns the count of directories in this metadata collection.
         *
         * @return the number of unique directory types set for this metadata collection
         */
    public getDirectoryCount(): number {
        return this._directories.size;
    }
    /**
         * Adds a directory to this metadata collection.
         *
         * @param directory the {@link Directory} to add into this metadata collection.
         */
    public addDirectory(directory: Directory): void {
        this._directories.add(directory);
    }
    /**
         * Gets the first {@link Directory} of the specified type contained within this metadata collection.
         * If no instances of this type are present, <code>null</code> is returned.
         *
         * @param type the Directory type
         * @param <T> the Directory type
         * @return the first Directory of type T in this metadata collection, or <code>null</code> if none exist
         */
    public getFirstDirectoryOfType(classType: Directory): Directory {
        for (let i = 0; i < this._directories.size; i++) {
            if (this._directories.has(classType))
                return classType;
        }
        return null;
    }
    /**
         * Indicates whether an instance of the given directory type exists in this Metadata instance.
         *
         * @param type the {@link Directory} type
         * @return <code>true</code> if a {@link Directory} of the specified type exists, otherwise <code>false</code>
         */
    public containsDirectoryOfType(classType: Directory): boolean {
        for (let i = 0; i < this._directories.size; i++) {
            if (this._directories.has(classType))
                return true;
        }
        return false;
    }
    /**
         * Indicates whether any errors were reported during the reading of metadata values.
         * This value will be true if Directory.hasErrors() is true for one of the contained {@link Directory} objects.
         *
         * @return whether one of the contained directories has an error
         */
    public hasErrors(): boolean {
        for (let directory of this.getDirectories()) {
            if (directory.hasErrors())
                return true;
        }
        return false;
    }
    public toString(): string {
        let count = this.getDirectoryCount();
        return 'Metadata (' + count + (count == 1 ? 'directory' : 'directories') + ')';
    }
}
export default Metadata;
