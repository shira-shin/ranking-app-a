import * as ReactDOM from 'react-dom';
const any = ReactDOM as any;
if (!any.preload) any.preload = () => {};
if (!any.preinit) any.preinit = () => {};
