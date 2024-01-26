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

import { injectable } from 'inversify';
import * as ERROR_MSGS from 'inversify/lib/constants/error_msgs';
import { Container } from 'inversify';
import { interfaces } from 'inversify';
import * as ns from "reflect-metadata"
ns
export default function middlewareTest() {
  describe('middlewareTest',  ()=> {
    _it('Should_be_able_to_use_middleware_as_Container_configuration', () => {

      const container = new Container();

      const log: string[] = [];

      let middleware1=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          log.push(`Middleware1: ${args.serviceIdentifier.toString()}`);
          return planAndResolve(args);
        };
      }

      container.applyMiddleware(middleware1);
      const _container = container;
      interface _middleware{ _middleware: ESObject }
      expect((_container as ESObject as _middleware)._middleware).not.to.eql(null);

    });

    _it('Should_support_middleware', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }

      const container = new Container();

      const log: string[] = [];

      let middleware1=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          log.push(`Middleware1: ${args.serviceIdentifier.toString()}`);
          return planAndResolve(args);
        };
      }

      let  middleware2=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          log.push(`Middleware2: ${args.serviceIdentifier.toString()}`);
          return planAndResolve(args);
        };
      }

      // two middlewares applied at one single point in time
      container.applyMiddleware(middleware1, middleware2);

      container.bind<Ninja>('Ninja').to(Ninja);

      const ninja = container.get<Ninja>('Ninja');

      expect(ninja instanceof Ninja).eql(true);
      expect(log.length).eql(2);
      expect(log[0]).eql('Middleware2: Ninja');
      expect(log[1]).eql('Middleware1: Ninja');

    });

    _it('Should_allow_applyMiddleware_at_multiple_points_in_time', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }

      const container = new Container();

      const log: string[] = [];

      let middleware1=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          log.push(`Middleware1: ${args.serviceIdentifier.toString()}`);
          return planAndResolve(args);
        };
      }

      let  middleware2=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          log.push(`Middleware2: ${args.serviceIdentifier.toString()}`);
          return planAndResolve(args);
        };
      }

      container.applyMiddleware(middleware1); // one point in time
      container.applyMiddleware(middleware2);  // another point in time
      container.bind<Ninja>('Ninja').to(Ninja);

      const ninja = container.get<Ninja>('Ninja');

      expect(ninja instanceof Ninja).eql(true);
      expect(log.length).eql(2);
      expect(log[0]).eql('Middleware2: Ninja');
      expect(log[1]).eql('Middleware1: Ninja');

    });

    _it('Should_use_middleware', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }

      const container = new Container();

      const log: string[] = [];

      let middleware1=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          log.push(`Middleware1: ${args.serviceIdentifier.toString()}`);
          return planAndResolve(args);
        };
      }

      let middleware2=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          log.push(`Middleware2: ${args.serviceIdentifier.toString()}`);
          return planAndResolve(args);
        };
      }

      container.applyMiddleware(middleware1, middleware2);
      container.bind<Ninja>('Ninja').to(Ninja);

      const ninja = container.get<Ninja>('Ninja');

      expect(ninja instanceof Ninja).eql(true);
      expect(log.length).eql(2);
      expect(log[0]).eql('Middleware2: Ninja');
      expect(log[1]).eql('Middleware1: Ninja');

    });

    _it('Should_be_able_to_use_middleware_to_catch_errors_during_pre_planning_phase', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }

      const container = new Container();

      const log: string[] = [];

      let middleware=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          try {
            return planAndResolve(args);
          } catch (e) {
            log.push((e as Error).message);
            return [];
          }
        };
      }

      container.applyMiddleware(middleware);
      container.bind<Ninja>('Ninja').to(Ninja);
      container.get('SOME_NOT_REGISTERED_ID');
      expect(log.length).eql(1);
      expect(log[0]).eql(`${ERROR_MSGS.NOT_REGISTERED} SOME_NOT_REGISTERED_ID`);

    });

    _it('Should_be_able_to_use_middleware_to_catch_errors_during_planning_phase', () => {

      interface Warrior { }

      @injectable()
      class Ninja implements Warrior { }

      @injectable()
      class Samurai implements Warrior { }

      const container = new Container();

      const log: string[] = [];

      let middleware=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          try {
            return planAndResolve(args);
          } catch (e) {
            log.push((e as Error).message);
            return [];
          }
        };
      }

      container.applyMiddleware(middleware);
      container.bind<Warrior>('Warrior').to(Ninja);
      container.bind<Warrior>('Warrior').to(Samurai);

      container.get('Warrior');
      expect(log.length).eql(1);
      expect(log[0]).to.contain(`${ERROR_MSGS.AMBIGUOUS_MATCH} Warrior`);

    });

    _it('Should_be_able_to_use_middleware_to_catch_errors_during_resolution_phase', () => {

      interface Warrior { }

      const container = new Container();

      const log: string[] = [];

      let middleware=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          try {
            return planAndResolve(args);
          } catch (e) {
            log.push((e as Error).message);
            return [];
          }
        };
      }

      container.applyMiddleware(middleware);
      container.bind<Warrior>('Warrior'); // Invalid binding missing BindingToSyntax

      container.get('Warrior');
      expect(log.length).eql(1);
      expect(log[0]).eql(`${ERROR_MSGS.INVALID_BINDING_TYPE} Warrior`);

    });

    _it('Should_help_users_to_identify_problems_with_middleware', () => {

      const container = new Container();

      let middleware=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          try {
            return planAndResolve(args);
          } catch (e) {
            // missing return!
          }
        };
      }

      container.applyMiddleware(middleware);
      const throws = () => { container.get('SOME_NOT_REGISTERED_ID'); };
      expect(throws).to.throw(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);

    });

    _it('Should_allow_users_to_intercept_a_resolution_context', () => {

      interface Ninja1 { }

      @injectable()
      class Ninja implements Ninja1 { }

      const container = new Container();

      const log: string[] = [];

      let middleware1=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          const nextContextInterceptor = args.contextInterceptor;
          args.contextInterceptor = (context: interfaces.Context) => {
            log.push(`contextInterceptor1: ${args.serviceIdentifier.toString()}`);
            return nextContextInterceptor !== null ? nextContextInterceptor(context) : context;
          };
          return planAndResolve(args);
        };
      }

      let middleware2=(planAndResolve: interfaces.Next): interfaces.Next=> {
        return (args: interfaces.NextArgs) => {
          const nextContextInterceptor = args.contextInterceptor;
          args.contextInterceptor = (context: interfaces.Context) => {
            log.push(`contextInterceptor2: ${args.serviceIdentifier.toString()}`);
            return nextContextInterceptor !== null ? nextContextInterceptor(context) : context;
          };
          return planAndResolve(args);
        };
      }

      container.applyMiddleware(middleware1, middleware2);
      container.bind<Ninja>('Ninja').to(Ninja);

      const ninja = container.get<Ninja>('Ninja');

      expect(ninja instanceof Ninja).eql(true);
      expect(log.length).eql(2);
      expect(log[0]).eql('contextInterceptor1: Ninja');
      expect(log[1]).eql('contextInterceptor2: Ninja');

    });
  })
}