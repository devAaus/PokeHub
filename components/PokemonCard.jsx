import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { typeColors } from '@utilities/Colors';


const PokemonCard = ({ item }) => {

      const pokemonTypes = item.types;
      // console.log(pokemonTypes);
      const formattedId = String(item.id).padStart(3, '0');

      return (

            <Link href={`/${item.name}`} className="w-full h-80 bg-[rgba(255,255,255,.05)] backdrop-blur-xl rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 hover:scale-105 hover:rotate-1 transition-all ease-in-out">

                  <div className="flex flex-col items-center p-6">

                        <h5 className="mb-1 text-2xl font-medium text-white">#{formattedId}</h5>

                        <Image className="mb-3 bg-cover bg-center"
                              src={item.sprites?.other['official-artwork'].front_default}
                              width={150}
                              height={150}
                              alt={`Image of ${item.name} Pokemon`}
                              priority={true}
                        />

                        <h5 className="mb-5 text-3xl font-medium text-white capitalize">
                              {item.name}
                        </h5>

                        {/* {item.types.length > 1 && item.types
                              .map((type, index) => {
                                    const typeName = type.type.name;
                                    const backgroundColor = typeColors[typeName] || 'transparent';
                                    const backgroundImage =
                                          typeColors[typeName] && typeColors[typeName].length === 2
                                                ? `linear-gradient(to bottom, ${typeColors[typeName][0]}, ${typeColors[typeName][1]})`
                                                : 'transparent';

                                    return (
                                          <span
                                                key={index}
                                                className="text-gray-900 font-medium rounded-lg text-lg px-3 py-0.5 me-2 mb-2"
                                                style={{
                                                      backgroundColor,
                                                      backgroundImage,
                                                }}
                                          >
                                                {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
                                          </span>
                                    );
                              })} */}

                  </div>
            </Link>

      )
}

export default PokemonCard