/*
 * The MIT License (MIT)
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 */
import fs from '@ohos.file.fs';
export class FileUtils {
    public static openFile(filePath: string) {
        let res = fs.accessSync(filePath);
        if (res) {
            try {
                let stream = fs.createStreamSync(filePath, "w+");
                return stream;
            }
            catch (err) {
                console.error(" Open file failed!" + err);
            }
        }
        return null;
    }
}
