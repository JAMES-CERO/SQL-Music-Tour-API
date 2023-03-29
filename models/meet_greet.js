'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_greet extends Model {
   
    static associate({Band, Event}) {
      // define association here
      Meet_greet.belongsTo( Band, {
        foreignKey: 'band_id',
        as: 'band'
      })
      Meet_greet.belongsTo( Event, {
        foreignKey: 'event_id',
        as: 'event'
      })
    }
  }
  Meet_greet.init({
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    meet_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    meet_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    meet_greet_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'Meet_greet',
    tableName: 'meet_greets',
    timestamps: false
  });
  return Meet_greet;
};