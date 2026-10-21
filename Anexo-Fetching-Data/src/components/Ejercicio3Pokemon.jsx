import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function Ejercicio3Pokemon() {
  const [busqueda, setBusqueda] = useState("pikachu");
  const [pokemonActual, setPokemonActual] = useState("pikachu");

  const url = pokemonActual
    ? `https://pokeapi.co/api/v2/pokemon/${pokemonActual.toLowerCase()}`
    : null;

  const { datos: pokemon, cargando, error } = useFetch(url);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== "") {
      setPokemonActual(busqueda.trim());
    }
  };

  return (
    <div style={{ border: "1px solid #444", padding: "1rem", borderRadius: "8px" }}>
      <h2>Ejercicio 3 — Buscador de Pokémon</h2>
      <form onSubmit={handleBuscar} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Escribí un pokémon..."
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>Buscar</button>
      </form>

      {cargando && <p>Cargando Pokémon...</p>}
      {error && <p style={{ color: "red" }}>Error: No se encontró el Pokémon ({error})</p>}

      {!cargando && !error && pokemon && (
        <div>
          <h3>{pokemon.name.toUpperCase()}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} width={120} />
          <p>
            <strong>Tipo:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}