

const { Pokemon, Type } = require('../db');

const postPoke = async (req, res) => {
    try {
        const { name, img, hp, attack, defense, speed, height, weight, types } = req.body;

        if (!name || !img || !hp || !attack || !defense || !types || !speed || !height || !weight) {
            return res.status(401).send('Faltan datos');
        }

        const tiposExistentes = await Promise.all(types.map(async (tipo) => {
            const tipoExistente = await Type.findOne({ where: { name: tipo.toLowerCase() } });
            if (!tipoExistente) {
                throw new Error(`El tipo de Pokémon ${tipo} no es válido`);
            }
            return tipoExistente;
        }));

        const existePoke = await Pokemon.findOne({ where: { name } });
        if (existePoke) return res.status(400).json({ info: "Este Pokémon ya existe" });

        const nuevoPokemon = await Pokemon.create({
            name,
            img,
            hp,
            attack,
            defense,
            speed,
            height,
            weight
        });

        await nuevoPokemon.setTypes(tiposExistentes);

        return res.status(201).json(nuevoPokemon);

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = postPoke;

