import { CookieOptions } from 'express-serve-static-core';

export const cookieConfig: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
};

export const GET_POSTS_CACHE_KEY = 'GET_POSTS_CACHE';
