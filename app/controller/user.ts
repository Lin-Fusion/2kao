import { Controller } from 'egg';

export default class UserController extends Controller {
  public async register() {
    const { ctx } = this;
    try{ctx.validate({
        name:{type:'string',max:20},
        number:{type:'string',max:20},
        password:{type:'string',max:20},
    })
  } catch (error) {
    ctx.body={
      "success":false,
      "error":"不合法的输入",
    }
    return
  }
    const { number,name,password } = ctx.request.body;
    const { User }=ctx.model;
    let user = await User.findOne({
      where: {number:number}
    })
    if(user){
      ctx.body = {
        "success":false,
        "error":"用户已存在",
      }
    }else{
      let user1 = await User.create({
        number:number,
        name:name,
        password:password,
        admin:false,
      })
      ctx.body={
        "success" : true,
        "data":{
          "userId":user1.id,
          "number":number,
          "name":name,
        }
      }
      ctx.session.id = user1.id;
    }
  }
  public async login() {
    const { ctx } = this;
    try{ctx.validate({
      number:{type:'string',max:20},
      password:{type:'string',max:20},
      })
    } catch (error) {
        ctx.body={
          "success":false,
          "error":"无效输入",
      }
        return
    }
    const { User }=ctx.model;
    const {number,password}=ctx.request.body;
    let user = await User.findOne({
      where:{
        number:number,
        password:password,
      }
    })
    if(user){
      ctx.body={
        "success" : true,
        "data":{
          "userId":user.id,
          "number":number,
          "name": user.name,
        }
      }
      ctx.session.id=user.id;
    }else{
      ctx.body = {
        "success":false,
        "error":"学号或密码错误"
      }
    }
  }
  public async logout() {
    const { ctx } = this;
    if(ctx.session.id){
      ctx.body={
        "success": true,
        "data": {
          "login": true, 
        }
      }
    ctx.session = null;
    }else{
      ctx.body={
        "success": true,
        "data": {
          "login": false, 
        }
      }

    }
  }


}


  

