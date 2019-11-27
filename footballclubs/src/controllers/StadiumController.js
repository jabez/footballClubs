const Stadium = require('../models/Stadium');

module.exports = {

    async save(req, res) {

        try {
            const { name, built, capacity } = req.body;

            const stadium = await Stadium.create({
                name,
                built,
                capacity
            });

            return res.status(201).send(createStadiumResponseDto(stadium));
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },

    async findOne(req, res) {
        try {
            const { idStadium } = req.params;
            const stadium = await Stadium.findById(idStadium);

            if (!stadium) {
                return res.status(404).json({ error: 'Stadium does not exist' })
            }
            return res.status(200).send(createStadiumResponseDto(stadium));
        } catch (error) {
            return res.status(500).send({ error: err })
        }
    },

    async findAll(req, res) {
        try {
            const stadiums = await Stadium.find({});
            if (!stadiums.length) {
                return res.status(404).json({ error: 'Stadium does not exists' })
            };

            return res.status(200).json(stadiums.map(x => createStadiumResponseDto(x)));
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },

    async update(req, res) {
        try {
            const { name, built, capacity } = req.body;
            const { idStadium } = req.params;

            const stadiumUpdated = await Stadium.findByIdAndUpdate(idStadium, {
                name,
                built,
                capacity
            }, { new: true, useFindAndModify: false });

            if (!stadiumUpdated) {
                return res.status(404).json({ error: 'Stadium does not exists' })
            }
            return res.status(200).json(createStadiumResponseDto(stadiumUpdated));
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },

    async delete(req, res) {
        try {
            const { idStadium } = req.params;

            const stadium = await Stadium.findByIdAndRemove(idStadium, { useFindAndModify: false });
            if (!stadium) {
                return res.status(404).json({ error: 'Stadium does not exists' })
            }
            return res.status(200).send();
        } catch (error) {
            return res.status(500).send({ error: err })
        }
    }
};

function createStadiumResponseDto(stadium) {
    return {
        idStadium: stadium.id,
        name: stadium.name,
        built: stadium.built,
        capacity: stadium.capacity
    }
}