// const axios = require('axios');
// const { Pokemon, Type } = require('../db');

// const getPokemon = async (req, res, next) => {
//     try {
//         const { name } = req.query;
//         if (name) {
//             try {
//                 const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
//                 const pokemon = {
//                     id: pokemonDetails.data.id,
//                     nombre: pokemonDetails.data.name,
//                     imagen: pokemonDetails.data.sprites.front_default,
//                     vida: pokemonDetails.data.stats.find(s => s.stat.name === 'hp').base_stat,
//                     ataque: pokemonDetails.data.stats.find(s => s.stat.name === 'attack').base_stat,
//                     defensa: pokemonDetails.data.stats.find(s => s.stat.name === 'defense').base_stat,
//                     velocidad: pokemonDetails.data.stats.find(s => s.stat.name === 'speed').base_stat,
//                     altura: pokemonDetails.data.height,
//                     peso: pokemonDetails.data.weight,
//                     tipos: pokemonDetails.data.types.map(t => t.type.name)
//                 };
//                 return res.json(pokemon);
//             } catch (error) {
//                 return res.status(404).json({ message: 'Pokémon no encontrado' });
//             }
//         } else {
//             const pokemonesBD = await Pokemon.findAll({
//                 include: Type
//             });

//             const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
//             const pokemonesAPI = await Promise.all(response.data.results.map(async (pokemon) => {
//                 const pokemonDetails = await axios.get(pokemon.url);
//                 return {
//                     id: pokemonDetails.data.id,
//                     nombre: pokemonDetails.data.name,
//                     imagen: pokemonDetails.data.sprites.front_default,
//                     vida: pokemonDetails.data.stats.find(s => s.stat.name === 'hp').base_stat,
//                     ataque: pokemonDetails.data.stats.find(s => s.stat.name === 'attack').base_stat,
//                     defensa: pokemonDetails.data.stats.find(s => s.stat.name === 'defense').base_stat,
//                     velocidad: pokemonDetails.data.stats.find(s => s.stat.name === 'speed').base_stat,
//                     altura: pokemonDetails.data.height,
//                     peso: pokemonDetails.data.weight,
//                     tipos: pokemonDetails.data.types.map(t => t.type.name)
//                 };
//             }));

//             const pokemonesCombinados = pokemonesBD.map(pokemon => ({
//                 id: pokemon.id,
//                 nombre: pokemon.name,
//                 imagen: pokemon.img,
//                 vida: pokemon.hp,
//                 ataque: pokemon.attack,
//                 defensa: pokemon.defense,
//                 velocidad: pokemon.speed,
//                 altura: pokemon.height,
//                 peso: pokemon.weight,
//                 tipos: pokemon.Types.map(type => type.name)
//             })).concat(pokemonesAPI);

//             res.json(pokemonesCombinados);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = getPokemon;
const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokemon = async (req, res, next) => {
    try {
        const { name } = req.query;
        if (name) {
            try {
                const pokemonDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                const pokemon = {
                    id: pokemonDetails.data.id,
                    name: pokemonDetails.data.name,  // 'nombre' cambiado a 'name'
                    img: pokemonDetails.data.sprites.front_default,  // 'imagen' cambiado a 'img'
                    hp: pokemonDetails.data.stats.find(s => s.stat.name === 'hp').base_stat,  // 'vida' cambiado a 'hp'
                    attack: pokemonDetails.data.stats.find(s => s.stat.name === 'attack').base_stat,  // 'ataque' cambiado a 'attack'
                    defense: pokemonDetails.data.stats.find(s => s.stat.name === 'defense').base_stat,  // 'defensa' cambiado a 'defense'
                    speed: pokemonDetails.data.stats.find(s => s.stat.name === 'speed').base_stat,  // 'velocidad' cambiado a 'speed'
                    height: pokemonDetails.data.height,  // 'altura' se mantiene
                    weight: pokemonDetails.data.weight,  // 'peso' se mantiene
                    types: pokemonDetails.data.types.map(t => t.type.name)  // 'tipos' se mantiene
                };
                return res.json(pokemon);
            } catch (error) {
                return res.status(404).json({ message: 'Pokémon not found' });  // Mensaje cambiado a inglés
            }
        } else {
            const pokemonesBD = await Pokemon.findAll({
                include: Type
            });

            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
            const pokemonesAPI = await Promise.all(response.data.results.map(async (pokemon) => {
                const pokemonDetails = await axios.get(pokemon.url);
                return {
                    id: pokemonDetails.data.id,
                    name: pokemonDetails.data.name,  // 'nombre' cambiado a 'name'
                    img: pokemonDetails.data.sprites.front_default,  // 'imagen' cambiado a 'img'
                    hp: pokemonDetails.data.stats.find(s => s.stat.name === 'hp').base_stat,  // 'vida' cambiado a 'hp'
                    attack: pokemonDetails.data.stats.find(s => s.stat.name === 'attack').base_stat,  // 'ataque' cambiado a 'attack'
                    defense: pokemonDetails.data.stats.find(s => s.stat.name === 'defense').base_stat,  // 'defensa' cambiado a 'defense'
                    speed: pokemonDetails.data.stats.find(s => s.stat.name === 'speed').base_stat,  // 'velocidad' cambiado a 'speed'
                    height: pokemonDetails.data.height,  // 'altura' se mantiene
                    weight: pokemonDetails.data.weight,  // 'peso' se mantiene
                    types: pokemonDetails.data.types.map(t => t.type.name)  // 'tipos' se mantiene
                };
            }));

            const pokemonesCombinados = pokemonesBD.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,  // 'nombre' cambiado a 'name'
                img: pokemon.img,  // 'imagen' cambiado a 'img'
                hp: pokemon.hp,  // 'vida' cambiado a 'hp'
                attack: pokemon.attack,  // 'ataque' cambiado a 'attack'
                defense: pokemon.defense,  // 'defensa' cambiado a 'defense'
                speed: pokemon.speed,  // 'velocidad' cambiado a 'speed'
                height: pokemon.height,  // 'altura' se mantiene
                weight: pokemon.weight,  // 'peso' se mantiene
                types: pokemon.Types.map(type => type.name)  // 'tipos' se mantiene
            })).concat(pokemonesAPI);

            res.json(pokemonesCombinados);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = getPokemon;

