import { Context } from "egg";

export default async function (ctx:Context, next: ()=> Promise<any>) {
  if( ctx.session.id ) {
    let id = ctx.session.id
    let user = await ctx.model.User.findOne({
      where:{id:id}
    })
    if(user){
    let {admin} = user
    if(admin){
      await next();
    }else{
      ctx.body = {
        "success": false,
        "error": '无权限查看'
      }
    }
    }
  } else {
    ctx.body = {
      "success": false,
      "error": '未登录'
    }
  }
}