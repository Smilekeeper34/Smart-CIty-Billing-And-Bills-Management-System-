const { DataTypes, Sequelize, Model } = require("sequelize");
const sequelize = require("../config/database"); 

const House = sequelize.define(
  "House",
  {
    houseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    houseNumber: {
      type: DataTypes.STRING(20), 
      allowNull: false
    },
    streetName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    suburb: {
      type: DataTypes.STRING(100),
      allowNull: false 
    }, 
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Smartcity" 
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "ZIM"
    },
    customerId: {  
      type: DataTypes.STRING(8), 
      allowNull: false,
      references: {
        model: 'customers', 
        key: 'customer_id_string'
      }
    }
  },
  {
      tableName: "houses" 
  }
);

House.associate = (models) => {
    House.belongsTo(models.Customer, {
      foreignKey: 'customerId'
    });
  };

  module.exports = {
    House: House
  };
