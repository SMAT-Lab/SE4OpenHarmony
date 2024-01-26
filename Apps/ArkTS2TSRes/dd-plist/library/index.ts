let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
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
export { default as ASCIIPropertyListParser } from './src/main/ets/components/plist/ASCIIPropertyListParser';
export { default as Base64 } from './src/main/ets/components/plist/Base64';
export { default as BinaryPropertyListParser } from './src/main/ets/components/plist/BinaryPropertyListParser';
export { default as BinaryPropertyListWriter } from './src/main/ets/components/plist/BinaryPropertyListWriter';
export { default as NSArray } from './src/main/ets/components/plist/NSArray';
export { default as NSData } from './src/main/ets/components/plist/NSData';
export { default as NSDate } from './src/main/ets/components/plist/NSDate';
export { default as NSDictionary } from './src/main/ets/components/plist/NSDictionary';
export { default as NSNumber } from './src/main/ets/components/plist/NSNumber';
export { default as NSObject } from './src/main/ets/components/plist/NSObject';
export { default as NSSet } from './src/main/ets/components/plist/NSSet';
export { default as NSString } from './src/main/ets/components/plist/NSString';
export { default as PropertyListFormatException } from './src/main/ets/components/plist/PropertyListFormatException';
export { default as PropertyListParser } from './src/main/ets/components/plist/PropertyListParser';
export { default as UID } from './src/main/ets/components/plist/UID';
export { default as XMLNode } from './src/main/ets/components/plist/XMLNode';
export { default as XMLPropertyListParser } from './src/main/ets/components/plist/XMLPropertyListParser';
export { default as ArrayUtils } from './src/main/ets/components/utils/ArrayUtils';
export { default as DateUtils } from './src/main/ets/components/utils/DateUtils';
export { default as HexUtils } from './src/main/ets/components/utils/HexUtils';
export { default as NumUtils } from './src/main/ets/components/utils/NumUtils';
export { default as StringCharacterIterator } from './src/main/ets/components/utils/StringCharacterIterator';
export { default as TextUtils } from './src/main/ets/components/utils/TextUtils';
