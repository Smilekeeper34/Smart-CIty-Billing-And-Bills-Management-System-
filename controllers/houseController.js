const HouseService = require('../services/HouseService');

class HouseController {
    async getAllHouses(req, res) {
        try {
            const houses = await HouseService.getAllHouses();
            res.json(houses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getHouseById(req, res) {
        try {
            const houseId = req.params.houseId;
            const house = await HouseService.getHouseById(houseId);
            res.json(house);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async createHouse(req, res) {
        try {
            const houseData = req.body;
            const newHouse = await HouseService.createHouse(houseData);
            res.status(201).json(newHouse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateHouse(req, res) {
        try {
            const houseId = req.params.houseId;
            const houseData = req.body;
            const updatedHouse = await HouseService.updateHouse(houseId, houseData);
            res.json(updatedHouse);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteHouse(req, res) {
        try {
            const houseId = req.params.houseId;
            await HouseService.deleteHouse(houseId);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new HouseController();
