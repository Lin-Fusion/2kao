import { EggPlugin } from 'egg';

const plugin: EggPlugin = {

  sequelize:{
    enable:true,
    package:'egg-sequelize',
  },

  validate:{
    enable:true,
    package: 'egg-validate'
  }
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};

export default plugin;
