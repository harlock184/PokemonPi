import './App.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from "./components/LandingPage/LandingPage"
import Home from "./components/Home/Home"
import Detail from './components/Detail/Detail';
import NavBar from "./components/NavBar/NavBar"
import CreatePokemon from "./components/CreatePokemon/CreatePokemon"

function App() {

  const location = useLocation()
  return (
    <div className="App">
    
      {location.pathname !== '/' && <NavBar/>}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<CreatePokemon/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
