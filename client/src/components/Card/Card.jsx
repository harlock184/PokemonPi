

// import React from "react";
// import style from './Card.module.css';
// import { Link } from "react-router-dom";

// export default function Card({ id, name, img, types, attack }) {
//   const typesDisplay = Array.isArray(types) && types.length > 0
//     ? types.join(', ')
//     : 'Ninguno';
  

//   return (
//     <div className={style.pokemonCard}>
//       <Link to={`/detail/${id}`}> 
//         <h3 className={style.pokemonName}>{name}</h3>
//       </Link>
//       <img className={style.pokemonImg} src={img} alt={name} />
//       <h5 className={style.pokemonTypes}>Type(s): {types}</h5> 
//       <h4 className={style.pokemonAttack}>Attack: {attack}</h4> 
//     </div>
//   );
// } este es un pequeño cambio para git

import React from "react";
import style from './Card.module.css';
import { Link } from "react-router-dom";

export default function Card({ id, name, img, types, attack }) {
  const typesDisplay = Array.isArray(types) && types.length > 0
    ? types.join(', ')
    : 'Ninguno';

  return (
    <div className={style.pokemonCard}>
      <Link to={`/detail/${id}`}> 
        <h3 className={style.pokemonName}>{name}</h3>
      </Link>
      <img className={style.pokemonImg} src={img} alt={name} />
      <h5 className={style.pokemonTypes}>Type(s): {typesDisplay}</h5> {/* Utiliza typesDisplay aquí */}
      <h4 className={style.pokemonAttack}>Attack: {attack}</h4> 
    </div>
  );
}
