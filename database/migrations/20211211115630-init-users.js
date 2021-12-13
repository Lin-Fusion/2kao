'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const{ INTEGER,STRING,DATE,BOOLEAN } = Sequelize
    
    await queryInterface.createTable('users',{
      id:{ type:INTEGER, primaryKey:true, autoIncrement:true },
      name:STRING,
      password:STRING,
      number:STRING,
      admin:BOOLEAN,
      updated_at:DATE,
      created_at:DATE
    })
    
    await queryInterface.createTable('courses',{
      id:{ type:INTEGER, primaryKey:true, autoIncrement:true },
      name:STRING,
      day:INTEGER,
      time:INTEGER,
      capacity:INTEGER,
      number:INTEGER,
      updated_at:DATE,
      created_at:DATE
    })

    await queryInterface.createTable('chooses',{
      id:{ type:INTEGER, primaryKey:true, autoIncrement:true },
      user_id:INTEGER,
      course_id:INTEGER,
      day:INTEGER,
      time:INTEGER,
      updated_at:DATE,
      created_at:DATE
    })

    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
