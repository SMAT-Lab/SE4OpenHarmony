/**
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http?://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export class ValOptions {
    validator?: string;
    args?: Array<string | Date | invalidObjType1 | invalidObjType2 | Array<string | argsObjType1 | argsObjType2 | argsObjType3> | number | boolean | valArgsObject | RegExp | undefined | null>;
    valid?: Array<string | Date>;
    invalid?: Array<string | Date | number | null | undefined | invalidObjType1 | invalidObjType2>;
    error?: Array<string | number | {} | [
    ] | null | undefined>;
}
export interface valArgsObject {
    domain_specific_validation?: boolean;
    allow_utf8_local_part?: boolean;
    allow_display_name?: boolean;
    require_display_name?: boolean;
    allow_ip_domain?: boolean;
    blacklisted_chars?: string;
    ignore_max_length?: boolean;
    host_blacklist?: Array<string | RegExp>;
    host_whitelist?: Array<string | RegExp>;
    protocols?: string[];
    require_host?: boolean;
    require_tld?: boolean;
    require_valid_protocol?: boolean;
    allow_underscores?: boolean;
    allow_trailing_dot?: boolean;
    allow_protocol_relative_urls?: boolean;
    allow_fragments?: boolean;
    allow_query_components?: boolean;
    require_protocol?: boolean;
    disallow_auth?: boolean;
    validate_length?: boolean;
    require_port?: boolean;
    eui?: string;
    no_separators?: boolean;
    allow_numeric_tld?: boolean;
    allow_wildcard?: boolean;
    ignore?: string | RegExp | number;
    no_symbols?: boolean;
    locale?: string | string[];
    force_decimal?: boolean;
    decimal_digits?: string;
    allow_hyphens?: boolean;
    allow_leading_zeroes?: boolean;
    min?: number;
    max?: number;
    gt?: number;
    lt?: number;
    ignore_whitespace?: boolean;
    ignoreCase?: boolean;
    minOccurrences?: number;
    foo?: number;
    bar?: number;
    foobar?: number;
    1?: number;
    2?: number;
    3?: number;
    provider?: string;
    case_sensitive?: boolean;
    require_hyphen?: boolean;
    allow_primitives?: boolean;
    crockford?: boolean;
    urlSafe?: boolean;
    strictMode?: boolean;
    allow_decimal?: boolean;
    require_decimal?: boolean;
    digits_after_decimal?: number[];
    require_symbol?: boolean;
    symbol?: string;
    negative_sign_before_digits?: boolean;
    negative_sign_after_digits?: boolean;
    allow_negatives?: boolean;
    thousands_separator?: string;
    decimal_separator?: string;
    allow_negative_sign_placeholder?: boolean;
    allow_space_after_symbol?: boolean;
    symbol_after_digits?: boolean;
    allow_space_after_digits?: boolean;
    parens_for_negatives?: boolean;
    loose?: boolean;
    strict?: boolean;
    strictSeparator?: boolean;
    checkDMS?: boolean;
    minLength?: number;
    minLowercase?: number;
    minUppercase?: number;
    minNumbers?: number;
    minSymbols?: number;
    format?: string;
    delimiters?: string[];
    hourFormat?: string;
    mode?: string;
    version?: number | string;
    comparisonDate?: string;
}
interface invalidObjType1 {
    toString?: () => string;
}
interface invalidObjType2 {
    year?: number;
    month?: number;
    day?: number;
}
interface argsObjType1 {
    toString?: string;
}
interface argsObjType3 {
    foo?: string;
}
interface argsObjType2 {
    (): number;
}
export interface fixturesType {
    locale?: string | string[];
    valid?: string[];
    invalid?: string[];
    local?: string;
}
