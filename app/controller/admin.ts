import { Controller } from 'egg';

export default class AdminController extends Controller {
  public async userlist() {
    const { ctx } = this;
    const {User} = ctx.model;
    const {limit,page} = ctx.query;
    let limit1:number,page1:number;
    try{
    limit1 = parseInt(limit);
    page1 = parseInt(page);
    let total = await User.count();
    let list = await User.findAll({
      limit:limit1,
      offset:(page1-1)*limit1,
      attributes:['id','name','number',]     
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

  public async addcourse() {
    const { ctx } = this;
    try{ctx.validate({
        name:'string',
        capacity:'number',
        day:'number',
        time:'number'
    })} catch (error) {
    ctx.body={
      "success":false,
      "error":"不合法的输入",
    }
    return
    }
    const { capacity,name,day,time } = ctx.request.body;
    if((day>7)||(day<1)){
      ctx.service.error.error('天数无效')
      return
    }
    if((time>5)||(time<1)){
      ctx.service.error.error('时间无效')
      return
    }
    const { Course }=ctx.model;
    let course = await Course.create({
        name:name,
        capacity:capacity,
        day:day,
        time:time,
        number:0,
      })
      ctx.body={
        "success" : true,
        "data":{
          "id":course.id,
        }
      }

  }

  public async delete(){
    const { ctx } = this ;
    const { Course } = ctx.model;
    let {id} = await ctx.params;
    let cid = parseInt(id)
    if(isNaN(cid)){
      ctx.service.error.error('参数错误')
      return
    }  
    let course = await Course.findByPk(cid);
    if(course){
      await Course.destroy({
        where:{
          id:cid,
        }
      })
      ctx.body={
        "success":true
      }
    }else{
      ctx.service.error.error('此课不存在')
    }
    }

  public async schedule() {
  const { ctx } = this;
  const {limit,page,userId} = ctx.query;
  let limit1:number,page1:number;
  try{ 
  limit1 = parseInt(limit);
  page1 = parseInt(page);
  let id = parseInt(userId);
  let {count,rows} = await ctx.model.Choose.findAndCountAll({
    where:{user_id:id},
    limit:limit1,
    offset:(page1-1)*limit1,
    attributes:["id","courseId","userId","day","time"],
    include:{
      model:ctx.model.Course,
      as:'course',
      attributes:['id','name','capacity','number']
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

  public async course() {
    const { ctx } = this;
    const {limit,page,courseId} = ctx.query;
    let limit1:number,page1:number;
    try{ 
    limit1 = parseInt(limit);
    page1 = parseInt(page);
    let id = parseInt(courseId);
    let {count,rows} = await ctx.model.Choose.findAndCountAll({
      where:{course_id:id},
      limit:limit1,
      offset:(page1-1)*limit1,
      attributes:["id","courseId","userId"],
      include:{
        model:ctx.model.User,
        as:'user',
        attributes:['number','name']
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

  public async changeInfo() {
    const { ctx } = this;
    const {courseId,name,day,time,capacity,number} = ctx.request.body;
    try {
      ctx.validate({
        courseId:"number"
      })
    } catch (error) {
      ctx.service.error.error('参数错误')
      return
    }
    let course =await ctx.model.Course.findByPk(courseId)
    if(course){
      try{ 
        if(name){course.name = name}
        if(day){
          if((day<=7)&&(day>=1)){course.day = day}else{ctx.service.error.error('天数无效')}}  
        if(time){
          if((time<=5)&&(time>=1)){course.time = time}else{ctx.service.error.error('时间无效')}}
        if(capacity){course.capacity = capacity}
        let cap = course.capacity
        if(number){if((number<=cap)&&(number>=0)){course.number = number}else{ctx.service.error.error('已选课数量无效')}}
        course.save()
        ctx.body = {
          "success":true
        }
      }catch(e){
        ctx.service.error.error('未知错误')
        }
    }
  }

}
