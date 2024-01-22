import React from "react";
import { NavLink} from "react-router-dom";
import landingImage from "../Image/landingpagePoke.jpg";
import style from "../LandingPage/LandingPage.module.css";



export default function LandingPage(){
    return(
        <div>
            <img src={landingImage} alt=""/>
            <h1>Bienvenidos a la web de Pokemón</h1>
            <NavLink to="/home">
              <button className={style.btn}>Inicio</button>
            </NavLink>
            

        </div>
         

    )
}