const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require("../config/db");

const Sys_Assets = sequelize.define('Sys_Assets', {
    product_description : {
        type : DataTypes.STRING    
    },

    product_type : {
        type : DataTypes.STRING
    },

    serial_number : {
        type : DataTypes.STRING,
        primaryKey : true
    },

    other_code : {
        type : DataTypes.STRING
    },

    product_config : {
        type : DataTypes.STRING
    },

    purchase_date : {
        type : DataTypes.DATEONLY
    },

    sticker_code : {
        type : DataTypes.STRING
    },

    alloted_to : {
        type : DataTypes.STRING
    },

    empl_id : {
        type : DataTypes.STRING
    },

    allotment_date : {
        type : DataTypes.DATEONLY
    },

    asset_status : {
        type : DataTypes.STRING
    },

    remarks : {
        type : DataTypes.STRING
    },
},
   {
    timestamps : false,
    freezeTableName : true
   });

   Sys_Assets.sync({force : false});

   module.exports = Sys_Assets;