import React from "react";
import { Link } from "react-router-dom";

function Card({ pokemon }) {
  return (
    <li key={pokemon.id} className="poke-card">
      <Link to={`/pokemon/${pokemon.name}`}>
        <span>#{pokemon.pokedexId}</span>
        <img src={pokemon.image} alt={pokemon.name} />
        <h2>{pokemon.name}</h2>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type.id} className="type-img">
              <img src={type.image} />
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
}

export default Card;
