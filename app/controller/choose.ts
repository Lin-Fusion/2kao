import { Controller } from 'egg';

export default class ChooseController extends Controller {
  
  public async schedule() {
    const { ctx } = this;
    const {limit,page} = ctx.query;
    let limit1:number,page1:number;
    let id = ctx.session.id;
   try{ 
    limit1 = parseInt(limit);
    page1 = parseInt(page);
    if((limit1<=0)||(page1<=0)){
      ctx.service.error.error('参数错误')
    }
    let {count,rows} = await ctx.model.Choose.findAndCountAll({
      where:{user_id:id},
      limit:limit1,
      offset:(page1-1)*limit1,
      attributes:["id","courseId","userId","day","time"],
      include:{
        model:ctx.model.Course,
        as:'course',
        attributes:['id','name','capacity','number','day','time']
      }
    })
    ctx.body = {
      "success":true,
      "data":{
        "total":count,
        "list":rows
      }
    }
    }catch(e){
      ctx.service.error.error('参数错误')
    }


  }
  public async select(){
    const { ctx } = this ;
    const { Choose } = ctx.model;
    const { Course } = ctx.model;
    let id = ctx.session.id;
    const {courseId,day,time} = ctx.request.body;
    try {
      ctx.validate({
        courseId:{type:'number',min:1},
        day:{type:'number',min:1},
        time:{type:'number',min:1},
      })
    } catch (error) {
      ctx.service.error.error("参数错误")
      return
    }
    let course = await Choose.findOne({
      where: {
        user_id:id,
        course_id:courseId
      }
    })
    let schedule = await Choose.findOne({
      where: {
        user_id:id,
        day:day,
        time:time
      }
    })

    let exist = await Course.findOne({
      where:{
        id:courseId,
        day:day,
        time:time
      }
    })
    if(exist){
    }else{
      ctx.service.error.error('课程不存在')
      return
    }

    let {number,capacity} = exist;

    if((capacity-number)<=0){
      ctx.service.error.error('该课已满')
      return
    }

    if(course){
      ctx.service.error.error('课程已选')
      return
    }else{
      if(schedule){
        ctx.service.error.error('时间冲突')
        return
      }else{
        Choose.create({
          userId:id,
          courseId:courseId,
          day:day,
          time:time
        })
        ctx.body={
          "success":true
        }
        await Course.increment('number',{where:{'id':courseId}})
      }
    }
  }
  
  public async delete(){
    const { ctx } = this ;
    const { Choose } = ctx.model;
    const { Course } = ctx.model;
    const id = ctx.session.id;
    let {cid} = await ctx.params;
    let chooseId = parseInt(cid)
    if(isNaN(chooseId)){
      ctx.service.error.error('参数错误')
      return
    }  
    let course = await Choose.findByPk(cid);
    if(course){
      await Choose.destroy({
        where:{
          user_id:id,
          id:cid
        }
      })
      ctx.body={
        "success":true
      }
      let {courseId} = course;
      await Course.decrement('number',{where:{'id':courseId}})
    }else{
      ctx.service.error.error('未选此课')
    }
    }



}