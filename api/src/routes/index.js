const { Router } = require('express');
const getPokemon = require('../controllers/getPokemon');
const getPokemonById = require('../controllers/getPokemonById');
const postPoke = require('../controllers/postPokemon');
const getTypes = require('../controllers/getTypes');
// const { Pokemon, Type } = require('../models');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getPokemon );
router.get('/pokemons/:id', getPokemonById );
router.post('/pokemons', postPoke);
router.get('/types', getTypes);



module.exports = router;
