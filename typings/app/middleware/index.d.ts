// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/middleware/admin';
import ExportOffline from '../../../app/middleware/offline';
import ExportOnline from '../../../app/middleware/online';

declare module 'egg' {
  interface IMiddleware {
    admin: typeof ExportAdmin;
    offline: typeof ExportOffline;
    online: typeof ExportOnline;
  }
}
