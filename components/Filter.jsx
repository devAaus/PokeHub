import React from 'react'

const Filter = ({ types, selectedType, handleTypeFilter }) => {
      return (
            <div className="flex items-center justify-center space-x-4 mt-4">
                  <label className="text-white">Filter by Type:</label>
                  <select
                        value={selectedType}
                        onChange={(e) => handleTypeFilter(e.target.value)}
                        className="ml-2 p-2 rounded-md bg-gray-800 text-white"
                  >
                        <option value="">All Types</option>
                        {types.map((type) => (
                              <option key={type} value={type}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                              </option>
                        ))}
                  </select>
            </div>
      )
}

export default Filter;