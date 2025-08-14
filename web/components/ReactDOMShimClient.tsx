'use client';
import * as ReactDOM from 'react-dom';
import { useEffect } from 'react';

export default function ReactDOMShimClient() {
  useEffect(() => {
    const any = ReactDOM as any;
    if (!any.preload) any.preload = () => {};
    if (!any.preinit) any.preinit = () => {};
  }, []);
  return null;
}
