import React from "react";
import style from './Paginated.module.css'; // Asegúrate de que la ruta sea correcta

export default function Paginated({ pokePerPage, allPokemons, paginado }) {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allPokemons / pokePerPage); i++) {
        pageNumbers.push(i + 1);
    }

    return (
        <nav className={style.pagination}>
            {pageNumbers.map(number => (
                // El elemento <li> debería estar fuera del <button> para ser semánticamente correcto
                <li key={number} className={style.pageItem}>
                    <button onClick={() => paginado(number)} className={style.btn}>
                        {number}
                    </button>
                </li>
            ))}
        </nav>
    );
}
