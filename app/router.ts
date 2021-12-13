import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const online = app.middleware.online
  const admin = app.middleware.admin
  router.get('/', controller.home.index);
  router.post('/api/register',controller.user.register);
  router.post('/api/login',controller.user.login);
  router.delete('/api/logout',controller.user.logout);
  router.get('/api/course',online,controller.course.get);
  router.post('/api/course/select',online,controller.choose.select);
  router.delete('/api/course/delete/:cid',online,controller.choose.delete);
  router.get('/api/shedule',online,controller.choose.schedule);
  router.get('/api/admin/userlist',admin,controller.admin.userlist);
  router.post('/api/admin/addcourse',admin,controller.admin.addcourse);
  router.delete('/api/admin/delete/course/:id',admin,controller.admin.delete);
  router.get('/api/admin/schedule/user',admin,controller.admin.schedule);
  router.put('/api/admin/changeinfo',admin,controller.admin.changeInfo);
  
};
