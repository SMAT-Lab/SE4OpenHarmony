// @ts-nocheck
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//=====================draft3============================
// import draft3Color from '../tests/draft3/optional/format/color.json'
// import draft3Date from '../tests/draft3/optional/format/date.json'
// import draft3DateTime from '../tests/draft3/optional/format/date-time.json'
// import draft3Email from '../tests/draft3/optional/format/email.json'
// import draft3HostName from '../tests/draft3/optional/format/host-name.json'
// import draft3IpAddress from '../tests/draft3/optional/format/ip-address.json'
// import draft3DateIpv6 from '../tests/draft3/optional/format/ipv6.json'
// import draft3Regex from '../tests/draft3/optional/format/regex.json'
// import draft3Time from '../tests/draft3/optional/format/time.json'
// import draft3Uri from '../tests/draft3/optional/format/uri.json'
// import draft3Bignum from '../tests/draft3/optional/bignum.json'
// import draft3EcmascriptRegex from '../tests/draft3/optional/ecmascript-regex.json'
import draft3NonBmpRegex from '../tests/draft3/optional/non-bmp-regex.json'
// import draft3ZeroTerminatedFloats from '../tests/draft3/optional/zeroTerminatedFloats.json'
import draft3AdditionalItems from '../tests/draft3/additionalItems.json'
import draft3AdditionalProperties from '../tests/draft3/additionalProperties.json'
import draft3Default from '../tests/draft3/default.json'
import draft3Dependencies from '../tests/draft3/dependencies.json'
import draft3Disallow from '../tests/draft3/disallow.json'
import draft3DivisibleBy from '../tests/draft3/divisibleBy.json'
import draft3Enum from '../tests/draft3/enum.json'
import draft3Extends from '../tests/draft3/extends.json'
import draft3Format from '../tests/draft3/format.json'
import draft3InfiniteLoopDetection from '../tests/draft3/infinite-loop-detection.json'
import draft3Items from '../tests/draft3/items.json'
import draft3Maximum from '../tests/draft3/maximum.json'
import draft3MaxItems from '../tests/draft3/maxItems.json'
import draft3MaxLength from '../tests/draft3/maxLength.json'
import draft3Minimum from '../tests/draft3/minimum.json'
import draft3MinItems from '../tests/draft3/minItems.json'
import draft3MinLength from '../tests/draft3/minLength.json'
import draft3Pattern from '../tests/draft3/pattern.json'
import draft3PatternProperties from '../tests/draft3/patternProperties.json'
import draft3Properties from '../tests/draft3/properties.json'
import draft3Ref from '../tests/draft3/ref.json'
// import draft3RefRemote from '../tests/draft3/refRemote.json'
import draft3Required from '../tests/draft3/required.json'
import draft3Type from '../tests/draft3/type.json'
import draft3UniqueItems from '../tests/draft3/uniqueItems.json'

//=====================draft4============================
// import draft4DateTime from '../tests/draft4/optional/format/date-time.json'
// import draft4Email from '../tests/draft4/optional/format/email.json'
// import draft4HostName from '../tests/draft4/optional/format/hostname.json'
// import draft4Ipv4 from '../tests/draft4/optional/format/ipv4.json'
// import draft4DateIpv6 from '../tests/draft4/optional/format/ipv6.json'
// import draft4unknown from '../tests/draft4/optional/format/unknown.json'
// import draft4Uri from '../tests/draft4/optional/format/uri.json'
// import draft4Bignum from '../tests/draft4/optional/bignum.json'
// import draft4EcmascriptRegex from '../tests/draft4/optional/ecmascript-regex.json'
import draft4FloatOverflow from '../tests/draft4/optional/float-overflow.json'
import draft4NonBmpRegex from '../tests/draft4/optional/non-bmp-regex.json'
// import draft4ZeroTerminatedFloats from '../tests/draft4/optional/zeroTerminatedFloats.json'
import draft4AdditionalItems from '../tests/draft4/additionalItems.json'
import draft4AdditionalProperties from '../tests/draft4/additionalProperties.json'
import draft4AllOf from '../tests/draft4/allOf.json'
import draft4AnyOf from '../tests/draft4/anyOf.json'
import draft4Default from '../tests/draft4/default.json'
import draft4Definitions from '../tests/draft4/definitions.json'
import draft4Dependencies from '../tests/draft4/dependencies.json'
import draft4Enum from '../tests/draft4/enum.json'
import draft4Format from '../tests/draft4/format.json'
import draft4Id from '../tests/draft4/id.json'
import draft4InfiniteLoopDetection from '../tests/draft4/infinite-loop-detection.json'
import draft4Items from '../tests/draft4/items.json'
import draft4Maximum from '../tests/draft4/maximum.json'
import draft4MaxItems from '../tests/draft4/maxItems.json'
import draft4MaxLength from '../tests/draft4/maxLength.json'
import draft4MaxProperties from '../tests/draft4/maxProperties.json'
import draft4Minimum from '../tests/draft4/minimum.json'
import draft4MinItems from '../tests/draft4/minItems.json'
import draft4MinLength from '../tests/draft4/minLength.json'
import draft4MinProperties from '../tests/draft4/minProperties.json'
import draft4MultipleOf from '../tests/draft4/multipleOf.json'
import draft4Not from '../tests/draft4/not.json'
import draft4OneOf from '../tests/draft4/oneOf.json'
import draft4Pattern from '../tests/draft4/pattern.json'
import draft4PatternProperties from '../tests/draft4/patternProperties.json'
import draft4Properties from '../tests/draft4/properties.json'
import draft4Ref from '../tests/draft4/ref.json'
// import draft4RefRemote from '../tests/draft4/refRemote.json'
import draft4Required from '../tests/draft4/required.json'
import draft4Type from '../tests/draft4/type.json'
import draft4UniqueItems from '../tests/draft4/uniqueItems.json'

//=====================draft6============================
// import draft6DateTime from '../tests/draft6/optional/format/date-time.json'
// import draft6Email from '../tests/draft6/optional/format/email.json'
// import draft6HostName from '../tests/draft6/optional/format/hostname.json'
// import draft6Ipv4 from '../tests/draft6/optional/format/ipv4.json'
// import draft6DateIpv6 from '../tests/draft6/optional/format/ipv6.json'
// import draft6JsonPointer from '../tests/draft6/optional/format/json-pointer.json'
// import draft6unknown from '../tests/draft6/optional/format/unknown.json'
// import draft6Uri from '../tests/draft6/optional/format/uri.json'
// import draft6UriReference from '../tests/draft6/optional/format/uri-reference.json'
// import draft6UriTemplate from '../tests/draft6/optional/format/uri-template.json'
// import draft6Bignum from '../tests/draft6/optional/bignum.json'
// import draft6EcmascriptRegex from '../tests/draft6/optional/ecmascript-regex.json'
import draft6FloatOverflow from '../tests/draft6/optional/float-overflow.json'
import draft6NonBmpRegex from '../tests/draft6/optional/non-bmp-regex.json'
import draft6AdditionalItems from '../tests/draft6/additionalItems.json'
import draft6AdditionalProperties from '../tests/draft6/additionalProperties.json'
import draft6AllOf from '../tests/draft6/allOf.json'
import draft6AnyOf from '../tests/draft6/anyOf.json'
import draft6BooleanSchema from '../tests/draft6/boolean_schema.json'
import draft6Const from '../tests/draft6/const.json'
import draft6Contains from '../tests/draft6/contains.json'
import draft6Default from '../tests/draft6/default.json'
import draft6Definitions from '../tests/draft6/definitions.json'
import draft6Dependencies from '../tests/draft6/dependencies.json'
import draft6Enum from '../tests/draft6/enum.json'
import draft6ExclusiveMaximum from '../tests/draft6/exclusiveMaximum.json'
import draft6ExclusiveMinimum from '../tests/draft6/exclusiveMinimum.json'
import draft6Format from '../tests/draft6/format.json'
import draft6Id from '../tests/draft6/id.json'
import draft6InfiniteLoopDetection from '../tests/draft6/infinite-loop-detection.json'
import draft6Items from '../tests/draft6/items.json'
import draft6Maximum from '../tests/draft6/maximum.json'
import draft6MaxItems from '../tests/draft6/maxItems.json'
import draft6MaxLength from '../tests/draft6/maxLength.json'
import draft6MaxProperties from '../tests/draft6/maxProperties.json'
import draft6Minimum from '../tests/draft6/minimum.json'
import draft6MinItems from '../tests/draft6/minItems.json'
import draft6MinLength from '../tests/draft6/minLength.json'
import draft6MinProperties from '../tests/draft6/minProperties.json'
import draft6MultipleOf from '../tests/draft6/multipleOf.json'
import draft6Not from '../tests/draft6/not.json'
import draft6OneOf from '../tests/draft6/oneOf.json'
import draft6Pattern from '../tests/draft6/pattern.json'
import draft6PatternProperties from '../tests/draft6/patternProperties.json'
import draft6Properties from '../tests/draft6/properties.json'
import draft6PropertyNames from '../tests/draft6/propertyNames.json'
import draft6Ref from '../tests/draft6/ref.json'
// import draft6RefRemote from '../tests/draft6/refRemote.json'
import draft6Required from '../tests/draft6/required.json'
import draft6Type from '../tests/draft6/type.json'
import draft6UniqueItems from '../tests/draft6/uniqueItems.json'
import draft6UnknownKeyword from '../tests/draft6/unknownKeyword.json'

//=====================draft7============================
// import draft7Date from '../tests/draft7/optional/format/date.json'
// import draft7DateTime from '../tests/draft7/optional/format/date-time.json'
// import draft7Email from '../tests/draft7/optional/format/email.json'
// import draft7HostName from '../tests/draft7/optional/format/hostname.json'
// import draft7IdnEmail from '../tests/draft7/optional/format/idn-email.json'
// import draft7Ipv4 from '../tests/draft7/optional/format/ipv4.json'
// import draft7DateIpv6 from '../tests/draft7/optional/format/ipv6.json'
// import draft7DateIri from '../tests/draft7/optional/format/iri.json'
// import draft7DateIriReference from '../tests/draft7/optional/format/iri-reference.json'
// import draft7JsonPointer from '../tests/draft7/optional/format/json-pointer.json'
// import draft7JsonRegex from '../tests/draft7/optional/format/regex.json'
// import draft7JsonRelativeJsonPointer from '../tests/draft7/optional/format/relative-json-pointer.json'
// import draft7JsonTime from '../tests/draft7/optional/format/time.json'
// import draft7unknown from '../tests/draft7/optional/format/unknown.json'
// import draft7Uri from '../tests/draft7/optional/format/uri.json'
import draft7UriReference from '../tests/draft7/optional/format/uri-reference.json'
// import draft7UriTemplate from '../tests/draft7/optional/format/uri-template.json'
// import draft7Bignum from '../tests/draft7/optional/bignum.json'
// import draft7Content from '../tests/draft7/optional/content.json'
import draft7CrossDraft from '../tests/draft7/optional/cross-draft.json'
// import draft7EcmascriptRegex from '../tests/draft7/optional/ecmascript-regex.json'
import draft7FloatOverflow from '../tests/draft7/optional/float-overflow.json'
import draft7NonBmpRegex from '../tests/draft7/optional/non-bmp-regex.json'
import draft7AdditionalItems from '../tests/draft7/additionalItems.json'
import draft7AdditionalProperties from '../tests/draft7/additionalProperties.json'
import draft7AllOf from '../tests/draft7/allOf.json'
import draft7AnyOf from '../tests/draft7/anyOf.json'
import draft7BooleanSchema from '../tests/draft7/boolean_schema.json'
import draft7Const from '../tests/draft7/const.json'
import draft7Contains from '../tests/draft7/contains.json'
import draft7Default from '../tests/draft7/default.json'
import draft7Definitions from '../tests/draft7/definitions.json'
import draft7Dependencies from '../tests/draft7/dependencies.json'
import draft7Enum from '../tests/draft7/enum.json'
import draft7ExclusiveMaximum from '../tests/draft7/exclusiveMaximum.json'
import draft7ExclusiveMinimum from '../tests/draft7/exclusiveMinimum.json'
import draft7Format from '../tests/draft7/format.json'
import draft7Id from '../tests/draft7/id.json'
import draft7IfThenElse from '../tests/draft7/if-then-else.json'
import draft7InfiniteLoopDetection from '../tests/draft7/infinite-loop-detection.json'
import draft7Items from '../tests/draft7/items.json'
import draft7Maximum from '../tests/draft7/maximum.json'
import draft7MaxItems from '../tests/draft7/maxItems.json'
import draft7MaxLength from '../tests/draft7/maxLength.json'
import draft7MaxProperties from '../tests/draft7/maxProperties.json'
import draft7Minimum from '../tests/draft7/minimum.json'
import draft7MinItems from '../tests/draft7/minItems.json'
import draft7MinLength from '../tests/draft7/minLength.json'
import draft7MinProperties from '../tests/draft7/minProperties.json'
import draft7MultipleOf from '../tests/draft7/multipleOf.json'
import draft7Not from '../tests/draft7/not.json'
import draft7OneOf from '../tests/draft7/oneOf.json'
import draft7Pattern from '../tests/draft7/pattern.json'
import draft7PatternProperties from '../tests/draft7/patternProperties.json'
import draft7Properties from '../tests/draft7/properties.json'
import draft7PropertyNames from '../tests/draft7/propertyNames.json'
import draft7Ref from '../tests/draft7/ref.json'
// import draft7RefRemote from '../tests/draft7/refRemote.json'
import draft7Required from '../tests/draft7/required.json'
import draft7Type from '../tests/draft7/type.json'
import draft7UniqueItems from '../tests/draft7/uniqueItems.json'
import draft7UnknownKeyword from '../tests/draft7/unknownKeyword.json'

//=====================draft2019-09============================
/*import draft201909Date from '../tests/draft2019-09/optional/format/date.json'
import draft201909DateTime from '../tests/draft2019-09/optional/format/date-time.json'
import draft201909Duration from '../tests/draft2019-09/optional/format/duration.json'
import draft201909Email from '../tests/draft2019-09/optional/format/email.json'
import draft201909HostName from '../tests/draft2019-09/optional/format/hostname.json'
import draft201909IdnEmail from '../tests/draft2019-09/optional/format/idn-email.json'
import draft201909IdnHostname from '../tests/draft2019-09/optional/format/idn-hostname.json'
import draft201909Ipv4 from '../tests/draft2019-09/optional/format/ipv4.json'
import draft201909DateIpv6 from '../tests/draft2019-09/optional/format/ipv6.json'
import draft201909DateIri from '../tests/draft2019-09/optional/format/iri.json'
import draft201909DateIriReference from '../tests/draft2019-09/optional/format/iri-reference.json'
import draft201909JsonPointer from '../tests/draft2019-09/optional/format/json-pointer.json'
import draft201909JsonRegex from '../tests/draft2019-09/optional/format/regex.json'
import draft201909JsonRelativeJsonPointer from '../tests/draft2019-09/optional/format/relative-json-pointer.json'
import draft201909JsonTime from '../tests/draft2019-09/optional/format/time.json'
import draft201909unknown from '../tests/draft2019-09/optional/format/unknown.json'
import draft201909Uri from '../tests/draft2019-09/optional/format/uri.json'
import draft201909UriReference from '../tests/draft2019-09/optional/format/uri-reference.json'
import draft201909UriTemplate from '../tests/draft2019-09/optional/format/uri-template.json'
import draft201909Uuid from '../tests/draft2019-09/optional/format/uuid.json'
import draft201909Bignum from '../tests/draft2019-09/optional/bignum.json'
import draft201909CrossDraft from '../tests/draft2019-09/optional/cross-draft.json'
import draft201909DependenciesCompatibility from '../tests/draft2019-09/optional/dependencies-compatibility.json'
import draft201909EcmascriptRegex from '../tests/draft2019-09/optional/ecmascript-regex.json'
import draft201909FloatOverflow from '../tests/draft2019-09/optional/float-overflow.json'
import draft201909NoSchema from '../tests/draft2019-09/optional/no-schema.json'
import draft201909NonBmpRegex from '../tests/draft2019-09/optional/non-bmp-regex.json'
import draft201909RefOfUnknownKeyword from '../tests/draft2019-09/optional/refOfUnknownKeyword.json'
import draft201909AdditionalItems from '../tests/draft2019-09/additionalItems.json'
import draft201909AdditionalProperties from '../tests/draft2019-09/additionalProperties.json'
import draft201909AllOf from '../tests/draft2019-09/allOf.json'
import draft201909Anchor from '../tests/draft2019-09/anchor.json'
import draft201909AnyOf from '../tests/draft2019-09/anyOf.json'
import draft201909BooleanSchema from '../tests/draft2019-09/boolean_schema.json'
import draft201909Const from '../tests/draft2019-09/const.json'
import draft201909Contains from '../tests/draft2019-09/contains.json'
import draft201909Content from '../tests/draft2019-09/content.json'
import draft201909Default from '../tests/draft2019-09/default.json'
import draft201909Defs from '../tests/draft2019-09/defs.json'
import draft201909DependentRequired from '../tests/draft2019-09/dependentRequired.json'
import draft201909DependentSchemas from '../tests/draft2019-09/dependentSchemas.json'
import draft201909Enum from '../tests/draft2019-09/enum.json'
import draft201909ExclusiveMaximum from '../tests/draft2019-09/exclusiveMaximum.json'
import draft201909ExclusiveMinimum from '../tests/draft2019-09/exclusiveMinimum.json'
import draft201909Format from '../tests/draft2019-09/format.json'
import draft201909Id from '../tests/draft2019-09/id.json'
import draft201909IfThenElse from '../tests/draft2019-09/if-then-else.json'
import draft201909InfiniteLoopDetection from '../tests/draft2019-09/infinite-loop-detection.json'
import draft201909Items from '../tests/draft2019-09/items.json'
import draft201909MaxContains from '../tests/draft2019-09/maxContains.json'
import draft201909Maximum from '../tests/draft2019-09/maximum.json'
import draft201909MaxItems from '../tests/draft2019-09/maxItems.json'
import draft201909MaxLength from '../tests/draft2019-09/maxLength.json'
import draft201909MaxProperties from '../tests/draft2019-09/maxProperties.json'
import draft201909MinContains from '../tests/draft2019-09/minContains.json'
import draft201909Minimum from '../tests/draft2019-09/minimum.json'
import draft201909MinItems from '../tests/draft2019-09/minItems.json'
import draft201909MinLength from '../tests/draft2019-09/minLength.json'
import draft201909MinProperties from '../tests/draft2019-09/minProperties.json'
import draft201909MultipleOf from '../tests/draft2019-09/multipleOf.json'
import draft201909Not from '../tests/draft2019-09/not.json'
import draft201909OneOf from '../tests/draft2019-09/oneOf.json'
import draft201909Pattern from '../tests/draft2019-09/pattern.json'
import draft201909PatternProperties from '../tests/draft2019-09/patternProperties.json'
import draft201909Properties from '../tests/draft2019-09/properties.json'
import draft201909PropertyNames from '../tests/draft2019-09/propertyNames.json'
import draft201909RecursiveRef from '../tests/draft2019-09/recursiveRef.json'
import draft201909Ref from '../tests/draft2019-09/ref.json'
import draft201909RefRemote from '../tests/draft2019-09/refRemote.json'
import draft201909Required from '../tests/draft2019-09/required.json'
import draft201909Type from '../tests/draft2019-09/type.json'
import draft201909UnevaluatedItems from '../tests/draft2019-09/unevaluatedItems.json'
import draft201909UnevaluatedProperties from '../tests/draft2019-09/unevaluatedProperties.json'
import draft201909UniqueItems from '../tests/draft2019-09/uniqueItems.json'
import draft201909UnknownKeyword from '../tests/draft2019-09/unknownKeyword.json'
import draft201909Vocabulary from '../tests/draft2019-09/vocabulary.json'

//=====================draft2020-12============================
import draft202012Date from '../tests/draft2020-12/optional/format/date.json'
import draft202012DateTime from '../tests/draft2020-12/optional/format/date-time.json'
import draft202012Duration from '../tests/draft2020-12/optional/format/duration.json'
import draft202012Email from '../tests/draft2020-12/optional/format/email.json'
import draft202012HostName from '../tests/draft2020-12/optional/format/hostname.json'
import draft202012IdnEmail from '../tests/draft2020-12/optional/format/idn-email.json'
import draft202012IdnHostname from '../tests/draft2020-12/optional/format/idn-hostname.json'
import draft202012Ipv4 from '../tests/draft2020-12/optional/format/ipv4.json'
import draft202012DateIpv6 from '../tests/draft2020-12/optional/format/ipv6.json'
import draft202012DateIri from '../tests/draft2020-12/optional/format/iri.json'
import draft202012DateIriReference from '../tests/draft2020-12/optional/format/iri-reference.json'
import draft202012JsonPointer from '../tests/draft2020-12/optional/format/json-pointer.json'
import draft202012JsonRegex from '../tests/draft2020-12/optional/format/regex.json'
import draft202012JsonRelativeJsonPointer from '../tests/draft2020-12/optional/format/relative-json-pointer.json'
import draft202012JsonTime from '../tests/draft2020-12/optional/format/time.json'
import draft202012unknown from '../tests/draft2020-12/optional/format/unknown.json'
import draft202012Uri from '../tests/draft2020-12/optional/format/uri.json'
import draft202012UriReference from '../tests/draft2020-12/optional/format/uri-reference.json'
import draft202012UriTemplate from '../tests/draft2020-12/optional/format/uri-template.json'
import draft202012Uuid from '../tests/draft2020-12/optional/format/uuid.json'
import draft202012Bignum from '../tests/draft2020-12/optional/bignum.json'
import draft202012CrossDraft from '../tests/draft2020-12/optional/cross-draft.json'
import draft202012DependenciesCompatibility from '../tests/draft2020-12/optional/dependencies-compatibility.json'
import draft202012EcmascriptRegex from '../tests/draft2020-12/optional/ecmascript-regex.json'
import draft202012FloatOverflow from '../tests/draft2020-12/optional/float-overflow.json'
import draft202012FormatAssertion from '../tests/draft2020-12/optional/format-assertion.json'
import draft202012NoSchema from '../tests/draft2020-12/optional/no-schema.json'
import draft202012NonBmpRegex from '../tests/draft2020-12/optional/non-bmp-regex.json'
import draft202012RefOfUnknownKeyword from '../tests/draft2020-12/optional/refOfUnknownKeyword.json'
import draft202012AdditionalProperties from '../tests/draft2020-12/additionalProperties.json'
import draft202012AllOf from '../tests/draft2020-12/allOf.json'
import draft202012Anchor from '../tests/draft2020-12/anchor.json'
import draft202012AnyOf from '../tests/draft2020-12/anyOf.json'
import draft202012BooleanSchema from '../tests/draft2020-12/boolean_schema.json'
import draft202012Const from '../tests/draft2020-12/const.json'
import draft202012Contains from '../tests/draft2020-12/contains.json'
import draft202012Content from '../tests/draft2020-12/content.json'
import draft202012Default from '../tests/draft2020-12/default.json'
import draft202012Defs from '../tests/draft2020-12/defs.json'
import draft202012DependentRequired from '../tests/draft2020-12/dependentRequired.json'
import draft202012DependentSchemas from '../tests/draft2020-12/dependentSchemas.json'
import draft202012DynamicRef from '../tests/draft2020-12/dynamicRef.json'
import draft202012Enum from '../tests/draft2020-12/enum.json'
import draft202012ExclusiveMaximum from '../tests/draft2020-12/exclusiveMaximum.json'
import draft202012ExclusiveMinimum from '../tests/draft2020-12/exclusiveMinimum.json'
import draft202012Format from '../tests/draft2020-12/format.json'
import draft202012Id from '../tests/draft2020-12/id.json'
import draft202012IfThenElse from '../tests/draft2020-12/if-then-else.json'
import draft202012InfiniteLoopDetection from '../tests/draft2020-12/infinite-loop-detection.json'
import draft202012Items from '../tests/draft2020-12/items.json'
import draft202012MaxContains from '../tests/draft2020-12/maxContains.json'
import draft202012Maximum from '../tests/draft2020-12/maximum.json'
import draft202012MaxItems from '../tests/draft2020-12/maxItems.json'
import draft202012MaxLength from '../tests/draft2020-12/maxLength.json'
import draft202012MaxProperties from '../tests/draft2020-12/maxProperties.json'
import draft202012MinContains from '../tests/draft2020-12/minContains.json'
import draft202012Minimum from '../tests/draft2020-12/minimum.json'
import draft202012MinItems from '../tests/draft2020-12/minItems.json'
import draft202012MinLength from '../tests/draft2020-12/minLength.json'
import draft202012MinProperties from '../tests/draft2020-12/minProperties.json'
import draft202012MultipleOf from '../tests/draft2020-12/multipleOf.json'
import draft202012Not from '../tests/draft2020-12/not.json'
import draft202012OneOf from '../tests/draft2020-12/oneOf.json'
import draft202012Pattern from '../tests/draft2020-12/pattern.json'
import draft202012PatternProperties from '../tests/draft2020-12/patternProperties.json'
import draft202012PrefixItems from '../tests/draft2020-12/prefixItems.json'
import draft202012Properties from '../tests/draft2020-12/properties.json'
import draft202012PropertyNames from '../tests/draft2020-12/propertyNames.json'
import draft202012Ref from '../tests/draft2020-12/ref.json'
import draft202012RefRemote from '../tests/draft2020-12/refRemote.json'
import draft202012Required from '../tests/draft2020-12/required.json'
import draft202012Type from '../tests/draft2020-12/type.json'
import draft202012UnevaluatedItems from '../tests/draft2020-12/unevaluatedItems.json'
import draft202012UnevaluatedProperties from '../tests/draft2020-12/unevaluatedProperties.json'
import draft202012UniqueItems from '../tests/draft2020-12/uniqueItems.json'
import draft202012UnknownKeyword from '../tests/draft2020-12/unknownKeyword.json'
import draft202012Vocabulary from '../tests/draft2020-12/vocabulary.json'

//=====================draft-next============================
import draftNextDate from '../tests/draft-next/optional/format/date.json'
import draftNextDateTime from '../tests/draft-next/optional/format/date-time.json'
import draftNextDuration from '../tests/draft-next/optional/format/duration.json'
import draftNextEmail from '../tests/draft-next/optional/format/email.json'
import draftNextHostName from '../tests/draft-next/optional/format/hostname.json'
import draftNextIdnEmail from '../tests/draft-next/optional/format/idn-email.json'
import draftNextIdnHostname from '../tests/draft-next/optional/format/idn-hostname.json'
import draftNextIpv4 from '../tests/draft-next/optional/format/ipv4.json'
import draftNextDateIpv6 from '../tests/draft-next/optional/format/ipv6.json'
import draftNextDateIri from '../tests/draft-next/optional/format/iri.json'
import draftNextDateIriReference from '../tests/draft-next/optional/format/iri-reference.json'
import draftNextJsonPointer from '../tests/draft-next/optional/format/json-pointer.json'
import draftNextJsonRegex from '../tests/draft-next/optional/format/regex.json'
import draftNextJsonRelativeJsonPointer from '../tests/draft-next/optional/format/relative-json-pointer.json'
import draftNextJsonTime from '../tests/draft-next/optional/format/time.json'
import draftNextUri from '../tests/draft-next/optional/format/uri.json'
import draftNextUriReference from '../tests/draft-next/optional/format/uri-reference.json'
import draftNextUriTemplate from '../tests/draft-next/optional/format/uri-template.json'
import draftNextUuid from '../tests/draft-next/optional/format/uuid.json'
import draftNextBignum from '../tests/draft-next/optional/bignum.json'
import draftNextDependenciesCompatibility from '../tests/draft-next/optional/dependencies-compatibility.json'
import draftNextEcmascriptRegex from '../tests/draft-next/optional/ecmascript-regex.json'
import draftNextFloatOverflow from '../tests/draft-next/optional/float-overflow.json'
import draftNextFormatAssertion from '../tests/draft-next/optional/format-assertion.json'
import draftNextNonBmpRegex from '../tests/draft-next/optional/non-bmp-regex.json'
import draftNextRefOfUnknownKeyword from '../tests/draft-next/optional/refOfUnknownKeyword.json'
import draftNextAdditionalProperties from '../tests/draft-next/additionalProperties.json'
import draftNextAllOf from '../tests/draft-next/allOf.json'
import draftNextAnchor from '../tests/draft-next/anchor.json'
import draftNextAnyOf from '../tests/draft-next/anyOf.json'
import draftNextBooleanSchema from '../tests/draft-next/boolean_schema.json'
import draftNextConst from '../tests/draft-next/const.json'
import draftNextContains from '../tests/draft-next/contains.json'
import draftNextContent from '../tests/draft-next/content.json'
import draftNextDefault from '../tests/draft-next/default.json'
import draftNextDefs from '../tests/draft-next/defs.json'
import draftNextDependentRequired from '../tests/draft-next/dependentRequired.json'
import draftNextDependentSchemas from '../tests/draft-next/dependentSchemas.json'
import draftNextDynamicRef from '../tests/draft-next/dynamicRef.json'
import draftNextEnum from '../tests/draft-next/enum.json'
import draftNextExclusiveMaximum from '../tests/draft-next/exclusiveMaximum.json'
import draftNextExclusiveMinimum from '../tests/draft-next/exclusiveMinimum.json'
import draftNextFormat from '../tests/draft-next/format.json'
import draftNextId from '../tests/draft-next/id.json'
import draftNextIfThenElse from '../tests/draft-next/if-then-else.json'
import draftNextInfiniteLoopDetection from '../tests/draft-next/infinite-loop-detection.json'
import draftNextItems from '../tests/draft-next/items.json'
import draftNextMaxContains from '../tests/draft-next/maxContains.json'
import draftNextMaximum from '../tests/draft-next/maximum.json'
import draftNextMaxItems from '../tests/draft-next/maxItems.json'
import draftNextMaxLength from '../tests/draft-next/maxLength.json'
import draftNextMaxProperties from '../tests/draft-next/maxProperties.json'
import draftNextMinContains from '../tests/draft-next/minContains.json'
import draftNextMinimum from '../tests/draft-next/minimum.json'
import draftNextMinItems from '../tests/draft-next/minItems.json'
import draftNextMinLength from '../tests/draft-next/minLength.json'
import draftNextMinProperties from '../tests/draft-next/minProperties.json'
import draftNextMultipleOf from '../tests/draft-next/multipleOf.json'
import draftNextNot from '../tests/draft-next/not.json'
import draftNextOneOf from '../tests/draft-next/oneOf.json'
import draftNextPattern from '../tests/draft-next/pattern.json'
import draftNextPatternProperties from '../tests/draft-next/patternProperties.json'
import draftNextPrefixItems from '../tests/draft-next/prefixItems.json'
import draftNextProperties from '../tests/draft-next/properties.json'
import draftNextPropertyNames from '../tests/draft-next/propertyNames.json'
import draftNextRef from '../tests/draft-next/ref.json'
import draftNextRefRemote from '../tests/draft-next/refRemote.json'
import draftNextRequired from '../tests/draft-next/required.json'
import draftNextType from '../tests/draft-next/type.json'
import draftNextUnevaluatedItems from '../tests/draft-next/unevaluatedItems.json'
import draftNextUnevaluatedProperties from '../tests/draft-next/unevaluatedProperties.json'
import draftNextUniqueItems from '../tests/draft-next/uniqueItems.json'
import draftNextUnknownKeyword from '../tests/draft-next/unknownKeyword.json'
import draftNextVocabulary from '../tests/draft-next/vocabulary.json'*/
import ArrayList from '@ohos.util.ArrayList'

// 根据原库规则
// 1.需排除draft3、draft4、draft6、draft7这几个文件夹里面optional/format子文件夹里面的json文件，
// 2.需排除基础路径+optional的文件夹名字，基础路径+format的文件夹名字，以免被当做文件名
// 3.需排除文件名为zeroTerminatedFloats.json，refRemote.json，ecmascript-regex.json，content.json，bignum.json，jsregex.json的文件
// 4.需添加draft7/optional/format/uri-reference.json
// 排除之后最终同原库一样共测试138个json文件
let paths = [
  "draft3",
  "draft3/optional",
  "draft4",
  "draft4/optional",
  "draft6",
  "draft6/optional",
  "draft7",
  "draft7/optional",
];

let ignoredFiles = [
  "optional", // 用于排除基础路径+optional的文件夹，避免当做文件 例如文件名不是 ../tests/draft-next/optional而是../tests/draft-next/optional/bignum.json
  "format", // 用于排除基础路径+format，避免当做文件 例如文件名不是 ../tests/draft-next/optional/format而是../tests/draft-next/optional/format/date.json
  "zeroTerminatedFloats.json",
  "refRemote.json",
  "ecmascript-regex.json",
  "content.json",
  "bignum.json",
  "jsregex.json",
];
// suiteFiles.push("draft7/optional/format/uri-reference.json");

export default class JsonFileArray {
  public static loadAllJsonFiles(): ArrayList<object> {
    const list = new ArrayList<object>(); // 38 + 42 + 52 + 61 + 75 + 76 + 73
    /* list.add({
       'belongTo': 'draft3/color',
       'data': draft3Color
     });
     list.add({
       'belongTo': 'draft3/date',
       'data': draft3Date
     });
     list.add({
       'belongTo': 'draft3/date-time',
       'data': draft3DateTime
     });
     list.add({
       'belongTo': 'draft3/email',
       'data': draft3Email
     });
     list.add({
       'belongTo': 'draft3/host-name',
       'data': draft3HostName
     });
     list.add({
       'belongTo': 'draft3/ip-address',
       'data': draft3IpAddress
     });
     list.add({
       'belongTo': 'draft3/ipv6',
       'data': draft3DateIpv6
     });
     list.add({
       'belongTo': 'draft3/regex',
       'data': draft3Regex
     });
     list.add({
       'belongTo': 'draft3/time',
       'data': draft3Time
     });
     list.add({
       'belongTo': 'draft3/uri',
       'data': draft3Uri
     });
     list.add({
       'belongTo': 'draft3/bignum',
       'data': draft3Bignum
     });
     list.add({
       'belongTo': 'draft3/ecmascript-regex',
       'data': draft3EcmascriptRegex
     });*/
    list.add({
      'belongTo': 'draft3/non-bmp-regex',
      'data': draft3NonBmpRegex
    });
    // list.add({
    //   'belongTo': 'draft3/zeroTerminatedFloats',
    //   'data': draft3ZeroTerminatedFloats
    // });
    list.add({
      'belongTo': 'draft3/additionalItems',
      'data': draft3AdditionalItems
    });
    list.add({
      'belongTo': 'draft3/additionalProperties',
      'data': draft3AdditionalProperties
    });
    list.add({
      'belongTo': 'draft3/default',
      'data': draft3Default
    });
    list.add({
      'belongTo': 'draft3/dependencies',
      'data': draft3Dependencies
    });
    list.add({
      'belongTo': 'draft3/disallow',
      'data': draft3Disallow
    });
    list.add({
      'belongTo': 'draft3/divisibleBy',
      'data': draft3DivisibleBy
    });
    list.add({
      'belongTo': 'draft3/enum',
      'data': draft3Enum
    });
    list.add({
      'belongTo': 'draft3/extends',
      'data': draft3Extends
    });
    list.add({
      'belongTo': 'draft3/format',
      'data': draft3Format
    });
    list.add({
      'belongTo': 'draft3/infinite-loop-detection',
      'data': draft3InfiniteLoopDetection
    });
    list.add({
      'belongTo': 'draft3/items',
      'data': draft3Items
    });
    list.add({
      'belongTo': 'draft3/maximum',
      'data': draft3Maximum
    });
    list.add({
      'belongTo': 'draft3/maxItems',
      'data': draft3MaxItems
    });
    list.add({
      'belongTo': 'draft3/maxLength',
      'data': draft3MaxLength
    });
    list.add({
      'belongTo': 'draft3/minimum',
      'data': draft3Minimum
    });
    list.add({
      'belongTo': 'draft3/minItems',
      'data': draft3MinItems
    });
    list.add({
      'belongTo': 'draft3/minLength',
      'data': draft3MinLength
    });
    list.add({
      'belongTo': 'draft3/pattern',
      'data': draft3Pattern
    });
    list.add({
      'belongTo': 'draft3/patternProperties',
      'data': draft3PatternProperties
    });
    list.add({
      'belongTo': 'draft3/properties',
      'data': draft3Properties
    });
    list.add({
      'belongTo': 'draft3/ref',
      'data': draft3Ref
    });
    // list.add({
    //   'belongTo': 'draft3/refRemote',
    //   'data': draft3RefRemote
    // });
    list.add({
      'belongTo': 'draft3/required',
      'data': draft3Required
    });
    list.add({
      'belongTo': 'draft3/type',
      'data': draft3Type
    });
    list.add({
      'belongTo': 'draft3/uniqueItems',
      'data': draft3UniqueItems
    });

    /*   list.add({
         'belongTo': 'draft4/date-time',
         'data': draft4DateTime
       });
       list.add({
         'belongTo': 'draft4/email',
         'data': draft4Email
       });
       list.add({
         'belongTo': 'draft4/hostname',
         'data': draft4HostName
       });
       list.add({
         'belongTo': 'draft4/ipv4',
         'data': draft4Ipv4
       });
       list.add({
         'belongTo': 'draft4/ipv6',
         'data': draft4DateIpv6
       });
       list.add({
         'belongTo': 'draft4/unknown',
         'data': draft4unknown
       });
       list.add({
         'belongTo': 'draft4/uri',
         'data': draft4Uri
       });
       list.add({
         'belongTo': 'draft4/bignum',
         'data': draft4Bignum
       });
       list.add({
         'belongTo': 'draft4/ecmascript-regex',
         'data': draft4EcmascriptRegex
       });*/
    list.add({
      'belongTo': 'draft4/float-overflow',
      'data': draft4FloatOverflow
    });
    list.add({
      'belongTo': 'draft4/non-bmp-regex',
      'data': draft4NonBmpRegex
    });
    // list.add({
    //   'belongTo': 'draft4/zeroTerminatedFloats',
    //   'data': draft4ZeroTerminatedFloats
    // });
    list.add({
      'belongTo': 'draft4/additionalItems',
      'data': draft4AdditionalItems
    });
    list.add({
      'belongTo': 'draft4/additionalProperties',
      'data': draft4AdditionalProperties
    });
    list.add({
      'belongTo': 'draft4/allOf',
      'data': draft4AllOf
    });
    list.add({
      'belongTo': 'draft4/anyOf',
      'data': draft4AnyOf
    });
    list.add({
      'belongTo': 'draft4/default',
      'data': draft4Default
    });
    list.add({
      'belongTo': 'draft4/definitions',
      'data': draft4Definitions
    });
    list.add({
      'belongTo': 'draft4/dependencies',
      'data': draft4Dependencies
    });
    list.add({
      'belongTo': 'draft4/enum',
      'data': draft4Enum
    });
    list.add({
      'belongTo': 'draft4/format',
      'data': draft4Format
    });
    list.add({
      'belongTo': 'draft4/id',
      'data': draft4Id
    });
    list.add({
      'belongTo': 'draft4/infinite-loop-detection',
      'data': draft4InfiniteLoopDetection
    });
    list.add({
      'belongTo': 'draft4/items',
      'data': draft4Items
    });
    list.add({
      'belongTo': 'draft4/maximum',
      'data': draft4Maximum
    });
    list.add({
      'belongTo': 'draft4/maxItems',
      'data': draft4MaxItems
    });
    list.add({
      'belongTo': 'draft4/maxLength',
      'data': draft4MaxLength
    });
    list.add({
      'belongTo': 'draft4/maxProperties',
      'data': draft4MaxProperties
    });
    list.add({
      'belongTo': 'draft4/minimum',
      'data': draft4Minimum
    });
    list.add({
      'belongTo': 'draft4/minItems',
      'data': draft4MinItems
    });
    list.add({
      'belongTo': 'draft4/minLength',
      'data': draft4MinLength
    });
    list.add({
      'belongTo': 'draft4/minProperties',
      'data': draft4MinProperties
    });
    list.add({
      'belongTo': 'draft4/multipleOf',
      'data': draft4MultipleOf
    });
    list.add({
      'belongTo': 'draft4/not',
      'data': draft4Not
    });
    list.add({
      'belongTo': 'draft4/oneOf',
      'data': draft4OneOf
    });
    list.add({
      'belongTo': 'draft4/pattern',
      'data': draft4Pattern
    });
    list.add({
      'belongTo': 'draft4/patternProperties',
      'data': draft4PatternProperties
    });
    list.add({
      'belongTo': 'draft4/properties',
      'data': draft4Properties
    });
    list.add({
      'belongTo': 'draft4/ref',
      'data': draft4Ref
    });
    // list.add({
    //   'belongTo': 'draft4/refRemote',
    //   'data': draft4RefRemote
    // });
    list.add({
      'belongTo': 'draft4/required',
      'data': draft4Required
    });
    list.add({
      'belongTo': 'draft4/type',
      'data': draft4Type
    });
    list.add({
      'belongTo': 'draft4/uniqueItems',
      'data': draft4UniqueItems
    });

    /*  list.add({
        'belongTo': 'draft6/date-time',
        'data': draft6DateTime
      });
      list.add({
        'belongTo': 'draft6/email',
        'data': draft6Email
      });
      list.add({
        'belongTo': 'draft6/hostname',
        'data': draft6HostName
      });
      list.add({
        'belongTo': 'draft6/ipv4',
        'data': draft6Ipv4
      });
      list.add({
        'belongTo': 'draft6/ipv6',
        'data': draft6DateIpv6
      });
      list.add({
        'belongTo': 'draft6/json-pointer',
        'data': draft6JsonPointer
      });
      list.add({
        'belongTo': 'draft6/unknown',
        'data': draft6unknown
      });
      list.add({
        'belongTo': 'draft6/uri',
        'data': draft6Uri
      });
      list.add({
        'belongTo': 'draft6/uri-reference',
        'data': draft6UriReference
      });
      list.add({
        'belongTo': 'draft6/uri-template',
        'data': draft6UriTemplate
      });
      list.add({
        'belongTo': 'draft6/bignum',
        'data': draft6Bignum
      });
      list.add({
        'belongTo': 'draft6/ecmascript-regex',
        'data': draft6EcmascriptRegex
      });*/
    list.add({
      'belongTo': 'draft6/float-overflow',
      'data': draft6FloatOverflow
    });
    list.add({
      'belongTo': 'draft6/non-bmp-regex',
      'data': draft6NonBmpRegex
    });
    list.add({
      'belongTo': 'draft6/additionalItems',
      'data': draft6AdditionalItems
    });
    list.add({
      'belongTo': 'draft6/additionalProperties',
      'data': draft6AdditionalProperties
    });
    list.add({
      'belongTo': 'draft6/allOf',
      'data': draft6AllOf
    });
    list.add({
      'belongTo': 'draft6/anyOf',
      'data': draft6AnyOf
    });
    list.add({
      'belongTo': 'draft6/boolean_schema',
      'data': draft6BooleanSchema
    });
    list.add({
      'belongTo': 'draft6/const',
      'data': draft6Const
    });
    list.add({
      'belongTo': 'draft6/contains',
      'data': draft6Contains
    });
    list.add({
      'belongTo': 'draft6/default',
      'data': draft6Default
    });
    list.add({
      'belongTo': 'draft6/definitions',
      'data': draft6Definitions
    });
    list.add({
      'belongTo': 'draft6/dependencies',
      'data': draft6Dependencies
    });
    list.add({
      'belongTo': 'draft6/enum',
      'data': draft6Enum
    });
    list.add({
      'belongTo': 'draft6/exclusiveMaximum',
      'data': draft6ExclusiveMaximum
    });
    list.add({
      'belongTo': 'draft6/exclusiveMinimum',
      'data': draft6ExclusiveMinimum
    });
    list.add({
      'belongTo': 'draft6/format',
      'data': draft6Format
    });
    list.add({
      'belongTo': 'draft6/id',
      'data': draft6Id
    });
    list.add({
      'belongTo': 'draft6/infinite-loop-detection',
      'data': draft6InfiniteLoopDetection
    });
    list.add({
      'belongTo': 'draft6/items',
      'data': draft6Items
    });
    list.add({
      'belongTo': 'draft6/maximum',
      'data': draft6Maximum
    });
    list.add({
      'belongTo': 'draft6/maxItems',
      'data': draft6MaxItems
    });
    list.add({
      'belongTo': 'draft6/maxLength',
      'data': draft6MaxLength
    });
    list.add({
      'belongTo': 'draft6/maxProperties',
      'data': draft6MaxProperties
    });
    list.add({
      'belongTo': 'draft6/minimum',
      'data': draft6Minimum
    });
    list.add({
      'belongTo': 'draft6/minItems',
      'data': draft6MinItems
    });
    list.add({
      'belongTo': 'draft6/minLength',
      'data': draft6MinLength
    });
    list.add({
      'belongTo': 'draft6/minProperties',
      'data': draft6MinProperties
    });
    list.add({
      'belongTo': 'draft6/multipleOf',
      'data': draft6MultipleOf
    });
    list.add({
      'belongTo': 'draft6/not',
      'data': draft6Not
    });
    list.add({
      'belongTo': 'draft6/oneOf',
      'data': draft6OneOf
    });
    list.add({
      'belongTo': 'draft6/pattern',
      'data': draft6Pattern
    });
    list.add({
      'belongTo': 'draft6/patternProperties',
      'data': draft6PatternProperties
    });
    list.add({
      'belongTo': 'draft6/properties',
      'data': draft6Properties
    });
    list.add({
      'belongTo': 'draft6/propertyNames',
      'data': draft6PropertyNames
    });
    list.add({
      'belongTo': 'draft6/ref',
      'data': draft6Ref
    });
    // list.add({
    //   'belongTo': 'draft6/refRemote',
    //   'data': draft6RefRemote
    // });
    list.add({
      'belongTo': 'draft6/required',
      'data': draft6Required
    });
    list.add({
      'belongTo': 'draft6/type',
      'data': draft6Type
    });
    list.add({
      'belongTo': 'draft6/uniqueItems',
      'data': draft6UniqueItems
    });
    list.add({
      'belongTo': 'draft6/unknownKeyword',
      'data': draft6UnknownKeyword
    });

    /* list.add({
       'belongTo': 'draft7/date',
       'data': draft7Date
     });
     list.add({
       'belongTo': 'draft7/date-time',
       'data': draft7DateTime
     });
     list.add({
       'belongTo': 'draft7/email',
       'data': draft7Email
     });
     list.add({
       'belongTo': 'draft7/hostname',
       'data': draft7HostName
     });
     list.add({
       'belongTo': 'draft7/idn-email',
       'data': draft7IdnEmail
     });
     list.add({
       'belongTo': 'draft7/ipv4',
       'data': draft7Ipv4
     });
     list.add({
       'belongTo': 'draft7/ipv6',
       'data': draft7DateIpv6
     });
     list.add({
       'belongTo': 'draft7/iri',
       'data': draft7DateIri
     });
     list.add({
       'belongTo': 'draft7/iri-reference',
       'data': draft7DateIriReference
     });
     list.add({
       'belongTo': 'draft7/json-pointer',
       'data': draft7JsonPointer
     });
     list.add({
       'belongTo': 'draft7/regex',
       'data': draft7JsonRegex
     });
     list.add({
       'belongTo': 'draft7/relative-json-pointer',
       'data': draft7JsonRelativeJsonPointer
     });
     list.add({
       'belongTo': 'draft7/time',
       'data': draft7JsonTime
     });
     list.add({
       'belongTo': 'draft7/unknown',
       'data': draft7unknown
     });
     list.add({
       'belongTo': 'draft7/uri',
       'data': draft7Uri
     });*/
    list.add({
      'belongTo': 'draft7/uri-reference',
      'data': draft7UriReference
    });
    /*  list.add({
        'belongTo': 'draft7/uri-template',
        'data': draft7UriTemplate
      });
      list.add({
        'belongTo': 'draft7/bignum',
        'data': draft7Bignum
      });
      list.add({
        'belongTo': 'draft7/content',
        'data': draft7Content
      });*/
    list.add({
      'belongTo': 'draft7/cross-draft',
      'data': draft7CrossDraft
    });
    // list.add({
    //   'belongTo': 'draft7/ecmascript-regex',
    //   'data': draft7EcmascriptRegex
    // });
    list.add({
      'belongTo': 'draft7/float-overflow',
      'data': draft7FloatOverflow
    });
    list.add({
      'belongTo': 'draft7/non-bmp-regex',
      'data': draft7NonBmpRegex
    });
    list.add({
      'belongTo': 'draft7/additionalItems',
      'data': draft7AdditionalItems
    });
    list.add({
      'belongTo': 'draft7/additionalProperties',
      'data': draft7AdditionalProperties
    });
    list.add({
      'belongTo': 'draft7/allOf',
      'data': draft7AllOf
    });
    list.add({
      'belongTo': 'draft7/anyOf',
      'data': draft7AnyOf
    });
    list.add({
      'belongTo': 'draft7/boolean_schema',
      'data': draft7BooleanSchema
    });
    list.add({
      'belongTo': 'draft7/const',
      'data': draft7Const
    });
    list.add({
      'belongTo': 'draft7/contains',
      'data': draft7Contains
    });
    list.add({
      'belongTo': 'draft7/default',
      'data': draft7Default
    });
    list.add({
      'belongTo': 'draft7/definitions',
      'data': draft7Definitions
    });
    list.add({
      'belongTo': 'draft7/dependencies',
      'data': draft7Dependencies
    });
    list.add({
      'belongTo': 'draft7/enum',
      'data': draft7Enum
    });
    list.add({
      'belongTo': 'draft7/exclusiveMaximum',
      'data': draft7ExclusiveMaximum
    });
    list.add({
      'belongTo': 'draft7/exclusiveMinimum',
      'data': draft7ExclusiveMinimum
    });
    list.add({
      'belongTo': 'draft7/format',
      'data': draft7Format
    });
    list.add({
      'belongTo': 'draft7/id',
      'data': draft7Id
    });
    list.add({
      'belongTo': 'draft7/if-then-else',
      'data': draft7IfThenElse
    });
    list.add({
      'belongTo': 'draft7/infinite-loop-detection',
      'data': draft7InfiniteLoopDetection
    });
    list.add({
      'belongTo': 'draft7/items',
      'data': draft7Items
    });
    list.add({
      'belongTo': 'draft7/maximum',
      'data': draft7Maximum
    });
    list.add({
      'belongTo': 'draft7/maxItems',
      'data': draft7MaxItems
    });
    list.add({
      'belongTo': 'draft7/maxLength',
      'data': draft7MaxLength
    });
    list.add({
      'belongTo': 'draft7/maxProperties',
      'data': draft7MaxProperties
    });
    list.add({
      'belongTo': 'draft7/minimum',
      'data': draft7Minimum
    });
    list.add({
      'belongTo': 'draft7/minItems',
      'data': draft7MinItems
    });
    list.add({
      'belongTo': 'draft7/minLength',
      'data': draft7MinLength
    });
    list.add({
      'belongTo': 'draft7/minProperties',
      'data': draft7MinProperties
    });
    list.add({
      'belongTo': 'draft7/multipleOf',
      'data': draft7MultipleOf
    });
    list.add({
      'belongTo': 'draft7/not',
      'data': draft7Not
    });
    list.add({
      'belongTo': 'draft7/oneOf',
      'data': draft7OneOf
    });
    list.add({
      'belongTo': 'draft7/pattern',
      'data': draft7Pattern
    });
    list.add({
      'belongTo': 'draft7/patternProperties',
      'data': draft7PatternProperties
    });
    list.add({
      'belongTo': 'draft7/properties',
      'data': draft7Properties
    });
    list.add({
      'belongTo': 'draft7/propertyNames',
      'data': draft7PropertyNames
    });
    list.add({
      'belongTo': 'draft7/ref',
      'data': draft7Ref
    });
    // list.add({
    //   'belongTo': 'draft7/refRemote',
    //   'data': draft7RefRemote
    // });
    list.add({
      'belongTo': 'draft7/required',
      'data': draft7Required
    });
    list.add({
      'belongTo': 'draft7/type',
      'data': draft7Type
    });
    list.add({
      'belongTo': 'draft7/uniqueItems',
      'data': draft7UniqueItems
    });
    list.add({
      'belongTo': 'draft7/unknownKeyword',
      'data': draft7UnknownKeyword
    });

    return list
  }
  // 原库test只测了03 04 06 07，涉及到19 20 next的json文件暂不加载
  private static addAnotherJsonFile(list: ArrayList<object>) {

    list.add(draft201909Date);
    list.add(draft201909DateTime);
    list.add(draft201909Duration);
    list.add(draft201909Email);
    list.add(draft201909HostName);
    list.add(draft201909IdnEmail);
    list.add(draft201909IdnHostname);
    list.add(draft201909Ipv4);
    list.add(draft201909DateIpv6);
    list.add(draft201909DateIri);
    list.add(draft201909DateIriReference);
    list.add(draft201909JsonPointer);
    list.add(draft201909JsonRegex);
    list.add(draft201909JsonRelativeJsonPointer);
    list.add(draft201909JsonTime);
    list.add(draft201909unknown);
    list.add(draft201909Uri);
    list.add(draft201909UriReference);
    list.add(draft201909UriTemplate);
    list.add(draft201909Uuid);
    list.add(draft201909Bignum);
    list.add(draft201909CrossDraft);
    list.add(draft201909DependenciesCompatibility);
    list.add(draft201909EcmascriptRegex)
    list.add(draft201909FloatOverflow);
    list.add(draft201909NoSchema);
    list.add(draft201909NonBmpRegex);
    list.add(draft201909RefOfUnknownKeyword)
    list.add(draft201909AdditionalItems);
    list.add(draft201909AdditionalProperties);
    list.add(draft201909AllOf);
    list.add(draft201909Anchor)
    list.add(draft201909AnyOf);
    list.add(draft201909BooleanSchema);
    list.add(draft201909Const);
    list.add(draft201909Contains)
    list.add(draft201909Content);
    list.add(draft201909Default);
    list.add(draft201909Defs);
    list.add(draft201909DependentRequired)
    list.add(draft201909DependentSchemas);
    list.add(draft201909Enum);
    list.add(draft201909ExclusiveMaximum);
    list.add(draft201909ExclusiveMinimum)
    list.add(draft201909Format);
    list.add(draft201909Id);
    list.add(draft201909IfThenElse);
    list.add(draft201909InfiniteLoopDetection)
    list.add(draft201909Items);
    list.add(draft201909MaxContains);
    list.add(draft201909Maximum);
    list.add(draft201909MaxItems)
    list.add(draft201909MaxLength);
    list.add(draft201909MaxProperties);
    list.add(draft201909MinContains);
    list.add(draft201909Minimum)
    list.add(draft201909MinItems);
    list.add(draft201909MinLength);
    list.add(draft201909MinProperties);
    list.add(draft201909MultipleOf)
    list.add(draft201909Not);
    list.add(draft201909OneOf);
    list.add(draft201909Pattern);
    list.add(draft201909PatternProperties)
    list.add(draft201909Properties);
    list.add(draft201909PropertyNames);
    list.add(draft201909RecursiveRef);
    list.add(draft201909Ref)
    list.add(draft201909RefRemote);
    list.add(draft201909Required);
    list.add(draft201909Type);
    list.add(draft201909UnevaluatedItems)
    list.add(draft201909UnevaluatedProperties);
    list.add(draft201909UniqueItems);
    list.add(draft201909UnknownKeyword);
    list.add(draft201909Vocabulary)


    list.add(draft202012Date);
    list.add(draft202012DateTime);
    list.add(draft202012Duration);
    list.add(draft202012Email)
    list.add(draft202012HostName);
    list.add(draft202012IdnEmail);
    list.add(draft202012IdnHostname);
    list.add(draft202012Ipv4)
    list.add(draft202012DateIpv6);
    list.add(draft202012DateIri);
    list.add(draft202012DateIriReference);
    list.add(draft202012JsonPointer)
    list.add(draft202012JsonRegex);
    list.add(draft202012JsonRelativeJsonPointer);
    list.add(draft202012JsonTime);
    list.add(draft202012unknown)
    list.add(draft202012Uri);
    list.add(draft202012UriReference);
    list.add(draft202012UriTemplate);
    list.add(draft202012Uuid)
    list.add(draft202012Bignum);
    list.add(draft202012CrossDraft);
    list.add(draft202012DependenciesCompatibility);
    list.add(draft202012EcmascriptRegex)
    list.add(draft202012FloatOverflow);
    list.add(draft202012FormatAssertion);
    list.add(draft202012NoSchema);
    list.add(draft202012NonBmpRegex)
    list.add(draft202012RefOfUnknownKeyword);
    list.add(draft202012AdditionalProperties);
    list.add(draft202012AllOf);
    list.add(draft202012Anchor)
    list.add(draft202012AnyOf);
    list.add(draft202012BooleanSchema);
    list.add(draft202012Const);
    list.add(draft202012Contains)
    list.add(draft202012Content);
    list.add(draft202012Default);
    list.add(draft202012Defs);
    list.add(draft202012DependentRequired)
    list.add(draft202012DependentSchemas);
    list.add(draft202012DynamicRef);
    list.add(draft202012Enum);
    list.add(draft202012ExclusiveMaximum)
    list.add(draft202012ExclusiveMinimum);
    list.add(draft202012Format);
    list.add(draft202012Id);
    list.add(draft202012IfThenElse)
    list.add(draft202012InfiniteLoopDetection);
    list.add(draft202012Items);
    list.add(draft202012MaxContains);
    list.add(draft202012Maximum)
    list.add(draft202012MaxItems);
    list.add(draft202012MaxLength);
    list.add(draft202012MaxProperties);
    list.add(draft202012MinContains)
    list.add(draft202012Minimum);
    list.add(draft202012MinItems);
    list.add(draft202012MinLength);
    list.add(draft202012MinProperties)
    list.add(draft202012MultipleOf);
    list.add(draft202012Not);
    list.add(draft202012OneOf);
    list.add(draft202012Pattern)
    list.add(draft202012PatternProperties);
    list.add(draft202012PrefixItems);
    list.add(draft202012Properties);
    list.add(draft202012PropertyNames)
    list.add(draft202012Ref);
    list.add(draft202012RefRemote);
    list.add(draft202012Required);
    list.add(draft202012Type)
    list.add(draft202012UnevaluatedItems);
    list.add(draft202012UnevaluatedProperties);
    list.add(draft202012UniqueItems);
    list.add(draft202012UnknownKeyword)
    list.add(draft202012Vocabulary)


    list.add(draftNextDate);
    list.add(draftNextDateTime);
    list.add(draftNextDuration)
    list.add(draftNextEmail)
    list.add(draftNextHostName);
    list.add(draftNextIdnEmail);
    list.add(draftNextIdnHostname)
    list.add(draftNextIpv4)
    list.add(draftNextDateIpv6);
    list.add(draftNextDateIri);
    list.add(draftNextDateIriReference)
    list.add(draftNextJsonPointer)
    list.add(draftNextJsonRegex);
    list.add(draftNextJsonRelativeJsonPointer);
    list.add(draftNextJsonTime)
    list.add(draftNextUri)
    list.add(draftNextUriReference);
    list.add(draftNextUriTemplate);
    list.add(draftNextUuid)
    list.add(draftNextBignum)
    list.add(draftNextDependenciesCompatibility);
    list.add(draftNextEcmascriptRegex);
    list.add(draftNextFloatOverflow)
    list.add(draftNextFormatAssertion)
    list.add(draftNextNonBmpRegex);
    list.add(draftNextRefOfUnknownKeyword);
    list.add(draftNextAdditionalProperties)
    list.add(draftNextAllOf)
    list.add(draftNextAnchor);
    list.add(draftNextAnyOf);
    list.add(draftNextBooleanSchema)
    list.add(draftNextConst)
    list.add(draftNextContains);
    list.add(draftNextContent);
    list.add(draftNextDefault)
    list.add(draftNextDefs)
    list.add(draftNextDependentRequired);
    list.add(draftNextDependentSchemas);
    list.add(draftNextDynamicRef)
    list.add(draftNextEnum)
    list.add(draftNextExclusiveMaximum);
    list.add(draftNextExclusiveMinimum);
    list.add(draftNextFormat)
    list.add(draftNextId)
    list.add(draftNextIfThenElse);
    list.add(draftNextInfiniteLoopDetection);
    list.add(draftNextItems)
    list.add(draftNextMaxContains)
    list.add(draftNextMaximum);
    list.add(draftNextMaxItems);
    list.add(draftNextMaxLength)
    list.add(draftNextMaxProperties)
    list.add(draftNextMinContains);
    list.add(draftNextMinimum);
    list.add(draftNextMinItems)
    list.add(draftNextMinLength)
    list.add(draftNextMinProperties);
    list.add(draftNextMultipleOf);
    list.add(draftNextNot)
    list.add(draftNextOneOf)
    list.add(draftNextPattern);
    list.add(draftNextPatternProperties);
    list.add(draftNextPrefixItems)
    list.add(draftNextProperties)
    list.add(draftNextPropertyNames);
    list.add(draftNextRef);
    list.add(draftNextRefRemote)
    list.add(draftNextRequired)
    list.add(draftNextType);
    list.add(draftNextUnevaluatedItems);
    list.add(draftNextUnevaluatedProperties)
    list.add(draftNextUniqueItems)
    list.add(draftNextUnknownKeyword)
    list.add(draftNextVocabulary)
  }
}
