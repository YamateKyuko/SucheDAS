import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const apiKey = process.env.MANAGE_KEY || '';

export function authenticate(req: Request, func: (val: queryParam) => Promise<NextResponse>) {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    return NextResponse.json({ error: 'without authorization header' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'without token' }, { status: 401 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'without api key' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, apiKey);
    if (isObject(decoded)) {
      return func(decoded);
    }
    return NextResponse.json({ error: 'wrong key' }, { status: 401 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'error' }, { status: 401 });
  }
};

export type queryParam = {[key: string]: string | undefined};
const isObject = (x: unknown): x is queryParam =>
  x !== null && (typeof x === 'object' || typeof x === 'function')
