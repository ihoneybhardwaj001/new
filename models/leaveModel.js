const {Sequelize, DataTypes } = require('sequelize');

const sequelize = require("../config/db");

const Leave = sequelize.define ('Leave', {

    casual_leave : {
        type : DataTypes.INTEGER,
    },

    onDuty_leave : {
        type : DataTypes.INTEGER,
    },

    withoutPay_leave : {
        type : DataTypes.INTEGER
    },

    empl_id : {
        type : DataTypes.STRING,
        primaryKey : true
    },
},
   {
    timestamps : false,
    freezeTableName : true
   });
   
   Leave.sync({force : false});

   module.exports = Leave;