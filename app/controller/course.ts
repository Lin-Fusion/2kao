import { Controller } from 'egg';

export default class CourseController extends Controller {
  public async get() {
    const { ctx } = this;
    const {Course} = ctx.model;
    const {limit,page} = ctx.query;
    let limit1:number,page1:number;
    try{
    limit1 = parseInt(limit);
    page1 = parseInt(page);
    let total = await Course.count();
    let list = await Course.findAll({
      limit:limit1,
      offset:(page1-1)*limit1,
      attributes:['id','name','capacity','number','day','time']     
    });
    ctx.body = {
      "success":true,
      "data":{
        "total":total,
        "list":list,
      }
    }
    }catch(e){
      ctx.service.error.error('参数错误');
      return
    }
    
    
  }


}
