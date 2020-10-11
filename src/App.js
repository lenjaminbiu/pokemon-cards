import React, { useRef, useState } from "react";
import "./App.css";
import Pikachu from "./assets/pikachu-seeklogo.com.svg"
import ErrorBoundary from "./components/error-boundary.component";

function App () {
  const [currentPokemon, setPokemon] = useState([]);
  const pokemonRef = useRef();

  async function getPokemon(e) {
    const searchName = pokemonRef.current.value;
    const allData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchName}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (searchName) {
          const {
          sprites: { front_default }, 
          species: {name},
          game_indices: [{game_index}]
        } = data;
        setPokemon({
          image: front_default,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          id: game_index
        })} else {setPokemon({
          image: "",
          name: "",
          id: ""
        })}
        pokemonRef.current.value = ''
      });
  }

  return (
    <div className="component">
      <img className="title" src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt=""/>
      <br></br>
      <br></br>
      <ErrorBoundary>
      <input ref={pokemonRef} type="text" placeholder="Search for a Pokemon" />
        <button onClick={getPokemon}>Search</button>
      <div className='pokemon-card'>
        <h2 className="label">Your Pokemon: </h2>
        <img className="pokemon-img" src={currentPokemon.image} alt="" width={200} height={200}/>
        <h3 className="label">Name: {currentPokemon.name}</h3>
        <h3 className="label">Pokedex Number: {currentPokemon.id}</h3>
      </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
