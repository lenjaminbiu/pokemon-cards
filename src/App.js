import React, { useRef, useState } from "react";
import "./App.css";
import ErrorBoundary from "./components/error-boundary.component";

function App() {
  const [currentPokemon, setPokemon] = useState([]);
  const pokemonRef = useRef();

  async function getPokemon(e) {
    const searchName = pokemonRef.current.value;
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
        if (searchName) {setPokemon({
          image: front_default,
          name: name,
          id: game_index
        })} else {setPokemon({
          image: null,
          name: "",
          id: ""
        })

        }
      });
  }

  return (
    <div>
      <h1>Pokemon Finder</h1>
      <input ref={pokemonRef} type="text" placeholder="Search for a Pokemon" />
      <ErrorBoundary>
        <button onClick={getPokemon}>Search</button>
      <div className='pokemon-card'>
        <h2>Your Pokemon: </h2>
        <img src={currentPokemon.image} alt=""/>
        <h3>Name: {currentPokemon.name}</h3>
        <h3>Pokedex Number: {currentPokemon.id}</h3>
      </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
