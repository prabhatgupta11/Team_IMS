const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const StateMaster = sequelize.define('state_Master', {
    id: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    Code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    DisplayOrder: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM('Active', 'Inactive'), 
      defaultValue: 'Active',
    },
    created_by: {
      type: DataTypes.STRING(255),
    },
    created_on: {
      type: DataTypes.DATE,
    },
    edit_by: {
      type: DataTypes.STRING(255),
    },
    edit_on: {
      type: DataTypes.DATE,
    },
    approve_b: {
      type: DataTypes.BOOLEAN,
    },
    approved_by: {
      type: DataTypes.STRING(255),
    },
    // displayorder: {
    //   type: DataTypes.INTEGER,
    // },
    rowguid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  });

  return StateMaster;
};