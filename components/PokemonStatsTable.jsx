import React from 'react';

const PokemonStatsTable = ({ stats }) => {



      return (
            <div className="py-8">
                  <h2 className="text-2xl font-semibold text-white mb-2 px-2">Base Stats</h2>
                  <table className="w-full bg-[#000000] rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
                        <thead>
                              <tr >
                                    <th className="py-2 px-8 text-left text-2xl text-white">Name</th>
                                    <th className="py-2 px-8 text-center text-2xl text-white">Value</th>
                              </tr>
                        </thead>
                        <tbody >
                              {stats.map((stat, index) => {

                                    const value = stat.base_stat
                                    const percentage = (value / 200) * 100;
                                    return (

                                          <tr key={index} className='odd:bg-gray-600 even:bg-gray-800'>

                                                <td className="py-4 px-8 text-white text-lg capitalize ">{stat.stat.name}</td>

                                                <td className="py-2 px-8">

                                                      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">

                                                            <div
                                                                  className="bg-blue-600 text-xs font-medium text-blue-100 text-center py-1 leading-none rounded-full"
                                                                  style={{
                                                                        width: `${percentage}%`,
                                                                  }}>
                                                                  {stat.base_stat}
                                                            </div>

                                                      </div>

                                                </td>
                                          </tr>
                                    )
                              })}

                        </tbody>
                  </table>
            </div>
      );
};

export default PokemonStatsTable;
