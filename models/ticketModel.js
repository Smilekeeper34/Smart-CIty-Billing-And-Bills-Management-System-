// models/ticketModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
  ticketID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Open', 'In Progress', 'Resolved'),
    defaultValue: 'Open',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  assignee: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Admins',
      key: 'adminID',
    },
  },
});

module.exports = Ticket;
