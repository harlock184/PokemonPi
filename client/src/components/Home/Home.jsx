import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPokemons,
    getTypes,
    filterPokemonsByType,
    orderPokeByAttack,
    orderPokeByName,
    filterCreated
} from '../../Redux/actions';
import Card from '../Card/Card';
import style from './Home.module.css';
import Paginated from "../Paginated/Paginated";

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemones);
    const createdPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types);

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(10);
    const [filter, setFilter] = useState('All');

    // useEffect(() => {
    //     if (!types.length) dispatch(getTypes());
    //     dispatch(getPokemons());
    // }, [dispatch, types.length]);
    useEffect(() => {
        if (!types.length) dispatch(getTypes());
        if (!allPokemons.length) dispatch(getPokemons());
    }, [dispatch, types.length, allPokemons.length]);
    

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = filter === 'created' ?
        createdPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) :
        allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function handleFilterByType(e) {
        dispatch(filterPokemonsByType(e.target.value));
        setCurrentPage(1);
        setFilter('All');
    }

    function handleSortByName(e) {
        dispatch(orderPokeByName(e.target.value));
        setCurrentPage(1);
    }

    function handleSortByAttack(e) {
        dispatch(orderPokeByAttack(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setFilter(e.target.value);
    }

    return (
        <div className={style.body}>
            <h1>POKEMONES</h1>

            {/* Filters and sorting options */}
            <select onChange={handleFilterByType}>
                <option value="All">Todos los tipos</option>
                {types.map((type, index) => (
                    <option key={index} value={type.name}>{type.name}</option>
                ))}
            </select>

            <select onChange={handleSortByName}>
                <option value="">Ordenar por nombre...</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>

            <select onChange={handleSortByAttack}>
                <option value="">Ordenar por ataque...</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
            </select>

            <select onChange={handleFilterCreated}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">API</option>
            </select>

            <Paginated
                pokePerPage={pokemonsPerPage}
                allPokemons={filter === 'created' ? createdPokemons.length : allPokemons.length}
                paginado={paginado}
            />

        
            <div className={style.cardContainer}>
                 {currentPokemons.map((pokemon) => (
                    <Card
                       key={pokemon.id}
                       id={pokemon.id}
                       name={pokemon.name ? pokemon.name.toUpperCase() : 'Desconocido'}
                       attack={pokemon.attack || 'Desconocido'}
                       img={pokemon.img || 'URL de imagen predeterminada'}
                     types={pokemon.types && pokemon.types.length > 0 ? pokemon.types.join(' - ') : 'Ninguno'}
                         />
               ))}
             </div>
        </div>
    );
}
