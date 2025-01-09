import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import Card from "./Card";

function ListeDesPokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [typeId, setTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch(
          "https://nestjs-pokedex-api.vercel.app/types"
        );
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Erreur lors du chargement des type", error);
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemonCall = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nestjs-pokedex-api.vercel.app/pokemons?page=${page}&limit=${limit}&name=${filter}&typeId=${typeId}`
        );
        const data = await response.json();
        console.log(data);
        setPokemonList((prev) => (page === 1 ? data : [...prev, ...data]));
      } catch (error) {
        console.error("Erreur lor du chargement des Pokémon", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonCall();
  }, [page, filter, typeId, limit]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50;
      if (bottom && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="poke-list">
      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="54"
          height="54"
          fill="white"
        >
          <circle
            cx="256"
            cy="256"
            r="200"
            stroke="black"
            stroke-width="16"
            fill="white"
          />
          <circle
            cx="256"
            cy="256"
            r="80"
            stroke="black"
            stroke-width="16"
            fill="white"
          />
          <line
            x1="56"
            y1="256"
            x2="456"
            y2="256"
            stroke="black"
            stroke-width="16"
          />
        </svg>
        Pokedex TP - KHERRAZ Mohammed Achraf - 5IW3
      </h1>
      <Filters
        filter={filter}
        setFilter={setFilter}
        typeId={typeId}
        setTypeId={setTypeId}
        limit={limit}
        setLimit={setLimit}
        types={types}
      />
      {loading && page === 1 && <p>Chargement...</p>}
      <ul>
        {pokemonList.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
      {loading && page > 1 && <p>Chargement des données supplémentaires...</p>}
    </div>
  );
}

export default ListeDesPokemon;
