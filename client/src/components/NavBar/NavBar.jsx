
import React from "react";
//Components
import SearchBar from "../SearchBar/SearchBar";
//Style
import style from './NavBar.module.css';



import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../Redux/actions";


export default function Nav (props) {

    const { handleSubmit} = props;
    const dispatch = useDispatch();




    function handleClick(ev){
        ev.preventDefault();
        dispatch(getPokemons());
    }
    
    return (

        <div className={style.contenedor}>
            
           <Link to="/create" className={style.link}>Crear Pokemon</Link>   
           
              <button className={style.btn} onClick ={handleClick} >
                Volver a cargar todos los Pokemones
              </button>
            
            <SearchBar onClick = {handleSubmit} />
        </div>
        
    )
    
}