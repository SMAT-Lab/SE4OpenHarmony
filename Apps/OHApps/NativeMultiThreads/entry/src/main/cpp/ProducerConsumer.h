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

#ifndef MultiThreads_ProducerConsumer_H
#define MultiThreads_ProducerConsumer_H

#include <string>
#include <queue>
#include <mutex>
#include <condition_variable>

using namespace std;

// Principles of the producer-consumer model: Use buffer zones to balance the rate between production and consumption.
// Synchronization relationship 1: When the buffer is full, the producer needs to be blocked and wait. When a product
// pops up the buffer, the producer needs to be woken up for consumption. Synchronization relationship 2: When the
// buffer is empty, the consumer needs to be blocked and waited. When a product enters the buffer, the consumer needs to
// be woken up for consumption.
class ProducerConsumerQueue {
public:
    // constructor
    ProducerConsumerQueue() {}
    ProducerConsumerQueue(int queueSize) : m_maxSize(queueSize) {}

    // producer enqueue operation
    void PutElement(string element);
    // consumer dequeue operation
    string TakeElement();

private:
    // check whether the buffer queue is full
    bool isFull() { return (m_queue.size() == m_maxSize); }
    // check whether the buffer queue is empty
    bool isEmpty() { return m_queue.empty(); }

private:
    queue<string> m_queue{};         // buffer queue
    int m_maxSize{};                 // buffer queue capacity
    mutex m_mutex{};                 // the mutex is used to protect data consistency
    condition_variable m_notEmpty{}; // condition variable, which is used to indicate whether the buffer queue is empty
    condition_variable m_notFull{};  // condition variable, which is used to indicate whether the buffer queue is full
};

#endif // MultiThreads_ProducerConsumer_H
