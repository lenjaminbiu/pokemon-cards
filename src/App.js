import React, { useRef, useState } from "react";
import LandingPage from "./components/landingpage.componet";
import "./App.css";

function App() {
  const [currentPokemon, setPokemon] = useState([]);
  const pokemonRef = useRef();

  async function getPokemon(e) {
    const searchName = pokemonRef.current.value;
    e.preventDefault();
    const allData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchName}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        const {
          sprites: { front_default }, 
          species: {name},
          game_indices: [{game_index}]
        } = data;
        console.log(front_default, name, game_index);
      });
  }

  return (
    <div>
      <h1>Pokedex</h1>
      <input ref={pokemonRef} type="text" placeholder="Search for a Pokemon" />
      <button onClick={getPokemon}>Search</button>
      
      <LandingPage />
    </div>
  );
}

export default App;
