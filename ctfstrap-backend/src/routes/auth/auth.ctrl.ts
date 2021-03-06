import { Context } from 'koa';
import Joi from '@hapi/joi';
import { generateToken } from '../../lib/token';
import { validate } from '../../lib/crypto';
import { validateBody } from '../../lib/utils';
import User from '../../database/models/User';

export const login = async (ctx: Context) => {
  interface LoginSchema {
    name: string;
    password: string;
  }

  const schema = Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return null;

  const { name, password }: LoginSchema = ctx.request.body;

  return User.findAny(name, name)
    .then(user => {
      if (!user || !validate(password, user.password)) {
        ctx.status = 403;
        ctx.body = {
          name: 'WRONG_CREDENTIALS',
        };

        throw new Error();
      }
      return user;
    })
    .then(user => {
      const { id, email, username, admin } = user;
      ctx.body = {
        id,
        email,
        username,
        admin,
      };
      return generateToken(id, email, admin);
    })
    .then(accessToken => {
      ctx.cookies.set('access_token', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    })
    .catch(() => {
      if (!ctx.body) {
        ctx.status = 500;
      }
    });
};

export const logout = async (ctx: Context) => {
  ctx.cookies.set('access_token', null, {
    maxAge: 0,
    httpOnly: true,
  });
  ctx.status = 204;
};

export const register = async (ctx: Context) => {
  interface RegisterSchema {
    username: string;
    email: string;
    password: string;
  }

  const schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  });

  if (!validateBody(ctx, schema)) return null;

  const { username, email, password }: RegisterSchema = ctx.request.body;

  return User.findAny(username, email)
    .then(user => {
      if (user) {
        ctx.status = 409;
        ctx.body = {
          key: user.email === email ? 'email' : 'username',
        };

        throw new Error();
      }
    })
    .then(() => User.register(username, email, password))
    .then(({ id }) => {
      ctx.body = { id, email, username };

      return generateToken(id, email, false);
    })
    .then(accessToken => {
      ctx.cookies.set('access_token', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    })
    .catch(error => {
      if (error.message) {
        ctx.status = 400;
        ctx.body = {
          name: 'WRONG_SCHEMA',
          payload: error.message,
        };
      }
    });
};

export const check = async (ctx: Context) =>
  User.findById(ctx.state.userId)
    .then(({ id, email, username, admin }) => {
      ctx.body = {
        id,
        email,
        username,
        admin,
      };
    })
    .catch(() => {
      ctx.status = 403;
      ctx.body = {
        name: 'WRONG_CREDENTIALS',
      };
    });
