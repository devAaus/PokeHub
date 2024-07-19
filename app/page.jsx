"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '@components/PokemonCard';
import Skeleton from '@components/Skeleton';
import Logo from '@components/Logo';
import Sort from '@components/Sort';
import Search from '@components/Search';

const Home = () => {
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('number-asc');

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const resp = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=571&offset=0/');
        await getPokemonData(resp.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    getPokemon();
  }, []);

  const getPokemonData = async (results) => {
    try {
      const pokemonPromises = results.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      });

      const pokemonData = await Promise.all(pokemonPromises);
      setPokeData(pokemonData);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const filteredData = pokeData.filter((pokemon) =>
    pokemon.name && pokemon.name.toLowerCase().includes(searchQuery)
  );

  const sortedData = filteredData.sort((a, b) => {
    switch (sortOption) {
      case 'number-asc':
        return a.id - b.id;
      case 'number-desc':
        return b.id - a.id;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return a.id - b.id;
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-3 transition-all ease-in-out">
      <Logo />

      <div className="w-11/12 px-4 md:px-12 py-8 rounded-xl bg-[#26242e] transition-all ease-in-out">

        <div className=' flex justify-between items-center px-7 mb-6'>
          <Search searchInput={searchQuery} handleSearchInput={handleSearch} />

          <Sort handleSort={handleSort} />
        </div>

        {isLoading ? (
          <div className="w-full m-auto grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 h-[45rem] overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full m-auto grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 h-[45rem] overflow-y-auto">
            {sortedData.map((item) => (
              <PokemonCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
