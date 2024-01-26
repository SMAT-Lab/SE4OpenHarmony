let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
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
import ManipulatingAnalyzersTest from './ManipulatingAnalyzers.test';
import ManipulatingViewsTest from './ManipulatingViews.test';
import ViewMetadataTest from './ViewMetadata.test';
import AccessingViewsTest from './AccessingViews.test';
import DocumentCollectionTest from './DocumentCollection.test';
import BulkImportTest from './BulkImport.test';
import SimpleQueriesTest from './SimpleQueries.test';
import ManagingIndexesTest from './ManagingIndexes.test';
import ManipulatingCollectionsTest from './ManipulatingCollections.test';
import CollectionMetadataTest from './CollectionMetadata.test';
import RoutesTest from './Routes.test';
import ManagingFunctionTest from './ManagingFunction.test';
import AqlHelperTest from './AqlHelper.test';
import TransactionsTest from './Transactions.test';
import GraphTest from './Graph.test';
import CollectionsTest from './Collections.test';
import DatabasesTest from './Databases.test';
import abilityTest from './Ability.test';
import CollectionsMultipleTest from "./CollectionsMultiple.test";
export default function testsuite() {
    abilityTest();
    DatabasesTest();
    CollectionsTest();
    GraphTest();
    TransactionsTest();
    AqlHelperTest();
    ManagingFunctionTest();
    RoutesTest();
    CollectionMetadataTest();
    ManipulatingCollectionsTest();
    ManagingIndexesTest();
    SimpleQueriesTest();
    BulkImportTest();
    DocumentCollectionTest();
    AccessingViewsTest();
    ViewMetadataTest();
    ManipulatingViewsTest();
    ManipulatingAnalyzersTest();
    CollectionsMultipleTest();
}
