import crypto from 'crypto';

export const createSalt = (length: number) =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);

export const hash = (plain: string, salt: string = createSalt(16)) =>
  `${crypto
    .createHmac('sha256', salt)
    .update(plain)
    .digest('hex')}.${salt}`;

export const validate = (password: string, hashed: string) =>
  hash(password, hashed.split('.')[1]) === hashed;
