

import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postPoke } from '../../Redux/actions';
import validate from "./validations";
import style from '../CreatePokemon/Create.module.css';

export default function CreatePokemon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tiposDisponibles = useSelector((state) => state.types);
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        types: []
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);
    // useEffect(() => {
    //     dispatch(getTypes());

    //     // Datos de prueba para enviar a la acción postPoke
    //     const testPokemon = {
    //         name: "TestPokemon",
    //         img: "https://fs-prod-cdn.nintendo-europe.com/media/images/08_content_images/news_5/2016_1/august_10/CI7_PokemonFeatureNews_Charmander.jpg",
    //         hp: 50,
    //         attack: 60,
    //         defense: 70,
    //         speed: 80,
    //         height: 10,
    //         weight: 100,
    //         types: ["fire"]
    //     };

    //     // Despachar la acción postPoke con los datos de prueba
    //     dispatch(postPoke(testPokemon));

    // }, [dispatch]);


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelect = (e) => {
        const newType = e.target.value;
        if (!input.types.includes(newType)) {
            setInput(prevInput => ({
                ...prevInput,
                types: [...prevInput.types, newType]
            }));
        }
    };

    const handleDelete = (type) => {
        
        setInput({
            ...input,
            types: input.types.filter(t => t !== type)
        });
    };

    const handleSubmit = (e) => {
        console.log(input)
        e.preventDefault();
        const errors = validate(input);
        if (Object.keys(errors).length === 0) {
            dispatch(postPoke(input));
            alert('Pokémon creado!');
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                img: '',
                types: []
            });
            navigate('/home');
        } else {
            alert("Por favor, corrige los siguientes errores:\n" + JSON.stringify(errors));
        }
    };

    return (
        <div className={style.body}>
            <NavLink to="/home">
                <button className={style.btnVolver}>Volver</button>
            </NavLink>
            <h1 className={style.title}>Crea tu Pokémon</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.pokemonCard}>
                    {/* Campos del formulario aquí */}
                    {/* Nombre */}
                    <div>
                        <label>Nombre:</label>
                        <input type="text" name="name" value={input.name} onChange={handleChange} />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    {/* Vida */}
                    <div>
                        <label>Vida (HP):</label>
                        <input type="number" name="hp" value={input.hp} onChange={handleChange} />
                        {errors.hp && <p className="error">{errors.hp}</p>}
                    </div>

                    {/* Ataque */}
                    <div>
                        <label>Ataque:</label>
                        <input type="number" name="attack" value={input.attack} onChange={handleChange} />
                        {errors.attack && <p className="error">{errors.attack}</p>}
                    </div>

                    {/* Resto de los campos */}
                    <div>
                       <label>Defensa:</label>
                       <input type="number" name="defense" value={input.defense} onChange={handleChange} />
                       {errors.defense && <p className="error">{errors.defense}</p>}
                    </div>

                    <div>
                        <label>Velocidad:</label>
                        <input type="number" name="speed" value={input.speed} onChange={handleChange} />
                        {errors.spped && <p className="error">{errors.spped}</p>}
                    </div>
                    
                    <div>
                      <label>Altura:</label>
                      <input type="number" name="height" value={input.height} onChange={handleChange} />
                      {errors.height && <p className="error">{errors.height}</p>}
                    </div>

                    {/* Repetir para los demás campos (hp, attack, defense, etc.) */}

                    <div className={style.divInput}>
                        {/* Añade los campos de hp, attack, defense, etc. aquí, siguiendo el mismo patrón que el campo 'name' */}
                    </div>
                    <div>
                      <label>Peso:</label>
                      <input type="number" name="weight" value={input.weight} onChange={handleChange} />
                      {errors.weight && <p className="error">{errors.weight}</p>}
                    </div>

                    {/* Imagen */}
                    <div>
                        <label>Imagen:</label>
                        <input type="text" name="img" value={input.img} onChange={handleChange} />
                        {errors.img && <p className="error">{errors.img}</p>}
                    </div>

                    {/* Tipos */}
                    <div className={style.divSelect}>
                        <label>Tipos:</label>
                        <select onChange={handleSelect}>
                            {tiposDisponibles.map((tipo, index) => (
                                <option key={index} value={tipo.name}>{tipo.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tipos Seleccionados */}
                    <div className={style.divTypes}>
                        {input.types.map((tipo, index) => (
                            <span className={style.typeTag} key={index}>
                                {tipo}
                                <button className={style.deleteTypeBtn} type="button" onClick={() => handleDelete(tipo)}>X</button>
                            </span>
                        ))}
                    </div>

                    {/* Botón de Envío */}
                    <button className={style.btnCrear} type="submit">Crear Pokémon</button>
                </div>
            </form>
        </div>
    );
}
