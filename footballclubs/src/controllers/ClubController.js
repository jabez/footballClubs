const Club = require('../models/Club');
const Stadium = require('../models/Stadium');

module.exports = {

    async save(req, res) {
        try {
            const { fullName, country, founded, site, idStadium } = req.body;

            const stadium = await Stadium.findById(idStadium);
            if (!stadium) {
                return res.status(404).json({ error: 'Stadium does not exists' })
            }

            const club = await Club.create({
                fullName,
                country,
                founded,
                site,
                stadium: idStadium,
            });

            await club.populate('stadium').execPopulate();
            return res.status(201).send(createClubResponseDto(club));
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },

    async findOne(req, res) {
        try {
            const { idClub } = req.params;
            const club = await Club.findById(idClub);
            if (!club) {
                return res.status(404).json({ error: 'club does not exist' })
            };
            await club.populate('stadium').execPopulate();
            return res.status(200).send(createClubResponseDto(club));

        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },

    async findAll(req, res) {
        try {
            const clubs = await Club.find({}).populate('stadium').exec();
            if (!clubs.length) {
                return res.status(404).json({ error: 'Clubs does not exists' })
            };

            return res.status(200).json(clubs.map(x => createClubResponseDto(x)));
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },

    async update(req, res) {
        try {
            const { fullName, country, founded, site, idStadium } = req.body;
            const { idClub } = req.params;

            const stadium = await Stadium.findById(idStadium);
            if (!stadium) {
                return res.status(404).json({ error: 'Stadium does not exists' })
            }

            const clubUpdated = await Club.findByIdAndUpdate(idClub, {
                fullName,
                country,
                founded,
                site,
                stadium: idStadium,
            }, { new: true, useFindAndModify: false });

            if (!clubUpdated) {
                return res.status(404).json({ error: 'Club does not exists' })
            }
            await clubUpdated.populate('stadium').execPopulate();
            return res.status(200).json(createClubResponseDto(clubUpdated));
        } catch (err) {
            return res.status(500).send({ error: err })
        }
    },
    async delete(req, res) {
        try {
            const { idClub } = req.params;

            const club = await Club.findByIdAndRemove(idClub, { useFindAndModify: false });
            if (!club) {
                return res.status(404).json({ error: 'Club does not exists' })
            }
            return res.status(200).send();
        } catch (error) {
            return res.status(500).send({ error: err })
        }
    }
};

function createClubResponseDto(club) {
    return {
        idClub: club.id,
        fullName: club.fullName,
        country: club.country,
        founded: club.founded,
        site: club.site,
        stadium: {
            idStadium: club.stadium.id,
            nome: club.stadium.name,
            built: club.stadium.built,
            capacity: club.stadium.capacity
        }
    }
}