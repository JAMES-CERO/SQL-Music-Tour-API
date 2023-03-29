'use strict';
const {
  Model
} = require('sequelize');
const meet_greet = require('./meet_greet');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
 
    static associate({Stage, Stage_event, Meet_greet}) {
      // define association here
      Event.belongsToMany( Stage, {
        foreignKey: 'event_id',
        as: 'stages',
        through: 'Stage_event'
      })
      Event.hasMany(Meet_greet, {
        foreignKey: 'event_id',
        as: 'meet_greets'
      })
    }
  }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
  });
  return Event;
};