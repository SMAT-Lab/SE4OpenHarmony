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
import { Binding } from 'inversify/lib/bindings/binding';
import { BindingScopeEnum, TargetTypeEnum, typeConstraint } from 'inversify';
import { Container } from 'inversify';
import { Context } from 'inversify/lib/planning/context';
import { Request } from 'inversify/lib/planning/request';
import { Target } from 'inversify/es/planning/target';
import { BindingWhenSyntax } from 'inversify/lib/syntax/binding_when_syntax';
import { Metadata } from 'inversify/es/planning/metadata';
interface Material {
    name: string;
}
interface Weapon {
    name: string;
    material: Material;
}
class Katana implements Weapon {
    public name = 'Katana';
    public material: Material;
    public constructor(material: Material) {
        this.material = material;
    }
}
class Shuriken implements Weapon {
    public name = 'Shuriken';
    public material: Material;
    public constructor(material: Material) {
        this.material = material;
    }
}
interface Samurai {
    katana: Weapon;
}
interface Ninja {
    shuriken: Weapon;
}
class NinjaMaster implements Ninja {
    public shuriken: Weapon;
    public constructor(shuriken: Weapon) {
        this.shuriken = shuriken;
    }
}
class SamuraiMaster implements Samurai {
    public katana: Weapon;
    public constructor(katana: Weapon) {
        this.katana = katana;
    }
}
class NinjaStudent implements Ninja {
    public shuriken: Weapon;
    public constructor(shuriken: Weapon) {
        this.shuriken = shuriken;
    }
}
class SamuraiStudent implements Samurai {
    public katana: Weapon;
    public constructor(katana: Weapon) {
        this.katana = katana;
    }
}
export function getBindingWhenSyntax(Syntax) {
    const context = new Context(new Container());
    // Samurai
    const samuraiMasterBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
    samuraiMasterBinding.implementationType = SamuraiMaster;
    const samuraiStudentBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
    samuraiStudentBinding.implementationType = SamuraiStudent;
    const samuraiTarget = new Target(TargetTypeEnum.ConstructorArgument, '', 'Samurai', new Metadata('sneaky', false));
    const samuraiMasterRequest = new Request('Samurai', context, null, samuraiMasterBinding, samuraiTarget);
    const samuraiStudentRequest = new Request('Samurai', context, null, samuraiStudentBinding, samuraiTarget);
    // Ninja
    const ninjaMasterBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);
    ninjaMasterBinding.implementationType = NinjaMaster;
    const ninjaStudentBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);
    ninjaStudentBinding.implementationType = NinjaStudent;
    const ninjaTarget = new Target(TargetTypeEnum.ConstructorArgument, '', 'Ninja', new Metadata('sneaky', true));
    const ninjaMasterRequest = new Request('Ninja', context, null, ninjaMasterBinding, ninjaTarget);
    const ninjaStudentRequest = new Request('Ninja', context, null, ninjaStudentBinding, ninjaTarget);
    // Katana
    const katanaBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
    katanaBinding.implementationType = Katana;
    const katanaBindingWhenSyntax = new BindingWhenSyntax<Weapon>(katanaBinding);
    const katanaTarget = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Weapon');
    const ironKatanaRequest = new Request('Weapon', context, samuraiMasterRequest, katanaBinding, katanaTarget);
    const woodKatanaRequest = new Request('Weapon', context, samuraiStudentRequest, katanaBinding, katanaTarget);
    // Shuriken
    const shurikenBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
    shurikenBinding.implementationType = Shuriken;
    const shurikenBindingWhenSyntax = new BindingWhenSyntax<Weapon>(shurikenBinding);
    const shurikenTarget = new Target(TargetTypeEnum.ConstructorArgument, 'shuriken', 'Weapon');
    const ironShurikenRequest = new Request('Weapon', context, ninjaMasterRequest, shurikenBinding, shurikenTarget);
    const woodShurikenRequest = new Request('Weapon', context, ninjaStudentRequest, shurikenBinding, shurikenTarget);
    const anyAncestorIsNinjaMasterConstraint = typeConstraint(NinjaMaster);
    const anyAncestorIsNinjaStudentConstraint = typeConstraint(NinjaStudent);
    const anyAncestorIsSamuraiMasterConstraint = typeConstraint(SamuraiMaster);
    const anyAncestorIsSamuraiStudentConstraint = typeConstraint(SamuraiStudent);
    if (Syntax === "shurikenBindingWhenSyntaxNinjaMaster") {
        shurikenBindingWhenSyntax.whenAnyAncestorIs(NinjaMaster);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxNinjaStudent") {
        shurikenBindingWhenSyntax.whenAnyAncestorIs(NinjaStudent);
    }
    else if (Syntax === "katanaBindingWhenSyntaxSamuraiMaster") {
        katanaBindingWhenSyntax.whenAnyAncestorIs(SamuraiMaster);
    }
    else if (Syntax === "katanaBindingWhenSyntaxSamuraiStudent") {
        katanaBindingWhenSyntax.whenAnyAncestorIs(SamuraiStudent);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxIsNinjaMaster") {
        shurikenBindingWhenSyntax.whenNoAncestorIs(NinjaMaster);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxIsNinjaStudent") {
        shurikenBindingWhenSyntax.whenNoAncestorIs(NinjaStudent);
    }
    else if (Syntax === "katanaBindingWhenSyntaxIsSamuraiMaster") {
        katanaBindingWhenSyntax.whenNoAncestorIs(SamuraiMaster);
    }
    else if (Syntax === "katanaBindingWhenSyntaxIsSamuraiStudent") {
        katanaBindingWhenSyntax.whenNoAncestorIs(SamuraiStudent);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxNinjaMasterConstraint") {
        shurikenBindingWhenSyntax.whenAnyAncestorMatches(anyAncestorIsNinjaMasterConstraint);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxNinjaStudentConstraint") {
        shurikenBindingWhenSyntax.whenAnyAncestorMatches(anyAncestorIsNinjaStudentConstraint);
    }
    else if (Syntax === "katanaBindingWhenSyntaxSamuraiMasterConstraint") {
        katanaBindingWhenSyntax.whenAnyAncestorMatches(anyAncestorIsSamuraiMasterConstraint);
    }
    else if (Syntax === "katanaBindingWhenSyntaxSamuraiStudentConstraint") {
        katanaBindingWhenSyntax.whenAnyAncestorMatches(anyAncestorIsSamuraiStudentConstraint);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxNoneNinjaMasterConstraint") {
        shurikenBindingWhenSyntax.whenNoAncestorMatches(anyAncestorIsNinjaMasterConstraint);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxNoneNinjaStudentConstraint") {
        shurikenBindingWhenSyntax.whenNoAncestorMatches(anyAncestorIsNinjaStudentConstraint);
    }
    else if (Syntax === "katanaBindingWhenSyntaxNoneSamuraiMasterConstraint") {
        katanaBindingWhenSyntax.whenNoAncestorMatches(anyAncestorIsSamuraiMasterConstraint);
    }
    else if (Syntax === "katanaBindingWhenSyntaxNoneSamuraiStudentConstraint") {
        katanaBindingWhenSyntax.whenNoAncestorMatches(anyAncestorIsSamuraiStudentConstraint);
    }
    return {
        katanaBinding: katanaBinding,
        woodShurikenRequest: woodShurikenRequest,
        ironShurikenRequest: ironShurikenRequest,
        shurikenBinding: shurikenBinding,
        woodKatanaRequest: woodKatanaRequest,
        ironKatanaRequest: ironKatanaRequest
    };
}
