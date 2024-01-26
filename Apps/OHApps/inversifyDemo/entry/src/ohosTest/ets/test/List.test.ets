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
import serializationTest from './serialization.test'
import binding_utilsTest from './binding_utils.test'
import inversifyTest from './inversify.test'
import constraint_helpersTest from './constraint_helpers.test'
import binding_when_syntaxTest from './binding_when_syntax.test'
import binding_to_syntaxTest from './binding_to_syntax.test'
import binding_on_syntaxTest from './binding_on_syntax.test'
import binding_in_syntaxTest from './binding_in_syntax.test'
import resolverTest from './resolver.test'
import targetTest from './target.test'
import requestTest from './request.test'
import queryable_stringTest from './queryable_string.test'
import plannerTest from './planner.test'
import planTest from './plan.test'
import metadataTest from './metadata.test'
import contextTest from './context.test'
import proxiesTest from './proxies.test'
import exceptionsTest from './exceptions.test'
import node_error_messagesTest from './node_error_messages.test'
import middlewareTest from './middleware.test'
import transitive_bindingsTest from './transitive_bindings.test'
import resolve_unbindedTest from './resolve_unbinded.test'
import providerTest from './provider.test'
import property_injectionTest from './property_injection.test'
import named_defaultTest from './named_default.test'
import metadata_readerTest from './metadata_reader.test'
import module_activation_storeTest from './module_activation_store.test'
import lookupTest from './lookup.test'
import containerTest from './container.test'
import container_moduleTest from './container_module.test'
import error_messageTest from './error_message.test'
import bindingTest from './binding.test'
import target_nameTest from './target_name.test'
import taggedTest from './tagged.test'
import post_constructTest from './post_construct.test'
import optionalTest from './optional.test'
import namedTest from './named.test'
import multiInjectTest from './multiInject.test'
import injectableTest from './injectable.test'
import injectTest from './inject.test'

export default function testsuite() {
  injectTest()
  injectableTest()
  multiInjectTest()
  namedTest()
  optionalTest()
  post_constructTest()
  taggedTest()
  target_nameTest()
  bindingTest()
  error_messageTest()
  container_moduleTest()
  containerTest()
  lookupTest()
  module_activation_storeTest()
  metadata_readerTest()
  named_defaultTest()
  property_injectionTest()
  providerTest()
  resolve_unbindedTest()
  transitive_bindingsTest()
  middlewareTest()
  node_error_messagesTest()
  exceptionsTest()
  proxiesTest()
  contextTest()
  metadataTest()
  planTest()
  plannerTest()
  queryable_stringTest()
  requestTest()
  targetTest()
  resolverTest()
  binding_in_syntaxTest()
  binding_on_syntaxTest()
  binding_to_syntaxTest()
  binding_when_syntaxTest()
  constraint_helpersTest()
  inversifyTest()
  binding_utilsTest()
  serializationTest()
}