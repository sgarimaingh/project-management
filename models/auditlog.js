const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class AuditLog extends Model {}

AuditLog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  action: {
    type: DataTypes.STRING,
  },
  entity: {
    type: DataTypes.STRING,
  },
  entity_id: {
    type: DataTypes.INTEGER,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'AuditLog',
});

module.exports = AuditLog;
