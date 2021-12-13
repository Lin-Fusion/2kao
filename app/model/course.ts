import { Model,INTEGER,STRING, DATE } from "sequelize";
import { Application } from "egg";
//表名小写
class Course extends Model{ //无复数，大写首字母
  id: number
  name: string
  day:number
  time:number
  capacity:number
  number:number
  readonly createdAt: Date //驼峰写法
  readonly updatedAt: Date
  static associate:()=>any

}



export default ( app:Application )=>{
  Course.init({
    id : {type: INTEGER , primaryKey:true , autoIncrement:true},
    name:STRING,
    day:INTEGER,
    time:INTEGER,
    capacity:INTEGER,
    number:INTEGER,
    createdAt: DATE,
    updatedAt: DATE
  },{
    sequelize: app.model,
    modelName: 'courses', //表名
    underscored:true
  })

  Course.associate = ()=>{
    app.model.Course.hasMany(app.model.Choose,{foreignKey:'courseId' ,as: 'course'})

  }

  return Course
}