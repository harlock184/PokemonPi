
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import style from './Cards.module.css';

export default function Cards() {
  const pokemones = useSelector((state) => state.pokemones);
  console.log(pokemones); // Inspecciona los pokemones y sus tipos


  const pokeCards = pokemones.map((pokemon) => {
    // Verifica si 'types' es un arreglo de objetos y extrae 'name', de lo contrario, usa 'join' directamente
    const typesDisplay = Array.isArray(pokemon.types) && pokemon.types.length > 0 && typeof pokemon.types[0] === 'object' 
      ? pokemon.types.map(type => type.name).join(' - ')
      : pokemon.types.join(' - ');

    return (
      <Card
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        attack={pokemon.attack}
        types={typesDisplay}
        img={pokemon.img}
      />
    );
  });

  return <div className={style.divCards}>{pokeCards}</div>;
}

