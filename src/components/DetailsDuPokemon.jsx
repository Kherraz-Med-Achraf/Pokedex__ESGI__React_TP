import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DetailsDuPokemon() {
  const { id: name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nestjs-pokedex-api.vercel.app/pokemons?name=${name}`
        );
        const data = await response.json();
        setPokemon(data[0]);
      } catch (error) {
        console.error("Erreur lors du chargement", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [name]);

  if (loading) return <p>Chargement...</p>;
  if (!pokemon) return <p>Pas de détail disponible</p>;

  return (
    <div className="poke-details">
      <div className="poke-title">
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <div className="poke-data">
        <h2>Stats:</h2>
        <p>
          <strong>Taille :</strong> {pokemon.stats.HP}
        </p>
        <p>
          <strong>Vitesse:</strong> {pokemon.stats.speed}
        </p>
        <p>
          <strong>Attaque:</strong> {pokemon.stats.attack}
        </p>
        <p>
          <strong>Défense:</strong> {pokemon.stats.defense}
        </p>
        <p>
          <strong>Attaque Spéciale:</strong> {pokemon.stats.specialAttack}
        </p>
        <p>
          <strong>Défense Spéciale:</strong> {pokemon.stats.specialDefense}
        </p>
        <p>
          <strong>Types :</strong>
          {pokemon.types.map((type) => (
            <span key={type.id} className="type">
              <img src={type.image} alt={type.name} />
              {type.name}
            </span>
          ))}
        </p>
      </div>

      <Link className="back-btn" to="/">
        Retour à la liste
      </Link>
    </div>
  );
}

export default DetailsDuPokemon;
