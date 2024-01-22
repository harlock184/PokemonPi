
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDetail } from '../../Redux/actions';
import { NavLink } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    useEffect(() => {
        if (id) {
            setLoading(true); // Inicia la carga
            dispatch(getDetail(id))
                .then(() => setLoading(false)) // Finaliza la carga si tiene éxito
                .catch((error) => {
                    console.error('Error al cargar detalles:', error);
                    setLoading(false); // Finaliza la carga si hay un error
                });
        }
    }, [dispatch, id]);

    if (loading) {
        return <div>Cargando...</div>; // Muestra esto mientras se cargan los datos
    }

    if (!detail || Object.keys(detail).length === 0) {
        return <div>Error: No se pudo cargar el detalle del Pokémon o el ID es inválido.</div>;
    }

    return (
        <div>
            <h1>ID: {detail.id}</h1>
               
                
            <h2>{detail.name}</h2>
           
            <p>Vida: {detail.hp}</p>
            <p>Ataque: {detail.attack}</p>
            <p>Defensa: {detail.defense}</p>
            <p>Velocidad: {detail.speed}</p>
            <p>Altura: {detail.height}</p>
            <p>Pesos: {detail.weight}</p>
            <p>Tipo: {detail.types.join (' - ')}</p>
            <img src={detail.front_default} alt={detail.name} />
            <NavLink to="/home">
                 <button>Volver</button>
            </NavLink>
            
           

            
            
            
        </div>
    );
};

export default Detail;

