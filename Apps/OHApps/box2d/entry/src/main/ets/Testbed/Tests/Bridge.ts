/*
* Copyright (c) 2006-2012 Erin Catto http://www.box2d.org
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked as such, and must not be
* misrepresented as being the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/

import * as box2d from '@ohos/box2d';
import * as testbed from '../Testbed';

export class Bridge extends testbed.Test {
  public static readonly e_count = 30;

  public m_middle!: box2d.b2Body;

  constructor() {
    super();

    let ground = null;

    {
      const bd = new box2d.b2BodyDef();
      ground = this.m_world.CreateBody(bd);

      const shape = new box2d.b2EdgeShape();
      shape.Set(new box2d.b2Vec2(-40.0, 0.0), new box2d.b2Vec2(40.0, 0.0));
      ground.CreateFixture(shape, 0.0);
    }

    {
      const shape = new box2d.b2PolygonShape();
      shape.SetAsBox(0.5, 0.125);

      const fd = new box2d.b2FixtureDef();
      fd.shape = shape;
      fd.density = 20.0;
      fd.friction = 0.2;

      const jd = new box2d.b2RevoluteJointDef();

      let prevBody = ground;
      for (let i = 0; i < Bridge.e_count; ++i) {
        const bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_dynamicBody;
        bd.position.Set(-14.5 + 1.0 * i, 5.0);
        const body = this.m_world.CreateBody(bd);
        body.CreateFixture(fd);

        const anchor = new box2d.b2Vec2(-15.0 + 1.0 * i, 5.0);
        jd.Initialize(prevBody, body, anchor);
        this.m_world.CreateJoint(jd);

        if (i === (Bridge.e_count >> 1)) {
          this.m_middle = body;
        }
        prevBody = body;
      }

      const anchor = new box2d.b2Vec2(-15.0 + 1.0 * Bridge.e_count, 5.0);
      jd.Initialize(prevBody, ground, anchor);
      this.m_world.CreateJoint(jd);
    }

    for (let i = 0; i < 2; ++i) {
      const vertices = new Array();
      vertices[0] = new box2d.b2Vec2(-0.5, 0.0);
      vertices[1] = new box2d.b2Vec2(0.5, 0.0);
      vertices[2] = new box2d.b2Vec2(0.0, 1.5);

      const shape = new box2d.b2PolygonShape();
      shape.Set(vertices);

      const fd = new box2d.b2FixtureDef();
      fd.shape = shape;
      fd.density = 1.0;

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position.Set(-8.0 + 8.0 * i, 12.0);
      const body = this.m_world.CreateBody(bd);
      body.CreateFixture(fd);
    }

    for (let i = 0; i < 3; ++i) {
      const shape = new box2d.b2CircleShape();
      shape.m_radius = 0.5;

      const fd = new box2d.b2FixtureDef();
      fd.shape = shape;
      fd.density = 1.0;

      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position.Set(-6.0 + 6.0 * i, 10.0);
      const body = this.m_world.CreateBody(bd);
      body.CreateFixture(fd);
    }
  }

  public Step(settings: testbed.Settings): void {
    super.Step(settings);
  }

  public static Create(): testbed.Test {
    return new Bridge();
  }
}
