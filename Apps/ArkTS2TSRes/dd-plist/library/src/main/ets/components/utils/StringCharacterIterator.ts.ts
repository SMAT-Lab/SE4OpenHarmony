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
class StringCharacterIterator {
    private s: string;
    private currentIndex = 0;
    constructor(s: string) {
        this.s = s;
    }
    current(): string {
        return this.s.charAt(this.currentIndex);
    }
    getIndex(): number {
        return this.currentIndex;
    }
    getEndIndex(): number {
        return this.s.length - 1;
    }
    next(): string {
        this.currentIndex += 1;
        return this.s.charAt(this.currentIndex);
    }
}
export default StringCharacterIterator;
