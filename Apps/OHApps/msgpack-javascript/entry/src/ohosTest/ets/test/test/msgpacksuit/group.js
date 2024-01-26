/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * group.js
 */



import suite from "./msgpack-test-suite.json";
import {Exam} from "./exam";

export function Group(name) {
  if (!(this instanceof Group)) return new Group(name);
  this.name = name;
}

Group.getGroups = getGroups;

Group.prototype.getExams = getExams;
Group.prototype.toString = toString;

function getGroups() {
  return Object.keys(suite).sort().map(Group);
}

function getExams(filter) {
  var name = this.name;
  var array = suite[name];

  if (!array) throw new Error("Group not found: " + name);

  return array.map(Exam).filter(function(exam) {
    return !filter || exam.getTypes(filter).length;
  });
}

function toString() {
  return this.name;
}