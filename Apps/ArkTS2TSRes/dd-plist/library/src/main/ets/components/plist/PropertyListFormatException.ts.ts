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
/**
 * A PropertyListFormatException is thrown by the various property list format parsers
 * when an error in the format of the given property list is encountered.
 */
class PropertyListFormatException extends Error {
    /**
         * Creates a new exception with the given message.
         * @param message A message containing information about the nature of the exception.
         */
    public constructor(message: string) {
        super(message);
    }
}
export default PropertyListFormatException;
