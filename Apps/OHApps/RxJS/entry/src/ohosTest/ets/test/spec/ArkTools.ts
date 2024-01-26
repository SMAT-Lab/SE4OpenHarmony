/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import { queueScheduler as queue, empty, Observable, ReplaySubject, Notification, } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

export function scheduleCallback(stateData: {
  call1: boolean,
  call2: boolean
}): void {
  queue.schedule(function (state) {
    stateData.call1 = state!.call1;
    stateData.call2 = state!.call2;
    if (!stateData.call2) {
      this.schedule({ call1: true, call2: true });
    }
  }, 0, { call1: true, call2: false });
}

export function MyPromise1(wasCalledv) {
  let wasCalled = wasCalledv;

  function MyPromise(callback: any) {
    wasCalled = true;
    return new Promise<number>(callback);
  }

  return MyPromise
}

export function BindFun(obj) {
  return obj.bind = () => { /* lol */
  }
}

export function EmptyFun() {
  return empty().subscribe(<any> {});
}

export function SourceFun<T>(obj, s) {
  return obj.source = <Observable<T>> s;
}

export function observableSource(obj, t) {
  return (<any> obj).source = t;
}

export function observableOperator(obj, o) {
  return (<any> obj).operator = o;
}

export function ObjFun(nexts, error, complete) {
  return {
    closed: false,
    next: function (x: number) {
      nexts.push(x);
    },
    error: function (err: any) {
      error = err;
      this.closed = true;
    },
    complete: function () {
      complete = true;
      this.closed = true;
    },
  }
}

export function ReplaySubjectFun(rxTestScheduler) {
  return new ReplaySubject<string>(Infinity, 4, rxTestScheduler);
}

export function ReplaySubjectFun2(rxTestScheduler) {
  return new ReplaySubject<string>(2, 4, rxTestScheduler);
}

export function InstanceofFun() {
  return AnonymousSubject instanceof Function
}

export function UndefinedFun() {
  return Notification != undefined && Notification != null
}

export function InstanceofNotFun() {
  return Notification instanceof Function
}












