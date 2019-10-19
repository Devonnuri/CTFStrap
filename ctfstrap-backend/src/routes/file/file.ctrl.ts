import { validateBody } from './../../lib/utils';
import { Context } from 'koa';
import * as Joi from '@hapi/joi';
import { normalize } from 'path';

import File from '../../database/models/File';

export const download = async (ctx: Context) => {
  const { filename } = ctx.params;

  return File.findOne({ where: { filename } })
    .then((file) => {
      if (file.size < 1) {
        ctx.status = 404;
        ctx.body = {
          name: 'FILE_NOT_FOUND',
        };
        throw new Error();
      }
      console.log(normalize(__dirname+'/../../../'+file.path));
      ctx.status = 204;
      ctx.attachment(normalize(__dirname+'/../../../'+file.path));
    })
    .catch((e) => {
      if (!ctx.body) {
        ctx.status = 500;
      }
    })
};

export const upload = async (ctx: Context) => {
  if (ctx.file) {
    const { filename, originalname, path, size } = ctx.file;
    ctx.body = { filename, originalname, path, size };
  } else {
    ctx.status = 500;
  }
};

export const remove = async (ctx: Context) => {
  interface RemoveSchema {
    filename: string;
  }

  const schema = Joi.object().keys({
    filename: Joi.string().required()
  });

  if (!validateBody(ctx, schema)) return;

  const { filename }: RemoveSchema = ctx.request.body;
  
  return File.existsFilename(filename)
    .then(exists => {
      if (!exists) {
        ctx.status = 404;
        ctx.body = {
          name: 'FILE_NOT_FOUND',
        };
        throw new Error();
      }
      return File.removeByFilename(filename);
    })
    .then(() => {
      ctx.status = 204;
    })
    .catch(() => {
      if (!ctx.body) {
        ctx.status = 500;
      }
    })
};
