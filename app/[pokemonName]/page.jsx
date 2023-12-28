"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import PokemonStatsTable from '@components/PokemonStatsTable';
import Loader from '@components/Loader';
import MoveCard from '@components/MoveCard';
import { typeColors } from '@utilities/Colors';
import { IoMdArrowRoundBack } from "react-icons/io";

const Pokemon = ({ params }) => {

      const [pokemon, setPokemon] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const router = useRouter();

      const name = params.pokemonName


      useEffect(() => {
            const getPokemon = async () => {
                  try {
                        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                        setPokemon(resp.data);
                        console.log(resp.data);
                        setTimeout(() => {
                              setIsLoading(false);
                        }, 2000);
                  } catch (error) {
                        console.error('Error fetching Pokemon:', error);

                  }
            };

            getPokemon();
      }, [name]);


      const formattedId = String(pokemon.id).padStart(3, '0');
      const weightWithDecimals = (pokemon.weight / 10).toFixed(1);
      const heightWithDecimals = (pokemon.height / 10).toFixed(1);


      const pokemonAbilities = pokemon.abilities
      const pokemonTypes = pokemon.types;
      const pokemonMoves = pokemon.moves;


      return (
            <main className="flex min-h-screen flex-col items-center justify-between py-3 ">

                  <div className="w-11/12 h-[58rem] px-4 py-2  rounded-xl bg-[#26242e]">

                        <button className='px-8 shadow-xl bg-blue-500 rounded-xl text-white' onClick={() => router.back()} >
                              <IoMdArrowRoundBack size={25} />
                        </button>

                        {isLoading ? (
                              <Loader />
                        ) : (
                              <>
                                    <div className='flex justify-center items-center'>
                                          <h1 className="py-6 text-4xl font-medium text-white capitalize">  {pokemon.name}  </h1>

                                          <h5 className="mb-1 text-2xl font-normal text-white">#{formattedId}</h5>
                                    </div>

                                    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:px-10 py-12 '>

                                          <div className='w-full'>

                                                <Image
                                                      className="m-auto mb-3 bg-cover bg-center p-12 bg-gray-600 backdrop-blur-xl rounded-lg shadow-xl"
                                                      src={pokemon.sprites?.other['official-artwork']?.front_default}
                                                      width={650}
                                                      height={650}
                                                      alt={`Image of ${pokemon.name} Pokemon`}

                                                />

                                          </div>

                                          <div className='h-[41rem] overflow-y-auto px-2 md:px-6 w-full'>

                                                <div className='grid grid-cols-1 md:grid-cols-2 bg-[#30a6d6] rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 p-6'>


                                                      <div>
                                                            <h1 className="mb-3 text-lg font-bold text-white">
                                                                  Weight <br />
                                                                  <span className='mb-1 text-xl font-normal text-black'>{weightWithDecimals}kg</span>
                                                            </h1>

                                                            <h1 className="text-lg font-bold text-white">
                                                                  Height <br />
                                                                  <span className='mb-1 text-xl font-normal text-black'>{heightWithDecimals}m</span>
                                                            </h1>
                                                      </div>


                                                      <div>
                                                            <h1 className="mb-3 text-lg font-bold text-white">
                                                                  Ability <br />

                                                                  {pokemonAbilities ? (
                                                                        pokemonAbilities.map((ability, index) => {
                                                                              const abilityName = ability.ability.name;

                                                                              return (
                                                                                    <span
                                                                                          key={index}
                                                                                          className="text-black font-normal rounded-lg text-xl py-0.5 me-2 mb-2"
                                                                                    >
                                                                                          {index === 0 ? '' : ', '}
                                                                                          {abilityName.charAt(0).toUpperCase() + abilityName.slice(1)}
                                                                                    </span>
                                                                              );
                                                                        })
                                                                  ) : (
                                                                        "No ablilities available."
                                                                  )}

                                                            </h1>


                                                            <h1 className=" text-lg font-bold text-white">
                                                                  Type <br />

                                                                  {pokemonTypes ? (
                                                                        pokemonTypes.map((type, index) => {
                                                                              const typeName = type.type.name;
                                                                              const backgroundColor = typeColors[typeName] || 'transparent';
                                                                              const backgroundImage =
                                                                                    typeColors[typeName] && typeColors[typeName].length === 2
                                                                                          ? `linear-gradient(to bottom, ${typeColors[typeName][0]}, ${typeColors[typeName][1]})`
                                                                                          : 'transparent';

                                                                              return (
                                                                                    <span
                                                                                          key={index}
                                                                                          className="text-gray-600 font-medium rounded-lg text-lg px-3 py-0.5 me-2 mb-2"
                                                                                          style={{
                                                                                                backgroundColor,
                                                                                                backgroundImage,
                                                                                          }}
                                                                                    >
                                                                                          {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                                                                                    </span>
                                                                              );
                                                                        })
                                                                  ) : (
                                                                        "No types available."
                                                                  )}


                                                            </h1>


                                                      </div>

                                                </div>


                                                <div>

                                                      <PokemonStatsTable stats={pokemon.stats} />

                                                </div>


                                                <div>
                                                      <h2 className="text-2xl font-semibold text-white mb-2 px-2">Moves</h2>

                                                      <div className='bg-[rgba(255,255,255,.05)] backdrop-blur-xl rounded-lg shadow-xl dark:bg-gray-800 px-4 md:px-8 py-4 grid grid-cols-2 md:grid-cols-3' >
                                                            {pokemonMoves ? (
                                                                  pokemonMoves.map((move, index) => (

                                                                        <>
                                                                              <MoveCard key={index} move={move.move} />

                                                                        </>
                                                                  ))
                                                            ) : (
                                                                  "No moves available."
                                                            )}
                                                      </div>

                                                </div>


                                          </div>

                                    </div>


                              </>
                        )}



                  </div>
            </main >
      );
}

export default Pokemon;