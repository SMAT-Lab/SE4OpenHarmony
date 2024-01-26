/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

#include "ProducerConsumer.h"

void ProducerConsumerQueue::PutElement(string element) {
    unique_lock<mutex> lock(m_mutex); // add mutex

    while (isFull()) {
        // when the data buffer queue is full, the production is blocked and wakes up after consumer consumption
        // m_mutex is automatically released at the same time
        m_notFull.wait(lock);
    }
    // reacquire the lock
    // if the queue is not full
    // the product is added to the queue and the consumer is notified that the product can be consumed
    m_queue.push(element);
    m_notEmpty.notify_one();
}

string ProducerConsumerQueue::TakeElement() {
    unique_lock<mutex> lock(m_mutex); // add mutex

    while (isEmpty()) {
        // when the data buffer queue is empty, the consumption is blocked and the producer is woken up after production
        // m_mutex is automatically released at the same time
        m_notEmpty.wait(lock);
    }
    // reacquire the lock
    // if the queue is not empty, the product is ejected and the producer is notified that it is ready for production
    string element = m_queue.front();
    m_queue.pop();
    m_notFull.notify_one();

    return element;
}