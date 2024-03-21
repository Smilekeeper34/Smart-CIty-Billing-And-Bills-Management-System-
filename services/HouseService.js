const {House} = require ('../models/houseModel')

class HouseService {
    async getAllHouses() {
      return await House.findAll();
    }
  
    async getHouseById(houseId) {
      const house = await House.findByPk(houseId);
      if (!house) {
        throw new Error('House not found'); 
      }
      return house;
    }
  
    async createHouse(houseData) {
      return await House.create(houseData);
    }
  
    async updateHouse(houseId, houseData) {
      const house = await House.findByPk(houseId);
      if (!house) {
        throw new Error('House not found');
      }
      await house.update(houseData);
      return house; 
    }
  
    async deleteHouse(houseId) {
      const house = await House.findByPk(houseId);
      if (!house) {
        throw new Error('House not found');
      }
      await house.destroy(); 
      return true;
    }
  }
  
  module.exports = new HouseService(); 