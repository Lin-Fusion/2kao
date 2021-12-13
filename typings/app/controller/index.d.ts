// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin from '../../../app/controller/admin';
import ExportChoose from '../../../app/controller/choose';
import ExportCourse from '../../../app/controller/course';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    admin: ExportAdmin;
    choose: ExportChoose;
    course: ExportCourse;
    home: ExportHome;
    user: ExportUser;
  }
}
