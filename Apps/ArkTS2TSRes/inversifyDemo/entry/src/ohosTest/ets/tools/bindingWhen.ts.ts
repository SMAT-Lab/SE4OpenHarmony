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
import { BindingScopeEnum, TargetTypeEnum } from 'inversify';
import { Container } from 'inversify';
import { Context } from 'inversify/lib/planning/context';
import { Request } from 'inversify/lib/planning/request';
import { Target } from 'inversify/es/planning/target';
import { BindingWhenSyntax } from 'inversify/lib/syntax/binding_when_syntax';
interface Weapon {
    name: string;
}
interface JaponeseWarrior {
    katana: Weapon;
}
interface ChineseWarrior {
    shuriken: Weapon;
}
class Ninja implements ChineseWarrior {
    public shuriken: Weapon;
    public constructor(shuriken: Weapon) {
        this.shuriken = shuriken;
    }
}
export class Samurai implements JaponeseWarrior {
    public katana: Weapon;
    public constructor(katana: Weapon) {
        this.katana = katana;
    }
}
let katanaBindingWhenSyntax;
export function getKatanaBindingWhenSyntax(Syntax) {
    const context = new Context(new Container());
    const samuraiBinding = new Binding<Samurai>('Samurai', BindingScopeEnum.Transient);
    samuraiBinding.implementationType = Samurai;
    const samuraiTarget = new Target(TargetTypeEnum.Variable, '', 'Samurai');
    const samuraiRequest = new Request('Samurai', context, null, samuraiBinding, samuraiTarget);
    const ninjaBinding = new Binding<Ninja>('Ninja', BindingScopeEnum.Transient);
    ninjaBinding.implementationType = Ninja;
    const ninjaTarget = new Target(TargetTypeEnum.Variable, '', 'Ninja');
    const ninjaRequest = new Request('Ninja', context, null, ninjaBinding, ninjaTarget);
    const katanaBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
    katanaBindingWhenSyntax = new BindingWhenSyntax<Weapon>(katanaBinding);
    const katanaTarget = new Target(TargetTypeEnum.ConstructorArgument, 'katana', 'Weapon');
    const katanaRequest = new Request('Weapon', context, samuraiRequest, katanaBinding, katanaTarget);
    const shurikenBinding = new Binding<Weapon>('Weapon', BindingScopeEnum.Transient);
    const shurikenBindingWhenSyntax = new BindingWhenSyntax<Weapon>(shurikenBinding);
    const shurikenTarget = new Target(TargetTypeEnum.ConstructorArgument, 'shuriken', 'Weapon');
    const shurikenRequest = new Request('Weapon', context, ninjaRequest, shurikenBinding, shurikenTarget);
    if (Syntax === "katanaBindingWhenSyntaxSamurai") {
        katanaBindingWhenSyntax.whenInjectedInto(Samurai);
    }
    else if (Syntax === "katanaBindingWhenSyntaxNinja") {
        katanaBindingWhenSyntax.whenInjectedInto(Ninja);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxSamurai") {
        shurikenBindingWhenSyntax.whenInjectedInto(Samurai);
    }
    else if (Syntax === "shurikenBindingWhenSyntaxNinja") {
        shurikenBindingWhenSyntax.whenInjectedInto(Ninja);
    }
    else if (Syntax === "katanaBindingWhenSyntaxSamuraiStr") {
        katanaBindingWhenSyntax.whenInjectedInto('Samurai');
    }
    else if (Syntax === "katanaBindingWhenSyntaxNinjaStr") {
        katanaBindingWhenSyntax.whenInjectedInto('Ninja');
    }
    else if (Syntax === "shurikenBindingWhenSyntaxSamuraiStr") {
        shurikenBindingWhenSyntax.whenInjectedInto('Samurai');
    }
    else if (Syntax === "shurikenBindingWhenSyntaxNinjaStr") {
        shurikenBindingWhenSyntax.whenInjectedInto('Ninja');
    }
    return {
        katanaBinding: katanaBinding,
        katanaRequest: katanaRequest,
        shurikenRequest: shurikenRequest,
        shurikenBinding: shurikenBinding
    };
}
