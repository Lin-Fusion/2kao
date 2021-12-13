import { Model ,INTEGER, DATE } from "sequelize";
import { Application } from "egg";
//表名小写
class Choose extends Model { //无复数，大写首字母
  id: number
  userId: number
  courseId:number
  day:number
  time:number
  readonly createdAt: Date //驼峰写法
  readonly updatedAt: Date
  static associate:()=>any
}

export default ( app:Application )=>{
  Choose.init({
    id : {type: INTEGER , primaryKey:true , autoIncrement:true},
    userId:INTEGER,
    courseId:INTEGER,
    day:INTEGER,
    time:INTEGER,
    createdAt: DATE,
    updatedAt: DATE
  },{
    sequelize: app.model,
    modelName: 'chooses', //表名
    underscored:true
  })
  Choose.associate = ()=>{
    app.model.Choose.belongsTo(app.model.User,{foreignKey:'userId' ,as: 'user'})
    app.model.Choose.belongsTo(app.model.Course,{foreignKey:'courseId' ,as: 'course'})

  }
  return Choose
}