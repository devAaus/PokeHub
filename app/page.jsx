"use client"


import { useEffect, useState } from 'react'
import axios from 'axios';
import PokemonCard from '@components/PokemonCard';
import Search from '@components/Search';
import Logo from '@components/Logo';
import Filter from '@components/Filter';
import Skeleton from '@components/Skeleton';
import Sort from '@components/Sort';

const Home = () => {
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [allTypes, setAllTypes] = useState([]);
  const [sortOption, setSortOption] = useState('numerical');


  const getPokemon = async () => {
    try {

      const resp = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=571&offset=0/');
      await getPokemonData(resp.data.results);
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };


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


  useEffect(() => {
    getPokemon();
  }, []);


  useEffect(() => {
    // When pokeData changes, update the list of all unique types
    const typesSet = new Set();
    pokeData.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        typesSet.add(type.type.name);
      });
    });
    setAllTypes(Array.from(typesSet));
  }, [pokeData]);


  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleTypeFilter = (type) => {
    setTypeFilter(type);
  };

  // Filter pokeData based on searchInput
  const filteredPokeData = pokeData.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()) &&
    (typeFilter === '' || item.types.some((type) => type.type.name === typeFilter))
  );


  const handleSort = (option) => {
    setSortOption(option);
  };

  const sortedPokeData = [...filteredPokeData].sort((a, b) => {
    if (sortOption === 'alphabetical') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'reverseAlphabetical') {
      return b.name.localeCompare(a.name);
    } else if (sortOption === 'numerical') {
      return a.id - b.id;
    } else if (sortOption === 'numericalDesc') {
      return b.id - a.id;
    }
    return 0;
  });



  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-3 transition-all ease-in-out ">

      <Logo />

      <div className="w-11/12 px-4 md:px-12 py-8 rounded-xl bg-[#26242e] transition-all ease-in-out">

        <div className='w-[80%] md:w-3/4 lg:w-3/5 xl:w-1/2 m-auto transition-all ease-in-out'>
          <Search searchInput={searchInput} handleSearchInput={handleSearchInput} />
        </div>

        <div className='w-full m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2'>

          <Filter types={allTypes}
            selectedType={typeFilter}
            handleTypeFilter={handleTypeFilter}
          />

          <Sort handleSort={handleSort} />

        </div>

        {isLoading ? (

          <div className="w-full m-auto grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 h-[46rem] overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Skeleton key={index} />
            ))}
          </div>

        ) : (

          <>
            <div className="w-full m-auto grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 h-[46rem] overflow-y-auto">
              {sortedPokeData.map((item, i) => (
                <PokemonCard key={i} item={item} />
              ))}
            </div>
          </>

        )}
      </div>
    </main>
  );
}

export default Home;
