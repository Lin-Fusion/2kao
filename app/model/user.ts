import { Model,INTEGER,STRING,BOOLEAN, DATE } from "sequelize";
import { Application } from "egg";
//表名小写
class User extends Model{ //无复数，大写首字母
  id: number
  name: string
  password:string
  number:string
  admin:boolean
  readonly createdAt: Date //驼峰写法
  readonly updatedAt: Date
  static associate:()=>any
}

export default ( app:Application )=>{
  User.init({
    id : {type: INTEGER , primaryKey:true , autoIncrement:true},
    name:STRING,
    password:STRING,
    number:STRING,
    admin:BOOLEAN,
    createdAt: DATE,
    updatedAt: DATE
  },{
    sequelize: app.model,
    modelName: 'users', //表名
    underscored:true
  })
  User.associate = ()=>{
    app.model.User.hasMany(app.model.Choose,{foreignKey:'userId',as:'user'})
  }
  return User
}