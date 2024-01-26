"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class ASN1Error extends Error {}

exports.ASN1Error = ASN1Error;
class InvalidASN1ObjectModelError extends ASN1Error {}
exports.InvalidASN1ObjectModelError = InvalidASN1ObjectModelError;
class InvalidJSONError extends ASN1Error {}
exports.InvalidJSONError = InvalidJSONError;
class InvalidASN1ContentError extends ASN1Error {}
exports.InvalidASN1ContentError = InvalidASN1ContentError;
