let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
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
import abilityTest from './Ability.test';
import ajaxTest from './spec/ajax/index-spec.test';
import configTest from './spec/config-spec.test';
import firstValueFromTest from './spec/firstValueFrom-spec.test';
import lastValueFromTest from './spec/lastValueFrom-spec.test';
import NotificationTest from './spec/Notification-spec.test';
import observableTest from './spec/Observable-spec.test';
import queueSchedulerTest from './spec/Scheduler-spec.test';
import subjectTest from './spec/Subject-spec.test';
import subscriberTest from './spec/Subscriber-spec.test';
import subscriptionTest from './spec/Subscription-spec.test';
import asyncSubjectTest from './spec/subjects/AsyncSubject-spec.test';
import behaviorSubjectTest from './spec/subjects/BehaviorSubject-spec.test';
import replaySubjectTest from './spec/subjects/ReplaySubject-spec.test';
export default function testsuite() {
    abilityTest();
    ajaxTest();
    firstValueFromTest();
    lastValueFromTest();
    NotificationTest();
    queueSchedulerTest();
    subjectTest();
    subscriberTest();
    subscriptionTest();
    asyncSubjectTest();
    behaviorSubjectTest();
    replaySubjectTest();
    observableTest();
    configTest();
}
