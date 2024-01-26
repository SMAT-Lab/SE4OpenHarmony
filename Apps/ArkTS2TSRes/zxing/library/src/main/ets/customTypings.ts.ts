/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
/**
 * This file contains some types to make our
 * lifes easier when copy and pasting Java code.
 * With it we can keep int, float, etc., references
 * in code to keep as close as possible as the Java version
 * but without the need to sacrifice ourselves with boring
 * and annoying things.
 */
// numeric formats
export declare type byte = number;
export declare type short = number;
export declare type int = number;
export declare type long = bigint;
export declare type float = number;
// special formats
export type char = number;
// list formats
export type List<T> = Array<T>;
export type Collection<T> = Array<T>;
export type Deque<T> = Array<T>;
