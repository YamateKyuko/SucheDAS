'use client';

import styles from './ui.module.css'
import { useSearchParams, usePathname, useRouter, useParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search(props: { placeholder: string, paramName: string, debounce?: number, isDynamic?: boolean }) {
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const setParam = (term: string) => {
    if (props.isDynamic) {
      const param = params[props.paramName];
      const pathArr = pathname.split('/');
      if (pathArr.pop() != param) return;
      if (term) replace(`${pathArr.join('/')}/${term}`);
      else replace(pathArr.join('/'));
    } else {
      const params = new URLSearchParams(searchParams);
      if (term) params.set(props.paramName, term);
      else params.delete(props.paramName);
      replace(`${pathname}?${params.toString()}`);
    };
  };
  const handleSearch = useDebouncedCallback(setParam, props.debounce || 500);

  return (
    <ul>
      <li className={styles.searchbox}>
        <input
          type='text' 
          placeholder={props.placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          pattern="/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}\p{Script=Latin}\p{General_Category=Decimal_Number}]+$/u"
          defaultValue={
            props.isDynamic
              ? params[props.paramName]
              : searchParams.get(props.paramName)?.toString()
          }
        >
        </input>
      </li>
    </ul>
  );
};

// {searchParams.get(queryName)?.toString()}
