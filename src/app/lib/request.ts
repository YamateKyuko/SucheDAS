import 'server-only';

import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getRequest, getResponse, isResponse } from '../api/common/types';

// Be careful with the type. ____________________________________________________

// type getResponse = { [key: string]: unknown };

export async function Requester<P extends getRequest, T extends getResponse | getResponse[]>(
  endpoint: string,
  payload: P,
  isArrayT?: T extends getResponse[] ? true : false
): Promise<T | undefined> {
  const isArray = (isArrayT == undefined ? true : isArrayT) as (T extends getResponse[] ? true : false);
  const secret = process.env.API_KEY || '';
  const token = jwt.sign(payload || {}, secret);
  try {
    const response = await axios.get(
      getPath(endpoint),
      {headers: {'Authorization': `Bearer ${token}`}}
    );

    // console.log('response.ts');
    // console.log(response.data);

    const data = response.data;
    if (isArray === false) return isResponse(data, endpoint) ? data as T : undefined;
    if (!isArr(data)) return undefined;

    const rows: unknown[] = [];
    data.forEach((row) => {
      if (isResponse(row, endpoint)) {
        rows.push(row);
      };
    });
    return rows as T;
  } catch (error) {
    console.log(error);
    return undefined;
  };
};

const isArr = (arr: unknown): arr is unknown[] => {
  return Array.isArray(arr);
};
const getPath = (path: string) => {
  return process.env.VERCEL_URL + path;
};

