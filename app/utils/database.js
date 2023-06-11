const { Sequelize } = require('sequelize');

const databaseUrl = 'postgres://dbshop_user:h6fqbd1FfygO8rbF9xoMeYQDZGig799X@dpg-ci2pbdrhp8u1a1bh96r0-a.oregon-postgres.render.com/dbshop';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;