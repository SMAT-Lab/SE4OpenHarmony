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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util'

import { TargetTypeEnum } from 'inversify';
import * as METADATA_KEY from 'inversify/lib/constants/metadata_keys';
import { Metadata } from 'inversify/es/planning/metadata';
import { Target } from 'inversify/es/planning/target';

export default function targetTest() {
  describe('targetTest',  ()=> {
    _it('Should_be_able_to_create_instances_of_untagged_targets', () => {
      const target:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana');
      expect(target.serviceIdentifier).to.be.eql('Katana');
      expect(target.name.value()).to.be.eql('katana');
      expect(Array.isArray(target.metadata)).to.be.eql(true);
      expect(target.metadata.length).to.be.eql(0);
    });

    _it('Should_be_able_to_create_instances_of_named_targets', () => {
      const target:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', 'primary');
      expect(target.serviceIdentifier).to.be.eql('Katana');
      expect(target.name.value()).to.be.eql('katana');
      expect(Array.isArray(target.metadata)).to.be.eql(true);
      expect(target.metadata.length).to.be.eql(1);
      expect(target.metadata[0]?.key).to.be.eql(METADATA_KEY.NAMED_TAG);
      expect(target.metadata[0]?.value).to.be.eql('primary');
    });

    _it('Should_be_able_to_create_instances_of_tagged_targets', () => {
      const target:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', new Metadata('power', 5));
      expect(target.serviceIdentifier).to.be.eql('Katana');
      expect(target.name.value()).to.be.eql('katana');
      expect(Array.isArray(target.metadata)).to.be.eql(true);
      expect(target.metadata.length).to.be.eql(1);
      expect(target.metadata[0]?.key).to.be.eql('power');
      expect(target.metadata[0]?.value).to.be.eql(5);
    });

    _it('Should_be_able_to_identify_named_metadata', () => {
      const target1:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', 'primary');
      expect(target1.isNamed()).to.be.eql(true);
      const target2:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', new Metadata('power', 5));
      expect(target2.isNamed()).to.be.eql(false);
    });

    _it('Should_be_able_to_identify_multi_injections', () => {
      const target1:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana');
      target1.metadata.push(new Metadata(METADATA_KEY.MULTI_INJECT_TAG, 'Katana'));
      expect(target1.isArray()).to.be.eql(true);
      const target2:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana');
      expect(target2.isArray()).to.be.eql(false);
    });

    _it('Should_be_able_to_match_multi_inject_for_a_specified_service_metadata', () => {
      const target1:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana');
      target1.metadata.push(new Metadata(METADATA_KEY.MULTI_INJECT_TAG, 'Katana'));
      target1.metadata.push(new Metadata(METADATA_KEY.INJECT_TAG, 'Shuriken'));
      expect(target1.matchesArray('Katana')).to.be.eql(true);
      expect(target1.matchesArray('Shuriken')).to.be.eql(false);
    });

    _it('Should_be_able_to_match_named_metadata', () => {
      const target1:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', 'primary');
      expect(target1.matchesNamedTag('primary')).to.be.eql(true);
      expect(target1.matchesNamedTag('secondary')).to.be.eql(false);
    });

    _it('Should_be_able_to_identify_tagged_metadata', () => {

      const target:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana');
      expect(target.isTagged()).to.be.eql(false);

      const target1:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', new Metadata('power', 5));
      expect(target1.isTagged()).to.be.eql(true);

      const target2:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', 'primary');
      expect(target2.isTagged()).to.be.eql(false);

      const target3:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana');
      target3.metadata.push(new Metadata('power', 5), new Metadata('speed', 5));
      expect(target3.isTagged()).to.be.eql(true);

      const target4:ESObject = new Target(TargetTypeEnum.Variable, '', 'Katana');
      target4.metadata.push(new Metadata(METADATA_KEY.INJECT_TAG, 'Katana'))
      expect(target4.isTagged()).to.be.eql(false);

      const target5:ESObject = new Target(TargetTypeEnum.Variable, '', 'Katana');
      target5.metadata.push(new Metadata(METADATA_KEY.MULTI_INJECT_TAG, 'Katana'))
      expect(target5.isTagged()).to.be.eql(false);

      const target6:ESObject = new Target(TargetTypeEnum.Variable, 'katanaName', 'Katana');
      target6.metadata.push(new Metadata(METADATA_KEY.NAME_TAG, 'katanaName'))
      expect(target6.isTagged()).to.be.eql(false);

      const target7:ESObject = new Target(TargetTypeEnum.Variable, '', 'Katana');
      target7.metadata.push(new Metadata(METADATA_KEY.UNMANAGED_TAG, true))
      expect(target7.isTagged()).to.be.eql(false);

      const target8:ESObject = new Target(TargetTypeEnum.Variable, 'katanaName', 'Katana');
      target8.metadata.push(new Metadata(METADATA_KEY.NAMED_TAG, 'katanaName'))
      expect(target8.isTagged()).to.be.eql(false);

      const target9:ESObject = new Target(TargetTypeEnum.Variable, '', 'Katana');
      target9.metadata.push(new Metadata(METADATA_KEY.OPTIONAL_TAG, true))
      expect(target9.isTagged()).to.be.eql(false);
    });

    _it('Should_be_able_to_match_tagged_metadata', () => {
      const target1:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', new Metadata('power', 5));
      expect(target1.matchesTag('power')(5)).to.be.eql(true);
      expect(target1.matchesTag('power')(2)).to.be.eql(false);
    });

    _it('Should_contain_an_unique_identifier', () => {
      const target1:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', new Metadata('power', 5));
      const target2:ESObject = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Katana', new Metadata('power', 5));
      expect(target1.id).to.be.a('number');
      expect(target2.id).to.be.a('number');
      expect(target1.id).not.eql(target2.id);
    });
  })
}