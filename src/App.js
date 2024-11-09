import './App.css';
import { useEffect, useState } from 'react';
import { getPokemons } from './services/api.js';

function App() {
  const [pokemons, setPokemons] = useState([]); // Lista completa de Pokémons
  const [searchTerm, setSearchTerm] = useState(''); // Estado do termo de busca
  const [filteredPokemons, setFilteredPokemons] = useState([]); // Lista filtrada

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    // Filtra a lista de Pokémons com base no termo de busca
    setFilteredPokemons(
      pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemons]);

  async function get() {
    const resp = await getPokemons();
    const { results } = resp;

    const detailedData = await Promise.all(
      results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    setPokemons(detailedData);
    setFilteredPokemons(detailedData); // Inicializa a lista filtrada com todos os Pokémons
  }

  return (
    <div className="App">
      <h1>POKEMON</h1>
      {/* Área de busca */ } 
      <input
        type="text"
        placeholder="Pesquisar Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
        className="buscar"
      />
      
      
      <div className="pokemon-container">
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <h2>{index + 1} - {pokemon.name}</h2>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>Experiência: {pokemon.base_experience}</p>
              <p>Altura: {pokemon.height} - Peso: {pokemon.weight}</p>
            </div>
          ))
        ) : (
          <p>Nenhum Pokémon encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;