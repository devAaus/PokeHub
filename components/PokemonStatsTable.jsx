import React from 'react';

const PokemonStatsTable = ({ stats }) => {
      if (!stats || !stats.map) {
            // Add a check for undefined or non-array stats
            return null;
      }

      const calculatePercentage = (value, maxValue) => {
            return (value / maxValue) * 100;
      };

      const getMaxStatValue = () => {
            // Assuming max stat value is 150, adjust as needed
            return Math.max(...stats.map((stat) => stat.base_stat), 255);
      };

      const maxStatValue = getMaxStatValue();

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
                              {stats.map((stat, index) => (
                                    <tr key={index} className='odd:bg-gray-600 even:bg-gray-800'>
                                          <td className="py-4 px-8 text-white text-lg capitalize ">{stat.stat.name}</td>
                                          <td className="py-2 px-8">
                                                <div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
                                                      <div
                                                            className="bg-blue-600 text-xs font-medium text-black text-center p-2 leading-none rounded-full"
                                                            style={{
                                                                  width: `${calculatePercentage(stat.base_stat, maxStatValue)}%`,
                                                                  backgroundColor: '#30a6d6',
                                                            }}
                                                      >
                                                            {stat.base_stat}
                                                      </div>
                                                </div>
                                          </td>
                                    </tr>
                              ))}

                        </tbody>
                  </table>
            </div>
      );
};

export default PokemonStatsTable;
